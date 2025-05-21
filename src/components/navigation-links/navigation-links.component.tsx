import { User } from "@/types/friends.types";
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
  return (
    <>
      {user && loggedIn ? (
        <>
          <Link onClick={onClick} href="/countdown">
            Craft!
          </Link>
          <Link onClick={onClick} href={`/library/${user.id}`}>
            My Penguins
          </Link>
          <Link onClick={onClick} href="/friends">
            Friends
          </Link>
          <Link onClick={onClick} href="/evolve">
            Evolve
          </Link>
          <Link onClick={onClick} href="/auction">
            Auction
          </Link>
          <Link onClick={logOutHandler} href="/">
            Log out
          </Link>
        </>
      ) : (
        <>
          <Link onClick={onClick} href="/signup">
            Sign up
          </Link>
          <Link onClick={onClick} href="/login">
            Login
          </Link>
        </>
      )}
    </>
  );
};

export default NavigationLinksComponent;
