import { NotificationPayload } from "@/types/notification.types";

export const getNotificationLink = (
  payload?: NotificationPayload
): string | null => {
  if (!payload) return null;

  switch (payload.type) {
    case "expedition":
      return `/expeditions/${payload.expeditionId}`;
    case "gift":
      return `/gift/${payload.giftId}`;
    case "friend_request":
      return `/friends`;
    default:
      return null;
  }
};
