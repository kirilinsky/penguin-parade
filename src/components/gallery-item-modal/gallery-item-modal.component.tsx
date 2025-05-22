"use client";

import { ImageItem } from "@/types/image.types";
import React, { useMemo, useState } from "react";
import {
  GalleryItemModalAccordion,
  GalleryItemModalButtonsContainer,
  GalleryItemModalContainer,
  GalleryItemModalContent,
  GalleryItemModalImage,
  GalleryItemModalScale,
  GalleryItemModalTitle,
} from "./gallery-item-modal.component.styled";
import { Orbitron } from "next/font/google";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";
import NeonButtonComponent from "../neon-button/neon-button.component";
import { format } from "date-fns";
import { getPriceByScale } from "@/helpers/get-price-by-scale/get-price-by-scale";
import { FriendWithUser, User } from "@/types/friends.types";
import { ScaleType } from "@/types/scale.types";
import GalleryItemModalStatistics from "../gallery-item-modal-statistics/gallery-item-modal-statistics.component";

const orbitron = Orbitron({
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
  const [giftMode, setGiftMode] = useState(false);
  const [friendRecipient, setFriendRecipient] = useState<string>("");

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
        <GalleryItemModalTitle className={orbitron.className}>
          {img.title}
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
                  title="Set as avatar"
                  onClick={() => setAvatar(img.imageUrl, img.settings.rarity)}
                />
              )}
              <NeonButtonComponent
                onClick={() => setGiftMode(true)}
                title="Give a friend (BETA)"
              />
              {buy && sell && (
                <NeonButtonComponent
                  onClick={() => onSellImage(img.id)}
                  title={`Sell on auction for ${sell} P$`}
                />
              )}
            </GalleryItemModalButtonsContainer>
          )}
        </GalleryItemModalAccordion>

        {user && giftMode && (
          <>
            <h3>Choose Friend</h3>
            <br />
            {friends && (
              <select
                onChange={(e) => setFriendRecipient(e.target.value)}
                name="friend-recipient"
                id="friends-list"
                value={friendRecipient}
              >
                <option value={""} disabled>
                  Choose friend
                </option>
                {friends.map((friend) => (
                  <option value={friend.id} key={friend.id}>
                    {friend.username}
                  </option>
                ))}
              </select>
            )}
            <br />
            <br />
            <GalleryItemModalButtonsContainer>
              {loading && "please wait..."}
              <NeonButtonComponent
                title="Send Penguin"
                onClick={() => onSendGift(friendRecipient, img.id)}
                disabled={!friendRecipient || loading}
              />

              <NeonButtonComponent
                onClick={() => {
                  setGiftMode(false);
                  setFriendRecipient("");
                }}
                title="Cancel"
              ></NeonButtonComponent>
            </GalleryItemModalButtonsContainer>
          </>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default GalleryItemModalComponent;
