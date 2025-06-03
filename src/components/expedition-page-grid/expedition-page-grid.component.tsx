import React, { useEffect, useMemo, useState } from "react";
import {
  ExpeditionPageDescription,
  ExpeditionButtons,
  ExpeditionPageGrid,
  ExpeditionPageImage,
  ExpeditionPageTitle,
  ExpeditionContentColumn,
} from "./expedition-page-grid.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useLocale } from "next-intl";
import NeonButtonComponent from "../neon-button/neon-button.component";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getPrevScale } from "@/helpers/get-prev-scale/get-prev-scale";
import { useGetImages } from "@/hooks/use-get-images";
import { ScaleType } from "@/types/scale.types";
import { ImageItem } from "@/types/image.types";
import Rodal from "rodal";
import {
  EvolutionModalGallery,
  EvolutionModalGalleryItem,
} from "../evolution-modal/evolution-modal.component.styled";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import { User, UserExpeditionItemPenguin } from "@/types/user.types";
import { getAuth } from "firebase/auth";
import { useExpeditionPenguins } from "@/hooks/use-get-expedition-penguins";
import ExpeditionCountdown from "../expedition-countdown/expedition-countdown.component";
import ExpeditionParticipants from "../expedition-participants/expedition-participants.component";
import ExpeditionStatusComponent from "../expedition-status/expedition-status.component";
import ExpeditionParticipantModal from "../modals/expedition-participant-modal/expedition-participant-modal.component";

const ExpeditionPageGridComponent = ({
  expedition,
  user,
}: {
  expedition: Expedition;
  user: User;
}) => {
  const locale = useLocale();

  const { penguins: penguinsParticipants, refetch } = useExpeditionPenguins(
    expedition.id
  );
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [participants, setParticipants] = useState<ImageItem[]>([]);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const participantScale = useMemo(() => {
    return getPrevScale(expedition.level) as ScaleType;
  }, [expedition.level]);

  const { images, loading: imagesLoading } = useGetImages(
    true,
    null,
    participantScale
  );

  const addParticipant = async (img: ImageItem) => {
    if (!user) {
      return;
    }
    setParticipants([...participants, img]);
    const filteredImagesDraft = [...filteredImages].filter(
      (image) => image.id !== img.id
    );
    setFilteredImages(filteredImagesDraft);
    setShowLibraryModal(false);
    return;
  };

  const removeParticipant = (img: ImageItem) => {
    const participantsDraft = [...participants].filter(
      (current) => current.id !== img.id
    );
    setParticipants(participantsDraft);
    setFilteredImages(
      [...filteredImages, img].sort(
        (a, b) => b.createdAt.seconds - a.createdAt.seconds
      )
    );
  };

  const resetParticipants = () => {
    setParticipants([]);
    setFilteredImages(images);
  };

  useEffect(() => {
    const participantsIds = penguinsParticipants.map(
      (participant) => participant.id
    );
    const filteredDraft = [...images].filter(
      (image) => !participantsIds.includes(image.id)
    );
    setFilteredImages(filteredDraft);
  }, [penguinsParticipants]);

  return (
    <>
      <ExpeditionParticipantModal
        showModal={showLibraryModal}
        images={filteredImages}
        onItemClick={addParticipant}
        onClose={() => setShowLibraryModal(false)}
      />
      <ExpeditionPageGrid>
        <ExpeditionPageImage>
          <img src={expedition.imageUrl} alt={expedition.settings.title.en} />
        </ExpeditionPageImage>
        <ExpeditionContentColumn>
          <ExpeditionPageTitle>
            <h1>{getLocalized(expedition.settings.title, locale)}</h1>
          </ExpeditionPageTitle>
          <ExpeditionStatusComponent
            expedition={expedition}
            participantScale={participantScale}
          />
          <ExpeditionPageDescription>
            <p>{getLocalized(expedition.settings.description, locale)}</p>
          </ExpeditionPageDescription>
          <ExpeditionParticipants
            loading={loading}
            penguinsParticipants={participants}
            onRemove={removeParticipant}
            onAdd={() => setShowLibraryModal(true)}
            participantScale={participantScale}
            addingDisabled={
              !filteredImages.length ||
              imagesLoading ||
              loading ||
              expedition.maxParticipants === penguinsParticipants.length ||
              expedition.minParticipants > images.length
            }
          />
          <ExpeditionButtons>
            <NeonButtonComponent
              onClick={resetParticipants}
              title="reset my participants"
            />
            <NeonButtonComponent
              onClick={resetParticipants}
              title="confirm participation"
            />
          </ExpeditionButtons>
        </ExpeditionContentColumn>
      </ExpeditionPageGrid>
    </>
  );
};

export default ExpeditionPageGridComponent;
