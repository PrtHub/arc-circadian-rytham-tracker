"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import mixpanel from "mixpanel-browser";
import { AppStoreButton } from "@/components/AppStoreButton";
import {
  CAFFEINE_SENSITIVITIES,
  SLEEP_SAFE_MG,
  halfLifeFor,
  hoursToClear,
  mgRemaining,
} from "@/lib/caffeine";
import { formatClock, toMinutes } from "@/lib/time";

const DRINKS = [
  { id: "espresso", label: "Espresso shot", phrase: "an espresso shot", mg: 65 },
  { id: "small", label: "Small coffee (8 oz)", phrase: "a small coffee", mg: 95 },
  { id: "energy", label: "Energy drink", phrase: "an energy drink", mg: 160 },
  { id: "medium", label: "Coffee-shop medium", phrase: "a coffee-shop medium", mg: 200 },
];

const SENSITIVITY_HINTS: Record<string, string> = {
  fast: "Coffee after dinner doesn't touch my sleep.",
  normal: "Somewhere in between, or not sure.",
  slow: "An afternoon coffee keeps me up at night.",
};

const AFTERNOON_CUP = 15 * 60; // 3:00 PM, in minutes after midnight
const EARLIEST_SENSIBLE_CUP = 6 * 60;

function formatDuration(hours: number) {
  const total = Math.round(hours * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function CutoffReveal() {
  const [bedtime, setBedtime] = useState("23:00");
  const [drinkId, setDrinkId] = useState("medium");
  const [sensitivity, setSensitivity] = useState("normal");
  const tracked = useRef(false);

  const markUsed = (input: string) => {
    if (tracked.current) return;
    tracked.current = true;
    try {
      mixpanel.track("Cutoff Reveal Used", { first_input: input });
    } catch (e) {
      console.error(e);
    }
  };

  const drink = DRINKS.find((d) => d.id === drinkId) ?? DRINKS[3];
  const halfLife = halfLifeFor(sensitivity);

  let bed = toMinutes(bedtime || "23:00");
  if (bed < 12 * 60) bed += 24 * 60; // an after-midnight bedtime still belongs to tonight

  const hoursNeeded = hoursToClear(drink.mg, halfLife);
  const cutoff = bed - hoursNeeded * 60;
  const exhausted = cutoff < EARLIEST_SENSIBLE_CUP;

  const afternoonMg =
    bed > AFTERNOON_CUP
      ? Math.round(mgRemaining(drink.mg, (bed - AFTERNOON_CUP) / 60, halfLife))
      : null;
  const overLine = afternoonMg !== null && afternoonMg >= SLEEP_SAFE_MG;

  return (
    <section
      id="cutoff"
      aria-labelledby="cutoff-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
            TRY IT · 20 SECONDS
          </p>
          <h2
            id="cutoff-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight"
          >
            When is your
            <br />
            <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">last safe coffee?</span>
          </h2>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed mt-4">
            It depends on three things: when you go to bed, how big the cup is, and how fast your
            body clears caffeine. The target is under {SLEEP_SAFE_MG} mg still in your system at bedtime.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-5 items-stretch">
          {/* Inputs */}
          <div className="raised-card p-6 sm:p-8 flex flex-col gap-7">
            <div>
              <label
                htmlFor="cutoff-bedtime"
                className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono"
              >
                1. When do you go to bed?
              </label>
              <input
                id="cutoff-bedtime"
                type="time"
                value={bedtime}
                onChange={(e) => {
                  setBedtime(e.target.value);
                  markUsed("bedtime");
                }}
                className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
                2. Your usual cup
              </p>
              <div className="grid grid-cols-2 gap-2">
                {DRINKS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    aria-pressed={drinkId === d.id}
                    onClick={() => {
                      setDrinkId(d.id);
                      markUsed("drink");
                    }}
                    className={`p-3 rounded-xl text-left transition-all flex flex-col gap-0.5 ${
                      drinkId === d.id
                        ? "bg-accent text-black"
                        : "bg-white/5 border border-white/10 text-white hover:border-white/25"
                    }`}
                  >
                    <span className="text-sm font-bold leading-snug">{d.label}</span>
                    <span className={`text-xs font-mono ${drinkId === d.id ? "text-black/70" : "text-(--fg-muted)"}`}>
                      {d.mg} mg
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
                3. How fast you clear caffeine
              </p>
              <div className="grid grid-cols-3 gap-2 font-mono">
                {CAFFEINE_SENSITIVITIES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    aria-pressed={sensitivity === s.id}
                    onClick={() => {
                      setSensitivity(s.id);
                      markUsed("sensitivity");
                    }}
                    className={`px-3 py-3 rounded-xl text-xs font-bold transition-all ${
                      sensitivity === s.id
                        ? "bg-accent text-black"
                        : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-(--fg-muted) mt-2">
                {SENSITIVITY_HINTS[sensitivity]} ({halfLife}h half-life)
              </p>
            </div>
          </div>

          {/* Result */}
          <div
            className="raised-card border-(--accent)/40 p-6 sm:p-8 flex flex-col justify-between gap-8"
            aria-live="polite"
          >
            <div>
              <p className="eyebrow text-(--fg-muted) mb-3">
                {exhausted ? "No safe time today" : "Your last safe coffee"}
              </p>
              <p className="font-display text-6xl sm:text-7xl text-accent leading-none tracking-[-0.03em]">
                {exhausted ? "Not today" : formatClock(cutoff)}
              </p>
              <p className="text-sm text-(--fg-muted) mt-3">
                {exhausted
                  ? `At your bedtime, ${drink.phrase} at any sensible hour still leaves over ${SLEEP_SAFE_MG} mg in you.`
                  : `${formatDuration(hoursNeeded)} before your ${formatClock(bed)} bedtime.`}
              </p>

              {afternoonMg !== null && (
                <div className="sunken-card p-4 mt-6 flex items-start justify-between gap-4">
                  <p className="text-sm text-(--fg) leading-relaxed">
                    {drink.phrase.charAt(0).toUpperCase() + drink.phrase.slice(1)} at 3:00 PM leaves{" "}
                    <strong className="text-white">{afternoonMg} mg</strong> in you at bedtime.
                  </p>
                  <span
                    className={`shrink-0 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      overLine
                        ? "text-(--aura-crash) bg-(--aura-crash)/15"
                        : "text-accent bg-(--accent)/15"
                    }`}
                  >
                    {overLine ? "Over the line" : "Under the line"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <p className="text-xs text-(--fg-muted) leading-relaxed">
                This assumes it&apos;s your first caffeine today. ARC counts every drink you log and
                moves your cutoff each time.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <AppStoreButton location="cutoff_reveal" />
                <Link
                  href="/tools/caffeine-calculator"
                  className="text-xs font-mono font-bold text-(--fg-muted) hover:text-white transition-colors"
                >
                  Full calculator with 20+ drinks →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
