import Image from "next/image";
import styled from "styled-components";

export const GalleryItemScaleStyled = styled.span<{ color: string }>`
  display: flex;
  align-items: center;
  transition: 0.2s linear;
  color: ${({ color }) => color};
  text-transform: capitalize;
  text-shadow: 0 0 5px ${({ color }) => color}, 0 0 10px ${({ color }) => color},
    0 0 20px ${({ color }) => color};

  &:hover {
    color: #fff;
    transform: scale(1.12);
    text-shadow: 0 0 10px #fff, 0 0 20px ${({ color }) => color},
      0 0 40px ${({ color }) => color}, 0 0 80px ${({ color }) => color};
  }
`;

export const GalleryItemScaleGold = styled.span`
text-transform: capitalize;
  color: rgb(218, 165, 32);
  background: -webkit-linear-gradient(transparent, transparent),
    -webkit-linear-gradient(top, rgba(218, 165, 32, 1) 0%, rgba(
            213,
            173,
            109,
            1
          )
          26%, rgba(226, 186, 120, 1) 35%, rgba(163, 126, 67, 1) 45%, rgba(
            212,
            175,
            55,
            1
          )
          61%, rgba(213, 173, 109, 1) 100%);
  background: -o-linear-gradient(transparent, transparent);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const GalleryItemScaleGoldContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const GalleryItemScaleFleuron = styled(Image)``;
