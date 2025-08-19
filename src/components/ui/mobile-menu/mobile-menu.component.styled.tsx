import styled from "styled-components";

export const MobileMenuWrap = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  position: fixed;
  background: #2f20207d;
  backdrop-filter: blur(12px);
  display: grid;
  place-items: center;
  z-index: 10;
`;

export const MobileMenuLinksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 2em;
  & a {
    font-size: 1.5em;
    text-align: center;
    text-shadow: 2px 2px black;
  }
`;

export const MobileMenuCloseButton = styled.button`
  position: absolute;
  padding: 1.5em;
  top: 1px;
  right: 1px;
`;
