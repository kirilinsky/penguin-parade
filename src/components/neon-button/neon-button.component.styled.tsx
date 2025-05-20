import styled from "styled-components";

export const NeonButtonStyled = styled.button`
  position: relative;
  z-index: 1;
  background: #1c031a;
  border: 3px solid;
  border-color: #b61aa6;
  border-radius: 0.75rem;
  color: #cd20bb;
  padding: 0.75rem 1rem;
  text-decoration: none;
  transition: 250ms ease-in-out;
  transition-property: all;
  & span {
    filter: drop-shadow(0 0 1px currentcolor);
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    inset: 0;
    opacity: 0.6;
    border-radius: inherit;
    box-shadow: 0 0 1em 0.4em #cd20bb;
    transition: 250ms ease-in-out;
    transition-property: opacity;
  }
  &:hover,
  &:focus {
    color: #ae3da3;;
    background-color: #290626;;
    transform: scale(1.01);
    cursor: pointer;
  }
  &:hover::after,
  &:focus:after {
    opacity: 0.6;
  }
`;
