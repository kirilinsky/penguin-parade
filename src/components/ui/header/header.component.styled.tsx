import styled from "styled-components";

export const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 72px;
  background-color: #214d26d4;
  @media (max-width: 768px) {
    height: auto;
    padding: 8px 6px;
  }
`;

export const HeaderLinks = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 6px;
  div {
    text-align: center;
    font-size: 15px;
  }
  @media (max-width: 768px) {
    div {
      font-size: 14px;
    }
  }
  @media (max-width: 420px) {
    div {
      font-size: 13px;
    }
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
