import styled from "styled-components";

export const EvolutionGridItemStyled = styled.div<{ gridarea: string }>`
  background: #1a1a2e;
  aspect-ratio: 1 / 1;
  border-radius: 2em;
  opacity: 0.9;
  display: grid;
  place-items: center;
  border: 1px solid #fff;
  grid-area: ${({ gridarea }) => gridarea};
  @media (max-width: 500px) {
    aspect-ratio: unset;
    width: 25vw;
    height: 25vh;
    border-radius: 1em;
  }
  ${({ gridarea }) => {
    let transform = "none";
    switch (gridarea) {
      case "tla":
        transform = "translate(2.5%, 5%)";
        break;
      case "tra":
        transform = "translate(-2.5%, 5%)";
        break;
      case "tc":
        transform = "translateY(-7.5%)";
        break;
      case "mlc":
        transform = "translateX(-7.5%)";
        break;
      case "mrc":
        transform = "translateX(7.5%)";
        break;
      case "bla":
        transform = "translate(2.5%,-5%)";
        break;
      case "bra":
        transform = "translate(-2.5%,-5%)";
        break;
      case "bc":
        transform = "translateY(7.5%)";
        break;
      default:
        break;
    }
    return `transform: ${transform};`;
  }};
  &:hover {
    transform: scale(1.04);
    transition: linear .2s;
    cursor: pointer;
  }
`;
