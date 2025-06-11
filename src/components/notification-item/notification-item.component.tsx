import styled from "styled-components";

export const NotificationAccordionContainer = styled.div`
  border-radius: 12px;
  margin-bottom: 16px;
  background: #0c0c0c;
  box-shadow: 0 0 12px rgba(0, 255, 255, 0.1);
  transition: box-shadow 0.3s ease;
`;

export const NotificationAccordionHeader = styled.button<{ $unread: boolean }>`
  width: 100%;
  padding: 18px 24px;
  background: ${({ $unread }) => ($unread ? "#111821" : "#0e1116")};
  border: 1px solid #00f0ff;
  border-left: 4px solid ${({ $unread }) => ($unread ? "#ff0066" : "#00f0ff")};
  color: #ffffff;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  text-align: left;
  transition: all 0.3s ease;
  font-family: "Orbitron", sans-serif;

  &:hover {
    background: #151b24;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.4);
  }
`;

export const NotificationTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NotificationTypeSpan = styled.span`
  font-weight: 600;
  font-size: 18px;
  color: #00f0ff;
  text-shadow: 0 0 6px rgba(0, 255, 255, 0.6);
`;

export const NotificationTimestamp = styled.span`
  margin-top: 6px;
  font-size: 12px;
  color: #999;
`;

export const NotificationAccordionBody = styled.div`
  padding: 16px 24px;
  background: #0a0d11;
  border-top: 1px solid #00f0ff;
  color: #ccc;
  font-size: 15px;
  line-height: 1.5;
`;

export const NotificationUnreadDot = styled.div`
  width: 12px;
  height: 12px;
  background: #ff0066;
  border-radius: 50%;
  box-shadow: 0 0 8px #ff0066;
  margin-left: 12px;
`;
