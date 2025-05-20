import { scaleConfig, ScaleType } from "@/types/scale.types";

export function getBaseColorByScale(scale: string | null): string {
  const s = scale?.toLowerCase() as ScaleType;
  return scaleConfig[s]?.color || "black";
}
