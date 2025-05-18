import { NextResponse } from "next/server";
import { firestore } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { supabase } from "@/supabase";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";
import { getUserAllowCraftedAt } from "@/helpers/get-user-allow-crafted-at/get-user-allow-crafted-at";
import { evaluateGenerationState } from "@/helpers/evaluate-generation-state/evaluate-generation-state";
import { adminAuth } from "@/fireBase-admin";
import sharp from "sharp";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const model =
  "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b";
const templateImageUrl = "https://i.ibb.co/B55bD3mh/template.png";

const basePrompt = `
Generate a 2D digital cartoon-style portrait of a penguin character, centered in the image. Keep the penguin's pose, proportions, and expression exactly the same as in the reference image. Do not alter the penguin's structure. But you can experiment with clothes and stuff.`;

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization") || "";

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "No token provided" }, { status: 401 });
  }

  let decoded;
  try {
    decoded = await adminAuth.verifyIdToken(token);
  } catch (err) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  if (!decoded.email_verified) {
    return NextResponse.json({ error: "Email not verified" }, { status: 403 });
  }

  const uid = decoded.uid;
  if (!uid) return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  const allowUserCraftedAt = await getUserAllowCraftedAt(uid);
  const { isAllowed } = evaluateGenerationState(allowUserCraftedAt);
  if (!isAllowed) {
    return NextResponse.json({ error: "Not able to craft!" }, { status: 500 });
  }

  /*  const { scale } = await req.json();
  if (scale) {
    return NextResponse.json({ error: "scale :" + scale }, { status: 500 });
  } */

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
      settings.t && `Penguin is ${settings.t}`,
      settings.bg && `Background: ${settings.bg}`,
      settings.acc && `Penguin is wearing: ${settings.acc}`,
      settings.beak && `Penguin Beak color: ${settings.beak}`,
      settings.breast && `Penguin breast color: ${settings.breast}`,
      settings.back && `Penguin back color: ${settings.back}`,
      settings.fx &&
        settings.fx.toLowerCase() !== "none" &&
        `Effect: ${settings.fx}`,
      settings.theme && `Color mood: ${settings.theme}`,
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
    const webpBuffer = await sharp(Buffer.from(buffer))
      .webp({ quality: 90 })
      .toBuffer();

    const filename = `users/${uid}/images/${Date.now()}_${uuidv4()}.webp`;
    const { data, error } = await supabase.storage
      .from("penguins")
      .upload(filename, webpBuffer, {
        contentType: "image/webp",
        cacheControl: "31538000",
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
      creatorUid: uid,
      origin: "craft",
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
