import { useCallback, useEffect, useState } from "react";
import type { CurrentPenguin, ClickerGameData } from "@/types/clicker.types";
import { getIdToken } from "@/helpers/get-token/get-token";

type ClickerState = {
  current: CurrentPenguin | null;
  game: ClickerGameData | null;
};

export function useClickerState() {
  const [data, setData] = useState<ClickerState>({ current: null, game: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getIdToken();

      const res = await fetch("/api/games/clicker/get-state", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Request failed");

      setData({ current: json.current ?? null, game: json.game ?? null });
    } catch (e: any) {
      setError(e.message || "Failed to load clicker state");
      setData({ current: null, game: null });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    current: data.current,
    game: data.game,
    loading,
    error,
    refresh,
  };
}
