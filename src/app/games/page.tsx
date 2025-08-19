"use client";

import GameCardComponent from "@/components/pages/games/game-card/game-card.component";
import { GamesHeader } from "@/components/pages/games/games-page-header/games-page-header.component.styled";
import { GridSystem } from "@/components/ui/grid/grid.styled";
import {
  LoaderGrid,
  ShimmerCard,
} from "@/components/ui/skeleton-grid/skeleton-grid.styled";
import { gameTiles } from "@/data/games";
import { useTranslations } from "next-intl";

export default function GamesPage() {
  const t = useTranslations("gamesPage");

  return (
    <>
      <GamesHeader>
        <h1>{t("title")}</h1>
        <p> {t("subtitle")}</p>
      </GamesHeader>

      {!gameTiles ? (
        <LoaderGrid>
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
          <ShimmerCard />
        </LoaderGrid>
      ) : (
        <GridSystem>
          {gameTiles.map((tile) => (
            <GameCardComponent tile={tile} key={tile.id} />
          ))}
        </GridSystem>
      )}
    </>
  );
}
