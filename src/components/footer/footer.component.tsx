import React from "react";
import { FooterStyled } from "./footer.component.styled";

const FooterComponent = () => {
  return (
    <FooterStyled>
      <span>{process.env.NEXT_PUBLIC_APP_VERSION ?? "nv"}</span>
    </FooterStyled>
  );
};

export default FooterComponent;
