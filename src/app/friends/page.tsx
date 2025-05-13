"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import FriendsListBlockComponent from "@/components/friends-list-block/friends-list-block.component";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import UserListItemComponent from "@/components/user-list-item/user-list-item.component";
import { firestore } from "@/firebase";
import { Friend, FriendData, RequestRecord, User } from "@/types/friends.types";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function extractUniqueUserIds(
  incoming: { id: string }[],
  sent: { id: string }[],
  friends: { id: string }[]
): string[] {
  const allIds = [...incoming, ...sent, ...friends].map((r) => r.id);
  return Array.from(new Set(allIds));
}

async function fetchUsersByIds(uids: string[]) {
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

const FriendsPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [sentRequests, setSentRequests] = useState<FriendData[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<FriendData[]>([]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    const lowercase_search = search.toLowerCase();

    const usersRef = collection(firestore, "users");
    const q = query(
      usersRef,
      where("username_lowercase", ">=", lowercase_search),
      where("username_lowercase", "<=", lowercase_search + "\uf8ff")
    );
    const snap = await getDocs(q);
    const results = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
    setSearchResults(results);
  };

  const initFriendsPage = async () => {
    if (!uid) return;

    const friendsSnap = await getDocs(
      collection(firestore, `users/${uid}/friends`)
    );
    const friendRecords: Friend[] = friendsSnap.docs.map((d) => ({
      id: d.id,
      gifted: d.data().gifted,
      exchanged: d.data().exchanged,
      addedAt: d.data().addedAt.toDate(),
    }));

    const userDoc = await getDoc(doc(firestore, "users", uid));
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
  };

  const handleCancelRequest = async (user: User) => {
    if (!uid || !user) return;

    const currentUserRef = doc(firestore, "users", uid);
    await updateDoc(currentUserRef, {
      sentRequests: sentRequests.filter((req) => req.id !== user.id),
    });

    const friendRef = doc(firestore, "users", user.id);

    const targetUserRef = doc(firestore, "users", user.id);

    const targetUserSnap = await getDoc(targetUserRef);
    const targetUserData = targetUserSnap.data();

    const cleanedIncoming = (targetUserData?.friendRequests || []).filter(
      (req: any) => req.id !== user.id
    );

    await updateDoc(currentUserRef, {
      friendRequests: cleanedIncoming,
    });
    await updateDoc(friendRef, {
      friendRequests: arrayRemove({ id: uid }),
    });

    initFriendsPage();
  };

  const handleDeclineRequest = async (user: User) => {
    if (!uid || !user) return;

    const currentUserRef = doc(firestore, "users", uid);
    await updateDoc(currentUserRef, {
      friendRequests: sentRequests.filter((req) => req.id !== user.id),
    });

    const friendRef = doc(firestore, "users", user.id);
    await updateDoc(friendRef, {
      sentRequests: arrayRemove({ id: uid }),
    });

    initFriendsPage();
  };

  const handleAcceptRequest = async (user: User) => {
    if (!uid || !user?.id) return;

    const now = new Date();

    const currentUserRef = doc(firestore, "users", uid);
    const targetUserRef = doc(firestore, "users", user.id);

    const currentUserSnap = await getDoc(currentUserRef);
    const currentData = currentUserSnap.data();

    const cleanedIncoming = (currentData?.friendRequests || []).filter(
      (req: any) => req.id !== user.id
    );

    await updateDoc(currentUserRef, {
      friendRequests: cleanedIncoming,
    });

    const targetUserSnap = await getDoc(targetUserRef);
    const targetData = targetUserSnap.data();

    const cleanedSent = (targetData?.sentRequests || []).filter(
      (req: any) => req.id !== uid
    );

    await updateDoc(targetUserRef, {
      sentRequests: cleanedSent,
    });

    const myFriendDoc = doc(firestore, `users/${uid}/friends/${user.id}`);
    const theirFriendDoc = doc(firestore, `users/${user.id}/friends/${uid}`);

    const friendData = {
      gifted: 0,
      exchanged: 0,
      addedAt: now,
    };

    await Promise.all([
      setDoc(myFriendDoc, friendData),
      setDoc(theirFriendDoc, friendData),
    ]);

    initFriendsPage();
  };

  const hasSentRequest = (userId: string) => {
    return sentRequests.some((req) => req.id === userId);
  };

  const handleAddFriend = async (user: User) => {
    if (!uid) return;

    const timestamp = new Date();

    const targetUserRef = doc(firestore, "users", user.id);
    await updateDoc(targetUserRef, {
      friendRequests: arrayUnion({ id: uid, sentAt: timestamp }),
    });

    const currentUserRef = doc(firestore, "users", uid);
    await updateDoc(currentUserRef, {
      sentRequests: arrayUnion({ id: user.id, sentAt: timestamp }),
    });

    initFriendsPage();
  };

  const handleRemoveFriend = async (targetId: string) => {
    if (!uid || !targetId) return;

    const myFriendRef = doc(firestore, `users/${uid}/friends/${targetId}`);
    const theirFriendRef = doc(firestore, `users/${targetId}/friends/${uid}`);

    await Promise.all([deleteDoc(myFriendRef), deleteDoc(theirFriendRef)]);

    initFriendsPage();
  };

  useEffect(() => {
    if (uid) initFriendsPage();
  }, [uid]);

  return (
    <PageContentWrapperComponent>
      <FriendsListBlockComponent
        onRemove={handleRemoveFriend}
        friends={friends}
      />
      <PageContentBlockStyled>
        <h2>Add new Friend</h2>
        <input
          type="text"
          style={{ padding: "10px", marginBlock: "10px" }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name"
        />
        <button onClick={handleSearch}>Search</button>

        {searchResults.length > 0 && (
          <div>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((user) => (
                <li
                  key={user.id}
                  style={{ display: "flex", marginBottom: "1rem" }}
                >
                  <Image
                    src={user.avatar ?? "/template.png"}
                    alt={user.username}
                    width={44}
                    height={44}
                    style={{ borderRadius: "50%" }}
                  />
                  <div>
                    <strong>{user.username}</strong>
                    {hasSentRequest(user.id) ? (
                      <>
                        <span>requested</span>
                        <br />
                        <button onClick={() => handleCancelRequest(user)}>
                          Cancel Request
                        </button>
                      </>
                    ) : (
                      <button onClick={() => handleAddFriend(user)}>
                        Add Friend
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageContentBlockStyled>

      <PageContentBlockStyled>
        <h2>Incoming Requests ({incomingRequests.length})</h2>
        <ul>
          {incomingRequests.map((req) => (
            <UserListItemComponent
              onCancel={() => handleCancelRequest(req)}
              onDecline={() => handleDeclineRequest(req)}
              onAccept={() => handleAcceptRequest(req)}
              key={req.id}
              incoming={true}
              user={req}
            />
          ))}
        </ul>
      </PageContentBlockStyled>

      <PageContentBlockStyled>
        <h2>Sent Friend Requests ({sentRequests.length})</h2>
        <ul>
          {sentRequests.map((req) => (
            <UserListItemComponent
              onCancel={() => handleCancelRequest(req)}
              onDecline={() => handleDeclineRequest(req)}
              onAccept={() => handleAcceptRequest(req)}
              key={req.id}
              incoming={false}
              user={req}
            />
          ))}
        </ul>
      </PageContentBlockStyled>
    </PageContentWrapperComponent>
  );
};

export default FriendsPage;
