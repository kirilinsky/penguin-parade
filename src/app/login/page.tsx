"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../firebase";
import { useRouter } from "next/navigation";
import { useSetAtom } from "jotai";
import {
  avatarAtom,
  avatarScaleAtom,
  loggedInAtom,
  userIdAtom,
  userNameAtom,
} from "@/atoms/user/user.atom";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUsername = useSetAtom(userNameAtom);
  const setUserId = useSetAtom(userIdAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);
  const setAvatar = useSetAtom(avatarAtom);
  const setAvatarScale = useSetAtom(avatarScaleAtom);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;
      alert("Success!");
      const userDoc = await getDoc(doc(firestore, "users", uid));
      const username = userDoc.exists() ? userDoc.data().username : null;
      const avatar = userDoc.exists() ? userDoc.data().avatar : null;
      const avatarScale = userDoc.exists() ? userDoc.data().avatarScale : null;

      setUsername(username);
      setUserId(uid);
      setLoggedIn(true);
      setAvatar(avatar);
      setAvatarScale(avatarScale);

      router.push("/");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          style={{ padding: "10px" }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          style={{ padding: "10px" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
