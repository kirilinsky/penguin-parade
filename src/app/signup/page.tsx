"use client";

import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, firestore } from "../../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

      // Сохраняем доп. данные пользователя в Firestore
      await setDoc(doc(firestore, "users", user.uid), {
        email: user.email,
        createdAt: serverTimestamp(),
      });

      alert("Welcome");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <div>
      <h1>Sign up and collect Penguins</h1>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Pass"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
