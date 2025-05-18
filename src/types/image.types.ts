import { Timestamp } from "firebase-admin/firestore";

export interface ImageItem {
  id: string;
  imageUrl: string;
  creatorUid: string;
  origin: "craft" | "evolution";
  title: string;
  createdAt: Timestamp;
  settings: ImageItemSettings;
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
  rarity: string;
  theme: string;
}
