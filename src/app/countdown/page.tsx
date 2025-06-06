"use client";

import { GenerateImageReposne } from "@/types/api.types";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
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
import { formatDuration, intervalToDuration, isBefore, Locale } from "date-fns";
import { useUserDetails } from "@/hooks/use-user-details";
import { useLocale, useTranslations } from "next-intl";
import { enUS, ru } from "date-fns/locale";
import { useGetUserCrystals } from "@/hooks/use-get-crystals";
import CrystalsSelector from "@/components/crystals-selector/crystals-selector.component";
import { ScaleType } from "@/types/scale.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import GalleryItemScaleComponent from "@/components/gallery-item-scale/gallery-item-scale.component";
import { TelegramShareButton } from "@/components/tg-share-button/tg-share-button";

type GenerationResult = {
  downloadURL: string;
  id: string;
  title: string;
  rarity: string;
  crystal?: ScaleType;
};

const CountDownPage = () => {
  const t = useTranslations("craftPage");
  const localeCode = useLocale();
  const { user, refreshUser } = useUserDetails();
  const [canCraft, setCanCraft] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [loadingPayToSkip, setLoadingPayToSkip] = useState(false);
  const [leftTime, setLeftTime] = useState<string>("");
  const [result, setResult] = useState<GenerationResult | null>({
    downloadURL:
      "https://animals.pibig.info/uploads/posts/2023-04/1680622087_animals-pibig-info-p-krisa-s-sigaretoi-zhivotnie-vkontakte-3.jpg",
    title: "title",
    rarity: "common",
    id: "id22222",
  });
  const { crystals, loading: crystalsLoading } = useGetUserCrystals();
  const [crystalApplied, setCrystalApplied] = useState<ScaleType | null>(null);
  const [shareLink, setShareLink] = useState<string | null>(null);

  const localeMap: Record<string, Locale> = {
    en: enUS,
    ru: ru,
  };
  const locale = localeMap[localeCode] ?? enUS;

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
        locale,
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

    if (loading) return;

    setLoading(true);

    try {
      const token = await userCred.getIdToken(true);
      const res = await fetch("/api/generate-image", {
        method: "POST",
        body: JSON.stringify({ crystal: crystalApplied }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data: GenerateImageReposne = await res.json();

      if (res.status === 429) {
        alert(t("generationInProgress"));
      }

      if (res.status === 500) {
        alert(t("serverError"));
      }

      if (data.success) {
        setCanCraft(false);
        setResult({
          id: data.id,
          downloadURL: data.downloadURL,
          title: data.title,
          rarity: data.settings.rarity,
          crystal: data.crystal,
        });
      } else {
        console.error("Generation failed:", data);
      }
    } catch (err) {
      console.error("Error during generation:", err);
      alert(t("unexpectedError"));
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

  const appliedColor = useMemo(() => {
    if (crystalApplied) return getBaseColorByScale(crystalApplied);
  }, [crystalApplied]);

  return (
    <PageContentWrapperComponent>
      <PageContentBlockStyled>
        {!loading && !crystalsLoading && !result && (
          <PageContentBlockFlex>
            <h1>{t("title")}</h1>
            {canCraft ? (
              <>
                <ArcadeButtonStyled
                  appliedColor={appliedColor}
                  onClick={craft}
                  disabled={loading}
                />
                <CrystalsSelector
                  crystalApplied={crystalApplied}
                  setCrystalApplied={setCrystalApplied}
                  crystals={crystals}
                />
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
              width={169}
              height={169}
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
            {result.crystal && (
              <span>You spent 1 {result.crystal} crystal</span>
            )}
            <img
              src={result.downloadURL}
              alt={result.title}
              style={{
                width: 260,
                borderRadius: "1em",
                padding: 4,
                margin: 10,
                border: `1px solid ${getBaseColorByScale(result.rarity)}`,
              }}
            />

            <GalleryItemScaleComponent scale={result.rarity as ScaleType} />

            {user && (
              <LinkStyled href={`/library/${user.id}`}>
                {t("myLibraryLink")}
              </LinkStyled>
            )}
            {user && (
              <TelegramShareButton
                url={`${process.env.NEXT_PUBLIC_BASE_URL}/share/${user.id}/${result.id}`}
                text={`🐧 ${t("shareLink")} ${user.username}!`}
              />
            )}
          </PageContentBlockFlex>
        )}
      </PageContentBlockStyled>

      <LastCraftedBlockComponent />
    </PageContentWrapperComponent>
  );
};

export default CountDownPage;
