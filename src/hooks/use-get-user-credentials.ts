import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";

type UserCredentials = {
  username: string;
  avatar: string;
  avatarScale: string;
};

export const useGetUserCredentials = (userId?: string) => {
  const [data, setData] = useState<UserCredentials | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      setLoading(true);
      try {
        const ref = doc(firestore, "users", userId);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const user = snap.data();
          setData({
            username: user.username || "",
            avatar: user.avatar || "",
            avatarScale: user.avatarScale || "",
          });
        } else {
          setData(null);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [userId]);

  return { data, loading, error };
};
