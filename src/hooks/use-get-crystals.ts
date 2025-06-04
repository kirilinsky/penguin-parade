import { useEffect, useState } from "react";
import { collection, getDocs, query, DocumentData } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useUserDetails } from "./use-user-details";
import { ScaleType } from "@/types/scale.types";

export type UserCrystals = Partial<Record<ScaleType, number>>;

export const useGetUserCrystals = () => {
  const { user } = useUserDetails();
  const [crystals, setCrystals] = useState<UserCrystals>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCrystals = async () => {
      setLoading(true);
      try {
        const crystalRef = collection(firestore, "users", user.id, "crystals");
        const crystalSnap = await getDocs(query(crystalRef));

        const data: UserCrystals = {};
        crystalSnap.forEach((doc) => {
          const crystal = doc.data();
          if (crystal?.amount > 0) {
            data[doc.id as ScaleType] = crystal.amount;
          }
        });

        setCrystals(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCrystals();
  }, [user?.id]);

  return { crystals, loading, error };
};
