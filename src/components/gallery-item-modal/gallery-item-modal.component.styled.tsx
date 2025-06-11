import Image from "next/image";
import styled from "styled-components";

export const GalleryItemModalContainer = styled.div`
  margin-block: 25px;
  display: flex;
  gap: 1em;
  height: calc(100% - 40px);
  @media (max-width: 768px) {
    flex-direction: column;
    -webkit-overflow-scrolling: touch;
    gap: 0.5em;
    align-items: center;
    overflow-y: auto;
    margin-block: 25px;
  }
`;

export const GalleryItemModalContent = styled.div<{ $frameColor?: string }>`
  display: flex;
  flex-direction: column;
  position: relative;
  color: #fff;
  width: 50%;
  overflow: ${({ $frameColor }) => ($frameColor ? "hidden" : "unset")};
  height: 100%;
  gap: 10px;
  border-radius: 1em;
  padding: 10px;
  border: 1.5px solid ${({ $frameColor }) => $frameColor};
  box-shadow: 0 0 10px ${({ $frameColor }) => $frameColor};
  @media (max-width: 768px) {
    width: 99%;
    min-height: 55vh;
    height: auto;
    &:nth-child(2) {
      min-height: auto;
      margin-bottom: 1em;
    }
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

export const GalleryItemModalAccordion = styled.div<{ $expand: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: 0.45s linear;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;

  ${({ $expand }) => !$expand && "height: 0"};
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
  button {
    flex-grow: 1;
  }
`;
export const GalleryItemModalFriendsList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
  height: 250px;
  overflow-y: auto;
  @media (max-width: 1008px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 766px) {
    height: 60%;
  }
`;

export const GalleryItemModalFriendsItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{
  active: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #fff;
  gap: 10px;
  padding: 1em;
  border-radius: 1em;
  ${({ active }) =>
    active &&
    `
  background: #3c3333e4;
    box-shadow: 0 0 12px #84f9ee;
  `}
`;
