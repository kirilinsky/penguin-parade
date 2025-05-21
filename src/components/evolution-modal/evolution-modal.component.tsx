import React from "react";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import {
  EvolutionModalContainer,
  EvolutionModalGallery,
  EvolutionModalGalleryItem,
} from "./evolution-modal.component.styled";

const EvolutionModalComponent = ({
  currentRarityScale,
  currentScaleColor,
  expectingRarityScale,
  expectingScaleColor,
  filteredImages,
  onImageClick,
}: {
  currentRarityScale: string | null;
  expectingRarityScale: string | null;
  currentScaleColor: string;
  expectingScaleColor: string;
  filteredImages: ImageItem[];
  onImageClick: (img: ImageItem) => void;
}) => {
  return (
    <EvolutionModalContainer>
      <h2>Choose Candidate for evolution. </h2>
      <h4>
        {currentRarityScale && (
          <>
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
      </h4>

      <EvolutionModalGallery>
        {filteredImages.map((img: ImageItem) => (
          <EvolutionModalGalleryItem onClick={() => onImageClick(img)} key={img.id}>
            <img width={"100%"} height={"100%"} src={img.imageUrl} />
            <h4>{img.title}</h4>
            <GalleryItemScaleComponent
              baseColor={getBaseColorByScale(img.settings.rarity)}
              scale={img.settings.rarity}
            />
          </EvolutionModalGalleryItem>
        ))}
      </EvolutionModalGallery>
    </EvolutionModalContainer>
  );
};

export default EvolutionModalComponent;
