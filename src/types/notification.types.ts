export type NotificationType =
  | "expedition_complete"
  | "gift_received"
  | "friend_request";

export type UserNotification = {
  id: string;
  type: NotificationType;
  createdAt: Date;
  read: boolean;
  payload?: Record<string, any>;
  message?: {
    ru: string;
    en: string;
  };
};
