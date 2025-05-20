import { NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ScaleType } from "@/types/scale.types";
import { getNextScale } from "@/helpers/get-next-scale/get-next-scale";
import { getPriceByScale } from "@/helpers/get-price-by-scale/get-price-by-scale";
import { GenerateImageReposne } from "@/types/api.types";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (uid !== "MA1UKPOCUvUEYH4l4iqHDrJeJC22") {
    return NextResponse.json({ error: "DEBUG EXIT" }, { status: 400 });
  }

  const { imageIds } = await req.json();
  /* TODO: important, remove received imageIds from user imageIds */

  if (!Array.isArray(imageIds) || imageIds.length === 0) {
    return NextResponse.json(
      { error: "No imageIds provided" },
      { status: 400 }
    );
  }

  if (imageIds.length !== 8) {
    return NextResponse.json(
      { error: "Not enough imageIds provided" },
      { status: 400 }
    );
  }

  // Firestore allows max 10 values in "in" clause
  if (imageIds.length > 10) {
    return NextResponse.json(
      { error: "Too many images (max 10)" },
      { status: 400 }
    );
  }

  try {
    const imagesRef = collection(firestore, "images");
    const q = query(imagesRef, where("__name__", "in", imageIds));
    const snapshot = await getDocs(q);

    if (snapshot.empty || snapshot.size !== imageIds.length) {
      return NextResponse.json(
        { error: "Some images not found" },
        { status: 404 }
      );
    }

    const docs = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ownerId: data.ownerId,
        rarity: data.settings?.rarity as ScaleType | undefined,
      };
    });

    const unauthorized = docs.some((img) => img.ownerId !== uid);
    if (unauthorized) {
      return NextResponse.json(
        { error: "Some images do not belong to you" },
        { status: 403 }
      );
    }

    const rarities = new Set(docs.map((img) => img.rarity));
    if (rarities.size !== 1 || ![...rarities][0]) {
      return NextResponse.json(
        { error: "Images must have same valid rarity" },
        { status: 400 }
      );
    }

    const currentRarity = [...rarities][0] as ScaleType;
    const nextRarity = getNextScale(currentRarity);
    const price = getPriceByScale(currentRarity);
    const payout = price.sell !== null ? price.sell * docs.length : 0;

    if (!nextRarity) {
      return NextResponse.json(
        { error: "Cannot evolve further" },
        { status: 400 }
      );
    }

    const craftRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          scale: nextRarity,
        }),
      }
    );

    if (!craftRes.ok) {
      return NextResponse.json(
        { error: "Failed to generate evolved penguin" },
        { status: 500 }
      );
    }

    const data: GenerateImageReposne = await craftRes.json();

    if (data.success) {
      const sellerUserRef = doc(firestore, "users", uid);

      await updateDoc(sellerUserRef, {
        coins: increment(payout),
        "statistics.totalCoinsEarned": increment(payout),
      });
      return NextResponse.json({
        success: true,
        payout,
        downloadURL: data.downloadURL,
        title: data.title,
        settings: data.settings,
      });
    }
  } catch (err) {
    console.error("Evolution  failed:", err);
    return NextResponse.json(
      { error: "Server error at evolution step" },
      { status: 500 }
    );
  }
}
