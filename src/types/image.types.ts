import { Timestamp } from "firebase-admin/firestore";
import { ScaleType } from "./scale.types";

export interface ImageItem {
  id: string;
  imageUrl: string;
  creatorUid: string;
  ownerId: string;
  origin: "craft" | "evolution";
  title: string;
  gift: boolean;
  createdAt: Timestamp;
  settings: ImageItemSettings;
  giftedHistory: ImageItemGiftedHistory[];
}

export interface ImageItemGiftedHistory {
  date: number;
  from: string;
  to: string;
}

export interface ImageItemSettings {
  acc: string;
  back: string;
  beak: string;
  bg: string;
  breast: string;
  des: string;
  ability: string;
  eyes: string;
  fx: string;
  rarity: ScaleType;
  theme: string;
}
