"use client";
import GalleryItemScaleComponent from "@/components/pages/gallery/gallery-item-scale/gallery-item-scale.component";
import { ScaleType, scaleOrder } from "@/types/scale.types";
import { showcaseStats } from "@/data/showcase";
import { useL } from "./showcase-l10n";
import {
  HeroStat,
  HeroStatGrid,
  HeroStatLabel,
  HeroStatNumber,
  HeroTagline,
  HeroTitle,
  HeroWrap,
  RarityChip,
  RarityRow,
  StatGroupLabel,
} from "./showcase-section.styled";

const ORIGIN_LABELS: Record<string, [string, string]> = {
  craft: ["Craft", "Крафт"],
  event: ["Event", "Ивент"],
  "crystal craft": ["Crystal craft", "Кристалл-крафт"],
  evolution: ["Evolution", "Эволюция"],
  "bad batch": ["Bad batch", "Брак"],
};

const ShowcaseHero = () => {
  const L = useL();
  const {
    totalPenguins,
    totalExpeditions,
    totalEvents,
    onMarket,
    rarityCount,
    originCount,
  } = showcaseStats;

  const rarities = Object.entries(rarityCount).sort(
    (a, b) =>
      scaleOrder.indexOf(a[0] as ScaleType) -
      scaleOrder.indexOf(b[0] as ScaleType)
  );

  const origins = Object.entries(originCount).sort((a, b) => b[1] - a[1]);

  return (
    <HeroWrap>
      <HeroTitle>Penguin Parade</HeroTitle>
      <HeroTagline>
        {L(
          "An AI penguin-collecting game: every penguin was uniquely generated, traded on a market, sent on expeditions and evolved into rarer forms. The project is now closed — this is a frozen archive of everything that was built.",
          "AI-игра про коллекционирование пингвинов: каждый пингвин генерировался уникально, торговался на рынке, ходил в экспедиции и эволюционировал в более редкие формы. Проект закрыт — это замороженный архив всего, что было создано."
        )}
      </HeroTagline>

      <HeroStatGrid>
        <HeroStat>
          <HeroStatNumber>{totalPenguins}</HeroStatNumber>
          <HeroStatLabel>{L("penguins created", "пингвинов создано")}</HeroStatLabel>
        </HeroStat>
        <HeroStat>
          <HeroStatNumber>{totalExpeditions}</HeroStatNumber>
          <HeroStatLabel>{L("expeditions", "экспедиций")}</HeroStatLabel>
        </HeroStat>
        <HeroStat>
          <HeroStatNumber>{totalEvents}</HeroStatNumber>
          <HeroStatLabel>{L("events", "ивентов")}</HeroStatLabel>
        </HeroStat>
        <HeroStat>
          <HeroStatNumber>{onMarket}</HeroStatNumber>
          <HeroStatLabel>{L("listed on market", "на рынке")}</HeroStatLabel>
        </HeroStat>
      </HeroStatGrid>

      {rarities.length > 0 && (
        <>
          <StatGroupLabel>{L("By rarity", "По редкости")}</StatGroupLabel>
          <RarityRow>
            {rarities.map(([rarity, count]) => (
              <RarityChip key={rarity}>
                <GalleryItemScaleComponent scale={rarity as ScaleType} />
                <strong>{count}</strong>
              </RarityChip>
            ))}
          </RarityRow>
        </>
      )}

      {origins.length > 0 && (
        <>
          <StatGroupLabel>{L("By origin", "По происхождению")}</StatGroupLabel>
          <RarityRow>
            {origins.map(([origin, count]) => {
              const lbl = ORIGIN_LABELS[origin];
              return (
                <RarityChip key={origin}>
                  <span>{lbl ? L(lbl[0], lbl[1]) : origin}</span>
                  <strong>{count}</strong>
                </RarityChip>
              );
            })}
          </RarityRow>
        </>
      )}
    </HeroWrap>
  );
};

export default ShowcaseHero;
