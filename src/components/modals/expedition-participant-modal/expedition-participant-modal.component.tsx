import {
  EvolutionModalGallery,
  EvolutionModalGalleryItem,
} from "@/components/evolution-modal/evolution-modal.component.styled";
import GalleryItemScaleComponent from "@/components/gallery-item-scale/gallery-item-scale.component";
import { ImageItem } from "@/types/image.types";
import React from "react";
import Rodal from "rodal";

const ExpeditionParticipantModal = ({
  showModal,
  onClose,
  images,
  onItemClick,
}: {
  showModal: boolean;
  onClose: () => void;
  onItemClick: (img: ImageItem) => void;
  images: ImageItem[];
}) => {
  return (
    <Rodal showMask visible={showModal} onClose={onClose}>
      {/* TODO add loader into modal */}
      <EvolutionModalGallery>
        {images.map((img: ImageItem) => (
          <EvolutionModalGalleryItem
            onClick={() => onItemClick(img)}
            key={img.id}
          >
            <img width={"100%"} height={"100%"} src={img.imageUrl} />
            <h4>{img.title}</h4>
            <GalleryItemScaleComponent scale={img.settings.rarity} />
          </EvolutionModalGalleryItem>
        ))}
      </EvolutionModalGallery>
    </Rodal>
  );
};

export default ExpeditionParticipantModal;
