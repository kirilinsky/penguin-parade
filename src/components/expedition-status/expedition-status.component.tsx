"use client";
import React from "react";
import { ExpeditionStatus } from "./expedition-status.component.styled";
import ExpeditionCountdown from "../expedition-countdown/expedition-countdown.component";
import { Expedition } from "@/types/expeditions.types";
import ExpeditionStatusBadge from "../expedition-status-badge/expedition-status-badge.component";
import { ScaleType } from "@/types/scale.types";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import ExpeditionStatusInfo from "../expedition-status-info/expedition-status-info.component";
import { useTranslations } from "next-intl";

const ExpeditionStatusComponent = ({
  expedition,
  participantScale,
}: {
  expedition: Expedition;
  participantScale: ScaleType;
}) => {
  const t = useTranslations("expeditionStatus");

  return (
    <ExpeditionStatus>
      <ExpeditionStatusBadge status={expedition.state} />
      <ExpeditionCountdown expedition={expedition} />
      <ExpeditionStatusInfo
        title={t("minParticipants")}
        text={expedition.minParticipants}
      />
      <ExpeditionStatusInfo
        title={t("maxParticipants")}
        text={expedition.maxParticipants}
      />
      {expedition.participantsCount && (
        <ExpeditionStatusInfo
          title={t("totalParticipants")}
          text={expedition.participantsCount}
        />
      )}
      {expedition.totalPenguinsCount && (
        <ExpeditionStatusInfo
          title={t("totalPenguins")}
          text={expedition.totalPenguinsCount}
        />
      )}
      {expedition.state === "ended" && expedition.totalGoldEarned && (
        <ExpeditionStatusInfo
          title={t("totalGold")}
          text={expedition.totalGoldEarned}
        />
      )}
      {expedition.state === "ended" && expedition.totalCrystals && (
        <ExpeditionStatusInfo
          title={t("totalCrystals")}
          text={expedition.totalCrystals}
        />
      )}
      {participantScale && (
        <ExpeditionStatusInfo
          title={t("participantLevel")}
          text={<GalleryItemScaleComponent scale={participantScale} />}
        />
      )}
      <ExpeditionStatusInfo
        title={t("expeditionLevel")}
        text={<GalleryItemScaleComponent scale={expedition.level} />}
      />
    </ExpeditionStatus>
  );
};

export default ExpeditionStatusComponent;
