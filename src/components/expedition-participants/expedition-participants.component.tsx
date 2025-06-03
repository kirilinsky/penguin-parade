import React from "react";
import {
  ExpeditionParticipantsAddItem,
  ExpeditionParticipantsItem,
  ExpeditionParticipantsItemImage,
  ExpeditionParticipantsStyled,
} from "./expedition-participants.component.styled";
import { UserExpeditionItemPenguin } from "@/types/user.types";

const ExpeditionParticipants = ({
  loading,
  penguinsParticipants,
  participantScaleBorderColor,
  onRemove,
  onAdd,
  addingDisabled,
}: {
  loading: boolean;
  addingDisabled: boolean;
  penguinsParticipants: UserExpeditionItemPenguin[];
  participantScaleBorderColor: string;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) => {
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
