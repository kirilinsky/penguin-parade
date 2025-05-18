import { themes } from "@/data/themes";
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

  const settingsObject = {
    common: {
      bg: "Use familiar or cozy places, not amazed: small village, snow hill, grassy path, cozy cabin.",
      theme:
        "Keep visual themes soft, pastel, or nature-inspired — nothing intense. Can use some fun and cute themes.",
      beak: "Simple colors: orange, black, yellow, brown.",
      breast: "Natural tones: white, gray, soft blue, light brown.",
      back: "Earthy or calm colors. Avoid neon or metallic.",
      fx: "None or subtle: light breeze, falling leaves, soft glow, lights.",
      acc: "Minimal or playful and related to theme: scarf, wool hat, tiny backpack, or none.",
      t: "Avoid grand words. Can use some fun and cute names. Use playful or descriptive titles like 'Snow Scout' or 'Berry Walker'.",
      des: "Describe a simple daily life or small adventure in < 25 words.",
      ability:
        "Use modest or quirky traits: 'fast feet', 'good memory', 'berry finder'.",
    },
    rare: {
      bg: "Add fantasy or surreal elements: floating rocks, glowing forest, unusual village.",
      theme:
        "Brighter palettes or symbolic color pairings (e.g. fire and frost).",
      beak: "Allow contrast or rare tones like teal, indigo, or rose gold.",
      breast: "Start to introduce vibrant or glowing options.",
      back: "Stronger colors allowed, possibly two-tone or textured.",
      fx: "Soft magic: glow, floating particles, glowing butterflies.",
      acc: "Expressive but grounded: enchanted satchel, gem brooch, elemental cape.",
      t: "Use short symbolic or elemental titles: 'Fire Trail', 'Crystal Bloom'.",
      des: "Slightly mythic or magical actions: watching stars, healing saplings, taming wind.",
      ability: "One strong word or a combo like 'Petal shield', 'Moon jump'.",
    },
    epic: {
      bg: "Bold environments: sky kingdoms, lava plains, arcane towers, lost cities.",
      theme: "Contrasting or elemental: stormfire, neon frost, ancient rust.",
      beak: "Unique materials allowed: obsidian, chrome, glowing stone.",
      breast: "Vivid and powerful tones: magma red, starlight white.",
      back: "High contrast or textured (e.g. cracked stone, glowing metal).",
      fx: "Visible energy: runes, sparks, magic circles, light trails.",
      acc: "Heroic or magical: flaming mask, mechanical arm, battle sash.",
      t: "Bold and symbolic: 'Blaze Herald', 'Sky Warden', 'Echo Breaker'.",
      des: "Hint at quests or major roles in fantasy or battle settings.",
      ability: "Elemental or mythical powers: 'Thunder cry', 'Starlit charge'.",
    },
    legendary: {
      t: "Use mythic words: 'Rune King', 'Starblade', 'Vault Flame' etc. but not 'Sovereign'",
      bg: "Ancient epic settings: collapsed temples, star gates, frozen time islands, comets.",
      theme: "Celestial, divine chaos, volcanic ice — large scale energies.",
      beak: "Mythic material: gold, lava, ethereal crystal.",
      breast: "Regal or glowing colors: cosmic gold, obsidian light.",
      back: "Sacred contrast: sunburst violet, silver storm.",
      fx: "Strong aura, particles orbiting, or burning sigils.",
      acc: "Ancient relics: crown of stars, obsidian wings, crystal helm, weapon.",
      des: "Describe feats, prophecy, or legendary moments.",
      ability: "Powerful concepts: 'Reality bend', 'Celestial surge'.",
    },
    divine: {
      bg: "Heavenly realms: marble citadels, floating temples, golden skies.",
      theme: "Light, purity, gold, marble, diamond reflections.",
      beak: "Divine tones: glowing white, gold, silver crystal.",
      breast: "White-gold, pearlescent pink, radiant violet.",
      back: "Clean or jewel-like colors: white marble, golden bronze.",
      fx: "Radiance: beam halos, wings of light, divine particles.",
      acc: "Sacred icons: olive wreath, divine mantle, temple circlet.",
      t: "Elevated but graceful titles: 'Marble Bloom', 'Sunkeeper', 'Light Weaver'.",
      des: "Depict a divine mission or a blessing moment.",
      ability: "Sacred traits: 'Blessing touch', 'Sunshield', 'Aura field'.",
    },
    ghost: {
      bg: "Creepy or lost worlds: foggy graveyards, haunted circus, decayed thrones.",
      theme: "Dark faded tones: haunted glow, blood rust, cursed ash.",
      beak: "Withered or spectral tones: bone white, ash black, fading blue.",
      breast: "Ghostly textures: misty gray, void white, faded purple.",
      back: "Tattered or decayed hues, rusty brown, shadow blue.",
      fx: "Mist, ghost trails, blinking lights, broken light particles.",
      acc: "Cursed gear: cracked mask, chains, stitched cloth.",
      t: "Dark or eerie titles: 'Hollow Watcher', 'Curse Born', 'Fog Eye'.",
      des: "Suggest unfinished stories, hauntings, ancient warnings.",
      ability:
        "Haunting traits: 'Soul drain', 'Phantom step', 'Night whisper'.",
    },
    mystic: {
      bg: "Illogical or dreamlike: colorless deserts, upside-down temples, memory forests.",
      theme: "Forbidden hues: arcane violet, liquid green, prism shadow.",
      beak: "Unreal materials: glowing quartz, floating copper.",
      breast:
        "breast color, Layered or flickering colors: galaxy fold, arcane mist.",
      back: "Dream logic palette: static teal, drifting ink.",
      fx: "Strange energy: shifting patterns, light loops, runes that change.",
      acc: "Unusual: mask with no face, ancient pendant, levitating halo.",
      t: "Cryptic names examples: 'Silent Thread', 'Sigil Bloom', 'Ink Veil'.",
      des: "Describe mystic functions, paradoxes, or symbols.",
      ability: "Enigmatic powers: 'Mind echo', 'Sigil blink', 'Fold jump'.",
    },
  };
  const currentSettings = settingsObject[rarity];

  const systemPrompt = `
You are a penguin variation generator. Respond with a JSON object only. No intro or explanation.
There are few scales of rarity: common, rare, epic, legendary, divine (greek gods),ghost(casper like) and mystic (scary and creepy)
Return an object with:
{
  "bg": (backround behind penguin),
  "theme": (random theme),
  "beak":  color of penguins beak,
  "breast": color of penguins breast,
  "back": color of penguins back,
  "fx": picture effects, 
  "acc": (max 1-3 words, clothe, hat or another penguins belongings),
  "t": (max 3 words, Title of this penguin,),
  "des": story about penguin in 20-25 words
  "ability": max 1-3 words, ability of this Penguin
}
Use Capital first letter for words in fields.
Be bold and original. You can combine and mix combinations. Create mood. Return only JSON.`;

  const userPrompt = `
Give me one fresh, unexpected and imaginative penguin variant in a new setting, completely different from the previous ones.
Current scale of rarity is ${rarity} and current theme reference is ${randomlyUpdatedTheme}. So apply this theme to these settings:
${presetsObject[rarity]} 
You can combine and mix combinations. Create mood. Return only JSON.
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
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 1.0,
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
