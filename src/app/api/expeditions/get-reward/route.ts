import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/firebase";
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { expeditionPresets } from "@/types/expeditions.types";
import { adminAuth } from "@/fireBase-admin";

export async function POST(req: NextRequest) {
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
  const { expeditionId } = await req.json();
  if (!expeditionId) {
    return NextResponse.json(
      { error: "Missing uid or expeditionId" },
      { status: 400 }
    );
  }

  const globalExpeditionRef = doc(firestore, "expeditions", expeditionId);
  const globalExpSnap = await getDoc(globalExpeditionRef);

  if (!globalExpSnap.exists()) {
    return NextResponse.json(
      { error: "Global expedition not found" },
      { status: 404 }
    );
  }

  const globalExp = globalExpSnap.data();

  if (globalExp.state !== "ended") {
    return NextResponse.json(
      { error: "Expedition not ended yet" },
      { status: 400 }
    );
  }

  try {
    const userExpeditionRef = doc(
      firestore,
      "users",
      uid,
      "expeditions",
      expeditionId
    );
    const userDocRef = doc(firestore, "users", uid);
    const userExpSnap = await getDoc(userExpeditionRef);

    if (!userExpSnap.exists()) {
      return NextResponse.json(
        { error: "User expedition not found" },
        { status: 404 }
      );
    }

    const userExp = userExpSnap.data();
    if (userExp.claimedReward) {
      return NextResponse.json(
        { error: "Reward already claimed" },
        { status: 409 }
      );
    }

    const batch = writeBatch(firestore);

    const preset =
      expeditionPresets[
        userExp.expeditionScale as keyof typeof expeditionPresets
      ];
    const penguinCount = userExp.penguins.length;
    const rewardGold = Math.round(penguinCount * preset.goldPerPenguin);

    const baseChance = preset.baseCrystalChance;
    const bonus = penguinCount * preset.perPenguinBonus;
    const finalChance = Math.min(baseChance + bonus, preset.maxCrystalChance);

    const random = Math.random();
    const crystalWon = random < finalChance;

    for (const p of userExp.penguins) {
      const penguinRef = doc(firestore, "images", p.id);
      batch.update(penguinRef, {
        inExpedition: false,
        expedition: null,
      });
    }

    batch.update(userExpeditionRef, {
      claimedAt: new Date(),
      claimedReward: true,
      rewardGold,
      crystal: crystalWon,
    });

    const updates: Record<string, any> = {
      "statistics.expeditions": increment(1),
      "statistics.totalCoinsEarned": increment(rewardGold),
      "statistics.totalExpeditionParticipants": increment(penguinCount),
      "statistics.lastExpeditionAt": new Date(),
    };

    if (crystalWon) {
      updates["statistics.totalCrystalsEarned"] = increment(1);
      const crystalType = userExp.expeditionScale;

      await setDoc(
        doc(firestore, `users/${uid}/crystals/${crystalType}`),
        {
          type: crystalType,
          amount: increment(1),
          lastUpdated: serverTimestamp(),
        },
        { merge: true }
      );
    }

    batch.update(userDocRef, updates);

    batch.update(globalExpeditionRef, {
      totalGoldEarned: (globalExp.totalGoldEarned || 0) + rewardGold,
      totalCrystals: (globalExp.totalCrystals || 0) + (crystalWon ? 1 : 0),
    });

    await batch.commit();

    return NextResponse.json({
      success: true,
      rewardGold,
      crystal: crystalWon ? userExp.expeditionScale : null,
    });
  } catch (err) {
    console.error("[EXPEDITION:CLAIM] Error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
