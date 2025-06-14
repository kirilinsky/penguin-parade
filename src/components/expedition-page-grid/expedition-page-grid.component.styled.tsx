import styled from "styled-components";

export const ExpeditionPageGrid = styled.div`
  color: #ffffff;
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    height: auto;
  }
`;

export const ExpeditionPageImage = styled.div`
  width: 35%;
  position: sticky;

  top: 80px;
  height: calc(100vh - 100px);

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
    aspect-ratio: 3 / 5;
    object-fit: cover;
    border-radius: 1em;
  }
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    height: auto;
    width: 100%;
  }
`;

export const ExpeditionContentColumn = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow-y: auto;
  gap: 1.3rem;
  @media (max-width: 768px) {
    position: relative;
    padding: 0;
    height: auto;
    width: 100%;
    top: -12vh;
  }
`;

export const ExpeditionPageTitle = styled.div`
  font-weight: bold;
  gap: 0.5em;
  @media (max-width: 768px) {
    font-size: 19px;
    background: #00000092;
    width:100%;
    padding-block:1em;
    backdrop-filter:blur(3px)
  }
  h1 {
    text-align: center;
  }
`;

export const ExpeditionPageDescription = styled.div`
  font-size: 18px;
  line-height: 1.7;
  color: #d6f1ff;
  background: rgba(0, 32, 45, 0.3);
  padding: 1.2em;
  border-radius: 8px;
  box-shadow: inset 0 0 8px #0ff4ff55, 0 0 5px #00bcd4;
  text-align: justify;
  white-space: pre-line;
  p {
    margin: 0;
  }
`;

export const ExpeditionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  button {
    height: 40px;
  }
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
