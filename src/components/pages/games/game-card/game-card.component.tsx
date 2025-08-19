import React from "react";
import {
  GameCardContent,
  GameCardContentSide,
  GameCardDesc,
  GameCardFooter,
  GameCardImageWrap,
  GameCardPrimaryLink,
  GameCardTitle,
  GameCardWrapper,
} from "./game-card.component.styled";
import Image from "next/image";
import { GameTile } from "@/types/games.types";
import { useLocale } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";

const GameCardComponent = ({ tile }: { tile: GameTile }) => {
  const locale = useLocale();
  return (
    <GameCardWrapper key={tile.id}>
      <GameCardImageWrap>
        <Image
          src={tile.image}
          alt={getLocalized(tile.title, locale)}
          fill
          placeholder="blur"
          blurDataURL="data:image/gif;base64,R0lGODlhAQABAPAAAP///wAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" // 1x1
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </GameCardImageWrap>

      <GameCardContent>
        <GameCardContentSide>
          <GameCardTitle>{getLocalized(tile.title, locale)}</GameCardTitle>
          <GameCardDesc>{getLocalized(tile.description, locale)}</GameCardDesc>
        </GameCardContentSide>
        <GameCardFooter>
          <GameCardPrimaryLink href={tile.slug}>
            {getLocalized(tile.cta, locale)}
          </GameCardPrimaryLink>
        </GameCardFooter>
      </GameCardContent>
    </GameCardWrapper>
  );
};

export default GameCardComponent;
