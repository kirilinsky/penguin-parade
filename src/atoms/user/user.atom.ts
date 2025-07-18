import { User } from "@/types/user.types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const userDetailsAtom = atomWithStorage<User | null>(
  "user-details",
  null
);
export const loggedInAtom = atomWithStorage<boolean | null>("loggedIn", false);
export const hasUnreadNotificationsAtom = atom(false);
