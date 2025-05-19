import { ScaleType } from "@/types/scale.types";

type Price = {
  sell: number | null;
  buy: number | null;
};

export function getPriceByScale(scale: ScaleType): Price {
  const baseSell = 1;
  const baseBuy = 4;

  const scaleLevels: ScaleType[] = [
    "common",
    "rare",
    "epic",
    "legendary",
    "divine",
    "ghost",
    "mystic",
  ];

  const level = scaleLevels.indexOf(scale);

  if (scale === "ghost" || scale === "mystic") {
    return { sell: null, buy: null };
  }

  const sell = baseSell * Math.pow(2, level);
  const buy = baseBuy * Math.pow(2, level);

  return { sell, buy };
}
