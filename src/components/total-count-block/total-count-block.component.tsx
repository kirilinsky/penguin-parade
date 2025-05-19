import React from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { useGetImages } from "@/hooks/use-get-images";

const TotalCountBlockComponent = () => {
  const { rarityCount, loading } = useGetImages();

  return (
    <PageContentBlockStyled>
      <h2>Total count</h2>
      {loading
        ? "loding..."
        : Object.entries(rarityCount).map(([key, value]) => {
            return (
              <span key={key}>
                {key} - {value}
              </span>
            );
          })}
    </PageContentBlockStyled>
  );
};

export default TotalCountBlockComponent;
