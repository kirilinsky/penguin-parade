import React, { useEffect, useMemo, useState } from "react";
import {
  ExpeditionPageDescription,
  ExpeditionButtons,
  ExpeditionPageGrid,
  ExpeditionPageImage,
  ExpeditionPageTitle,
  ExpeditionParticipants,
  ExpeditionStatus,
  ExpeditionParticipantsItem,
  ExpeditionParticipantsItemImage,
} from "./expedition-page-grid.component.styled";
import { Expedition } from "@/types/expeditions.types";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useLocale } from "next-intl";
import ExpeditionStatusBadge from "../expedition-status-badge/expedition-status-badge.component";
import NeonButtonComponent from "../neon-button/neon-button.component";
import { format } from "date-fns";
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

const ExpeditionPageGridComponent = ({
  expedition,
}: {
  expedition: Expedition;
}) => {
  const locale = useLocale();

  const participantsScale = useMemo(() => {
    return getPrevScale(expedition.level) as ScaleType;
  }, [expedition.level]);

  const participantScaleBorderColor = useMemo(() => {
    return getBaseColorByScale(participantsScale);
  }, [participantsScale]);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>([]);
  const [participants, setParticipants] = useState<ImageItem[]>([]);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);

  const { images, loading } = useGetImages(true, null, participantsScale);

  const addParticipant = (img: ImageItem) => {
    setParticipants([...participants, img]);
    const filtredImagesDraft = [...filteredImages].filter(
      (current) => current.id !== img.id
    );
    setFilteredImages(filtredImagesDraft);
    setShowLibraryModal(false);
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
    setFilteredImages(images);
  }, [images]);

  return (
    <>
      <Rodal
        showMask
        visible={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
      >
        <EvolutionModalGallery>
          {filteredImages.map((img: ImageItem) => (
            <EvolutionModalGalleryItem
              onClick={() => addParticipant(img)}
              key={img.id}
            >
              <img width={"100%"} height={"100%"} src={img.imageUrl} />
              <h4>{img.title}</h4>
              <GalleryItemScaleComponent scale={img.settings.rarity} />
            </EvolutionModalGalleryItem>
          ))}
        </EvolutionModalGallery>
      </Rodal>
      <ExpeditionPageGrid>
        <ExpeditionPageTitle>
          <h1>{getLocalized(expedition.settings.title, locale)}</h1>{" "}
          <ExpeditionStatusBadge status={expedition.state} />
        </ExpeditionPageTitle>
        <ExpeditionPageImage>
          <img src={expedition.imageUrl} alt={expedition.settings.title.en} />
        </ExpeditionPageImage>

        <ExpeditionPageDescription>
          <p>{getLocalized(expedition.settings.description, locale)}</p>
        </ExpeditionPageDescription>

        <ExpeditionStatus>
          <span>
            Preparation started:{" "}
            {format(expedition.preparationStartedAt.toDate(), "dd.MM.yy HH:mm")}
          </span>
          <span>
            Preparation ended:{" "}
            {format(expedition.preparationEndedAt.toDate(), "dd.MM.yy HH:mm")}
          </span>
          <span>
            Active phase started:{" "}
            {format(expedition.activePhaseStartedAt.toDate(), "dd.MM.yy HH:mm")}
          </span>
          <span>
            Active phase ended:{" "}
            {format(expedition.activePhaseEndedAt.toDate(), "dd.MM.yy HH:mm")}
          </span>
          <span>Min participants: {expedition.minParticipants}</span>{" "}
          <span>Max participants: {expedition.maxParticipants}</span>
          {participantsScale && (
            <span>
              Participants level:
              <GalleryItemScaleComponent scale={participantsScale} />
            </span>
          )}
        </ExpeditionStatus>
        <ExpeditionButtons>
          <NeonButtonComponent
            title="add participant"
            onClick={() => setShowLibraryModal(true)}
            disabled={
              !filteredImages.length ||
              loading ||
              expedition.maxParticipants === participants.length ||
              expedition.minParticipants > images.length
            }
          />
          <NeonButtonComponent
            onClick={resetParticipants}
            title="reset my participants"
          />
        </ExpeditionButtons>

        <ExpeditionParticipants>
          {participants.map((participant) => (
            <ExpeditionParticipantsItem
              key={participant.id}
              borderColor={participantScaleBorderColor}
              onClick={() => removeParticipant(participant)}
            >
              <ExpeditionParticipantsItemImage
                src={participant.imageUrl}
                alt={participant.title}
              />
            </ExpeditionParticipantsItem>
          ))}
        </ExpeditionParticipants>
      </ExpeditionPageGrid>
    </>
  );
};

export default ExpeditionPageGridComponent;
