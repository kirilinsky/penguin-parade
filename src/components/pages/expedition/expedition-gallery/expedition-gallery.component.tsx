import React from "react";
import { ExpeditionGalleryGrid } from "./expedition-gallery.component.styled";

const ExpeditionGallery = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <ExpeditionGalleryGrid>{children}</ExpeditionGalleryGrid>;
};

export default ExpeditionGallery;
