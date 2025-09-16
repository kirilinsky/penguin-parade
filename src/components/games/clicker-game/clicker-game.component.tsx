import React from "react";
import {
  ClickerCanvas,
  ClickerFooter,
  ClickerHeader,
  ClickerWrap,
} from "./clicker-game.component.styled";
import { ClickerGameData, CurrentPenguin } from "@/types/clicker.types";

const ClickerGameComponent = ({
  onModalOpen,
  gameData,
  currentPenguin,
}: {
  gameData: ClickerGameData | null;
  currentPenguin: CurrentPenguin | null;
  onModalOpen: () => void;
}) => {
  // const gameData: ClickerGameData = null;
  return (
    <ClickerWrap>
      <ClickerHeader>
        <div className="metrics">
          <div className="stat">
            <span className="label">clicks</span>
            <span className="value">
              {currentPenguin && currentPenguin.clicks}
            </span>
          </div>
          <div className="stat">
            <span className="label">current level</span>
            <span className="value">{currentPenguin?.level}</span>
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
          <div className="penguin">
            <img src={currentPenguin.imgUrl} alt="Selected penguin" />
          </div>
        ) : (
          <div>
            <button onClick={onModalOpen} className="select-btn">
              Select clicker candidate
            </button>
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
          <button className="swap-btn">Change penguin</button>
        </div>
      </ClickerFooter>
    </ClickerWrap>
  );
};

export default ClickerGameComponent;
