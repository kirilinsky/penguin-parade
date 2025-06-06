import React from "react";

interface TelegramShareButtonProps {
  url: string;
  text?: string;
}

export const TelegramShareButton: React.FC<TelegramShareButtonProps> = ({
  url,
  text = "",
}) => {
  const shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;

  return (
    <a href={shareUrl} target="_blank" rel="noopener noreferrer">
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#0088cc",
          color: "#fff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
        }}
      >
        📤 Share to Telegram
      </button>
    </a>
  );
};
