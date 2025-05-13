import styled from "styled-components";

export const PageContentWrapperComponentStyled = styled.div`
  display: grid;
  padding: 10px 20px;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 10px;
  }
`;
