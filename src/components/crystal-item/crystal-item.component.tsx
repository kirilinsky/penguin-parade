import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { ScaleType } from "@/types/scale.types";
import React from "react";
import Tilt from "react-parallax-tilt";
import { CrystalItemContainer } from "./crystal-item.component.styled";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["900"],
  display: "swap",
});

const CrystalItemComponent = ({
  scale,
  amount,
}: {
  scale: ScaleType;
  amount?: number;
}) => {
  const glareColor = getBaseColorByScale(scale);
  return (
    <Tilt
      scale={1.2}
      glareEnable={true}
      glareMaxOpacity={0.65}
      glarePosition="all"
      glareColor={glareColor}
      glareBorderRadius={"16px"}
    >
      <CrystalItemContainer>
        <GalleryItemScaleComponent scale={scale} />
        <img
          src={`/csl/${scale}_csl.webp`}
          alt={scale}
          width="155"
          height={"160"}
        />
        {amount && <span className={orbitron.className}>{amount}</span>}
      </CrystalItemContainer>
    </Tilt>
  );
};

export default CrystalItemComponent;
