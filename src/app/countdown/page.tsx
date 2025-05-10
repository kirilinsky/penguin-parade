"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import { evaluateGenerationState } from "@/helpers/evaluate-generation-state/evaluate-generation-state";
import { getUserLastGeneratedAt } from "@/helpers/get-user-last-generated-at/get-user-last-generated-at";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

const MainPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [canGenerate, setCanGenerate] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(0);

  const generate = () => {
    setCanGenerate(false);
  };

  useEffect(() => {
    if (!uid) return;

    (async () => {
      const lastGeneratedAt = await getUserLastGeneratedAt(uid);
      const { canGenerate, remainingMs } =
        evaluateGenerationState(lastGeneratedAt);
      setCanGenerate(canGenerate);
      setRemaining(remainingMs);
    })();
  }, [uid]);
  return (
    <div>
      <h1>Get Penguin</h1>
      <div className="countdown">countdown</div>
      {canGenerate ? (
        <button onClick={generate}>generate</button>
      ) : (
        "come tomorrow"
      )}
    </div>
  );
};

export default MainPage;
