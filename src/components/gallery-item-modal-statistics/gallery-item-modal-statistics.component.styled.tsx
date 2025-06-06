import styled from "styled-components";

export const GalleryItemModalStatisticsGrid = styled.div`
  display: grid;
  gap: 1em;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  animation: fadeIn 0.5s ease-in-out;

  @media (max-width: 888px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const GalleryItemModalStatisticsExpedition = styled.div`
  border: 1px solid turquoise;
  border-radius: 4px;
  grid-column: 1 / -1;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(0, 255, 255, 0.04);
  box-shadow: 0 0 12px rgba(64, 224, 208, 0.2);
  backdrop-filter: blur(4px);
`;

export const GalleryItemModalStatisticsDes = styled.p`
  font-size: 21px;
  grid-column: 1 / -1;
  white-space: normal;
  word-wrap: break-word;
  hyphens: auto;
  text-align: justify;
  line-height: 1.4;
  color: #e0fefb;
  text-shadow: 0 0 3px #0ff;

  @media (max-width: 888px) {
    font-size: 15px;
    grid-column: span 2;
  }
`;

export const GalleryItemModalStatisticsItem = styled.div`
  grid-column: span 2;
  border: 1px solid #0ff;
  box-shadow: 0 0 5px #0ff, inset 0 0 6px rgba(0, 255, 255, 0.1);
  border-radius: 1em;
  padding: 10px;
  background: rgba(15, 25, 25, 0.9);
  color: #ccfefb;

  h3 {
    border-bottom: 1px solid #0ff;
    margin-bottom: 0.3em;
  }

  p {
    text-transform: capitalize;
    color: #eaffff;
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
