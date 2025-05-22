"use client";

import FriendsListBlockComponent from "@/components/friends-list-block/friends-list-block.component";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import UserListItemComponent from "@/components/user-list-item/user-list-item.component";
import { firestore } from "@/firebase";
import { useGetFriends } from "@/hooks/use-get-friends";
import { useUserDetails } from "@/hooks/use-user-details";
import { FriendData, User } from "@/types/friends.types";
import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";

const FriendsPage = () => {
  const { user: currentUser } = useUserDetails();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const {
    friends,
    sentRequests,
    incomingRequests,
    loading: friendsLoading,
    refetch: friendsRefetch,
  } = useGetFriends();

  const handleSearch = async () => {
    if (!search.trim() || !currentUser) return;
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

  const handleCancelRequest = async (user: User) => {
    if (!currentUser) return;

    const currentUserRef = doc(firestore, "users", currentUser.id);
    const targetUserRef = doc(firestore, "users", user.id);

    await updateDoc(currentUserRef, {
      sentRequests: sentRequests.filter((req) => req.id !== user.id),
    });

    const targetUserSnap = await getDoc(targetUserRef);
    const targetUserData = targetUserSnap.data();

    const cleanedIncoming = (targetUserData?.friendRequests || []).filter(
      (req: any) => req.id !== currentUser.id
    );

    await updateDoc(targetUserRef, {
      friendRequests: cleanedIncoming,
    });

    friendsRefetch();
  };

  const handleDeclineRequest = async (user: User) => {
    if (!currentUser || !user) return;

    const currentUserRef = doc(firestore, "users", currentUser.id);
    await updateDoc(currentUserRef, {
      friendRequests: sentRequests.filter(
        (req: FriendData) => req.id !== user.id
      ),
    });

    const friendRef = doc(firestore, "users", user.id);
    await updateDoc(friendRef, {
      sentRequests: arrayRemove({ id: currentUser.id }),
    });

    friendsRefetch();
  };

  const handleAcceptRequest = async (user: User) => {
    if (!currentUser || !user?.id) return;

    const now = new Date();

    const currentUserRef = doc(firestore, "users", currentUser.id);
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
      (req: any) => req.id !== currentUser.id
    );

    await updateDoc(targetUserRef, {
      sentRequests: cleanedSent,
    });

    const myFriendDoc = doc(
      firestore,
      `users/${currentUser.id}/friends/${user.id}`
    );
    const theirFriendDoc = doc(
      firestore,
      `users/${user.id}/friends/${currentUser.id}`
    );

    const friendData = {
      giftsReceived: 0,
      giftsSent: 0,
      addedAt: now,
    };

    await Promise.all([
      setDoc(myFriendDoc, friendData),
      setDoc(theirFriendDoc, friendData),
    ]);

    friendsRefetch();
  };

  const hasSentRequest = (userId: string) => {
    return sentRequests.some((req: FriendData) => req.id === userId);
  };

  const handleAddFriend = async (user: User) => {
    if (!currentUser) return;

    const timestamp = new Date();
    const targetUserRef = doc(firestore, "users", user.id);
    await updateDoc(targetUserRef, {
      friendRequests: arrayUnion({ id: currentUser.id, sentAt: timestamp }),
    });

    const currentUserRef = doc(firestore, "users", currentUser.id);
    await updateDoc(currentUserRef, {
      sentRequests: arrayUnion({ id: user.id, sentAt: timestamp }),
    });

    friendsRefetch();
  };

  const handleRemoveFriend = async (targetId: string) => {
    if (!currentUser || !targetId) return;

    const myFriendRef = doc(
      firestore,
      `users/${currentUser.id}/friends/${targetId}`
    );
    const theirFriendRef = doc(
      firestore,
      `users/${targetId}/friends/${currentUser.id}`
    );

    await Promise.all([deleteDoc(myFriendRef), deleteDoc(theirFriendRef)]);

    friendsRefetch();
  };

  console.log(friends, "friends");

  return (
    <PageContentWrapperComponent>
      <FriendsListBlockComponent
        onRemove={handleRemoveFriend}
        friends={friends}
        friendsLoading={friendsLoading}
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
        <button onClick={handleSearch}>Search Friend</button>

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
                    width={45}
                    height={45}
                    style={{ borderRadius: "50%" }}
                    unoptimized={!!user.avatar}
                  />
                  <div>
                    <strong>{user.username}</strong>
                    <br />
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
