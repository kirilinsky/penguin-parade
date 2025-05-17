import styled from "styled-components";

export const GalleryItemImage = styled.img<{ color: string }>`
  border-radius: 1em;
  z-index: 15;
  margin-block: 5px;
  border: 1px solid ${({ color }) => color};
  box-shadow: 0 0 5px ${({ color }) => color};
 
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
