"use client";

import React from "react";
import Image from "next/image";
import { useGetImages } from "@/hooks/use-get-images";
import { useTranslations } from "next-intl";
import { format } from "date-fns";
import { PageContentBlockStyled } from "@/components/ui/page-content-block/page-content-block.component.styled";
import { LinkStyled } from "@/components/ui/link/link.component.styled";
import GalleryItemComponent from "../../gallery/gallery-item/gallery-item.component";

const LastCraftedBlockComponent = () => {
  const { lastCrafted, uid, loading } = useGetImages(true);
  const t = useTranslations("lastCraftedBlock");

  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      {loading ? (
        "loading..."
      ) : lastCrafted ? (
        <>
          <span>
            {t("createdAt")}:{" "}
            {format(lastCrafted.createdAt.toDate(), "dd.MM.yy")}
          </span>
          <GalleryItemComponent
            slim
            glare={false}
            scalable={false}
            img={lastCrafted}
          />
          <LinkStyled title="Library page" href={`/library/${uid}`}>
            {t("myLibraryLink")}
          </LinkStyled>
        </>
      ) : (
        <>
          <p>{t("noPenguinsTitle")}</p>
          <LinkStyled href={"/countdown"}>{t("craftLink")}</LinkStyled>
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

export default LastCraftedBlockComponent;
