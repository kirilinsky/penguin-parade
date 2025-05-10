import { NextResponse } from "next/server";
import { firestore } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore"; 
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const basePrompt = `
Generate a 2D digital illustration of a penguin, always centered in the middle of the frame. 
The penguin should remain the same in appearance with smooth lines, a clean white belly, black back, and orange beak. 
The penguin should have cartoonish, simplified features with no change in posture, size, or shape. 
Its expression should be neutral and friendly.
`;

/* export async function POST(req: Request) {
  const body = await req.json();
  const { uid } = body;

  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  try {
    const settingsRes = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-settings`,
      {
        method: "POST",
      }
    );

    const { settings } = await settingsRes.json();

    const description = [
      settings.bg && `Background: ${settings.bg}.`,
      settings.acc && `Wearing: ${settings.acc}.`,
      settings.fx &&
        settings.fx.toLowerCase() !== "none" &&
        `Effect: ${settings.fx}.`,
      settings.theme && `Visual theme: ${settings.theme}.`,
      settings.body && `Penguin body color: ${settings.body}.`,
      settings.rarity && `Rarity of picture: ${settings.rarity}.`,
    ]
      .filter(Boolean)
      .join(" ");

    const fullPrompt = `${basePrompt.trim()} ${description}`.trim();

    const dalleRes = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
        }),
      }
    );

    const dalleData = await dalleRes.json();
    const imageUrl = dalleData?.data?.[0]?.url;

    if (!imageUrl) {
      console.error("DALL·E error:", dalleData);
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    const imageRes = await fetch(imageUrl);
    const imageBuffer = await imageRes.arrayBuffer();
    const imageBytes = new Uint8Array(imageBuffer);

    const timestamp = Date.now();
    const filename = `users/${uid}/images/${timestamp}.jpg`;

    const imageRef = ref(storage, filename);
    await uploadBytes(imageRef, imageBytes, {
      contentType: "image/jpeg",
    });

    const downloadURL = await getDownloadURL(imageRef);

    const docRef = await addDoc(collection(firestore, `users/${uid}/images`), {
      imageUrl: downloadURL,
      prompt: fullPrompt,
      title: settings.t || "Untitled",
      settings,
      createdAt: serverTimestamp(),
    });

    await setDoc(
      doc(firestore, "users", uid),
      {
        lastGeneratedAt: new Date(),
      },
      { merge: true }
    );

    return NextResponse.json({
      success: true,
      downloadURL,
      title: settings.t,
      settings,
      id: docRef.id,
    });
  } catch (err) {
    console.error("Image generation failed:", err);
    return NextResponse.json(
      { error: "Internal server error" + err },
      { status: 500 }
    );
  }
} */
