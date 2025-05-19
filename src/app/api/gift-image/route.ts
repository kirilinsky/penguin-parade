export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase"; // client-side firestore instance
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
} from "firebase/firestore";

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
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (fromUid === toUid) {
    return NextResponse.json({ error: "Cannot gift to yourself" }, { status: 400 });
  }

  try {
    const imageRef = doc(firestore, "images", imageId);
    const imageSnap = await getDoc(imageRef);

    if (!imageSnap.exists()) {
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

    await updateDoc(imageRef, {
      ownerId: toUid,
      gift: true,
      giftedHistory,
    });

    const fromUserRef = doc(firestore, "users", fromUid);
    const toUserRef = doc(firestore, "users", toUid);

    await Promise.all([
      updateDoc(fromUserRef, {
        "statistics.totalGiftsSent": increment(1),
        "statistics.lastGiftSentAt": serverTimestamp(),
      }),
      updateDoc(toUserRef, {
        "statistics.totalGiftsReceived": increment(1),
      }),
    ]);

    const friendRef = doc(firestore, `users/${fromUid}/friends/${toUid}`);
    const reverseFriendRef = doc(firestore, `users/${toUid}/friends/${fromUid}`);

    const [friendSnap, reverseSnap] = await Promise.all([
      getDoc(friendRef),
      getDoc(reverseFriendRef),
    ]);

    if (friendSnap.exists()) {
      await updateDoc(friendRef, {
        giftsSent: increment(1),
      });
    }

    if (reverseSnap.exists()) {
      await updateDoc(reverseFriendRef, {
        giftsReceived: increment(1),
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
