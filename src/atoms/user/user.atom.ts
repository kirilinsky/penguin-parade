import { atomWithStorage } from "jotai/utils";

export const userNameAtom = atomWithStorage<string | null>("username", null);
export const userIdAtom = atomWithStorage<string | null>("userId", null);
export const loggedInAtom = atomWithStorage<boolean | null>("loggedIn", false);
