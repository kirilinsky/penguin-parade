import styled from "styled-components";

/* TODO: expand grid system through all app */
export const GridSystem = styled.section`
  width: 100%;
  margin: 0 auto;
  display: grid;
  gap: 1.2rem;

  grid-template-columns: repeat(auto-fill, minmax(350px, 2fr));

  max-width: 1400px;
`;
