import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userDetailsAtom } from "@/atoms/user/user.atom";
import { FriendWithUser } from "@/types/friends.types";
import { FriendData } from "@/types/user.types";

export function useGetFriends(): {
  friends: FriendWithUser[];
  sentRequests: FriendData[];
  incomingRequests: FriendData[];
  loading: boolean;
  refetch: () => Promise<void>;
} {
  const user = useAtomValue(userDetailsAtom);
  const [friends, setFriends] = useState<FriendWithUser[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendData[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllFriends = async () => {
    if (!user?.id) return;
    setLoading(true);

    try {
      const res = await fetch(`/api/friends/get-friends?uid=${user.id}`);
      if (!res.ok) throw new Error("Failed to fetch friends");

      const data = await res.json();
      setFriends(data.friends || []);
      setSentRequests(data.sentRequests || []);
      setIncomingRequests(data.incomingRequests || []);
    } catch (err) {
      console.error("Failed to load friends:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) fetchAllFriends();
  }, [user?.id]);

  return {
    friends,
    sentRequests,
    incomingRequests,
    loading,
    refetch: fetchAllFriends,
  };
}
