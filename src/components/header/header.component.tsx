"use client";

import React from "react";
import { HeaderLinks, HeaderWrapper } from "./header.component.styled";
import Link from "next/link";

const HeaderComponent = () => {
  return (
    <HeaderWrapper>
      <HeaderLinks>
        <Link href="/">home</Link>
        <a href="/main">countdown</a>
        <a href="/mylibrary">my library</a>
        <a href="/signup">sign up</a>
        <a href="/login">login</a>
      </HeaderLinks>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
