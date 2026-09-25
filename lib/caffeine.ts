// The ARC app solves for less than this much caffeine still circulating at bedtime.
export const SLEEP_SAFE_MG = 50;

// Same three metaboliser half-lives the ARC app asks about during onboarding.
export const CAFFEINE_SENSITIVITIES = [
  { id: "fast", label: "Fast", halfLife: 4 },
  { id: "normal", label: "Average", halfLife: 5.5 },
  { id: "slow", label: "Slow", halfLife: 7 },
];

export function halfLifeFor(sensitivityId: string) {
  return (
    CAFFEINE_SENSITIVITIES.find((s) => s.id === sensitivityId)?.halfLife ?? 5.5
  );
}

// Hours for a dose to decay below the sleep-safe line. Zero if it already starts there.
export function hoursToClear(mg: number, halfLife: number) {
  if (mg <= SLEEP_SAFE_MG) return 0;
  return halfLife * Math.log2(mg / SLEEP_SAFE_MG);
}

export function mgRemaining(
  mg: number,
  hoursElapsed: number,
  halfLife: number,
) {
  return mg * Math.pow(0.5, hoursElapsed / halfLife);
}

export interface LoggedDrink {
  mg: number;
  at: number; // minutes after midnight
}

export function mgAt(
  drinks: LoggedDrink[],
  atMinutes: number,
  halfLife: number,
) {
  return drinks.reduce(
    (sum, d) =>
      d.at <= atMinutes
        ? sum + mgRemaining(d.mg, (atMinutes - d.at) / 60, halfLife)
        : sum,
    0,
  );
}

// Latest time a nextMg cup can start and still leave everything under SLEEP_SAFE_MG at bedtime.
// Null when nothing fits any more (the app's "exhausted" state).
export function latestSafeCup(
  drinks: LoggedDrink[],
  bedMinutes: number,
  halfLife: number,
  nextMg: number,
) {
  const budget = SLEEP_SAFE_MG - mgAt(drinks, bedMinutes, halfLife);
  if (budget <= 0) return null;
  if (nextMg <= budget) return bedMinutes;
  return bedMinutes - halfLife * Math.log2(nextMg / budget) * 60;
}
