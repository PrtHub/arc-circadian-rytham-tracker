"use client";

import { useState } from "react";
import Link from "next/link";
import { formatClock, toMinutes } from "@/lib/time";

interface Props {
  slug: string;
  chronotypeName: string;
  defaultWake: string;
}

const WAKE_PRESETS: Record<string, string[]> = {
  lion: ["05:00", "05:30", "06:00", "06:30", "07:00"],
  bear: ["06:00", "06:30", "07:00", "07:30", "08:00"],
  wolf: ["07:30", "08:00", "08:30", "09:00", "09:30"],
  dolphin: ["06:00", "06:30", "07:00", "07:30", "08:00"],
};

const FOCUS_OFFSETS: Record<string, [number, number]> = {
  lion: [2, 6],      // 2h to 6h post wake
  bear: [3, 7],      // 3h to 7h post wake
  wolf: [7.5, 11],   // 7.5h to 11h post wake
  dolphin: [8.5, 12.5], // 8.5h to 12.5h post wake
};

export function ChronotypeScheduleCustomizer({ slug, chronotypeName, defaultWake }: Props) {
  // Normalize defaultWake from e.g. "5:30 AM - 6:30 AM" or "7:00 AM" to "07:00"
  const initialTime = slug === "lion" ? "05:30" : slug === "bear" ? "07:00" : slug === "wolf" ? "08:30" : "06:30";
  const [wake, setWake] = useState(initialTime);
  const [copied, setCopied] = useState(false);

  const presets = WAKE_PRESETS[slug] || ["06:00", "07:00", "08:00", "08:30"];
  const wakeMins = toMinutes(wake);
  const bedMins = (wakeMins - (8 * 60 + 15) + 1440) % 1440;
  const offsets = FOCUS_OFFSETS[slug] || [3, 7];

  const focusStartMins = (wakeMins + Math.round(offsets[0] * 60)) % 1440;
  const focusEndMins = (wakeMins + Math.round(offsets[1] * 60)) % 1440;
  const lightMins = (wakeMins + 15) % 1440;
  const coffeeMins = (wakeMins + (slug === "wolf" ? 120 : 90)) % 1440;
  const cutoffMins = (bedMins - Math.round(8.5 * 60) + 1440) % 1440;
  const windDownMins = (bedMins - 90 + 1440) % 1440;

  const scheduleItems = [
    { label: "Target Wake Time", time: formatClock(wakeMins), icon: "⏰", desc: "Out of bed, drink 16oz water immediately" },
    { label: "Morning Sunlight Window", time: `${formatClock(lightMins)} – ${formatClock(lightMins + 20)}`, icon: "☀️", desc: "20 min natural daylight to suppress melatonin" },
    { label: "First Coffee Window", time: formatClock(coffeeMins), icon: "☕", desc: "Delayed to let natural cortisol peak first" },
    { label: "Peak Deep Work Focus", time: `${formatClock(focusStartMins)} – ${formatClock(focusEndMins)}`, icon: "🧠", desc: `Protect these golden hours for high-stakes decisions` },
    { label: "Strict Caffeine Cutoff", time: formatClock(cutoffMins), icon: "🛑", desc: "Last safe sip to ensure <50mg active at bedtime" },
    { label: "Digital Sunset & Wind-Down", time: formatClock(windDownMins), icon: "🌙", desc: "Dim amber lighting, screens off, reading" },
    { label: "Target Bedtime", time: formatClock(bedMins), icon: "😴", desc: "8h 15m sleep opportunity before tomorrow's wake" },
  ];

  const handleCopy = () => {
    const text = `My Custom ${chronotypeName} Schedule (Wake: ${formatClock(wakeMins)}):\n` +
      scheduleItems.map(item => `• ${item.time} - ${item.label}: ${item.desc}`).join("\n") +
      `\n\nGenerated with ARC Circadian Rhythm Tracker: https://arcapp.sbs/chronotype/${slug}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="rounded-3xl border border-(--accent)/30 bg-zinc-950/80 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden my-10">
      <div className="absolute top-0 right-0 w-64 h-64 bg-(--accent)/10 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <span className="text-xs uppercase tracking-widest font-mono text-accent font-semibold block mb-1">
            Interactive Schedule Customizer
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Adjust this {chronotypeName} Schedule to Your Wake Time
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Have to be up earlier or later for work? Select your actual wake time to shift your biological windows.
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="self-start sm:self-center shrink-0 px-4 py-2.5 rounded-xl border border-(--accent)/40 bg-(--accent)/10 hover:bg-(--accent)/20 text-accent text-xs font-mono font-bold transition-all flex items-center gap-2"
        >
          {copied ? "✓ Copied to Clipboard" : "📋 Copy Adjusted Schedule"}
        </button>
      </div>

      {/* Wake Time Selector Pills */}
      <div className="mb-6">
        <label className="text-xs font-mono text-zinc-400 block mb-2 font-medium">
          Select Your Required Wake Time:
        </label>
        <div className="flex flex-wrap gap-2">
          {presets.map((timeStr) => {
            const isSelected = wake === timeStr;
            return (
              <button
                key={timeStr}
                onClick={() => setWake(timeStr)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${
                  isSelected
                    ? "bg-accent text-black shadow-[0_0_20px_rgba(255,170,0,0.35)] scale-105"
                    : "bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {formatClock(toMinutes(timeStr))}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recalculated Timeline Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {scheduleItems.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              idx === 0 || idx === 3 || idx === 4
                ? "bg-(--accent)/5 border-(--accent)/30"
                : "bg-white/5 border-white/5"
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base">{item.icon}</span>
              <span className="text-xs font-mono font-bold text-accent">{item.time}</span>
            </div>
            <div className="text-sm font-bold text-white mb-0.5">{item.label}</div>
            <div className="text-[11px] text-zinc-400 leading-tight">{item.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
        <span>Need further adjustments or multi-day sharing?</span>
        <Link
          href={`/tools/daily-schedule-generator?type=${slug}&wake=${wake.replace(":", "")}`}
          className="text-accent underline font-mono hover:text-white transition-colors"
        >
          Open in Full Daily Schedule Generator &rarr;
        </Link>
      </div>
    </div>
  );
}
