import styled from "styled-components";

export const FriendSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);

  h2 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
    color: #fff;
  }

  h3 {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    font-weight: 500;
    color: #fff;
    opacity: 0.85;
  }
`;

export const SearchInput = styled.input`
  padding: 0.65rem 0.85rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  outline: none;
  font-size: 0.95rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.55);
  }

  &:focus {
    border-color: #6cc8ff;
    box-shadow: 0 0 0 2px rgba(108, 200, 255, 0.3);
  }
`;

export const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ResultItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
  }
`;

export const UserMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;

  strong {
    font-size: 0.95rem;
    font-weight: 500;
    color: #fff;
  }
`;

export const StatusText = styled.span`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.65);
`;
