import React, { useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  GalleryImageFrameOverlay,
  GalleryImageWrap,
  GalleryItemBadBatchBadge,
  GalleryItemContent,
  GalleryItemGiftBadge,
  GalleryItemImage,
  GalleryItemSkeleton,
} from "./gallery-item.component.styled";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { Tektur } from "next/font/google";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";

const tektur = Tektur({
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
  const t = useTranslations("galleryItem");
  const locale = useLocale();

  const emperor = img.settings.rarity === "emperor";

  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
  }, [img.settings.rarity]);
  return (
    <Tilt
      scale={scalable ? 1.12 : 1}
      key={img.id}
      glareEnable={glare}
      glareMaxOpacity={0.7}
      glarePosition="all"
      glareColor={baseColor}
      glareBorderRadius="1em"
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
        <GalleryImageWrap>
          {emperor && (
            <GalleryImageFrameOverlay src="/emperor_frame.webp" alt="frame" />
          )}
          <GalleryItemImage
            src={img.imageUrl}
            width={slim ? "60%" : "100%"}
            height={slim ? "60%" : "100%"}
            alt={img.title}
            color={baseColor}
            emperor={emperor}
            loaded={loaded}
            onLoad={() => setLoaded(true)}
            loading="lazy"
          />
        </GalleryImageWrap>
        <p style={{ textAlign: "center" }} className={tektur.className}>
          {getLocalized(img.settings.t, locale)}
        </p>
        {img.auction && (
          <p>
            {t("price")} - {img.price}
            <Image src="/coin.webp" width={18} height={18} alt="coin" />{" "}
          </p>
        )}
      </GalleryItemContent>
    </Tilt>
  );
};

export default GalleryItemComponent;
