import React, { useMemo } from "react";
import {
  ExpeditionGalleryItemContainer,
  ExpeditionGalleryItemDes,
  ExpeditionGalleryItemImage,
  ExpeditionGalleryItemSide,
  ExpeditionGalleryItemSideContainer,
} from "./expedition-gallery-item.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import Image from "next/image";
import { format } from "date-fns";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { LinkStyled } from "../link/link.component.styled";
import ExpeditionStatusBadge from "../expedition-status-badge/expedition-status-badge.component";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";

const ExpeditionGalleryItem = ({ expedition }: { expedition: Expedition }) => {
  const locale = useLocale();
  const t = useTranslations("expeditionItem");
  const borderColor = useMemo(() => {
    return getBaseColorByScale(expedition.level);
  }, [expedition.level]);
  return (
    <ExpeditionGalleryItemContainer $borderColor={borderColor}>
      <h1>{getLocalized(expedition.settings.title, locale)}</h1>{" "}
      <ExpeditionGalleryItemSideContainer>
        <ExpeditionGalleryItemSide>
          <ExpeditionGalleryItemImage
            alt={getLocalized(expedition.settings.title, locale)}
            src={expedition.imageUrl}
          />
        </ExpeditionGalleryItemSide>
        <ExpeditionGalleryItemSide>
          <ExpeditionStatusBadge status={expedition.state} />
          <ExpeditionGalleryItemDes>
            {getLocalized(expedition.settings.description, locale)}
          </ExpeditionGalleryItemDes>
          <span>{getLocalized(expedition.settings.theme, locale)}</span>
          {expedition.state === "ended" ? (
            <span>
              {t("ended")}{" "}
              {format(expedition.activePhaseEndedAt.toDate(), "dd.MM.yy")}
            </span>
          ) : (
            <span>
              {t("started")}{" "}
              {format(expedition.preparationStartedAt.toDate(), "dd.MM.yy")}
            </span>
          )}
          <span>
            {t("expLevel")}{" "}
            <GalleryItemScaleComponent scale={expedition.level} />
          </span>
          <span>
            {t("minPing")} {expedition.minParticipants}
          </span>
          <span>
            {t("maxPing")} {expedition.maxParticipants}
          </span>
          <span>
            {t("participantsCount")} {expedition.participantsCount}
          </span>
          <span>
            {t("penguinsCount")} {expedition.totalPenguinsCount}
          </span>
          <LinkStyled href={`/expeditions/${expedition.id}`}>
            {t("detailsLink")}
          </LinkStyled>
        </ExpeditionGalleryItemSide>
      </ExpeditionGalleryItemSideContainer>
      <h4 style={{ textAlign: "center" }}>
        {t("target")} {getLocalized(expedition.settings.goal, locale)}
      </h4>
    </ExpeditionGalleryItemContainer>
  );
};

export default ExpeditionGalleryItem;
