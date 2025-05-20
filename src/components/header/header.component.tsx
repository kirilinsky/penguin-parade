"use client";

import React from "react";
import { HeaderLinks, HeaderWrapper } from "./header.component.styled";
import Link from "next/link";
import { useAtomValue, useSetAtom } from "jotai";
import { loggedInAtom } from "@/atoms/user/user.atom";
import HeaderBioComponent from "../header-bio/header-bio.component";
import { useUserDetails } from "@/hooks/use-user-details";

const HeaderComponent = () => {
  const { user, logOut } = useUserDetails();
  const loggedIn = useAtomValue(loggedInAtom);

  const setLoggedIn = useSetAtom(loggedInAtom);

  const logOutHandler = () => {
    setLoggedIn(false);
    logOut();
  };
  // TODO: add dynamic routes
  return (
    <HeaderWrapper>
      <HeaderLinks>
        {user && loggedIn ? (
          <>
            <Link href="/countdown">Craft!</Link>
            <Link href={`/library/${user.id}`}>My Penguins</Link>
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
      {loggedIn && user && (
        <HeaderBioComponent
          avatarScale={user.avatarScale}
          avatar={user.avatar}
          username={user.username}
        />
      )}
    </HeaderWrapper>
  );
};

export default HeaderComponent;
