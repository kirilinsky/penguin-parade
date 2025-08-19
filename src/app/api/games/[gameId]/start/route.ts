import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export async function POST(
  req: NextRequest,
  { params }: { params: { gameId: string } }
) {
  try {
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }
    const { uid } = await adminAuth.verifyIdToken(token);

    const { gameId } = params;
    if (gameId !== "guess-theme") {
      return NextResponse.json({ error: "Unsupported game" }, { status: 400 });
    }

    const now = Date.now();
    const progressRef = doc(firestore, `users/${uid}/games/${gameId}`);
    const progressSnap = await getDoc(progressRef);

    if (!progressSnap.exists()) {
      await setDoc(progressRef, {
        totalPlays: 0,
        totalWins: 0,
        lastWasWin: false,
        currentStrike: 0,
        bestStrike: 0,
        lastCoinsEarned: 0,
        totalCoinsEarned: 0,
        lastPlayedAt: null,
        nextAvailableAt: null,
      });
    }

    const progressData = (await getDoc(progressRef)).data() as any;

    const nextAvailableAt = progressData.nextAvailableAt?.toMillis?.();
    if (nextAvailableAt && nextAvailableAt > now) {
      return NextResponse.json(
        {
          ok: false,
          reason: "cooldown",
          nextAvailableAt,
          retryAfterMs: nextAvailableAt - now,
        },
        { status: 403 }
      );
    }

    const sessionsRef = collection(firestore, `users/${uid}/gameSessions`);
    const activeQ = query(
      sessionsRef,
      where("gameId", "==", gameId),
      where("state", "==", "active")
    );
    const activeSnap = await getDocs(activeQ);

    if (!activeSnap.empty) {
      const s = activeSnap.docs[0];
      return NextResponse.json({
        ok: true,
        sessionId: s.id,
        session: s.data(),
        resumed: true,
      });
    }

    const sessionRef = doc(sessionsRef);
    const newSession = {
      gameId,
      state: "active",
      createdAt: serverTimestamp(),
      currentRound: 0,
      totalRounds: 5,
      successRounds: 0,
    };

    await setDoc(sessionRef, newSession);

    return NextResponse.json({
      ok: true,
      sessionId: sessionRef.id,
      session: newSession,
      resumed: false,
    });
  } catch (e) {
    console.error("[games/start]", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
