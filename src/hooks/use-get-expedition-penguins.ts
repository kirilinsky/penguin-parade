import { useEffect, useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useUserDetails } from "@/hooks/use-user-details";
import { UserExpeditionItemPenguin } from "@/types/user.types";

export const useExpeditionPenguins = (expeditionId?: string) => {
  const { user } = useUserDetails();
  const [penguins, setPenguins] = useState<UserExpeditionItemPenguin[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [trigger, setTrigger] = useState(0);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!user?.id || !expeditionId) return;

    const fetchPenguins = async () => {
      setLoading(true);
      try {
        const ref = doc(
          firestore,
          `users/${user.id}/expeditions/${expeditionId}`
        );
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const data = snap.data();
          setPenguins(data.penguins || []);
        } else {
          setPenguins([]);
        }
      } catch (err) {
        console.error("Failed to fetch expedition penguins", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPenguins();
  }, [user?.id, expeditionId, trigger]);

  return { penguins, loading, error, refetch };
};
