import Link from "next/link";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  background: #34562b;
  color: #fad5d5;
  padding: 6px 12px;
  margin-block: 16px;
  display: block;
  width: max-content;
  border-radius: 3px;
  &:hover {
    transition: linear 0.2s;
    background: #fff;
    color: #365c2c;
  }
`;
