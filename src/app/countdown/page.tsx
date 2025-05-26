"use client";

import { GenerateImageReposne } from "@/types/api.types";
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
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { formatDuration, intervalToDuration, isBefore } from "date-fns";
import { useUserDetails } from "@/hooks/use-user-details";
import { useTranslations } from "next-intl";

type GenerationResult = {
  downloadURL: string;
  title: string;
  rarity: string;
};

const CountDownPage = () => {
  const t = useTranslations("craftPage");

  const { user, refreshUser } = useUserDetails();
  const [canCraft, setCanCraft] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [loadingPayToSkip, setLoadingPayToSkip] = useState(false);
  const [leftTime, setLeftTime] = useState<string>("");
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const checkUserStatus = async () => {
    /* TODO: think about useUserDetails refresh */
    if (!user) return;
    const allowUserCraftedAt = await getUserAllowCraftedAt(user);
    if (allowUserCraftedAt) {
      const allowedDate = allowUserCraftedAt.toDate();
      const allowed = isBefore(allowedDate, new Date());
      setCanCraft(allowed);
      const duration = intervalToDuration({
        start: new Date(),
        end: allowedDate,
      });

      const formattedDate = formatDuration(duration, {
        format: ["days", "hours", "minutes"],
      });
      setLeftTime(formattedDate);
    }
  };

  const craft = async () => {
    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!userCred || !user) return;

    await userCred.reload();
    if (!userCred.emailVerified) {
      await sendEmailVerification(userCred);
      alert(
        `${t("verifyEmailAlert1")} (${userCred.email}) ${t(
          "verifyEmailAlert2"
        )}`
      );
      return;
    }

    const token = await userCred.getIdToken(true);

    setLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({}),
        headers: {
          Authorization: `Bearer ${token}`,
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
            `${location.origin}/share/${user.id}/${data.downloadURL}`
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

  const payToSkip = async () => {
    setLoadingPayToSkip(true);
    if (canCraft) return;
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return { success: false, error: "User not authenticated" };
      }

      const token = await currentUser.getIdToken(true);

      const res = await fetch("/api/pay-to-skip", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const data = await res.json();
        return { success: false, error: data.error || "Unknown error" };
      }
      setCanCraft(true);
      refreshUser();
      return { success: true };
    } catch (err: any) {
      console.error("unlockCrafting error:", err);
      return { success: false, error: err.message || "Unexpected error" };
    } finally {
      setLoadingPayToSkip(false);
    }
  };

  useEffect(() => {
    user && checkUserStatus();
  }, [user]);

  return (
    <PageContentWrapperComponent>
      <PageContentBlockStyled>
        {!loading && !result && (
          <PageContentBlockFlex>
            <h1>{t("title")}</h1>
            {canCraft ? (
              <>
                <ArcadeButtonStyled onClick={craft} />
              </>
            ) : (
              <>
                <Image
                  width={190}
                  height={200}
                  src="/come_later.webp"
                  alt="come later"
                />
                <p>{t("laterTitle")}</p>
                <span>
                  {t("comeBackIn")} <b>{leftTime}</b>
                </span>
                <br />
                <br />
                <p>{t("payToSkipTitile")}</p>
                {user && (
                  <NeonButtonComponent
                    disabled={loadingPayToSkip || user.coins <= 8}
                    title={
                      loadingPayToSkip
                        ? t("loading")
                        : `${t("payToSkipButton")} 8$P`
                    }
                    onClick={payToSkip}
                  />
                )}
              </>
            )}
          </PageContentBlockFlex>
        )}
        {loading && !result && (
          <PageContentBlockFlex>
            <Image
              src="/loader.gif"
              alt="Loading..."
              width={167}
              height={167}
              style={{ borderRadius: "50%" }}
              priority
            />
            <p>{t("generatingTitle")}</p>
            <span>{t("waitMessage")}</span>
          </PageContentBlockFlex>
        )}
        {!loading && result && (
          <PageContentBlockFlex>
            <h2>
              {t("newPenguinTitle")} <b>{result.title}!</b>
            </h2>
            <p>{t("welcomeNew")}</p>
            <img
              src={result.downloadURL}
              alt={result.title}
              style={{ width: 225, borderRadius: 8, padding: 4, margin: 10 }}
            />
            <br />
            <span>{result.rarity}</span>
            <br />
            {user && (
              <LinkStyled href={`/library/${user.id}`}>
                {t("myLibraryLink")}
              </LinkStyled>
            )}
            {/* TODO: add share functionality  */}
            <NeonButtonComponent title="Share this (TBA)" />
            {/*   <a
              target="_blank"
              href={`https://t.me/share/url?url=${shareLink}&text=${encodeURIComponent(
                `Look at my new penguin: ${result.title} 🐧\nCrafted on Penguin Parade!`
              )}`}
            >
              
            </a> */}
          </PageContentBlockFlex>
        )}
      </PageContentBlockStyled>

      <LastCraftedBlockComponent />
    </PageContentWrapperComponent>
  );
};

export default CountDownPage;
