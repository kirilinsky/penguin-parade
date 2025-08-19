import styled from "styled-components";

export const GalleryFilterComponentContainer = styled.div`
  min-height: 35px;
  margin-block: 1.2rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(22, 60, 30, 0.85);
  border: 1px solid #2de191;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 0 12px rgba(45, 225, 145, 0.25);

  @media (max-width: 960px) {
    width: 100%;
    padding: 10px;
    flex-direction: column-reverse;
    height: auto;
    gap: 1em;
    align-items: flex-end;
    font-size: 20px;
  }
`;

export const GalleryFilterComponentSide = styled.div`
  display: flex;
  align-items: center;
  gap: .4em;
   @media (max-width: 1160px) {
   flex-wrap:wrap;
  }
  @media (max-width: 960px) {
    flex-wrap: wrap;
    gap: 15px;
    justify-content: end;
  }
  select {
    max-width: 75px;
  }
`;

export const GalleryFilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 19px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 6px;
  transition: all 0.3s ease;

  ${({ active }) =>
    active
      ? `
    color: #00ffaa;
    text-shadow: 0 0 6px #00ffaa, 0 0 4px #00ffaa;
  `
      : `
    color: gray;
    text-shadow: none;

    & span {
      color: gray;
      text-shadow: unset;
    }
  `}

  &:hover {
    transform: scale(1.025);
    ${({ active }) =>
      active
        ? `
      color: #b5ffe0;
      text-shadow: 0 0 8px #1affc4;
    `
        : `
      color: #aaa;
      text-shadow: 0 0 2px #888;
    `}
  }
`;
