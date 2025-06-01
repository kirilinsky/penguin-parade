import { NextRequest, NextResponse } from "next/server";
import { firestore } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export async function GET(req: NextRequest) {
  try {
    const expeditionsRef = collection(firestore, "expeditions");

    const q = query(expeditionsRef, where("state", "!=", "ended"));

    const snapshot = await getDocs(q);
    const now = new Date();

    const results = snapshot.docs.map((doc) => {
      const data = doc.data();

      const preparationStartedAt = (
        data.preparationStartedAt as Timestamp
      ).toDate();
      const preparationEndedAt = (
        data.preparationEndedAt as Timestamp
      ).toDate();
      const activePhaseStartedAt = (
        data.activePhaseStartedAt as Timestamp
      ).toDate();
      const activePhaseEndedAt = (
        data.activePhaseEndedAt as Timestamp
      ).toDate();

      let expectedState = data.state;

      if (now >= activePhaseEndedAt) {
        expectedState = "ended";
      } else if (now >= activePhaseStartedAt) {
        expectedState = "active";
      } else if (now >= preparationStartedAt && now < preparationEndedAt) {
        expectedState = "preparing";
      } else {
        expectedState = "preparing"; // fallback
      }

      return {
        id: doc.id,
        currentState: data.state,
        expectedState,
        statusWillChange: data.state !== expectedState,
      };
    });

    results.forEach((r) => {
      console.log(
        `Expedition ${r.id}: current=${r.currentState}, expected=${r.expectedState}`
      );
    });

    return NextResponse.json({ checked: results.length, results });
  } catch (err) {
    console.error("Error checking expeditions:", err);
    return NextResponse.json(
      { error: "Failed to check expeditions" },
      { status: 500 }
    );
  }
}
