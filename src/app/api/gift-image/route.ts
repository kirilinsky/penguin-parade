import { firestore } from "@/fireBase-admin";
import { supabaseServer } from "@/supabase";
import { NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import * as admin from "firebase-admin";

const BUCKET = "penguins";

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
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { toUid, imageId } = await req.json();

  if (!fromUid || !toUid || !imageId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
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
    if (!data?.imageUrl) {
      return NextResponse.json(
        { error: "Invalid image data" },
        { status: 400 }
      );
    }

    const oldPath = new URL(data.imageUrl).pathname.split(
      "/storage/v1/object/public/penguins/"
    )[1];
    const filename = oldPath.split("/").pop();
    const newPath = `users/${toUid}/images/${filename}`;

    // 1. Copy image in Supabase
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

    // 2. Get new image URL
    const { data: urlData } = supabaseServer.storage
      .from(BUCKET)
      .getPublicUrl(newPath);

    const newImageUrl = urlData?.publicUrl;
    if (!newImageUrl) {
      return NextResponse.json(
        { error: "Failed to get image URL" + newImageUrl },
        { status: 500 }
      );
    }

    // 3. Push gift history
    const giftedHistory = Array.isArray(data.giftedHistory)
      ? [...data.giftedHistory]
      : [];
    giftedHistory.push({ from: fromUid, to: toUid, date: Date.now() });

    const newDoc = {
      ...data,
      imageUrl: newImageUrl,
      gift: true,
      giftedHistory,
    };

    const toDocRef = await firestore
      .collection(`users/${toUid}/images`)
      .add(newDoc);

    // 4. Delete old Firestore + old image
    await fromDocRef.delete();
    await supabaseServer.storage.from(BUCKET).remove([oldPath]);

    // 5. Update statistics
    const fromUserRef = firestore.doc(`users/${fromUid}`);
    const toUserRef = firestore.doc(`users/${toUid}`);

    await Promise.all([
      fromUserRef.update({
        "statistics.totalGiftsSent": admin.firestore.FieldValue.increment(1),
        "statistics.lastGiftSentAt": new Date(),
      }),
      toUserRef.update({
        "statistics.totalGiftsReceived":
          admin.firestore.FieldValue.increment(1),
      }),
    ]);

    // 6. Update friend links (if exist)
    const [friendSnap, reverseSnap] = await Promise.all([
      firestore.doc(`users/${fromUid}/friends/${toUid}`).get(),
      firestore.doc(`users/${toUid}/friends/${fromUid}`).get(),
    ]);

    if (friendSnap.exists) {
      await friendSnap.ref.update({
        giftsSent: admin.firestore.FieldValue.increment(1),
      });
    }

    if (reverseSnap.exists) {
      await reverseSnap.ref.update({
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
