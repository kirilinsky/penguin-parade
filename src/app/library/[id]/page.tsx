"use client";

import AvatarComponent from "@/components/avatar-component/avatar-component";
import GalleryFilterComponent from "@/components/gallery-filter-component/gallery-filter-component";
import GalleryItemModalComponent from "@/components/gallery-item-modal/gallery-item-modal.component";
import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import LibraryTitleComponent from "@/components/library-title/library-title.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import { useGetFriends } from "@/hooks/use-get-friends";
import { useGetImages } from "@/hooks/use-get-images";
import { useGetUserCredentials } from "@/hooks/use-get-user-credentials";
import { useUserDetails } from "@/hooks/use-user-details";
import { ImageItem, ImagesSortType } from "@/types/image.types";
import { scaleOrder, ScaleType } from "@/types/scale.types";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Rodal from "rodal";

const MyLibraryPage = () => {
  const { id: pageId } = useParams();
  const { user, updateUser } = useUserDetails();

  const [imagesFiltered, setImagesFiltered] = useState<ImageItem[]>([]);
  const [isMyPage, setIsMyPage] = useState(false);
  const [loadingSell, setLoadingSell] = useState(false);
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);
  const [sortOption, setSortOption] = useState<ImagesSortType>("newest");
  const [filterOption, setFilterOption] = useState<"all" | ScaleType>("all");

  const { data: pageUser } = useGetUserCredentials(
    isMyPage ? undefined : (pageId as string)
  );

  const { images, loading, rarityCount } = useGetImages(true, pageId);
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
      toast.error(
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
        toast.success("Gift has been sent");
        setDetailsImage(null);
        const imagesDraft = [...images];
        setImagesFiltered(imagesDraft.filter((img) => img.id !== imageId));
      } else {
        throw new Error("Gift process failed:", data);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const sellImage = async (imageId: string) => {
    const auth = getAuth();
    const userCred = auth.currentUser;
    if (!user || !userCred) return;

    if (!userCred.emailVerified) {
      await sendEmailVerification(userCred);
      toast.error(
        `Please verify your email (${userCred.email}) before selling a penguin.`
      );
      return;
    }

    if (!imageId) {
      toast.error(`Wrong image Id.`);
      return;
    }

    const token = await userCred.getIdToken(true);
    setLoadingSell(true);
    try {
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
        toast.success("Penguin has been sold");
        setDetailsImage(null);
        setLoadingSell(false);
        const imagesDraft = [...images];
        setImagesFiltered(imagesDraft.filter((img) => img.id !== imageId));
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error("Error during sell process:", err);
    }
  };

  const onFilterOptionClick = (option: "all" | ScaleType) => {
    if (option === filterOption) {
      option = "all";
    }
    setFilterOption(option);
  };

  useEffect(() => {
    let filtered = [...images];

    if (filterOption !== "all") {
      filtered = filtered.filter((img) => img.settings.rarity === filterOption);
    }

    switch (sortOption) {
      case "newest":
        filtered.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);
        break;
      case "oldest":
        filtered.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds);
        break;
      case "rarity":
        filtered.sort(
          (a, b) =>
            scaleOrder.indexOf(b.settings.rarity) -
            scaleOrder.indexOf(a.settings.rarity)
        );
        break;
    }
    setImagesFiltered(filtered);
  }, [images, sortOption, filterOption]);

  useEffect(() => {
    const idIsEqual = pageId === user?.id;
    setIsMyPage(idIsEqual);
  }, [user, pageId]);

  if (loading) {
    return (
      <div>
        <span>loading gallery...</span>
      </div>
    );
  }
  return (
    <>
      {!!images.length && (
        <Rodal
          showMask
          visible={!!detailsImage}
          onClose={() => setDetailsImage(null)}
        >
          <GalleryItemModalComponent
            user={user}
            friends={friends}
            isMyPage={isMyPage}
            onSendGift={sendGift}
            onSellImage={sellImage}
            loading={loading || loadingSell}
            setAvatar={setAvatarAction}
            img={detailsImage}
          />
        </Rodal>
      )}
      {(user || pageUser) && (
        <LibraryTitleComponent
          user={isMyPage ? user : pageUser}
          imagesCount={images.length}
          isMyPage={isMyPage}
        />
      )}

      {!!images.length && (
        <GalleryFilterComponent
          isAuction={false}
          sortOption={sortOption}
          rarityCount={rarityCount}
          filterOption={filterOption}
          setSortOption={setSortOption}
          onFilterOptionClick={onFilterOptionClick}
        />
      )}
      <GalleryComponent>
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
            <p>Seems {isMyPage ? "you" : "user"} don't have Penguins yet.</p>
            <br />
            {user && isMyPage && (
              <LinkStyled href={"/countdown"}>Go and Craft first!</LinkStyled>
            )}
          </div>
        )}
      </GalleryComponent>
    </>
  );
};

export default MyLibraryPage;
