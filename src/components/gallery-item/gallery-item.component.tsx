import React, { useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  GalleryItemBadBatchBadge,
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
  glare = true,
  scalable = true,
}: {
  img: ImageItem;
  onClick?: (img: ImageItem) => void;
  slim?: boolean;
  glare?: boolean;
  scalable?: boolean;
}) => {
  const [loaded, setLoaded] = useState(false);

  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
  }, [img.settings.rarity]);
  return (
    <Tilt
      scale={scalable ? 1.15 : 1}
      key={img.id}
      glareEnable={glare}
      glareMaxOpacity={0.8}
      glarePosition="all"
      glareColor={baseColor}
      glareBorderRadius="20px"
    >
      <GalleryItemContent onClick={() => onClick(img)}>
        {img.gift && (
          <GalleryItemGiftBadge
            width={31}
            height={31}
            alt="gift"
            src="/gift_badge.webp"
          />
        )}
        {img.origin === "bad batch" && (
          <GalleryItemBadBatchBadge
            width={55}
            height={40}
            alt="bad batch"
            src="/badbatch_badge.webp"
          />
        )}
        <GalleryItemScaleComponent scale={img.settings.rarity} />
        <GalleryItemSkeleton loaded={loaded} />
        <GalleryItemImage
          src={img.imageUrl}
          width={slim ? "60%" : "95%"}
          height={slim ? "60%" : "95%"}
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
