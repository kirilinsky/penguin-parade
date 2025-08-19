import styled from "styled-components";

export const GamesHeader = styled.div`
  max-width: 1400px;
  margin: 0 auto 1.4rem;
  padding: 0 1rem;
  color: #fff;
  display: flex;
  flex-direction: column;

  h1 {
    font-family: "Tektur", system-ui, sans-serif;

    margin: 0 0 8px;
    font-size: 2.2rem;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    font-size: 1.1rem;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1.4;
  }
`;
