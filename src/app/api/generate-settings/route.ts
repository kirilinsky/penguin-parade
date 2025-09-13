import { themes } from "@/data/themes";
import { ScaleType } from "@/types/scale.types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const randomNumber = Math.random() * 100;
  const randomSettings = Math.floor(Math.random() * themes.length);

  let rarity: ScaleType =
    randomNumber < 0.05
      ? "emperor"
      : randomNumber < 0.15
      ? "mystic"
      : randomNumber < 0.6
      ? "ghost"
      : randomNumber < 1.4
      ? "divine"
      : randomNumber < 3.52
      ? "legendary"
      : randomNumber < 8.9
      ? "epic"
      : randomNumber < 22.2
      ? "rare"
      : "common";

  const { scale, event, theme: eventTheme, value } = await req.json();
  if (scale) {
    rarity = scale;
  }

  const randomlyUpdatedTheme =
    rarity === "emperor" ? "Ancient rome emperor" : themes[randomSettings];
  const presetsObject = {
    common:
      "Keep it grounded or lightly stylized. Title should be related to theme. Backgrounds may include cozy cottages, campfires, village squares, wooden bridges, blue skies with clouds, or garden paths. Title should feel soft, playful, or nostalgic. Effects minimal — perhaps some falling leaves or laundry in the breeze, warm light. Accessories simple. No grandiose titles (avoid'whispering', 'king', 'emperor', etc). Abilities should be subtle and clever.",
    rare: "Add subtle fantasy elements with recognizable scenery. Backgrounds may include enchanted forest clearings with glowing mushrooms, ancient stone wells surrounded by ivy, bioluminescent lakes, moonlit waterfalls hidden in dense woods, or glowing crystal caverns with roots and fog. Accessories can include faintly glowing leaves, carved wooden amulets, or subtle floating lights. Abilities should feel magical but connected to nature — e.g. 'soft-step', 'dusk sense', or 'will of the glade'.",
    epic: "Use powerful, vivid settings with dramatic lighting and bold scenery. Backgrounds may show ancient desert ruins struck by purple lightning, giant floating mechs half-swallowed by jungle, obsidian altars in volcano craters, arcane towers cracked open by storms, or icy temples glowing with buried energy. Include magical FX like glowing runes, floating debris, energy rings, or elemental forces (wind, fire, violet mist). Penguins can have glowing eyes, elemental cloaks, or arcane sigils. Titles should sound like epic legends — but no references to royalty (no kings/emperors).",
    legendary:
      "Grand and symbolic. Backgrounds may include shattered moons, ruby stones, celestial maps, giant statues, or forgotten kingdoms ablaze with runes and castles. Effects like fire halos, stardust rain, or radiant wings, asteroids. Title evoke ancient greatness, may sound mythic or eternal. Ability is powerful and thematically rich.",
    divine:
      "High fantasy meets celestial architecture. Temples above the clouds, golden marble roads, divine obelisks, or glowing altars surrounded by doves or spirits, gold elements, marble columns. Use light rays, halos, and sacred gems and lightning. The environment may reflect godlike serenity and Olympus. Accessories may include olive wreaths or star-forged armor, ancient greece helmets and weapon.",
    ghost:
      "Eerie and decayed. Include haunted mansions, shadowy forests, broken mirrors, huge emeralds, clouds, fogged forest, or carnival ruins wrapped in fog. Details like flickering lanterns, floating chains, whispering gravestones, or black flame torches. Glows come from within or unseen sources in white-moon or light yellow colors. Ability must feel cursed or spectral. Title should sound mysterious, not heroic. Main color is moon white",
    mystic:
      "Surreal, ancient, and dreamlike, scarry and spooky. Backgrounds may include floating pyramids, huge diamonds, spiders, graveyards, ghosts, skeletons, inverted temples, moving sky-forests, or libraries with sentient books. Colors can shift or glow strangely but in green neon like color. Environments should feel secretive and impossible — arcane symbols in the sky, living shadows, or fractured light. Title is cryptic. Ability must feel ancient and whispered. Effects are enormous and bright. main color is mystical and evil green",
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
  "bg": background behind penguin should be connected with theme and rarity scale, don't leave it too much simple, more details, visual art effects
  "theme": given theme, dont change it!,
  "beak": color of penguin's beak,
  "breast": color of penguin's breast,
  "back": color of penguin's back,
  "fx": picture effects,
  "acc": (max 1-3 words, clothing/hat/accessory, necklace, shirt etc),
  "t": (max 3 words, title of the penguin) surprise me, pretend its movie title about theme, !no words 'whisper', 'Whispering' etc!
  "des": story about penguin,its origin, surrounding, legacy, fun facts, in 31-35 words,
  "ability": max 1-3 words, ability of the penguin related to theme. smth fun 

Use Capital first letter for values and spaces between words. Background always connected with title and theme. Same for colors. Be bold and original. Mix elements. Return only JSON.`;

  const userPrompt = `
${event ? eventTheme : ""} 
Generate a completely new penguin variation. Title and background should come from theme and play and extend it, title must be fancy and fun, its important.
Rarity: ${rarity}
Theme reference: ${
    event ? value : randomlyUpdatedTheme
  }, Title(t) and bg should be related to theme!
Guidance:
${presetsObject[rarity]}
Title(t) and bg should be related to theme, use words as for cartoon or movie, more experimental in title!
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
        temperature: 1.4,
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
