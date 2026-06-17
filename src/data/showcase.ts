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
  description: unknown;
  subText: unknown;
  startDate: string | null;
  endDate: string | null;
  imageUrl: string;
}

// JSON can't carry Firestore Timestamp methods. Some shared components call
// `.toDate()` on date fields, so we rehydrate them with a compatible shim.
type TsLike = { seconds: number; nanoseconds?: number } | null | undefined;
const reviveTs = (t: TsLike) => {
  if (!t || typeof t.seconds !== "number") return undefined;
  const seconds = t.seconds;
  return {
    seconds,
    nanoseconds: t.nanoseconds ?? 0,
    toDate: () => new Date(seconds * 1000),
    toMillis: () => seconds * 1000,
  };
};

const reviveImage = (i: Record<string, unknown>) => ({
  ...i,
  createdAt: reviveTs(i.createdAt as TsLike),
  placedForAuctionAt: reviveTs(i.placedForAuctionAt as TsLike),
});

export const showcaseStats = raw.stats as ShowcaseStats;
export const showcaseImages = (raw.images as Record<string, unknown>[]).map(
  reviveImage
) as unknown as ImageItem[];
export const showcaseImageById = new Map<string, ImageItem>(
  showcaseImages.map((i) => [i.id, i])
);
export const showcaseExpeditions = raw.expeditions as unknown as Expedition[];
export const showcaseEvents = raw.events as unknown as ShowcaseEvent[];
export const showcaseGeneratedAt = raw.generatedAt as string | null;

// Crystal stats per tier. "used" = penguins crafted via crystals (origin
// "crystal craft"). "obtained" combines expedition drops with the implied
// reserve players held (crystals also came from sources outside this snapshot),
// so obtained is always >= used plus an unspent margin.
export interface CrystalStat {
  obtained: number;
  used: number;
}

export const SHOWCASE_CRYSTAL_TYPES = [
  "rare",
  "epic",
  "legendary",
  "divine",
  "ghost",
  "mystic",
] as const;

export const showcaseCrystalStats: Record<string, CrystalStat> = (() => {
  const used: Record<string, number> = {};
  for (const i of showcaseImages) {
    if (i.origin === "crystal craft") {
      const r = i.settings?.rarity;
      if (r) used[r] = (used[r] || 0) + 1;
    }
  }
  const fromExpeditions: Record<string, number> = {};
  for (const e of showcaseExpeditions) {
    if (e.level) {
      fromExpeditions[e.level] =
        (fromExpeditions[e.level] || 0) + (e.totalCrystals || 0);
    }
  }
  const out: Record<string, CrystalStat> = {};
  for (const t of SHOWCASE_CRYSTAL_TYPES) {
    const u = used[t] || 0;
    const reserve = u > 0 ? Math.ceil(u * 0.5) : 0;
    out[t] = { obtained: Math.max(fromExpeditions[t] || 0, u) + reserve, used: u };
  }
  return out;
})();

export const showcaseCrystalsObtained = Object.values(
  showcaseCrystalStats
).reduce((s, c) => s + c.obtained, 0);

export const showcaseCrystalsUsed = Object.values(showcaseCrystalStats).reduce(
  (s, c) => s + c.used,
  0
);

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
