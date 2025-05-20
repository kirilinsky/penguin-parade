import styled, { keyframes } from "styled-components";

type EnergyProps = {
  color: string;
  radius: string;
  duration: string;
};

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const EnergyWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Orb = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "duration",
})<EnergyProps>`
  position: absolute;
  width: ${({ radius }) => `calc(250% + ${radius})`};
  height: ${({ radius }) => `calc(300% + ${radius})`};
  background: ${({ color }) => color};
  border-radius: 50%;
  top: -150%;
  left: -75%;

  animation: ${rotate} ${({ duration }) => duration} linear infinite;
  mix-blend-mode: plus-lighter;
  filter: blur(30px);

  &:nth-child(even) {
    animation-direction: reverse;
  }
`;

export const EvolutionEffect: React.FC = () => {
  const orbs: EnergyProps[] = [
    { color: "#fbad04", radius: "18px", duration: "3.5s" },
    { color: "#03a1d9", radius: "13px", duration: "6s" },
    { color: "#f7036d", radius: "16px", duration: "9.5s" },
    { color: "#93ff16", radius: "20px", duration: "11s" },
  ];

  return (
    <EnergyWrapper>
      {orbs.map((orb, index) => (
        <Orb key={index} {...orb} />
      ))}
    </EnergyWrapper>
  );
};
