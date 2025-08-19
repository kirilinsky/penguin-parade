import { LinkStyled } from "@/components/ui/link/link.component.styled";
import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(1rem); }
  100% { opacity: 1; transform: translateY(0); }
`;

export const GameCardWrapper = styled.article`
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);

  aspect-ratio: 13 / 10;
  min-height: 270px;

  animation: ${fadeInUp} 0.6s ease forwards;
  opacity: 0;
  transform: translateY(8px);
  &[data-ready="true"] {
    opacity: 1;
    transform: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5),
      0 0 60px rgba(255, 100, 220, 0.15),
      inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
`;

export const GameCardImageWrap = styled.div`
  position: absolute;
  inset: 0;

  img,
  span > img {
    object-fit: cover;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 60%,
      rgba(0, 0, 0, 0.65) 100%
    );
  }
`;

export const GameCardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1em;

  padding: 0.5em 1em;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1em) saturate(160%);
  border-top: 1px solid rgba(255, 255, 255, 0.18);
`;

export const GameCardContentSide = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GameCardTitle = styled.h3`
  margin: 0;
  font-weight: 700;
  color: #fff;
`;

export const GameCardDesc = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.85rem;
`;

export const GameCardFooter = styled.div`
  display: flex;
  align-items: center;
`;

export const GameCardPrimaryLink = styled(LinkStyled)`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin: 0.4rem 0;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0.05)
  );
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(0.4rem);
  color: #fff;
  text-decoration: none;
  transition: transform 0.12s ease, box-shadow 0.12s ease;

  &:hover {
    transform: translateY(-1px);
  }
  &:active {
    transform: translateY(0);
  }
`;
