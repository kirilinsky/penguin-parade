import { LinkStyled } from "@/components/ui/link/link.component.styled";
import styled from "styled-components";

export const ExpeditionGalleryItemContainer = styled.div<{
  $borderColor: string;
  $ended: boolean;
}>`
  display: flex;
  border-radius: 1em;
  flex-direction: column;
  gap: 0.4em;
  min-height: 50vh;
  padding: 0.7em;
  border: 2px solid
    ${({ $ended, $borderColor }) => ($ended ? "#000000d5" : $borderColor)};
  box-shadow: 0 1px 17px
      ${({ $ended, $borderColor }) => ($ended ? "#442929" : $borderColor)},
    0 0 8px rgba(255, 255, 255, 0.05);
  background-color: rgba(10, 20, 18, 0.95);
  backdrop-filter: blur(6px);
  color: #e6fdf5;
  border-radius: 1rem;

  opacity: 0;
  transform: translateY(10px);
  animation: fadeIn 0.6s ease forwards;

  &:hover {
    box-shadow: 0 0 12px ${({ $borderColor }) => $borderColor}aa,
      0 0 20px ${({ $borderColor }) => $borderColor}55,
      0 0 9px rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
  }
  ${({ $ended }) =>
    $ended &&
    `
    filter: grayscale(10);
    transition: all 0.3s ease-in-out;
    &:hover {
      filter: grayscale(0);
      border-color: rgba(88, 59, 59, 0.489);
      box-shadow: 0 0 12px rgba(255, 100, 100, 0.4), 0 0 4px rgba(255, 255, 255, 0.05);
    }
  `}

  @media (max-width: 888px) {
    min-height: unset;
    margin-block: 30px;
  }

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ExpeditionGalleryItemSideContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 0.6em;
  @media (max-width: 888px) {
    flex-direction: column;
  }
`;

export const ExpeditionGalleryItemSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  @media (max-width: 888px) {
    width: 100%;
  }
`;

export const ExpeditionGalleryItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  box-shadow: 0 4px 14px #8169b3a1, 0 0 8px rgba(255, 255, 255, 0.05);
`;

export const ExpeditionGalleryItemDes = styled.p`
  white-space: normal;
  word-wrap: break-word;
  hyphens: auto;
  text-align: justify;
  line-height: 1.3;
`;

export const DetailsButton = styled(LinkStyled)`
  width: 100%;
  text-align: center;
  padding: 0.5em 1.8em;
  background: #21d4fd;
  color: black;
  border-radius: 0.6em;
  font-weight: bold;
  transition: 0.2s ease all;

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 0 6px rgba(255, 255, 255, 0.2);
  }
`;
