"use client";

import NotifictionItem from "@/components/notification-item/notifiction-item.component";
import { firestore } from "@/firebase";
import { useGetNotifications } from "@/hooks/use-get-notifications";
import { useUserDetails } from "@/hooks/use-user-details";
import { doc, updateDoc } from "firebase/firestore";

export default function NotificationsPage() {
  const { notifications, loading, error } = useGetNotifications();
  const { user, checkHasUnreadNotifications } = useUserDetails();

  if (loading) return "loading...";
  if (error) return <div>Error loading notifications</div>;

  const handleClick = async (notificationId: string) => {
    if (!user || !notificationId) return;
    try {
      const ref = doc(
        firestore,
        "users",
        user.id,
        "notifications",
        notificationId
      );
      await updateDoc(ref, { read: true });
      checkHasUnreadNotifications();
    } catch (err) {
      console.error("Failed to update notification:", err);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      <div className="space-y-2">
        {notifications.map((notif) => (
          <NotifictionItem
            onRead={handleClick}
            key={notif.id}
            notification={notif}
          />
        ))}
      </div>
    </div>
  );
}
