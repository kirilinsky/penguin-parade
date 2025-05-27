import styled from "styled-components";

export const FriendsListBlockGrid = styled.div`
  display: grid;
  padding: 10px;
  width: 100%;
  max-height: 50vh;
  gap: 15px;
  grid-template-columns: repeat(2, 1fr);
  overflow-y: auto;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;

    padding: 10px;
  }
`;
