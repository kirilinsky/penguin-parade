import { useGetUserCrystals } from "@/hooks/use-get-crystals";
import React from "react";
import CrystalItemComponent from "../crystal-item/crystal-item.component";
import { ScaleType } from "@/types/scale.types";
import {
  CrystalBlockEmpty,
  CrystalBlockGrid,
} from "./crystals-block.component.styled";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { PageContentBlockStyled } from "@/components/ui/page-content-block/page-content-block.component.styled";
import { LinkStyled } from "@/components/ui/link/link.component.styled";

const CrystalsBlock = () => {
  const t = useTranslations("crystalsBlock");
  const { crystals } = useGetUserCrystals();

  return (
    <PageContentBlockStyled>
      <h2>{t("title")}</h2>
      {crystals.length ? (
        <CrystalBlockGrid>
          {crystals.map((crystal) => (
            <CrystalItemComponent
              key={crystal.type}
              scale={crystal.type as ScaleType}
              amount={crystal.amount}
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
