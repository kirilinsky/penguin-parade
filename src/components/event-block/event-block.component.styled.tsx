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
  z-index: 5;

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
    h3 {
      font-size: 1.2rem;
    }
  }
`;

export const PenguinCard = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "backgroundImage",
})<{ backgroundImage: string }>`
  position: relative;
  width: 100%;
  height: 500px;
  background-image: ${(props) => `url("${props.backgroundImage}")`};
  background-size: cover;
  background-position: center;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.4);

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 360px;
  }
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
  gap: 0.7rem;
  flex-wrap: nowrap;

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0.6rem;
  }
`;

export const ButtonBlock = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  text-align: center;
  gap: 0.2rem;
`;

export const InfoBlock = styled.div`
  flex-grow: 1;

  p {
    margin: 0;
    font-size: 1rem;
    opacity: 0.85;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 0.9rem;
    }
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
    opacity: 0.45;
  }

  @media (max-width: 480px) {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
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
