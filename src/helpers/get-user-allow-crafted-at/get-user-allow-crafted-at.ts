import { doc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { Timestamp } from "firebase-admin/firestore";

export async function getUserAllowCraftedAt(
  uid: string
): Promise<Timestamp | undefined> {
  const userDoc = await getDoc(doc(firestore, "users", uid));

  const data = userDoc.data();
  if (!data) {
    return;
  }
  const last = data.allowCraftAt;
  return last;
}
