import React, { useEffect, useMemo, useState } from "react";
import {
  ExpeditionPageDescription,
  ExpeditionButtons,
  ExpeditionPageGrid,
  ExpeditionPageImage,
  ExpeditionPageTitle,
  ExpeditionContentColumn,
} from "./expedition-page-grid.component.styled";
import {
  Expedition,
  ExpeditionRewardResponse,
} from "@/types/expeditions.types";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { useLocale, useTranslations } from "next-intl";
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
import ExpeditionRewardModal from "../modals/expedition-reward-modal/expedition-reward-modal.component";
import { getRewardCall } from "@/helpers/api/get-reward.call";
import Image from "next/image";
import { toast } from "react-toastify";

const ExpeditionPageGridComponent = ({
  expedition,
  refreshUser,
  user,
}: {
  expedition: Expedition;
  refreshUser: () => Promise<void>;
  user: User;
}) => {
  const locale = useLocale();
  const t = useTranslations("expeditionPage");

  const {
    penguins: penguinsParticipants,
    otherPenguins,
    hasJoined,
    claimedReward,
    refetch,
  } = useExpeditionPenguins(expedition.id);
  const [filteredImages, setFilteredImages] = useState<
    ImageItem[] | UserExpeditionItemPenguin[]
  >([]);
  const [participants, setParticipants] = useState<ImageItem[]>([]);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [showRewardModal, setShowRewardModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [rewardLoading, setRewardLoading] = useState(false);
  const [result, setResult] = useState<ExpeditionRewardResponse | null>(null);

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

    try {
      setLoading(true);
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
      toast.success("Success");

      setLoading(false);

      return data;
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const unsetParticipation = async () => {
    if (!penguinsParticipants.length) return;
    /* TODO: add loader */
    const token = await getIdToken();
    setLoading(true);

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
    setLoading(false);
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

  const getReward = async () => {
    setRewardLoading(true);

    try {
      const token = await getIdToken();
      const res = await getRewardCall({
        expeditionId: expedition.id,
        token,
      });
      setResult(res);
      setShowRewardModal(true);
    } catch (err: any) {
      console.error(err.message, "get reward error");
    } finally {
      setRewardLoading(false);
    }
  };

  useEffect(() => {
    if (penguinsParticipants.length) {
      setFilteredImages(penguinsParticipants);
    } else {
      setFilteredImages(images);
      resetParticipants();
    }
  }, [images, penguinsParticipants]);

  const resetParticipants = () => {
    setParticipants([]);
    setFilteredImages(images);
  };

  const hasEnoughImages = images.length >= expedition.minParticipants;
  const hasSpaceLeft = participants.length < expedition.maxParticipants;

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
      {result && (
        <ExpeditionRewardModal
          onClose={() => {
            setShowRewardModal(false);
            refetch();
            refreshUser();
          }}
          showModal={showRewardModal}
          result={result}
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
          {!hasEnoughImages ? (
            "Sorry, you don't have enough Penguins to join"
          ) : (
            <ExpeditionParticipants
              loading={loading}
              hasJoined={hasJoined}
              otherPenguins={otherPenguins}
              penguinsParticipants={
                hasJoined ? penguinsParticipants : participants
              }
              onRemove={removeParticipant}
              onAdd={() => setShowLibraryModal(true)}
              participantScale={participantScale}
              addingDisabled={
                expedition.state !== "preparing" ||
                hasJoined ||
                imagesLoading ||
                loading ||
                !hasSpaceLeft ||
                !hasEnoughImages
              }
            />
          )}
          {(!!penguinsParticipants.length || !!participants.length) && (
            <div>
              {claimedReward && <span>{t("rewardClaimed")}</span>}
              {claimedReward ? t("claimed") : t("expectRewards")}:{" "}
              {expedition.preset.goldPerPenguin *
                (hasJoined
                  ? penguinsParticipants.length
                  : participants.length)}{" "}
              <Image src="/coin.webp" width={19} height={19} alt="coin" />{" "}
            </div>
          )}
          {expedition.state === "ended" && (
            <h2>
              {t(
                hasJoined
                  ? "expeditionEndedYouCanClaim"
                  : "expeditionEndedTryNext"
              )}
            </h2>
          )}
          <ExpeditionButtons>
            {!!participants.length && !hasJoined && (
              <NeonButtonComponent
                onClick={resetParticipants}
                disabled={loading}
                title={t("resetParticipants")}
              />
            )}
            {expedition.state === "preparing" &&
              (hasJoined ? (
                <NeonButtonComponent
                  onClick={unsetParticipation}
                  title={t("unsetParticipation")}
                  disabled={loading}
                />
              ) : (
                <NeonButtonComponent
                  onClick={confirmParticipant}
                  disabled={
                    loading ||
                    participants.length < expedition.minParticipants ||
                    participants.length > expedition.maxParticipants
                  }
                  title={t("confirmParticipation")}
                />
              ))}
            {expedition.state === "ended" && hasJoined && !claimedReward && (
              <NeonButtonComponent
                disabled={rewardLoading || loading}
                onClick={getReward}
                title={rewardLoading ? t("loadingReward") : t("takeReward")}
              />
            )}
          </ExpeditionButtons>
        </ExpeditionContentColumn>
      </ExpeditionPageGrid>
    </>
  );
};

export default ExpeditionPageGridComponent;
