"use client";

import React, { useEffect, useState } from "react";
import {
  HeaderLinks,
  HeaderOpenMobileMenuButton,
  HeaderWrapper,
} from "./header.component.styled";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  hasUnreadNotificationsAtom,
  loggedInAtom,
} from "@/atoms/user/user.atom";
import HeaderBioComponent from "../header-bio/header-bio.component";
import { useUserDetails } from "@/hooks/use-user-details";
import MobileMenuComponent from "../mobile-menu/mobile-menu.component";
import NavigationLinksComponent from "../navigation-links/navigation-links.component";

const HeaderComponent = () => {
  const { user, refreshUser, logOut } = useUserDetails();
  const [hasUnread] = useAtom(hasUnreadNotificationsAtom);

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const loggedIn = useAtomValue(loggedInAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);

  const closeMoblieMenu = () => {
    setShowMobileMenu(false);
  };

  const logOutHandler = () => {
    setLoggedIn(false);
    logOut();
  };

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "unset";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [showMobileMenu]);

  useEffect(() => {
    refreshUser();
  }, []);
  return (
    <HeaderWrapper>
      {showMobileMenu && (
        <MobileMenuComponent
          user={user}
          hasUnread={hasUnread}
          closeMoblieMenu={closeMoblieMenu}
          logOutHandler={logOutHandler}
          loggedIn={loggedIn}
        />
      )}
      <HeaderLinks>
        <NavigationLinksComponent
          user={user}
          hasUnread={hasUnread}
          logOutHandler={logOutHandler}
          loggedIn={loggedIn}
        />
      </HeaderLinks>
      {loggedIn && user && (
        <HeaderBioComponent
          avatarScale={user.avatarScale}
          avatar={user.avatar}
          username={user.username}
          coins={user.coins}
        />
      )}
      <HeaderOpenMobileMenuButton onClick={() => setShowMobileMenu(true)}>
        menu
      </HeaderOpenMobileMenuButton>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
