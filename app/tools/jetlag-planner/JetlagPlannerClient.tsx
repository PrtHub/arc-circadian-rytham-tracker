"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { halfLifeFor, hoursToClear } from "@/lib/caffeine";
import { formatClock, toMinutes } from "@/lib/time";
import { EducationalNote } from "../_components/tool-extras";

// Standard-time offsets (no daylight saving).
const TIMEZONES = [
  { name: "UTC -10 (Hawaii)", offset: -10 },
  { name: "UTC -8 (US Pacific Time - Los Angeles)", offset: -8 },
  { name: "UTC -7 (US Mountain Time - Denver)", offset: -7 },
  { name: "UTC -6 (US Central Time - Chicago)", offset: -6 },
  { name: "UTC -5 (US Eastern Time - New York)", offset: -5 },
  { name: "UTC -4 (Atlantic Time - Halifax)", offset: -4 },
  { name: "UTC -3 (Argentina, Brazil - Sao Paulo)", offset: -3 },
  { name: "UTC +0 (London, Dublin - GMT)", offset: 0 },
  { name: "UTC +1 (Paris, Berlin, Rome - CET)", offset: 1 },
  { name: "UTC +2 (Athens, Cairo, Johannesburg - EET)", offset: 2 },
  { name: "UTC +3 (Moscow, Riyadh, Nairobi)", offset: 3 },
  { name: "UTC +4 (Dubai, Baku - GST)", offset: 4 },
  { name: "UTC +5.5 (India - Delhi, Mumbai - IST)", offset: 5.5 },
  { name: "UTC +7 (Bangkok, Jakarta, Hanoi)", offset: 7 },
  { name: "UTC +8 (Singapore, Hong Kong, Perth)", offset: 8 },
  { name: "UTC +9 (Tokyo, Seoul, Kyoto - JST)", offset: 9 },
  { name: "UTC +10 (Sydney, Melbourne, Brisbane)", offset: 10 },
  { name: "UTC +12 (Auckland, Fiji)", offset: 12 },
];

// The body clock moves about an hour a day, the same pace ARC's travel loop uses.
const SHIFT_PER_DAY_HOURS = 1;
// One ~100 mg cup at average sensitivity (5.5 h half-life) takes 5.5 h to fall below 50 mg.
const LAST_COFFEE_HOURS = hoursToClear(100, halfLifeFor("normal"));
const SLEEP_HOURS = 8;

const formatHours = (h: number) => `${Number.isInteger(h) ? h : h.toFixed(1)} h`;

