import { ImageItem } from "@/types/image.types";
import React, { useMemo } from "react";
import {
  GalleryItemModalButtonsContainer,
  GalleryItemModalContainer,
  GalleryItemModalContent,
  GalleryItemModalDes,
  GalleryItemModalImage,
  GalleryItemModalScale,
  GalleryItemModalTitle,
} from "./gallery-item-modal.component.styled";
import { Orbitron } from "next/font/google";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

import NeonButtonComponent from "../neon-button/neon-button.component";
import { format } from "date-fns";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const GalleryItemModalComponent = ({
  img,
  isMyPage,
  currentAvatar,
  setAvatar,
}: {
  img: ImageItem | null;
  isMyPage: boolean;
  currentAvatar: string | null;
  setAvatar: (a: string, aR: string) => void;
}) => {
  if (!img) return null;

  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
  }, [img.settings.rarity]);

  return (
    <GalleryItemModalContainer>
      <GalleryItemModalContent $frameColor={baseColor}>
        <GalleryItemModalImage
          alt={img.title}
          src={img.imageUrl}
          fill
          style={{ objectFit: "cover" }}
        />
      </GalleryItemModalContent>
      <GalleryItemModalContent>
        <GalleryItemModalTitle className={orbitron.className}>
          {img.title}
        </GalleryItemModalTitle>
        <GalleryItemModalScale>
          <GalleryItemScaleComponent
            baseColor={baseColor}
            className={orbitron.className}
            scale={img.settings.rarity}
          />
        </GalleryItemModalScale>
        <GalleryItemModalDes>{img.settings.des}</GalleryItemModalDes>

        <span>Theme: {img.settings.theme}</span>

        <span>Ability: {img.settings.ability}</span>

        <span>Loot: {img.settings.acc}</span>

        <span>Origin: {img.origin}</span>

        <span>Breast: {img.settings.breast}</span>

        <span>Beak: {img.settings.beak}</span>

        <span>Back: {img.settings.back}</span>

        <span>Created: {format(img.createdAt.toDate(), "dd.MM.yy")}</span>
        {isMyPage && (
          <GalleryItemModalButtonsContainer>
            {currentAvatar !== img.imageUrl && (
              <NeonButtonComponent
                title="Set as avatar"
                onClick={() => setAvatar(img.imageUrl, img.settings.rarity)}
              />
            )}
            <NeonButtonComponent title="Give a friend (TBA)" />
            <NeonButtonComponent title="Sell on auction (TBA)" />
          </GalleryItemModalButtonsContainer>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default GalleryItemModalComponent;
