"use client";

import EvolutionGridContainer from "@/components/evolution-grid-container/evolution-grid-container.component";
import EvolutionGridItem from "@/components/evolution-grid-item/evolution-grid-item.component";
import { useGetImages } from "@/hooks/use-get-images";
import { ImageItem } from "@/types/image.types";
import React, { useEffect, useState } from "react";
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
  const [evolutionList, setEvolutionList] =
    useState<Record<string, EvolutionSlot>>(evolutionListDefault);
  const [filteredImages, setFilteredIMages] = useState<ImageItem[]>([]);
  const [currentRarityScale, setCurrentRarityScale] = useState<string | null>(
    null
  );
  const [currentKey, setCurrentKey] = useState<string | null>(null);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const evolutionKeys = Object.keys(evolutionListDefault);

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
    setFilteredIMages(filteredImagesDraft);
  }, [currentRarityScale]);

  const onItemClick = (e: any) => {
    e.stopPropagation();
    setShowLibraryModal(true);
    setCurrentKey(e.target.id);
  };

  return (
    <>
      <Rodal
        visible={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
      >
        <div>Choose Candidate</div>
        <span>for {currentKey} </span>
        <span>{currentRarityScale} - rarity</span>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {filteredImages.map((img: ImageItem) => (
            <div
              onClick={() => onImageClick(img)}
              key={img.id}
              style={{
                maxWidth: "20%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                border: "1px dashed green",
              }}
            >
              <img width={55} height={55} src={img.imageUrl} />
              <b>{img.title}</b>
            </div>
          ))}
        </div>
      </Rodal>
      <EvolutionGridContainer>
        {!loading &&
          evolutionKeys.map((key) => (
            <EvolutionGridItem
              value={evolutionList[key] ? evolutionList[key].imageUrl : null}
              onClick={onItemClick}
              key={key}
              gridarea={key}
            />
          ))}
        <EvolutionGridItem gridarea="c"></EvolutionGridItem>
      </EvolutionGridContainer>
    </>
  );
};

export default EvolvePage;
