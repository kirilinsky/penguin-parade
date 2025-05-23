import styled from "styled-components";

const EvolutionGridItemDefault = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 1.2em;
  display: grid;
  place-items: center;
  z-index: 1;
  @media (max-width: 500px) {
    aspect-ratio: unset;
    width: 25vw;
    height: 25vh;
    border-radius: .7em;
  }
  &:hover {
    transition: linear 0.2s;
    cursor: pointer;
  }
`;

export const EvolutionGridItemCenterWrap = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
  gap: 39px;
  justify-content: center;
  text-align: center;
`;

export const EvolutionGridItemCenterStyled = styled(
  EvolutionGridItemDefault
).withConfig({
  shouldForwardProp: (prop) =>
    prop !== "result" && prop !== "level" && prop !== "bg",
})<{
  bordercolor: string;
  gridarea: string;
  level: number;
  result: boolean;
  bg: string | null;
}>`
  transition: background 1s ease-in-out;
  grid-area: c;
  opacity: 0;
  opacity: ${({ level, result }) => (level > 1 || result ? 0.9 : 0)};
  box-shadow: ${({ bordercolor }) => `0 0 10px ${bordercolor}`};
  border: ${({ bordercolor }) => `1px solid ${bordercolor}`};
  ${({ result, level, bordercolor }) =>
    !result &&
    `background: linear-gradient(to top,  ${bordercolor} ${level}%,  #081108 ${
      level + (level ? 10 : 0)
    }%); `};
  ${({ result }) =>
    result && `transition: background 1s ease-in;transform: scale(1.2);`}
  ${({ bg }) => bg && `background-image: url(${bg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    box-shadow: ${({ bordercolor }) => `0 0 20px ${bordercolor}`};
  }
`;

export const EvolutionGridItemStyled = styled(
  EvolutionGridItemDefault
).withConfig({
  shouldForwardProp: (prop) =>
    prop !== "result" && prop !== "mounted" && prop !== "value",
})<{
  gridarea: string;
  bordercolor: string;
  value: string | null;
  result: boolean;
  mounted: boolean;
}>`
  background: ${({ value }) =>
    value ? `url(${value}) center/cover no-repeat` : "#212821"};
  opacity: ${({ mounted }) => (mounted ? 0.96 : 0)};
  transform: ${({ mounted }) => (mounted ? "scale(1)" : "scale(0.95)")};
  transition: opacity 0.7s ease-in-out;
  box-shadow: ${({ bordercolor }) => `0 0 10px ${bordercolor}`};
  border: ${({ bordercolor }) => `1px solid ${bordercolor}`};
  grid-area: ${({ gridarea }) => gridarea};

  ${({ result }) =>
    result &&
    `opacity: 0; pointer-events: none; transition: opacity 3s ease-out;`}

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
    }
    return `transform: ${transform};`;
  }}& button {
    display: none;
  }

  &:hover {
    box-shadow: ${({ bordercolor }) => `0 0 20px ${bordercolor}`};
    & button {
      display: block;
      position: absolute;
      padding: 10px;
    }
  }
`;
