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
import { User } from "@/types/user.types";
import { getAuth } from "firebase/auth";
import { useExpeditionPenguins } from "@/hooks/use-get-expedition-penguins";
import ExpeditionCountdown from "../expedition-countdown/expedition-countdown.component";

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
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const participantsScale = useMemo(() => {
    return getPrevScale(expedition.level) as ScaleType;
  }, [expedition.level]);

  const participantScaleBorderColor = useMemo(() => {
    return getBaseColorByScale(participantsScale);
  }, [participantsScale]);

  const { images, loading: imagesLoading } = useGetImages(
    true,
    null,
    participantsScale
  );

  const addParticipant = async (img: ImageItem) => {
    if (!user) {
      return;
    }

    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!userCred || !user) return;

    await userCred.reload();
    if (!userCred.emailVerified) {
      return;
    }

    const token = await userCred.getIdToken(true);
    try {
      setLoading(true);

      const res = await fetch("/api/expeditions/add-expedition-participant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ imageId: img.id, expeditionId: expedition.id }),
      });

      if (!res.ok) {
        const err = await res.json();
        return { success: false, error: err.error || "Unknown error" };
      }

      await res.json();
      refetch();
      setShowLibraryModal(false);
    } catch (e) {
      return { success: false, error: "Network or server error" };
    } finally {
      setLoading(false);
    }
  };

  const removeParticipant = async (penguinParticipantId: string) => {
    if (!user) {
      return;
    }

    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!userCred || !user) return;

    await userCred.reload();
    if (!userCred.emailVerified) {
      return;
    }

    const token = await userCred.getIdToken(true);
    try {
      setLoading(true);
      const res = await fetch(
        "/api/expeditions/remove-expedition-participant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            imageId: penguinParticipantId,
            expeditionId: expedition.id,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        return { success: false, error: err.error || "Unknown error" };
      }

      await res.json();
      refetch();
    } catch (e) {
      return { success: false, error: "Network or server error" };
    } finally {
      setLoading(false);
    }
  };

  const resetParticipants = () => {
    /* TODO  add reset */
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
      <Rodal
        showMask
        visible={showLibraryModal}
        onClose={() => setShowLibraryModal(false)}
      >
        {/* TODO add loader into modal */}
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
          <ExpeditionCountdown expedition={expedition} />
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
              imagesLoading ||
              loading ||
              expedition.maxParticipants === penguinsParticipants.length ||
              expedition.minParticipants > images.length
            }
          />
          <NeonButtonComponent
            onClick={resetParticipants}
            title="reset my participants"
          />
        </ExpeditionButtons>

        <ExpeditionParticipants>
          {loading
            ? "loading..."
            : penguinsParticipants.map((participant) => (
                <ExpeditionParticipantsItem
                  key={participant.id}
                  borderColor={participantScaleBorderColor}
                  onClick={() => removeParticipant(participant.id)}
                >
                  <ExpeditionParticipantsItemImage
                    src={participant.imageUrl}
                    alt={participant.id}
                  />
                </ExpeditionParticipantsItem>
              ))}
        </ExpeditionParticipants>
      </ExpeditionPageGrid>
    </>
  );
};

export default ExpeditionPageGridComponent;
