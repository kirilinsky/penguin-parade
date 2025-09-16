import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

import type { ScaleType } from "@/types/scale.types";
import type { ImageItem } from "@/types/image.types";
import type { ClickerGameData } from "@/types/clicker.types";

export async function POST(req: NextRequest) {
  try {
    // 1) Auth
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token).catch(() => null);
    if (!decoded?.uid)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    const uid = decoded.uid;

    // 2) Input
    const { penguinId } = await req.json().catch(() => ({}));
    if (!penguinId) {
      return NextResponse.json(
        { error: "penguinId is required" },
        { status: 400 }
      );
    }

    const imageRef = doc(firestore, "images", penguinId);
    const imageSnap = await getDoc(imageRef);
    if (!imageSnap.exists()) {
      return NextResponse.json({ error: "penguin not found" }, { status: 404 });
    }
    const imageData = imageSnap.data() as ImageItem;
    if (imageData.ownerId !== uid) {
      return NextResponse.json(
        { error: "forbidden: not your penguin" },
        { status: 403 }
      );
    }

    const imgUrl = imageData.imageUrl ?? "";
    const scale: ScaleType = (imageData as any).settings?.rarity ?? "common";

    const currentRef = doc(
      firestore,
      "users",
      uid,
      "games",
      "clicker",
      "state",
      "current"
    );

    const gameRef = doc(
      firestore,
      "users",
      uid,
      "games",
      "clicker",
      "state",
      "game"
    );

    const [curSnap, gameSnap] = await Promise.all([
      getDoc(currentRef),
      getDoc(gameRef),
    ]);

    const currentDoc = {
      id: penguinId,
      imgUrl,
      scale,
      level: 0,
      clicks: 0,
      nextLevelAt: 1000,
      multiplier: 1,
    };
    await setDoc(currentRef, currentDoc, { merge: true });

    if (!gameSnap.exists()) {
      const newGame: ClickerGameData = {
        totalClicks: 0,
        totalIncome: 0,
        totalPenguins: 1,
        collectionLevel: 0,
        penguins: [currentDoc],
      };

      await setDoc(gameRef, newGame);
      return NextResponse.json({
        ok: true,
        current: { ...currentDoc },
        game: { ...newGame },
      });
    }

    const game = gameSnap.data() as ClickerGameData;

    return NextResponse.json({
      ok: true,
      current: { ...currentDoc },
      game: { ...game },
    });
  } catch (err) {
    console.error("[clicker/set-current] error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
