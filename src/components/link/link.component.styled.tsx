import Link from "next/link";
import styled from "styled-components";

export const LinkStyled = styled(Link)`
  background: #365c2c;
  color: #fff;
  padding: 6px 12px;
  margin-block: 15px;
  display: block;
  width: max-content;
  border-radius: 3px;
  &:hover {
    transition: linear 0.3s;
    background: #fff;
    color: #365c2c;
  }
`;
