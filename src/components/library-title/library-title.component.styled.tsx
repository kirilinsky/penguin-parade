import styled from "styled-components";

export const LibraryTitleWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 2em;
  font-family: "Tektur", sans-serif;
  flex-wrap: wrap;
`;

export const LeftBlock = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const RightBlock = styled.div`
  display: flex;

  justify-content: space-between;
  gap: 1em;
  flex-wrap: wrap;
  @media (max-width: 1060px) {
    width: 100%;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;
