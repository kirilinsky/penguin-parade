import { firestore } from "@/firebase";
import { adminAuth } from "@/fireBase-admin";
import { Expedition } from "@/types/expeditions.types";
import { UserExpeditionItemPenguin } from "@/types/user.types";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

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

  const { expeditionId, imageIds } = await req.json();

  if (!expeditionId || !Array.isArray(imageIds) || imageIds.length === 0) {
    return NextResponse.json(
      { error: "Missing expeditionId or imageIds" },
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

  if (expedition.state !== "preparing") {
    return NextResponse.json(
      { error: "Expedition is not in preparation phase" },
      { status: 403 }
    );
  }

  const updatedParticipants = [...expedition.participants];
  const userIndex = updatedParticipants.findIndex((p) => p.userId === uid);
  const existingPenguins =
    userIndex >= 0 ? updatedParticipants[userIndex].penguinIds : [];

  const validPenguins: UserExpeditionItemPenguin[] = [];
  const newPenguinIds: string[] = [];
  const penguinUpdatePromises: Promise<any>[] = [];

  for (const imageId of imageIds) {
    const penguinRef = doc(firestore, "images", imageId);
    const penguinSnap = await getDoc(penguinRef);

    if (!penguinSnap.exists()) continue;

    const penguin = penguinSnap.data();
    if (penguin.ownerId !== uid) continue;

    const penguinScale = penguin.settings?.rarity;
    const allowedTypes = expedition.preset.allowedTypes || [];

    if (!allowedTypes.includes(penguinScale)) continue;
    if (existingPenguins.includes(imageId)) continue;

    validPenguins.push({ id: imageId, imageUrl: penguin.imageUrl || "" });
    newPenguinIds.push(imageId);

    penguinUpdatePromises.push(
      updateDoc(penguinRef, {
        expedition: expeditionId,
        inExpedition: true,
        expeditions: (penguin.expeditions || 0) + 1,
      })
    );
  }

  if (newPenguinIds.length === 0) {
    return NextResponse.json(
      { error: "No valid penguins to add" },
      { status: 400 }
    );
  }

  if (userIndex >= 0) {
    updatedParticipants[userIndex].penguinIds.push(...newPenguinIds);
  } else {
    updatedParticipants.push({
      userId: uid,
      penguinIds: newPenguinIds,
      submittedAt: new Date(),
    });
  }

  const totalPenguinsCount = updatedParticipants.reduce(
    (sum, p) => sum + p.penguinIds.length,
    0
  );

  await updateDoc(expeditionRef, {
    participants: updatedParticipants,
    participantsCount: updatedParticipants.length,
    totalPenguinsCount,
    updatedAt: serverTimestamp(),
  });

  await Promise.all(penguinUpdatePromises);

  const userExpeditionRef = doc(
    firestore,
    `users/${uid}/expeditions`,
    expeditionId
  );
  const expeditionDoc = await getDoc(userExpeditionRef);
  let updatedPenguins = [...validPenguins];

  if (expeditionDoc.exists()) {
    const existingData = expeditionDoc.data();
    const existing = existingData.penguins || [];
    const existingIds = new Set(existing.map((p: any) => p.id));
    const newOnes = validPenguins.filter((p) => !existingIds.has(p.id));
    updatedPenguins = [...existing, ...newOnes];
  }

  await setDoc(
    userExpeditionRef,
    {
      expeditionId,
      expeditionScale: expedition.level,
      participantsScale: expedition.preset.allowedTypes[0],
      expeditionTitle: expedition.settings.title,
      penguins: updatedPenguins,
      joinedAt: new Date(),
      finishedAt: expedition.activePhaseEndedAt.toDate?.() || new Date(),
      rewardGold: 0,
      durationHours: expedition.durationHours,
    },
    { merge: true }
  );

  return NextResponse.json({ success: true });
}
