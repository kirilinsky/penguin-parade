import React, { useEffect, useState } from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";
import GalleryItemComponent from "../gallery-item/gallery-item.component";
import { LinkStyled } from "../link/link.component.styled";
import Image from "next/image";

const LastCraftedBlockComponent = ({ uid }: { uid: string | null }) => {
  const [lastCrafted, setLastCrafted] = useState<ImageItem | null>(null);

  useEffect(() => {
    async function fetchImages() {
      if (!uid) return;

      try {
        const ref = collection(firestore, `users/${uid}/images`);
        const q = query(ref, orderBy("createdAt", "desc"), limit(1));
        const snapshot = await getDocs(q);
        const list = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ImageItem)
        );
        const firstCraftedItem = list[0];
        if (firstCraftedItem) {
          setLastCrafted(firstCraftedItem);
        }
      } catch (err) {
        console.error("Error loading last crafted:", err);
      }
    }
    fetchImages();
  }, [uid]);
  return (
    <PageContentBlockStyled>
      <h2>Last Crafted Penguin</h2>
      {lastCrafted ? (
        <GalleryItemComponent slim scalable={false} img={lastCrafted} />
      ) : (
        <>
          <p>You don't have Penguins yet! </p>
          <LinkStyled href={"/countdown"}>Craft new</LinkStyled>

          <Image
            alt="nofriends"
            src="/infographics/no-friends.png"
            width="120"
            height="120"
          />
        </>
      )}
    </PageContentBlockStyled>
  );
};

export default LastCraftedBlockComponent;
