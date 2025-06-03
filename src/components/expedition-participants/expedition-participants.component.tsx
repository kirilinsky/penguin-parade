import React from "react";
import {
  ExpeditionParticipantsAddItem,
  ExpeditionParticipantsItem,
  ExpeditionParticipantsItemImage,
  ExpeditionParticipantsStyled,
} from "./expedition-participants.component.styled";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { ImageItem } from "@/types/image.types";

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
  penguinsParticipants: ImageItem[];
  participantScale: string;
  onRemove: (img: ImageItem) => void;
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
              onClick={() => onRemove(participant)}
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
  );
};

export default ExpeditionParticipants;
