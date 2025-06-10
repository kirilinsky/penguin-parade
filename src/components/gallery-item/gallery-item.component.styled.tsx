import Image from "next/image";
import styled from "styled-components";

export const GalleryImageWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(25px);
`;

export const GalleryImageFrameOverlay = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  object-fit: contain;
  border-radius: 4px;
  z-index: 16;
`;

export const GalleryImageExpeditionOverlay = styled.div`
  background: #b75d339f;
  backdrop-filter: blur(2px);
  flex-direction: column;
  gap: 0.5em;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border-radius: 1em;
  box-shadow: inset 0 0 15px #c06520;
  height: 100%;
  z-index: 16;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    font-size: 18px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s linear;
  }
  &:hover {
    a {
      opacity: 1;
      transition: opacity 0.4s linear;
      pointer-events: unset;
    }
  }
`;

export const GalleryItemImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "loaded" && prop !== "emperor",
})<{ emperor: boolean; color: string; loaded: boolean }>`
  border-radius: ${({ emperor }) => (emperor ? "4px" : "1em")};
  z-index: 15;
  height: 30vh;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: 0.4s ease-in-out;
  margin-block: 5px;
  border: 1px solid ${({ color }) => color};
  box-shadow: 0 0 5px ${({ color }) => color};
  &:hover {
    transition: 0.4s ease-in-out;
    box-shadow: 0 0 5px ${({ color }) => color}, 0 0 15px #000;
  }
  @media (max-width: 768px) {
    height: 28vh;
  }
  @media (max-width: 526px) {
    height: 81vw;
  }
`;

export const GalleryItemSkeleton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "loaded",
})<{ loaded: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 1em;
  opacity: ${(props) => (props.loaded ? 0 : 0.8)};
  background: linear-gradient(90deg, #a09e9e 25%, #858080 50%, #3b3b3b 75%);
  background-size: 200% 100%;
  animation: ${(props) =>
    props.loaded ? "none" : "skeleton-loading 1.2s ease-in-out infinite"};

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

export const GalleryItemContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
  padding: 10px 20px;
  position: relative;
  transform-style: preserve-3d;
  &:hover {
    cursor: pointer;
  }
`;

export const GalleryItemGiftBadge = styled(Image)`
  position: absolute;
  transform: rotate(15deg);
  opacity: 0.9;
  top: 2%;
  right: 2%;
`;

export const GalleryItemNftBadge = styled(Image)`
  position: absolute;

  opacity: 0.9;
  bottom: 2%;
  left: 2%;
`;
export const GalleryItemBadBatchBadge = styled(GalleryItemGiftBadge)`
  right: unset;
  top: 1%;
  left: 1%;
  transform: rotate(-10deg);
  z-index: 16;
`;
