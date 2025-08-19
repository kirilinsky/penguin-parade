// components/games/guess-theme/guess-theme-game.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  GameWrapper,
  PenguinImage,
  OptionsColumn,
  OptionButton,
  Countdown,
  Loader,
} from "./guess-theme-game.styled";
import { GuessThemeRoundData } from "@/types/games.types";
import { useLocale } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";

export const GuessThemeGame = ({
  roundData,
  loading,
}: {
  roundData: GuessThemeRoundData | null;
  loading: boolean;
}) => {
  //const [timeLeft, setTimeLeft] = useState(duration);
  const [_loading, setLoading] = useState(loading);
  const [selected, setSelected] = useState<string | null>(null);
  const locale = useLocale();

  /*   useEffect(() => {
    if (timeLeft <= 0 || selected) return;
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft, selected]); */

  const handleSelect = (opt: string) => {
    if (selected) return;
    setSelected(opt);
  };

  if (!roundData) return null;
  const left = Object.entries(roundData?.options).slice(0, 6);
  const right = Object.entries(roundData?.options).slice(6);
  return (
    <GameWrapper>
      {_loading && <Loader />}
      {/*       <Countdown>{timeLeft}s</Countdown>
       */}
      <OptionsColumn side="left">
        {left.map(([id, title]: [id: string, title: any]) => (
          <OptionButton
            key={id}
            onClick={() => {
              handleSelect(id);
            }}
            $status={
              selected
                ? id === roundData.correctId
                  ? "correct"
                  : selected === id
                  ? "wrong"
                  : undefined
                : undefined
            }
          >
            {getLocalized(title, locale)}
          </OptionButton>
        ))}
      </OptionsColumn>
      <PenguinImage>
        <img src={roundData.imageUrl} alt="Penguin" />
      </PenguinImage>
      <OptionsColumn side="right">
        {right.map(([id, title]: [id: string, title: any]) => (
          <OptionButton
            key={id}
            onClick={() => {
              handleSelect(id);
            }}
            $status={
              selected
                ? id === roundData.correctId
                  ? "correct"
                  : selected === id
                  ? "wrong"
                  : undefined
                : undefined
            }
          >
            {getLocalized(title, locale)}
          </OptionButton>
        ))}
      </OptionsColumn>
    </GameWrapper>
  );
};
