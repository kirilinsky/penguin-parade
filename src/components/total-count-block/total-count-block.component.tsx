import React, { useEffect, useState } from "react";
import { PageContentBlockStyled } from "../page-content-block/page-content-block.component.styled";
import { useAtomValue } from "jotai";
import { userIdAtom } from "@/atoms/user/user.atom";
import { collection, getDocs, query } from "firebase/firestore";
import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";
import { fetchImages } from "@/helpers/api/fetch-images/fetch-images";

const TotalCountBlockComponent = () => {
  const uid = useAtomValue(userIdAtom);
  const [total, setTotal] = useState<Record<string, number>>({});

  /* TODO: add fetched images to parent page */
  const onLoad = async (uid: string) => {
    const result = await fetchImages(uid);
    if (result) {
      setTotal(result.computed);
    }
  };

  useEffect(() => {
    uid && onLoad(uid);
  }, [uid]);
  return (
    <PageContentBlockStyled>
      <h2>Total count</h2>
      {Object.entries(total).map(([key, value]) => {
        return (
          <span key={key}>
            {key} - {value}
          </span>
        );
      })}
    </PageContentBlockStyled>
  );
};

export default TotalCountBlockComponent;
