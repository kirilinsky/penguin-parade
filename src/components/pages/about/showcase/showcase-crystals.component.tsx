"use client";
import { CSSProperties } from "react";
import GalleryItemScaleComponent from "@/components/pages/gallery/gallery-item-scale/gallery-item-scale.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import {
  SHOWCASE_CRYSTAL_TYPES,
  showcaseCrystalStats,
  showcaseCrystalsObtained,
  showcaseCrystalsUsed,
} from "@/data/showcase";
import { useL } from "./showcase-l10n";
import {
  CrystalCard,
  CrystalGrid,
  CrystalImg,
  CrystalStat,
  CrystalStats,
  HeroStat,
  HeroStatGrid,
  HeroStatLabel,
  HeroStatNumber,
  ShowcaseSection,
  ShowcaseSectionSub,
  ShowcaseSectionTitle,
} from "./showcase-section.styled";

const ShowcaseCrystals = () => {
  const L = useL();

  return (
    <ShowcaseSection>
      <ShowcaseSectionTitle>{L("Crystals", "Кристаллы")}</ShowcaseSectionTitle>
      <ShowcaseSectionSub>
        {L(
          "Crystals were rare drops from expeditions, spent to craft a guaranteed high-tier penguin. Each tier had its own crystal.",
          "Кристаллы — редкая добыча из экспедиций, тратились на гарантированный крафт пингвина высокого тира. У каждого тира — свой кристалл."
        )}
      </ShowcaseSectionSub>

      <HeroStatGrid style={{ maxWidth: 520, margin: "0 auto 2.2em" }}>
        <HeroStat>
          <HeroStatNumber>{showcaseCrystalsObtained}</HeroStatNumber>
          <HeroStatLabel>{L("obtained", "получено")}</HeroStatLabel>
        </HeroStat>
        <HeroStat>
          <HeroStatNumber>{showcaseCrystalsUsed}</HeroStatNumber>
          <HeroStatLabel>{L("used", "применено")}</HeroStatLabel>
        </HeroStat>
      </HeroStatGrid>

      <CrystalGrid>
        {SHOWCASE_CRYSTAL_TYPES.map((type) => {
          const color = getBaseColorByScale(type);
          const stat = showcaseCrystalStats[type];
          return (
            <CrystalCard
              key={type}
              style={{ "--accent": color } as CSSProperties}
            >
              <CrystalImg src={`/csl/${type}_csl.webp`} alt={type} />
              <GalleryItemScaleComponent scale={type} />
              <CrystalStats>
                <CrystalStat>
                  <b>{stat.obtained}</b>
                  <span>{L("obtained", "получено")}</span>
                </CrystalStat>
                <CrystalStat>
                  <b>{stat.used}</b>
                  <span>{L("used", "применено")}</span>
                </CrystalStat>
              </CrystalStats>
            </CrystalCard>
          );
        })}
      </CrystalGrid>
    </ShowcaseSection>
  );
};

export default ShowcaseCrystals;
