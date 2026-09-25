"use client";

import { useState, useSyncExternalStore } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { halfLifeFor, hoursToClear } from "@/lib/caffeine";
import { formatClock, toMinutes } from "@/lib/time";
import { EducationalNote } from "../_components/tool-extras";

type Direction = "forward" | "back";

// month is 0-based; n = 1 for the first Sunday.
function nthSunday(year: number, month: number, n: number) {
  const first = new Date(year, month, 1);
  return new Date(year, month, 1 + ((7 - first.getDay()) % 7) + (n - 1) * 7);
}

function lastSunday(year: number, month: number) {
  const last = new Date(year, month + 1, 0);
  return new Date(year, month, last.getDate() - last.getDay());
}

const REGIONS = [
  {
    id: "us",
    label: "US & Canada",
    changes: (y: number) => [
      { date: nthSunday(y, 2, 2), direction: "forward" as Direction },
      { date: nthSunday(y, 10, 1), direction: "back" as Direction },
    ],
  },
  {
    id: "eu",
    label: "UK & Europe",
    changes: (y: number) => [
      { date: lastSunday(y, 2), direction: "forward" as Direction },
      { date: lastSunday(y, 9), direction: "back" as Direction },
    ],
  },
  {
    id: "au",
    label: "Australia (NSW, Vic, ACT, Tas, SA)",
    changes: (y: number) => [
      { date: nthSunday(y, 3, 1), direction: "back" as Direction },
      { date: nthSunday(y, 9, 1), direction: "forward" as Direction },
    ],
  },
  {
    id: "nz",
    label: "New Zealand",
    changes: (y: number) => [
      { date: nthSunday(y, 3, 1), direction: "back" as Direction },
      { date: lastSunday(y, 8), direction: "forward" as Direction },
    ],
  },
];

// Today's date on the client only: the page is prebuilt, so the server can't know "today".
const subscribe = () => () => {};
const getToday = () => new Date().toDateString();
const getServerToday = () => null;

function nextChange(regionId: string, todayKey: string) {
  const region = REGIONS.find((r) => r.id === regionId) ?? REGIONS[0];
  const today = new Date(todayKey);
  const year = today.getFullYear();
  return [...region.changes(year), ...region.changes(year + 1)]
    .filter((c) => c.date >= today)
    .sort((a, b) => a.date.getTime() - b.date.getTime())[0];
}

const LAST_COFFEE_MINS = Math.round(hoursToClear(95, halfLifeFor("normal")) * 60);
const dayLabel = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

interface Night {
  date: Date;
  bed: number;
  wake: number;
  wakeNote?: string;
  tip: string;
}

function buildPlan(change: { date: Date; direction: Direction }, bedTime: string, wakeTime: string, days: number, step: number) {
  const bed = toMinutes(bedTime);
  const wake = toMinutes(wakeTime);
  const sign = change.direction === "back" ? 1 : -1; // later before "back", earlier before "forward"
  const nights: Night[] = [];

  for (let d = days; d >= 1; d--) {
    const date = new Date(change.date);
    date.setDate(date.getDate() - d);
    const shift = Math.min(60, step * (days - d + 1));
    const isChangeNight = d === 1;
    const wakeOnNewClock = wake + sign * shift - sign * 60;
    nights.push({
      date,
      bed: bed + sign * shift,
      wake: isChangeNight ? wakeOnNewClock : wake + sign * shift,
      wakeNote: isChangeNight ? "new time" : undefined,
      tip:
        change.direction === "back"
          ? "Get outside in the late afternoon or evening; keep the early morning dim until you get up."
          : "Get about 20 minutes of outdoor light soon after waking; dim screens and lights in the evening.",
    });
  }

  for (let d = 0; d <= 1; d++) {
    const date = new Date(change.date);
    date.setDate(date.getDate() + d);
    nights.push({
      date,
      bed,
      wake,
      tip: "Back to your usual times on the new clock. Morning light at your usual wake time helps the new schedule settle.",
    });
  }

  return nights;
}

const DAY_OPTIONS = [3, 4, 7];
const STEP_OPTIONS = [15, 20];

