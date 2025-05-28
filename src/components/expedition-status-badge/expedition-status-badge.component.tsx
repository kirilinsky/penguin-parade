import {
  ExpeditionState,
  expeditionStatusColors,
} from "@/types/expeditions.types";
import React from "react";
import { ExpeditionStatusBadgeStyled } from "./expedition-status-badge.component.styled";
import { Tektur } from "next/font/google";
import { useTranslations } from "next-intl";

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const ExpeditionStatusBadge = ({ status }: { status: ExpeditionState }) => {
  const t = useTranslations("expeditionStatusBadge");
  const { color, background } = expeditionStatusColors[status];
  return (
    <ExpeditionStatusBadgeStyled
      className={tektur.className}
      color={color}
      background={background}
    >
      {t(status)}
    </ExpeditionStatusBadgeStyled>
  );
};

export default ExpeditionStatusBadge;
