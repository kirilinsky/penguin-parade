import React from "react";
import {
  PenguinDetailsHistoryBlock,
  PenguinDetailsImageWrapper,
  PenguinDetailsLeftColumn,
  PenguinDetailsOwnerAndHistoryRow,
  PenguinDetailsOwnerBlock,
  PenguinDetailsPageWrapper,
  PenguinDetailsRarityTag,
  PenguinDetailsRightColumn,
  PenguinDetailsTitle,
} from "./penguin-details.component.styled";

const PenguinDetailsComponent = () => {
  return (
    <PenguinDetailsPageWrapper>
      <PenguinDetailsLeftColumn>
        <PenguinDetailsRarityTag>Legendary</PenguinDetailsRarityTag>
        <PenguinDetailsImageWrapper>
          <img src="/your-image.png" alt="penguin" />
        </PenguinDetailsImageWrapper>
        <PenguinDetailsTitle>Redwinged Cutie</PenguinDetailsTitle>
      </PenguinDetailsLeftColumn>

      <PenguinDetailsRightColumn>
        <PenguinDetailsOwnerAndHistoryRow>
          <PenguinDetailsOwnerBlock>Owner: @username</PenguinDetailsOwnerBlock>
          <PenguinDetailsHistoryBlock>
            <p>Minted on 06/29/2025</p>
            <p>Transferred to @otheruser</p>
            <p>Gifted by @thirduser</p>
          </PenguinDetailsHistoryBlock>
        </PenguinDetailsOwnerAndHistoryRow>
      </PenguinDetailsRightColumn>
    </PenguinDetailsPageWrapper>
  );
};

export default PenguinDetailsComponent;
