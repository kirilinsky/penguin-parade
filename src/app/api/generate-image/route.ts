import { NextResponse } from "next/server";
import { firestore } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { supabase } from "@/supabase";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";
import { getUserAllowCraftedAt } from "@/helpers/get-user-allow-crafted-at/get-user-allow-crafted-at";
import { evaluateGenerationState } from "@/helpers/evaluate-generation-state/evaluate-generation-state";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const model =
  "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b";
const templateImageUrl = "https://i.ibb.co/B55bD3mh/template.png";

const basePrompt = `
Generate a 2D digital cartoon-style portrait of a penguin character, centered in the image. Keep the penguin's pose, proportions, and expression exactly the same as in the reference image. Do not alter the penguin's structure.`;

export async function POST(req: Request) {
  const { uid } = await req.json();
  if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  const allowUserCraftedAt = await getUserAllowCraftedAt(uid);
  const { isAllowed } = evaluateGenerationState(allowUserCraftedAt);
  if (!isAllowed) {
    return NextResponse.json({ error: "Not able to craft!" }, { status: 500 });
  }

  try {
    const settingsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-settings`,
      {
        method: "POST",
      }
    );
    if (!settingsRes.ok) {
      return NextResponse.json(
        { error: "Failed to get settings" },
        { status: 500 }
      );
    }
    const { settings } = await settingsRes.json();

    const description = [
      settings.bg && `Background: ${settings.bg}`,
      settings.acc && `Penguin is wearing: ${settings.acc}`,
      settings.beak && `Penguin Beak color: ${settings.beak}`,
      settings.breast && `Penguin breast color: ${settings.breast}`,
      settings.back && `Penguin back color: ${settings.back}`,
      settings.fx &&
        settings.fx.toLowerCase() !== "none" &&
        `Effect: ${settings.fx}`,
      settings.theme && `Color mood: ${settings.theme}`,
      settings.rarity && `Rarity: ${settings.rarity}`,
    ]
      .filter(Boolean)
      .join(", ");

    const prompt = `${basePrompt.trim()} ${description}`.trim();

    const output = await replicate.run(model, {
      input: {
        image: templateImageUrl,
        prompt,
        seed: Math.floor(Math.random() * 100000),
        strength: 0.4,
        guidance_scale: 10,
        num_inference_steps: 50,
      },
    });

    const imageUrl = Array.isArray(output) ? output[0] : output;
    if (!imageUrl) {
      return NextResponse.json(
        { error: "No image generated" },
        { status: 500 }
      );
    }

    const imageRes = await fetch(imageUrl);
    const buffer = await imageRes.arrayBuffer();
    const imageBytes = new Uint8Array(buffer);

    const filename = `users/${uid}/images/${Date.now()}_${uuidv4()}.png`;
    const { data, error } = await supabase.storage
      .from("penguins")
      .upload(filename, imageBytes, {
        contentType: "image/png",
        upsert: false,
      });
    if (error) throw new Error(error.message);

    const { data: urlData } = supabase.storage
      .from("penguins")
      .getPublicUrl(filename);
    if (!urlData?.publicUrl) throw new Error("Failed to get image URL");

    const docRef = await addDoc(collection(firestore, `users/${uid}/images`), {
      imageUrl: urlData.publicUrl,
      title: settings.t || "Untitled",
      settings,
      createdAt: serverTimestamp(),
    });

    const DAY_MS = 24 * 60 * 60 * 1000;
    const allowCraftAt = new Date(new Date().getTime() + DAY_MS);
    await setDoc(
      doc(firestore, "users", uid),
      { allowCraftAt, lastGeneratedAt: new Date() },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      downloadURL: urlData.publicUrl,
      title: settings.t,
      settings,
      id: docRef.id,
    });
  } catch (err) {
    console.error("Image generation failed:", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
