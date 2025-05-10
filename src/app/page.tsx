"use client";

import { userNameAtom } from "@/atoms/user/user.atom";
import { useAtomValue } from "jotai";

export default function Home() {
  const username = useAtomValue(userNameAtom);
  return (
    <div>
      <h1>🐧 Penguin Parade</h1>
      {username ? (
        <p>welcome, {username}!</p>
      ) : (
        <p>
          please <a href="/login">login</a>
        </p>
      )}
    </div>
  );
}
