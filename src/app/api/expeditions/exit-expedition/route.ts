import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { adminAuth } from "@/fireBase-admin";
import { Expedition } from "@/types/expeditions.types";

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("Authorization") || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 401 });
  }

  let uid: string;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    uid = decoded.uid;
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const { expeditionId } = await req.json();

  if (!expeditionId) {
    return NextResponse.json(
      { error: "Missing expeditionId" },
      { status: 400 }
    );
  }

  const expeditionRef = doc(firestore, "expeditions", expeditionId);
  const expeditionSnap = await getDoc(expeditionRef);

  if (!expeditionSnap.exists()) {
    return NextResponse.json(
      { error: "Expedition not found" },
      { status: 404 }
    );
  }

  const expedition = expeditionSnap.data() as Expedition;

  const participant = expedition.participants.find((p) => p.userId === uid);

  if (!participant) {
    return NextResponse.json(
      { error: "You are not a participant" },
      { status: 400 }
    );
  }

  const { penguinIds } = participant;

  const penguinUpdatePromises = penguinIds.map(async (imageId) => {
    const penguinRef = doc(firestore, "images", imageId);
    const penguinSnap = await getDoc(penguinRef);

    if (!penguinSnap.exists()) return;

    const penguinData = penguinSnap.data();
    const expeditionsCount = Math.max((penguinData.expeditions || 1) - 1, 0);

    await updateDoc(penguinRef, {
      expedition: null,
      inExpedition: false,
      expeditions: expeditionsCount,
    });
  });

  const userExpeditionRef = doc(
    firestore,
    `users/${uid}/expeditions`,
    expeditionId
  );
  const userExpeditionSnap = await getDoc(userExpeditionRef);

  const deleteUserExpeditionPromise = userExpeditionSnap.exists()
    ? deleteDoc(userExpeditionRef)
    : Promise.resolve();

  const updatedParticipants = expedition.participants.filter(
    (p) => p.userId !== uid
  );
  const totalPenguinsCount = updatedParticipants.reduce(
    (sum, p) => sum + p.penguinIds.length,
    0
  );

  const updateExpeditionPromise = updateDoc(expeditionRef, {
    participants: updatedParticipants,
    participantsCount: updatedParticipants.length,
    totalPenguinsCount,
    updatedAt: serverTimestamp(),
  });

  await Promise.all([
    ...penguinUpdatePromises,
    deleteUserExpeditionPromise,
    updateExpeditionPromise,
  ]);

  return NextResponse.json({ success: true });
}
