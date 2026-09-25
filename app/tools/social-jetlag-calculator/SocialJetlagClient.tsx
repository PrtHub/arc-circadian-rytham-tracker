"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { formatClock, toMinutes } from "@/lib/time";

const DAY = 24 * 60;

// Signed difference folded into -12 h ... +12 h, so 8:00 -> 7:00 is -1 h, not +23 h.
const wrapDifference = (mins: number) => {
  const d = ((mins % DAY) + DAY) % DAY;
  return d > DAY / 2 ? d - DAY : d;
};

// Midpoint of a sleep window that may cross midnight.
const midSleep = (bed: number, wake: number) => {
  const duration = (((wake - bed) % DAY) + DAY) % DAY;
  return (bed + duration / 2) % DAY;
};

const formatShift = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h${m > 0 ? ` ${m}m` : ""}`;
};

const TIME_INPUTS = [
  { id: "sj-weekday-bed", label: "Weekday Bedtime" },
  { id: "sj-weekday-wake", label: "Weekday Wake Time" },
  { id: "sj-weekend-bed", label: "Weekend Bedtime" },
  { id: "sj-weekend-wake", label: "Weekend Wake Time" },
] as const;

export default function SocialJetlagClient() {
  const [times, setTimes] = useState<Record<(typeof TIME_INPUTS)[number]["id"], string>>({
    "sj-weekday-bed": "23:00",
    "sj-weekday-wake": "06:30",
    "sj-weekend-bed": "00:30",
    "sj-weekend-wake": "09:30",
  });

  const calculate = () => {
    // A cleared time input gives "", so wait for all four times instead of showing NaN.
    if (Object.values(times).some((t) => !t)) return null;

    const wdMid = midSleep(toMinutes(times["sj-weekday-bed"]), toMinutes(times["sj-weekday-wake"]));
    const weMid = midSleep(toMinutes(times["sj-weekend-bed"]), toMinutes(times["sj-weekend-wake"]));
    const signed = wrapDifference(weMid - wdMid);
    const diffMins = Math.round(Math.abs(signed));
    const wakeShift = wrapDifference(toMinutes(times["sj-weekend-wake"]) - toMinutes(times["sj-weekday-wake"]));

    return { wdMid, weMid, signed, diffMins, wakeShift };
  };

  const result = calculate();

  const getLabel = (diffMins: number) => {
    if (diffMins <= 60) return { text: "Small shift (under 1 h)", color: "text-accent" };
    if (diffMins <= 120) return { text: "Moderate shift (1-2 h)", color: "text-(--aura-sun)" };
    return { text: "Large shift (2 h+)", color: "text-(--aura-crash)" };
  };

  const getMessage = (signed: number, diffMins: number) => {
    if (diffMins <= 60) {
      return "Your weekend sleep sits within about an hour of your weekdays, which keeps your body clock steady.";
    }
    const zones = Math.round(diffMins / 60);
    const zoneText = `${zones} time zone${zones !== 1 ? "s" : ""}`;
    return signed > 0
      ? `It's a bit like flying ${zoneText} west on Friday and back east on Sunday night, which is why Monday feels rough.`
      : `Your weekends run earlier. It's a bit like flying ${zoneText} east on Friday and back west on Sunday night.`;
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Social <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Jetlag</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Sleeping in on weekends shifts your body clock a bit like crossing time zones. Enter your usual weekday and weekend sleep times to see how far it moves.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          {TIME_INPUTS.map((input) => (
            <div key={input.id}>
              <label htmlFor={input.id} className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">{input.label}</label>
              <input
                id={input.id}
                type="time"
                value={times[input.id]}
                onChange={(e) => setTimes((prev) => ({ ...prev, [input.id]: e.target.value }))}
                className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors font-mono"
              />
            </div>
          ))}
        </div>

        <div className="sunken-card border border-white/10 p-8 text-center relative overflow-hidden" aria-live="polite">
          <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-2 font-mono">Your Social Jetlag (Mid-Sleep Shift)</p>
          {result ? (
            <>
              <div className="text-5xl sm:text-6xl font-black mb-2 text-white font-mono">
                {formatShift(result.diffMins)}
              </div>
              <p className={`text-lg font-bold mb-4 ${getLabel(result.diffMins).color} font-mono`}>
                {getLabel(result.diffMins).text}
              </p>
              <p className="text-(--fg-muted) text-sm max-w-sm mx-auto mb-3">
                {getMessage(result.signed, result.diffMins)}
              </p>
              <p className="text-(--fg-muted) text-xs max-w-sm mx-auto font-mono">
                Mid-sleep: {formatClock(result.wdMid)} weekdays, {formatClock(result.weMid)} weekends. Wake time moves {formatShift(Math.abs(result.wakeShift))} {result.wakeShift >= 0 ? "later" : "earlier"}.
              </p>
            </>
          ) : (
            <p className="text-(--fg-muted) text-sm font-mono">Enter all four times to see your result.</p>
          )}
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Notice drift before Monday does</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          ARC compares your median wake time over the last two weeks with the two weeks before, so one late Saturday isn&apos;t read as a trend. When your schedule is drifting later, it tells you, and its 20-minute morning light timer on your Lock Screen is the simplest way to pull it back.
        </p>
        <AppStoreButton size="lg" location="tool_social_jetlag_calculator" />
      </div>
    </main>
  );
}
