export function evaluateGenerationState(lastGeneratedAt: Date | null) {
  if (!lastGeneratedAt) return { canGenerate: true, remainingMs: 0 };

  const now = new Date();
  const diff = now.getTime() - lastGeneratedAt.getTime();
  const DAY_MS = 24 * 60 * 60 * 1000;

  const canGenerate = diff >= DAY_MS;
  const remainingMs = canGenerate ? 0 : DAY_MS - diff;

  return { canGenerate, remainingMs };
}
