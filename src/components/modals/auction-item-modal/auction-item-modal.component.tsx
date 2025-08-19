"use client";

import { ImageItem } from "@/types/image.types";
import React, { useMemo } from "react";

import { Tektur } from "next/font/google";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

import { useTranslations } from "next-intl";
import { User } from "@/types/user.types";

import GalleryItemScaleComponent from "@/components/pages/gallery/gallery-item-scale/gallery-item-scale.component";
import NeonButtonComponent from "@/components/ui/neon-button/neon-button.component";
import {
  GalleryItemModalButtonsContainer,
  GalleryItemModalContainer,
  GalleryItemModalContent,
  GalleryItemModalImage,
  GalleryItemModalScale,
  GalleryItemModalTitle,
} from "../gallery-item-modal/gallery-item-modal.component.styled";
import GalleryItemModalStatistics from "../gallery-item-modal-statistics/gallery-item-modal-statistics.component";

const tektur = Tektur({
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
  const t = useTranslations("auctionItemModal");
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
        <GalleryItemModalTitle className={tektur.className}>
          {img.title}
        </GalleryItemModalTitle>
        <GalleryItemModalScale>
          <GalleryItemScaleComponent scale={img.settings.rarity} />
        </GalleryItemModalScale>
        <GalleryItemModalStatistics img={img} />
        {user && img.price && (
          <GalleryItemModalButtonsContainer>
            <NeonButtonComponent
              disabled={isLoading}
              onClick={() => onBuyImage(img.id)}
              title={isLoading ? t("buying") : t("buyButton")}
            />
          </GalleryItemModalButtonsContainer>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default AuctionItemModalComponent;
