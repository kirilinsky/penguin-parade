import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { supabase } from "@/supabase";
import sharp from "sharp";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;
const BASE_URL = "https://api.openai.com/v1";
const BUCKET = "penguins";
const COLLECTION = "events";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { prompt, durationDays, value, bg_url } = body;

  if (!prompt || !durationDays || !value || !bg_url) {
    return NextResponse.json(
      { error: "Missing prompt, durationDays, value, or bg_url" },
      { status: 400 }
    );
  }

  const now = new Date();
  const end = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

  // ===== STEP 1: GPT request =====
  const systemPrompt = `
You are creating a collectible in-game event description.
Generate the following fields in English and Russian:

- title (short, thematic)
- description (1–2 sentences)
- theme (short but detailed description of theme, about colors, mood, possible effects)
- subText (optional)
- buttonText (call to action, e.g., "Join Now") accordingly to thematic of prompt

Theme: ${prompt}
Style: minimal fantasy-adventure, playful tone
Respond in this exact JSON format:

{
  "title": {
    "en": "",
    "ru": ""
  },
  "description": {
    "en": "",
    "ru": ""
  },
  "subText": {
    "en": "",
    "ru": ""
  },
  "buttonText": {
    "en": "",
    "ru": ""
  },
  "theme": ""
}
`;

  const chatRes = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      temperature: 1.3,
      top_p: 0.9,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
    }),
  });

  if (!chatRes.ok) {
    const errorText = await chatRes.text();
    return NextResponse.json(
      { error: "Chat request failed", details: errorText },
      { status: 500 }
    );
  }

  const chatData = await chatRes.json();
  let parsed: any;

  try {
    parsed = JSON.parse(chatData.choices[0].message.content || "");
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to parse GPT response",
        raw: chatData.choices[0].message.content,
      },
      { status: 500 }
    );
  }

  const imageRes = await fetch(bg_url);
  if (!imageRes.ok) {
    return NextResponse.json(
      { error: "Failed to download image from bg_url" },
      { status: 500 }
    );
  }

  const imageBuffer = Buffer.from(await imageRes.arrayBuffer());
  const webpBuffer = await sharp(imageBuffer).webp({ quality: 90 }).toBuffer();

  const filename = `events/${Date.now()}_${value}.webp`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, webpBuffer, {
      contentType: "image/webp",
      upsert: true,
    });

  if (uploadError || !uploadData?.path) {
    return NextResponse.json(
      { error: "Upload to Supabase failed", details: uploadError?.message },
      { status: 500 }
    );
  }

  const { data: publicUrlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(filename);
  const imageUrl = publicUrlData?.publicUrl;

  const eventData = {
    value,
    image_prompt: prompt,
    title: parsed.title,
    description: parsed.description,
    subText: parsed.subText,
    buttonText: parsed.buttonText,
    theme: parsed.theme,
    imageUrl,
    startDate: now.toISOString(),
    endDate: end.toISOString(),
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(firestore, COLLECTION), {
    ...eventData,
    createdAt: serverTimestamp(),
  });
  await updateDoc(docRef, { id: docRef.id });

  return NextResponse.json({ success: true, event: eventData });
}
