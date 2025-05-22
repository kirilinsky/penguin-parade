import styled from "styled-components";

export const PageContentBlockFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:space-evenly;
  align-items: center;
  padding: 10px 3px;
  gap: 10px;
`;

export const PageContentBlockStyled = styled(PageContentBlockFlex)`
  box-shadow: 0 0 10px #415948c3;
  border: 1px solid #415948c3;
  border-radius: .5em;
`;
