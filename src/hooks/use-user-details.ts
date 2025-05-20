import { useAtom } from "jotai";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "@/firebase";
import { userDetailsAtom } from "@/atoms/user/user.atom";
import { User } from "@/types/friends.types";

export function useUserDetails(strict: true): {
  user: User;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logOut: () => void;
};

export function useUserDetails(strict?: false): {
  user: User | null;
  refreshUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => Promise<void>;
  logOut: () => void;
};

export function useUserDetails(strict = false) {
  const [user, setUser] = useAtom(userDetailsAtom);

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
  };

  if (strict && !user) {
    throw new Error("User is not loaded");
  }

  return {
    user: user as typeof strict extends true ? User : User | null,
    refreshUser,
    updateUser,
    logOut,
  };
}
