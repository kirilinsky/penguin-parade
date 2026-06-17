"use client";
import Link from "next/link";
import styled from "styled-components";

export const ShowcaseSection = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5em 1em;
`;

export const ShowcaseSectionTitle = styled.h2`
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  text-align: center;
  margin: 0 0 0.2em;
`;

export const ShowcaseSectionSub = styled.p`
  text-align: center;
  opacity: 0.7;
  margin: 0 auto 1.6em;
  max-width: 640px;
  line-height: 1.5;
`;

export const HeroWrap = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 3em 1em 1em;
  text-align: center;
`;

export const HeroTitle = styled.h1`
  font-size: clamp(2rem, 6vw, 4rem);
  margin: 0 0 0.2em;
  background: linear-gradient(90deg, #03a1d9, #93ff16, #f7036d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const HeroTagline = styled.p`
  opacity: 0.8;
  max-width: 680px;
  margin: 0 auto 2em;
  line-height: 1.6;
`;

export const HeroStatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1em;
  margin-bottom: 2.5em;
`;

export const HeroStat = styled.div`
  position: relative;
  border: 1px solid rgba(45, 225, 145, 0.25);
  border-radius: 16px;
  padding: 1.3em 0.9em;
  background: linear-gradient(
    180deg,
    rgba(45, 225, 145, 0.08),
    rgba(0, 0, 0, 0.25)
  );
  box-shadow: 0 0 14px rgba(45, 225, 145, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: rgba(45, 225, 145, 0.6);
    box-shadow: 0 8px 22px rgba(45, 225, 145, 0.18);
  }
`;

export const HeroStatNumber = styled.div`
  font-size: clamp(1.9rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(90deg, #2de191, #93ff16);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const HeroStatLabel = styled.div`
  opacity: 0.7;
  margin-top: 0.5em;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const RarityRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8em;
`;

export const RarityChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  height: 2.6em;
  padding: 0 1.1em;
  font-size: 0.95rem;
  line-height: 1;
  border: 1px solid color-mix(in srgb, var(--accent, #2de191) 50%, transparent);
  border-radius: 999px;
  background: color-mix(in srgb, var(--accent, #2de191) 10%, rgba(0, 0, 0, 0.25));
  box-shadow: 0 0 10px color-mix(in srgb, var(--accent, #2de191) 18%, transparent);
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 16px color-mix(in srgb, var(--accent, #2de191) 32%, transparent);
  }

  /* normalise inner label (rarity name / origin text) to one size */
  > * {
    font-size: 0.95em;
    line-height: 1;
  }

  span {
    opacity: 0.88;
  }
  strong {
    font-size: 1em;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
`;

export const ExpeditionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2em;
`;

export const ExpeditionCard = styled.div<{ $borderColor: string }>`
  border: 1px solid
    color-mix(in srgb, ${({ $borderColor }) => $borderColor} 55%, transparent);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.18s ease, box-shadow 0.18s ease,
    border-color 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $borderColor }) => $borderColor};
    box-shadow: 0 8px 26px
      color-mix(in srgb, ${({ $borderColor }) => $borderColor} 30%, transparent);
  }
`;

export const ExpeditionCardImageWrap = styled.div`
  position: relative;
  line-height: 0;
`;

export const ExpeditionCardImage = styled.img`
  width: 100%;
  height: 224px;
  object-fit: cover;
  display: block;
`;

export const ExpeditionCardBadge = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  display: flex;
  align-items: center;
  gap: 0.3em;
  padding: 0.34em 0.7em;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border: 1px solid var(--accent, #2de191);
  font-size: 0.78rem;
  line-height: 1;

  > * {
    line-height: 1;
  }
`;

export const ExpeditionCardBody = styled.div`
  padding: 0.85em 1em 1em;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
  flex: 1;
`;

export const ExpeditionCardHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6em;
  h3 {
    margin: 0;
    font-size: 1.05rem;
  }
`;

export const ExpeditionCardDesc = styled.p`
  margin: 0.2em 0 0.4em;
  opacity: 0.75;
  font-size: 0.9rem;
  line-height: 1.4;
`;

export const ExpeditionStatRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.88rem;
  padding: 0.18em 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.08);
  span:first-child {
    opacity: 0.6;
  }
`;

export const ExpeditionDetailsButton = styled(Link)`
  margin-top: auto;
  display: block;
  text-align: center;
  text-decoration: none;
  padding: 0.6em 1em;
  border-radius: 10px;
  border: 1px solid var(--accent, #2de191);
  color: var(--accent, #2de191);
  font-weight: 600;
  letter-spacing: 0.03em;
  transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background: var(--accent, #2de191);
    color: #04140d;
    box-shadow: 0 0 14px color-mix(in srgb, var(--accent, #2de191) 50%, transparent);
  }
`;

export const StatGroupLabel = styled.h3`
  text-align: center;
  font-size: 0.9rem;
  font-weight: 600;
  opacity: 0.5;
  margin: 1.8em 0 0.8em;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

export const ExploreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1em;
  max-width: 900px;
  margin: 0 auto 1em;
`;

