import { Timestamp } from "firebase/firestore";

type GenerationCheckResult = {
  isAllowed: boolean;
  timeLeft: number;
};

export function evaluateGenerationState(
  time: Timestamp | number | Date
): GenerationCheckResult {
  const target =
    time instanceof Timestamp
      ? time.toMillis()
      : time instanceof Date
      ? time.getTime()
      : time;

  const now = Date.now();
  const timeLeft = Math.max(target - now, 0);

  return {
    isAllowed: now >= target,
    timeLeft,
  };
}
