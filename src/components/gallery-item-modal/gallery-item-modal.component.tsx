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
import { useAtomValue } from "jotai";
import { avatarAtom } from "@/atoms/user/user.atom";

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
      <GalleryItemModalContent>
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

        {isMyPage && currentAvatar !== img.imageUrl && (
          <GalleryItemModalButtonsContainer>
            <button
              onClick={() => setAvatar(img.imageUrl, img.settings.rarity)}
            >
              Set as avatar
            </button>
          </GalleryItemModalButtonsContainer>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default GalleryItemModalComponent;