export default function JetlagPlannerClient() {
  const [originIndex, setOriginIndex] = useState(1); // LA (PT) by default
  const [destIndex, setDestIndex] = useState(15); // Tokyo (JST) by default
  const [targetBedtime, setTargetBedtime] = useState("23:00");

  const origin = TIMEZONES[originIndex];
  const dest = TIMEZONES[destIndex];

  // Net time zone shift, taking the shorter way round the clock.
  const originalDiff = dest.offset - origin.offset;
  let diff = originalDiff;
  // Exactly 12 h goes west (a delay), which the body handles more easily.
  if (diff >= 12) diff -= 24;
  else if (diff < -12) diff += 24;
  const routeAdjusted = diff !== originalDiff;

  const shiftHours = Math.abs(diff);
  const direction = diff > 0 ? "advance" : diff < 0 ? "delay" : "none";
  const daysToAdjust = Math.ceil(shiftHours / SHIFT_PER_DAY_HOURS);
  const lagByDay4 = Math.max(0, shiftHours - 3 * SHIFT_PER_DAY_HOURS);

  const getDaySchedule = (day: number) => {
    // Times are destination local time. Day 1 follows the body clock; each day it moves ~1 h toward local time.
    const bedMin = toMinutes(targetBedtime);
    const lag = Math.max(0, shiftHours - (day - 1) * SHIFT_PER_DAY_HOURS);
    const sign = direction === "advance" ? 1 : -1;
    const dayBed = bedMin + sign * lag * 60;
    const dayWake = dayBed + SLEEP_HOURS * 60;
    const lastCoffee = formatClock(dayBed - LAST_COFFEE_HOURS * 60);
    const sleep = `${formatClock(dayBed)} - ${formatClock(dayWake)}`;

    if (direction === "advance") {
      // Eastward: light in the body's morning (after its temperature low) pulls the clock earlier.
      return {
        sleep,
        light: `${formatClock(dayWake)} - ${formatClock(dayWake + 180)}`,
        avoidLight: `${formatClock(dayBed - 180)} - ${formatClock(dayBed)}`,
        lastCoffee,
        summary:
          lag > 0
            ? `Day ${day}: your body clock is about ${formatHours(lag)} behind local time. Seek bright light in the window below (your body's morning) and keep early-morning light dim.`
            : `Day ${day}: you should be close to local time. Get outdoor light soon after waking and keep your bedtime steady.`,
      };
    }

    // Westward: evening light pushes the clock later; light just after the body's temperature low works against it.
    return {
      sleep,
      light: `${formatClock(dayBed - 360)} - ${formatClock(dayBed - 60)}`,
      avoidLight: `${formatClock(dayWake - 120)} - ${formatClock(dayWake + 120)}`,
      lastCoffee,
      summary:
        lag > 0
          ? `Day ${day}: your body clock is about ${formatHours(lag)} ahead of local time. Seek bright late-afternoon and evening light, and keep the very early morning dim.`
          : `Day ${day}: you should be close to local time. Get outdoor light soon after waking and keep your bedtime steady.`,
    };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Jet Lag <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Planner</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Plan a time zone change day by day: when to seek light, when to avoid it, when to sleep, and when to have your last coffee.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-3 gap-6 mb-3">
          <div>
            <label htmlFor="jetlag-origin" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Departing From</label>
            <select
              id="jetlag-origin"
              value={originIndex}
              onChange={(e) => setOriginIndex(Number(e.target.value))}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none font-mono text-xs"
            >
              {TIMEZONES.map((tz, index) => (
                <option key={tz.name} value={index}>{tz.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="jetlag-destination" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Arriving At</label>
            <select
              id="jetlag-destination"
              value={destIndex}
              onChange={(e) => setDestIndex(Number(e.target.value))}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none font-mono text-xs"
            >
              {TIMEZONES.map((tz, index) => (
                <option key={tz.name} value={index}>{tz.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="jetlag-bedtime" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Normal Bedtime</label>
            <input
              id="jetlag-bedtime"
              type="time"
              value={targetBedtime}
              onChange={(e) => setTargetBedtime(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors font-mono"
            />
          </div>
        </div>
        <p className="text-[11px] text-(--fg-muted) mb-8">
          Offsets are standard time. Where daylight saving applies, the real difference can be an hour more or less.
        </p>

        {direction !== "none" ? (
          <div className="sunken-card border border-(--accent)/30 p-6 sm:p-8 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-50"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-1 font-mono">Total Shift Offset</p>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                  {shiftHours} Hour{shiftHours !== 1 ? "s" : ""} {direction === "advance" ? "Eastward (Advance)" : "Westward (Delay)"}
                </div>
                <p className="text-xs text-(--fg-muted) mt-1">
                  Full adjustment: about {daysToAdjust} day{daysToAdjust !== 1 ? "s" : ""} at roughly an hour a day.
                </p>
                {routeAdjusted && (
                  <p className="text-xs text-(--fg-muted) mt-1">
                    {Math.abs(originalDiff) === shiftHours
                      ? "💡 Exactly 12 hours apart: the planner shifts your clock later, which the body handles more easily."
                      : `💡 Shortest direction selected (shifting ${shiftHours}h instead of ${Math.abs(originalDiff)}h).`}
                  </p>
                )}
              </div>
              <div className="bg-(--accent)/10 border border-(--accent)/30 px-4 py-2.5 rounded-xl self-start font-mono">
                <span className="text-xs font-bold text-accent uppercase tracking-wider block">Primary Strategy</span>
                <span className="text-sm font-black text-white mt-0.5 block">
                  {direction === "advance" ? "☀️ Light in your body's morning" : "🌇 Evening light"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="sunken-card border border-white/10 p-6 text-center text-(--fg-muted) text-sm mb-8 font-mono">
            Select different origin and destination locations to calculate your jet lag recovery timeline.
          </div>
        )}

        {direction !== "none" && !targetBedtime && (
          <p className="text-sm text-(--fg-muted) text-center font-mono">Set your normal bedtime to see the daily schedule.</p>
        )}

        {direction !== "none" && targetBedtime && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-(--fg-muted) mb-1 font-mono">First 3 Days</h3>
            <p className="text-[11px] text-(--fg-muted) mb-4">All times are destination local time.</p>
            {[1, 2, 3].map((dayNum) => {
              const daySched = getDaySchedule(dayNum);
              return (
                <div key={dayNum} className="sunken-card p-5 border border-white/5 rounded-2xl">
                  <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3 gap-3">
                    <span className="font-bold text-white text-base">Day {dayNum}</span>
                    <span className="text-xs font-mono text-accent bg-(--accent)/10 px-2.5 py-1 rounded-md border border-(--accent)/20">
                      Sleep Window: {daySched.sleep}
                    </span>
                  </div>
                  <p className="text-(--fg-muted) text-xs leading-relaxed mb-4">{daySched.summary}</p>
                  <div className="grid sm:grid-cols-3 gap-3 text-xs">
                    <div className="raised-card p-3.5 rounded-xl border border-white/5">
                      <span className="text-(--fg-muted) font-bold uppercase tracking-wider block mb-1 font-mono">☀️ Seek Light</span>
                      <span className="text-white font-bold block font-mono">{daySched.light}</span>
                      <span className="text-[10px] text-(--fg-muted) mt-1 block">Step outside, no sunglasses. Never look at the sun.</span>
                    </div>
                    <div className="raised-card p-3.5 rounded-xl border border-white/5">
                      <span className="text-(--fg-muted) font-bold uppercase tracking-wider block mb-1 font-mono">🕶️ Avoid Light / Dark</span>
                      <span className="text-white font-bold block font-mono">{daySched.avoidLight}</span>
                      <span className="text-[10px] text-(--fg-muted) mt-1 block">Dim screen, use blackouts.</span>
                    </div>
                    <div className="raised-card p-3.5 rounded-xl border border-white/5">
                      <span className="text-(--fg-muted) font-bold uppercase tracking-wider block mb-1 font-mono">☕ Last Coffee</span>
                      <span className="text-accent font-black block font-mono">{daySched.lastCoffee}</span>
                      <span className="text-[10px] text-(--fg-muted) mt-1 block">One ~100 mg cup, average sensitivity. A bigger cup moves it earlier.</span>
                    </div>
                  </div>
                </div>
              );
            })}
            <p className="text-xs text-(--fg-muted) leading-relaxed">
              {lagByDay4 > 0
                ? `By day 4 you'll still be about ${formatHours(lagByDay4)} off local time. Keep shifting about an hour a day.`
                : "By day 4 you should be close to local time."}
            </p>
          </div>
        )}

        <EducationalNote />
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Let ARC notice the time zone change</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          When you land, ARC notices your iPhone&apos;s time zone changed (no location permission, nothing to type) and gives you a seek-light and an avoid-light window each day while your body clock catches up, about an hour a day.
        </p>
        <AppStoreButton size="lg" location="tool_jetlag_planner" />
      </div>
    </main>
  );
}
