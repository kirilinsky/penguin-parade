import { NextResponse } from "next/server";
import { firestore, FieldValue, adminAuth } from "@/fireBase-admin";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
  }

  let fromUid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    fromUid = decoded.uid;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { toUid, imageId } = await req.json();

  if (!fromUid || !toUid || !imageId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (fromUid === toUid) {
    return NextResponse.json(
      { error: "Cannot gift to yourself" },
      { status: 400 }
    );
  }

  try {
    const imageRef = firestore.doc(`images/${imageId}`);
    const imageSnap = await imageRef.get();

    if (!imageSnap.exists) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const data = imageSnap.data();
    if (!data || data.ownerId !== fromUid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const giftedHistory: { from: string; to: string; date: number }[] =
      Array.isArray(data.giftedHistory) ? [...data.giftedHistory] : [];

    giftedHistory.push({
      from: fromUid,
      to: toUid,
      date: Date.now(),
    });

    await imageRef.update({
      ownerId: toUid,
      gift: true,
      giftedHistory,
    });

    const fromUserRef = firestore.doc(`users/${fromUid}`);
    const toUserRef = firestore.doc(`users/${toUid}`);

    await Promise.all([
      fromUserRef.update({
        "statistics.totalGiftsSent": FieldValue.increment(1),
        "statistics.lastGiftSentAt": FieldValue.serverTimestamp(),
      }),
      toUserRef.update({
        "statistics.totalGiftsReceived": FieldValue.increment(1),
      }),
    ]);

    const friendRef = firestore.doc(`users/${fromUid}/friends/${toUid}`);
    const reverseFriendRef = firestore.doc(`users/${toUid}/friends/${fromUid}`);

    const [friendSnap, reverseSnap] = await Promise.all([
      friendRef.get(),
      reverseFriendRef.get(),
    ]);

    if (friendSnap.exists) {
      await friendRef.update({
        giftsSent: FieldValue.increment(1),
      });
    }

    if (reverseSnap.exists) {
      await reverseFriendRef.update({
        giftsReceived: FieldValue.increment(1),
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Gift error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
