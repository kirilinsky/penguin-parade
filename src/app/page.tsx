"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "next-intl";
import ShowcaseHero from "@/components/pages/about/showcase/showcase-hero.component";
import { useL } from "@/components/pages/about/showcase/showcase-l10n";
import {
  ExploreCard,
  ExploreCardCount,
  ExploreCardTitle,
  ExploreGrid,
  ShowcaseSection,
  ShowcaseSectionTitle,
} from "@/components/pages/about/showcase/showcase-section.styled";
import {
  AboutPageContainer,
  AboutPageSectionBlock,
  AboutPageSectionImage,
  AboutPageSectionText,
} from "@/components/pages/about/about-page-layout/about-page-layout.styled";
import { showcaseStats } from "@/data/showcase";
import { tutorialBlocks } from "@/data/about";

export default function Home() {
  const locale = useLocale();
  const L = useL();

  const cards = [
    {
      href: "/catalog",
      title: L("Catalog", "Каталог"),
      count: `${showcaseStats.totalPenguins} ${L("penguins", "пингвинов")}`,
    },
    {
      href: "/market",
      title: L("Market", "Рынок"),
      count: `${showcaseStats.onMarket} ${L("offers", "лотов")}`,
    },
    {
      href: "/evolution",
      title: L("Evolution", "Эволюция"),
      count: L("visual demo", "визуал-демо"),
    },
    {
      href: "/expeditions",
      title: L("Expeditions", "Экспедиции"),
      count: `${showcaseStats.totalExpeditions} ${L("runs", "ходок")}`,
    },
  ];

  return (
    <>
      <ShowcaseHero />

      <ShowcaseSection>
        <ShowcaseSectionTitle>{L("Explore", "Разделы")}</ShowcaseSectionTitle>
        <ExploreGrid>
          {cards.map((c) => (
            <Link key={c.href} href={c.href} style={{ textDecoration: "none" }}>
              <ExploreCard>
                <ExploreCardTitle>{c.title}</ExploreCardTitle>
                <ExploreCardCount>{c.count}</ExploreCardCount>
              </ExploreCard>
            </Link>
          ))}
        </ExploreGrid>
      </ShowcaseSection>

      <ShowcaseSection>
        <ShowcaseSectionTitle>
          {L("How it worked", "Как это работало")}
        </ShowcaseSectionTitle>
        <AboutPageContainer>
          {tutorialBlocks.map((section, i) => (
            <AboutPageSectionBlock key={i} reverse={i % 2 !== 0}>
              <AboutPageSectionImage>
                <Image
                  width={200}
                  height={250}
                  src={`/tutorial/${section.img}.webp`}
                  alt={`Section ${i + 1}`}
                />
              </AboutPageSectionImage>
              <AboutPageSectionText>
                {section[locale as "ru" | "en"]}
              </AboutPageSectionText>
            </AboutPageSectionBlock>
          ))}
        </AboutPageContainer>
      </ShowcaseSection>
    </>
  );
}
