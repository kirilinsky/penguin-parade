import styled from "styled-components";

export const GalleryItemImage = styled.img`
  border-radius: 5px;
  box-shadow: 0 0 2px #ffffffc0;
  z-index: 15;
`;

export const GalleryItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  &:hover{
    cursor: pointer;
  }
`;
