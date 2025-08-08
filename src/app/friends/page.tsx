"use client";

import FriendsListBlockComponent from "@/components/friends-list-block/friends-list-block.component";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import { PageContentBlockStyled } from "@/components/page-content-block/page-content-block.component.styled";
import { PageContentWrapperComponent } from "@/components/page-content-wrapper/page-content-wrapper.component";
import UserListItemComponent from "@/components/user-list-item/user-list-item.component";
import { firestore } from "@/firebase";
import { toast } from "react-toastify";
import { getIdToken } from "@/helpers/get-token/get-token";
import { useGetFriends } from "@/hooks/use-get-friends";
import { useUserDetails } from "@/hooks/use-user-details";
import { FriendData, User } from "@/types/user.types";
import {
  arrayRemove,
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
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import {
  AsideSection,
  FriendsGalleryWrapper,
  GallerySection,
} from "@/components/friends-gallery/friends-gallery.component.styled";
import FriendSearchComponent from "@/components/friend-search/friend-search.component";
import FriendRequestsBlock from "@/components/friend-requests-block/friend-requests-block.component";

const FriendsPage = () => {
  const { user: currentUser } = useUserDetails();
  const t = useTranslations("friendsPage");
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
    const allResults = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];

    const friendIds = friends.map(({ id }) => id);
    const filtered = allResults.filter(
      (user) => user.id !== currentUser.id && !friendIds.includes(user.id)
    );
    setSearchResults(filtered);
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
    try {
      const token = await getIdToken();

      const res = await fetch("/api/friends/add-friend", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetUserId: user.id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send friend request");
      }
      toast.success("Friend request sent!");
      friendsRefetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to send friend request");
      console.error("addFriend error:", err);
      return { success: false, error: err.message || "Unknown error" };
    }
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
  return (
    <FriendsGalleryWrapper>
      <GallerySection>
        <FriendsListBlockComponent
          onRemove={handleRemoveFriend}
          friends={friends}
          friendsLoading={friendsLoading}
        />
      </GallerySection>

      <AsideSection>
        <FriendSearchComponent
          searchValue={search}
          onSearchChange={(searchValue) => setSearch(searchValue)}
          onSearchClick={handleSearch}
          searchResults={searchResults}
          hasSentRequest={hasSentRequest}
          onCancelRequest={(user) => handleCancelRequest(user)}
          onAddFriend={(user) => handleAddFriend(user)}
        />
        <FriendRequestsBlock
          requests={incomingRequests}
          incoming={true}
          onCancel={handleCancelRequest}
          onDecline={handleDeclineRequest}
          onAccept={handleAcceptRequest}
        />

        <FriendRequestsBlock
          requests={sentRequests}
          incoming={false}
          onCancel={handleCancelRequest}
          onDecline={handleDeclineRequest}
          onAccept={handleAcceptRequest}
        />
      </AsideSection>
    </FriendsGalleryWrapper>
  );
};

export default FriendsPage;
