import React from "react";
import { NeonButtonStyled } from "./neon-button.component.styled";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  subtitle?: string;
};

const NeonButtonComponent = ({
  title,
  type,
  onClick,
  ...rest
}: NeonButtonProps) => {
  return (
    <NeonButtonStyled onClick={onClick} type={type} {...rest}>
      {title}
    </NeonButtonStyled>
  );
};

export default NeonButtonComponent;
