import Image from "next/image";
import styled from "styled-components";

export const UserListItemContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 0 solid #fff;
  border-bottom-width: 1px;
  padding: 15px;
  gap: 15px;
  margin-block: 10px;
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

export const UserListItemAvatar = styled(Image)`
  border: 1px solid #fff;
  box-shadow: 0 0 7px #fff;
`;
