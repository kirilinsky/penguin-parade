"use client";

import { userNameAtom } from "@/atoms/user/user.atom";
import { LinkStyled } from "@/components/link/link.component.styled";
import { useAtomValue } from "jotai";

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
          <LinkStyled title="generate new" href={"/countdown"}>
            Generate new!
          </LinkStyled>
        </div>
      ) : (
        <p>
          please <a href="/login">login</a>
        </p>
      )}

      <div>last generated:</div>
      <div>total count:</div>
      <div>friends:</div>
      <div>auction:</div>
      <div>
        Current Avatar:
        <br />
        <button>reset</button>
      </div>
    </div>
  );
}
