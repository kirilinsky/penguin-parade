import styled, { keyframes } from "styled-components";

const pop = keyframes`
  0% { transform: scale(1); }
  35% { transform: scale(1.16); }
  100% { transform: scale(1); }
`;

const wobble = keyframes`
  0% { transform: translateX(0) rotate(0); }
  50% { transform: translateX(1px) rotate(0.4deg); }
  100% { transform: translateX(0) rotate(0); }
`;

export const Wrap = styled.span<{ $color: string }>`
  display: inline-grid; place-items: center; position: relative;
  animation: ${pop} 200ms cubic-bezier(.22,.61,.36,1);
  &::after{
    content:""; position:absolute; inset:auto 0 -2px 0; height:8px;
    background:${({$color}) => $color}; filter:blur(8px); opacity:.25; pointer-events:none;
  }
`;

export const Digits = styled.span`
  display:inline-block;
  font-variant-numeric: tabular-nums; font-weight:800; line-height:1;
  letter-spacing:.4px;
  text-shadow:0 1px 0 rgba(255,255,255,.10), 0 6px 16px rgba(0,0,0,.22);
  will-change: transform;
  animation: ${wobble} 360ms ease-out;
`;
