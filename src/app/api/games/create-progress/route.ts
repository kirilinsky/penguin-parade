import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import type { GameId } from "@/types/games.types";

const COOLDOWN_MS = 6 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  try {
    // --- auth ---
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }
    const { uid } = await adminAuth.verifyIdToken(token);

    // --- params ---
    const gameId = req.nextUrl.searchParams.get("game") as GameId | null;
    if (!gameId) {
      return NextResponse.json(
        { error: "Missing ?game param" },
        { status: 400 }
      );
    }

    const progressRef = doc(firestore, `users/${uid}/games/${gameId}`);
    let progressSnap = await getDoc(progressRef);

    const getActiveSession = async () => {
      const sessionsCol = collection(firestore, `users/${uid}/gameSessions`);
      const q = query(
        sessionsCol,
        where("gameId", "==", gameId),
        where("state", "==", "active"),
        limit(1)
      );
      const snap = await getDocs(q);
      if (snap.empty) return null;
      const first = snap.docs[0];
      return { id: first.id, data: first.data() };
    };

    const createSession = async () => {
      const sessionsCol = collection(firestore, `users/${uid}/gameSessions`);
      const sessionRef = doc(sessionsCol);
      const newSession = {
        gameId,
        state: "active" as const,
        createdAt: serverTimestamp(),
        currentRound: 0,
        totalRounds: 5,
        successRounds: 0,
      };
      await setDoc(sessionRef, newSession);
      return { id: sessionRef.id, data: newSession };
    };

    if (!progressSnap.exists()) {
      const now = serverTimestamp();

      const defaultProgress = {
        id: gameId,
        totalPlays: 0,
        totalWins: 0,
        lastWasWin: false,
        sessionId: null as string | null,
        currentStrike: 0,
        bestStrike: 0,
        lastCoinsEarned: 0,
        totalCoinsEarned: 0,
        lastPlayedAt: null as any,
        nextAvailableAt: null as any,
        createdAt: now,
        updatedAt: now,
      };

      await setDoc(progressRef, defaultProgress);

      const session = await createSession();
      await updateDoc(progressRef, {
        sessionId: session.id,
        updatedAt: serverTimestamp(),
      });

      return NextResponse.json(
        {
          ok: true,
          created: true,
          progress: { ...defaultProgress, sessionId: session.id },
          session: { id: session.id, ...session.data },
          resumed: false,
        },
        { status: 201 }
      );
    }

    const progress = progressSnap.data() as any;

    const nextAtMillis =
      progress?.nextAvailableAt?.toMillis?.() ??
      (typeof progress?.nextAvailableAt === "number"
        ? progress.nextAvailableAt
        : null);

    if (nextAtMillis && nextAtMillis > Date.now()) {
       return NextResponse.json(
        {
          ok: false,
          reason: "cooldown",
          message: "Играть можно раз в 6 часов. Приходи позже.",
          nextAvailableAt: nextAtMillis,
          retryAfterMs: nextAtMillis - Date.now(),
        },
        { status: 429 }
      );
    }

    let active = await getActiveSession();
    let resumed = true;

    if (!active) {
      active = await createSession();
      resumed = false;
    }

    if (progress.sessionId !== active.id) {
      await updateDoc(progressRef, {
        sessionId: active.id,
        updatedAt: serverTimestamp(),
      });
      progress.sessionId = active.id;
    }

    return NextResponse.json(
      {
        ok: true,
        created: false,
        resumed,
        progress,
        session: { id: active.id, ...active.data },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[GET /api/games/get-progress", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
