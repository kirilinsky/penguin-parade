import React from "react";
import {
  ProgressBlockBarFill,
  ProgressBlockBarWrapper,
  ProgressBlockContainer,
  ProgressBlockGoalNote,
  ProgressBlockLabel,
  ProgressBlockWrapper,
} from "./progress-block.component.styled";
import { useGetImages } from "@/hooks/use-get-images";
import Image from "next/image";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { useTranslations } from "next-intl";

const Goal = 1024;

export const PenguinProgressBlock = () => {
  const { images } = useGetImages(true, "all");
  const t = useTranslations("progressBlock");
  const percent = Math.min((images.length / Goal) * 100, 100).toFixed(1);
  const remaining = Goal - images.length;
  return (
    <PageContentBlockStyled>
      <ProgressBlockContainer>
        <ProgressBlockWrapper>
          <ProgressBlockLabel>
            🐧 {t("created")}: <strong>{images.length}</strong> / {Goal}{" "}
            {t("penguins")}
          </ProgressBlockLabel>
          <ProgressBlockBarWrapper>
            <ProgressBlockBarFill style={{ width: `${percent}%` }} />
          </ProgressBlockBarWrapper>
          <ProgressBlockGoalNote>
            {remaining > 0
              ? `${remaining} ${t("left")}`
              : `🎉 ${t("achieved")}`}
          </ProgressBlockGoalNote>
          <Image
            alt="progress"
            width="220"
            height="300"
            src="/infographics/progress.webp"
          />
        </ProgressBlockWrapper>
        <div>
          <h2>{t("afterTitle")}</h2>
          <p>{t("afterDescription")}</p>
        </div>
      </ProgressBlockContainer>
    </PageContentBlockStyled>
  );
};
