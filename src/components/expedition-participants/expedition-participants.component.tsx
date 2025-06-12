"use client";

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
import { useTranslations } from "next-intl";

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
  const t = useTranslations("expeditionParticipants");

  const participantScaleBorderColor = getBaseColorByScale(participantScale);

  return (
    <ExpeditionParticipantsWrap>
      <h4>
        {t("yourParticipants")} ({penguinsParticipants.length}):
      </h4>
      <ExpeditionParticipantsStyled>
        {loading
          ? t("loading")
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
                  width={68}
                  height={68}
                />
              </ExpeditionParticipantsItem>
            ))}
        {!addingDisabled && (
          <ExpeditionParticipantsAddItem
            onClick={onAdd}
            role="button"
            tabIndex={0}
          >
            {t("addPenguin")}
          </ExpeditionParticipantsAddItem>
        )}
      </ExpeditionParticipantsStyled>
      {!!otherPenguins.length && (
        <NeonButtonComponent
          onClick={() => setShowOther(!showOther)}
          title={showOther ? t("hideOthers") : t("showOthers")}
        />
      )}
      {showOther && !!otherPenguins.length && (
        <div style={{ marginBlock: "10px" }}>
          <h4>
            {t("otherParticipants")} ({otherPenguins.length}):
          </h4>
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
                  width={68}
                  height={68}
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
