import styled, { css } from "styled-components";

export const PageContentBlockFlex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 8px;
  gap: 8px;
`;

export const PageContentBlockStyled = styled(PageContentBlockFlex).withConfig({
  shouldForwardProp: (prop) => prop !== "noBorder",
})<{
  noBorder?: boolean;
}>`
  border-radius: 0.5em;

  ${({ noBorder }) =>
    noBorder
      ? css`
          border: none;
          box-shadow: none;
        `
      : css`
          border: 1px solid #415948c3;
          box-shadow: 0 0 10px #415948c3;
        `}
`;
