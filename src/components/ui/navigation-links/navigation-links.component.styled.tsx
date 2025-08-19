import styled from "styled-components";

export const NavigationLinkWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0.5em 0.75em;
  border-radius: 0.5em;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  @media (prefers-color-scheme: dark) {
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
  }
`;

export const NavigationLinkBadge = styled.div`
  position: absolute;
  top: 4px;
  right: 6px;
  width: 10px;
  height: 10px;
  background-color: #ff2a2a;
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(255, 42, 42, 0.5);
`;
