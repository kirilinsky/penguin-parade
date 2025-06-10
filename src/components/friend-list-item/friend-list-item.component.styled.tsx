import styled from "styled-components";

export const FriendListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 16px;
  padding: 12px 16px;
  border: 1px solid #444;
  border-radius: 12px;
  background-color: #111;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1a1a1a;
  }
 
`;

export const FriendListItemContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
export const FriendListBioWarpper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  text-align: center;
`;

export const FriendListItemButtons = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1em;

  button {
    padding: 0.5em 1em;

    background-color: #222;
    color: #fff;
    font-weight: 500;
    font-size: 13px;
  }
`;

export const FriendListItemName = styled.p`
  font-weight: 600;
  font-size: 19px;
  color: #f0f0f0;
  font-family: "Orbitron", sans-serif;
`;
