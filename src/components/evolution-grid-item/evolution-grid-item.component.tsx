import React from "react";
import { EvolutionGridItemStyled } from "./evolution-grid-item.component.styled";

const EvolutionGridItem = ({
  children,
  gridarea,
  bordercolor,
  value = null,
  onClick,
  ...rest
}: Readonly<{
  gridarea: string;
  bordercolor: string;
  value?: string | null;
  onClick?: (e: any) => void;
  children?: React.ReactNode;
}>) => {
  return (
    <EvolutionGridItemStyled
      onClick={onClick}
      id={gridarea}
      bordercolor={bordercolor}
      gridarea={gridarea}
      value={value}
      {...rest}
    >
      {children}
    </EvolutionGridItemStyled>
  );
};
export default EvolutionGridItem;
