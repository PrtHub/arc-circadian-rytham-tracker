export function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

// Minutes after midnight as "2:45 PM", or "2:45" without the period. Wraps past midnight.
export function formatClock(minutes: number, withPeriod = true) {
  const m = ((Math.round(minutes) % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const clock = `${h12}:${String(m % 60).padStart(2, "0")}`;
  return withPeriod ? `${clock} ${h24 < 12 ? "AM" : "PM"}` : clock;
}
