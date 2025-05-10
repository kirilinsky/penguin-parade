import { firestore } from "@/firebase";
import { doc, getDoc, Timestamp } from "firebase/firestore";

export async function getUserLastGeneratedAt(
  uid: string
): Promise<Date | null> {
  const userDoc = await getDoc(doc(firestore, "users", uid));

  if (!userDoc.exists()) return null;

  const data = userDoc.data();
  const last = data.lastGeneratedAt;

  return last instanceof Timestamp ? last.toDate() : null;
}
