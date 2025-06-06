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
import { format } from "date-fns";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { LinkStyled } from "../link/link.component.styled";
import ExpeditionStatusBadge from "../expedition-status-badge/expedition-status-badge.component";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import styled from "styled-components";

const FadeInWrapper = styled.div`
  animation: fadeInUp 0.6s ease both;
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.2em 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  span:first-child {
    opacity: 0.7;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin: .5em 0;
`;

const ExpeditionGalleryItem = ({ expedition }: { expedition: Expedition }) => {
  const locale = useLocale();
  const t = useTranslations("expeditionItem");
  const borderColor = useMemo(
    () => getBaseColorByScale(expedition.level),
    [expedition.level]
  );

  const expeditionEnded = expedition.state === "ended";

  return (
    <ExpeditionGalleryItemContainer
      $ended={expeditionEnded}
      $borderColor={borderColor}
    >
      <FadeInWrapper>
        <h1 style={{ textAlign: "center", marginBottom: "0.5em" }}>
          {getLocalized(expedition.settings.title, locale)}
        </h1>
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
            <Divider />
            <StatRow>
              <span>{t("theme")} </span>
              <span>{getLocalized(expedition.settings.theme, locale)}</span>
            </StatRow>
            <StatRow>
              <span>{expeditionEnded ? t("ended") : t("started")} </span>
              <span>
                {format(
                  expeditionEnded
                    ? expedition.activePhaseEndedAt.toDate()
                    : expedition.preparationStartedAt.toDate(),
                  "dd.MM.yy"
                )}
              </span>
            </StatRow>
            <StatRow>
              <span>{t("expLevel")} </span>
              <GalleryItemScaleComponent scale={expedition.level} />
            </StatRow>
            <StatRow>
              <span>{t("minPing")} </span>
              <span>{expedition.minParticipants}</span>
            </StatRow>
            <StatRow>
              <span>{t("maxPing")} </span>
              <span>{expedition.maxParticipants}</span>
            </StatRow>
            <StatRow>
              <span>{t("participantsCount")} </span>
              <span>{expedition.participantsCount}</span>
            </StatRow>
            <StatRow>
              <span>{t("penguinsCount")} </span>
              <span>{expedition.totalPenguinsCount}</span>
            </StatRow>
            <Divider />
            <div style={{ textAlign: "center", marginTop: "1em" }}>
              <LinkStyled href={`/expeditions/${expedition.id}`}>
                {t("detailsLink")}
              </LinkStyled>
            </div>
          </ExpeditionGalleryItemSide>
        </ExpeditionGalleryItemSideContainer>
        <h4 style={{ textAlign: "center", marginTop: "1em" }}>
          {t("target")} {getLocalized(expedition.settings.goal, locale)}
        </h4>
      </FadeInWrapper>
    </ExpeditionGalleryItemContainer>
  );
};

export default ExpeditionGalleryItem;
