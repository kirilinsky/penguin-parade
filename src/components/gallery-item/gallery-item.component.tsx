import React, { useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  GalleryItemContent,
  GalleryItemGiftBadge,
  GalleryItemImage,
  GalleryItemSkeleton,
} from "./gallery-item.component.styled";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { Orbitron } from "next/font/google";
import Image from "next/image";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const GalleryItemComponent = ({
  img,
  onClick = () => {},
  slim = false,
  scalable = true,
}: {
  img: ImageItem;
  onClick?: (img: ImageItem) => void;
  slim?: boolean;
  scalable?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);

  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
  }, [img.settings.rarity]);
  return (
    <Tilt
      scale={scalable ? 1.14 : 1}
      key={img.id}
      glareEnable={true}
      glareMaxOpacity={0.8}
      glarePosition="all"
      glareColor={baseColor}
      glareBorderRadius="20px"
    >
      <GalleryItemContent onClick={() => onClick(img)}>
        {img.gift && (
          <GalleryItemGiftBadge
            width={25}
            height={25}
            alt="gift"
            src="/gift_badge.webp"
          />
        )}
        <GalleryItemScaleComponent
          baseColor={baseColor}
          scale={img.settings.rarity}
          className={orbitron.className}
        />
        <GalleryItemSkeleton loaded={loaded} />
        <GalleryItemImage
          src={img.imageUrl}
          width={slim ? 165 : 205}
          height={slim ? 165 : 205}
          alt={img.title}
          color={baseColor}
          loaded={loaded}
          onLoad={() => setLoaded(true)}
          loading="lazy"
        />
        <p className={orbitron.className}>{img.title}</p>
        {img.auction && (
          <p>
            Price - {img.price}{" "}
            <Image src="/coin.webp" width={18} height={18} alt="coin" />{" "}
          </p>
        )}
      </GalleryItemContent>
    </Tilt>
  );
};

export default GalleryItemComponent;
