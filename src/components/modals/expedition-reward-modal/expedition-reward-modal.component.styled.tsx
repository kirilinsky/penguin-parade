import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ExpeditionRewardModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  gap: 2em;
  & > div {
    width: 20vw;
  }

  & > div {
    opacity: 0;
    animation: ${fadeIn} 0.65s ease forwards;
  }

  & > *:nth-child(1) {
    animation-delay: 0.5s;
  }

  & > *:nth-child(2) {
    animation-delay: 1s;
  }
`;
