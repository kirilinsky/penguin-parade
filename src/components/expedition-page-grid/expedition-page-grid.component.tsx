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
import { User } from "@/types/user.types";
import { getAuth } from "firebase/auth";
import { useExpeditionPenguins } from "@/hooks/use-get-expedition-penguins";
import ExpeditionCountdown from "../expedition-countdown/expedition-countdown.component";
import ExpeditionParticipants from "../expedition-participants/expedition-participants.component";
import ExpeditionStatusComponent from "../expedition-status/expedition-status.component";

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
        <ExpeditionPageImage>
          <img src={expedition.imageUrl} alt={expedition.settings.title.en} />
        </ExpeditionPageImage>
        <ExpeditionContentColumn>
          {" "}
          <ExpeditionPageTitle>
            <h1>{getLocalized(expedition.settings.title, locale)}</h1>{" "}
          </ExpeditionPageTitle>{" "}
          <ExpeditionStatusComponent
            expedition={expedition}
            participantScale={participantScale}
          />{" "}
          <ExpeditionPageDescription>
            <p>{getLocalized(expedition.settings.description, locale)}</p>
          </ExpeditionPageDescription>{" "}
          <ExpeditionParticipants
            loading={loading}
            penguinsParticipants={penguinsParticipants}
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
          />{" "}
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
