import styled from "styled-components";

export const GalleryFilterComponentContainer = styled.div`
  height: 35px;
  margin-bottom: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #214d26d4;
  border-radius: 3px;
  font-size: 18px;
`;

export const GalleryFilterComponentSide = styled.div`
  display: flex;
  gap: 10px;
`;

export const GalleryFilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 18px;
  ${({ active }) =>
    !active &&
    ` & span {
    color: gray;
    text-shadow: unset;
  }`};
`;
