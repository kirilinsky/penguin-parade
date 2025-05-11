import React, { useMemo } from "react";
import Tilt from "react-parallax-tilt";
import {
  GalleryItemContent,
  GalleryItemImage,
} from "./gallery-item.component.styled";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";

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
        />
        <GalleryItemImage src={img.imageUrl} width={215} alt={img.title} />
        <p>{img.title}</p>
      </GalleryItemContent>
    </Tilt>
  );
};

export default GalleryItemComponent;
