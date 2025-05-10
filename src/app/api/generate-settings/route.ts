import { NextResponse } from "next/server";

let mock = {
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
};

export async function POST() {
  return NextResponse.json(mock);
}

/* export async function POST() {
  const randomNumber = Math.floor(Math.random() * 1000);

  const rarity =
    randomNumber < 2
      ? "divine"
      : randomNumber < 15
      ? "legendary"
      : randomNumber < 75
      ? "epic"
      : randomNumber < 150
      ? "rare"
      : "common";
  const systemPrompt = `
You are penguin variation generator. Respond with JSON object (no intro, no explanation).
Scales: common, rare, epic, legendary, divine.
Current scale: ${rarity}

Keys:
{
  
  "bg": (what’s behind penguin — for common: plain or poor),
  "theme": (main visual color theme),
  "body": (penguin body color — for common: natural),
  "fx": (visual or ambient effect — none for common, rich for another),
  "acc": (optional accessory — for common: simple, no wealth),
  "t": (title, ≤3 words, linked to bg and acc)
} 
Use plain English.Values should be short and visual. Return **only** JSON.`;

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

    console.log("OpenAI raw response:", JSON.stringify(data, null, 2));

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
    parsed = {...parsed, rarity}
    return NextResponse.json({ success: true, settings: parsed });
  } catch (err: any) {
    console.error("Error [settings generator]:", err);
    return NextResponse.json(
      { error: "Failed to generate settings" + err },
      { status: 500 }
    );
  }
}
 */
