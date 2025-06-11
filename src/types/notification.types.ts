import { Timestamp } from "firebase/firestore";

export type NotificationType =
  | "expedition_complete"
  | "new_expedition"
  | "gift_received"
  | "friend_request";

export type NotificationPayload =
  | { type: "expedition"; expeditionId: string }
  | { type: "gift"; giftId: string }
  | { type: "friend_request"; fromUserId: string }
  | null;

export type UserNotification = {
  id: string;
  type: NotificationType;
  createdAt: Timestamp;
  read: boolean;
  payload: NotificationPayload;
  message?: {
    ru: string;
    en: string;
  };
};
