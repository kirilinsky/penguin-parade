import React from "react";
import { BubbleLayer, BubbleItem } from "./clicker-bubbles.styled";
import { CritBubble } from "@/hooks/use-clicker-bubbles";

export default function CritBubbleLayer({
  bubbles,
  fallbackColor = "#ff99e6",
}: {
  bubbles: CritBubble[];
  fallbackColor?: string;
}) {
  return (
    <BubbleLayer>
      {bubbles.map((b) => (
        <BubbleItem
          key={b.id}
          style={{ left: b.x, top: b.y }}
          $color={b.color ?? fallbackColor}
        >
          {b.text}
        </BubbleItem>
      ))}
    </BubbleLayer>
  );
}
