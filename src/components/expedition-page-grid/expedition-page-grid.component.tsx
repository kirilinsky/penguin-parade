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
import { getPrevScale } from "@/helpers/get-prev-scale/get-prev-scale";
import { useGetImages } from "@/hooks/use-get-images";
import { ScaleType } from "@/types/scale.types";
import { ImageItem } from "@/types/image.types";
import { User, UserExpeditionItemPenguin } from "@/types/user.types";
import { useExpeditionPenguins } from "@/hooks/use-get-expedition-penguins";
import ExpeditionParticipants from "../expedition-participants/expedition-participants.component";
import ExpeditionStatusComponent from "../expedition-status/expedition-status.component";
import ExpeditionParticipantModal from "../modals/expedition-participant-modal/expedition-participant-modal.component";
import { getIdToken } from "@/helpers/get-token/get-token";

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
  const [filteredImages, setFilteredImages] = useState<
    ImageItem[] | UserExpeditionItemPenguin[]
  >([]);
  const [participants, setParticipants] = useState<ImageItem[]>([]);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [hasJoined, setHasJoined] = useState(false);
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

  const removeParticipant = (id: string) => {
    const participantsDraft = [...participants].filter(
      (current) => current.id !== id
    );
    setParticipants(participantsDraft);
    const removedCandidate = images.find((img) => img.id === id);
    if (removedCandidate) {
      setFilteredImages([...filteredImages, removedCandidate]);
    }
  };

  const confirmParticipant = async () => {
    if (!participants.length) return;
    /* TODO use get id token in other functions */
    const imageIds = participants.map((img) => img.id);
    const token = await getIdToken();

    const res = await fetch("/api/expeditions/join-expedition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        expeditionId: expedition.id,
        imageIds,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to join expedition");
    refetch();
    setHasJoined(true);
    alert("success!");

    return data;
  };

  const unsetParticipation = async () => {
    if (!penguinsParticipants.length) return;
    /* TODO: add loader */
    const token = await getIdToken();

    const res = await fetch("/api/expeditions/exit-expedition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        expeditionId: expedition.id,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to exit expedition");

    alert("you're unset!");
    setHasJoined(false);
    refetch();
    return data;
  };

  const isImageItemArray = (arr: unknown[]): arr is ImageItem[] => {
    return (
      Array.isArray(arr) &&
      arr.length > 0 &&
      typeof arr[0] === "object" &&
      arr[0] !== null &&
      "settings" in arr[0]
    );
  };

  useEffect(() => {
    if (penguinsParticipants.length) {
      setFilteredImages(penguinsParticipants);
      setHasJoined(true);
    } else {
      resetParticipants();
    }
  }, [penguinsParticipants]);

  const resetParticipants = () => {
    setParticipants([]);
    setFilteredImages(images);
  };

  return (
    <>
      {isImageItemArray(filteredImages) && (
        <ExpeditionParticipantModal
          showModal={showLibraryModal}
          images={filteredImages}
          onItemClick={addParticipant}
          onClose={() => setShowLibraryModal(false)}
        />
      )}
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
            hasJoined={hasJoined}
            penguinsParticipants={
              hasJoined ? penguinsParticipants : participants
            }
            onRemove={removeParticipant}
            onAdd={() => setShowLibraryModal(true)}
            participantScale={participantScale}
            addingDisabled={
              hasJoined ||
              !filteredImages.length ||
              imagesLoading ||
              loading ||
              expedition.maxParticipants === participants.length ||
              expedition.minParticipants > images.length
            }
          />
          <ExpeditionButtons>
            {!!participants.length && (
              <NeonButtonComponent
                onClick={resetParticipants}
                title="reset my participants"
              />
            )}
            {hasJoined ? (
              <NeonButtonComponent
                onClick={unsetParticipation}
                title="Unset participation"
              />
            ) : (
              <NeonButtonComponent
                onClick={confirmParticipant}
                disabled={
                  participants.length < expedition.minParticipants ||
                  participants.length > expedition.maxParticipants
                }
                title="confirm participation"
              />
            )}
          </ExpeditionButtons>
        </ExpeditionContentColumn>
      </ExpeditionPageGrid>
    </>
  );
};

export default ExpeditionPageGridComponent;
