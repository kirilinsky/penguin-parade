import styled from "styled-components";

export const ExpeditionPageGrid = styled.div`
  color: #ffffff;
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const ExpeditionPageImage = styled.div`
  width: 35%;
  position: sticky;
  top: 80px;
  height: calc(90vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
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
    width: 70%;
  }
`;

export const ExpeditionContentColumn = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  overflow-y: auto;
  gap: 1.5rem;
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    height: auto;
    width: 100%;
  }
`;

export const ExpeditionPageTitle = styled.div`
  font-weight: bold;
  gap: 0.5em;
  @media (max-width: 768px) {
    font-size: 19px;
  }
  h1 {
    text-align: center;
  }
`;

export const ExpeditionPageDescription = styled.div`
  font-size: 19px;
  line-height: 1.8;
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
