// Static showcase data for the public /about archive page.
// Source: scripts/snapshot-showcase.mjs (frozen Firestore snapshot).
import raw from "./showcase.json";
import type { ImageItem } from "@/types/image.types";
import type { Expedition } from "@/types/expeditions.types";

export interface ShowcaseStats {
  totalPenguins: number;
  totalExpeditions: number;
  totalEvents: number;
  rarityCount: Record<string, number>;
  originCount: Record<string, number>;
  onMarket: number;
}

export interface ShowcaseEvent {
  id: string;
  title: unknown;
  theme: unknown;
  value: string | null;
  imageUrl: string;
}

export const showcaseStats = raw.stats as ShowcaseStats;
export const showcaseImages = raw.images as unknown as ImageItem[];
export const showcaseExpeditions = raw.expeditions as unknown as Expedition[];
export const showcaseEvents = raw.events as unknown as ShowcaseEvent[];
export const showcaseGeneratedAt = raw.generatedAt as string | null;

// Penguins currently listed on the market (sold to the auction pool).
export const showcaseAuction = showcaseImages.filter(
  (i) => i.ownerId === "auction"
);

// Distinct origins present in the data (for the gallery filter dropdown).
export const showcaseOrigins = Array.from(
  new Set(showcaseImages.map((i) => i.origin).filter(Boolean))
).sort() as string[];

// A handful of same-rarity penguins to pre-fill the evolution demo grid.
export const showcaseEvolutionSamples: ImageItem[] = (() => {
  const byRarity: Record<string, ImageItem[]> = {};
  for (const img of showcaseImages) {
    const r = img.settings?.rarity;
    if (!r) continue;
    (byRarity[r] ||= []).push(img);
  }
  const biggest = Object.values(byRarity).sort(
    (a, b) => b.length - a.length
  )[0];
  return (biggest ?? []).slice(0, 8);
})();
