import React from "react";
import {
  NeonButtonStyled,
  NeonButtonSubtitleStyled,
} from "./neon-button.component.styled";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  subtitle?: string;
};

const NeonButtonComponent = ({
  title,
  subtitle = "Click",
  type,
  onClick,
  ...rest
}: NeonButtonProps) => {
  return (
    <NeonButtonStyled onClick={onClick} type={type} {...rest}>
      <NeonButtonSubtitleStyled>{subtitle}</NeonButtonSubtitleStyled>

      <NeonButtonSubtitleStyled>{title}</NeonButtonSubtitleStyled>
    </NeonButtonStyled>
  );
};

export default NeonButtonComponent;
