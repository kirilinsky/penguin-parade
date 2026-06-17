// Snapshot frozen Firestore data into a static JSON for the public /about showcase.
// Trims to display-only fields; drops users/participants (privacy + size).
// Also rewrites any leftover Supabase image base -> jsDelivr, so order vs
// migrate-image-urls.mjs does not matter.
// Run: node --env-file=.env.local scripts/snapshot-showcase.mjs
import admin from "firebase-admin";
import { writeFile, mkdir } from "node:fs/promises";

const OLD_BASE =
  process.env.OLD_IMAGE_BASE ??
  "https://jbvhrvmqvrgtlwxvabih.supabase.co/storage/v1/object/public/penguins";
const NEW_BASE =
  process.env.NEXT_PUBLIC_IMAGE_CDN_BASE ??
  "https://cdn.jsdelivr.net/gh/kirilinsky/penguin-archive@v1";

const OUT = "src/data/showcase.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}
const db = admin.firestore();

const fixUrl = (u) =>
  typeof u === "string" && u.startsWith(OLD_BASE)
    ? NEW_BASE + u.slice(OLD_BASE.length)
    : u;

const ts = (t) =>
  t && typeof t.seconds === "number"
    ? { seconds: t.seconds, nanoseconds: t.nanoseconds ?? 0 }
    : null;

async function getAll(col) {
  const snap = await db.collection(col).get();
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

const [images, expeditions, events] = await Promise.all([
  getAll("images"),
  getAll("expeditions"),
  getAll("events"),
]);

const slimImages = images.map((i) => ({
  id: i.id,
  imageUrl: fixUrl(i.imageUrl),
  title: i.title ?? null,
  origin: i.origin ?? null,
  event: i.event ?? null,
  gift: !!i.gift,
  nft: !!i.nft,
  auction: !!i.auction,
  price: i.price ?? 0,
  inExpedition: !!i.inExpedition,
  expedition: i.expedition ?? null,
  ownerId: i.ownerId ?? null,
  creatorUid: i.creatorUid ?? null,
  createdAt: ts(i.createdAt),
  placedForAuctionAt: ts(i.placedForAuctionAt),
  settings: i.settings ?? null,
}));

const slimExpeditions = expeditions.map((e) => ({
  id: e.id,
  settings: e.settings ?? null,
  level: e.level ?? null,
  imageUrl: fixUrl(e.imageUrl),
  state: e.state ?? "ended",
  participantsCount: e.participantsCount ?? 0,
  minParticipants: e.minParticipants ?? 0,
  maxParticipants: e.maxParticipants ?? 0,
  durationHours: e.durationHours ?? 0,
  totalPenguinsCount: e.totalPenguinsCount ?? 0,
  totalGoldEarned: e.totalGoldEarned ?? 0,
  totalCrystals: e.totalCrystals ?? 0,
  createdAt: ts(e.createdAt),
}));

const slimEvents = events.map((e) => ({
  id: e.id,
  title: e.title ?? null,
  theme: e.theme ?? null,
  value: e.value ?? null,
  imageUrl: fixUrl(e.imageUrl),
}));

const payload = {
  generatedAt: new Date().toISOString(),
  stats: {
    totalPenguins: slimImages.length,
    totalExpeditions: slimExpeditions.length,
    totalEvents: slimEvents.length,
    rarityCount: slimImages.reduce((acc, i) => {
      const r = i.settings?.rarity;
      if (r) acc[r] = (acc[r] || 0) + 1;
      return acc;
    }, {}),
    originCount: slimImages.reduce((acc, i) => {
      if (i.origin) acc[i.origin] = (acc[i.origin] || 0) + 1;
      return acc;
    }, {}),
    onMarket: slimImages.filter((i) => i.ownerId === "auction").length,
  },
  images: slimImages,
  expeditions: slimExpeditions,
  events: slimEvents,
};

await mkdir("src/data", { recursive: true });
await writeFile(OUT, JSON.stringify(payload, null, 2));
console.log(
  `Wrote ${OUT}: ${slimImages.length} penguins, ${slimExpeditions.length} expeditions, ${slimEvents.length} events`
);
process.exit(0);
