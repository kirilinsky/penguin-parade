import styled from "styled-components";

export const CrystalsSelectorWrapper = styled.div`
  width: 100%;
  border: 1px solid #444;
  border-radius: 8px;
  overflow: hidden;
`;

export const CrystalsSelectorHeader = styled.button`
  background: #222;
  color: #fff;
  padding: 1rem;
  width: 100%;
  text-align: left;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #333;
  }
`;

export const CrystalsSelectorContent = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})<{
  isOpen: boolean;
  height: number;
}>`
  overflow: hidden;
  max-height: ${({ isOpen, height }) => (isOpen ? `${height + 10}px` : "0")};
  transition: max-height 0.3s ease;
  background: #111;
  padding: ${({ isOpen }) => (isOpen ? "0" : "0 1rem")};
  color: #ccc;
`;

export const CrystalsSelectorApplied = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  background: #222;
  color: #fff;
  padding: 1rem;
  width: 100%;
  text-align: left;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background: #333;
  }
`;

export const CrystalsSelectorOption = styled(CrystalsSelectorHeader)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2em;
  span {
    font-size: 20px;
  }
  b {
    background: #ccccccc6;
    padding: 5px;
    color: #000;
    border-radius: 4px;
    box-shadow: inset 0 0 3px #fff;
  }
`;

export const CrystalsSelectorOptionCancel = styled.button`
  padding: 5px;
`;
