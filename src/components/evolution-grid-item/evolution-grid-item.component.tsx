import React from "react";
import { EvolutionGridItemStyled } from "./evolution-grid-item.component.styled";

const EvolutionGridItem = ({
  children,
  gridarea,
}: Readonly<{
  children: React.ReactNode;
  gridarea: string;
}>) => {
  return (
    <EvolutionGridItemStyled gridarea={gridarea}>
      {children}
    </EvolutionGridItemStyled>
  );
};
export default EvolutionGridItem;
