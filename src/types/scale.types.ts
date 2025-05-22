export type ScaleType =
  | "common"
  | "rare"
  | "epic"
  | "legendary"
  | "divine"
  | "ghost"
  | "mystic";

export const scaleOrder: ScaleType[] = [
  "common",
  "rare",
  "epic",
  "legendary",
  "divine",
  "ghost",
  "mystic",
];

export const scaleConfig: Record<
  ScaleType,
  {
    color: string;
    sell: number | null;
    buy: number | null;
  }
> = {
  common: {
    color: "#606060",
    sell: 1,
    buy: 4,
  },
  rare: {
    color: "#00b7df",
    sell: 2,
    buy: 10,
  },
  epic: {
    color: "#a020f0",
    sell: 4,
    buy: 20,
  },
  legendary: {
    color: "#ff3131",
    sell: 8,
    buy: 35,
  },
  divine: {
    color: "#fdd835",
    sell: 16,
    buy: 82,
  },
  ghost: {
    color: "#f0f0f0",
    sell: null,
    buy: null,
  },
  mystic: {
    color: "#39ff14",
    sell: null,
    buy: null,
  },
};
