import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { useGetImages } from "@/hooks/use-get-images";
import {
  TotalCountBlockGrid,
  TotalCountBlockItem,
  TotalCountBlockItemNumber,
} from "./total-count-block.component.styled";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";

const TotalCountBlockComponent = () => {
  const { rarityCount, loading } = useGetImages();

  return (
    <PageContentBlockStyled>
      <h2>Total count</h2>
      <TotalCountBlockGrid>
        {loading
          ? "loding..."
          : Object.entries(rarityCount).map(([key, value]) => {
              return (
                <TotalCountBlockItem key={key}>
                  <GalleryItemScaleComponent scale={key} />

                  <TotalCountBlockItemNumber>{value}</TotalCountBlockItemNumber>
                </TotalCountBlockItem>
              );
            })}
      </TotalCountBlockGrid>
    </PageContentBlockStyled>
  );
};

export default TotalCountBlockComponent;
