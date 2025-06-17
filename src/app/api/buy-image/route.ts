export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  increment,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { getPriceByScale } from "@/helpers/get-price-by-scale/get-price-by-scale";
import { ImageItemAuctionHistory } from "@/types/image.types";

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
    if (!data || data.ownerId !== "auction") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    if (!data.auction) {
      return NextResponse.json(
        { error: "Image not on auction" },
        { status: 403 }
      );
    }
    /* coins */
    const { buy } = getPriceByScale(data.settings.rarity);

    if (!buy) {
      return NextResponse.json({ error: "Can't buy this" }, { status: 403 });
    }

    const buyerUserRef = doc(firestore, "users", uid);

    const userDoc = await getDoc(buyerUserRef);
    const userData = userDoc.data();

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (userData.coins < buy) {
      return NextResponse.json(
        { error: "User has not enough money" },
        { status: 404 }
      );
    }
    const auctionHistory: ImageItemAuctionHistory[] = Array.isArray(
      data.auctionHistory
    )
      ? [...data.auctionHistory]
      : [];

    auctionHistory.push({
      buyerId: uid,
      price: buy,
      date: Date.now(),
    });

    await updateDoc(imageRef, {
      ownerId: uid,
      gift: false,
      auction: false,
      price: 0,
      placedForAuctionAt: null,
      auctionHistory,
    });

    await updateDoc(buyerUserRef, {
      coins: increment(-buy),
      imageIds: arrayUnion(imageId),
      "statistics.totalBought": increment(1),
      "statistics.totalCoinsSpent": increment(-buy),
      "statistics.lastAuctionPurchaseAt": serverTimestamp(),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Auction error:", err);
    return NextResponse.json(
      { error: "Server error", details: String(err) },
      { status: 500 }
    );
  }
}
