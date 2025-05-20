import { scaleOrder, ScaleType } from "@/types/scale.types";

export function getNextScale(scale: ScaleType): ScaleType | null {
  const index = scaleOrder.indexOf(scale);
  return index >= 0 && index < scaleOrder.length - 1
    ? scaleOrder[index + 1]
    : null;
}
