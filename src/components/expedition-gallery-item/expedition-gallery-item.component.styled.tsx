import styled from "styled-components";

export const ExpeditionGalleryItemContainer = styled.div<{
  $borderColor: string;
}>`
  display: flex;
  border-radius: 1em;
  flex-direction: column;
  gap: 1em;
  min-height: 50vh;
  border: 1.5px solid ${({ $borderColor }) => $borderColor};
  box-shadow: 0 8px 24px ${({ $borderColor }) => $borderColor},
    0 0 8px rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  background-color: rgba(10, 20, 18, 0.95);
  backdrop-filter: blur(6px);
  color: #e6fdf5;
  padding: 1em;
  @media (max-width: 888px) {
    min-height: unset;
    margin-block: 30px;
  }
`;

export const ExpeditionGalleryItemSideContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 1em;
  @media (max-width: 888px) {
    flex-direction: column;
  }
`;

export const ExpeditionGalleryItemSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1em;
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
  line-height: 1.4;
`;
