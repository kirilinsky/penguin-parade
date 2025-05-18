import Image from "next/image";
import styled from "styled-components";

export const GalleryItemModalContainer = styled.div`
  margin-block: 25px;
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

export const GalleryItemModalContent = styled.div<{ $frameColor?: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  width: 50%;
  overflow: hidden;
  height: 100%;
  gap: 10px;
  border-radius: 1em;
  padding: 10px;
  border: 1.5px solid ${({ $frameColor }) => $frameColor};
  box-shadow: 0 0 10px ${({ $frameColor }) => $frameColor};
  @media (max-width: 768px) {
    width: 95%;
    min-height: 55vh;
    margin-bottom: 15px;
  }
`;

export const GalleryItemModalImage = styled(Image)`
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
  gap: 10px;
  @media (max-width: 1008px) {
    flex-direction: column;
  }
`;
