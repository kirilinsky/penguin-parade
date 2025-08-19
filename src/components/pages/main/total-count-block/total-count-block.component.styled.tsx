import styled from "styled-components";

export const TotalCountBlockGrid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  min-height: 100px;
  gap: 1em;
  padding: 1em;
`;
export const TotalCountBlockItem = styled.div`
  display: flex;
  align-items: center;
  justify-content:space-evenly;
  flex-direction: column;
  border: 1px solid #415948c3;
  border-radius: 1em;
  padding: 1em;
  aspect-ratio: 1 / 1;
`;
export const TotalCountBlockItemNumber = styled.h2`
  font-size: 5.4vmax
`;
