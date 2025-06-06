import styled from "styled-components";

export const GalleryFilterComponentContainer = styled.div`
  height: 35px;
  margin-block: 26px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #214d26d4;
  border-radius: 3px;
  font-size: 18px;
  @media (max-width: 960px) {
    width: 100%;
    padding: 10px;
    flex-direction: column-reverse;
    height: auto;
    gap: 1em;
    align-items: end;
    font-size: 20px;
  }
`;

export const GalleryFilterComponentSide = styled.div`
  display: flex;
  gap: 10px;
  @media (max-width: 960px) {
     flex-wrap: wrap;
     gap: 15px;
     justify-content:end;
  }
`;

export const GalleryFilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 19px;
  ${({ active }) =>
    !active &&
    ` & span {
    color: gray;
    text-shadow: unset;
  }`};
`;
