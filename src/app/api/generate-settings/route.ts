import { NextResponse } from "next/server";

/* let mock = {
  success: true,
  settings: {
    t: "Valley Kid",
    bg: "Valley",
    theme: "Rainbow",
    body: "Dark brown",
    fx: "Shiny",
    acc: "Fancy glass",
    rarity: "rare",
  },
}; */

export async function POST() {
  const randomNumber = Math.floor(Math.random() * 1000);

  const rarity =
    randomNumber < 2
      ? "mystic"
      : randomNumber < 5
      ? "ghost"
      : randomNumber < 10
      ? "divine"
      : randomNumber < 50
      ? "legendary"
      : randomNumber < 100
      ? "epic"
      : randomNumber < 300
      ? "rare"
      : "common";
  const systemPrompt = `
You are a penguin variation generator. Respond with a JSON object only. No intro or explanation.

Penguins can appear in any stylized, wildly imaginative environment — do not stick to forests, ice, or ocean unless scale suggests it.  
Think in terms of fantasy, folklore, sci-fi, mythology, urban fantasy, surrealism, retro worlds, game universes, alien civilizations, dream logic, cultural mashups, ancient empires, elemental worlds, magical realism.

Scales of penguin: common, rare, epic, legendary, divine, ghost, mystic.  
Current scale: ${rarity}

Return an object with:
{
  "bg": (the world or place behind the penguin — grounded or strange, depending on scale. For ghost: something eerie. For divine: ancient celestial temples or white-gold grandeur),
  "theme": (visual color mood or vibe — be playful or symbolic. For divine: marble, gold, diamond. For ghost: shadows, haunted glow. For mystic: arcane colors, forbidden light),
  "beak": (beak color — can be symbolic or surprising),
  "breast": (chest color — match or contrast theme),
  "back": (back color — expressive, not dull),
  "fx": (ambient effect around penguin — common: none or soft; rare+: glow, particles, aura, flickers, anomalies),
  "acc": (accessory like hat, mask, gear — minimal/simple for common; rare+: expressive and unusual; ghost: cursed; divine: godlike),
  "t": (title — max 3 words, poetic or iconic, themed),
  "des": (max 25 words — short tale about this penguin’s role, appearance, or legend based on theme, bg, acc),
  "ability": (short: 1–4 words, special trait linked to theme/title)
}

Be bold and original. Combine unexpected genres. Create mood. Return only JSON.`;

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "Generate one new variant." },
        ],
        temperature: 0.8,
      }),
    });

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content;

    if (!message) {
      return NextResponse.json(
        { error: "Empty response from ChatGPT" },
        { status: 500 }
      );
    }

    const jsonMatch = message.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to extract JSON" },
        { status: 500 }
      );
    }

    let parsed = JSON.parse(jsonMatch[0]);
    parsed = { ...parsed, rarity };
    return NextResponse.json({ success: true, settings: parsed });
  } catch (err: any) {
    console.error("Error [settings generator]:", err);
    return NextResponse.json(
      { error: "Failed to generate settings" + err },
      { status: 500 }
    );
  }
}
