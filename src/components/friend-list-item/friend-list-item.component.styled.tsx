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

export const FriendListItemButtons = styled.div`
  display: flex;
  gap: 10px;
  button {
    padding: 3px;
  }
`;

export const FriendListItemName = styled.p`
  font-weight: bold;
`;
