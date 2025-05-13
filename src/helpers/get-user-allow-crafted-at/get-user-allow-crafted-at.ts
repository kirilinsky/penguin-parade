import { doc, getDoc, Timestamp } from "firebase/firestore";
import { firestore } from "@/firebase"; // путь адаптируй под себя

export async function getUserAllowCraftedAt(uid: string): Promise<number> {
  const userDoc = await getDoc(doc(firestore, "users", uid));

  const now = new Date();
  if (!userDoc.exists()) return now.getTime();

  const data = userDoc.data();
  const last = data.allowCraftAt;
  return last;
}
