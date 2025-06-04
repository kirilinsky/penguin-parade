import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useUserDetails } from "./use-user-details";
import { ScaleType } from "@/types/scale.types";
import { UserCrystal } from "@/types/user.types";

export const useGetUserCrystals = () => {
  const { user } = useUserDetails();
  const [crystals, setCrystals] = useState<UserCrystal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchCrystals = async () => {
      setLoading(true);
      try {
        const crystalRef = collection(firestore, "users", user.id, "crystals");
        const crystalSnap = await getDocs(crystalRef);

        const result: UserCrystal[] = crystalSnap.docs
          .map((doc) => {
            const data = doc.data();
            return {
              type: doc.id as ScaleType,
              amount: data.amount ?? 0,
              lastUpdated: data.lastUpdated?.toDate?.() ?? new Date(0),
            } as UserCrystal;
          })
          .filter((c) => c.amount > 0);

        setCrystals(result);
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
