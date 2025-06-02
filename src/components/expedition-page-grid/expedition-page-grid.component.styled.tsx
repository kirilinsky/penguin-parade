import styled from "styled-components";

export const ExpeditionPageGrid = styled.div`
  display: grid;
  grid-template-areas: "img title" "img desc" "img status" "img buttons" "part part";
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
 color: #ffffff;
  @media (max-width: 1068px) {
    row-gap: 0.75rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    align-items: center;
    grid-template-areas:
      "title"
      "img"
      "desc"
      "status"
      "buttons"
      "part";
    row-gap: 0.75rem;
  }
`;

export const ExpeditionPageImage = styled.div`
  grid-area: img;
  border: 1px solid #fff;
  display: grid;
  place-items: center;

  img {
    height: 80vh;
    width: auto;
    max-width: 100%;
    aspect-ratio: 1 / 2;
    object-fit: cover;
    border-radius: 8px;
    @media (max-width: 768px) {
      height: 65vh;
    }
  }
`;

export const ExpeditionPageTitle = styled.div`
  outline: 1px dashed green;
  grid-area: title;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 0.5em;

  h1 {
    text-align: center;
  }
`;

export const ExpeditionPageDescription = styled.div`
  grid-area: desc;
  outline: 1px dashed red;
 
  font-size: 20px;
  flex-grow: 2;
  line-height: 2;
  padding: 1em;
`;

export const ExpeditionParticipants = styled.div`
  grid-area: part;
  font-size: 0.9rem;
  outline: 1px dotted blue;
 
  padding: 1em;
`;

export const ExpeditionStatus = styled.div`
  grid-area: status;
  gap:1em;
  display:flex; 
  align-items:center;
  justify-content:center; 
  font-size: 0.9rem;
  outline: 1px dotted turquoise;
 
  padding: 1em;
`;

export const ExpeditionButtons = styled.div`
  grid-area: buttons;
  outline: 1px dotted yellow;
  display: grid;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1em;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
