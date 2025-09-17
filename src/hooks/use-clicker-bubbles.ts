import { useCallback, useRef, useState } from "react";

export type CritBubble = {
  id: number;
  x: number;
  y: number;
  text: string;
  color?: string;
};

type Options = {
  maxBubbles?: number;
  durationMs?: number;
};

export function useClickerBubbles<E extends HTMLElement>(
  containerRef: React.RefObject<E | null> | React.MutableRefObject<E | null>,
  {
    maxBubbles = 6,
    durationMs = 600,
  }: { maxBubbles?: number; durationMs?: number } = {}
) {
  const [bubbles, setBubbles] = useState<CritBubble[]>([]);
  const idRef = useRef(0);

  const emit = useCallback(
    (
      text: string,
      e?: { clientX: number; clientY: number },
      color?: string
    ) => {
      const el = containerRef.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const x = e ? e.clientX - r.left : r.width / 2;
      const y = e ? e.clientY - r.top : r.height / 2;

      const id = ++idRef.current;
      setBubbles((prev) => {
        const next = [...prev, { id, x, y, text, color }];
        return next.length > maxBubbles
          ? next.slice(next.length - maxBubbles)
          : next;
      });

      window.setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => b.id !== id));
      }, durationMs + 50);
    },
    [containerRef, maxBubbles, durationMs]
  );

  return { bubbles, emit };
}
