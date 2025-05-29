import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { useTranslations } from "next-intl";
import {
  StatisticsBlockGrid,
  StatisticsBlockItem,
} from "./statistics-block.component.styled";
import { User } from "@/types/user.types";
import { format, isValid } from "date-fns";

const StatisticsBlockComponent = ({ user }: { user: User }) => {
  const isFirestoreTimestamp = (val: any) =>
    val && typeof val === "object" && "seconds" in val && "nanoseconds" in val;

  const formatValue = (value: any) => {
    if (!value) return "-";
    if (isFirestoreTimestamp(value)) {
      const date = new Date(value.seconds * 1000);
      return isValid(date) ? format(date, "dd.MM.yyyy HH:mm") : "-";
    }
    if (value instanceof Date && isValid(value)) {
      return format(value, "dd.MM.yyyy HH:mm");
    }
    if (typeof value === "string") {
      const date = new Date(value);
      return isValid(date) ? format(date, "dd.MM.yyyy HH:mm") : value;
    }

    return value;
  };
  if (!user) return null;
  const t = useTranslations("statisticsBlock");
  const statisticsArray = Object.entries(user.statistics);
  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      <StatisticsBlockGrid>
        <StatisticsBlockItem>
          <span>{t("lastGeneratedAt")}</span>
          <strong>{formatValue(user.lastGeneratedAt)}</strong>
        </StatisticsBlockItem>
        {statisticsArray.map(([key, value]) => (
          <StatisticsBlockItem key={key}>
            <span>{t(key)}</span>
            <strong>{formatValue(value)}</strong>
          </StatisticsBlockItem>
        ))}
      </StatisticsBlockGrid>
    </PageContentBlockStyled>
  );
};

export default StatisticsBlockComponent;
