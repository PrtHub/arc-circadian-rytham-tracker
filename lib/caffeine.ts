// The ARC app solves for less than this much caffeine still circulating at bedtime.
export const SLEEP_SAFE_MG = 50;

// Same three metaboliser half-lives the ARC app asks about during onboarding.
export const CAFFEINE_SENSITIVITIES = [
  { id: "fast", label: "Fast", halfLife: 4 },
  { id: "normal", label: "Average", halfLife: 5.5 },
  { id: "slow", label: "Slow", halfLife: 7 },
];

export function halfLifeFor(sensitivityId: string) {
  return CAFFEINE_SENSITIVITIES.find((s) => s.id === sensitivityId)?.halfLife ?? 5.5;
}

// Hours for a dose to decay below the sleep-safe line. Zero if it already starts there.
export function hoursToClear(mg: number, halfLife: number) {
  if (mg <= SLEEP_SAFE_MG) return 0;
  return halfLife * Math.log2(mg / SLEEP_SAFE_MG);
}

export function mgRemaining(mg: number, hoursElapsed: number, halfLife: number) {
  return mg * Math.pow(0.5, hoursElapsed / halfLife);
}
