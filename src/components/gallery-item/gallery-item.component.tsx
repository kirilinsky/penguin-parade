import React, { useMemo } from "react";
import Tilt from "react-parallax-tilt";
import {
  GalleryItemContent,
  GalleryItemImage,
} from "./gallery-item.component.styled";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const GalleryItemComponent = ({ img }: { img: ImageItem }) => {
  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
  }, [img.settings.rarity]);
  return (
    <Tilt
      scale={1.13}
      key={img.id}
      glareEnable={true}
      glareMaxOpacity={0.8}
      glarePosition="all"
      glareColor={baseColor}
      glareBorderRadius="20px"
    >
      <GalleryItemContent>
        <GalleryItemScaleComponent
          baseColor={baseColor}
          scale={img.settings.rarity}
          className={orbitron.className}
        />
        <GalleryItemImage
          src={img.imageUrl}
          width={200}
          height={200}
          alt={img.title}
        />
        <p className={orbitron.className}>{img.title}</p>
      </GalleryItemContent>
    </Tilt>
  );
};

export default GalleryItemComponent;
