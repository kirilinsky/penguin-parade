import Image from "next/image";
import styled from "styled-components";

interface AvatarProps {
  $borderColor: string;
}

export const AvatarComponentStyled = styled(Image)<AvatarProps>`
  border: 1.5px solid ${({ $borderColor }) => $borderColor};
  box-shadow: 0 0 8px ${({ $borderColor }) => $borderColor};
`;
