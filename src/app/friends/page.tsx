"use client";

import { userIdAtom } from "@/atoms/user/user.atom";
import { firestore } from "@/firebase";
import { Friend, User } from "@/types/friends.types";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAtomValue } from "jotai";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FriendsPage = () => {
  const uid = useAtomValue(userIdAtom);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const handleSearch = async () => {
    if (!search.trim()) return;

    const usersRef = collection(firestore, "users");
    const q = query(
      usersRef,
      where("username", ">=", search),
      where("username", "<=", search + "\uf8ff")
    );
    const snap = await getDocs(q);
    const results = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as User[];
    setSearchResults(results);
    console.log(results, "results1");
  };

  useEffect(() => {
    if (!uid) return;

    const fetchFriends = async () => {
      const ref = collection(firestore, `users/${uid}/friends`);
      const snap = await getDocs(ref);
      const data = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Friend[];
      setFriends(data);
    };

    fetchFriends();
  }, [uid]);

  return (
    <div>
      <h1>Your Friends</h1>
      <p>add new</p>
      <div style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((user) => (
              <li key={user.id} style={{ marginBottom: "1rem" }}>
                <Image
                  src={user.avatar ?? "/template.png"}
                  alt={user.username}
                  width={44}
                  height={44}
                  style={{ borderRadius: "50%" }}
                />
                <div>
                  <strong>{user.username}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <hr />
      {friends.length ? (
        <ul>
          {friends.map((friend) => (
            <li key={friend.id} style={{ marginBottom: "1rem" }}>
              {/*
              TODO: create avatars
               */}
              <Image
                src={friend.avatar ?? "/template.png"}
                alt={friend.name}
                width={44}
                height={44}
                style={{ borderRadius: "50%" }}
              />
              <div>
                <strong>{friend.name}</strong>
                <p>Gifted: {friend.gifted}</p>
                <p>Exchanged: {friend.exchanged}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>you don't have friends yet!</p>
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
