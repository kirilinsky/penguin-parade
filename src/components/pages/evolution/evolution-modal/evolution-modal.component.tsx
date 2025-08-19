import React from "react";
import GalleryItemScaleComponent from "../../gallery/gallery-item-scale/gallery-item-scale.component";
import { ImageItem } from "@/types/image.types";
import {
  EvolutionModalContainer,
  EvolutionModalGallery,
  EvolutionModalGalleryItem,
  EvolutionModalGalleryScaleWrap,
} from "./evolution-modal.component.styled";
import { ScaleType } from "@/types/scale.types";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";

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
  const locale = useLocale();
  const t = useTranslations("evolutionModal");
  return (
    <EvolutionModalContainer>
      <h2>{t("title")}</h2>
      <EvolutionModalGalleryScaleWrap>
        {currentRarityScale && (
          <>
            <span>{t("currentRarity")}</span>
            <GalleryItemScaleComponent scale={currentRarityScale} />
          </>
        )}
        {expectingRarityScale && (
          <>
            <span>{t("expectingRarity")}</span>
            <GalleryItemScaleComponent scale={expectingRarityScale} />
          </>
        )}
      </EvolutionModalGalleryScaleWrap>

      <EvolutionModalGallery>
        {filteredImages.length ? (
          filteredImages.map((img: ImageItem) => (
            <EvolutionModalGalleryItem
              onClick={() => onImageClick(img)}
              key={img.id}
            >
              <img width={"100%"} height={"100%"} src={img.imageUrl} />
              <h4>{getLocalized(img.settings.t, locale)}</h4>
              <GalleryItemScaleComponent scale={img.settings.rarity} />
            </EvolutionModalGalleryItem>
          ))
        ) : (
          <p>{t("notEnoughCandidates")}</p>
        )}
      </EvolutionModalGallery>
    </EvolutionModalContainer>
  );
};

export default EvolutionModalComponent;
