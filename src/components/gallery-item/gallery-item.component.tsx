import { ImageItem } from "@/app/mylibrary/page";
import React from "react";
import Tilt from "react-parallax-tilt";
import { GalleryItemImage } from "./gallery-item.component.styled";

const GalleryItemComponent = ({ img }: { img: ImageItem }) => {
  return (
    <div>
      <Tilt scale={1.12} key={img.id}>
        <GalleryItemImage src={img.imageUrl} width={225} alt={img.title} />
        <p>
          {img.title} - {img.settings.rarity}
        </p>
      </Tilt>
    </div>
  );
};

export default GalleryItemComponent;
