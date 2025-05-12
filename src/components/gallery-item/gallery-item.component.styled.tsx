import Image from "next/image";
import styled from "styled-components";

export const GalleryItemImage = styled.img`
  border-radius: 5px;
  z-index: 15;
  margin-block:5px;
`;

export const GalleryItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 220px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;
