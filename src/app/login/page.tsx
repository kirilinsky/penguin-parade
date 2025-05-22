"use client";

import { loggedInAtom, userDetailsAtom } from "@/atoms/user/user.atom";
import { auth, firestore } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from "@/types/friends.types";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const setUserDetails = useSetAtom(userDetailsAtom);
  const setLoggedIn = useSetAtom(loggedInAtom);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(firestore, "users", uid));
      if (!userDoc.exists()) throw new Error("User data not found");

      const userData = userDoc.data();
      setUserDetails({ id: uid, ...userData } as User);

      setLoggedIn(true);

      router.push("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form
        onSubmit={handleLogin}
        style={{
          width: "260px",
          border: "1px solid #8ebb93",
          margin: "10px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <input
          style={{ padding: "10px" }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          style={{ padding: "10px" }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <NeonButtonComponent title="Login" type="submit" />
      </form>
    </div>
  );
}
