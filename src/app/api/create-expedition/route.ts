import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";

import { firestore } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { expeditionPresets } from "@/types/expeditions.types";
import { supabase } from "@/supabase";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const BUCKET = "penguins";
const COLLECTION = "expeditions";
const model = "black-forest-labs/flux-1.1-pro";
const DURATION_RANGES = {
  rare: [24, 48],
  epic: [48, 72],
  legendary: [72, 120],
  divine: [96, 168],
} as const satisfies Record<
  "rare" | "epic" | "legendary" | "divine",
  [number, number]
>;

export async function POST(req: Request) {
  const { level, key } = await req.json();

  if (!key || key !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: "Invalid or unsupported key" },
      { status: 400 }
    );
  }

  if (!(level in DURATION_RANGES)) {
    return NextResponse.json(
      { error: "Invalid or unsupported level" },
      { status: 400 }
    );
  }

  const generateRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-expedition`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scale: level }),
    }
  );

  const { settings, prompt } = await generateRes.json();

  const output: any = await replicate.run(model, {
    input: {
      prompt,
      prompt_upsampling: true,
      aspect_ratio: "2:3",
      output_format: "webp",
      output_quality: 80,
      safety_tolerance: 2,
    },
  });

  const imageRes = await fetch(output);
  const buffer = await imageRes.arrayBuffer();
  const filename = `expeditions/${uuidv4()}.webp`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(filename, Buffer.from(buffer), {
      contentType: "image/webp",
      upsert: true,
    });

  if (error) {
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filename);

  const [minDuration, maxDuration] =
    DURATION_RANGES[level as keyof typeof DURATION_RANGES];
  const durationHours =
    Math.floor(Math.random() * (maxDuration - minDuration + 1)) + minDuration;
  const minParticipants = Math.floor(Math.random() * 3) + 3;
  const maxParticipants = Math.floor(Math.random() * 4) + 12; // до 16

  const now = new Date();

  const preparationStartedAt = now;
  const preparationEndedAt = new Date(
    preparationStartedAt.getTime() + 24 * 60 * 60 * 1000
  );

  const activePhaseStartedAt = new Date(
    preparationEndedAt.getTime() + 60 * 1000
  );
  const activePhaseEndedAt = new Date(
    activePhaseStartedAt.getTime() + durationHours * 60 * 60 * 1000
  );

  const newDoc = await addDoc(collection(firestore, COLLECTION), {
    settings,
    level,
    minParticipants,
    maxParticipants,
    participantsCount: 0,
    durationHours,
    state: "preparing",
    imageUrl: publicUrl,
    createdAt: now,
    preparationStartedAt,
    preparationEndedAt,
    activePhaseStartedAt,
    activePhaseEndedAt,
    preset: expeditionPresets[level as keyof typeof expeditionPresets],
    participants: [],
  });

  return NextResponse.json({ success: true, id: newDoc.id });
}
