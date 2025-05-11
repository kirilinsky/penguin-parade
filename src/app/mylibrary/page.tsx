"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import GalleryItemComponent from "@/components/gallery-item/gallery-item.component";
import GalleryComponent from "@/components/gallery/gallery.component";
import { firestore } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

export interface ImageItem {
  id: string;
  imageUrl: string;
  title: string;
  createdAt: any;
  settings: {
    rarity: string;
  };
}
const MyLibraryPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      if (!uid) return;
      setLoading(true);
      try {
        const ref = collection(firestore, `users/${uid}/images`);
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
  }, [uid]);

  console.log(images, "images");

  return (
    <div>
      <h1>library</h1>
      <GalleryComponent>
        {images.map((img: ImageItem) => (
          <GalleryItemComponent img={img} />
        ))}
      </GalleryComponent>
    </div>
  );
};

export default MyLibraryPage;
