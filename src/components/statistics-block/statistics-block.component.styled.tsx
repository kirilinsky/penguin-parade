import styled from "styled-components";

export const StatisticsBlockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% - 2rem), 1fr));
  gap: 2rem;
  width: 100%;
  padding: 1em;
  @media (max-width: 888px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 5px;
  }
`;

export const StatisticsBlockItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  font-size: 19px;
  gap: 0.5em;
  border: 1px solid #415948c3;
  border-radius: 1em;
  padding: 5px;text-align: center;
  span {
    font-size: 17px;
    border-bottom: 1px solid #155d18;
  }
`;
