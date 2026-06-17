// Rewrite stored Supabase image URLs -> jsDelivr in Firestore.
// Same path suffix, only the base host changes. Idempotent.
// Dry run:  node --env-file=.env.local scripts/migrate-image-urls.mjs
// Apply:    node --env-file=.env.local scripts/migrate-image-urls.mjs --apply
import admin from "firebase-admin";

const OLD_BASE =
  process.env.OLD_IMAGE_BASE ??
  "https://jbvhrvmqvrgtlwxvabih.supabase.co/storage/v1/object/public/penguins";
const NEW_BASE =
  process.env.NEXT_PUBLIC_IMAGE_CDN_BASE ??
  "https://cdn.jsdelivr.net/gh/kirilinsky/penguin-archive@v1";

const APPLY = process.argv.includes("--apply");
const COLLECTIONS = ["images", "expeditions", "events"];

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

console.log(`OLD: ${OLD_BASE}`);
console.log(`NEW: ${NEW_BASE}`);

for (const col of COLLECTIONS) {
  const snap = await db.collection(col).get();
  let hit = 0;
  let ops = 0;
  let batch = db.batch();
  for (const doc of snap.docs) {
    const url = doc.get("imageUrl");
    if (typeof url === "string" && url.startsWith(OLD_BASE)) {
      const next = NEW_BASE + url.slice(OLD_BASE.length);
      hit++;
      if (APPLY) {
        batch.update(doc.ref, { imageUrl: next });
        if (++ops === 450) {
          await batch.commit();
          batch = db.batch();
          ops = 0;
        }
      } else if (hit <= 3) {
        console.log(`  ${url}\n   -> ${next}`);
      }
    }
  }
  if (APPLY && ops > 0) await batch.commit();
  console.log(`${col}: ${hit} ${APPLY ? "updated" : "would update"} / ${snap.size} docs`);
}

console.log(APPLY ? "APPLIED" : "DRY RUN (pass --apply to write)");
process.exit(0);
