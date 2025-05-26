import { NextApiRequest, NextApiResponse } from "next";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase"; // client-side firestore instance
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const CRAFT_COST = 8;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Missing auth header" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const uid = decoded.uid;

    const userRef = doc(firestore, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = userSnap.data();
    const currentCoins = userData.coins || 0;

    if (currentCoins < CRAFT_COST) {
      return res.status(400).json({ error: "Not enough coins" });
    }
    const nowDate = serverTimestamp();
    await updateDoc(userRef, {
      coins: currentCoins - CRAFT_COST,
      allowCraftAt: nowDate,
      "statistics.totalSkipToPay":
        (userData.statistics?.totalSkipToPay || 0) + 1,
      "statistics.totalCoinsSpent": increment(-CRAFT_COST),
      "statistics.lastSkipToPayAt": nowDate,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Error in unlock-craft:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", detail: String(err) });
  }
}
