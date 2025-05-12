"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import { evaluateGenerationState } from "@/helpers/evaluate-generation-state/evaluate-generation-state";
import { getUserLastGeneratedAt } from "@/helpers/get-user-last-generated-at/get-user-last-generated-at";
import { GenerateImageReposne } from "@/types/api.types";
import { useAtomValue } from "jotai";
import Image from "next/image";

import React, { useEffect, useState } from "react";
import { LinkStyled } from "@/components/link/link.component.styled";

type GenerationResult = {
  downloadURL: string;
  title: string;
  rarity: string;
};

const CountDownPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [canGenerate, setCanGenerate] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState<number>(0);
  const [result, setResult] = useState<GenerationResult | null>(null);

  const generate = async () => {
    if (!uid) return;

    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({ uid }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data: GenerateImageReposne = await res.json();

      if (data.success) {
        setResult({
          downloadURL: data.downloadURL,
          title: data.title,
          rarity: data.settings.rarity,
        });
        setCanGenerate(false);
      } else {
        console.error("Generation failed:", data);
      }
    } catch (err) {
      console.error("Error during generation:", err);
    } finally {
      setLoading(false);
    }
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
      <h1>Get new Penguin</h1>
      <div className="countdown">countdown timer:</div>
      {/* TODO: Create counter */}
      {canGenerate
        ? "You can generate now!"
        : `Come back in ${Math.ceil(remaining / 1000 / 60)} min`}
      <br />
      {canGenerate && !loading && <button onClick={generate}>Generate</button>}

      {/* TODO: Create loader */}
      {loading && (
        <div
          style={{
            background: "#3a5770",
            padding: "45px",
          }}
        >
          <Image
            src="/loader.gif"
            alt="Loading..."
            width={90}
            height={90}
            priority
          />
          <p>Generating penguin...</p>
        </div>
      )}
      {result && (
        <div style={{ marginTop: "2rem" }}>
          <h2>
            Wow, it's New <b>{result.title}!</b>
          </h2>
          <p>Welcome aboard buddy!</p>
          <img
            src={result.downloadURL}
            alt={result.title}
            style={{ width: 255, borderRadius: 8, padding: 4 }}
          />
          <br />
          <span>{result.rarity}</span>
          <br />
          <LinkStyled href="/mylibrary">Go to my Library</LinkStyled>
        </div>
      )}
    </div>
  );
};

export default CountDownPage;
