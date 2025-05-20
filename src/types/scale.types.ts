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
  common: { color: "gray", sell: 1, buy: 4 },
  rare: { color: "blue", sell: 2, buy: 8 },
  epic: { color: "purple", sell: 4, buy: 16 },
  legendary: { color: "red", sell: 8, buy: 32 },
  divine: { color: "gold", sell: 16, buy: 64 },
  ghost: { color: "white", sell: null, buy: null },
  mystic: { color: "green", sell: null, buy: null },
};
