// components/games/guess-theme/guess-theme-game.styled.ts
import styled, { keyframes, css } from "styled-components";

export const GameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
  0% { box-shadow: 0 0 6px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 20px rgba(255,255,255,0.8); }
  100% { box-shadow: 0 0 6px rgba(255,255,255,0.2); }
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
    animation: ${glow} 1.5s infinite;
  }

  ${({ $status }) =>
    $status === "correct" &&
    css`
      background: rgba(0, 200, 0, 0.3);
      border: 2px solid #00ff99;
      animation: ${glow} 1s infinite;
    `}

  ${({ $status }) =>
    $status === "wrong" &&
    css`
      background: rgba(200, 0, 0, 0.3);
      border: 2px solid #ff4444;
      animation: ${glow} 0.5s infinite;
    `}
`;

export const PenguinImage = styled.div`
  flex: 0 0 300px;
  display: flex;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
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
