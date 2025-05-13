import React from "react";
import { PageContentWrapperComponentStyled } from "./page-content-wrapper.component.styled";

export const PageContentWrapperComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <PageContentWrapperComponentStyled>
      {children}
    </PageContentWrapperComponentStyled>
  );
};
