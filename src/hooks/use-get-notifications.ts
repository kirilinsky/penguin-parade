import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase";
import { useUserDetails } from "@/hooks/use-user-details";
import { UserNotification } from "@/types/notification.types";

export const useGetNotifications = () => {
  const { user } = useUserDetails();
  const [notifications, setNotifications] = useState<UserNotification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasUnread, setHasUnread] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const ref = collection(firestore, "users", user.id, "notifications");
        const q = query(ref, orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        const notifs = snapshot.docs.map((doc) => ({
          ...(doc.data() as UserNotification),
          id: doc.id,
        }));
        setNotifications(notifs);
        setHasUnread(notifs.some((notif) => !notif.read));
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?.id]);

  return { notifications, loading, error, hasUnread };
};
