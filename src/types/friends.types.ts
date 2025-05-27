import { Timestamp } from "firebase/firestore";
import { ScaleType } from "./scale.types";

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

export type UserStatistics = {
  evolutions: number;
  totalGiftsSent: number;
  totalGiftsReceived: number;
  /* TODO: add totalAmount stat */
  totalAmount: Record<string, number>;
  totalCoinsEarned: number;
  totalCoinsSpent: number;
  totalCrafted: number;
  totalSold: number;
  totalBought: number;
  lastEvolutionAt: Date;
  lastGiftSentAt: Date;
  lastLoginAt: Date;
  lastAuctionPurchaseAt: Date;
  lastAuctionSellAt: Date;
  lastSkipToPayAt: Date;
  totalSkipToPay: number;
};
/* TODO: add settings */
export type UserSettings = {
  showGalleryPublic: boolean;
  /* TODO: add public stat */
  showStatsPublic: boolean;
};

export type User = {
  id: string;
  username: string;
  username_lowercase: string;
  avatar: string | null;
  avatarScale: ScaleType | null;
  createdAt: Date;
  /* TODO: add stat */
  /* TODO: add coins */
  coins: number;
  email: string;
  /* TODO: add xp system */
  xp: number;
  imageIds: string[];
  lastGeneratedAt: Date;
  allowCraftAt: Date;
};

export type RequestRecord = {
  id: string;
  sentAt: Timestamp;
};

export type FriendData = RequestRecord & User;

export type FriendWithUser = Friend & User;
