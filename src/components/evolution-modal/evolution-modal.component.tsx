import React from "react";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { ImageItem } from "@/types/image.types";
import {
  EvolutionModalContainer,
  EvolutionModalGallery,
  EvolutionModalGalleryItem,
  EvolutionModalGalleryScaleWrap,
} from "./evolution-modal.component.styled";
import { ScaleType } from "@/types/scale.types";

const EvolutionModalComponent = ({
  currentRarityScale,
  expectingRarityScale,
  filteredImages,
  onImageClick,
}: {
  currentRarityScale: ScaleType | null;
  expectingRarityScale: ScaleType | null;
  filteredImages: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) => {
  return (
    <EvolutionModalContainer>
      <h2>Choose Candidate for evolution. </h2>
      <EvolutionModalGalleryScaleWrap>
        {currentRarityScale && (
          <>
            <span> Current rarity: </span>
            <GalleryItemScaleComponent scale={currentRarityScale} />
          </>
        )}
        {expectingRarityScale && (
          <>
            <span> Expecting rarity: </span>
            <GalleryItemScaleComponent scale={expectingRarityScale} />
          </>
        )}
      </EvolutionModalGalleryScaleWrap>

      <EvolutionModalGallery>
        {filteredImages.map((img: ImageItem) => (
          <EvolutionModalGalleryItem
            onClick={() => onImageClick(img)}
            key={img.id}
          >
            <img width={"100%"} height={"100%"} src={img.imageUrl} />
            <h4>{img.title}</h4>
            <GalleryItemScaleComponent scale={img.settings.rarity} />
          </EvolutionModalGalleryItem>
        ))}
      </EvolutionModalGallery>
    </EvolutionModalContainer>
  );
};

export default EvolutionModalComponent;
