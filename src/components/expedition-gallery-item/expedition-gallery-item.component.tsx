import React, { useMemo } from "react";
import {
  DetailsButton,
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
import ExpeditionCountdown from "../expedition-countdown/expedition-countdown.component";

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
  span:last-child {
    text-align: right;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin: 0.5em 0;
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: ".4em 1em",
          }}
        >
          {" "}
          <h2 style={{ textAlign: "center", marginBottom: "0.5em" }}>
            {getLocalized(expedition.settings.title, locale)}
          </h2>{" "}
          <ExpeditionStatusBadge status={expedition.state} />
        </div>

        <ExpeditionGalleryItemSideContainer>
          <ExpeditionGalleryItemSide>
            <ExpeditionGalleryItemImage
              alt={getLocalized(expedition.settings.title, locale)}
              src={expedition.imageUrl}
            />
          </ExpeditionGalleryItemSide>
          <ExpeditionGalleryItemSide>
            <ExpeditionGalleryItemDes>
              {getLocalized(expedition.settings.description, locale)}
            </ExpeditionGalleryItemDes>
            <Divider />
            <StatRow>
              <span>{t("target")} </span>
              <span>{getLocalized(expedition.settings.goal, locale)}</span>
            </StatRow>
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
            {expedition.totalPenguinsCount && (
              <StatRow>
                <span>{t("penguinsCount")} </span>
                <span>{expedition.totalPenguinsCount}</span>
              </StatRow>
            )}
            <ExpeditionCountdown expedition={expedition} />{" "}
            <div style={{ textAlign: "center", marginTop: ".1em" }}>
              <DetailsButton href={`/expeditions/${expedition.id}`}>
                {t("detailsLink")}
              </DetailsButton>
            </div>
          </ExpeditionGalleryItemSide>
        </ExpeditionGalleryItemSideContainer>
      </FadeInWrapper>
    </ExpeditionGalleryItemContainer>
  );
};

export default ExpeditionGalleryItem;
