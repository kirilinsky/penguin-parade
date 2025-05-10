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
        <Link href="/">home</Link>
        <Link href="/countdown">countdown</Link>
        <Link href="/mylibrary">my library</Link>
        {loggedIn ? (
          <Link onClick={logOutHandler} href="/">
            log out
          </Link>
        ) : (
          <>
            <Link href="/signup">sign up</Link>
            <Link href="/login">login</Link>
          </>
        )}
      </HeaderLinks>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
