import Image from "next/image";
import styled from "styled-components";

export const GalleryItemImage = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== "loaded",
})<{ color: string; loaded: boolean }>`
  border-radius: 1em;
  z-index: 15;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 0.4s ease-in-out;
  margin-block: 5px;
  border: 1px solid ${({ color }) => color};
  box-shadow: 0 0 5px ${({ color }) => color};
`;

export const GalleryItemSkeleton = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "loaded",
})<{ loaded: boolean }>`
  position: absolute;
  inset: 0;
  border-radius: 1em;
  opacity: ${(props) => (props.loaded ? 0 : 0.8)};
  background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: ${(props) =>
    props.loaded ? "none" : "skeleton-loading 1.4s ease-in-out infinite"};

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
  min-height: 210px;
  padding: 10px 20px;
  position: relative;
  &:hover {
    cursor: pointer;
  }
`;

export const GalleryItemGiftBadge = styled(Image)`
  position: absolute;
  transform: rotate(15deg);
  opacity: 0.9;
  top: 2%;
  right: 3%;
`;

export const GalleryItemBadBatchBadge = styled(GalleryItemGiftBadge)`
  right: unset;
  top: 7%;
  left: 3%;
  transform: rotate(-10deg);
  z-index: 16;
`;
