import styled, { keyframes } from "styled-components";

export const TopOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  padding: 1rem 1.5rem;
  backdrop-filter: blur(10px);
  background: rgba(0, 0, 0, 0.25);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 1.5rem 1.5rem 0 0;
  color: #fff;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }
`;

export const PenguinCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})<{ backgroundImage: string }>`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: ${(props) => `url("${props.backgroundImage}")`};
  background-size: cover;
  background-position: center;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);
`;

export const GlassOverlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1.1rem;
  backdrop-filter: blur(12px);
  background: rgba(24, 23, 23, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0 0 1.5rem 1.5rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

export const InfoBlock = styled.div`
  flex: 1;
  gap: .4rem;

  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.85;
  }
`;

export const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 0.6rem 1.2rem;
  border-radius: 0.8rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }
`;
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const LoaderOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top-color: white;
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