export default function DaylightSavingPlannerClient() {
  const [region, setRegion] = useState("us");
  const [bedTime, setBedTime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [days, setDays] = useState(4);
  const [step, setStep] = useState(15);
  const todayKey = useSyncExternalStore(subscribe, getToday, getServerToday);

  const change = todayKey ? nextChange(region, todayKey) : null;
  const plan = change && bedTime && wakeTime ? buildPlan(change, bedTime, wakeTime, days, step) : null;
  const daysAway = change && todayKey ? Math.round((change.date.getTime() - new Date(todayKey).getTime()) / 86400000) : null;
  const sleepHours = bedTime && wakeTime ? (((toMinutes(wakeTime) - toMinutes(bedTime)) % 1440) + 1440) % 1440 / 60 : null;

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Daylight Saving Time <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Sleep Planner</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Your body clock doesn&apos;t change when the clocks do. Shifting your sleep 15 to 20 minutes a night for a few nights
          beforehand makes the switch much easier. Pick your region and usual times to get a night-by-night plan.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-8 mb-8 grid sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label htmlFor="dst-region" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Where you live
          </label>
          <select
            id="dst-region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-white scheme-dark focus:outline-none focus:border-accent"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="dst-bed" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Usual bedtime
          </label>
          <input
            id="dst-bed"
            type="time"
            value={bedTime}
            onChange={(e) => setBedTime(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor="dst-wake" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Usual wake time
          </label>
          <input
            id="dst-wake"
            type="time"
            value={wakeTime}
            onChange={(e) => setWakeTime(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent"
          />
        </div>
        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Nights to prepare</p>
          <div className="grid grid-cols-3 gap-2 font-mono">
            {DAY_OPTIONS.map((n) => (
              <button
                key={n}
                type="button"
                aria-pressed={days === n}
                onClick={() => setDays(n)}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                  days === n ? "bg-accent text-black" : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Shift per night</p>
          <div className="grid grid-cols-2 gap-2 font-mono">
            {STEP_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                aria-pressed={step === s}
                onClick={() => setStep(s)}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                  step === s ? "bg-accent text-black" : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                }`}
              >
                {s} min
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="raised-card border-(--accent)/40 p-6 sm:p-8 mb-12" aria-live="polite">
        {!change ? (
          <p className="text-(--fg-muted)">Working out the next clock change for your region…</p>
        ) : (
          <>
            <p className="eyebrow text-(--fg-muted) mb-2">Next clock change</p>
            <p className="text-2xl sm:text-3xl font-bold text-white">
              {change.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
            </p>
            <p className="text-sm text-(--fg-muted) mt-2 leading-relaxed">
              {change.direction === "back"
                ? "Clocks go back one hour overnight, so you get an extra hour. Your body will want to wake up an hour early by the new clock, and evenings will feel long."
                : "Clocks go forward one hour overnight, so you lose an hour. Your body will want to stay up an hour later by the new clock, and mornings will feel early."}
              {daysAway !== null && daysAway > 0 && ` That's ${daysAway} day${daysAway === 1 ? "" : "s"} from now.`}
            </p>

            {daysAway !== null && daysAway < days && daysAway > 0 && (
              <p className="text-xs text-(--aura-sun) mt-3">
                That&apos;s less than {days} nights away, so start with tonight&apos;s row and skip the ones already passed.
              </p>
            )}

            {sleepHours !== null && sleepHours < 7 && (
              <p className="text-xs text-(--aura-sun) mt-3">
                Your usual schedule gives about {sleepHours.toFixed(1)} hours in bed; most adults need at least 7.
              </p>
            )}

            {plan && (
              <ol className="mt-6 space-y-3">
                {plan.map((night, i) => {
                  const isChange = night.wakeNote === "new time";
                  return (
                    <li key={i} className={`sunken-card p-4 ${isChange ? "border border-(--accent)/40" : ""}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <span className="text-sm font-bold text-white">
                          Night of {dayLabel(night.date)}
                          {isChange && <span className="text-accent font-mono text-xs ml-2">clocks change</span>}
                        </span>
                        <span className="font-mono text-sm text-white">
                          Bed {formatClock(night.bed)} → wake {formatClock(night.wake)}
                          {night.wakeNote && <span className="text-(--fg-muted)"> ({night.wakeNote})</span>}
                        </span>
                      </div>
                      <p className="text-xs text-(--fg-muted) mt-2 leading-relaxed">
                        {night.tip} Last coffee by about {formatClock(night.bed - LAST_COFFEE_MINS)} (one average cup).
                      </p>
                    </li>
                  );
                })}
              </ol>
            )}
          </>
        )}
        <EducationalNote />
      </div>

      <section className="raised-card border-(--accent)/30 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 text-white">Let the plan follow the clocks</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed">
          ARC works out clock changes from your time zone, with nothing to set up. It warns you the evening before and stays
          with you through the Sunday and Monday you actually feel, alongside a 20-minute morning light timer from your real
          sunrise and a last safe coffee solved from your own bedtime.
        </p>
        <div className="flex justify-center">
          <AppStoreButton size="lg" location="tool_daylight_saving_time_planner" />
        </div>
      </section>
    </main>
  );
}
