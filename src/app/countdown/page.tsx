"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import { evaluateGenerationState } from "@/helpers/evaluate-generation-state/evaluate-generation-state";
import { GenerateImageReposne } from "@/types/api.types";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LinkStyled } from "@/components/link/link.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import {
  PageContentBlockFlex,
  PageContentBlockStyled,
} from "@/components/page-content-block/page-content-block.component.styled";
import LastCraftedBlockComponent from "@/components/last-crafted-block/last-crafted-block.component";
import { getUserAllowCraftedAt } from "@/helpers/get-user-allow-crafted-at/get-user-allow-crafted-at";
import { ArcadeButtonStyled } from "@/components/arcade-button/arcade-button.component.styled";

type GenerationResult = {
  downloadURL: string;
  title: string;
  rarity: string;
};

const CountDownPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [canCraft, setCanCraft] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [leftTimestamp, setLeftTimestamp] = useState<number>(0);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const checkUserStatus = async () => {
    if (!uid) return;
    const allowUserCraftedAt = await getUserAllowCraftedAt(uid);
    const { isAllowed, timeLeft } = evaluateGenerationState(allowUserCraftedAt);

    setLeftTimestamp(timeLeft);
    setCanCraft(isAllowed);
  };

  const craft = async () => {
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
        setShareLink(
          encodeURIComponent(
            `${location.origin}/share/${uid}/${data.downloadURL}`
          )
        );
        setCanCraft(false);
      } else {
        console.error("Generation failed:", data);
      }
    } catch (err) {
      console.error("Error during generation:", err);
    } finally {
      setLoading(false);
      checkUserStatus();
    }
  };

  useEffect(() => {
    checkUserStatus();
  }, [uid]);

  return (
    <PageContentWrapperComponent>
      <PageContentBlockStyled>
        {!loading && !result && (
          <PageContentBlockFlex>
            {" "}
            <h1>Get new Penguin</h1>
            {/* TODO: Update counter */}
            {canCraft ? (
              <>
                <ArcadeButtonStyled onClick={craft} />
              </>
            ) : (
              <>
                <p>Sorry, you can craft only once in a day.</p>
                <p>come tomorrow</p>
              </>
            )}
          </PageContentBlockFlex>
        )}
        {loading && !result && (
          <PageContentBlockFlex>
            <Image
              src="/loader.gif"
              alt="Loading..."
              width={165}
              height={165}
              style={{ borderRadius: "50%" }}
              priority
            />
            <p>Generating penguin...</p>
            <span> please wait</span>
          </PageContentBlockFlex>
        )}
        {!loading && result && (
          <PageContentBlockFlex>
            <h2>
              Wow, it's New <b>{result.title}!</b>
            </h2>
            <p>Welcome aboard buddy!</p>
            <img
              src={result.downloadURL}
              alt={result.title}
              style={{ width: 225, borderRadius: 8, padding: 4 }}
            />
            <br />
            <span>{result.rarity}</span>
            <br />
            <LinkStyled href={`/library/${uid}`}>Go to my Library</LinkStyled>
            {/* TODO: add share functionality  */}
            <a
              target="_blank"
              href={`https://t.me/share/url?url=${shareLink}&text=${encodeURIComponent(
                `Look at my new penguin: ${result.title} 🐧\nCrafted on Penguin Parade!`
              )}`}
            >
              <button>Share this</button>
            </a>
          </PageContentBlockFlex>
        )}
      </PageContentBlockStyled>

      <LastCraftedBlockComponent uid={uid} />
    </PageContentWrapperComponent>
  );
};

export default CountDownPage;
