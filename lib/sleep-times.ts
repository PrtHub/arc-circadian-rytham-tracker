// Data for the "what time should I go to bed / wake up" pages.
// Same model as the sleep cycle calculator: ~90-minute cycles plus ~15 minutes to fall asleep.

import { halfLifeFor, hoursToClear } from "@/lib/caffeine";
import { formatClock } from "@/lib/time";

export const CYCLE_MINS = 90;
export const FALL_ASLEEP_MINS = 15;
const DAY = 24 * 60;
const norm = (m: number) => ((m % DAY) + DAY) % DAY;

// 4:30 AM to 9:00 AM, and 9:00 PM to 1:00 AM, every half hour.
export const WAKE_TIMES = Array.from({ length: 10 }, (_, i) => 4 * 60 + 30 + i * 30);
export const BED_TIMES = Array.from({ length: 9 }, (_, i) => norm(21 * 60 + i * 30));

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
