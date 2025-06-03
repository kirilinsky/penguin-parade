import React from "react";
import { ExpeditionStatus } from "./expedition-status.component.styled";
import ExpeditionCountdown from "../expedition-countdown/expedition-countdown.component";
import { Expedition } from "@/types/expeditions.types";
import ExpeditionStatusBadge from "../expedition-status-badge/expedition-status-badge.component";
import { ScaleType } from "@/types/scale.types";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import ExpeditionStatusInfo from "../expedition-status-info/expedition-status-info.component";

const ExpeditionStatusComponent = ({
  expedition,
  participantScale,
}: {
  expedition: Expedition;
  participantScale: ScaleType;
}) => {
  return (
    <ExpeditionStatus>
      <ExpeditionStatusBadge status={expedition.state} />
      <ExpeditionCountdown expedition={expedition} />
      <ExpeditionStatusInfo
        title="Min participants"
        text={expedition.minParticipants}
      />
      <ExpeditionStatusInfo
        title="Max participants"
        text={expedition.maxParticipants}
      />
      {participantScale && (
        <ExpeditionStatusInfo
          title="Participants level"
          text={<GalleryItemScaleComponent scale={participantScale} />}
        />
      )}{" "}
      <ExpeditionStatusInfo
        title="Expedition level"
        text={<GalleryItemScaleComponent scale={expedition.level} />}
      />
    </ExpeditionStatus>
  );
};

export default ExpeditionStatusComponent;
