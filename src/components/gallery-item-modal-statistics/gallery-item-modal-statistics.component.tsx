"use client";

import React from "react";
import {
  GalleryItemModalStatisticsDes,
  GalleryItemModalStatisticsExpedition,
  GalleryItemModalStatisticsGrid,
  GalleryItemModalStatisticsItem,
  GalleryItemModalStatisticsTrait,
} from "./gallery-item-modal-statistics.component.styled";
import { ImageItem } from "@/types/image.types";
import { format } from "date-fns";
import { useTranslations, useLocale } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { LinkStyled } from "../link/link.component.styled";

const GalleryItemModalStatistics = ({ img }: { img: ImageItem }) => {
  const t = useTranslations("galleryItemModalStatistics");
  const locale = useLocale();

  return (
    <GalleryItemModalStatisticsGrid>
      <GalleryItemModalStatisticsDes>
        {getLocalized(img.settings.des, locale)}
      </GalleryItemModalStatisticsDes>
      {img.inExpedition && (
        <GalleryItemModalStatisticsExpedition>
          <h2>{t("inExpedition")}</h2>
          <LinkStyled href={`/expeditions/${img.expedition}`}>
            {t("vistExpedition")}
          </LinkStyled>
        </GalleryItemModalStatisticsExpedition>
      )}

      <GalleryItemModalStatisticsItem>
        <h3>{t("theme")}</h3>
        <p>{getLocalized(img.settings.theme, locale)}</p>
      </GalleryItemModalStatisticsItem>

      <GalleryItemModalStatisticsItem>
        <h3>{t("ability")}</h3>
        <p>{getLocalized(img.settings.ability, locale)}</p>
      </GalleryItemModalStatisticsItem>

      <GalleryItemModalStatisticsItem>
        <h3>{t("loot")}</h3>
        <p>{getLocalized(img.settings.acc, locale)}</p>
      </GalleryItemModalStatisticsItem>

      <GalleryItemModalStatisticsItem>
        <h3>{t("createdAt")}</h3>
        <p>{format(img.createdAt.toDate(), "dd.MM.yy")}</p>
      </GalleryItemModalStatisticsItem>

      {img.auction && (
        <>
          <GalleryItemModalStatisticsItem>
            <h3>{t("auctionSince")}</h3>
            <p>{format(img.placedForAuctionAt.toDate(), "dd.MM.yy")}</p>
          </GalleryItemModalStatisticsItem>
          <GalleryItemModalStatisticsItem>
            <h3>{t("price")}</h3>
            <p>{img.price} P$</p>
          </GalleryItemModalStatisticsItem>
        </>
      )}

      <GalleryItemModalStatisticsTrait>
        <h3>{t("beak")}</h3>
        <p>{getLocalized(img.settings.beak, locale)}</p>
      </GalleryItemModalStatisticsTrait>

      <GalleryItemModalStatisticsTrait>
        <h3>{t("back")}</h3>
        <p>{getLocalized(img.settings.back, locale)}</p>
      </GalleryItemModalStatisticsTrait>

      <GalleryItemModalStatisticsTrait>
        <h3>{t("breast")}</h3>
        <p>{getLocalized(img.settings.breast, locale)}</p>
      </GalleryItemModalStatisticsTrait>

      <GalleryItemModalStatisticsTrait>
        <h3>{t("origin")}</h3>
        <p>{t(img.origin)}</p>
      </GalleryItemModalStatisticsTrait>
    </GalleryItemModalStatisticsGrid>
  );
};

export default GalleryItemModalStatistics;
