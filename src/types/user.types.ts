import { Timestamp } from "firebase/firestore";
import { ExpeditionState } from "./expeditions.types";
import { LocalizedField } from "./image.types";
import { ScaleType } from "./scale.types";

export type FriendData = RequestRecord & User;

export type UserCrystal = {
  type: ScaleType;
  amount: number;
  lastUpdated: Date;
};

export type UserStatistics = {
  evolutions: number;
  expeditions: number;
  totalGiftsSent: number;
  totalGiftsReceived: number;
  totalCoinsEarned: number;
  totalCrystalsEarned: number;
  totalExpeditionParticipants: number;
  totalCrystalsSpent: number;
  totalCoinsUsed: number;
  crystalsUsed: {
    rare: number;
    epic: number;
    legendry: number;
    divine: number;
    ghost: number;
    mystic: number;
  };
  totalCrafted: number;
  totalSold: number;
  totalBought: number;
  lastCrystalAppliedAt: Date;
  lastEvolutionAt: Date;
  lastGiftSentAt: Date;
  lastExpeditionAt: Date;
  lastLoginAt: Date;
  lastAuctionPurchaseAt: Date;
  lastAuctionSellAt: Date;
  lastSkipToPayAt: Date;
  totalSkipToPay: number;
  /* TODO: add totalAmount stat */
  //totalAmount: Record<string, number>;
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
  coins: number;
  craftInProgress: boolean;
  email: string;
  friendRequests: RequestRecord[];
  sentRequests: RequestRecord[];
  statistics: UserStatistics;
  /* TODO: add xp system */
  //xp: number;
  imageIds: string[];
  lastGeneratedAt: Date;
  allowCraftAt: Date;
  expeditions: UserExpeditionItem[];
};

export type UserExpeditionItem = {
  expeditionId: string;
  expeditionScale: ScaleType;
  participantsScale: ScaleType;
  expeditionTitle: LocalizedField;
  expeditionState: ExpeditionState;
  penguins: UserExpeditionItemPenguin[];
  joinedAt: Date;
  claimedAt?: Date;
  finishedAt: Date;
  rewardGold: number;
  crystal?: string;
  durationHours: number;
};

export type UserExpeditionItemPenguin = {
  id: string;
  imageUrl: string;
};

export type RequestRecord = {
  id: string;
  sentAt: Timestamp;
};
