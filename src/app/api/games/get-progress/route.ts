import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { GameId } from "@/types/games.types";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }
    const { uid } = await adminAuth.verifyIdToken(token);

    const gameId = req.nextUrl.searchParams.get("game") as GameId | null;
    if (!gameId) {
      return NextResponse.json(
        { error: "Missing ?game param" },
        { status: 400 }
      );
    }
    if (!gameId) {
      return NextResponse.json({ error: "Missing gameId" }, { status: 400 });
    }

    const ref = doc(firestore, `users/${uid}/games/${gameId}`);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      const now = serverTimestamp();

      const defaultProgress = {
        id: gameId,
        totalPlays: 0,
        totalWins: 0,
        lastWasWin: false,
        sessionId: null,
        currentStrike: 0,
        bestStrike: 0,
        lastCoinsEarned: 0,
        totalCoinsEarned: 0,
        lastPlayedAt: null,
        nextAvailableAt: null,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(ref, defaultProgress);
      return NextResponse.json(
        { ok: true, created: true, progress: defaultProgress },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { ok: true, created: false, progress: snap.data() },
      { status: 200 }
    );
  } catch (err) {
    console.error("[GET /api/games/[gameId]/progress]", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
