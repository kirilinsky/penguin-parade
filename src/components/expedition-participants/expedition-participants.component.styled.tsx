import styled from "styled-components";

export const ExpeditionParticipantsWrap = styled.div`
  display: flex;
  flex-direction: column;
  outline: 1px solid turquoise;
  border-radius: 4px;
  padding: 0.5em;
`;
export const ExpeditionParticipantsStyled = styled.div`
  grid-area: part;
  font-size: 0.9rem;
  align-self: stretch;

  display: flex; 
  gap: 1em;
  flex-wrap: wrap;
  padding: 0.5em;
`;

export const ExpeditionParticipantsAddItem = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: #3c6d53;
  border: 1px solid #aedcc4;
  color: #c0e7c3;
  &:hover {
    transform: scale(1.11);
    transition: transform 0.3s ease-out;
    cursor: pointer;
  }
`;

export const ExpeditionParticipantsItem = styled(
  ExpeditionParticipantsAddItem
).withConfig({
  shouldForwardProp: (prop) =>
    prop !== "borderColor" && prop !== "disableRemove",
})<{ borderColor: string; disableRemove: boolean }>`
  position: relative;

  overflow: hidden;
  transition: transform 0.3s ease-in;
  border: 1px solid ${({ borderColor }) => borderColor};
  &:hover::after {
    content: ${({ disableRemove }) => (disableRemove ? "" : "×")};
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    width: 100%;
    height: 100%;
    background: #ccc;
    top: 0;
    left: 0;
    z-index: 11;
  }
`;
export const ExpeditionParticipantsItemImage = styled.img`
  width: 100%;
  height: 100%;
`;
