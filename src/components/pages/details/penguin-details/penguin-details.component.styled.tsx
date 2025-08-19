import styled from "styled-components";

export const PenguinDetailsPageWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  color: white;
`;

export const PenguinDetailsLeftColumn = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PenguinDetailsRarityTag = styled.div`
  align-self: flex-start;
  font-size: 0.9rem;
  font-weight: bold;
  background: #ff2a2a;
  padding: 0.4em 1em;
  border-radius: 1em;
  margin-bottom: 0.5rem;
`;

export const PenguinDetailsImageWrapper = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  background: radial-gradient(circle, #0ff, #00f); // неоновая обёртка
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5em;
  box-shadow: 0 0 20px #0ff;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
`;

export const PenguinDetailsTitle = styled.h2`
  margin-top: 1rem;
  font-size: 1.8rem;
  text-align: center;
`;

export const PenguinDetailsRightColumn = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const PenguinDetailsOwnerAndHistoryRow = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const PenguinDetailsOwnerBlock = styled.div`
  width: 50%;
  background: #111;
  padding: 1rem;
  border-radius: 1rem;
`;

export const PenguinDetailsHistoryBlock = styled.div`
  width: 50%;
  max-height: 250px;
  overflow-y: auto;
  background: #111;
  padding: 1rem;
  border-radius: 1rem;
`;
