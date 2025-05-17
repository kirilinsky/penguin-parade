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
  const presetsObject = {
    common:
      'Keep it grounded or lightly stylized. Environments may be familiar (small villages, nature, festivals). Themes should feel soft, cozy, or playful. Effects minimal. Accessories simple or absent. No grandiose titles (avoid "king", "emperor", "sovereign", etc). Keep ability low-key but clever.',
    rare: "Introduce more distinct fantasy elements, brighter themes, glow, colorful accessories, surreal backdrops. Abilities become unique but not overpowered.",
    epic: "Strong visual contrasts, elemental magic, steampunk, space-fantasy, historical/heroic crossover. Accessories and environments can be bold. Give penguin an aura. Title should sound iconic.",
    legendary:
      "Large-scale energy, symbols of greatness, celestial or ancient ruins, effects like fire, stardust, runes. Titles may sound mythic. Ability is powerful and themed.",
    divine:
      "High fantasy or godlike, ancient Greece. Temples in the sky, golden marble cities, massive gems. Theme can include light, sacred metal, or purity. Accessories divine (e.g. olive wreath, cosmic armor).",
    ghost:
      "Eerie, shadowy, cursed, or decayed. Themes like forgotten crypts, haunted carnival, lost realms. Fog, chains, glow from within. Ability must sound haunting. Title should not be heroic.",
    mystic:
      "Surreal, dreamlike, arcane. Environment can defy logic (floating pyramids, shifting sky forests). Colors may be dark or glowing. Themes strange, forgotten, whispered. Title is cryptic. Ability must feel ancient and secret.",
  };

  const settingsObject = {
    common: {
      bg: "Use familiar or cozy places, not amazed: small village, snow hill, grassy path, cozy cabin.",
      theme:
        "Keep visual themes soft, pastel, or nature-inspired — nothing intense. Can use some fun and cute themes.",
      beak: "Simple colors: orange, black, yellow, brown.",
      breast: "Natural tones: white, gray, soft blue, light brown.",
      back: "Earthy or calm colors. Avoid neon or metallic.",
      fx: "None or subtle: light breeze, falling leaves, soft glow.",
      acc: "Minimal or playful: scarf, wool hat, tiny backpack, or none.",
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
      bg: "Ancient epic settings: collapsed temples, star gates, frozen time islands.",
      theme: "Celestial, divine chaos, volcanic ice — large scale energies.",
      beak: "Mythic material: gold, lava, ethereal crystal.",
      breast: "Regal or glowing colors: cosmic gold, obsidian light.",
      back: "Sacred contrast: sunburst violet, silver storm.",
      fx: "Strong aura, particles orbiting, or burning sigils.",
      acc: "Ancient relics: crown of stars, obsidian wings, crystal helm.",
      t: "Use mythic words: 'Rune King', 'Starblade', 'Vault Flame'.",
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
Penguins can appear in any stylized, wildly imaginative environment — do not stick to forests, ice, or ocean unless scale suggests it.
Think in terms of ancient empires, fantasy, folklore, sci-fi, mythology, urban fantasy, surrealism, retro worlds, video game logic, alien civilizations, dream logic, elemental dimensions, magical realism, or even complete absurdity.
 Current scale: ${rarity}. 
${presetsObject[rarity]}
Return an object with:
{
  "bg": (smth from ${currentSettings.bg}),
  "theme": (smth from ${currentSettings.theme}),
  "beak":  smth from ${currentSettings.beak},
  "breast": smth from ${currentSettings.breast},
  "back": smth from ${currentSettings.back},
  "fx": smth from ${currentSettings.fx},
  "acc": (max 1-3 words, create smth from ${currentSettings.acc}),
  "t": (max 3 words, ${currentSettings.t}, be original),
  "des": story in 20-25 words, ${currentSettings.des},
  "ability": max 1-3 words, ${currentSettings.ability}
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
