import React, { useMemo, useState } from "react";
import Tilt from "react-parallax-tilt";
import {
  GalleryImageExpeditionOverlay,
  GalleryImageFrameOverlay,
  GalleryImageWrap,
  GalleryItemBadBatchBadge,
  GalleryItemContent,
  GalleryItemGiftBadge,
  GalleryItemImage,
  GalleryItemNftBadge,
  GalleryItemSkeleton,
} from "./gallery-item.component.styled";
import { ImageItem } from "@/types/image.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { Tektur } from "next/font/google";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { LinkStyled } from "../link/link.component.styled";

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
      scale={scalable ? 1.13 : 1}
      key={img.id}
      glareEnable={glare}
      glareMaxOpacity={0.65}
      glarePosition="all"
      glareColor={baseColor}
      glareBorderRadius={"16px"}
      style={{ transformStyle: "preserve-3d" }}
    >
      <GalleryItemContent onClick={() => onClick(img)}>
        {img.gift && (
          <GalleryItemGiftBadge
            width={33}
            height={33}
            alt="gift"
            src="/gift_badge.webp"
          />
        )}
        {img.nft && (
          <GalleryItemNftBadge
            width={44}
            height={44}
            alt="nft"
            src="/nft_badge.webp"
          />
        )}
        {img.origin === "bad batch" && (
          <GalleryItemBadBatchBadge
            width={57}
            height={42}
            alt="bad batch"
            src="/badbatch_badge.webp"
          />
        )}
        <GalleryItemScaleComponent scale={img.settings.rarity} />
        <GalleryItemSkeleton loaded={loaded} />
        <GalleryImageWrap>
          {emperor && !img.inExpedition && (
            <GalleryImageFrameOverlay src="/emperor_frame.webp" alt="frame" />
          )}
          {img.inExpedition && (
            <GalleryImageExpeditionOverlay>
              <h3>{t("inExpedition")}</h3>
              <LinkStyled
                onClick={(e) => e.stopPropagation()}
                href={`/expeditions/${img.expedition}`}
              >
                {t("checkExpedition")}
              </LinkStyled>
            </GalleryImageExpeditionOverlay>
          )}
          <GalleryItemImage
            src={img.imageUrl}
            height={slim ? "62%" : "auto"}
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
          {img.nft && "nft 1"}
        </p>
        {img.auction && (
          <p>
            {t("price")} - {img.price}
            <Image src="/coin.webp" width={19} height={19} alt="coin" />{" "}
          </p>
        )}
      </GalleryItemContent>
    </Tilt>
  );
};

export default GalleryItemComponent;
