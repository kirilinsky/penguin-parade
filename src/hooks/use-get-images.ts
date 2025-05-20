import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";
import { ParamValue } from "next/dist/server/request/params";
import { useUserDetails } from "./use-user-details";

type RarityCount = Record<string, number>;

export const useGetImages = (
  sortByDate: boolean = false,
  id?: string | ParamValue
) => {
  const { user } = useUserDetails();
  const uid = id ?? user?.id;

  const [images, setImages] = useState<ImageItem[]>([]);
  const [rarityCount, setRarityCount] = useState<RarityCount>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  const refetch = useCallback(() => {
    setRefetchTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      if (!uid) return;

      setLoading(true);
      setError(null);

      try {
        const ref = collection(firestore, "images");
        const q = query(ref, where("ownerId", "==", uid));
        const snapshot = await getDocs(q);

        let list = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ImageItem)
        );

        if (sortByDate) {
          list = list.sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          );
        }

        setImages(list);

        const computed = list.reduce((acc, { settings: { rarity } }) => {
          acc[rarity] = (acc[rarity] || 0) + 1;
          return acc;
        }, {} as RarityCount);

        setRarityCount(computed);
      } catch (err) {
        console.error("Error fetching images:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [uid, sortByDate, refetchTrigger]);

  return { images, rarityCount, loading, error, refetch };
};
