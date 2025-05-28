import React, { useMemo } from "react";
import {
  ExpeditionGalleryItemContainer,
  ExpeditionGalleryItemImage,
  ExpeditionGalleryItemSide,
  ExpeditionGalleryItemSideContainer,
} from "./expedition-gallery-item.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { useLocale } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import Image from "next/image";
import { format } from "date-fns";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

const ExpeditionGalleryItem = ({ expedition }: { expedition: Expedition }) => {
  const locale = useLocale();
  const borderColor = useMemo(() => {
    return getBaseColorByScale(expedition.level);
  }, [expedition.level]);
  return (
    <ExpeditionGalleryItemContainer $borderColor={borderColor}>
      <h1>{getLocalized(expedition.settings.title, locale)}</h1>
      <ExpeditionGalleryItemSideContainer>
        <ExpeditionGalleryItemSide>
          <ExpeditionGalleryItemImage
            alt={getLocalized(expedition.settings.title, locale)}
            src={expedition.imageUrl}
          />
        </ExpeditionGalleryItemSide>
        <ExpeditionGalleryItemSide>
          <p>
            description: {getLocalized(expedition.settings.description, locale)}
          </p>
          <span>theme: {getLocalized(expedition.settings.theme, locale)}</span>
          <span>current status: {expedition.state}</span>
          <span>
            preparation started at:
            {format(expedition.preparationStartedAt.toDate(), "dd.MM.yy")}
          </span>
          <span>level: {expedition.level}</span>
          <span>min Participants: {expedition.minParticipants}</span>
          <span>max Participants: {expedition.maxParticipants}</span>
          <span>participants Count: {expedition.participantsCount}</span>
        </ExpeditionGalleryItemSide>
      </ExpeditionGalleryItemSideContainer>{" "}
      <span>goal: {getLocalized(expedition.settings.goal, locale)}</span>
    </ExpeditionGalleryItemContainer>
  );
};

export default ExpeditionGalleryItem;
