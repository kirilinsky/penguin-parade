import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/fireBase-admin";
import { firestore } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    // 1) Auth
    const authHeader = req.headers.get("Authorization") || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token)
      return NextResponse.json({ error: "Missing token" }, { status: 401 });

    const decoded = await adminAuth.verifyIdToken(token).catch(() => null);
    if (!decoded?.uid)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    const uid = decoded.uid;

    const currentRef = doc(
      firestore,
      "users",
      uid,
      "games",
      "clicker",
      "state",
      "current"
    );
    const gameRef = doc(
      firestore,
      "users",
      uid,
      "games",
      "clicker",
      "state",
      "game"
    );

    const [curSnap, gameSnap] = await Promise.all([
      getDoc(currentRef),
      getDoc(gameRef),
    ]);

    return NextResponse.json({
      ok: true,
      current: curSnap.exists() ? curSnap.data() : null,
      game: gameSnap.exists() ? gameSnap.data() : null,
    });
  } catch (e) {
    console.error("[clicker/state] error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
