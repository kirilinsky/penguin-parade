import styled from "styled-components";

export const NeonButtonStyled = styled.button`
  position: relative;
  z-index: 1;
  background: #0a0a0a;
  border: 1.8px solid #0ff;
  border-radius: 0.5rem;
  color: #0ff;
  padding: 0.65rem 1.1rem;
  font-family: "Tektur", sans-serif;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;

  &:not(:disabled) span {
    text-shadow: 0 0 6px #0ff;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 0.75em #0ff;
    opacity: 0.35;
    z-index: -1;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover:not(:disabled),
  &:focus-visible:not(:disabled) {
    color: #8ff;
    border-color: #8ff;
    background-color: #031c1c;
  }

  &:hover::after,
  &:focus-visible::after {
    opacity: 0.6;
  }

  &:disabled {
    opacity: 0.5;
    color: #555;
    border-color: #333;
    cursor: not-allowed;
    &::after {
      opacity: 0;
    }
  }
`;
