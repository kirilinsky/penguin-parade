"use client";

import { ImageItem } from "@/types/image.types";
import React, { useMemo } from "react";

import { Orbitron } from "next/font/google";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import NeonButtonComponent from "../neon-button/neon-button.component";
import { format } from "date-fns";
import { User } from "@/types/friends.types";
import {
  GalleryItemModalButtonsContainer,
  GalleryItemModalContainer,
  GalleryItemModalContent,
  GalleryItemModalDes,
  GalleryItemModalImage,
  GalleryItemModalScale,
  GalleryItemModalTitle,
} from "../gallery-item-modal/gallery-item-modal.component.styled";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const AuctionItemModalComponent = ({
  img,
  onBuyImage,
  user,
  isLoading,
}: {
  img: ImageItem | null;
  user: User | null;
  isLoading: boolean;
  onBuyImage: (imgId: string) => void;
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
            scale={img.settings.rarity}
          />
        </GalleryItemModalScale>

        <GalleryItemModalDes>{img.settings.des}</GalleryItemModalDes>

        <span>Ability: {img.settings.ability}</span>

        <span>Loot: {img.settings.acc}</span>

        <span>Origin: {img.origin}</span>

        <span>Breast: {img.settings.breast}</span>

        <span>Beak: {img.settings.beak}</span>

        <span>Back: {img.settings.back}</span>

        <span>Created: {format(img.createdAt.toDate(), "dd.MM.yy")}</span>

        <span>
          On Auction since:{" "}
          {format(img.placedForAuctionAt.toDate(), "dd.MM.yy")}
        </span>

        {user && img.price && (
          <GalleryItemModalButtonsContainer>
            <NeonButtonComponent
              disabled={isLoading}
              onClick={() => onBuyImage(img.id)}
              title={isLoading ? "loading..." : `Buy for ${img.price} P$`}
            />
          </GalleryItemModalButtonsContainer>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default AuctionItemModalComponent;
