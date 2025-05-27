"use client";

import { ImageItem } from "@/types/image.types";
import React, { useMemo, useState } from "react";
import {
  GalleryItemModalAccordion,
  GalleryItemModalButtonsContainer,
  GalleryItemModalContainer,
  GalleryItemModalContent,
  GalleryItemModalFriendsItem,
  GalleryItemModalFriendsList,
  GalleryItemModalImage,
  GalleryItemModalScale,
  GalleryItemModalTitle,
} from "./gallery-item-modal.component.styled";
import { Tektur } from "next/font/google";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import NeonButtonComponent from "../neon-button/neon-button.component";
import { getPriceByScale } from "@/helpers/get-price-by-scale/get-price-by-scale";
import { FriendWithUser } from "@/types/friends.types";
import { ScaleType } from "@/types/scale.types";
import GalleryItemModalStatistics from "../gallery-item-modal-statistics/gallery-item-modal-statistics.component";
import AvatarComponent from "../avatar-component/avatar-component";
import { useLocale, useTranslations } from "next-intl";
import { getLocalized } from "@/helpers/get-localized/get-localized";
import { User } from "@/types/user.types";

const tektur = Tektur({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const GalleryItemModalComponent = ({
  img,
  isMyPage,
  friends,
  loading,
  onSendGift,
  onSellImage,
  user,
  setAvatar,
}: {
  img: ImageItem | null;
  isMyPage: boolean;
  friends: FriendWithUser[];
  loading: boolean;
  user: User | null;
  onSendGift: (recipientId: string, imgId: string) => void;
  onSellImage: (imgId: string) => void;
  setAvatar: (a: string, aR: ScaleType) => void;
}) => {
  if (!img) return null;
  const t = useTranslations("galleryItemModal");
  const locale = useLocale();
  const [giftMode, setGiftMode] = useState(false);
  const [friendRecipient, setFriendRecipient] =
    useState<FriendWithUser | null>();

  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
  }, [img.settings.rarity]);

  const { buy, sell } = useMemo(() => {
    return getPriceByScale(img.settings.rarity);
  }, [img.settings.rarity]);

  return (
    <GalleryItemModalContainer>
      <GalleryItemModalContent $frameColor={baseColor}>
        <GalleryItemModalImage
          alt={img.title}
          src={img.imageUrl}
          fill
          style={{ objectFit: "cover" }}
        />
      </GalleryItemModalContent>
      <GalleryItemModalContent>
        <GalleryItemModalTitle className={tektur.className}>
          {getLocalized(img.settings.t, locale)}
        </GalleryItemModalTitle>
        <GalleryItemModalScale>
          <GalleryItemScaleComponent scale={img.settings.rarity} />
        </GalleryItemModalScale>
        <GalleryItemModalAccordion $expand={!giftMode}>
          <GalleryItemModalStatistics img={img} />
          {user && isMyPage && (
            <GalleryItemModalButtonsContainer>
              {user.avatar !== img.imageUrl && (
                <NeonButtonComponent
                  title={t("avatarButton")}
                  onClick={() => setAvatar(img.imageUrl, img.settings.rarity)}
                />
              )}
              <NeonButtonComponent
                onClick={() => setGiftMode(true)}
                title={t("giftButton")}
              />
              {buy && sell && (
                <NeonButtonComponent
                  onClick={() => onSellImage(img.id)}
                  title={`${t("sellButton")} ${sell} P$`}
                />
              )}
            </GalleryItemModalButtonsContainer>
          )}
        </GalleryItemModalAccordion>

        {user && giftMode && (
          <>
            <h3>{t("chooseFriendTitle")}</h3>
            <GalleryItemModalFriendsList>
              {friends.map((friend) => (
                <GalleryItemModalFriendsItem
                  key={friend.id}
                  active={friend.id === friendRecipient?.id}
                >
                  <b>{friend.username}</b>
                  <AvatarComponent
                    avatarScale={friend.avatarScale}
                    avatarUrl={friend.avatar}
                    username={friend.username}
                  />

                  <NeonButtonComponent
                    onClick={() =>
                      setFriendRecipient(
                        friend.id === friendRecipient?.id ? null : friend
                      )
                    }
                    title={
                      friend.id === friendRecipient?.id
                        ? t("unsetButton")
                        : `${t("chooseButton")} ${friend.username}`
                    }
                  />
                </GalleryItemModalFriendsItem>
              ))}
            </GalleryItemModalFriendsList>

            <GalleryItemModalButtonsContainer>
              {loading && t("pleaseWait")}
              {friendRecipient && (
                <NeonButtonComponent
                  title={
                    loading
                      ? t("loadingGift")
                      : `${t("sendButton")} ${friendRecipient.username}`
                  }
                  onClick={() => onSendGift(friendRecipient.id, img.id)}
                  disabled={loading}
                />
              )}

              <NeonButtonComponent
                onClick={() => {
                  setGiftMode(false);
                  setFriendRecipient(null);
                }}
                title={t("cancelButton")}
              ></NeonButtonComponent>
            </GalleryItemModalButtonsContainer>
          </>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default GalleryItemModalComponent;
