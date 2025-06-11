import { useAtom } from "jotai";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/firebase";
import {
  hasUnreadNotificationsAtom,
  userDetailsAtom,
} from "@/atoms/user/user.atom";
import { User } from "@/types/user.types";
import { useEffect, useState } from "react";

export function useUserDetails(strict: true): {
  user: User;
  hasUnreadNotifications: boolean;
  checkHasUnreadNotifications: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logOut: () => void;
};

export function useUserDetails(strict?: false): {
  user: User | null;
  hasUnreadNotifications: boolean;
  checkHasUnreadNotifications: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logOut: () => void;
};

export function useUserDetails(strict = false) {
  const [user, setUser] = useAtom(userDetailsAtom);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useAtom(
    hasUnreadNotificationsAtom
  );

  const refreshUser = async () => {
    if (!user) return;
    const ref = doc(firestore, "users", user.id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      setUser({ id: snap.id, ...snap.data() } as User);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    if (!user) return;
    const ref = doc(firestore, "users", user.id);
    await updateDoc(ref, data);
    setUser((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const logOut = () => {
    setUser(null);
    setHasUnreadNotifications(false);
  };

  const checkHasUnreadNotifications = async () => {
    if (!user?.id) return;
    const notifsRef = collection(firestore, "users", user.id, "notifications");
    const q = query(notifsRef, where("read", "==", false));
    const snap = await getDocs(q);
    setHasUnreadNotifications(!snap.empty);
  };

  useEffect(() => {
    if (user?.id) {
      checkHasUnreadNotifications();
    }
  }, [user?.id]);

  if (strict && !user) {
    throw new Error("User is not loaded");
  }

  return {
    user: user as typeof strict extends true ? User : User | null,
    hasUnreadNotifications,
    checkHasUnreadNotifications,
    refreshUser,
    updateUser,
    logOut,
  };
}
