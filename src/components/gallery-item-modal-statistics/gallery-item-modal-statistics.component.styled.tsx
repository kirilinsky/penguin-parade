import styled from "styled-components";

export const GalleryItemModalStatisticsGrid = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  @media (max-width: 888px) {
    grid-template-columns: repeat(2, 1fr); /* адаптив */
  }
`;

export const GalleryItemModalStatisticsDes = styled.p`
  font-size: 21px;
  grid-column: 1 / -1;
  white-space: normal;
  word-wrap: break-word;
  hyphens: auto;
  text-align: justify;
  line-height: 1.4;
  @media (max-width: 888px) {
    font-size: 15px;
    grid-column: span 2;
  }
`;

export const GalleryItemModalStatisticsItem = styled.div`
  grid-column: span 2;
  border: 1px solid #fff;
  box-shadow: 0 0 4px #fff;
  border-radius: 1em;
  padding: 10px;
  h3 {
    border-bottom: 1px solid #fff;
  }

  p {
    text-transform: capitalize;
  }

  @media (max-width: 888px) {
    font-size: 15px;
    grid-column: span 2;
  }
`;

export const GalleryItemModalStatisticsTrait = styled(
  GalleryItemModalStatisticsItem
)`
  grid-column: span 1;
  @media (max-width: 888px) {
    grid-column: span 1;
  }
`;
