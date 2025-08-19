import React from "react";
import { GalleryWrap } from "./gallery.component.styled";

const GalleryComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <GalleryWrap>{children}</GalleryWrap>;
};

export default GalleryComponent;
