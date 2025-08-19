import React from "react";
import {
  MobileMenuCloseButton,
  MobileMenuLinksContainer,
  MobileMenuWrap,
} from "./mobile-menu.component.styled";
import NavigationLinksComponent from "../navigation-links/navigation-links.component";
import { User } from "@/types/user.types";

const MobileMenuComponent = ({
  user,
  loggedIn,
  logOutHandler,
  closeMoblieMenu,
  hasUnread,
}: {
  user: User | null;
  loggedIn: boolean | null;
  hasUnread: boolean;
  logOutHandler: () => void;
  closeMoblieMenu: () => void;
}) => {
  return (
    <MobileMenuWrap>
      <MobileMenuCloseButton onClick={closeMoblieMenu}>
        close
      </MobileMenuCloseButton>
      <MobileMenuLinksContainer>
        <NavigationLinksComponent
          user={user}
          hasUnread={hasUnread}
          logOutHandler={logOutHandler}
          loggedIn={loggedIn}
          onClick={closeMoblieMenu}
        />
      </MobileMenuLinksContainer>
    </MobileMenuWrap>
  );
};

export default MobileMenuComponent;
