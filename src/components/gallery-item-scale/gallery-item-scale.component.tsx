import React from "react";
import { GalleryItemScaleStyled } from "./gallery-item-scale.component.styled";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const GalleryItemScaleComponent = ({
  scale,
  baseColor,
}: {
  scale: string;
  baseColor: string;
}) => {
  return (
    <GalleryItemScaleStyled className={orbitron.className} color={baseColor}>
      {scale}
    </GalleryItemScaleStyled>
  );
};

export default GalleryItemScaleComponent;
