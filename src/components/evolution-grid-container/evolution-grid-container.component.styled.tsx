import styled from "styled-components";

export const EvolveGridContainerStyled = styled.div`
  width: 80vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  background-image: url("/evo_bg.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  grid-template-areas:
    "tla tc tra"
    "mlc c mrc"
    "bla bc bra";
  gap: 3vh;
  @media (max-width: 1200px) {
    margin-top: 4%;
    width: 70vh;
  }
  @media (max-width: 768px) {
    width: 85vw;
  }
  @media (max-width: 500px) {
    width: 95vw;
    gap: 2vh 0.5vh;
    place-items: center;
    background-size: contain;
  }
`;
