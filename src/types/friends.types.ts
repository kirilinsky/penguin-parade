import { Timestamp } from "firebase/firestore";

export type Friend = {
  id: string;
  giftsReceived: number;
  giftsSent: number;
  addedAt: Date;
};

export type UserStatistics = {
  evolutions: number;
  totalGiftsSent: number;
  totalGiftsReceived: number;
  /* TODO: add totalAmount stat */
  totalAmount: Record<string, number>;
  totalCoinsEarned: number;
  lastEvolutionAt: Date;
  lastGiftSentAt: Date;
  lastLoginAt: Date;
  lastAuctionPurchaseAt: Date;
};

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
  avatarScale: string | null;
  createdAt: Date;
  /* TODO: add stat */
  /* TODO: add settings */
  /* TODO: add coins */
  coins: number;
  email: string;
  /* TODO: add xp system */
  xp: number;
  lastGeneratedAt: Date;
  allowCraftAt: Date;
};

export type RequestRecord = {
  id: string;
  sentAt: Timestamp;
};

export type FriendData = RequestRecord & User;
