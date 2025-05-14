import Image from "next/image";
import styled from "styled-components";

export const GalleryItemModalContainer = styled.div`
  margin-block: 20px;
  display: flex;
  gap: 15px;
  height: calc(100% - 40px);
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
    align-items: center;
    overflow-y: auto;
  }
`;

export const GalleryItemModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  width: 50%;
  overflow: hidden;
  height: 100%;
  gap: 10px;
  @media (max-width: 768px) {
    width: 95%;
    min-height: 55vh;
  }
`;

export const GalleryItemModalImage = styled(Image)`
  border-radius: 10px;
  transition: linear 1s;
  &:hover {
    transform: scale(1.05);
    transition: linear 1s;
  }
`;

export const GalleryItemModalTitle = styled.h2`
  text-align: center;
  margin-bottom: 10px;
  font-size: 28px;
`;
export const GalleryItemModalDes = styled.p`
  font-size: 21px;
  @media (max-width: 768px) {
    font-size: 15px;
  }
`;

export const GalleryItemModalScale = styled.h3`
  text-align: center;
  margin-bottom: 10px;
`;

export const GalleryItemModalButtonsContainer = styled.div`
  display: flex;
`;
