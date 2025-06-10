import styled from "styled-components";

export const StatisticsBlockGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(50% - 2rem), 1fr));
  gap: 2rem;
  width: 100%;
  padding: 1em;

  @media (max-width: 888px) {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }
`;

export const StatisticsBlockItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  gap: 0.5em;
  border-radius: 1em;
  padding: 1em;
  text-align: center;
  background: rgba(10, 30, 20, 0.25);
  border: 1px solid #1affb3;
  box-shadow:
    0 0 10px rgba(26, 255, 179, 0.4),
    inset 0 0 8px rgba(26, 255, 179, 0.2);

  transition: all 0.3s ease;

  &:hover {
    box-shadow:
      0 0 20px rgba(26, 255, 179, 0.6),
      inset 0 0 12px rgba(26, 255, 179, 0.3);
    transform: translateY(-2px);
  }

  span {
    font-size: 17px;
    color: #b6ffec;
    border-bottom: 1px solid rgba(26, 255, 179, 0.4);
    padding-bottom: 0.25em;
  }
`;
