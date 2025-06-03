import { NextRequest, NextResponse } from "next/server";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { adminAuth } from "@/fireBase-admin";
import {
  Expedition,
  ExpeditionParticipantUser,
} from "@/types/expeditions.types";
import { UserExpeditionItemPenguin } from "@/types/user.types";

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

  if (expedition.state !== "preparing") {
    return NextResponse.json(
      { error: "Expedition is not in preparation phase" },
      { status: 403 }
    );
  }

  const penguinRef = doc(firestore, "images", imageId);
  const penguinSnap = await getDoc(penguinRef);

  if (!penguinSnap.exists()) {
    return NextResponse.json({ error: "Penguin not found" }, { status: 404 });
  }

  const penguin = penguinSnap.data();
  if (penguin.ownerId !== uid) {
    return NextResponse.json({ error: "Not your penguin" }, { status: 403 });
  }

  const penguinScale = penguin.settings?.rarity;
  const allowedTypes = expedition.preset.allowedTypes || [];

  if (!allowedTypes.includes(penguinScale)) {
    return NextResponse.json(
      {
        error: `Penguin of type ${penguinScale} not allowed in this expedition`,
      },
      { status: 400 }
    );
  }

  const existingParticipant = expedition.participants.find(
    (p) => p.userId === uid
  );
  const existingPenguins = existingParticipant?.penguinIds || [];
  const userPenguinCount = existingPenguins.length;

  if (existingPenguins.includes(imageId)) {
    return NextResponse.json(
      { error: "Penguin already added" },
      { status: 409 }
    );
  }

  if (userPenguinCount + 1 > expedition.maxParticipants) {
    return NextResponse.json(
      { error: "User penguin limit exceeded" },
      { status: 400 }
    );
  }

  const updatedParticipants: ExpeditionParticipantUser[] = [
    ...expedition.participants,
  ];
  const userIndex = updatedParticipants.findIndex((p) => p.userId === uid);

  if (userIndex >= 0) {
    updatedParticipants[userIndex].penguinIds.push(imageId);
  } else {
    updatedParticipants.push({
      userId: uid,
      penguinIds: [imageId],
      submittedAt: new Date(),
    });
  }

  await updateDoc(expeditionRef, {
    participants: updatedParticipants,
    participantsCount: updatedParticipants.length,
    updatedAt: serverTimestamp(),
  });

  const userExpeditionRef = doc(
    firestore,
    `users/${uid}/expeditions`,
    expeditionId
  );

  const newPenguinItem: UserExpeditionItemPenguin = {
    id: imageId,
    imageUrl: penguin.imageUrl || "",
  };

  const expeditionDoc = await getDoc(userExpeditionRef);
  let updatedPenguins = [newPenguinItem];

  if (expeditionDoc.exists()) {
    const existingData = expeditionDoc.data();
    const existingPenguins = existingData.penguins || [];
    const alreadyExists = existingPenguins.some((p: any) => p.id === imageId);

    if (!alreadyExists) {
      updatedPenguins = [...existingPenguins, newPenguinItem];
    } else {
      updatedPenguins = existingPenguins;
    }
  }

  await setDoc(
    userExpeditionRef,
    {
      expeditionId,
      expeditionScale: expedition.level,
      participantsScale: penguinScale,
      expeditionTitle: expedition.settings.title,
      expeditionState: expedition.state,
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
