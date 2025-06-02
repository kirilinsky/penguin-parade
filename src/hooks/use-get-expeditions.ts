import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { Expedition } from "@/types/expeditions.types";

export const useGetExpeditions = (expeditionId?: string) => {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [expedition, setExpedition] = useState<Expedition | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasActive, setHasActive] = useState(false);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
        setLoading(true);

        if (expeditionId) {
          const ref = doc(firestore, "expeditions", expeditionId);
          const snapshot = await getDoc(ref);

          if (!snapshot.exists()) {
            throw new Error("Expedition not found");
          }

          const data = {
            id: snapshot.id,
            ...snapshot.data(),
          } as Expedition;

          setExpedition(data);
          setHasActive(data.state === "preparing" || data.state === "active");
        } else {
          const ref = collection(firestore, "expeditions");
          const q = query(ref, orderBy("createdAt", "desc"));
          const snapshot = await getDocs(q);

          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Expedition[];

          setExpeditions(data);

          const activeExists = data.some(
            (exp) => exp.state === "preparing" || exp.state === "active"
          );
          setHasActive(activeExists);
        }
      } catch (err: any) {
        console.error("Failed to fetch expeditions", err);
        setError(err.message || "Failed to load expeditions");
      } finally {
        setLoading(false);
      }
    };

    fetchExpeditions();
  }, [expeditionId]);

  return { expeditions,expedition, hasActive, loading, error };
};
