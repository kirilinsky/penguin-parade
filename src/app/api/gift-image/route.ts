import { supabaseServer } from "@/supabase";
import { NextResponse } from "next/server";
import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const firestore = admin.firestore();
const adminAuth = admin.auth();
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
      gift: true,
      giftedHistory,
    };

    const imageUrl: string = data.imageUrl;
    const oldPath = new URL(imageUrl).pathname.split(
      "/storage/v1/object/public/penguins/"
    )[1];
    const filename = oldPath.split("/").pop();
    const newPath = `users/${toUid}/images/${filename}`;

    // 🟡 Download original file manually
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      return NextResponse.json(
        { error: "Failed to download image" },
        { status: 500 }
      );
    }

    const buffer = await imageRes.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    const uploadRes = await supabaseServer.storage
      .from(BUCKET)
      .upload(newPath, bytes, {
        contentType: "image/webp",
      });

    if (uploadRes.error) {
      return NextResponse.json(
        { error: "Upload failed", details: uploadRes.error.message },
        { status: 500 }
      );
    }

    // ✅ Get public URL
    const { data: publicUrlData } = supabaseServer.storage
      .from(BUCKET)
      .getPublicUrl(newPath);
    const newImageUrl = publicUrlData?.publicUrl;

    if (!newImageUrl) {
      return NextResponse.json(
        { error: "Failed to get public URL" },
        { status: 500 }
      );
    }

    const toDocRef = await firestore
      .collection(`users/${toUid}/images`)
      .add({ ...newDoc, imageUrl: newImageUrl });

    // ❌ Delete old document and file
    await fromDocRef.delete();
    await supabaseServer.storage.from(BUCKET).remove([oldPath]);

    // 📊 Update stats
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
    const reverseFriendRef = firestore.doc(`users/${toUid}/friends/${fromUid}`);

    const [friendSnap, reverseSnap] = await Promise.all([
      friendRef.get(),
      reverseFriendRef.get(),
    ]);

    if (friendSnap.exists) {
      await friendRef.update({
        giftsSent: admin.firestore.FieldValue.increment(1),
      });
    }

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
