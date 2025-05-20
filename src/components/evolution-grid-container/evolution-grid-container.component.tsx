import React from "react";
import { EvolveGridContainerStyled } from "./evolution-grid-container.component.styled";

const EvolutionGridContainer = ({
  hide,
  target,
  children,
}: Readonly<{
  hide: boolean;
  target: string | null;
  children: React.ReactNode;
}>) => {
  return (
    <EvolveGridContainerStyled target={target} hide={hide}>
      {children}
    </EvolveGridContainerStyled>
  );
};

export default EvolutionGridContainer;
