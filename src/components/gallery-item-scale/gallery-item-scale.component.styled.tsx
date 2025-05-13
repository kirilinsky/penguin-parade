import styled from "styled-components";

export const GalleryItemScaleStyled = styled.span<{ color: string }>`
  transition: 0.2s linear;
  color: ${({ color }) => color};
  text-transform:capitalize ;
  text-shadow: 0 0 5px ${({ color }) => color}, 0 0 10px ${({ color }) => color},
    0 0 20px ${({ color }) => color};

  &:hover {
    color: #fff;
    transform: scale(1.12);
    text-shadow: 0 0 10px #fff, 0 0 20px ${({ color }) => color},
      0 0 40px ${({ color }) => color}, 0 0 80px ${({ color }) => color};
  }
`;
