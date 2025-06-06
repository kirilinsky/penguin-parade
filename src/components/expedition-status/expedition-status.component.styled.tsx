import styled from "styled-components";

export const ExpeditionStatus = styled.div`
  gap: 1em;
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-size: 0.9rem;
  background: rgba(8, 20, 18, 0.7);
  border: 1px solid rgba(0, 255, 213, 0.25);
  box-shadow: 0 0 8px #00ffd533;
  border-radius: 6px;
  flex-wrap: wrap;
  padding: 8px; 
  backdrop-filter: blur(4px);
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(10px);

  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
