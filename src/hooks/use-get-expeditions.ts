import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase";
import { Expedition } from "@/types/expeditions.types";

export const useGetExpeditions = () => {
  const [expeditions, setExpeditions] = useState<Expedition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasActive, setHasActive] = useState(false);

  useEffect(() => {
    const fetchExpeditions = async () => {
      try {
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
      } catch (err: any) {
        console.error("Failed to fetch expeditions", err);
        setError("Failed to load expeditions");
      } finally {
        setLoading(false);
      }
    };

    fetchExpeditions();
  }, []);

  return { expeditions, hasActive, loading, error };
};
