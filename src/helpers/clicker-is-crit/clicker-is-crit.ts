import { CRIT_TABLE } from "@/types/clicker.types";

export function clickerIsCrit(scale?: keyof typeof CRIT_TABLE, extraChance = 0) {
  const cfg = (scale && CRIT_TABLE[scale]) ?? CRIT_TABLE.common;
  const chance = Math.min(0.5, cfg.chance + extraChance);
  const hit = Math.random() < chance;
  return { isCrit: hit, critX: hit ? cfg.critX : 1 };
}
