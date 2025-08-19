import styled from "styled-components";

export const ExpeditionStatusInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 8px 10px;
  font-weight: 600;
  color: #b0e8d3;
  background: linear-gradient(135deg, rgba(30, 60, 52, 0.6), rgba(20, 40, 38, 0.8));
  box-shadow: inset 0 0 6px #00ffd5a8, 0 0 4px #00ffd522;
  transition: box-shadow 0.3s ease;
  gap:5px;
  span{
    text-align: center;
  }
  &:hover {
    box-shadow: inset 0 0 8px #00ffd5cc, 0 0 6px #00ffd555;
  }

  p {
    color: #ffffff;
    margin: 0;
    font-size: 0.85rem;
  }
`;
