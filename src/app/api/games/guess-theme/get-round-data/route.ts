import { NextRequest, NextResponse } from "next/server";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { firestore } from "@/firebase";

export async function GET(req: NextRequest) {
  try {
    const count = 12;

    const snap = await getDocs(
      query(collection(firestore, "images"), limit(1024))
    );
    const allDocs = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as any[];

    if (allDocs.length === 0) {
      return NextResponse.json({ error: "No images found" }, { status: 404 });
    }

    const shuffled = allDocs.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    const options: Record<string, string> = {};
    selected.forEach((img) => {
      options[img.id] = img.settings?.theme || "Unknown";
    });

    const correct = selected[Math.floor(Math.random() * selected.length)];

    const payload = {
      options,
      correctId: correct.id,
      imageUrl: correct.imageUrl,
    };

    return NextResponse.json(payload);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
