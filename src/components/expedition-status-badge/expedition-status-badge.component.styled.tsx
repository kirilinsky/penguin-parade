import styled from "styled-components";

export const ExpeditionStatusBadgeStyled = styled.div<{
  color: string;
  background: string;
}>`
  padding: 10px;
  width: max-content;
  border-radius: 3px;
  color: ${({ color }) => color};
  background: ${({ background }) => background};
  box-shadow: inset 0 0 4px ${({ color }) => color};
`;
