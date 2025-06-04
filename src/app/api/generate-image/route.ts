import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Replicate from "replicate";
import sharp from "sharp";
import { isBefore } from "date-fns";
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
import { supabase } from "@/supabase";

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });
const model =
  "lucataco/sdxl-controlnet:06d6fae3b75ab68a28cd2900afa6033166910dd09fd9751047043a5bbb4c184b";
const templateImageUrl = "https://i.ibb.co/B55bD3mh/template.png";
const BUCKET = "penguins";
const GLOBAL_IMAGES_COLLECTION = "images";

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

  if (userData.craftInProgress) {
    return NextResponse.json(
      { error: "Generation already in progress" },
      { status: 429 }
    );
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

  await updateDoc(userRef, {
    craftInProgress: true,
  });

  try {
    const settingsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-settings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(evolutionMode ? { scale } : {}),
      }
    );
    if (!settingsRes.ok) {
      return NextResponse.json(
        { error: "Failed to get settings" },
        { status: 500 }
      );
    }
    const { settings } = await settingsRes.json();

    const en = (key: keyof typeof settings) =>
      typeof settings[key] === "object" && settings[key]?.en
        ? settings[key].en
        : settings[key];

    const promptParts: string[] = [];

    promptParts.push(
      `A 2D digital cartoon-style portrait of a penguin character.`,
      `The penguin is standing in ${en("bg").toLowerCase()}, surrounded by ${en(
        "fx"
      ).toLowerCase()}.`,
      `The penguin detailed and scene is styled as ${en(
        "theme"
      ).toLowerCase()}, with cinematic lighting and rich background and great penguin accessories details.`
    );

    promptParts.push(
      `The penguin wears ${en("acc").toLowerCase()},`,
      `has a ${en("beak").toLowerCase()} beak,`,
      `a ${en("breast").toLowerCase()} chest,`,
      `and a ${en("back").toLowerCase()} back.`
    );
    promptParts.push(
      `Highly detailed, vibrant colors, fantasy illustration, attractive and detailed effects,`,
      `rarity level: ${settings.rarity.toLowerCase()} and picture title is ${en(
        "t"
      )}.`
    );

    const output = await replicate.run(model, {
      input: {
        image: templateImageUrl,
        prompt: promptParts.join(" "),
        seed: Math.floor(Math.random() * 10000),
        strength: 0.66,
        negative_prompt:
          "low quality, 3d, bad quality, lack of details, realism, plain background, washed out",
        guidance_scale: 13,
        num_inference_steps: 52,
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
        cacheControl: "31576000",
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
        title: settings.t.en || "Untitled",
        creatorUid: uid,
        ownerId: uid,
        origin,
        expeditions: 0,
        inExpedition: false,
        expedition: null,
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
        craftInProgress: false,
      });
    } else {
      await updateDoc(doc(firestore, `users/${uid}`), {
        "statistics.lastEvolutionAt": new Date(),
        "statistics.evolutions": increment(1),
        imageIds: arrayUnion(imageDoc.id),
        craftInProgress: false,
      });
    }

    return NextResponse.json({
      success: true,
      downloadURL: urlData.publicUrl,
      title: settings.t.en,
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
