// components/games/guess-theme/guess-theme-game.styled.ts
import styled, { keyframes, css } from "styled-components";

export const GameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  gap: 2rem;
  font-family: "Frutiger", "Segoe UI", sans-serif;
  position: relative;
  background: radial-gradient(circle at center, #1a1a1a, #0d0d0d);
  color: #fff;
`;

export const OptionsColumn = styled.div<{ side: "left" | "right" }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
  max-width: 250px;
`;

const glow = keyframes`
  0% { box-shadow: 0 0 4px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 10px rgba(255,255,255,0.8); }
  100% { box-shadow: 0 0 3px rgba(255,255,255,0.2); }
`;

export const OptionButton = styled.button<{ $status?: "correct" | "wrong" }>`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
     box-shadow: 0 0 3px #ccc;
  }

  ${({ $status }) =>
    $status === "correct" &&
    css`
      background: rgba(0, 200, 0, 0.525);
      border: 2px solid #00ff99;
      animation: ${glow} 1s infinite ease-in;
    `}

  ${({ $status }) =>
    $status === "wrong" &&
    css`
      background: rgba(200, 0, 0, 0.56);
      border: 2px solid #ff4444;
      animation: ${glow} .8s infinite ease-out;
    `}
`;

export const PenguinImage = styled.div`
   height: 50vh; 
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  }
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: .9; }
`;

export const Countdown = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 2rem;
  font-weight: bold;
  animation: ${blink} 1s infinite;
`;

export const Loader = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  font-size: 1.5rem;
  animation: ${blink} 1s infinite;
`;
