import styled from "styled-components";

export const UserListItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 10px;
  margin-block: 10px;
  transition: linear 0.3s;
  &:hover {
    box-shadow: 0 0 16px #3441d2;

    transition: linear 0.3s;
  }
`;

export const UserListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserListItemContentDivider = styled.div`
  width: 99%;
  height: 1px;
  background: #fff;
`;

export const UserListItemButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  padding: 5px;
`;
