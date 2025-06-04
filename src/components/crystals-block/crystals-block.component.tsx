import { useGetUserCrystals } from "@/hooks/use-get-crystals";
import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import CrystalItemComponent from "../crystal-item/crystal-item.component";
import { ScaleType } from "@/types/scale.types";
import {
  CrystalBlockEmpty,
  CrystalBlockGrid,
} from "./crystals-block.component.styled";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LinkStyled } from "../link/link.component.styled";

const CrystalsBlock = () => {
  const t = useTranslations("crystalsBlock");
  const { crystals } = useGetUserCrystals();
  const crystalsArray = Object.entries(crystals);
  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      {crystalsArray.length ? (
        <CrystalBlockGrid>
          {Object.entries(crystals).map(([scale, amount]) => (
            <CrystalItemComponent
              key={scale + amount}
              scale={scale as ScaleType}
              amount={amount}
            />
          ))}
        </CrystalBlockGrid>
      ) : (
        <CrystalBlockEmpty>
          <p>{t("noCrystalsTitle")}</p>
          <Image
            alt="no crystals"
            src={"/infographics/no-crystals.webp"}
            width="200"
            height={"220"}
          />
          <span>{t("noCrystalsSubtitle")}</span>
          <LinkStyled href={"/expeditions"}>{t("expeditionsLink")}</LinkStyled>
        </CrystalBlockEmpty>
      )}
    </PageContentBlockStyled>
  );
};

export default CrystalsBlock;
