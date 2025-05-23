export type ScaleType =
  | "common"
  | "rare"
  | "epic"
  | "legendary"
  | "divine"
  | "ghost"
  | "mystic"
  | "emperor";

export const scaleOrder: ScaleType[] = [
  "common",
  "rare",
  "epic",
  "legendary",
  "divine",
  "ghost",
  "mystic",
  "emperor",
];

export const scaleConfig = {
  common: {
    color: "#6e6e6e",
    sell: 1,
    buy: 4,
  },
  rare: {
    color: "#00c4ff",
    sell: 2,
    buy: 10,
  },
  epic: {
    color: "#b030f0",
    sell: 4,
    buy: 20,
  },
  legendary: {
    color: "#ff2a2a",
    sell: 8,
    buy: 35,
  },
  divine: {
    color: "#ffe14d",
    sell: 16,
    buy: 82,
  },
  ghost: {
    color: "#fafafa",
    sell: 32,
    buy: 100,
  },
  mystic: {
    color: "#00ff7f",
    sell: null,
    buy: null,
  },
  emperor: {
    color: "rgba(218, 165, 32, 1)",
    sell: null,
    buy: null,
  },
} as const;
