"use client";
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 1.2em 0.8em;
  background: rgba(255, 255, 255, 0.03);
`;

export const HeroStatNumber = styled.div`
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1;
`;

export const HeroStatLabel = styled.div`
  opacity: 0.65;
  margin-top: 0.4em;
  font-size: 0.85rem;
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
  gap: 0.5em;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 0.35em 0.9em;
  background: rgba(255, 255, 255, 0.03);
  strong {
    font-variant-numeric: tabular-nums;
  }
`;

export const ExpeditionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.2em;
`;

export const ExpeditionCard = styled.div<{ $borderColor: string }>`
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 14px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.03);
  display: flex;
  flex-direction: column;
`;

export const ExpeditionCardImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
`;

export const ExpeditionCardBody = styled.div`
  padding: 0.8em 1em 1em;
  display: flex;
  flex-direction: column;
  gap: 0.4em;
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
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 1.4em 1em;
  background: rgba(255, 255, 255, 0.03);
  text-align: center;
  transition: transform 0.15s ease, border-color 0.15s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.35);
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
