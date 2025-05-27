import { ScaleType } from "./scale.types";
import { User } from "./user.types";

export type Friend = {
  id: string;
  giftsReceived: number;
  giftsSent: number;
  addedAt: Date;
};

export type TopUser = {
  id: string;
  username: string;
  avatar: string;
  imageCount: number;
  avatarScale: ScaleType | null;
};

export type FriendWithUser = Friend & User;
