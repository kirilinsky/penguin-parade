"use client";
import { CSSProperties, useMemo } from "react";
import { useLocale } from "next-intl";
import ExpeditionStatusBadge from "@/components/pages/expedition/expedition-status-badge/expedition-status-badge.component";
import GalleryItemScaleComponent from "@/components/pages/gallery/gallery-item-scale/gallery-item-scale.component";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { showcaseExpeditions } from "@/data/showcase";
import { useL } from "./showcase-l10n";
import {
  ExpeditionCard,
  ExpeditionCardBadge,
  ExpeditionCardBody,
  ExpeditionCardDesc,
  ExpeditionCardHead,
  ExpeditionCardImage,
  ExpeditionCardImageWrap,
  ExpeditionDetailsButton,
  ExpeditionGrid,
  ExpeditionStatRow,
  ShowcaseSection,
  ShowcaseSectionSub,
  ShowcaseSectionTitle,
} from "./showcase-section.styled";

const ShowcaseExpeditions = () => {
  const L = useL();
  const locale = useLocale();

  const expeditions = useMemo(
    () =>
      [...showcaseExpeditions].sort(
        (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
      ),
    []
  );

  if (expeditions.length === 0) return null;

  return (
    <ShowcaseSection>
      <ShowcaseSectionTitle>
        {L("Expeditions", "Экспедиции")} — {expeditions.length}
      </ShowcaseSectionTitle>
      <ShowcaseSectionSub>
        {L(
          "Players sent their penguins on themed expeditions to earn gold and rare crystals. Each expedition ran for a limited time with a participant cap.",
          "Игроки отправляли пингвинов в тематические экспедиции за золотом и редкими кристаллами. Каждая экспедиция шла ограниченное время с лимитом участников."
        )}
      </ShowcaseSectionSub>

      <ExpeditionGrid>
        {expeditions.map((e) => {
          const color = getBaseColorByScale(e.level);
          return (
            <ExpeditionCard
              key={e.id}
              $borderColor={color}
              style={{ "--accent": color } as CSSProperties}
            >
              {e.imageUrl && (
                <ExpeditionCardImageWrap>
                  <ExpeditionCardImage
                    src={e.imageUrl}
                    alt={getLocalized(e.settings?.title, locale)}
                  />
                  <ExpeditionCardBadge>
                    <GalleryItemScaleComponent scale={e.level} />
                  </ExpeditionCardBadge>
                </ExpeditionCardImageWrap>
              )}
              <ExpeditionCardBody>
                <ExpeditionCardHead>
                  <h3>{getLocalized(e.settings?.title, locale)}</h3>
                  <ExpeditionStatusBadge status={e.state} />
                </ExpeditionCardHead>
                {e.settings?.description && (
                  <ExpeditionCardDesc>
                    {getLocalized(e.settings.description, locale)}
                  </ExpeditionCardDesc>
                )}
                <ExpeditionStatRow>
                  <span>{L("Participants", "Участников")}</span>
                  <span>
                    {e.participantsCount} / {e.maxParticipants}
                  </span>
                </ExpeditionStatRow>
                {e.totalPenguinsCount > 0 && (
                  <ExpeditionStatRow>
                    <span>{L("Penguins sent", "Пингвинов отправлено")}</span>
                    <span>{e.totalPenguinsCount}</span>
                  </ExpeditionStatRow>
                )}
                {e.totalGoldEarned > 0 && (
                  <ExpeditionStatRow>
                    <span>{L("Gold earned", "Золота заработано")}</span>
                    <span>{e.totalGoldEarned}</span>
                  </ExpeditionStatRow>
                )}
                <ExpeditionStatRow>
                  <span>{L("Duration", "Длительность")}</span>
                  <span>{e.durationHours}h</span>
                </ExpeditionStatRow>

                <ExpeditionDetailsButton href={`/expeditions/${e.id}`}>
                  {L("View details", "Смотреть детали")} →
                </ExpeditionDetailsButton>
              </ExpeditionCardBody>
            </ExpeditionCard>
          );
        })}
      </ExpeditionGrid>
    </ShowcaseSection>
  );
};

export default ShowcaseExpeditions;
