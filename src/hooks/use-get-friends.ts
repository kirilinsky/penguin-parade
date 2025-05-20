import { useEffect, useState } from "react";
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import {
  Friend,
  FriendData,
  FriendWithUser,
  RequestRecord,
  User,
} from "@/types/friends.types";
import { useAtomValue } from "jotai";
import { userDetailsAtom } from "@/atoms/user/user.atom";

function extractUniqueUserIds(
  incoming: { id: string }[],
  sent: { id: string }[],
  friends: { id: string }[]
): string[] {
  const allIds = [...incoming, ...sent, ...friends].map((r) => r.id);
  return Array.from(new Set(allIds));
}

async function fetchUsersByIds(uids: string[]): Promise<Record<string, User>> {
  const chunks = [];
  const users: Record<string, User> = {};

  for (let i = 0; i < uids.length; i += 10) {
    const chunk = uids.slice(i, i + 10);
    const q = query(
      collection(firestore, "users"),
      where(documentId(), "in", chunk)
    );
    chunks.push(getDocs(q));
  }

  const snapshots = await Promise.all(chunks);

  snapshots.forEach((snap) => {
    snap.docs.forEach((doc) => {
      users[doc.id] = { id: doc.id, ...doc.data() } as User;
    });
  });

  return users;
}

export function useGetFriends(): {
  friends: FriendWithUser[];
  sentRequests: FriendData[];
  incomingRequests: FriendData[];
  loading: boolean;
  refetch: () => Promise<void>;
} {
  const userDetails = useAtomValue(userDetailsAtom);
  const [friends, setFriends] = useState<FriendWithUser[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendData[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllFriends = async () => {
    if (!userDetails) return;
    setLoading(true);

    const friendsSnap = await getDocs(
      collection(firestore, `users/${userDetails.id}/friends`)
    );
    const friendRecords: Friend[] = friendsSnap.docs.map((d) => ({
      id: d.id,
      giftsReceived: d.data().giftsReceived,
      giftsSent: d.data().giftsSent,
      addedAt: d.data().addedAt.toDate(),
    }));

    const userDoc = await getDoc(doc(firestore, "users", userDetails.id));
    const userData = userDoc.data();

    const incoming = userData?.friendRequests ?? [];
    const sent = userData?.sentRequests ?? [];

    const allIds = extractUniqueUserIds(incoming, sent, friendRecords);
    const usersMap = await fetchUsersByIds(allIds);

    setIncomingRequests(
      incoming.map((r: RequestRecord) => ({ ...r, ...usersMap[r.id] }))
    );
    setSentRequests(
      sent.map((r: RequestRecord) => ({ ...r, ...usersMap[r.id] }))
    );
    setFriends(friendRecords.map((f) => ({ ...f, ...usersMap[f.id] })));

    setLoading(false);
  };

  useEffect(() => {
    if (userDetails) fetchAllFriends();
  }, [userDetails]);

  return {
    friends,
    sentRequests,
    incomingRequests,
    loading,
    refetch: fetchAllFriends,
  };
}
