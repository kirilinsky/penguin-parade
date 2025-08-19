import React, { useMemo } from "react";
import { Expedition } from "@/types/expeditions.types";
import { formatDuration, intervalToDuration, Locale } from "date-fns";
import { enUS, ru } from "date-fns/locale";
import { useLocale, useTranslations } from "next-intl";
import { ExpeditionStatusInfoWrap } from "../expedition-status-info/expedition-status-info.component.styled";

const ExpeditionCountdown = ({ expedition }: { expedition: Expedition }) => {
  if (expedition.state === "ended" || expedition.state === "resultsReady")
    return null;

  const localeMap: Record<string, Locale> = {
    en: enUS,
    ru: ru,
  };

  const localeCode = useLocale();
  const locale = localeMap[localeCode] ?? enUS;

  const t = useTranslations("expeditionCountdown");

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
    <ExpeditionStatusInfoWrap>
      <span>
        ⏳ {isActive ? t("activeEndsIn") : t("preparationEndsIn")}
      </span>
      <p>{formattedDate}</p>
    </ExpeditionStatusInfoWrap>
  );
};

export default ExpeditionCountdown;
