"use client";

import { userNameAtom } from "@/atoms/user/user.atom";
import { useAtomValue } from "jotai";
import Link from "next/link";

export default function Home() {
  const username = useAtomValue(userNameAtom);
  return (
    <div>
      <h1>🐧 Penguin Parade</h1>
      {username ? (
        <div>
          <p>Welcome, {username}!</p>
          <span>Here you can collect unique Penguins.</span>
          <br />
          <Link href={"/countdown"}>Generate new!</Link>
        </div>
      ) : (
        <p>
          please <a href="/login">login</a>
        </p>
      )}
    </div>
  );
}
