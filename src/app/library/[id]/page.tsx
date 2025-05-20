"use client";

import GalleryItemModalComponent from "@/components/gallery-item-modal/gallery-item-modal.component";
import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import { firestore } from "@/firebase";
import { useGetFriends } from "@/hooks/use-get-friends";
import { useGetImages } from "@/hooks/use-get-images";
import { useUserDetails } from "@/hooks/use-user-details";
import { ImageItem } from "@/types/image.types";
import { ScaleType } from "@/types/scale.types";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Rodal from "rodal";

const MyLibraryPage = () => {
  const { id: pageId } = useParams();
  const { user, updateUser } = useUserDetails();

  const [imagesFiltered, setImagesFiltered] = useState<ImageItem[]>([]);
  const [isMyPage, setIsMyPage] = useState(false);
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);

  const { images, loading } = useGetImages(true, pageId);
  const { friends } = useGetFriends();

  const handleOnClick = (img: ImageItem) => {
    setDetailsImage(img);
  };

  const setAvatarAction = async (avatar: string, avatarScale: ScaleType) => {
    if (!user) return;
    await updateUser({ avatar, avatarScale });
  };

  const sendGift = async (toUid: string, imageId: string) => {
    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!user || !userCred) return;

    if (!userCred.emailVerified) {
      await sendEmailVerification(userCred);
      alert(
        `Please verify your email (${user.email}) before gifting a penguin.`
      );
      return;
    }

    if (!toUid || !imageId) {
      return;
    }

    const token = await userCred.getIdToken(true);
    try {
      const res = await fetch("/api/gift-image", {
        method: "POST",
        body: JSON.stringify({
          toUid,
          imageId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Gift has been sent");
        setDetailsImage(null);
        const imagesDraft = [...images];
        setImagesFiltered(imagesDraft.filter((img) => img.id !== imageId));
      } else {
        console.error("Gift process failed:", data);
      }
    } catch (err) {
      console.error("Error during gift process:", err);
    }
  };

  const sellImage = async (imageId: string) => {
    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!user || !userCred) return;

    if (!userCred.emailVerified) {
      await sendEmailVerification(userCred);
      alert(
        `Please verify your email (${userCred.email}) before selling a penguin.`
      );
      return;
    }

    if (!imageId) {
      alert(`Wrong image Id.`);
      return;
    }

    const token = await userCred.getIdToken(true);
    try {
      /* TODO: add loading state for call (block button) */
      const res = await fetch("/api/sold-image", {
        method: "POST",
        body: JSON.stringify({
          imageId,
        }),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.success) {
        alert("Penguin has been sold");
        setDetailsImage(null);
        const imagesDraft = [...images];
        setImagesFiltered(imagesDraft.filter((img) => img.id !== imageId));
      } else {
        console.error("Sell process failed:", data);
      }
    } catch (err) {
      console.error("Error during sell process:", err);
    }
  };

  useEffect(() => {
    setImagesFiltered(images);
  }, [images]);

  useEffect(() => {
    const idIsEqual = pageId === user?.id;
    setIsMyPage(idIsEqual);
  }, [user, pageId]);
  if (loading) {
    return (
      <div>
        <span>loading...</span>
      </div>
    );
  }
  return (
    <GalleryComponent>
      <Rodal visible={!!detailsImage} onClose={() => setDetailsImage(null)}>
        <GalleryItemModalComponent
          user={user}
          friends={friends}
          isMyPage={isMyPage}
          onSendGift={sendGift}
          onSellImage={sellImage}
          loading={loading}
          setAvatar={setAvatarAction}
          img={detailsImage}
        />
      </Rodal>
      {imagesFiltered.length ? (
        imagesFiltered.map((img: ImageItem) => (
          <GalleryItemComponent
            onClick={handleOnClick}
            key={img.id}
            img={img}
          />
        ))
      ) : (
        <div>
          <p>Seems you don't have Penguins yet.</p>
          <br />
          <LinkStyled href={"/countdown"}>Go and Craft first!</LinkStyled>
        </div>
      )}
    </GalleryComponent>
  );
};

export default MyLibraryPage;
