// Data for the "what time should I go to bed / wake up" pages.
// Same model as the sleep cycle calculator: ~90-minute cycles plus ~15 minutes to fall asleep.

import { halfLifeFor, hoursToClear } from "@/lib/caffeine";
import { formatClock } from "@/lib/time";

export const CYCLE_MINS = 90;
export const FALL_ASLEEP_MINS = 15;
const DAY = 24 * 60;
const norm = (m: number) => ((m % DAY) + DAY) % DAY;

// Comprehensive wake times (4:00 AM to 1:00 PM) in 15-minute and 30-minute intervals
export const WAKE_TIMES: number[] = [
  // 4:00 - 4:45 AM
  4 * 60, 4 * 60 + 15, 4 * 60 + 30, 4 * 60 + 45,
  // 5:00 - 5:45 AM
  5 * 60, 5 * 60 + 15, 5 * 60 + 30, 5 * 60 + 45,
  // 6:00 - 6:45 AM
  6 * 60, 6 * 60 + 15, 6 * 60 + 30, 6 * 60 + 45,
  // 7:00 - 7:45 AM
  7 * 60, 7 * 60 + 15, 7 * 60 + 30, 7 * 60 + 45,
  // 8:00 - 8:45 AM
  8 * 60, 8 * 60 + 15, 8 * 60 + 30, 8 * 60 + 45,
  // 9:00 - 9:45 AM
  9 * 60, 9 * 60 + 15, 9 * 60 + 30, 9 * 60 + 45,
  // 10:00 - 10:45 AM
  10 * 60, 10 * 60 + 15, 10 * 60 + 30, 10 * 60 + 45,
  // Midday / Shift-work mornings
  11 * 60, 11 * 60 + 30,
  12 * 60, 12 * 60 + 30,
  13 * 60,
];

// Comprehensive bed times (7:00 PM to 5:00 AM) in 15-minute intervals, including shift work
export const BED_TIMES: number[] = [
  // 7:00 - 7:45 PM
  19 * 60, 19 * 60 + 30, 19 * 60 + 45,
  // 8:00 - 8:45 PM
  20 * 60, 20 * 60 + 15, 20 * 60 + 30, 20 * 60 + 45,
  // 9:00 - 9:45 PM
  21 * 60, 21 * 60 + 15, 21 * 60 + 30, 21 * 60 + 45,
  // 10:00 - 10:45 PM
  22 * 60, 22 * 60 + 15, 22 * 60 + 30, 22 * 60 + 45,
  // 11:00 - 11:45 PM
  23 * 60, 23 * 60 + 15, 23 * 60 + 30, 23 * 60 + 45,
  // 12:00 - 12:45 AM
  norm(0), norm(15), norm(30), norm(45),
  // 1:00 - 1:45 AM
  norm(1 * 60), norm(1 * 60 + 15), norm(1 * 60 + 30), norm(1 * 60 + 45),
  // 2:00 - 2:45 AM
  norm(2 * 60), norm(2 * 60 + 15), norm(2 * 60 + 30), norm(2 * 60 + 45),
  // 3:00 - 3:30 AM
  norm(3 * 60), norm(3 * 60 + 30),
  // Shift worker day sleep (4:00 - 5:00 AM)
  norm(4 * 60), norm(4 * 60 + 30), norm(5 * 60),
];

// 390 -> "6-30am", 1320 -> "10pm", 0 -> "12am"
export function timeSlug(minutes: number) {
  const m = norm(minutes);
  const h24 = Math.floor(m / 60);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mins = m % 60;
  return `${h12}${mins ? `-${String(mins).padStart(2, "0")}` : ""}${h24 < 12 ? "am" : "pm"}`;
}

// "6:30 AM" / "6 AM" for headings
export function timeLabel(minutes: number) {
  const full = formatClock(minutes);
  return full.replace(":00 ", " ");
}

export function parseTimeSlug(slug: string): number | null {
  const match = slug.match(/^(\d{1,2})(?:-(\d{2}))?(am|pm)$/);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2] ?? 0);
  if (h < 1 || h > 12 || m > 59) return null;
  return ((h % 12) + (match[3] === "pm" ? 12 : 0)) * 60 + m;
}

export interface SleepOption {
  cycles: number;
  hours: number;
  time: number; // minutes after midnight
  recommended: boolean;
}

export function bedtimesForWake(wake: number): SleepOption[] {
  return [6, 5, 4, 3].map((cycles) => ({
    cycles,
    hours: (cycles * CYCLE_MINS) / 60,
    time: norm(wake - cycles * CYCLE_MINS - FALL_ASLEEP_MINS),
    recommended: cycles === 5 || cycles === 6,
  }));
}

export function wakeTimesForBed(bed: number): SleepOption[] {
  return [6, 5, 4, 3].map((cycles) => ({
    cycles,
    hours: (cycles * CYCLE_MINS) / 60,
    time: norm(bed + FALL_ASLEEP_MINS + cycles * CYCLE_MINS),
    recommended: cycles === 5 || cycles === 6,
  }));
}

// Last time one average cup (~95 mg) falls below 50 mg by bedtime, for an average metaboliser.
export function lastCoffeeFor(bed: number) {
  return norm(bed - Math.round(hoursToClear(95, halfLifeFor("normal")) * 60));
}

// How early or late a wake time is, for tailored advice.
export function wakeBand(wake: number): "early" | "typical" | "late" {
  if (wake <= 5 * 60 + 30) return "early";
  if (wake <= 7 * 60 + 30) return "typical";
  return "late";
}

// Bedtimes are compared on an evening scale where after-midnight counts as late.
export function bedBand(bed: number): "early" | "typical" | "late" {
  const evening = bed < 12 * 60 ? bed + DAY : bed;
  if (evening <= 22 * 60) return "early";
  if (evening <= 23 * 60 + 30) return "typical";
  return "late";
}
