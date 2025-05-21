import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 77px;
  background-color: #214d26d4;
  @media (max-width: 468px) {
    height: 60px;
  }
`;

export const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const HeaderOpenMobileMenuButton = styled.button`
  border: 1px solid #ffffffe9;
  border-radius: 25px;
  padding: 5px 10px;
  background: transparent;
  font-size: 19px;
  display: none;
  @media (max-width: 768px) {
    display: flex;
  }
  @media (max-width: 468px) {
    font-size: 21px;
  }
`;
