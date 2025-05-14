"use client";

import {
  avatarAtom,
  avatarScaleAtom,
  userIdAtom,
} from "@/atoms/user/user.atom";
import GalleryItemModalComponent from "@/components/gallery-item-modal/gallery-item-modal.component";
import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import { LinkStyled } from "@/components/link/link.component.styled";
import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { useAtomValue, useSetAtom } from "jotai";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Rodal from "rodal";

const MyLibraryPage = () => {
  const { id: pageId } = useParams();
  const uid = useAtomValue(userIdAtom);
  const currentAvatar = useAtomValue(avatarAtom);

  const setAvatar = useSetAtom(avatarAtom);
  const setAvatarScale = useSetAtom(avatarScaleAtom);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMyPage, setIsMyPage] = useState(false);
  const [detailsImage, setDetailsImage] = useState<ImageItem | null>(null);

  const handleOnClick = (img: ImageItem) => {
    setDetailsImage(img);
    console.log(img, "123");
  };

  const setAvatarAction = async (avatar: string, avatarScale: string) => {
    if (!uid) return;
    await setDoc(
      doc(firestore, "users", uid),
      { avatar, avatarScale },
      { merge: true }
    );
    setAvatar(avatar);
    setAvatarScale(avatarScale);
  };

  useEffect(() => {
    async function fetchImages() {
      const idIsEqual = pageId === uid;
      setIsMyPage(idIsEqual);
      const id = idIsEqual ? uid : pageId;
      if (!id) return;
      setLoading(true);
      try {
        const ref = collection(firestore, `users/${id}/images`);
        const q = query(ref, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ImageItem)
        );
        setImages(list);
      } catch (err) {
        console.error("Error loading gallery:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [uid, pageId]);

  return (
    <GalleryComponent>
      <Rodal visible={!!detailsImage} onClose={() => setDetailsImage(null)}>
        <GalleryItemModalComponent
          isMyPage={isMyPage}
          currentAvatar={currentAvatar}
          setAvatar={setAvatarAction}
          img={detailsImage}
        />
      </Rodal>
      {images.length ? (
        images.map((img: ImageItem) => (
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
