import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -300px 0; }
  100% { background-position: 300px 0; }
`;

export const LoaderGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  padding: 6px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;


export const ShimmerCard = styled.div`
  height: 140px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.05) 0%,
    rgba(255, 255, 255, 0.12) 50%,
    rgba(255, 255, 255, 0.05) 100%
  );
  background-size: 600px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
  box-shadow: 0 6px 18px rgba(108, 200, 255, 0.1);
`;