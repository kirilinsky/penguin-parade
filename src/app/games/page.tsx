"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

type GameTile = {
  id: string;
  title: string;
  slug: string;           // ссылка на страницу игры
  description: string;
  image: string;          // url или импорт
  cta?: string;           // текст кнопки
  lockedUntilMs?: number; // если есть кулдаун — показываем таймер
};

// TODO: заменишь на реальные данные/локализацию
const tiles: GameTile[] = [
  {
    id: "evolution",
    title: "Evolution",
    slug: "/evolution",
    description:
      "Merge 8 penguins into a higher rank. Trade evolved ones on the auction.",
    image: "/images/games/evolution.jpg",
    cta: "Open",
  },
  {
    id: "expeditions",
    title: "Expeditions",
    slug: "/expeditions",
    description:
      "Send your squad on timed quests to earn gold and crystals.",
    image: "/images/games/expedition.jpg",
    cta: "Open",
  },
  {
    id: "guess-own",
    title: "Guess Your Penguin",
    slug: "/games/guess-own",
    description:
      "Two cards: yours and someone else’s. Pick yours in 10 seconds.",
    image: "/images/games/guess-own.jpg",
    cta: "Play",
    // пример: заблокировано до завтра
    lockedUntilMs: Date.now() + 1000 * 60 * 60 * 12,
  },
  {
    id: "guess-theme",
    title: "Guess the Theme",
    slug: "/games/guess-theme",
    description:
      "See a random penguin, choose the correct theme out of 4 in 10 seconds.",
    image: "/images/games/guess-theme.jpg",
    cta: "Play",
  },
];

export default function GamesPage() {
  return (
    <PageWrap>
      <Header>
        <h1>Games</h1>
        <p>Mini‑games, expeditions and evolution — earn coins & crystals.</p>
      </Header>

      <Grid>
        {tiles.map((tile) => (
          <GameCard key={tile.id}>
            <ImageWrap>
              <Image
                src={tile.image}
                alt={tile.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <NeonSun /> {/* декоративный градиент‑ореол */}
            </ImageWrap>

            <Content>
              <Title>{tile.title}</Title>
              <Desc>{tile.description}</Desc>

              <Footer>
                {tile.lockedUntilMs && tile.lockedUntilMs > Date.now() ? (
                  <Cooldown>
                    <span>Come back in</span>
                    <strong>
                      {formatDuration(tile.lockedUntilMs - Date.now())}
                    </strong>
                    <SkipButton as="button" type="button" aria-label="Skip cooldown">
                      Pay to skip 7$P
                    </SkipButton>
                  </Cooldown>
                ) : (
                  <PrimaryLink href={tile.slug} aria-label={`Open ${tile.title}`}>
                    {tile.cta ?? "Open"}
                  </PrimaryLink>
                )}
              </Footer>
            </Content>
          </GameCard>
        ))}
      </Grid>
    </PageWrap>
  );
}

// ===== helpers =====
function formatDuration(ms: number) {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const hPart = h > 0 ? `${h}h ` : "";
  const mPart = `${m.toString().padStart(2, "0")}m `;
  const sPart = `${s.toString().padStart(2, "0")}s`;
  return `${hPart}${mPart}${sPart}`.trim();
}

// ===== styled =====

const PageWrap = styled.main`
  --card-radius: 18px;
  --glass: rgba(255, 255, 255, 0.08);
  --glass-strong: rgba(255, 255, 255, 0.12);
  --text: #ffffff;
  --muted: rgba(255, 255, 255, 0.75);

  padding: 32px 20px 64px;
  color: var(--text);
`;

const Header = styled.header`
  max-width: 1100px;
  margin: 0 auto 24px;
  h1 {
    font-family: "Tektur", system-ui, sans-serif;
    margin: 0 0 4px;
    letter-spacing: 0.2px;
  }
  p {
    margin: 0;
    color: var(--muted);
  }
`;

const Grid = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
  }
`;

const GameCard = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: var(--card-radius);
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.05) 0%,
      rgba(255, 255, 255, 0.03) 100%
    ),
    radial-gradient(120% 120% at 0% 0%, rgba(255, 94, 247, 0.15) 0%, transparent 60%),
    radial-gradient(120% 120% at 100% 100%, rgba(0, 255, 204, 0.15) 0%, transparent 60%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow:
    0 8px 24px rgba(0,0,0,0.45),
    inset 0 0 0 1px rgba(255,255,255,0.06);
  display: grid;
  grid-template-rows: 220px auto;
  transition: transform .18s ease, box-shadow .18s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 12px 28px rgba(0,0,0,0.5),
      0 0 60px rgba(255, 100, 220, 0.15),
      inset 0 0 0 1px rgba(255,255,255,0.08);
  }

  @media (max-width: 820px) {
    grid-template-rows: 200px auto;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;

  img, span > img {
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.55) 100%);
  }
`;

const NeonSun = styled.div`
  pointer-events: none;
  position: absolute;
  right: -10%;
  bottom: -25%;
  width: 280px;
  height: 280px;
  background: radial-gradient(circle at 40% 40%,
    rgba(255, 196, 0, 0.7) 0%,
    rgba(255, 90, 0, 0.5) 45%,
    rgba(196, 0, 255, 0.32) 70%,
    transparent 72%);
  filter: blur(18px) saturate(1.1);
  border-radius: 50%;
`;

const Content = styled.div`
  display: grid;
  align-content: space-between;
  padding: 14px 16px 16px;
  gap: 10px;
`;

const Title = styled.h3`
  margin: 0;
  font-weight: 700;
  letter-spacing: 0.2px;
`;

const Desc = styled.p`
  margin: 0;
  color: var(--muted);
  line-height: 1.35;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const PrimaryLink = styled(Link)`
  padding: 10px 14px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02));
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow:
    0 2px 10px rgba(0,0,0,0.35),
    inset 0 0 10px rgba(255,255,255,0.06);
  backdrop-filter: blur(8px);
  color: #fff;
  text-decoration: none;
  transition: transform .12s ease, box-shadow .12s ease;

  &:hover { transform: translateY(-1px); }
  &:active { transform: translateY(0); }
`;

const Cooldown = styled.div`
  display: grid;
  grid-auto-flow: row;
  gap: 4px;

  span { color: var(--muted); font-size: 13px; }
  strong { font-size: 16px; }
`;

const SkipButton = styled.button`
  margin-top: 2px;
  padding: 8px 12px;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  color: #fff;
  cursor: pointer;
  transition: filter .12s ease;

  &:hover { filter: brightness(1.1); }
`;
