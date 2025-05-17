import styled from "styled-components";

export const PageContentBlockFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 3px;
  gap: 10px;
`;

export const PageContentBlockStyled = styled(PageContentBlockFlex)`
  box-shadow: 0 0 10px #fff;
  border: 2px solid white;
  border-radius: 1em;
`;
