import { ScaleType } from "./scale.types";

export type CurrentPenguin = {
  id: string;
  imgUrl: string;
  scale: ScaleType;
  clicks: number;
  level: number;
  nextLevelAt: number;
  multiplier: number;
};

export type ClickerGameData = {
  totalClicks: number;
  totalIncome: number;
  totalPenguins: number;
  collectionLevel: number;
  penguins: CurrentPenguin[];
};
