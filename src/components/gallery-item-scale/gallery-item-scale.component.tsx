import React from "react";
import { GalleryItemScaleStyled } from "./gallery-item-scale.component.styled";

const GalleryItemScaleComponent = ({
  scale,
  baseColor,
  className,
}: {
  scale: string;
  baseColor: string;
  className: string;
}) => {
  return (
    <GalleryItemScaleStyled className={className} color={baseColor}>
      {scale}
    </GalleryItemScaleStyled>
  );
};

export default GalleryItemScaleComponent;
