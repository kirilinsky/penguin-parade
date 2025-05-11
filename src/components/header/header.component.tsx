"use client";

import React from "react";
import { HeaderLinks, HeaderWrapper } from "./header.component.styled";
import Link from "next/link";
import { useAtomValue, useSetAtom } from "jotai";
import { loggedInAtom, userIdAtom, userNameAtom } from "@/atoms/user/user.atom";

const HeaderComponent = () => {
  const loggedIn = useAtomValue(loggedInAtom);
  const setUserName = useSetAtom(userNameAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);
  const setUserId = useSetAtom(userIdAtom);

  const logOutHandler = () => {
    setUserId(null);
    setLoggedIn(false);
    setUserName(null);
  };

  return (
    <HeaderWrapper>
      <HeaderLinks>
        {loggedIn ? (
          <>
            <Link href="/countdown">Generate!</Link>
            <Link href="/mylibrary">My library</Link>
            <Link href="/friends">Friends</Link>
            <Link onClick={logOutHandler} href="/">
              Log out
            </Link>
          </>
        ) : (
          <>
            <Link href="/signup">Sign up</Link>
            <Link href="/login">Login</Link>
          </>
        )}
      </HeaderLinks>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
