import React from "react";
import styled from "styled-components";

interface TelegramShareButtonProps {
  url: string;
  text?: string;
}

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #0f2027;
  color: #00cfff;
  border: 1.5px solid #00cfff;
  border-radius: 6px;
  font-weight: 600;
  letter-spacing: 0.03em;
  font-family: "Tektur", sans-serif;
  font-size: 0.95rem;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease-in-out;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    box-shadow: 0 0 10px #00cfff;
    opacity: 0.4;
    z-index: -1;
    transition: opacity 0.2s ease-in-out;
  }

  &:hover {
    background-color: #08161d;
    color: #9aeaff;
    
  }

  &:hover::after {
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #00cfff;
  }
`;

export const TelegramShareButton: React.FC<TelegramShareButtonProps> = ({
  url,
  text = "",
}) => {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;

  return (
    <a href={shareUrl} target="_blank" rel="noopener noreferrer">
      <StyledButton>📤 Share to Telegram</StyledButton>
    </a>
  );
};
