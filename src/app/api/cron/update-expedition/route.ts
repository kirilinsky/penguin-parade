import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import { Timestamp } from "firebase/firestore";

export async function GET(req: NextRequest) {
  /* TODO add secure header to cron operator */
  try {
    const expeditionsRef = collection(firestore, "expeditions");
    const now = new Date();
    /* TODO end expeditions with 0 participants */
    const preparingSnap = await getDocs(
      query(expeditionsRef, where("state", "==", "preparing"))
    );
    const toActivate = preparingSnap.docs.filter((doc) => {
      const data = doc.data();
      const startTime = (data.activePhaseStartedAt as Timestamp).toDate();
      return now >= startTime;
    });

    for (const docSnap of toActivate) {
      const id = docSnap.id;
      console.log(`[CRON] Expedition ${id} set as ACTIVE`);
      await updateDoc(doc(firestore, "expeditions", id), {
        state: "active",
      });
    }

    const activeSnap = await getDocs(
      query(expeditionsRef, where("state", "==", "active"))
    );
    const toEnd = activeSnap.docs.filter((doc) => {
      const data = doc.data();
      const endTime = (data.activePhaseEndedAt as Timestamp).toDate();
      return now >= endTime;
    });

    for (const docSnap of toEnd) {
      const expedition = docSnap.data();
      const expeditionId = docSnap.id;

      console.log(`[CRON] Expedition ${expeditionId} to ENDED`);
      await updateDoc(doc(firestore, "expeditions", expeditionId), {
        state: "ended",
        endedAt: serverTimestamp(),
      });

      const participants = expedition.participants || [];
      for (const p of participants) {
        const notifRef = doc(
          firestore,
          "users",
          p.userId,
          "notifications",
          `${expeditionId}_expedition`
        );

        await setDoc(notifRef, {
          type: "expedition_complete",
          createdAt: new Date(),
          read: false,
          payload: { expeditionId },
          message: {
            ru: "Экспедиция завершена! Забери свою награду.",
            en: "The expedition has ended! Claim your reward.",
          },
        });
      }
    }

    return NextResponse.json({
      success: true,
      updatedPreparing: toActivate.length,
      updatedEnded: toEnd.length,
    });
  } catch (err) {
    console.error("[CRON] Update expedition status:", err);
    return NextResponse.json(
      { error: "Failed to process expeditions" },
      { status: 500 }
    );
  }
}
