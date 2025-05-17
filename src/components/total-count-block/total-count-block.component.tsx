import React, { useEffect, useState } from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { useAtomValue } from "jotai";
import { userIdAtom } from "@/atoms/user/user.atom";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";

const TotalCountBlockComponent = () => {
  const uid = useAtomValue(userIdAtom);
  const [total, setTotal] = useState<Record<string, number>>({});

  /* TODO: add fetched images to atom ? */
  const fetchImages = async () => {
    const ref = collection(firestore, `users/${uid}/images`);
    const q = query(ref);
    const snapshot = await getDocs(q);
    const list = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as ImageItem)
    );
    const result = list.reduce((acc, { settings: { rarity } }) => {
      acc[rarity] = (acc[rarity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    setTotal(result);
  };

  useEffect(() => {
    fetchImages();
  }, [uid]);
  return (
    <PageContentBlockStyled>
      <h2>Total count</h2>
      {Object.entries(total).map(([key, value]) => {
        return (
          <span>
            {key} - {value}
          </span>
        );
      })}
    </PageContentBlockStyled>
  );
};

export default TotalCountBlockComponent;
