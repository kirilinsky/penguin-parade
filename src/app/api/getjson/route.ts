import { NextResponse } from "next/server";
import { firestore } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!Array.isArray(body)) {
      return NextResponse.json({ error: "Expected an array" }, { status: 400 });
    }

    const updatedIds: string[] = [];

    for (const entry of body) {
      const { id, translatedSettings } = entry;

      if (!id || !translatedSettings) continue;

      const ref = doc(firestore, "images", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) continue;

      const current = snap.data();
      const settings = current.settings || {};
      const updatedSettings = { ...settings };

      for (const key of Object.keys(translatedSettings)) {
        const ru = translatedSettings[key];
        if (!ru) continue;

        if (typeof updatedSettings[key] === "string") {
          updatedSettings[key] = {
            en: updatedSettings[key],
            ru,
          };
        } else if (
          typeof updatedSettings[key] === "object" &&
          updatedSettings[key] !== null &&
          "en" in updatedSettings[key]
        ) {
          updatedSettings[key] = {
            ...updatedSettings[key],
            ru,
          };
        }
      }

      await updateDoc(ref, { settings: updatedSettings });
      updatedIds.push(id);
    }

    return NextResponse.json({ success: true, updated: updatedIds });
  } catch (err) {
    return NextResponse.json(
      { error: "Server error", detail: String(err) },
      { status: 500 }
    );
  }
}
