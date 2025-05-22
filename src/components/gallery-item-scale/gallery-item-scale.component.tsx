import React, { useMemo } from "react";
import { GalleryItemScaleStyled } from "./gallery-item-scale.component.styled";
import { Orbitron } from "next/font/google";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const GalleryItemScaleComponent = ({ scale }: { scale: string }) => {
  const baseColor = useMemo(() => {
    return getBaseColorByScale(scale);
  }, [scale]);
  return (
    <GalleryItemScaleStyled className={orbitron.className} color={baseColor}>
      {scale}
    </GalleryItemScaleStyled>
  );
};

export default GalleryItemScaleComponent;
