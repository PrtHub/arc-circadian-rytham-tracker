"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { halfLifeFor, hoursToClear } from "@/lib/caffeine";
import { formatClock, toMinutes } from "@/lib/time";

type Chronotype = "lion" | "bear" | "wolf" | "dolphin";

// Typical defaults and focus/exercise windows, relative to wake time, in the popular Breus framework.
const TYPES: Record<
  Chronotype,
  { name: string; icon: string; defaultWake: string; focus: [number, number]; exercise: [number, number]; note: string }
> = {
  lion: { name: "Lion", icon: "🦁", defaultWake: "06:00", focus: [2, 6], exercise: [0.5, 1.5], note: "Early riser: your sharpest hours come early, and you fade by evening." },
  bear: { name: "Bear", icon: "🐻", defaultWake: "07:00", focus: [3, 7], exercise: [10, 11], note: "Follows the sun: a clear late-morning peak and a noticeable afternoon slump." },
  wolf: { name: "Wolf", icon: "🐺", defaultWake: "08:30", focus: [7.5, 11], exercise: [9.5, 10.5], note: "Night owl: slow mornings, and your best work comes late in the day." },
  dolphin: { name: "Dolphin", icon: "🐬", defaultWake: "06:30", focus: [8.5, 12.5], exercise: [10.5, 11.5], note: "Light sleeper: energy is uneven early and often settles later in the day." },
};

const SLEEP_MINS = 8 * 60 + 15; // 8 h in bed including ~15 min to fall asleep
const LAST_COFFEE_BEFORE_BED = Math.round(hoursToClear(95, halfLifeFor("normal")) * 60);

interface Block {
  at: number;
  end?: number;
  icon: string;
  title: string;
  detail: string;
}

function buildDay(type: Chronotype, wakeTime: string): Block[] {
  const t = TYPES[type];
  const wake = toMinutes(wakeTime);
  const bed = wake - SLEEP_MINS + 24 * 60;
  const h = (hours: number) => wake + Math.round(hours * 60);
  const blocks: Block[] = [
    { at: wake, icon: "⏰", title: "Wake up", detail: "Same time every day, weekends within about an hour." },
    { at: h(0.1), end: h(0.1) + 20, icon: "☀️", title: "Get outside", detail: "About 20 minutes of daylight. Never look directly at the sun." },
    { at: h(1), icon: "☕", title: "First coffee", detail: "If you like to wait a while after waking. Log it and your cutoff follows." },
    { at: h(t.focus[0]), end: h(t.focus[1]), icon: "🧠", title: "Peak focus", detail: "Protect these hours for your hardest work." },
    { at: h(6.5), end: h(8.5), icon: "📉", title: "Afternoon dip", detail: "A short walk or a 20-minute nap beats another coffee." },
    { at: h(t.exercise[0]), end: h(t.exercise[1]), icon: "🏃", title: "Exercise", detail: "A good window for your chronotype." },
    { at: bed - LAST_COFFEE_BEFORE_BED, icon: "🛑", title: "Last safe coffee", detail: "For one average cup, average metaboliser. Bigger cups need earlier." },
    { at: bed - 60, icon: "🌙", title: "Wind down", detail: "Dim the lights and screens for the last hour." },
    { at: bed, icon: "😴", title: "Bed", detail: "About 8 hours before your alarm." },
  ];
  // Order by time of day starting from wake.
  return blocks.sort((a, b) => ((a.at - wake + 1440) % 1440) - ((b.at - wake + 1440) % 1440));
}

// Shared links look like ?type=wolf&wake=0830. Read on the client only; the page is prebuilt.
const subscribe = () => () => {};
const getSearch = () => window.location.search;
const getServerSearch = () => "";

function fromSearch(search: string): { type?: Chronotype; wake?: string } {
  const params = new URLSearchParams(search);
  const type = params.get("type");
  const wake = params.get("wake");
  return {
    type: type && type in TYPES ? (type as Chronotype) : undefined,
    wake: wake && /^\d{4}$/.test(wake) ? `${wake.slice(0, 2)}:${wake.slice(2)}` : undefined,
  };
}

