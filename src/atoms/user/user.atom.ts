import { User } from "@/types/friends.types";
import { atomWithStorage } from "jotai/utils";

export const userDetailsAtom = atomWithStorage<User | null>(
  "user-details",
  null
);
export const loggedInAtom = atomWithStorage<boolean | null>("loggedIn", false);
