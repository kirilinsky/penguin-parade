import { atomWithStorage } from "jotai/utils";

export const userNameAtom = atomWithStorage<string | null>("username", null);
export const userIdAtom = atomWithStorage<string | null>("userId", null);
export const loggedInAtom = atomWithStorage<boolean | null>("loggedIn", false);
export const avatarAtom = atomWithStorage<string | null>("avatar", null);
export const avatarScaleAtom = atomWithStorage<string | null>(
  "avatarScale",
  null
);
