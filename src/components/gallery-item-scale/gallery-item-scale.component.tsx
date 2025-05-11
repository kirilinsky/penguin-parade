import React from "react";
import { GalleryItemScaleStyled } from "./gallery-item-scale.component.styled";

const GalleryItemScaleComponent = ({
  scale,
  baseColor,
}: {
  scale: string;
  baseColor: string;
}) => {
  return (
    <GalleryItemScaleStyled color={baseColor}>{scale}</GalleryItemScaleStyled>
  );
};

export default GalleryItemScaleComponent;
