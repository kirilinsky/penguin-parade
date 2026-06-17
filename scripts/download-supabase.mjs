// Download every object from the Supabase "penguins" bucket to ./penguin-archive,
// preserving paths (images/, expeditions/, events/). Reuses existing env.
// Run: node --env-file=.env.local scripts/download-supabase.mjs
import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = "penguins";
const OUT = "./penguin-archive";

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const sb = createClient(url, key);

async function listAll(prefix = "") {
  const out = [];
  const limit = 100;
  let offset = 0;
  for (;;) {
    const { data, error } = await sb.storage
      .from(BUCKET)
      .list(prefix, { limit, offset, sortBy: { column: "name", order: "asc" } });
    if (error) throw error;
    if (!data.length) break;
    for (const entry of data) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.id === null) {
        // folder -> recurse
        out.push(...(await listAll(path)));
      } else {
        out.push(path);
      }
    }
    if (data.length < limit) break;
    offset += limit;
  }
  return out;
}

const paths = await listAll();
console.log(`Found ${paths.length} files`);

let done = 0;
for (const p of paths) {
  const { data, error } = await sb.storage.from(BUCKET).download(p);
  if (error) {
    console.error("FAIL", p, error.message);
    continue;
  }
  const buf = Buffer.from(await data.arrayBuffer());
  const dest = join(OUT, p);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, buf);
  done++;
  if (done % 25 === 0) console.log(`${done}/${paths.length}`);
}
console.log(`Done: ${done}/${paths.length} -> ${OUT}`);
