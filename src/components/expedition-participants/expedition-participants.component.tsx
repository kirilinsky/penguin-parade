import React from "react";
import {
  ExpeditionParticipantsAddItem,
  ExpeditionParticipantsItem,
  ExpeditionParticipantsItemImage,
  ExpeditionParticipantsStyled,
} from "./expedition-participants.component.styled";
import { UserExpeditionItemPenguin } from "@/types/user.types";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

const ExpeditionParticipants = ({
  loading,
  penguinsParticipants,
  participantScale,
  onRemove,
  onAdd,
  addingDisabled,
}: {
  loading: boolean;
  addingDisabled: boolean;
  penguinsParticipants: UserExpeditionItemPenguin[];
  participantScale: string;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) => {
  const participantScaleBorderColor = getBaseColorByScale(participantScale);
  return (
    <ExpeditionParticipantsStyled>
      {loading
        ? "loading..."
        : penguinsParticipants.map((participant) => (
            <ExpeditionParticipantsItem
              key={participant.id}
              borderColor={participantScaleBorderColor}
              onClick={() => onRemove(participant.id)}
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
          add penguin
        </ExpeditionParticipantsAddItem>
      )}
    </ExpeditionParticipantsStyled>
  );
};

export default ExpeditionParticipants;
