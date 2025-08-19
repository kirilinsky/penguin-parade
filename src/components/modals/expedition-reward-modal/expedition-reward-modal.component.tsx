import CoinItemComponent from "@/components/ui/coin-item/coin-item.component";
import { ExpeditionRewardResponse } from "@/types/expeditions.types";
import { ScaleType } from "@/types/scale.types";
import React from "react";
import Rodal from "rodal";
import { ExpeditionRewardModalContainer } from "./expedition-reward-modal.component.styled";
import NeonButtonComponent from "@/components/ui/neon-button/neon-button.component";
import { ConfettiEffect } from "@/components/ui/confetti-effect/confetti-effect.component";
import CrystalItemComponent from "@/components/pages/main/crystal-item/crystal-item.component";

const ExpeditionRewardModal = ({
  showModal,
  onClose,
  result,
}: {
  showModal: boolean;
  onClose: () => void;
  result: ExpeditionRewardResponse;
}) => {
  return (
    <Rodal showMask visible={showModal} onClose={onClose}>
      <h1>Congrats!</h1>
      <ExpeditionRewardModalContainer>
        <div>
          <CoinItemComponent amount={result.rewardGold} />
        </div>

        {result.crystal && (
          <div>
            <CrystalItemComponent
              amount={1}
              scale={result.crystal as ScaleType}
            />
          </div>
        )}
        <NeonButtonComponent onClick={onClose} title="close" />
        <ConfettiEffect />
      </ExpeditionRewardModalContainer>
    </Rodal>
  );
};

export default ExpeditionRewardModal;
