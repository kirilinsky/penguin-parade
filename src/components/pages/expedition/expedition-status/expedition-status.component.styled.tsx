import styled from "styled-components";

export const ExpeditionStatus = styled.div`
  gap: 1em;
  display: flex;
  
  
  font-size: 0.9rem;
  background: rgba(8, 20, 18, 0.7);
 
  box-shadow: inset 0 0 8px #0ff4ff55, 0 0 5px #00bcd4;
  border-radius: 6px;
  flex-wrap: wrap;
  padding: 1em 8px; 
  backdrop-filter: blur(4px);
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);
  div{
    flex-grow: 1;
  }
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
