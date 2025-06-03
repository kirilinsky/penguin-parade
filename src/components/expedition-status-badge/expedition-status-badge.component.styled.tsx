import styled from "styled-components";

export const ExpeditionStatusBadgeStyled = styled.div<{
  color: string;
  background: string;
}>`
  padding: 12px;
  width: max-content;
  border-radius: 3px;
  display:flex; 
  align-items:center;
  justify-content:center; 
  color: ${({ color }) => color};
  background: ${({ background }) => background};
  box-shadow: inset 0 0 4px ${({ color }) => color};
`;
