import styled from "styled-components";

export const EvolutionModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow-y: auto;
`;

export const EvolutionModalGallery = styled.div`
  margin-top: 10px;
  display: grid;
  padding-inline: 5px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 2.5em;
  width: 100%;
`;

export const EvolutionModalGalleryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 5px #fff;
  border-radius: 2px;
  transition: transform linear 0.4s;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    transition: transform linear 0.14s;
  }
   &:focus,&:active {
    cursor: pointer;
    transform: scale(.99);
    box-shadow: 0 0 25px #fff;
    transition:   linear 0.14s;
  }
`;
