import styled, { keyframes } from "styled-components";

const float = keyframes`
  0%   { transform: translate(-50%, -50%) translateY(0) scale(.9);   opacity: 0; }
  12%  { opacity: 1; transform: translate(-50%, -50%) translateY(-6px) scale(1.08); }
  100% { opacity: 0; transform: translate(-50%, -50%) translateY(-38px) scale(1); }
`;

export const BubbleLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
`;

export const BubbleItem = styled.span<{ $color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  padding: 2px 8px;
  border-radius: 999px;
  font-weight: 800;
  font-size: 14px;
  line-height: 1;
  color: #06151c;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3) inset,
    0 8px 18px rgba(0, 0, 0, 0.25), 0 0 18px ${({ $color }) => $color}55;
  animation: ${float} 600ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
  will-change: transform, opacity;
  user-select: none;
`;
