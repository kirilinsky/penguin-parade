import React from "react";
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

const ExpeditionPageGridComponent = ({
  expedition,
}: {
  expedition: Expedition;
}) => {
  const locale = useLocale();
  return (
    <ExpeditionPageGrid>
      <ExpeditionPageTitle>
        <h1>{getLocalized(expedition.settings.title, locale)}</h1>
      </ExpeditionPageTitle>
      <ExpeditionPageImage>
        <img src={expedition.imageUrl} alt={expedition.settings.title.en} />
      </ExpeditionPageImage>

      <ExpeditionPageDescription>
        <p>{getLocalized(expedition.settings.description, locale)}</p>
      </ExpeditionPageDescription>
      <ExpeditionParticipants>part</ExpeditionParticipants>
      <ExpeditionStatus>
        <ExpeditionStatusBadge status={expedition.state} />
        <span>Preparation started: </span>
        <span>Preparation ended: </span>
        <span>Active phase started: </span>
        <span>Active phase ended: </span>
      </ExpeditionStatus>
      <ExpeditionButtons>
        <NeonButtonComponent title="join" />
        <NeonButtonComponent title="reset my participants" />
      </ExpeditionButtons>
    </ExpeditionPageGrid>
  );
};

export default ExpeditionPageGridComponent;
