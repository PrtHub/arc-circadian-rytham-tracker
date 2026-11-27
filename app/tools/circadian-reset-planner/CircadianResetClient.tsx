"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import {
  CAFFEINE_SENSITIVITIES,
  halfLifeFor,
  hoursToClear,
} from "@/lib/caffeine";
import { trackShareResult } from "@/lib/app-store";
import { formatClock, toMinutes } from "@/lib/time";

const DAY = 1440;
const norm = (m: number) => ((Math.round(m) % DAY) + DAY) % DAY;

interface DayPlan {
  day: number;
  wakeMin: number;
  lightMin: number;
  firstCoffeeMin: number;
  cutoffMin: number;
  windDownMin: number;
  bedMin: number;
}

export default function CircadianResetClient() {
  const [currentWake, setCurrentWake] = useState("10:00");
  const [targetWake, setTargetWake] = useState("07:00");
  const [stepMins, setStepMins] = useState<number>(30);
  const [sensitivity, setSensitivity] = useState("normal");
  const [shareCopied, setShareCopied] = useState(false);

  const curMin = toMinutes(currentWake || "10:00");
  const tgtMin = toMinutes(targetWake || "07:00");
  const halfLife = halfLifeFor(sensitivity);
  const clearMins = Math.round(hoursToClear(95, halfLife) * 60);

  // Shortest circadian shift path around the 24h dial
  let diff = norm(tgtMin - curMin);
  let direction: "advance" | "delay" | "aligned" = "aligned";
  let absDelta = 0;

  if (diff === 0) {
    direction = "aligned";
    absDelta = 0;
  } else if (diff <= 720) {
    // Shifting later (phase delay)
    direction = "delay";
    absDelta = diff;
  } else {
    // Shifting earlier (phase advance)
    direction = "advance";
    absDelta = DAY - diff;
  }

  const totalDays = absDelta === 0 ? 1 : Math.ceil(absDelta / stepMins);
  const displayDays = Math.min(totalDays, 14);
  const isCapped = totalDays > 14;

  const schedule: DayPlan[] = [];
  for (let d = 1; d <= displayDays; d++) {
    const shifted = Math.min(d * stepMins, absDelta);
    const wakeMin =
      direction === "advance"
        ? norm(curMin - shifted)
        : direction === "delay"
          ? norm(curMin + shifted)
          : curMin;
    const bedMin = norm(wakeMin - 465); // 5 full 90-min sleep cycles + 15m fall-asleep latency
    schedule.push({
      day: d,
      wakeMin,
      lightMin: norm(wakeMin + 15),
      firstCoffeeMin: norm(wakeMin + 90),
      cutoffMin: norm(bedMin - clearMins),
      windDownMin: norm(bedMin - 60),
      bedMin,
    });
  }

  const sharePlan = () => {
    const lines = schedule.map(
      (r) =>
        `Day ${r.day}: Wake ${formatClock(r.wakeMin)} | Light ${formatClock(r.lightMin)} | Coffee ${formatClock(r.firstCoffeeMin)}–${formatClock(r.cutoffMin)} | Bed ${formatClock(r.bedMin)}`
    );
    const header = `My ${totalDays}-Day Circadian Reset Plan (${formatClock(curMin)} -> ${formatClock(tgtMin)}, ${stepMins}m/day):\n`;
    const body = `${header}${lines.join("\n")}\n\nGenerated via https://arccircadian.com/tools/circadian-reset-planner`;
    trackShareResult("circadian_reset_planner", `${totalDays}d_${direction}`);

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      navigator
        .share({
          title: `My ${totalDays}-Day Sleep Schedule Reset`,
          text: body,
          url: "https://arccircadian.com/tools/circadian-reset-planner",
        })
        .catch(() => {});
      return;
    }

    navigator.clipboard
      .writeText(body)
      .then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      })
      .catch(() => setShareCopied(false));
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-14 min-h-[70vh]">
      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Sleep Schedule <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Reset Planner</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Forcing a 3-hour sleep shift overnight triggers insomnia and Monday-grade fatigue. Enter where your wake time sits today and where you want it—we calculate the exact day-by-day light, coffee, and bedtime steps.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div>
            <label
              htmlFor="reset-current-wake"
              className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono"
            >
              Current Wake Time
            </label>
            <input
              id="reset-current-wake"
              type="time"
              value={currentWake}
              onChange={(e) => setCurrentWake(e.target.value)}
              className="w-full sunken-card p-3.5 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label
              htmlFor="reset-target-wake"
              className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono"
            >
              Target Wake Time
            </label>
            <input
              id="reset-target-wake"
              type="time"
              value={targetWake}
              onChange={(e) => setTargetWake(e.target.value)}
              className="w-full sunken-card p-3.5 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <p className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
              Daily Shift Pace
            </p>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
              {[
                { val: 15, label: "15m", sub: "Gentle" },
                { val: 30, label: "30m", sub: "Steady" },
                { val: 45, label: "45m", sub: "Fast" },
              ].map((s) => (
                <button
                  key={s.val}
                  type="button"
                  onClick={() => setStepMins(s.val)}
                  aria-pressed={stepMins === s.val}
                  className={`py-2 px-2 rounded-xl font-bold flex flex-col items-center cursor-pointer transition-colors ${
                    stepMins === s.val
                      ? "bg-accent text-black"
                      : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="text-[9px] font-normal opacity-80">{s.sub}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
              Caffeine Speed
            </p>
            <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
              {CAFFEINE_SENSITIVITIES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSensitivity(s.id)}
                  aria-pressed={sensitivity === s.id}
                  className={`py-2 px-1.5 rounded-xl font-bold flex flex-col items-center cursor-pointer transition-colors ${
                    sensitivity === s.id
                      ? "bg-accent text-black"
                      : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                  }`}
                >
                  <span>{s.label}</span>
                  <span className="text-[9px] font-normal opacity-80">{s.halfLife}h</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Banner */}
        <div
          className="sunken-card border border-(--accent)/30 p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          aria-live="polite"
          data-nosnippet
        >
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-bold">
              {direction === "aligned"
                ? "Schedule Already Aligned"
                : direction === "advance"
                  ? `Phase Advance · Shifting ${(absDelta / 60).toFixed(1)}h Earlier`
                  : `Phase Delay · Shifting ${(absDelta / 60).toFixed(1)}h Later`}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-1">
              {direction === "aligned"
                ? `Hold steady at ${formatClock(tgtMin)}`
                : `${totalDays} ${totalDays === 1 ? "Day" : "Days"} to Reach ${formatClock(tgtMin)}`}
            </div>
            <p className="text-xs text-(--fg-muted) mt-1">
              {direction === "advance"
                ? "Step outdoors immediately on waking each day—morning blue photons pull melatonin earlier."
                : direction === "delay"
                  ? "Get bright late-afternoon light and wear sunglasses in the first hour after waking to drift later cleanly."
                  : "Lock morning sunlight and a 90-minute coffee delay to keep your circadian clock anchored."}
            </p>
          </div>
          <button
            type="button"
            onClick={sharePlan}
            className="shrink-0 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
          >
            {shareCopied ? "✓ Copied schedule" : "Copy / Share Day-by-Day Plan"}
          </button>
        </div>

        {/* Day-by-Day Table */}
        <div className="overflow-x-auto" data-nosnippet>
          <table className="w-full text-left text-xs sm:text-sm border-collapse font-mono">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase text-(--fg-muted)">
                <th className="py-3 px-2.5">Day</th>
                <th className="py-3 px-2.5 text-white">Wake Up</th>
                <th className="py-3 px-2.5 text-amber-300">20m Light</th>
                <th className="py-3 px-2.5">1st Coffee</th>
                <th className="py-3 px-2.5 text-accent">Last Coffee</th>
                <th className="py-3 px-2.5">Wind-Down</th>
                <th className="py-3 px-2.5 text-emerald-400">Lights Out</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {schedule.map((row) => (
                <tr key={row.day} className="hover:bg-white/[0.03]">
                  <td className="py-3 px-2.5 font-bold text-(--fg-muted)">Day {row.day}</td>
                  <td className="py-3 px-2.5 font-bold text-white">{formatClock(row.wakeMin)}</td>
                  <td className="py-3 px-2.5 text-amber-300">{formatClock(row.lightMin)}</td>
                  <td className="py-3 px-2.5 text-zinc-300">{formatClock(row.firstCoffeeMin)}</td>
                  <td className="py-3 px-2.5 font-bold text-accent">{formatClock(row.cutoffMin)}</td>
                  <td className="py-3 px-2.5 text-zinc-300">{formatClock(row.windDownMin)}</td>
                  <td className="py-3 px-2.5 font-bold text-emerald-400">{formatClock(row.bedMin)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {isCapped && (
            <p className="text-xs text-(--fg-muted) mt-3">
              Showing the first 14 days of a {totalDays}-day reset. Switch pace to 30 or 45 min/day to shorten, or take a 2-day pause halfway through to let sleep pressure stabilize.
            </p>
          )}
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-3 text-accent">
          Run your {totalDays === 1 ? "anchored" : `${totalDays}-day`} reset automatically on iPhone.
        </h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm sm:text-base">
          As your wake time shifts, ARC updates your 20-minute Dynamic Island sunlight timer, recalculates your last safe coffee, and triggers your wind-down alert automatically—no spreadsheets needed.
        </p>
        <AppStoreButton
          size="lg"
          location="tool_circadian_reset_planner"
          qrHeadline={`Automate your ${totalDays}-day reset`}
          qrSubtitle={`Scan with your iPhone to shift cleanly toward ${formatClock(tgtMin)} with live light and caffeine timers.`}
        />
      </div>
    </main>
  );
}
