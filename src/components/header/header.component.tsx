"use client";

import React from "react";
import { HeaderLinks, HeaderWrapper } from "./header.component.styled";
import Link from "next/link";
import { useAtomValue, useSetAtom } from "jotai";
import {
  avatarAtom,
  avatarScaleAtom,
  loggedInAtom,
  userIdAtom,
  userNameAtom,
} from "@/atoms/user/user.atom";
import HeaderBioComponent from "../header-bio/header-bio.component";

const HeaderComponent = () => {
  const username = useAtomValue(userNameAtom);
  const avatar = useAtomValue(avatarAtom);
  const avatarScale = useAtomValue(avatarScaleAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const uid = useAtomValue(userIdAtom);
  const setUserName = useSetAtom(userNameAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);
  const setUserId = useSetAtom(userIdAtom);

  const logOutHandler = () => {
    setUserId(null);
    setLoggedIn(false);
    setUserName(null);
  };
  // TODO: add dynamic routes
  return (
    <HeaderWrapper>
      <HeaderLinks>
        {loggedIn ? (
          <>
            <Link href="/countdown">Craft!</Link>
            <Link href={`/library/${uid}`}>My Penguins</Link>
            <Link href="/friends">Friends</Link>
            <Link href="/evolve">Evolve</Link>
            <Link href="/auction">Auction</Link>
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
      {loggedIn && (
        <HeaderBioComponent
          avatarScale={avatarScale}
          avatar={avatar}
          username={username}
        />
      )}
    </HeaderWrapper>
  );
};

export default HeaderComponent;
