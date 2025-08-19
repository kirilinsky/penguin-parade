import styled, { keyframes } from "styled-components";

export const FriendsHeader = styled.div`
  margin-bottom: 10px;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h2 {
    margin: 0;
    letter-spacing: 0.3px;
  }
`;

export const CountPill = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.02)
  );
  box-shadow: 0 0 12px rgba(108, 200, 255, 0.25);
`;

export const FriendsNeonPanel = styled.div`
  position: relative;
  border-radius: 16px;
  width: 100%;
  padding: 10px;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.04),
    rgba(255, 255, 255, 0.015)
  );
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.02) inset,
    0 8px 28px rgba(255, 42, 122, 0.12), 0 6px 18px rgba(108, 200, 255, 0.1);

  &:before {
    content: "";
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    pointer-events: none;
    background: conic-gradient(from 90deg, #ff2a7a, #ffe14d, #6cc8ff, #ff2a7a);
    opacity: 0.25;
    filter: blur(14px);
    z-index: -1;
  }
`;

export const FriendsListBlockGrid = styled.div`
  display: grid;
  width: 100%;
  min-height: 40vh;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  overflow-y: auto;
  padding: 6px;

  &::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.04);
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #6cc8ff, #ff2a7a);
    border-radius: 10px;
    border: 2px solid rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 6px;
  }
`;

export const EmptyState = styled.div`
  padding: 24px 8px 12px;
  display: grid;
  place-items: center;
  gap: 8px;
  text-align: center;

  p {
    margin: 4px 0 0;
    opacity: 0.85;
  }
`;
