import React, { useEffect, useState } from "react";
import { EvolutionGridItemStyled } from "./evolution-grid-item.component.styled";

const EvolutionGridItem = ({
  children,
  gridarea,
  bordercolor,
  value = null,
  result,
  onClick,
  ...rest
}: Readonly<{
  gridarea: string;
  bordercolor: string;
  result: boolean;
  value?: string | null;
  onClick?: (e: any) => void;
  children: React.ReactNode;
}>) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 12);
    return () => clearTimeout(timer);
  }, []);
  return (
    <EvolutionGridItemStyled
      onClick={onClick}
      id={gridarea}
      bordercolor={bordercolor}
      gridarea={gridarea}
      value={value}
      result={result}
      mounted={mounted}
      {...rest}
    >
      {children}
    </EvolutionGridItemStyled>
  );
};
export default EvolutionGridItem;
