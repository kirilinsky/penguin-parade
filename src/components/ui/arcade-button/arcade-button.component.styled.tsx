import styled from "styled-components";

export const ArcadeButtonStyled = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "appliedColor",
})<{ appliedColor?: string }>`
  position: relative;
  display: inline-block;
  width: 200px;
  height: 200px;
  border: 0;
  margin: 1em;
  outline: none;
  background-color: #c2290a;
  border-radius: 50%;
  opacity: 1;
  cursor: pointer;
  transition: box-shadow 200ms;
  box-shadow: inset 0 6.25px 0
      ${({ appliedColor }) => appliedColor || "#da2e0b"},
    inset 0 -6.25px 0 ${({ appliedColor }) => appliedColor || "#aa2409 "},
    inset 0 0 0 6.25px ${({ appliedColor }) => appliedColor || "#b32609 "},
    inset 0 0 0 16.6666666667px #c2290a, inset 0 0 0 20px #611405,
    inset 0 0 0 21.7391304348px black,
    inset 0 0 0 26.6666666667px rgba(247, 133, 110, 0.7),
    inset 0 0 0 36.3636363636px #c2290a, inset 0 80px 26.6666666667px #aa2409,
    inset 0 0 20px 33.3333333333px #911f08, 0 10px 0 rgba(0, 0, 0, 0.3);
  &:after {
    content: "";
    position: absolute;
    bottom: 10px;
    left: 20px;
    display: block;
    width: 160px;
    height: 160px;
    border: 13.3333333333px solid rgba(0, 0, 0, 0.3);
    border-width: 0 0 13.3333333333px;
    border-radius: 50%;
    transition-duration: 200ms;
  }
  &:active {
    box-shadow: inset 0 6.25px 0 #da2e0b, inset 0 -6.25px 0 #aa2409,
      inset 0 0 0 6.25px #b32609, inset 0 0 0 16.6666666667px #c2290a,
      inset 0 0 0 20px #611405, inset 0 0 0 23.5294117647px black,
      inset 0 0 0 26.6666666667px rgba(247, 133, 110, 0.2),
      inset 0 0 0 36.3636363636px #b32609, inset 0 80px 26.6666666667px #9b2108,
      inset 0 0 20px 33.3333333333px #791a06, 0 10px 0 rgba(0, 0, 0, 0.3);
    background-color: #b8270a;
  }
  &:active:after {
    bottom: 23.3333333333px;
    border-width: 0;
  }
`;
