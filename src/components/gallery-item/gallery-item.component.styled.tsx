import styled from "styled-components";

export const GalleryItemImage = styled.img`
  border-radius: 5px;
  z-index: 15;
`;

export const GalleryItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
`;
