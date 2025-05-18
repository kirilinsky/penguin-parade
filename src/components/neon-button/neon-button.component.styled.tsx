import styled from "styled-components";

export const NeonButtonStyled = styled.button`
  padding: 10px 15px;
  min-width: 150px;
  max-width: max-content;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  color: #0bf4f3;
  border: 1px solid #0bf4f3;

  line-height: 20px;
  &:hover {
    box-shadow: 0 0 10px #28eded, 0 0 9px #38fbfb inset;
    border: 1px solid #97f9f9;
  }
`;
