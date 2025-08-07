import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import {
  ActionButton,
  ButtonBlock,
  GlassOverlay,
  InfoBlock,
  LoaderOverlay,
  PenguinCard,
  Spinner,
  TopOverlay,
} from "./event-block.component.styled";
import { EventCardData } from "@/types/event.types";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";

const EventBlockComponent = ({
  event,
  loading,
  payToSkip,
  canCraft,
  enablePayToSkip,
  onClick,
  leftTime,
}: {
  loading: boolean;
  canCraft: boolean;
  enablePayToSkip: boolean;
  event: EventCardData;
  payToSkip: () => Promise<any>;
  onClick: () => void;
  leftTime: string;
}) => {
  const locale = useLocale();
  const t = useTranslations("craftPage");

  return (
    <PageContentBlockStyled noBorder>
      <PenguinCard backgroundImage={event.imageUrl}>
        {loading && (
          <LoaderOverlay>
            <Spinner />
          </LoaderOverlay>
        )}
        <TopOverlay>
          <h3>{getLocalized(event.title, locale)}</h3>
        </TopOverlay>
        <GlassOverlay>
          <InfoBlock>
            <p>{getLocalized(event.description, locale)}</p>
          </InfoBlock>
          {canCraft ? (
            <ActionButton disabled={loading || !canCraft} onClick={onClick}>
              {getLocalized(event.buttonText, locale)}
            </ActionButton>
          ) : (
            <ButtonBlock>
              {t("comeBackIn")} <b>{leftTime}</b>
              <ActionButton
                disabled={loading || enablePayToSkip}
                onClick={payToSkip}
              >
                {loading ? t("loading") : `${t("payToSkipButton")} 7$P`}
              </ActionButton>
            </ButtonBlock>
          )}
        </GlassOverlay>
      </PenguinCard>
    </PageContentBlockStyled>
  );
};

export default EventBlockComponent;
