export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";
import { firestore } from "@/fireBase-admin";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  if (!uid) {
    return NextResponse.json({ error: "Missing uid" }, { status: 400 });
  }

  try {
    const friendsSnap = await firestore
      .collection(`users/${uid}/friends`)
      .get();

    const friendRecords = friendsSnap.docs.map((d) => ({
      id: d.id,
      giftsReceived: d.data().giftsReceived,
      giftsSent: d.data().giftsSent,
      addedAt: (d.data().addedAt as Timestamp).toDate(),
    }));

    const userDoc = await firestore.collection("users").doc(uid).get();
    const userData = userDoc.data();

    const incoming = userData?.friendRequests ?? [];
    const sent = userData?.sentRequests ?? [];

    const allIds = Array.from(
      new Set([...incoming, ...sent, ...friendRecords].map((r) => r.id))
    );

    const users: Record<string, any> = {};
    for (let i = 0; i < allIds.length; i += 10) {
      const chunk = allIds.slice(i, i + 10);
      const snap = await firestore
        .collection("users")
        .where("__name__", "in", chunk)
        .get();

      snap.docs.forEach((doc) => {
        users[doc.id] = { id: doc.id, ...doc.data() };
      });
    }

    const incomingRequests = incoming.map((r: any) => ({
      ...r,
      ...users[r.id],
    }));
    const sentRequests = sent.map((r: any) => ({
      ...r,
      ...users[r.id],
    }));
    const friends = friendRecords.map((f: any) => ({
      ...f,
      ...users[f.id],
    }));

    return NextResponse.json({ friends, incomingRequests, sentRequests });
  } catch (err) {
    console.error("Failed to fetch friends:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
