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

export const CRIT_TABLE: Record<ScaleType, { chance: number; critX: number }> =
  {
    common: { chance: 0.001, critX: 2 },
    rare: { chance: 0.02, critX: 2 },
    epic: { chance: 0.05, critX: 3 },
    legendary: { chance: 0.09, critX: 3 },
    divine: { chance: 0.11, critX: 4 },
    ghost: { chance: 0.15, critX: 5 },
    mystic: { chance: 0.17, critX: 6 },
    emperor: { chance: 0.22, critX: 10 },
  };
