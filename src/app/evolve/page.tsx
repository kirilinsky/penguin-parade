"use client";

import { EvolutionEffect } from "@/components/evolution-effect/evolution-effect";
import EvolutionGridContainer from "@/components/evolution-grid-container/evolution-grid-container.component";
import EvolutionGridItem from "@/components/evolution-grid-item/evolution-grid-item.component";
import {
  EvolutionGridItemCenterStyled,
  EvolutionGridItemCenterWrap,
} from "@/components/evolution-grid-item/evolution-grid-item.component.styled";
import EvolutionModalComponent from "@/components/evolution-modal/evolution-modal.component";
 import { LinkStyled } from "@/components/link/link.component.styled";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { getNextScale } from "@/helpers/get-next-scale/get-next-scale";
import { useGetImages } from "@/hooks/use-get-images";
import { useUserDetails } from "@/hooks/use-user-details";
import { ImageItem } from "@/types/image.types";
import { ScaleType } from "@/types/scale.types";
import { getAuth, sendEmailVerification } from "firebase/auth";
import React, { useEffect, useMemo, useState } from "react";
import Rodal from "rodal";

type EvolutionSlot = ImageItem | null;

const evolutionListDefault: Record<string, EvolutionSlot> = {
  tla: null,
  tc: null,
  tra: null,
  mlc: null,
  mrc: null,
  bla: null,
  bc: null,
  bra: null,
};
const EvolvePage = () => {
  const { user, refreshUser } = useUserDetails();
  const [evolutionList, setEvolutionList] =
    useState<Record<string, EvolutionSlot>>(evolutionListDefault);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [currentRarityScale, setCurrentRarityScale] =
    useState<ScaleType | null>(null);
  const [expectingRarityScale, setExpectingRarityScale] =
    useState<ScaleType | null>(null);
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const evolutionKeys = Object.keys(evolutionListDefault);
  const [evolutionInProgress, setEvolutionInProgress] =
    useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [resultTitle, setResultTitle] = useState<string | null>(null);
  const [payout, setPayout] = useState<number>(0);

  const { images, loading } = useGetImages();

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);

  const onImageClick = (img: ImageItem) => {
    if (!currentRarityScale) {
      setCurrentRarityScale(img.settings.rarity);
    }
    if (!currentKey) return;
    const filteredImagesDraft = [...filteredImages].filter(
      (item) => item.id !== img.id
    );
    const evolutionListDraft = { ...evolutionList };
    evolutionListDraft[currentKey] = img;
    setFilteredImages(filteredImagesDraft);
    setEvolutionList(evolutionListDraft);
    setShowLibraryModal(false);
  };

  useEffect(() => {
    if (!currentRarityScale) return;
    const filteredImagesDraft = [...filteredImages].filter(
      (img) => img.settings.rarity === currentRarityScale
    );
    const nextScale = getNextScale(currentRarityScale);
    setExpectingRarityScale(nextScale);
    setFilteredImages(filteredImagesDraft);
  }, [currentRarityScale]);

  const onItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { id: currentIdkey } = e.target as HTMLButtonElement;
    if (currentIdkey) {
      setShowLibraryModal(true);
      setCurrentKey(currentIdkey);
    }
  };

  const evolve = async () => {
    if (!user) {
      return;
    }

    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!userCred || !user) return;

    await userCred.reload();
    if (!userCred.emailVerified) {
      await sendEmailVerification(userCred);
      alert(
        `Please verify your email (${userCred.email}) before evolving a penguin.`
      );
      return;
    }

    const token = await userCred.getIdToken(true);
    const imageIds = Object.values(evolutionList)
      .filter((x) => x !== null)
      .map((item: EvolutionSlot) => item?.id);

    try {
      setEvolutionInProgress(true);
      const res = await fetch("/api/evolve-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageIds }),
      });

      const { success, payout, downloadURL, title } = await res.json();
      if (success) {
        setResult(true);
        setEvolutionList(evolutionListDefault);
        setResultImage(downloadURL);
        setResultTitle(title);
        setPayout(payout);
        refreshUser();
      }
    } catch (err) {
      console.error("Evolution check failed:", err);
      return { success: false, error: "Network error" };
    } finally {
      setEvolutionInProgress(false);
    }
  };

  const handleResetItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const { id: resetKey } = e.target as HTMLButtonElement;
    if (!resetKey) return;
    const resetImage = evolutionList[resetKey] as ImageItem;
    const filteredImagesDraft = [...filteredImages, resetImage];
    const evolutionListDraft = { ...evolutionList };
    evolutionListDraft[resetKey] = null;

    const filled = Object.values(evolutionListDraft).filter(
      (v) => v !== null
    ).length;
    if (!filled) {
      setCurrentRarityScale(null);
      setExpectingRarityScale(null);
    }

    setFilteredImages(filteredImagesDraft);
    setEvolutionList(evolutionListDraft);
  };

  const evolutionListProgress = useMemo(() => {
    const total = Object.keys(evolutionList).length;

    const filled = Object.values(evolutionList).filter(
      (v) => v !== null
    ).length;
    const percentFilled = Math.round((filled / total) * 100);

    return percentFilled;
  }, [evolutionList]);

  const currentScaleColor = useMemo(() => {
    if (!currentRarityScale) {
      return "transparent";
    }
    return getBaseColorByScale(currentRarityScale);
  }, [currentRarityScale]);

  const expectingScaleColor = useMemo(() => {
    if (!expectingRarityScale) {
      return "transparent";
    }
    return getBaseColorByScale(expectingRarityScale);
  }, [expectingRarityScale]);

  return (
    <>
      <Rodal
        visible={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
      >
        <EvolutionModalComponent
          expectingScaleColor={expectingScaleColor}
          currentScaleColor={currentScaleColor}
          currentRarityScale={currentRarityScale}
          expectingRarityScale={expectingRarityScale}
          filteredImages={filteredImages}
          onImageClick={onImageClick}
        />
      </Rodal>
      <EvolutionGridContainer hide={result} target={currentScaleColor}>
        {!loading &&
          evolutionKeys.map((key) => (
            <EvolutionGridItem
              bordercolor={currentScaleColor}
              value={evolutionList[key] ? evolutionList[key].imageUrl : null}
              onClick={onItemClick}
              result={evolutionInProgress || result}
              key={key}
              gridarea={key}
            >
              {evolutionList[key] && (
                <button onClick={handleResetItem} id={key}>
                  reset
                </button>
              )}
            </EvolutionGridItem>
          ))}
        <EvolutionGridItemCenterWrap>
          {result && payout && <span>You earned {payout} P$</span>}
          <EvolutionGridItemCenterStyled
            bordercolor={expectingScaleColor}
            gridarea="c"
            level={evolutionListProgress}
            result={result}
            bg={resultImage}
          >
            {!result &&
              (evolutionListProgress < 100 ? (
                `${evolutionListProgress}%`
              ) : (
                <NeonButtonComponent onClick={evolve} title="Evolve" />
              ))}
            {evolutionInProgress && <EvolutionEffect />}
          </EvolutionGridItemCenterStyled>
          {result && resultTitle && (
            <p>
              Your new {resultTitle}!
              <br />
              {result && user && (
                <LinkStyled href={`/library/${user.id}`}>
                  Go to My Penguins
                </LinkStyled>
              )}
            </p>
          )}
        </EvolutionGridItemCenterWrap>
      </EvolutionGridContainer>
    </>
  );
};

export default EvolvePage;
