import { EventCardData } from "@/types/event.types";
import React from "react";

import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useLocale, useTranslations } from "next-intl";
import {
  ActionButton,
  GlassOverlay,
  InfoBlock,
  PenguinCard,
  TopOverlay,
} from "@/components/event-block/event-block.component.styled";
import Link from "next/link";

const EventCardComponent = ({ event }: { event: EventCardData }) => {
  const locale = useLocale();
  const t = useTranslations("eventsGallery");
  return (
    <PenguinCard backgroundImage={event.imageUrl}>
      <TopOverlay>
        <h3>{getLocalized(event.title, locale)}</h3>
      </TopOverlay>
      <GlassOverlay>
        <InfoBlock>
          <p>{getLocalized(event.description, locale)}</p>
        </InfoBlock>
        <Link href={`/events/${event.id}`}>
          <ActionButton>{t('checkLink')} </ActionButton>
        </Link>
      </GlassOverlay>
    </PenguinCard>
  );
};

export default EventCardComponent;
