import { scaleConfig, ScaleType } from "@/types/scale.types";

export function getPriceByScale(scale: ScaleType) {
  return scaleConfig[scale] ?? { sell: null, buy: null };
}
