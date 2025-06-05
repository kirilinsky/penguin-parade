import React from "react";
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

const ExpeditionParticipants = ({
  loading,
  penguinsParticipants,
  participantScale,
  onRemove,
  hasJoined,
  onAdd,
  addingDisabled,
}: {
  loading: boolean;
  hasJoined: boolean;
  addingDisabled: boolean;
  penguinsParticipants: ImageItem[] | UserExpeditionItemPenguin[];
  participantScale: string;
  onRemove: (id: string) => void;
  onAdd: () => void;
}) => {
  const participantScaleBorderColor = getBaseColorByScale(participantScale);
  return (
    <ExpeditionParticipantsWrap>
      <h4>Your participants:</h4>
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
    </ExpeditionParticipantsWrap>
  );
};

export default ExpeditionParticipants;
