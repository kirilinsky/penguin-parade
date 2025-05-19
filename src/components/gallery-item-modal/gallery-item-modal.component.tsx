"use client";

import { ImageItem } from "@/types/image.types";
import React, { useMemo, useState } from "react";
import {
  GalleryItemModalAccordion,
  GalleryItemModalButtonsContainer,
  GalleryItemModalContainer,
  GalleryItemModalContent,
  GalleryItemModalDes,
  GalleryItemModalImage,
  GalleryItemModalScale,
  GalleryItemModalTitle,
} from "./gallery-item-modal.component.styled";
import { Orbitron } from "next/font/google";
import GalleryItemScaleComponent from "../gallery-item-scale/gallery-item-scale.component";
import { getBaseColorByScale } from "@/helpers/get-base-color-by-rarity/get-base-color-by-rarity";

import NeonButtonComponent from "../neon-button/neon-button.component";
import { format } from "date-fns";
import { useGetFriends } from "@/hooks/use-get-friends";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const GalleryItemModalComponent = ({
  img,
  uid,
  isMyPage,
  onSendGift,
  currentAvatar,
  setAvatar,
}: {
  img: ImageItem | null;
  uid: string | null;
  isMyPage: boolean;
  currentAvatar: string | null;
  onSendGift: (recipientId: string, imgId: string) => void;
  setAvatar: (a: string, aR: string) => void;
}) => {
  if (!img) return null;
  const [giftMode, setGiftMode] = useState(false);
  const [friendRecipient, setFriendRecipient] = useState<string>("");

  const { friends } = useGetFriends(uid);

  const baseColor = useMemo(() => {
    return getBaseColorByScale(img.settings.rarity);
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
          <GalleryItemScaleComponent
            baseColor={baseColor}
            className={orbitron.className}
            scale={img.settings.rarity}
          />
        </GalleryItemModalScale>
        <GalleryItemModalAccordion $expand={!giftMode}>
          <GalleryItemModalDes>{img.settings.des}</GalleryItemModalDes>

          <span>Theme: {img.settings.theme}</span>

          <span>Ability: {img.settings.ability}</span>

          <span>Loot: {img.settings.acc}</span>

          <span>Origin: {img.origin}</span>

          <span>Breast: {img.settings.breast}</span>

          <span>Beak: {img.settings.beak}</span>

          <span>Back: {img.settings.back}</span>

          <span>Created: {format(img.createdAt.toDate(), "dd.MM.yy")}</span>

          {isMyPage && (
            <GalleryItemModalButtonsContainer>
              {currentAvatar !== img.imageUrl && (
                <NeonButtonComponent
                  title="Set as avatar"
                  onClick={() => setAvatar(img.imageUrl, img.settings.rarity)}
                />
              )}
              <NeonButtonComponent
                onClick={() => setGiftMode(true)}
                title="Give a friend (BETA)"
              />
              <NeonButtonComponent title="Sell on auction (TBA)" />
            </GalleryItemModalButtonsContainer>
          )}
        </GalleryItemModalAccordion>

        {giftMode && (
          <div>
            <span>
              <i>beta feature</i>
            </span>
            <h3>Choose recipient</h3>
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
            <br />
            <GalleryItemModalButtonsContainer>
              <button
                onClick={() => onSendGift(friendRecipient, img.id)}
                disabled={!friendRecipient}
              >
                send
              </button>

              <button
                onClick={() => {
                  setGiftMode(false);
                  setFriendRecipient("");
                }}
              >
                cancel
              </button>
            </GalleryItemModalButtonsContainer>
          </div>
        )}
      </GalleryItemModalContent>
    </GalleryItemModalContainer>
  );
};

export default GalleryItemModalComponent;
