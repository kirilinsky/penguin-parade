import { adminAuth } from "@/fireBase-admin";
import { NextResponse } from "next/server";
import { firestore } from "@/firebase"; // client-side firestore instance
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const CRAFT_COST = 8;

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Missing auth token" }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userSnap.data();
    const currentCoins = userData.coins || 0;

    if (currentCoins < CRAFT_COST) {
      return NextResponse.json({ error: "Not enough coins" }, { status: 400 });
    }
    const nowDate = serverTimestamp();
    await updateDoc(userRef, {
      coins: currentCoins - CRAFT_COST,
      allowCraftAt: nowDate,
      "statistics.totalSkipToPay":
        (userData.statistics?.totalSkipToPay || 0) + 1,
      "statistics.totalCoinsSpent": increment(CRAFT_COST),
      "statistics.lastSkipToPayAt": nowDate,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error in unlock-craft:", err);
    return NextResponse.json(
      { error: "Pay to Skip: Server error", details: String(err) },
      { status: 500 }
    );
  }
}
