import { useEffect, useMemo, useRef } from "react";

type Options = {
  volume?: number;
  pool?: number;
};

export function usePlayAudio(
  src: string,
  { volume = 0.18, pool = 4 }: Options = {}
) {
  const idxRef = useRef(0);

  const audios = useMemo(() => {
    const arr = Array.from({ length: Math.max(1, pool) }, () => {
      const a = new Audio(src);
      a.preload = "auto";
      a.volume = volume;
      a.crossOrigin = "anonymous";
      return a;
    });
    return arr;
  }, [src, pool, volume]);

  useEffect(() => {}, [audios]);

  const play = (multiplier = 1) => {
    const i = (idxRef.current = (idxRef.current + 1) % audios.length);
    const a = audios[i];
    try {
      a.pause();
      a.currentTime = 0;
      a.playbackRate = multiplier >= 2 ? 1.1 : 1.0;
      a.volume = Math.min(1, volume * (multiplier >= 2 ? 1.15 : 1));
      void a.play();
    } catch {}
  };

  return { play };
}
