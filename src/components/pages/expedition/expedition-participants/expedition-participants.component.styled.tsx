import Image from "next/image";
import styled from "styled-components";

export const ExpeditionParticipantsWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  padding: 0.75em;
  backdrop-filter: blur(6px);
  background: rgba(8, 20, 18, 0.7);
  box-shadow: inset 0 0 8px #0ff4ff55, 0 0 5px #00bcd4;
  animation: fadeIn 0.6s ease forwards;
  opacity: 0;
  transform: translateY(10px);

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ExpeditionParticipantsStyled = styled.div`
  grid-area: part;
  font-size: 0.9rem;
  align-self: stretch;

  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  padding: 0.5em;
   @media (max-width: 768px) {
    padding:   1em 0;
   }
`;

export const ExpeditionParticipantsAddItem = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #3c6d53 0%, #2d5c44 100%);
  border: 1px solid #00ffd5;
  color: #baffde;
  box-shadow: 0 0 8px #00ffd5a1;
  transition: transform 0.3s ease-out, box-shadow 0.3s ease;
  animation: pulseGlow 2.5s infinite ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    box-shadow: 0 0 14px #00ffd5cc, 0 0 6px rgba(255, 255, 255, 0.1);
  }

  @keyframes pulseGlow {
    0%,
    100% {
      box-shadow: 0 0 8px #00ffd5a1;
    }
    50% {
      box-shadow: 0 0 14px #00ffd5cc;
    }
  }
`;

export const ExpeditionParticipantsItem = styled(
  ExpeditionParticipantsAddItem
).withConfig({
  shouldForwardProp: (prop) =>
    prop !== "borderColor" && prop !== "disableRemove",
})<{ borderColor: string; disableRemove: boolean }>`
  position: relative;
  overflow: hidden;
  border: 1px solid ${({ borderColor }) => borderColor};
  background: radial-gradient(circle at 30% 30%, #2a4943, #1d2f2b);
  box-shadow: 0 0 8px ${({ borderColor }) => borderColor + "aa"};
  transition: all 0.3s ease-in-out;

  &:hover::after {
    content: ${({ disableRemove }) => (disableRemove ? "''" : "'×'")};
    position: absolute;
    font-size: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    background: #000000c8;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 11;
    transition: all 0.6s ease-in;
  }
`;

export const ExpeditionParticipantsItemImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
