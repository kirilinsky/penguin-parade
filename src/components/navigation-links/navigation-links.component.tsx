import { User } from "@/types/friends.types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const NavigationLinksComponent = ({
  user,
  loggedIn,
  logOutHandler,
  onClick,
}: {
  user: User | null;
  loggedIn: boolean | null;
  logOutHandler: () => void;
  onClick?: () => void;
}) => {
  const t = useTranslations("header");
  return (
    <>
      {user && loggedIn ? (
        <>
          <Link onClick={onClick} href="/countdown">
            {t("craft")}
          </Link>
          <Link onClick={onClick} href={`/library/${user.id}`}>
            {t("myPenguins")}
          </Link>
          <Link onClick={onClick} href="/friends">
            {t("friends")}
          </Link>
          <Link onClick={onClick} href="/evolve">
            {t("evolve")}
          </Link>
          <Link onClick={onClick} href="/auction">
            {t("auction")}
          </Link>
          <Link onClick={logOutHandler} href="/">
            {t("logOut")}
          </Link>
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
