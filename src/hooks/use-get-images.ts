import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";
import { ParamValue } from "next/dist/server/request/params";
import { useUserDetails } from "./use-user-details";

export type RarityCount = Record<string, number>;

export const useGetImages = (
  sortByDate: boolean = false,
  id?: "all" | string | ParamValue | null,
  scale?: string
) => {
  const { user } = useUserDetails();
  const uid = id ?? user?.id;

  const [lastCrafted, setLastCrafted] = useState<ImageItem | null>(null);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [auctionImages, setAuctionImages] = useState<ImageItem[]>([]);
  const [rarityCount, setRarityCount] = useState<RarityCount>({});
  const [total, setTotal] = useState<number>(0);
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
        const constraints = [];
        const baseRef = collection(firestore, "images");
        if (uid !== "all") {
          constraints.push(where("ownerId", "==", uid));
        }

        if (scale) {
          constraints.push(where("settings.rarity", "==", scale));
        }

        const q = query(baseRef, ...constraints);
        const snapshot = await getDocs(q);

        let list = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ImageItem)
        );

        if (sortByDate) {
          list = list.sort(
            (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)
          );
        }
        setLastCrafted(list[0]);
        setImages(list);
        setTotal(list.length);

        const filtered = list.filter((img) => !img.inExpedition && !img.gift);

        setAuctionImages(filtered);

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
  }, [uid, sortByDate, scale, refetchTrigger]);

  return {
    images,
    auctionImages,
    lastCrafted,
    rarityCount,
    uid,
    total,
    loading,
    error,
    refetch,
  };
};
