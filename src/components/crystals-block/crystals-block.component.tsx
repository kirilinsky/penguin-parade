import { useGetUserCrystals } from "@/hooks/use-get-crystals";
import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import CrystalItemComponent from "../crystal-item/crystal-item.component";
import { ScaleType } from "@/types/scale.types";
import { CrystalBlockGrid } from "./crystals-block.component.styled";

const CrystalsBlock = () => {
  const { crystals } = useGetUserCrystals();
  const crystalsArray = Object.entries(crystals);
  return (
    <PageContentBlockStyled>
      <h2>Crystals</h2>
      {!crystalsArray.length ? (
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
        <div>oops</div>
      )}
    </PageContentBlockStyled>
  );
};

export default CrystalsBlock;
