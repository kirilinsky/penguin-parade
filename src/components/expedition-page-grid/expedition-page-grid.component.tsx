import React, { useMemo } from "react";
import {
  ExpeditionPageDescription,
  ExpeditionButtons,
  ExpeditionPageGrid,
  ExpeditionPageImage,
  ExpeditionPageTitle,
  ExpeditionParticipants,
  ExpeditionStatus,
} from "./expedition-page-grid.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useLocale } from "next-intl";
import ExpeditionStatusBadge from "../expedition-status-badge/expedition-status-badge.component";
import NeonButtonComponent from "../neon-button/neon-button.component";
import { format } from "date-fns";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getPrevScale } from "@/helpers/get-prev-scale/get-prev-scale";

const ExpeditionPageGridComponent = ({
  expedition,
}: {
  expedition: Expedition;
}) => {
  const locale = useLocale();

  const participantsScale = useMemo(() => {
    return getPrevScale(expedition.level);
  }, [expedition.level]);
  return (
    <ExpeditionPageGrid>
      <ExpeditionPageTitle>
        <h1>{getLocalized(expedition.settings.title, locale)}</h1>{" "}
        <ExpeditionStatusBadge status={expedition.state} />
      </ExpeditionPageTitle>
      <ExpeditionPageImage>
        <img src={expedition.imageUrl} alt={expedition.settings.title.en} />
      </ExpeditionPageImage>

      <ExpeditionPageDescription>
        <p>{getLocalized(expedition.settings.description, locale)}</p>
      </ExpeditionPageDescription>
      <ExpeditionParticipants>part</ExpeditionParticipants>
      <ExpeditionStatus>
        <span>
          Preparation started:{" "}
          {format(expedition.preparationStartedAt.toDate(), "dd.MM.yy HH:mm")}
        </span>
        <span>
          Preparation ended:{" "}
          {format(expedition.preparationEndedAt.toDate(), "dd.MM.yy HH:mm")}
        </span>
        <span>
          Active phase started:{" "}
          {format(expedition.activePhaseStartedAt.toDate(), "dd.MM.yy HH:mm")}
        </span>
        <span>
          Active phase ended:{" "}
          {format(expedition.activePhaseEndedAt.toDate(), "dd.MM.yy HH:mm")}
        </span>
        <span>Min participants: {expedition.minParticipants}</span>{" "}
        <span>Max participants: {expedition.maxParticipants}</span>
        {participantsScale && (
          <span>
            Participants level:
            <GalleryItemScaleComponent scale={participantsScale} />
          </span>
        )}
      </ExpeditionStatus>
      <ExpeditionButtons>
        <NeonButtonComponent title="join" />
        <NeonButtonComponent title="reset my participants" />
      </ExpeditionButtons>
    </ExpeditionPageGrid>
  );
};

export default ExpeditionPageGridComponent;
