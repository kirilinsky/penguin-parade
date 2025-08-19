import { useEffect, useMemo, useState } from "react";
import {
  collection,
  doc,
  limit,
  onSnapshot,
  query,
  where,
  DocumentData,
  FirestoreError,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { useUserDetails } from "@/hooks/use-user-details";
import { GameId, GameProgress, GameSession } from "@/types/games.types";

export function useUserGame(gameId: GameId) {
  const { user } = useUserDetails();
  const uid = user?.id;

  const [progress, setProgress] = useState<GameProgress | null>(null);
  const [progressExists, setProgressExists] = useState(false);

  const [activeSession, setActiveSession] = useState<GameSession | null>(null);
  const [hasActiveSession, setHasActiveSession] = useState(false);

  const [loadingProgress, setLoadingProgress] = useState(true);
  const [loadingSession, setLoadingSession] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    if (!uid) return;
    setLoadingProgress(true);

    const ref = doc(firestore, `users/${uid}/games/${gameId}`);
    const unsub = onSnapshot(
      ref,
      (snap) => {
        setProgressExists(snap.exists());
        setProgress(snap.exists() ? (snap.data() as GameProgress) : null);
        setLoadingProgress(false);
      },
      (err) => {
        setError(err);
        setLoadingProgress(false);
      }
    );

    return () => unsub();
  }, [uid, gameId]);

  useEffect(() => {
    if (!uid) return;
    setLoadingSession(true);

    const col = collection(firestore, `users/${uid}/gameSessions`);
    const q = query(
      col,
      where("gameId", "==", gameId),
      where("state", "==", "active"),
      limit(1)
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        if (snap.empty) {
          setHasActiveSession(false);
          setActiveSession(null);
        } else {
          setHasActiveSession(true);
          setActiveSession(snap.docs[0].data() as GameSession);
        }
        setLoadingSession(false);
      },
      (err) => {
        setError(err);
        setLoadingSession(false);
      }
    );

    return () => unsub();
  }, [uid, gameId]);

  const { nextAvailableAtMs, cooldownMs } = useMemo(() => {
    const ts = progress?.nextAvailableAt as DocumentData | undefined;
    const ms =
      ts && typeof ts.toMillis === "function"
        ? (ts.toMillis() as number)
        : null;

    const diff = ms ? Math.max(0, ms - Date.now()) : 0;
    return { nextAvailableAtMs: ms, cooldownMs: diff };
  }, [progress?.nextAvailableAt]);

  return {
    loading: loadingProgress || loadingSession || !uid,
    error,
    progress,
    progressExists,
    activeSession,
    hasActiveSession,
    nextAvailableAtMs,
    cooldownMs,
  };
}
