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

const SignUpPage = () => {
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

      alert("Welcome");
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
      <h1>Sign up and collect Penguins</h1>
      {success ? (
        <LinkStyled href={"/login"}>Go to Login page</LinkStyled>
      ) : (
        <form onSubmit={handleSignUp}>
          <input
            type="email"
            style={{ padding: "10px" }}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="text"
            style={{ padding: "10px" }}
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Pass"
            value={password}
            style={{ padding: "10px" }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <br />
          <NeonButtonComponent
            title="Sign up"
            subtitle="Sign up"
            type="submit"
          />
        </form>
      )}
    </div>
  );
};

export default SignUpPage;
