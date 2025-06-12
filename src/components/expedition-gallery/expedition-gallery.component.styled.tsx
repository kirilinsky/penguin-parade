import styled from "styled-components";

export const ExpeditionGalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% - 1rem), 1fr));
  gap: 3rem 1rem;
  width: 100%;
  @media (max-width: 888px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
