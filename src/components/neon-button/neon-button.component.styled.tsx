import styled from "styled-components";

export const NeonButtonStyled = styled.button`
  position: relative;
  z-index: 1;
  background: #1c031a;
  border: 2.4px solid;
  border-color: #1fa52a;
  border-radius: 0.75rem;
  color: #1da426;
  padding: 0.75rem 1rem;
  text-decoration: none;
  transition: 250ms ease-in-out;
  transition-property: all;
  &:not(:disabled) span {
    filter: drop-shadow(0 0 1px currentcolor);
  }

  &:after:not(:disabled) {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: 0.6;
    border-radius: inherit;
    box-shadow: 0 0 1em 0.4em #20cd85;
    transition: 250ms ease-in-out;
    transition-property: opacity;
  }
  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    color: #3dae6c;
    background-color: #062918;
    transform: scale(1.01);
    cursor: pointer;
  }
  &:hover::after,
  &:focus:after {
    opacity: 0.6;
  }
  &:disabled {
    color: #ac9d9d;
    background: #050405;
    border-color: #202722;
  }
`;
