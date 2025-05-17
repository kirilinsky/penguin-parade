import React from "react";
import { EvolveGridContainerStyled } from "./evolution-grid-container.component.styled";

const EvolutionGridContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <EvolveGridContainerStyled>{children}</EvolveGridContainerStyled>;
};

export default EvolutionGridContainer;
