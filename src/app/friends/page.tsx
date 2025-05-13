"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import FriendsListBlockComponent from "@/components/friends-list-block/friends-list-block.component";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import { firestore } from "@/firebase";
import { Friend, User } from "@/types/friends.types";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FriendsPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [sentRequests, setSentRequests] = useState<any[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!search.trim()) return;
    const lowercase_search = search.toLowerCase();

    const usersRef = collection(firestore, "users");
    /* TODO: filter existing friends */
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

  const handleCancelRequest = async (user: User) => {
    if (!uid || !user) return;

    const currentUserRef = doc(firestore, "users", uid);
    await updateDoc(currentUserRef, {
      sentRequests: sentRequests.filter((req) => req.id !== user.id),
    });

    const firendRef = doc(firestore, "users", user.id);
    await updateDoc(firendRef, {
      friendRequests: arrayRemove({ id: uid }),
    });
  };

  const hasSentRequest = (userId: string) => {
    return sentRequests.some((req) => req.id === userId);
  };

  const initFriendsPage = async () => {
    if (!uid) return;
    const friendsSnap = await getDocs(
      collection(firestore, `users/${uid}/friends`)
    );
    const friendRecords: Friend[] = friendsSnap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        gifted: data.gifted,
        exchanged: data.exchanged,
        addedAt: data.addedAt.toDate(),
      };
    });
    setFriends(friendRecords);

    const userDoc = await getDoc(doc(firestore, "users", uid));
    const userData = userDoc.data();

    if (userData) {
      setSentRequests(userData.sentRequests ?? []);
      setIncomingRequests(userData.friendRequests ?? []);
    }
  };

  const handleAddFriend = async (user: any) => {
    if (!uid) return;
    console.log(user, "user selected");

    const timestamp = new Date();

    const targetUserRef = doc(firestore, "users", user.id);

    await updateDoc(targetUserRef, {
      friendRequests: arrayUnion({ id: uid, sentAt: timestamp }),
    });

    const currentUserRef = doc(firestore, "users", uid);

    await updateDoc(currentUserRef, {
      sentRequests: arrayUnion({
        id: user.id,
        sentAt: timestamp,
      }),
    });

    initFriendsPage();
  };

  useEffect(() => {
    if (!uid) return;

    initFriendsPage();
  }, [uid]);

  return (
    <PageContentWrapperComponent>
      <FriendsListBlockComponent friends={friends} />
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
            <li key={req.id} style={{ marginBottom: "1rem" }}>
              <strong>{req.username}</strong>
              <p>Sent: {req.sentAt?.toDate?.().toLocaleString?.() || "-"}</p>
            </li>
          ))}
        </ul>
      </PageContentBlockStyled>
      <PageContentBlockStyled>
        <h2>Sent Friend Requests ({sentRequests.length})</h2>
        <ul>
          {sentRequests.map((req) => (
            <li key={req.id} style={{ marginBottom: "1rem" }}>
              <img
                src={req.avatar}
                alt={req.username}
                style={{ width: 50, height: 50, borderRadius: "50%" }}
              />
              <div>
                <strong>{req.username}</strong>
                <p>Sent: {req.sentAt?.toDate?.().toLocaleString?.() || "-"}</p>
              </div>
            </li>
          ))}
        </ul>
      </PageContentBlockStyled>
    </PageContentWrapperComponent>
  );
};

export default FriendsPage;
