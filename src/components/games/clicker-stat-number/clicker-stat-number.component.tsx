import React, { useEffect, useRef, useState } from "react";
import { Wrap, Digits } from "./clicker-stat-number.component.styled";

type Props = {
  value: number;
  durationMs?: number;  
  color?: string;
  className?: string;
};

const easeOut = (t: number) => 1 - (1 - t) * (1 - t);

export default function ArcadeCounter({
  value,
  durationMs = 300,
  color = "#9ef5d7",
  className,
}: Props) {
  const [display, setDisplay] = useState(value);
  const [kick, setKick] = useState(0); 
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = display;             
    const delta = value - start;
    if (delta === 0) return;

    setKick((k) => k + 1);               
    const t0 = performance.now();

    const tick = () => {
      const t = (performance.now() - t0) / durationMs;
      if (t >= 1) { setDisplay(value); raf.current && cancelAnimationFrame(raf.current); return; }
      setDisplay(Math.round(start + delta * easeOut(Math.min(1, t))));
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [value, durationMs, display]);

  return (
    <Wrap key={kick} $color={color} className={className}>
      <Digits>{display.toLocaleString()}</Digits>
    </Wrap>
  );
}
