import Image from "next/image";
import styled from "styled-components";

export const FriendListItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const FriendListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const FriendListItemAvatar = styled(Image)`
  border: 1px solid #fff;
  box-shadow: 0 0 7px #fff;
`;
