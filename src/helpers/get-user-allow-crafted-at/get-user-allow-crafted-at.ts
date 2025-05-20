import { doc, getDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebase";
import { User } from "@/types/friends.types";

export async function getUserAllowCraftedAt(
  user: User | null
): Promise<Timestamp | undefined> {
  if (!user) return;

  const userDoc = await getDoc(doc(firestore, "users", user.id));

  const data = userDoc.data();
  if (!data) return;

  const last = data.allowCraftAt;

  return last instanceof Timestamp
    ? last
    : Timestamp.fromMillis(
        last.seconds * 1000 + Math.floor(last.nanoseconds / 1_000_000)
      );
}
