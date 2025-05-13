import styled from "styled-components";

export const GalleryItemImage = styled.img`
  border-radius: 10px;
  z-index: 15;
  margin-block: 5px;
`;

export const GalleryItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 210px;
  padding: 10px 20px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;
