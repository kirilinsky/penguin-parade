import { Timestamp } from "firebase-admin/firestore";
import { ScaleType } from "./scale.types";

export type ImageOriginType =
  | "craft"
  | "crystal craft"
  | "evolution"
  | "bad batch"
  | "expedition";

export interface ImageItem {
  id: string;
  imageUrl: string;
  creatorUid: string;
  ownerId: string;
  origin: ImageOriginType;
  title: string;
  inExpedition: boolean;
  expedition: string | null;
  expeditions: 0;
  nft: boolean;
  nftIndex: number | null;
  nftLink: string | null;
  gift: boolean;
  auction: boolean;
  price: number;
  mintedAt: Timestamp;
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
