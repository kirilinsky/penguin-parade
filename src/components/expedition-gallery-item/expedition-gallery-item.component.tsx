import React from "react";
import {
  ExpeditionGalleryItemContainer,
  ExpeditionGalleryItemSide,
  ExpeditionGalleryItemSideContainer,
} from "./expedition-gallery-item.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { useLocale } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import Image from "next/image";
import { format } from "date-fns";

const ExpeditionGalleryItem = ({ expedition }: { expedition: Expedition }) => {
  const locale = useLocale();
  return (
    <ExpeditionGalleryItemContainer>
      <h1>{getLocalized(expedition.settings.title, locale)}</h1>
      <p>
        description: {getLocalized(expedition.settings.description, locale)}
      </p>
      <ExpeditionGalleryItemSideContainer>
        <ExpeditionGalleryItemSide>
          <Image
            width={300}
            height={400}
            alt={getLocalized(expedition.settings.title, locale)}
            src={expedition.imageUrl}
          />
        </ExpeditionGalleryItemSide>
        <ExpeditionGalleryItemSide>
          <span>goal: {getLocalized(expedition.settings.goal, locale)}</span>
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
      </ExpeditionGalleryItemSideContainer>
    </ExpeditionGalleryItemContainer>
  );
};

export default ExpeditionGalleryItem;
