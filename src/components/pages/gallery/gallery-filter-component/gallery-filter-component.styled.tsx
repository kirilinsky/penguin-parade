import styled from "styled-components";

export const GalleryFilterComponentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1em 1.6em;
  max-width: 920px;
  margin: 1.2rem auto 1.8rem;
  padding: 0 0.5em;
`;

export const GalleryFilterComponentSide = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55em;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  opacity: 0.92;

  select {
    font: inherit;
    text-transform: none;
    letter-spacing: normal;
    color: #e8fff6;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(45, 225, 145, 0.3);
    border-radius: 9px;
    padding: 0.45em 0.8em;
    cursor: pointer;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  select:hover,
  select:focus {
    border-color: #2de191;
    box-shadow: 0 0 9px rgba(45, 225, 145, 0.35);
  }

  option {
    background: #0e1a14;
    color: #e8fff6;
  }

  /* "Show only" rarity row — own full-width centered line */
  &:last-child {
    flex-basis: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.3em;
    padding-top: 0.4em;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
`;

export const GalleryFilterButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "active",
})<{ active: boolean }>`
  background: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  padding: 4px 12px;
  border-radius: 999px;
  transition: all 0.25s ease;

  ${({ active }) =>
    active
      ? `
    color: #00ffaa;
    background: rgba(0, 255, 170, 0.1);
    border-color: rgba(0, 255, 170, 0.5);
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
    transform: scale(1.06);
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
