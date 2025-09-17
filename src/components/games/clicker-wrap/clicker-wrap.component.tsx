import React, { useEffect, useRef, useState } from "react";
import {
  Layer,
  Particle,
  Ripple,
  Wrapper,
} from "./clicker-wrap.component.styled";

type Props = {
  children: React.ReactNode;
  color?: string;
  particleCount?: number;
  disabled?: boolean;
  className?: string;
  minIntervalMs?: number; 
  maxShots?: number; 
};

type ConfettiStyle = React.CSSProperties & {
  "--tx"?: string;
  "--ty"?: string;
  "--rot"?: string;
};

type Shot = {
  id: number;
  x: number; 
  y: number;
  particles: Array<{
    id: number;
    tx: number;
    ty: number;
    rot: number;
    size: number;
  }>;
};

const DURATION = 560;

const ConfettiEdgeWrapper: React.FC<Props> = ({
  children,
  color = "#86e7ff",
  particleCount = 12,
  disabled,
  className,
  minIntervalMs = 500,
  maxShots = 3,
}) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shots, setShots] = useState<Shot[]>([]);
  const idRef = useRef(0);
  const lastFireAtRef = useRef(0);

  useEffect(() => {
    if (disabled) return;
    const el = hostRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastFireAtRef.current < minIntervalMs) return;
      lastFireAtRef.current = now;

      const r = el.getBoundingClientRect();
      if (
        e.clientX < r.left ||
        e.clientX > r.right ||
        e.clientY < r.top ||
        e.clientY > r.bottom
      )
        return;

      const localX = e.clientX - r.left;
      const localY = e.clientY - r.top;

      const particles = Array.from({ length: particleCount }).map((_, i) => {
        const edge = (Math.random() * 4) | 0;
        let edgeX = 0,
          edgeY = 0;
        if (edge === 0) {
          edgeX = Math.random() * r.width;
          edgeY = 0;
        } else if (edge === 1) {
          edgeX = r.width;
          edgeY = Math.random() * r.height;
        } else if (edge === 2) {
          edgeX = Math.random() * r.width;
          edgeY = r.height;
        } else {
          edgeX = 0;
          edgeY = Math.random() * r.height;
        }

        const overshoot = 1.12 + Math.random() * 0.25;
        const tx = (edgeX - localX) * overshoot;
        const ty = (edgeY - localY) * overshoot;

        return {
          id: i,
          tx,
          ty,
          rot: (Math.random() * 360 - 180) | 0,
          size: 6 + Math.random() * 6,
        };
      });

      const id = ++idRef.current;

      setShots((prev) => {
        const next = [...prev, { id, x: localX, y: localY, particles }];
        return next.length > maxShots
          ? next.slice(next.length - maxShots)
          : next;
      });

      const to = window.setTimeout(() => {
        setShots((prev) => prev.filter((s) => s.id !== id));
      }, DURATION + 80);

      return () => clearTimeout(to);
    };

    el.addEventListener("pointerdown", onPointerDown, { passive: true });
    return () => el.removeEventListener("pointerdown", onPointerDown);
  }, [particleCount, disabled, minIntervalMs, maxShots]);

  return (
    <Wrapper ref={hostRef} className={className}>
      {children}
      <Layer>
        {shots.map((s) => (
          <div key={s.id}>
            <Ripple style={{ left: s.x, top: s.y }} $color={color} />
            {s.particles.map((p) => {
              const style: ConfettiStyle = {
                left: s.x,
                top: s.y,
                "--tx": `${p.tx}px`,
                "--ty": `${p.ty}px`,
                "--rot": `${p.rot}deg`,
              };
              return (
                <Particle
                  key={p.id}
                  $color={color}
                  $size={p.size}
                  style={style}
                />
              );
            })}
          </div>
        ))}
      </Layer>
    </Wrapper>
  );
};

export default ConfettiEdgeWrapper;
