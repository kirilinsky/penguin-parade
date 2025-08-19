"use client";

import { loggedInAtom, userDetailsAtom } from "@/atoms/user/user.atom";
import { auth, firestore } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import NeonButtonComponent from "@/components/ui/neon-button/neon-button.component";
import { useTranslations } from "next-intl";
import { User } from "@/types/user.types";
import { LinkStyled } from "@/components/ui/link/link.component.styled";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const t = useTranslations("loginPage");

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
      <h1>{t("title")}</h1>

      <form
        onSubmit={handleLogin}
        style={{
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
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
        <NeonButtonComponent title={t("loginButton")} type="submit" />
        <br />
        <span> {t("subtitle")}</span>
        <LinkStyled href={"/signup"}>{t("signUpButton")}</LinkStyled>
      </form>
    </div>
  );
}
