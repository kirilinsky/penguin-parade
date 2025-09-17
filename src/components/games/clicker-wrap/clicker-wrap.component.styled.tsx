import styled, { keyframes } from "styled-components";

export const Wrapper = styled.div`
  position: relative;
  overflow: visible;
`;

export const Layer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;
  contain: layout paint;
`;

const fly = keyframes`
  0%   { transform: translate(0,0) rotate(0deg) scale(1); opacity: 1; }
  70%  { opacity: .9; }
  100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(.9); opacity: 0; }
`;

const pulse = keyframes`
  0%   { transform: translate(-50%,-50%) scale(.2); opacity: .35; }
  60%  { opacity: .22; }
  100% { transform: translate(-50%,-50%) scale(1); opacity: 0; }
`;

export const Particle = styled.i<{ $color: string; $size: number }>`
  position: absolute;
  left: 0;
  top: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  transform: translate(-50%, -50%);
  border-radius: 6px;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset,
    0 4px 10px rgba(0, 0, 0, 0.2);
  filter: saturate(115%);
  will-change: transform, opacity;
  animation: ${fly} 560ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
`;

export const Ripple = styled.span<{ $color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 2px solid ${({ $color }) => $color};
  box-shadow: 0 0 18px ${({ $color }) => $color}55;
  opacity: 0.32;
  will-change: transform, opacity;
  animation: ${pulse} 560ms ease-out forwards;
  backdrop-filter: blur(2px) saturate(120%);
`;
