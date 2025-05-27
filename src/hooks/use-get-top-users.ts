import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/firebase";
import { TopUser } from "@/types/friends.types";

export function useGetTopUsers(limitCount = 6) {
  const [users, setUsers] = useState<TopUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(firestore, "users"));
      const top = snap.docs
        .map((doc) => {
          const data = doc.data();
          const imageCount = (data.imageIds || []).length;
          return {
            id: doc.id,
            username: data.username || "Unnamed",
            avatar: data.avatar || null,
            avatarScale: data.avatarScale || null,
            imageCount,
          };
        })
        .sort((a, b) => b.imageCount - a.imageCount)
        .slice(0, limitCount);

      setUsers(top);
      setLoading(false);
    };

    load();
  }, [limitCount]);

  return { users, loading };
}
