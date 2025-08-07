"use client";

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, firestore } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { LinkStyled } from "@/components/link/link.component.styled";
import NeonButtonComponent from "@/components/neon-button/neon-button.component";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import { useAtom, useSetAtom } from "jotai";
import { useRouter } from "next/navigation";

import { loggedInAtom, userDetailsAtom } from "@/atoms/user/user.atom";

const SignUpPage = () => {
  const t = useTranslations("signUpPage");
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);
  const setUserDetails = useSetAtom(userDetailsAtom);

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const redirect = () => {
    router.push("/");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    if (!email) return;
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      await updateProfile(user, { displayName: username });
      await sendEmailVerification(user);
      if (!user.email) throw new Error("Email not found");
      const userDocData = {
        email: user.email!,
        username,
        username_lowercase: username.toLowerCase(),
        avatarScale: null,
        avatar: null,
        coins: 0,

        allowCraftAt: new Date(),
        lastGeneratedAt: null,
        craftInProgress: false,
        friendRequests: [],
        sentRequests: [],
        statistics: {
          evolutions: 0,
          eventsCreated: 0,
          expeditions: 0,
          totalGiftsSent: 0,
          totalGiftsReceived: 0,
          totalCoinsEarned: 0,
          totalCrystalsEarned: 0,
          totalExpeditionParticipants: 0,
          totalCrystalsSpent: 0,
          totalCoinsSpent: 0,
          totalCrafted: 0,
          totalSold: 0,
          totalBought: 0,
          totalSkipToPay: 0,
        },
        imageIds: [],
      };

      await setDoc(doc(firestore, "users", user.uid), {
        ...userDocData,
        createdAt: serverTimestamp(),
      });

      setUserDetails({
        id: user.uid,
        ...userDocData,
        createdAt: new Date(),
      });
      setLoggedIn(true);

      toast.success(t("verifyEmailAlert") + user.email);
      redirect();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loggedIn && redirect();
  }, [loggedIn]);

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
          <span style={{ width: "35%", textAlign: "center" }}>
            {t("emailInfo")}
          </span>
          <br />
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
          <NeonButtonComponent
            disabled={loading}
            title={t("signUpButton")}
            type="submit"
          />
          <br />
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