export const ExploreCard = styled.div`
  border: 1px solid rgba(45, 225, 145, 0.25);
  border-radius: 16px;
  padding: 1.4em 1em;
  background: linear-gradient(
    180deg,
    rgba(45, 225, 145, 0.06),
    rgba(0, 0, 0, 0.22)
  );
  text-align: center;
  transition: transform 0.18s ease, border-color 0.18s ease,
    box-shadow 0.18s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    border-color: rgba(45, 225, 145, 0.6);
    box-shadow: 0 8px 22px rgba(45, 225, 145, 0.18);
  }
  &:hover .ce-cta {
    color: #93ff16;
  }
  &:hover .ce-cta .arrow {
    transform: translateX(5px);
  }
`;

export const ExploreCardTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const ExploreCardCount = styled.div`
  opacity: 0.6;
  margin-top: 0.3em;
  font-size: 0.9rem;
`;

export const ExploreCardCta = styled.div`
  margin-top: 0.9em;
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #2de191;
  transition: color 0.18s ease;

  .arrow {
    display: inline-block;
    transition: transform 0.18s ease;
  }
`;

export const EventList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  max-width: 1100px;
  margin: 0 auto;
`;

export const EventCard = styled.div`
  border: 1px solid rgba(45, 225, 145, 0.4);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  box-shadow: 0 0 18px rgba(45, 225, 145, 0.12);
`;

export const EventCardInner = styled.div`
  display: flex;
  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

export const EventBannerWrap = styled.div`
  flex: 0 0 42%;
  max-width: 42%;
  @media (max-width: 760px) {
    flex: none;
    max-width: 100%;
  }
`;

export const EventBanner = styled.img`
  width: 100%;
  height: 100%;
  min-height: 220px;
  max-height: 360px;
  object-fit: cover;
  display: block;
  @media (max-width: 760px) {
    max-height: 240px;
  }
`;

export const EventBody = styled.div`
  padding: 1.4em 1.5em;
  display: flex;
  flex-direction: column;
  gap: 0.7em;
  min-width: 0;
`;

export const EventTitle = styled.h2`
  margin: 0;
  font-size: clamp(1.3rem, 3vw, 1.9rem);
`;

export const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6em;
`;

export const EventMetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  font-size: 0.82rem;
  border: 1px solid rgba(45, 225, 145, 0.35);
  border-radius: 999px;
  padding: 0.25em 0.8em;
  background: rgba(0, 0, 0, 0.25);
  white-space: nowrap;
`;

export const EventDesc = styled.p`
  margin: 0;
  opacity: 0.82;
  line-height: 1.55;
  font-style: italic;
`;

export const EventPenguinsWrap = styled.div`
  padding: 1em 1.2em 1.3em;
  border-top: 1px dashed rgba(255, 255, 255, 0.1);
`;

export const EventPenguinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(84px, 1fr));
  gap: 0.6em;
`;

export const EventPenguinThumb = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  cursor: pointer;
  transition: transform 0.15s ease, border-color 0.15s ease,
    box-shadow 0.15s ease;
  &:hover {
    transform: scale(1.07);
    border-color: #2de191;
    box-shadow: 0 0 12px rgba(45, 225, 145, 0.4);
    z-index: 1;
  }
`;

export const CrystalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
  gap: 1.2em;
  max-width: 1000px;
  margin: 0 auto;
`;

export const CrystalCard = styled.div`
  border: 1px solid color-mix(in srgb, var(--accent, #2de191) 45%, transparent);
  border-radius: 16px;
  padding: 1.3em 1em;
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--accent, #2de191) 12%, transparent),
    rgba(0, 0, 0, 0.28)
  );
  box-shadow: 0 0 16px color-mix(in srgb, var(--accent, #2de191) 16%, transparent);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7em;
  text-align: center;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px
      color-mix(in srgb, var(--accent, #2de191) 32%, transparent);
  }
`;

export const CrystalImg = styled.img`
  width: 118px;
  height: auto;
  filter: drop-shadow(
    0 0 12px color-mix(in srgb, var(--accent, #2de191) 55%, transparent)
  );
`;

export const CrystalStats = styled.div`
  display: flex;
  gap: 0.5em;
  width: 100%;
`;

export const CrystalStat = styled.div`
  flex: 1;
  min-width: 0;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 0.5em 0.3em;
  background: rgba(0, 0, 0, 0.2);

  b {
    display: block;
    font-size: 1.35rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  span {
    opacity: 0.6;
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
`;

export const AvatarGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
`;

export const PenguinAvatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid var(--accent, #2de191);
  box-shadow: 0 0 8px color-mix(in srgb, var(--accent, #2de191) 30%, transparent);
  transition: transform 0.15s ease;
  &:hover {
    transform: scale(1.14);
    z-index: 1;
  }
  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
  }
`;

export const PrizeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7em;
  align-items: stretch;
`;

export const PrizeChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6em;
  border: 1px solid rgba(45, 225, 145, 0.35);
  border-radius: 12px;
  padding: 0.5em 0.9em;
  background: rgba(0, 0, 0, 0.25);
  img {
    display: block;
  }
  b {
    font-size: 1.25rem;
    line-height: 1;
  }
  span {
    opacity: 0.65;
    font-size: 0.8rem;
  }
`;
