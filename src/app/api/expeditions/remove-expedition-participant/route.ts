import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { adminAuth } from "@/fireBase-admin";
import {
  Expedition,
  ExpeditionParticipantUser,
} from "@/types/expeditions.types";

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

  const { expeditionId, imageId } = await req.json();

  if (!expeditionId || !imageId) {
    return NextResponse.json(
      { error: "Missing expeditionId or imageId" },
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

  const existingParticipant = expedition.participants.find(
    (p) => p.userId === uid
  );
  if (!existingParticipant) {
    return NextResponse.json(
      { error: "User is not a participant" },
      { status: 404 }
    );
  }

  const updatedPenguinIds = existingParticipant.penguinIds.filter(
    (id) => id !== imageId
  );

  let updatedParticipants: ExpeditionParticipantUser[] = expedition.participants
    .map((p) =>
      p.userId === uid ? { ...p, penguinIds: updatedPenguinIds } : p
    )
    .filter((p) => p.penguinIds.length > 0);

  await updateDoc(expeditionRef, {
    participants: updatedParticipants,
    updatedAt: serverTimestamp(),
  });

  const userExpeditionRef = doc(
    firestore,
    `users/${uid}/expeditions`,
    expeditionId
  );
  const userExpeditionSnap = await getDoc(userExpeditionRef);
  if (userExpeditionSnap.exists()) {
    const userExpeditionData = userExpeditionSnap.data();
    const updatedPenguins = (userExpeditionData.penguins || []).filter(
      (p: any) => p.id !== imageId
    );

    if (updatedPenguins.length > 0) {
      await setDoc(
        userExpeditionRef,
        {
          penguins: updatedPenguins,
          updatedAt: new Date(),
        },
        { merge: true }
      );
    } else {
      await deleteDoc(userExpeditionRef);
    }
  }

  return NextResponse.json({ success: true });
}
