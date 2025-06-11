import { useEffect, useState, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useUserDetails } from "@/hooks/use-user-details";
import { UserExpeditionItemPenguin } from "@/types/user.types";
import { Expedition } from "@/types/expeditions.types";

export const useExpeditionPenguins = (expeditionId?: string) => {
  const { user } = useUserDetails();
  const [penguins, setPenguins] = useState<UserExpeditionItemPenguin[]>([]);
  const [otherPenguins, setOtherPenguins] = useState<
    UserExpeditionItemPenguin[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [trigger, setTrigger] = useState(0);

  const [hasJoined, setHasJoined] = useState<boolean>(false);
  const [claimedReward, setClaimedReward] = useState<boolean>(false);

  const refetch = useCallback(() => {
    setTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!user?.id || !expeditionId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const userExpRef = doc(
          firestore,
          `users/${user.id}/expeditions/${expeditionId}`
        );
        const userExpSnap = await getDoc(userExpRef);

        if (userExpSnap.exists()) {
          const data = userExpSnap.data();
          setPenguins(data.penguins || []);
          setHasJoined(true);
          setClaimedReward(Boolean(data.claimedReward));
        } else {
          setPenguins([]);
          setHasJoined(false);
          setClaimedReward(false);
        }

        const expRef = doc(firestore, "expeditions", expeditionId);
        const expSnap = await getDoc(expRef);

        if (expSnap.exists()) {
          const expeditionData = expSnap.data() as Expedition;

          const others = expeditionData.participants.filter(
            (p) => p.userId !== user.id
          );

          const otherPenguinIds = others.flatMap((p) => p.penguinIds);

          const imageDocs = await Promise.all(
            otherPenguinIds.map(async (id) => {
              const snap = await getDoc(doc(firestore, "images", id));
              return snap.exists()
                ? { id: snap.id, ...(snap.data() || {}) }
                : null;
            })
          );

          const validPenguins = imageDocs.filter(
            Boolean
          ) as UserExpeditionItemPenguin[];
          setOtherPenguins(validPenguins);
        } else {
          setOtherPenguins([]);
        }
      } catch (err) {
        console.error("Failed to fetch expedition data", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id, expeditionId, trigger]);

  return {
    penguins,
    otherPenguins,
    loading,
    error,
    hasJoined,
    claimedReward,
    refetch,
  };
};
