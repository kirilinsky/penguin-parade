"use client";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, firestore } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { LinkStyled } from "@/components/link/link.component.styled";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import { useTranslations } from "next-intl";

const SignUpPage = () => {
  const t = useTranslations("signUpPage");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;
      await updateProfile(user, {
        displayName: username,
      });
      await sendEmailVerification(user);

      // TODO: auto login for new user

      // TODO: add default object, add statistics ans settings
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        username,
        username_lowercase: username.toLowerCase(),
        avatarScale: null,
        avatar: null,
        coins: 0,
        createdAt: serverTimestamp(),
        allowCraftAt: new Date(),
        lastGeneratedAt: null,
      });

      alert(t("verifyEmailAlert") + user.email);
      setSuccess(true);

      setEmail("");
      setPassword("");
      setUsername("");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div>
      <h1>{t("title")}</h1>
      <br />
      {success ? (
        <LinkStyled href={"/login"}>{t("loginPageLink")}</LinkStyled>
      ) : (
        <form
          onSubmit={handleSignUp}
          style={{
            border: "1px solid #8ebb93",
            margin: "10px",
            padding: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
            alignItems: "center",
          }}
        >
          <input
            type="email"
            style={{ padding: "10px" }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            required
          />
          <br />
          <input
            type="text"
            style={{ padding: "10px" }}
            placeholder={t("username")}
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            required
          />
          <br />
          <input
            type="password"
            placeholder={t("password")}
            value={password}
            style={{ padding: "10px" }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <br />

          <NeonButtonComponent title={t("signUpButton")} type="submit" />
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