export default function DailyScheduleClient() {
  const shared = fromSearch(useSyncExternalStore(subscribe, getSearch, getServerSearch));
  const [chosenType, setChosenType] = useState<Chronotype | null>(null);
  const [chosenWake, setChosenWake] = useState<string | null>(null);
  const [copied, setCopied] = useState<"" | "link" | "text">("");

  const type = chosenType ?? shared.type ?? "bear";
  const wakeTime = chosenWake ?? shared.wake ?? TYPES[type].defaultWake;
  const day = wakeTime ? buildDay(type, wakeTime) : [];

  const range = (b: Block) => (b.end ? `${formatClock(b.at)} – ${formatClock(b.end)}` : formatClock(b.at));

  const copy = (what: "link" | "text") => {
    const url = `${window.location.origin}/tools/daily-schedule-generator?type=${type}&wake=${wakeTime.replace(":", "")}`;
    const text =
      what === "link"
        ? url
        : `My ${TYPES[type].name} day:\n${day.map((b) => `${range(b)}  ${b.title}`).join("\n")}\n\nMake yours: ${url}`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(what);
        setTimeout(() => setCopied(""), 2000);
      })
      .catch(() => setCopied(""));
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Daily Schedule <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Generator</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Pick your chronotype and when you wake up, and get a day timed to your body clock: when to get light, when to focus,
          when the dip hits, and when to stop the coffee.{" "}
          <Link href="/tools/chronotype-quiz" className="text-accent hover:underline">
            Not sure of your type? Take the quiz.
          </Link>
        </p>
      </header>

      <div className="raised-card p-6 sm:p-8 mb-8 flex flex-col gap-6">
        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Your chronotype</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(Object.keys(TYPES) as Chronotype[]).map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={type === key}
                onClick={() => {
                  setChosenType(key);
                  setChosenWake(TYPES[key].defaultWake);
                }}
                className={`p-3 rounded-xl text-left transition-all ${
                  type === key ? "bg-accent text-black" : "bg-white/5 border border-white/10 text-white hover:border-white/25"
                }`}
              >
                <span className="text-xl" aria-hidden="true">
                  {TYPES[key].icon}
                </span>
                <span className="block text-sm font-bold">{TYPES[key].name}</span>
              </button>
            ))}
          </div>
          <p className="text-xs text-(--fg-muted) mt-2">{TYPES[type].note}</p>
        </div>
        <div className="max-w-xs">
          <label htmlFor="schedule-wake" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            I wake up at
          </label>
          <input
            id="schedule-wake"
            type="time"
            value={wakeTime}
            onChange={(e) => setChosenWake(e.target.value)}
            className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="raised-card border-(--accent)/40 p-6 sm:p-8 mb-12" aria-live="polite">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <p className="eyebrow text-(--fg-muted)">
            Your {TYPES[type].name} day {TYPES[type].icon}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => copy("text")}
              disabled={!wakeTime}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-accent text-black hover:brightness-110"
            >
              {copied === "text" ? "Copied" : "Copy my schedule"}
            </button>
            <button
              type="button"
              onClick={() => copy("link")}
              disabled={!wakeTime}
              className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white hover:border-white/25"
            >
              {copied === "link" ? "Link copied" : "Copy link"}
            </button>
          </div>
        </div>

        {day.length === 0 ? (
          <p className="text-(--fg-muted)">Enter your wake time to build your day.</p>
        ) : (
          <ol className="space-y-2">
            {day.map((b) => (
              <li key={b.title} className="sunken-card p-4 flex items-start gap-3">
                <span className="text-xl shrink-0" aria-hidden="true">
                  {b.icon}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-bold text-white text-sm">{b.title}</span>
                    <span className="font-mono text-sm text-accent">{range(b)}</span>
                  </div>
                  <p className="text-xs text-(--fg-muted) mt-1 leading-relaxed">{b.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
        <p className="text-xs text-(--fg-muted) mt-5 leading-relaxed">
          A starting point based on typical patterns for each chronotype, not a measurement of yours.
        </p>
      </div>

      <section className="raised-card border-(--accent)/30 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 text-white">A schedule that learns</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed">
          This schedule uses typical timings. ARC builds the same kind of day from your own setup, then corrects it: your last
          safe coffee moves every time you log a cup, and after about ten days of one-tap check-ins it measures when your dip
          really lands and moves the plan to match.
        </p>
        <div className="flex justify-center">
          <AppStoreButton size="lg" location="tool_daily_schedule_generator" />
        </div>
      </section>
    </main>
  );
}
