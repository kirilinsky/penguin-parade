import { themes } from "@/data/themes";
import { NextResponse } from "next/server";

export async function POST() {
  const randomNumber = Math.floor(Math.random() * 1200);
  const randomSettings = Math.floor(Math.random() * themes.length);
  const randomlyUpdatedTheme = themes[randomSettings];

  const rarity =
    randomNumber < 2
      ? "mystic"
      : randomNumber < 5
      ? "ghost"
      : randomNumber < 9
      ? "divine"
      : randomNumber < 49
      ? "legendary"
      : randomNumber < 111
      ? "epic"
      : randomNumber < 300
      ? "rare"
      : "common";

  const presetsObject = {
    common:
      "Keep it grounded or lightly stylized. Backgrounds may include cozy cottages, campfires, village squares, wooden bridges, or garden paths. Themes should feel soft, playful, or nostalgic. Effects minimal — perhaps some falling leaves or laundry in the breeze. Accessories simple or absent. No grandiose titles (avoid 'king', 'emperor', etc). Abilities should be subtle and clever.",
    rare: "Introduce distinct fantasy elements: glowing mushrooms, crystal flowers, enchanted glades, or surreal sunsets. Backgrounds may include floating islands, rainbow-lit waterfalls, or celestial gardens. Accessories may glow or shimmer. Abilities become unique but not overpowered.",
    epic: "Strong visual contrasts and striking scenes. Environments may feature elemental chaos — volcano temples, storm altars, overgrown mechs, or desert ruins powered by arcane energy. Include magical effects like lightning trails or glowing glyphs. Give the penguin an aura. Titles should feel iconic and epic.",
    legendary:
      "Grand and symbolic. Backgrounds may include shattered moons, celestial maps, giant statues, or forgotten kingdoms ablaze with runes. Effects like fire halos, stardust rain, or radiant wings. Themes evoke ancient greatness. Title may sound mythic or eternal. Ability is powerful and thematically rich.",
    divine:
      "High fantasy meets celestial architecture. Temples above the clouds, golden marble roads, divine obelisks, or glowing altars surrounded by doves or spirits. Use light rays, halos, and sacred gems. The environment may reflect godlike serenity. Accessories may include olive wreaths or star-forged armor.",
    ghost:
      "Eerie and decayed. Include haunted mansions, shadowy forests, broken mirrors, or carnival ruins wrapped in fog. Details like flickering lanterns, floating chains, whispering gravestones, or black flame torches. Glows come from within or unseen sources. Ability must feel cursed or spectral. Title should sound mysterious, not heroic.",
    mystic:
      "Surreal, ancient, and dreamlike. Backgrounds may include floating pyramids, inverted temples, moving sky-forests, or libraries with sentient books. Colors can shift or glow strangely. Environments should feel secretive and impossible — arcane symbols in the sky, living shadows, or fractured light. Title is cryptic. Ability must feel ancient and whispered.",
  };

  const systemPrompt = `
You are a penguin variation generator. Respond with a JSON object only. No intro or explanation.
There are few scales of rarity: common, rare, epic, legendary, divine (greek gods), ghost (casper-like), and mystic (scary and creepy).
Return an object with:
{
  "bg": background behind penguin,
  "theme": random theme,
  "beak": color of penguin's beak,
  "breast": color of penguin's breast,
  "back": color of penguin's back,
  "fx": picture effects,
  "acc": (max 1-3 words, clothing/hat/accessory),
  "t": (max 3 words, title of the penguin),
  "des": story about penguin in 20-25 words,
  "ability": max 1-3 words, ability of the penguin
}
Use Capital first letter for values. Be bold and original. Mix elements. Return only JSON.`;

  const userPrompt = `
Generate a completely new penguin variation. Avoid repeating previous themes like moss, leaf, whisperer, explorer. Surprise me.
Rarity: ${rarity}
Theme reference: ${randomlyUpdatedTheme}
Guidance:
${presetsObject[rarity]}
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
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 1.2,
        top_p: 0.9,
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
