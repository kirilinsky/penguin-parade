"use client";

import { EvolutionEffect } from "@/components/evolution-effect/evolution-effect";
import EvolutionGridContainer from "@/components/evolution-grid-container/evolution-grid-container.component";
import EvolutionGridItem from "@/components/evolution-grid-item/evolution-grid-item.component";
import {
  EvolutionGridItemCenterStyled,
  EvolutionGridItemCenterWrap,
} from "@/components/evolution-grid-item/evolution-grid-item.component.styled";
import GalleryItemScaleComponent from "@/components/gallery-item-scale/gallery-item-scale.component";
import { LinkStyled } from "@/components/link/link.component.styled";
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
  const { user } = useUserDetails();
  const [evolutionList, setEvolutionList] =
    useState<Record<string, EvolutionSlot>>(evolutionListDefault);
  const [filteredImages, setFilteredIMages] = useState<ImageItem[]>([]);
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
    setFilteredIMages(images);
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
    setFilteredIMages(filteredImagesDraft);
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
    setFilteredIMages(filteredImagesDraft);
  }, [currentRarityScale]);

  const onItemClick = (e: any) => {
    e.stopPropagation();
    setShowLibraryModal(true);
    setCurrentKey(e.target.id);
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
        console.log(payout, "payout");
        console.log(downloadURL, "downloadURL res");
        console.log(title, "title res");
      }
    } catch (err) {
      console.error("Evolution check failed:", err);
      return { success: false, error: "Network error" };
    } finally {
      setEvolutionInProgress(false);
    }
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
        <h2>Choose Candidate</h2>
        {currentRarityScale && (
          <>
            {" "}
            <span> Current rarity: </span>
            <GalleryItemScaleComponent
              baseColor={currentScaleColor}
              scale={currentRarityScale}
            />
          </>
        )}
        {expectingRarityScale && (
          <>
            <span> Expecting rarity: </span>
            <GalleryItemScaleComponent
              baseColor={expectingScaleColor}
              scale={expectingRarityScale}
            />
          </>
        )}

        <div
          style={{
            display: "flex",
            height: "90%",
            gap: "12px",
            padding: "10px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            overflowY: "auto",
          }}
        >
          {filteredImages.map((img: ImageItem) => (
            <div
              onClick={() => onImageClick(img)}
              key={img.id}
              style={{
                maxWidth: "25%",

                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                border: "1px dashed green",
                borderRadius: "1em",
                cursor: "pointer",
              }}
            >
              <img width={"100%"} height={"100%"} src={img.imageUrl} />
              <h4>{img.title}</h4>
              <GalleryItemScaleComponent
                baseColor={getBaseColorByScale(img.settings.rarity)}
                scale={img.settings.rarity}
              />
            </div>
          ))}
        </div>
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
            />
          ))}
        <EvolutionGridItemCenterWrap>
          {" "}
          {result && resultTitle && <span>Your new {resultTitle}!</span>}
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
                <button onClick={evolve}>Evolve</button>
              ))}
            {evolutionInProgress && <EvolutionEffect />}
          </EvolutionGridItemCenterStyled>
          {result && payout && <span>You earned {payout} P$</span>}
          {user && (
            <LinkStyled href={`/library/${user.id}`}>
              Go to My Penguins
            </LinkStyled>
          )}
        </EvolutionGridItemCenterWrap>
      </EvolutionGridContainer>
    </>
  );
};

export default EvolvePage;
