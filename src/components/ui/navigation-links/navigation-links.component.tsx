import { User } from "@/types/user.types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import {
  NavigationLinkBadge,
  NavigationLinkWrapper,
} from "./navigation-links.component.styled";
import { navItems } from "@/data/navigation";

const NavigationLinksComponent = ({
  user,
  loggedIn,
  logOutHandler,
  hasUnread,
  onClick,
}: {
  user: User | null;
  loggedIn: boolean | null;
  hasUnread: boolean;
  logOutHandler: () => void;
  onClick?: () => void;
}) => {
  const t = useTranslations("header");
  return (
    <>
      {user && loggedIn ? (
        <>
          {navItems.map((item, idx) => {
            const href =
              typeof item.href === "function" ? item.href(user.id) : item.href;
            const showBadge =
              item.labelKey === "updates" && hasUnread;
            return (
              <NavigationLinkWrapper key={idx}>
                <Link href={href} onClick={onClick}>
                  {t(item.labelKey)}
                </Link>{" "}
                {showBadge && <NavigationLinkBadge />}
              </NavigationLinkWrapper>
            );
          })}
          <NavigationLinkWrapper>
            <Link onClick={logOutHandler} href="/">
              {t("logOut")}
            </Link>
          </NavigationLinkWrapper>
        </>
      ) : (
        <>
          <Link onClick={onClick} href="/signup">
            {t("signUp")}
          </Link>
          <Link onClick={onClick} href="/login">
            {t("login")}
          </Link>
        </>
      )}
    </>
  );
};

export default NavigationLinksComponent;
