import { firestore } from "@/firebase";
import { ImageItem } from "@/types/image.types";
import { collection, getDocs, query } from "firebase/firestore";

export const fetchImages = async (uid: string) => {
  if (!uid) return;
  const ref = collection(firestore, `users/${uid}/images`);
  const q = query(ref);
  const snapshot = await getDocs(q);
  const list = snapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as ImageItem)
  );
  const computed = list.reduce((acc, { settings: { rarity } }) => {
    acc[rarity] = (acc[rarity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  return { computed, list };
};
