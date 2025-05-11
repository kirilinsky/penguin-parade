"use client";

import React from "react";
import { PageWrapperStyled } from "./page-wrapper.component.styled";

const PageWrapperComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <PageWrapperStyled>{children}</PageWrapperStyled>;
};

export default PageWrapperComponent;
