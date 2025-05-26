import React from "react";
import { FooterStyled } from "./footer.component.styled";
import LocaleSwitcher from "../locale-switcher/locale-switcher.component";

const FooterComponent = () => {
  return (
    <FooterStyled>
      <LocaleSwitcher />
      <span>{process.env.NEXT_PUBLIC_APP_VERSION ?? "nv"}</span>
    </FooterStyled>
  );
};

export default FooterComponent;
