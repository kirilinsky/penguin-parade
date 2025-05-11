import styled from "styled-components";

export const GalleryItemScaleStyled = styled.span<{ color: string }>`
  transition: 0.2s linear;
  color: ${({ color }) => color};
  &:hover {
    color: #fff;
    transform: scale(1.1);
  }
`;
