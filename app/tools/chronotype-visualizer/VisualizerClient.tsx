"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";

// Hours each chronotype's clock runs ahead (-) or behind (+) a Bear's.
const OFFSETS: Record<string, number> = { lion: -2, bear: 0, wolf: 3, dolphin: 1 };

// Wall-clock hour -> hour on a Bear-shaped body clock. A Wolf (+3) at 11 AM is at body 8 AM.
function bodyHourFor(hour: number, chronotype: string) {
  const offset = OFFSETS[chronotype] ?? 0;
  return (((hour - offset) % 24) + 24) % 24;
}

const circularDistance = (a: number, b: number) => {
  const d = Math.abs(a - b) % 24;
  return Math.min(d, 24 - d);
};

// Illustrative curves: cortisol peaks ~1 h after a 7 AM body wake; melatonin rises ~2 h before
// an 11 PM body bedtime and peaks around 2 AM.
function levelsAt(bodyHour: number) {
  return {
    cortisol: Math.max(10, 90 - circularDistance(bodyHour, 8) * 10),
    melatonin: Math.max(5, 90 - circularDistance(bodyHour, 2) * 15),
  };
}

function statusFor(bodyHour: number) {
  if (bodyHour >= 7 && bodyHour <= 10) return "Morning rise. Cortisol peaks in the first hour after waking, helping you feel alert.";
  if (bodyHour >= 11 && bodyHour <= 14) return "High focus. A good window for deep, analytical work.";
  if (bodyHour >= 15 && bodyHour <= 17) return "Afternoon dip. Energy drops; good for lighter tasks or a walk.";
  if (bodyHour >= 18 && bodyHour <= 20) return "Second wind. A small lift in energy before the wind-down begins.";
  if (bodyHour >= 21 && bodyHour <= 23) return "Melatonin rising. Body temperature starts to drop to prepare for sleep.";
  return "Biological night. Your body expects sleep; alertness is low even if you're up.";
}

const getHourLabel = (h: number) => {
  if (h === 12) return "12:00 PM";
  if (h === 24) return "12:00 AM";
  return h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`;
};

export default function VisualizerClient() {
  const [hour, setHour] = useState(8); // 6 to 24
  const [chronotype, setChronotype] = useState("bear");

  const bodyHour = bodyHourFor(hour, chronotype);
  const { cortisol, melatonin } = levelsAt(bodyHour);

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Chronotype <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Visualizer</span>: Your Day by the Hour
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Slide through the day to see how cortisol and melatonin timing shifts with your chronotype.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="flex gap-4 mb-8 justify-center flex-wrap font-mono text-xs" role="group" aria-label="Chronotype">
          {["lion", "bear", "wolf", "dolphin"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setChronotype(t)}
              aria-pressed={chronotype === t}
              className={`px-5 py-2.5 rounded-full font-bold capitalize transition-colors ${
                chronotype === t
                  ? "bg-accent text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]"
                  : "bg-white/5 text-(--fg-muted) border border-white/10 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-12 text-center" aria-live="polite">
          <div className="text-4xl sm:text-5xl font-black text-white mb-2 font-mono">{getHourLabel(hour)}</div>
          <p className="text-accent font-bold text-sm uppercase tracking-wider font-mono">{statusFor(bodyHour)}</p>
        </div>

        <div className="mb-12 px-4">
          <label htmlFor="viz-hour" className="sr-only">Time of day</label>
          <input
            id="viz-hour"
            type="range"
            min="6"
            max="24"
            value={hour}
            aria-valuetext={getHourLabel(hour)}
            onChange={(e) => setHour(Number(e.target.value))}
            className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer border border-white/10 focus:outline-none"
            style={{
              accentColor: "var(--accent)"
            }}
          />
          <div className="flex justify-between text-xs text-(--fg-muted) mt-2 font-mono">
            <span>6:00 AM</span>
            <span>12:00 PM</span>
            <span>6:00 PM</span>
            <span>12:00 AM</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="sunken-card p-6 text-center border border-white/5">
            <p className="text-xs text-(--fg-muted) font-bold uppercase mb-2 font-mono">Cortisol (Alertness)</p>
            <div className="text-4xl font-black text-(--aura-sun) mb-4 font-mono">{Math.round(cortisol)}%</div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-(--aura-sun) h-full transition-all duration-300" style={{ width: `${cortisol}%` }}></div>
            </div>
          </div>

          <div className="sunken-card p-6 text-center border border-white/5">
            <p className="text-xs text-(--fg-muted) font-bold uppercase mb-2 font-mono">Melatonin (Sleepiness)</p>
            <div className="text-4xl font-black text-(--aura-sleep) mb-4 font-mono">{Math.round(melatonin)}%</div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-(--aura-sleep) h-full transition-all duration-300" style={{ width: `${melatonin}%` }}></div>
            </div>
          </div>
        </div>
        <p className="text-[11px] text-(--fg-muted) mt-4 text-center font-mono">
          Illustrative curve, not measured hormone levels.
        </p>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">From a typical curve to your own day</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed text-sm">
          ARC shifts every phase of your day by your chronotype, then checks it against your one-tap energy check-ins. After about 10 days it measures when your afternoon dip really lands and moves the window.
        </p>
        <AppStoreButton size="lg" location="tool_chronotype_visualizer" />
      </div>
    </main>
  );
}
