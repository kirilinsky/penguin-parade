"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { useGetImages } from "@/hooks/use-get-images";
import { useTranslations } from "next-intl";
import { PageContentBlockStyled } from "@/components/ui/page-content-block/page-content-block.component.styled";
import { LinkStyled } from "@/components/ui/link/link.component.styled";
import GalleryItemComponent from "../../gallery/gallery-item/gallery-item.component";

const RandomAuctionBlockComponent = () => {
  const { images, loading } = useGetImages(true, "auction");
  const t = useTranslations("randomAuctionBlock");

  const randomNumber = useMemo(() => {
    return Math.floor(Math.random() * images.length);
  }, [images]);

  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      {!loading && images && images.length ? (
        <>
          <GalleryItemComponent
            slim
            glare={false}
            scalable={false}
            img={images[randomNumber]}
          />

          <LinkStyled href="/market">{t("auctionButton")}</LinkStyled>
        </>
      ) : (
        <>
          <p>{t("emptyTitle")}</p>
          <span>{t("emptySubtitle")}</span>
          <Image
            alt="nofriends"
            src="/infographics/no-friends.png"
            width="120"
            height="120"
          />
        </>
      )}
    </PageContentBlockStyled>
  );
};

export default RandomAuctionBlockComponent;
