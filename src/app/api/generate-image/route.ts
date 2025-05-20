import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";
import sharp from "sharp";
import { isBefore } from "date-fns";
import { supabase } from "@/supabase";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
  increment,
  arrayUnion,
  getDoc,
} from "firebase/firestore";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const model =
  "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b";
const templateImageUrl = "https://i.ibb.co/B55bD3mh/template.png";
const BUCKET = "penguins";
const GLOBAL_IMAGES_COLLECTION = "images";

const basePrompt = `
Generate a 2D digital cartoon-style portrait of a penguin character, centered in the image. Keep the penguin's pose, proportions, and expression exactly the same as in the reference image. Do not alter the penguin's structure. But you can experiment with clothes effects, and stuff.`;

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

  const userRef = doc(firestore, "users", uid);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data();

  if (!userData) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  let evolutionMode = false;
  const { scale } = await req.json();

  if (!scale) {
    const allowCraftAt = userData.allowCraftAt;
    if (
      allowCraftAt &&
      typeof allowCraftAt.toDate === "function" &&
      !isBefore(allowCraftAt.toDate(), new Date())
    ) {
      return NextResponse.json(
        { error: "Not able to craft!" },
        { status: 403 }
      );
    }
  } else {
    evolutionMode = true;
  }

  try {
    /* if evolution */
    const headers: Record<string, string> = {};
    let body: string | undefined = undefined;
    if (evolutionMode) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify({ scale });
    }

    const settingsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-settings`,
      {
        method: "POST",
        headers,
        ...(body ? { body } : {}),
      }
    );
    if (!settingsRes.ok) {
      return NextResponse.json(
        { error: "Failed to get settings" },
        { status: 500 }
      );
    }
    const { settings } = await settingsRes.json();

    const fxDescription = `with a visible effect of ${settings.fx} at picture`;

    const descriptionParts = [
      settings.theme && `The color mood is ${settings.theme.toLowerCase()}`,
      `A penguin titled \"${settings.t}\"`,
      `stands in a setting with ${settings.bg.toLowerCase()}`,
      `wearing ${settings.acc}`,
      `with a ${settings.beak.toLowerCase()} color of penguin beak`,
      `a ${settings.breast.toLowerCase()} color chest`,
      `and ${settings.back.toLowerCase()} color on its back`,
      fxDescription,
    ];

    const description = descriptionParts.filter(Boolean).join(", ") + ".";
    const prompt = `${basePrompt.trim()} ${description}`.trim();

    const output = await replicate.run(model, {
      input: {
        image: templateImageUrl,
        prompt,
        seed: Math.floor(Math.random() * 100000),
        strength: 0.5,
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

    const filename = `images/${Date.now()}_${uuidv4()}.webp`;
    const uploadRes = await supabase.storage
      .from(BUCKET)
      .upload(filename, webpBuffer, {
        contentType: "image/webp",
        cacheControl: "31536000",
      });

    if (uploadRes.error) {
      return NextResponse.json(
        { error: "Upload failed", details: uploadRes.error.message },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filename);
    if (!urlData?.publicUrl) {
      return NextResponse.json(
        { error: "Failed to get image URL" },
        { status: 500 }
      );
    }
    const origin = evolutionMode ? "evolution" : "craft";
    const imageDoc = await addDoc(
      collection(firestore, GLOBAL_IMAGES_COLLECTION),
      {
        imageUrl: urlData.publicUrl,
        title: settings.t || "Untitled",
        creatorUid: uid,
        ownerId: uid,
        origin,
        gift: false,
        settings,
        createdAt: serverTimestamp(),
      }
    );
    if (!evolutionMode) {
      const DAY_MS = 24 * 60 * 60 * 1000;
      const allowCraftAt = new Date(Date.now() + DAY_MS);

      await updateDoc(doc(firestore, `users/${uid}`), {
        allowCraftAt,
        lastGeneratedAt: new Date(),
        "statistics.totalCrafted": increment(1),
        imageIds: arrayUnion(imageDoc.id),
      });
    } else {
      await updateDoc(doc(firestore, `users/${uid}`), {
        'statistics.lastEvolutionAt': new Date(),
        "statistics.evolutions": increment(1),
        imageIds: arrayUnion(imageDoc.id),
      });
    }

    return NextResponse.json({
      success: true,
      downloadURL: urlData.publicUrl,
      title: settings.t,
      settings,
      id: imageDoc.id,
    });
  } catch (err) {
    console.error("Image generation failed:", err);
    return NextResponse.json(
      { error: "Internal server error", details: String(err) },
      { status: 500 }
    );
  }
}
