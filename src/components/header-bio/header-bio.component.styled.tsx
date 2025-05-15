import Image from "next/image";
import styled from "styled-components";

export const HeaderBioWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border: 1px solid #fff;
  border-radius: 25px;
  padding: 5px 10px;
  transition: linear 0.25s;
  &:hover {
    box-shadow: 2px 2px 3px black, inset 0 0 4px #fff;
    cursor: pointer;
  }
`;

export const HeaderBioCoinImage = styled.img`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
`;

export const HeaderBioAvatar = styled(HeaderBioCoinImage)<{ borderColor: string }>`
  border: 1.5px solid ${({ borderColor }) => borderColor};
  box-shadow:0 0 6px ${({ borderColor }) => borderColor};
`;
