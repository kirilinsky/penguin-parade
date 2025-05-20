import styled from "styled-components";

export const EvolveGridContainerStyled = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "hide",
})<{ hide: boolean; target: string | null }>`
  width: 80vh;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  position: relative;
  grid-template-areas:
    "tla tc tra"
    "mlc c mrc"
    "bla bc bra";
  gap: 3vh;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    opacity: ${({ hide }) => (hide ? 0 : 1)};
    background-color: ${({ target }) => target};
    mix-blend-mode: color;
    pointer-events: none;
  }
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    inset: 0;
    background-image: url("/evo_bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    opacity: ${({ hide }) => (hide ? 0 : 1)};
    transition: opacity 1.5s ease-out;
    pointer-events: none;
    z-index: 0;
  }
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
