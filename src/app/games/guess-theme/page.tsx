"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useUserGame } from "@/hooks/use-user-game";

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
