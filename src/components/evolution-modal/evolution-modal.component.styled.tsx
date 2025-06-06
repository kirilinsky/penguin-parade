import styled from "styled-components";

export const EvolutionModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
  padding: 1.5rem;
  background: radial-gradient(circle at center, #0a0a0a, #050505);
  color: #d4f8ff;
  @media screen and (max-width: 768px) {
    padding: 0.4em;
  }
`;

export const EvolutionModalGalleryScaleWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const EvolutionModalGallery = styled.div`
  margin-block: 26px;
  display: grid;
  padding-inline: 5px;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  gap: 1.5em;
  width: 100%;
  @media screen and (max-width: 768px) {
    gap: 0.5em;
  }
`;

export const EvolutionModalGalleryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #00ffff44;
  background: linear-gradient(145deg, #0f1b20, #081015);
  box-shadow: 0 0 6px #00ffff55, inset 0 0 12px #00c3ff22;
  border-radius: 0.75em;
  padding: 0.6rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    box-shadow: 0 0 20px #0ff, inset 0 0 8px #0ff4;
  }

  &:focus,
  &:active {
    transform: scale(0.98);
    box-shadow: 0 0 25px #0ff, inset 0 0 14px #00bcd4aa;
  }
`;
