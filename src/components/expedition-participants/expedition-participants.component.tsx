import React, { useState } from "react";
import {
  ExpeditionParticipantsAddItem,
  ExpeditionParticipantsItem,
  ExpeditionParticipantsItemImage,
  ExpeditionParticipantsStyled,
  ExpeditionParticipantsWrap,
} from "./expedition-participants.component.styled";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { ImageItem } from "@/types/image.types";
import { UserExpeditionItemPenguin } from "@/types/user.types";
import NeonButtonComponent from "../neon-button/neon-button.component";

const ExpeditionParticipants = ({
  loading,
  penguinsParticipants,
  participantScale,
  onRemove,
  hasJoined,
  onAdd,
  addingDisabled,
  otherPenguins,
}: {
  loading: boolean;
  hasJoined: boolean;
  addingDisabled: boolean;
  penguinsParticipants: ImageItem[] | UserExpeditionItemPenguin[];
  otherPenguins: UserExpeditionItemPenguin[];
  participantScale: string;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) => {
  const [showOther, setShowOther] = useState(false);
  const participantScaleBorderColor = getBaseColorByScale(participantScale);
  return (
    <ExpeditionParticipantsWrap>
      <h4>Your participants ({penguinsParticipants.length}):</h4>
      <ExpeditionParticipantsStyled>
        {loading
          ? "loading..."
          : penguinsParticipants.map((participant) => (
              <ExpeditionParticipantsItem
                key={participant.id}
                disableRemove={hasJoined}
                borderColor={participantScaleBorderColor}
                onClick={() =>
                  hasJoined ? undefined : onRemove(participant.id)
                }
              >
                <ExpeditionParticipantsItemImage
                  src={participant.imageUrl}
                  alt={participant.id}
                />
              </ExpeditionParticipantsItem>
            ))}
        {!addingDisabled && (
          <ExpeditionParticipantsAddItem
            onClick={onAdd}
            role="button"
            tabIndex={0}
          >
            Add penguin
          </ExpeditionParticipantsAddItem>
        )}
      </ExpeditionParticipantsStyled>
      {!!otherPenguins.length && (
        <NeonButtonComponent
          onClick={() => setShowOther(!showOther)}
          title={showOther ? "hide other penguins" : "show other penguins"}
        />
      )}
      {showOther && !!otherPenguins.length && (
        <div style={{marginBlock:'10px'}}>
          <h4>Other participants ({otherPenguins.length}):</h4>
          <ExpeditionParticipantsStyled>
            {otherPenguins.map((participant) => (
              <ExpeditionParticipantsItem
                key={participant.id}
                disableRemove={true}
                borderColor={participantScaleBorderColor}
                onClick={undefined}
              >
                <ExpeditionParticipantsItemImage
                  src={participant.imageUrl}
                  alt={participant.id}
                />
              </ExpeditionParticipantsItem>
            ))}
          </ExpeditionParticipantsStyled>
        </div>
      )}
    </ExpeditionParticipantsWrap>
  );
};

export default ExpeditionParticipants;
