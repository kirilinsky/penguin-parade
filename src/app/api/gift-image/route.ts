import { firestore, adminAuth } from "@/fireBase-admin";
import * as admin from "firebase-admin";
import { supabaseServer } from "@/supabase";
import { NextResponse } from "next/server";

const BUCKET = "penguins";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
  }

  let fromUid;
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
    const fromDocRef = firestore.doc(`users/${fromUid}/images/${imageId}`);
    const fromDocSnap = await fromDocRef.get();

    if (!fromDocSnap.exists) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const data = fromDocSnap.data();
    if (!data) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const giftedHistory: { from: string; to: string; date: number }[] =
      Array.isArray(data.giftedHistory) ? [...data.giftedHistory] : [];

    giftedHistory.push({
      from: fromUid,
      to: toUid,
      date: Date.now(),
    });

    const newDoc = {
      ...data,
      giftedHistory,
    };

    const toDocRef = await firestore
      .collection(`users/${toUid}/images`)
      .add(newDoc);

    const imageUrl: string = data.imageUrl;
    const oldPath = new URL(imageUrl).pathname.split(
      "/storage/v1/object/public/penguins/"
    )[1];
    const filename = oldPath.split("/").pop();
    const newPath = `users/${toUid}/images/${filename}`;

    const copyRes = await supabaseServer.storage
      .from(BUCKET)
      .copy(oldPath, newPath);
    if (copyRes.error) {
      console.error("Supabase copy error:", copyRes.error.message);
      return NextResponse.json(
        { error: "Failed to copy image" },
        { status: 500 }
      );
    }

    await fromDocRef.delete();
    await supabaseServer.storage.from(BUCKET).remove([oldPath]);

    const { data: publicUrlData } = supabaseServer.storage
      .from(BUCKET)
      .getPublicUrl(newPath);
    const newImageUrl = publicUrlData?.publicUrl;

    if (newImageUrl) {
      await toDocRef.update({ imageUrl: newImageUrl });
    }

    const fromUserRef = firestore.doc(`users/${fromUid}`);
    const toUserRef = firestore.doc(`users/${toUid}`);

    await fromUserRef.update({
      "statistics.totalGiftsSent": admin.firestore.FieldValue.increment(1),
      "statistics.lastGiftSentAt": new Date(),
    });

    await toUserRef.update({
      "statistics.totalGiftsReceived": admin.firestore.FieldValue.increment(1),
    });

    const friendRef = firestore.doc(`users/${fromUid}/friends/${toUid}`);
    const friendSnap = await friendRef.get();
    if (friendSnap.exists) {
      await friendRef.update({
        giftsSent: admin.firestore.FieldValue.increment(1),
      });
    }

    const reverseFriendRef = firestore.doc(`users/${toUid}/friends/${fromUid}`);
    const reverseSnap = await reverseFriendRef.get();
    if (reverseSnap.exists) {
      await reverseFriendRef.update({
        giftsReceived: admin.firestore.FieldValue.increment(1),
      });
    }

    return NextResponse.json({
      success: true,
      newImageId: toDocRef.id,
      newImageUrl,
    });
  } catch (err) {
    console.error("Gift error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
