import React, { useMemo } from "react";
import {
  GalleryItemScaleFleuron,
  GalleryItemScaleGold,
  GalleryItemScaleGoldContainer,
  GalleryItemScaleStyled,
} from "./gallery-item-scale.component.styled";
import { Orbitron } from "next/font/google";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { ScaleType } from "@/types/scale.types";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const GalleryItemScaleComponent = ({ scale }: { scale: ScaleType }) => {
  const baseColor = useMemo(() => {
    return getBaseColorByScale(scale);
  }, [scale]);
  const emperor = scale === "emperor";
  if (emperor) {
    return (
      <GalleryItemScaleGoldContainer>
        <GalleryItemScaleFleuron
          src="/fleuron_left.webp"
          alt="fleuron"
          width={15}
          height={16}
        />
        <GalleryItemScaleGold>{scale}</GalleryItemScaleGold>{" "}
        <GalleryItemScaleFleuron
          src="/fleuron_right.webp"
          alt="fleuron"
          width={15}
          height={16}
        />
      </GalleryItemScaleGoldContainer>
    );
  }
  return (
    <GalleryItemScaleStyled className={orbitron.className} color={baseColor}>
      {scale}
    </GalleryItemScaleStyled>
  );
};

export default GalleryItemScaleComponent;
