import { ScaleType } from "./scale.types";
import { RequestRecord, User } from "./user.types";

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

export type FriendData = RequestRecord & User;

export type FriendWithUser = Friend & User;
