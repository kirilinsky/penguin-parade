import { Timestamp } from "firebase-admin/firestore";
import { ScaleType } from "./scale.types";

export interface ImageItem {
  id: string;
  imageUrl: string;
  creatorUid: string;
  ownerId: string;
  origin: "craft" | "evolution" | "bad batch" | "expedition";
  title: string;
  gift: boolean;
  auction: boolean;
  price: number;
  soldAt: Timestamp;
  createdAt: Timestamp;
  placedForAuctionAt: Timestamp;
  settings: ImageItemSettings;
  auctionHistory: ImageItemAuctionHistory[];
  giftedHistory: ImageItemGiftedHistory[];
}

export interface ImageItemAuctionHistory {
  date: number;
  buyerId: string;
  price: number;
}
export interface ImageItemGiftedHistory {
  date: number;
  from: string;
  to: string;
}

export interface LocalizedField {
  en: string;
  ru: string;
}

export interface ImageItemSettings {
  acc: LocalizedField;
  back: LocalizedField;
  beak: LocalizedField;
  bg: LocalizedField;
  breast: LocalizedField;
  des: LocalizedField;
  ability: LocalizedField;
  fx: LocalizedField;
  rarity: ScaleType;
  theme: LocalizedField;
  t: LocalizedField;
}

export type ImagesSortType =
  | "newest"
  | "oldest"
  | "rarity"
  | "expensive"
  | "cheap";
