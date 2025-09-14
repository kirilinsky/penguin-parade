import styled from "styled-components";

export const LibraryTitleWrapper = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 2em;
  font-family: "Tektur", sans-serif;
  flex-wrap: wrap;
`;

export const LeftBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;

  gap: 0.4rem;
`;

export const AvatarTitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
export const EventsBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 0.35rem;
`;
export const EventsList = styled.div`
  display: flex;
  gap: 0.35rem;
  img {
    transition: linear 0.25s;
    box-shadow: 0 0 2px #dff;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 6px #dff;
      transition: linear 0.15s;
    }
  }
`;

export const RightBlock = styled.div`
  display: flex;

  justify-content: space-between;
  gap: 1em;
  flex-wrap: wrap;
  @media (max-width: 1060px) {
    width: 100%;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
`;
