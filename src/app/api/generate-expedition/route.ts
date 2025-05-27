import { NextResponse } from "next/server";

const FIXED_STYLE =
  "Digital painting, cinematic composition, 2d render look, dramatic lighting, high detail, stylized fantasy art, sharp focus";

export async function POST(req: Request) {
  const { scale } = await req.json();

  if (!scale) {
    return NextResponse.json(
      { error: "Missing 'scale' in request" },
      { status: 400 }
    );
  }

  const systemPrompt = `
You are a fantasy expedition generator for a magical penguin world. Don't use only cold/arctic. Theme could be any!

Generate a single expedition and return valid JSON with this structure:

{
  "settings": {
    "title": { "en": "...", "ru": "..." },
    "theme": { "en": "...", "ru": "..." },
    "goal": { "en": "...", "ru": "..." },
    "description": { "en": "...", "ru": "..." }
  },
  "prompt": string // must end with: "${FIXED_STYLE}"
}

Rules:
- Expedition level is "${scale}". Adjust tone accordingly (rare = soft or whimsical, epic = dramatic, divine = celestial, etc.)
- Do NOT include extra explanations.
- Prompt is for image generation and should describe the place or event visually.
- Return only valid JSON, nothing else.
`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 1.3,
        top_p: 0.9,
        messages: [{ role: "system", content: systemPrompt }],
      }),
    });

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content;

    if (!raw) {
      return NextResponse.json(
        { error: "No response content" },
        { status: 500 }
      );
    }

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to extract JSON", raw },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Error generating expedition:", err);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}
