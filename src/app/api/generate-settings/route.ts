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
Penguins can appear in any stylized, imaginative environment — not limited to snow or ice or forest. any variations, as example you can use some of:
Space, Fantasy, Village, Cowboy, Balkan, Arabic, Pirate, Retro, Urban, Mythology, Tech/Futuristic, Ancient World, Food, Psychedelic, Underwater, Video Game, Jungle, Steampunk, Minimalist, Carnival, Mythical Creatures, Robots/AI, Nostalgia, Floral/Plant World, Superhero, Cyberpunk, Winter Wonderland, Circus, Vintage. Or create new.
Scales of penguin: common, rare, epic, legendary, divine, ghost and mystic. 
Current scale: ${rarity} 
Keys:
{ 
  "bg": (what’s behind penguin — for common: something simple, smth about ancient Greece for divine), 
  "theme": (main visual color theme, for divine its huge diamonds, for ghost its mystic and scary),
  "beak": (сolor of penguin beak),
  "breast": (сolor of penguin breast),
  "back": (сolor of penguin back), 
  "fx": (visual or ambient effect — none for common, rich for another scales),
  "acc": (optional clothe and/or hat — for common: none or smth simple, no wealth),
  "t": (title, ≤3 words, linked to bg and acc and theme)
} 
Use plain English. Use different themes and combinations. Values should be short and visual. Return **only** JSON.`;

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
