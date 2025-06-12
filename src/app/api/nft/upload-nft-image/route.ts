import { firestore } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    const snap = await getDoc(doc(firestore, "images", id));
    if (!snap.exists())
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = snap.data();
    const imageUrl = data.imageUrl;

    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) throw new Error("Failed to fetch image from Supabase");
    const blob = await imageRes.blob();

    // 2. Создаём FormData вручную
    const form = new FormData();
    form.append("file", blob, `${id}.webp`);

    // 3. Отправляем в Pinata через fetch
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`, // если используешь JWT
        pinata_api_key: process.env.PINATA_API_KEY!, // если используешь API key
        pinata_secret_api_key: process.env.PINATA_API_SECRET!,
      },
      body: form,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error("Pinata upload failed: " + errText);
    }

    const result = await res.json();
    const ipfsUrl = `ipfs://${result.IpfsHash}`;

    await updateDoc(doc(firestore, "images", id), {
      ipfsImageUrl: ipfsUrl,
      ipfs: true,
    });

    return NextResponse.json({ success: true, ipfsImageUrl: ipfsUrl });
  } catch (e: any) {
    console.error("Upload error:", e);
    return NextResponse.json(
      { error: e.message || "Upload failed" },
      { status: 500 }
    );
  }
}
