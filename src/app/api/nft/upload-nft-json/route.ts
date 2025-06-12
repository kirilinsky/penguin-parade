import { firestore } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

function capitalizeWords(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export async function POST(req: Request) {
  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    const snap = await getDoc(doc(firestore, "images", id));
    if (!snap.exists())
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const data = snap.data();
    const settings = data.settings;
    const ipfsImageUrl = data.ipfsImageUrl;
    const ipfs = data.ipfs;
    const ipfsMetadataUrl = data.ipfsMetadataUrl;
    const origin = data.origin || "Craft";

 /*    if (ipfsMetadataUrl) {
      return NextResponse.json(
        { error: "Already has ipfsMetadataUrl." },
        { status: 400 }
      );
    } */
    if (!ipfsImageUrl || !ipfs) {
      return NextResponse.json(
        { error: "No IPFS image found for this item." },
        { status: 400 }
      );
    }

    const metadata = {
      name: settings.t?.en || "Penguin",
      description: settings.des?.en || "A mysterious penguin.",
      image: ipfsImageUrl,
      attributes: [
        {
          trait_type: "Ability",
          value: capitalizeWords(settings.ability?.en || ""),
        },
        { trait_type: "Back", value: capitalizeWords(settings.back?.en || "") },
        { trait_type: "Beak", value: capitalizeWords(settings.beak?.en || "") },
        {
          trait_type: "Chest",
          value: capitalizeWords(settings.breast?.en || ""),
        },
        { trait_type: "Origin", value: capitalizeWords(origin || "") },
        { trait_type: "Scale", value: capitalizeWords(settings.rarity || "") },
      ],
    };

    const blob = new Blob([JSON.stringify(metadata)], {
      type: "application/json",
    });
    const form = new FormData();
    form.append("file", blob, `${id}.json`);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
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
      ipfsMetadataUrl: ipfsUrl,
    });

    return NextResponse.json({
      success: true,
      ipfsMetadataUrl: ipfsUrl,
      metadata,
    });
  } catch (e: any) {
    console.error("Metadata upload error:", e);
    return NextResponse.json(
      { error: e.message || "Upload failed" },
      { status: 500 }
    );
  }
}
