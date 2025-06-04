import styled from "styled-components";

export const CrystalBlockGrid = styled.div`
  display: grid;
  width: 100%;
  padding: 0.5em;
  grid-template-columns: repeat(auto-fill, 155px);
  gap: 2em 1em;
  justify-content: center;
`;

export const CrystalBlockEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
