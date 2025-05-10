"use client";

import React from "react";
import { HeaderLinks, HeaderWrapper } from "./header.component.styled";

const HeaderComponent = () => {
  return (
    <HeaderWrapper>
      <HeaderLinks>
        <a href="/main">main</a>
        <a href="/mylibrary">my library</a>
        <a href="/signup">sign up</a>
        <a href="/login">login</a>
      </HeaderLinks>
    </HeaderWrapper>
  );
};

export default HeaderComponent;
