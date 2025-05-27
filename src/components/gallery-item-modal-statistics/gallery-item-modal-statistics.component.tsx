import React from "react";
import {
  GalleryItemModalStatisticsDes,
  GalleryItemModalStatisticsGrid,
  GalleryItemModalStatisticsItem,
  GalleryItemModalStatisticsTrait,
} from "./gallery-item-modal-statistics.component.styled";
import { ImageItem } from "@/types/image.types";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

const GalleryItemModalStatistics = ({ img }: { img: ImageItem }) => {
  const t= useTranslations("galleryItemModalStatistics")
  return (
    <GalleryItemModalStatisticsGrid>
      <GalleryItemModalStatisticsDes>
        {img.settings.des}
      </GalleryItemModalStatisticsDes>
      <GalleryItemModalStatisticsItem>
        <h3>{t("theme")}</h3>
        <p>{img.settings.theme}</p>
      </GalleryItemModalStatisticsItem>
      <GalleryItemModalStatisticsItem>
        <h3>{t("ability")}</h3>
        <p>{img.settings.ability}</p>
      </GalleryItemModalStatisticsItem>
      <GalleryItemModalStatisticsItem>
        <h3>{t("loot")}</h3>
        <p>{img.settings.acc}</p>
      </GalleryItemModalStatisticsItem>
      <GalleryItemModalStatisticsItem>
        <h3>{t("createdAt")}</h3>
        <p>{format(img.createdAt.toDate(), "dd.MM.yy")}</p>
      </GalleryItemModalStatisticsItem>
      {img.auction && (
        <GalleryItemModalStatisticsItem>
          <h3>{t("auctionSince")}</h3>
          <p>{format(img.placedForAuctionAt.toDate(), "dd.MM.yy")}</p>
        </GalleryItemModalStatisticsItem>
      )}
      {img.auction && (
        <GalleryItemModalStatisticsItem>
          <h3>{t("price")}</h3>
          <p>{img.price} P$</p>
        </GalleryItemModalStatisticsItem>
      )}
      <GalleryItemModalStatisticsTrait>
        <h3>{t("beak")}</h3>
        <p>{img.settings.beak}</p>
      </GalleryItemModalStatisticsTrait>
      <GalleryItemModalStatisticsTrait>
        <h3>{t("back")}</h3>
        <p>{img.settings.back}</p>
      </GalleryItemModalStatisticsTrait>
      <GalleryItemModalStatisticsTrait>
        <h3>{t("breast")}</h3>
        <p>{img.settings.breast}</p>
      </GalleryItemModalStatisticsTrait>
      <GalleryItemModalStatisticsTrait>
        <h3>{t("origin")}</h3>
        <p>{img.origin}</p>
      </GalleryItemModalStatisticsTrait>
    </GalleryItemModalStatisticsGrid>
  );
};

export default GalleryItemModalStatistics;
