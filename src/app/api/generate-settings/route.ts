import { themes } from "@/data/themes";
import { ScaleType } from "@/types/scale.types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const randomNumber = Math.floor(Math.random() * 1300);
  const randomSettings = Math.floor(Math.random() * themes.length);

  let rarity: ScaleType =
    randomNumber < 2
      ? "emperor"
      : randomNumber < 5
      ? "mystic"
      : randomNumber < 10
      ? "ghost"
      : randomNumber < 15
      ? "divine"
      : randomNumber < 60
      ? "legendary"
      : randomNumber < 150
      ? "epic"
      : randomNumber < 400
      ? "rare"
      : "common";

  const { scale } = await req.json();
  if (scale) {
    rarity = scale;
  }
  const randomlyUpdatedTheme =
    rarity === "emperor" ? "Ancient rome emperor" : themes[randomSettings];
  const presetsObject = {
    common:
      "Keep it grounded or lightly stylized. Title should be related to theme. Backgrounds may include cozy cottages, campfires, village squares, wooden bridges, blue skies with clouds, or garden paths. Title should feel soft, playful, or nostalgic. Effects minimal — perhaps some falling leaves or laundry in the breeze, warm light. Accessories simple. No grandiose titles (avoid'whispering', 'king', 'emperor', etc). Abilities should be subtle and clever.",
    rare: "Introduce distinct fantasy elements: glowing mushrooms, crystal flowers, enchanted glades, or surreal sunsets. Backgrounds may include floating islands, rainbow-lit waterfalls, or celestial gardens. Accessories may glow or shimmer, carbon. Abilities become unique but not overpowered.",
    epic: "Strong visual contrasts and striking scenes. Black shine stones. Environments may feature elemental chaos — volcano temples, storm altars, overgrown mechs, or desert ruins powered by arcane energy, some violet bright colors. Include magical effects like lightning trails or glowing glyphs, crystals. Give the penguin an aura or light. Titles should feel iconic and epic.",
    legendary:
      "Grand and symbolic. Backgrounds may include shattered moons, ruby stones, celestial maps, giant statues, or forgotten kingdoms ablaze with runes and castles. Effects like fire halos, stardust rain, or radiant wings, asteroids. Title evoke ancient greatness, may sound mythic or eternal. Ability is powerful and thematically rich.",
    divine:
      "High fantasy meets celestial architecture. Temples above the clouds, golden marble roads, divine obelisks, or glowing altars surrounded by doves or spirits, gold elements, marble columns. Use light rays, halos, and sacred gems and lightning. The environment may reflect godlike serenity and Olympus. Accessories may include olive wreaths or star-forged armor, ancient greece helmets and weapon.",
    ghost:
      "Eerie and decayed. Include haunted mansions, shadowy forests, broken mirrors, huge emeralds, clouds, fogged forest, or carnival ruins wrapped in fog. Details like flickering lanterns, floating chains, whispering gravestones, or black flame torches. Glows come from within or unseen sources in white-moon or light yellow colors. Ability must feel cursed or spectral. Title should sound mysterious, not heroic.",
    mystic:
      "Surreal, ancient, and dreamlike, scarry. Backgrounds may include floating pyramids, huge diamonds, spiders, graveyards, inverted temples, moving sky-forests, or libraries with sentient books. Colors can shift or glow strangely but in green neon like color. Environments should feel secretive and impossible — arcane symbols in the sky, living shadows, or fractured light. Title is cryptic. Ability must feel ancient and whispered. Effects are enormous and bright",
    emperor:
      "Colossal, divine, and authoritarian. Backgrounds depict shattered celestial thrones, planetary cores, molten time-forges, roman cities, or mythic towers spiraling into the void. Everything feels ancient and omnipotent — gravity-bending architecture, black suns, or monoliths with pulsating inscriptions.Accessories are royal and rich. Colors are regal and darkly radiant: obsidian, deep crimson, starlit gold. Title is imperial and absolute. Ability reads like a commandment, carved into fate itself. Effects are monumental, reality-distorting, and almost godlike in presence.",
  };

  const systemPrompt = `
You are a penguin variation generator. Respond with a JSON object only. No intro or explanation.
There are few scales of rarity: common, rare, epic, legendary, divine (greek gods), ghost (casper-like), and mystic (scary and creepy).
Return an object with:
{
  "bg": {"en": ..., "ru": ...},
  "theme": {"en": ..., "ru": ...},
  "beak": {"en": ..., "ru": ...},
  "breast": {"en": ..., "ru": ...},
  "back": {"en": ..., "ru": ...},
  "fx": {"en": ..., "ru": ...},
  "acc": {"en": ..., "ru": ...},
  "t": {"en": ..., "ru": ...},
  "des": {"en": ..., "ru": ...},
  "ability": {"en": ..., "ru": ...}
}
where: 
  "bg": background behind penguin should be connected with theme and rarity scale, don't leave it too much simple, 
  "theme": given theme,
  "beak": color of penguin's beak,
  "breast": color of penguin's breast,
  "back": color of penguin's back,
  "fx": picture effects,
  "acc": (max 1-3 words, clothing/hat/accessory),
  "t": (max 3 words, title of the penguin),
  "des": story about penguin in 20-27 words,
  "ability": max 1-3 words, ability of the penguin

Use Capital first letter for values. Background always connected with title and theme. Same for colors. Be bold and original. Mix elements. Return only JSON.`;

  const userPrompt = `
Generate a completely new penguin variation. Avoid repeating previous themes like moss, leaf, whisperer, explorer or sovereign. Surprise me. Title and background should come from theme its important.
Rarity: ${rarity}
Theme reference: ${randomlyUpdatedTheme}, Title(t) and bg should be related to theme!
Guidance:
${presetsObject[rarity]}
Title(t) and bg should be related to theme!
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
        temperature: 1.3,
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
