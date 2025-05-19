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
import { getPriceByScale } from "@/helpers/get-price-by-scale/get-price-by-scale";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { imageId } = await req.json();

  if (!uid || !imageId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const imageRef = doc(firestore, "images", imageId);
    const imageSnap = await getDoc(imageRef);

    if (!imageSnap.exists()) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    const data = imageSnap.data();
    if (!data || data.ownerId !== uid) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (data.auction) {
      return NextResponse.json({ error: "Already sold" }, { status: 403 });
    }
    /* coins */
    const { sell, buy } = getPriceByScale(data.settings.rarity);

    if (!sell) {
      return NextResponse.json({ error: "Can't sell this" }, { status: 403 });
    }

    await updateDoc(imageRef, {
      ownerId: "auction",
      gift: false,
      auction: true,
      price: buy,
    });

    const sellerUserRef = doc(firestore, "users", uid);

    await Promise.all([
      updateDoc(sellerUserRef, {
        coins: increment(sell),
        "statistics.totalSold": increment(1),
        "statistics.totalCoinsEarned": increment(sell),
        "statistics.lastAuctionSellAt": serverTimestamp(),
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Auction error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
