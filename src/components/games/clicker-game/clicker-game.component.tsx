import React, { useEffect, useState } from "react";
import {
  ChangePenguinBtn,
  ClickerCanvas,
  ClickerFooter,
  ClickerHeader,
  ClickerSelectedImage,
  ClickerWrap,
} from "./clicker-game.component.styled";
import { ClickerGameData, CurrentPenguin } from "@/types/clicker.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import ConfettiEdgeWrapper from "../clicker-wrap/clicker-wrap.component";
import ArcadeCounter from "../clicker-stat-number/clicker-stat-number.component";

const ClickerGameComponent = ({
  onModalOpen,
  gameData,
  currentPenguin,
}: {
  gameData: ClickerGameData | null;
  currentPenguin: CurrentPenguin | null;
  onModalOpen: () => void;
}) => {
  const baseColor = currentPenguin
    ? getBaseColorByScale(currentPenguin.scale)
    : "#fff";

  const [_clicks, set_Clicks] = useState(0);

  const onClick = () => {
    set_Clicks(
      (prev) => prev + (currentPenguin ? currentPenguin.multiplier : 0)
    );
  };

  useEffect(() => {
    if (currentPenguin) {
      set_Clicks(currentPenguin.clicks);
    }
  }, [currentPenguin]);
  return (
    <ClickerWrap>
      <ClickerHeader>
        <div className="metrics">
          <div className="stat">
            <span className="label">clicks</span>
            <ArcadeCounter
              className="value"
              value={_clicks}
              color={baseColor}
            />
          </div>
          <div className="stat">
            <span className="label">current level</span>
            <ArcadeCounter
              className="value"
              value={currentPenguin ? currentPenguin?.level : 0}
              color={baseColor}
            />
          </div>
          <div className="stat">
            <span className="label">next level</span>
            <span className="value">{currentPenguin?.nextLevelAt}</span>
          </div>
          <div className="stat">
            <span className="label">multiplier</span>
            <span className="value">x{currentPenguin?.multiplier}</span>
          </div>
          <div className="stat">
            <span className="label">daily income (total)</span>
            <span className="value">{gameData?.totalIncome} / day</span>
          </div>
        </div>

        <div className="levelbar">
          <div className="fill" />
        </div>
      </ClickerHeader>

      <ClickerCanvas>
        {currentPenguin ? (
          <ConfettiEdgeWrapper color={baseColor}>
            <ClickerSelectedImage borderColor={baseColor} onClick={onClick}>
              <img src={currentPenguin.imgUrl} alt="Selected penguin" />
            </ClickerSelectedImage>
          </ConfettiEdgeWrapper>
        ) : (
          <div>
            <ChangePenguinBtn onClick={onModalOpen}>
              Select clicker candidate
            </ChangePenguinBtn>
            <div className="hint">Tip: level will be saved</div>
          </div>
        )}
      </ClickerCanvas>
      <ClickerFooter>
        <div className="avatar-list">
          {gameData?.penguins.map((item) => (
            <div className="avatar selected" key={item.id}>
              <img src={item.imgUrl} alt="Penguin A" />
              <span className="lvl">{item.level}</span>
            </div>
          ))}
        </div>
        <div className="footer-top">
          <button className="swap-btn" onClick={onModalOpen}>
            Change penguin
          </button>
        </div>
      </ClickerFooter>
    </ClickerWrap>
  );
};

export default ClickerGameComponent;
