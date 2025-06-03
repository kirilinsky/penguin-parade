import React, { useMemo } from "react";
import { ExpeditionHighlight } from "./expedition-countdown.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { formatDuration, intervalToDuration, Locale } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { useLocale } from "next-intl";

const ExpeditionCountdown = ({ expedition }: { expedition: Expedition }) => {
  if (expedition.state === "ended" || expedition.state === "resultsReady")
    return null;

  const localeMap: Record<string, Locale> = {
    en: enUS,
    ru: ru,
  };

  const localeCode = useLocale();
  const locale = localeMap[localeCode] ?? enUS;

  const isActive = expedition.state === "active";

  const formattedDate = useMemo(() => {
    const rawEndDate = isActive
      ? expedition.activePhaseEndedAt.toDate()
      : expedition.preparationEndedAt.toDate();

    const duration = intervalToDuration({
      start: new Date(),
      end: rawEndDate,
    });

    return formatDuration(duration, {
      format: ["days", "hours", "minutes"],
      locale,
    });
  }, [expedition, isActive, locale]);

  return (
    <ExpeditionHighlight>
      ⏳ {isActive ? "Active" : "Preparation"} phase ends in {formattedDate}
    </ExpeditionHighlight>
  );
};

export default ExpeditionCountdown;
