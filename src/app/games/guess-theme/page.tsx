"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useUserGame } from "@/hooks/use-user-game";
import { GameRoundContainer } from "@/components/pages/games/game-round-container/game-round-container.styled";
import { GuessThemeGame } from "@/components/pages/games/guess-theme-game/guess-theme-game.component";
import { toast } from "react-toastify";
import { getIdToken } from "@/helpers/get-token/get-token";
import { GuessThemeRoundData } from "@/types/games.types";

export default function GuessThemePage() {
  const t = useTranslations("guessThemePage");
  const {
    loading,
    error,
    progress,
    progressExists,
    activeSession,
    hasActiveSession,
    cooldownMs,
  } = useUserGame("guess-theme");

  const [loadingRound, setLoadingRound] = useState(false);
  const [roundData, setRoundData] = useState<GuessThemeRoundData | null>(null);

  const fetchRoundData = async () => {
    setLoadingRound(true);

    const token = await getIdToken();
    try {
      const res = await fetch("/api/games/guess-theme/get-round-data", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data) {
        setRoundData(data);
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoadingRound(false);
    }
  };

  const onStartHandle = async () => {
    const token = await getIdToken();
    const res = await fetch("/api/games/guess-theme/playedTodayget-progress", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(res, "res start");
  };

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("error")} {error.message}
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{t("title")}</h1>
      <section>
        <h3>{t("session.activeTitle")}</h3>
        <GameRoundContainer>
          <GuessThemeGame roundData={roundData} loading={loadingRound} />
        </GameRoundContainer>
        <button onClick={fetchRoundData}>load round</button>
        <br />
        <button onClick={onStartHandle}>start game</button>
        <button disabled>{t("session.continue")}</button>
      </section>

      {!progressExists && (
        <section>
          <p>{t("neverPlayed")}</p>
          <button disabled>{t("playFirstTime")}</button>
        </section>
      )}

      {progressExists && (
        <>
          <section>
            <h3>{t("progress.title")}</h3>
            <pre>{JSON.stringify(progress, null, 2)}</pre>
          </section>

          {hasActiveSession ? (
            <section>
              <h3>{t("session.activeTitle")}</h3>
              <pre>{JSON.stringify(activeSession, null, 2)}</pre>
              <button disabled>{t("session.continue")}</button>
            </section>
          ) : cooldownMs > 0 ? (
            <section>
              <p>
                {t("cooldown", {
                  seconds: Math.ceil(cooldownMs / 1000),
                })}
              </p>
            </section>
          ) : (
            <section>
              <button disabled>{t("startNew")}</button>
            </section>
          )}
        </>
      )}
    </div>
  );
}
