"use client";

import { useState } from "react";
import Link from "next/link";

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

export default function JetlagPlannerClient() {
  const [originIndex, setOriginIndex] = useState(1); // LA (PT) by default
  const [destIndex, setDestIndex] = useState(15); // Tokyo (JST) by default
  const [targetBedtime, setTargetBedtime] = useState("23:00");

  const origin = TIMEZONES[originIndex];
  const dest = TIMEZONES[destIndex];

  // Calculate net timezone shift
  let diff = dest.offset - origin.offset;
  let displayOriginalDiff = diff;
  let routeAdjusted = false;

  // Optimize path (if shift is > 12 or < -12, go in the opposite direction)
  if (diff > 12) {
    diff -= 24;
    routeAdjusted = true;
  } else if (diff < -12) {
    diff += 24;
    routeAdjusted = true;
  }

  const shiftHours = Math.abs(diff);
  const direction = diff > 0 ? "advance" : diff < 0 ? "delay" : "none";

  const getDaySchedule = (day: number) => {
    // Standard baseline sleep is 11:00 PM to 7:00 AM (destination time)
    const [bedH, bedM] = targetBedtime.split(":").map(Number);
    const wakeH = (bedH + 8) % 24;

    if (direction === "none") {
      return {
        sleep: `${targetBedtime} - ${wakeH.toString().padStart(2, '0')}:00`,
        light: "7:00 AM - 9:00 AM",
        avoidLight: "9:00 PM - Bedtime",
        caffeineCutoff: "2:00 PM",
        summary: "No adjustments needed. Stick to your natural schedule."
      };
    }

    if (direction === "advance") {
      // Eastward shift: natural body clock is "late" relative to destination.
      // Day by day we shift wake & sleep times earlier.
      // Calculate how many hours we are still lagged:
      const lagRemaining = Math.max(0, shiftHours - (day - 1) * 1.5);
      
      const dayWake = (wakeH + lagRemaining) % 24;
      const dayBed = (bedH + lagRemaining) % 24;

      const wakeStr = `${Math.floor(dayWake).toString().padStart(2, '0')}:00`;
      const bedStr = `${Math.floor(dayBed).toString().padStart(2, '0')}:00`;

      // Light exposure is best in the morning of our current biological clock
      const lightStart = (dayWake) % 24;
      const lightEnd = (dayWake + 3) % 24;

      // Avoid light in the evening (before biological bedtime)
      const avoidStart = (dayBed - 3 + 24) % 24;

      // Caffeine cutoff relative to shifted bedtime
      const caffeineTime = (dayBed - 9 + 24) % 24;

      const formatHour = (h: number) => {
        const hour = Math.floor(h);
        if (hour === 0) return "12:00 AM";
        if (hour === 12) return "12:00 PM";
        return hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
      };

      return {
        sleep: `${formatHour(dayBed)} - ${formatHour(dayWake)}`,
        light: `${formatHour(lightStart)} - ${formatHour(lightEnd)}`,
        avoidLight: `${formatHour(avoidStart)} - Bedtime`,
        caffeineCutoff: formatHour(caffeineTime),
        summary: `Day ${day}: Advance bedtime by ${Math.max(0, Math.round((shiftHours - lagRemaining) * 10) / 10)}h. Get bright light early in your destination morning to anchor the shift.`
      };
    } else {
      // Westward shift: natural body clock is "early" relative to destination.
      // Day by day we shift wake & sleep times later.
      const lagRemaining = Math.max(0, shiftHours - (day - 1) * 2);

      const dayWake = (wakeH - lagRemaining + 24) % 24;
      const dayBed = (bedH - lagRemaining + 24) % 24;

      // Light exposure is best in the afternoon/evening to delay melatonin
      const lightStart = (dayBed - 6 + 24) % 24;
      const lightEnd = (dayBed - 1 + 24) % 24;

      // Avoid light in the biological morning (too early)
      const avoidStart = (dayWake - 3 + 24) % 24;
      const avoidEnd = (dayWake) % 24;

      // Caffeine cutoff relative to shifted bedtime
      const caffeineTime = (dayBed - 9 + 24) % 24;

      const formatHour = (h: number) => {
        const hour = Math.floor(h);
        if (hour === 0) return "12:00 AM";
        if (hour === 12) return "12:00 PM";
        return hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
      };

      return {
        sleep: `${formatHour(dayBed)} - ${formatHour(dayWake)}`,
        light: `${formatHour(lightStart)} - ${formatHour(lightEnd)}`,
        avoidLight: `${formatHour(avoidStart)} - ${formatHour(avoidEnd)}`,
        caffeineCutoff: formatHour(caffeineTime),
        summary: `Day ${day}: Delay bedtime by ${Math.max(0, Math.round((shiftHours - lagRemaining) * 10) / 10)}h. Seek bright late-afternoon exposure to hold off melatonin peak.`
      };
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Circadian <span className="text-[#CCFF00]">Jetlag</span> Planner
        </h1>
        <p className="text-zinc-400 text-lg">
          Plan timezone adjustments scientifically. Avoid jetlag by utilizing light, darkness, and caffeine curfew offsets.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Departing From</label>
            <select
              value={originIndex}
              onChange={(e) => setOriginIndex(Number(e.target.value))}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors appearance-none"
            >
              {TIMEZONES.map((tz, index) => (
                <option key={tz.name} value={index}>{tz.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Arriving At</label>
            <select
              value={destIndex}
              onChange={(e) => setDestIndex(Number(e.target.value))}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors appearance-none"
            >
              {TIMEZONES.map((tz, index) => (
                <option key={tz.name} value={index}>{tz.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Normal Bedtime</label>
            <input
              type="time"
              value={targetBedtime}
              onChange={(e) => setTargetBedtime(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
        </div>

        {direction !== "none" ? (
          <div className="bg-black border border-[#CCFF00]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden mb-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Total Shift Offset</p>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {shiftHours} Hour{shiftHours !== 1 ? "s" : ""} {direction === "advance" ? "Eastward (Advance)" : "Westward (Delay)"}
                </div>
                {routeAdjusted && (
                  <p className="text-xs text-zinc-500 mt-1">
                    💡 Optimized routing: Shortest biological direction selected (shifted by {shiftHours}h instead of {Math.abs(displayOriginalDiff)}h).
                  </p>
                )}
              </div>
              <div className="bg-[#CCFF00]/10 border border-[#CCFF00]/30 px-4 py-2.5 rounded-xl self-start">
                <span className="text-xs font-bold text-[#CCFF00] uppercase tracking-wider block">Primary Strategy</span>
                <span className="text-sm font-black text-white mt-0.5 block">
                  {direction === "advance" ? "☀️ Morning Light Seek" : "🌇 Evening Light Seek"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-black border border-white/10 rounded-2xl p-6 text-center text-zinc-500 text-sm mb-8">
            Select different origin and destination locations to calculate your jetlag recovery timeline.
          </div>
        )}

        {direction !== "none" && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white mb-2">Your 3-Day Adaptation Protocol:</h3>
            
            {[1, 2, 3].map((day) => {
              const daySched = getDaySchedule(day);
              return (
                <div key={day} className="bg-black/50 border border-white/5 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                    <span className="font-bold text-[#CCFF00] text-sm uppercase tracking-widest">Day {day} Protocol</span>
                    <span className="text-xs text-zinc-500 font-mono font-medium">{daySched.sleep} (Sleep Window)</span>
                  </div>
                  
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">{daySched.summary}</p>
                  
                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    <div className="bg-[#111] p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">☀️ Light Exposure</span>
                      <span className="text-white font-bold block">{daySched.light}</span>
                      <span className="text-[10px] text-zinc-500 mt-1 block">Step outside, no sunglasses.</span>
                    </div>
                    <div className="bg-[#111] p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">🕶️ Avoid Light / Dark</span>
                      <span className="text-white font-bold block">{daySched.avoidLight}</span>
                      <span className="text-[10px] text-zinc-500 mt-1 block">Dim screen, use blackouts.</span>
                    </div>
                    <div className="bg-[#111] p-3.5 rounded-xl border border-white/5">
                      <span className="text-zinc-500 font-bold uppercase tracking-wider block mb-1">☕ Caffeine Curfew</span>
                      <span className="text-[#CCFF00] font-black block">{daySched.caffeineCutoff}</span>
                      <span className="text-[10px] text-zinc-500 mt-1 block">Zero caffeine after this point.</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Automate your travel shifting</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          The ARC app features a Travel Mode. It auto-detects your timezone shift, references your local flight time, and schedules lock-screen notifications reminding you exactly when to seek light, block light, or stop caffeine.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>
    </main>
  );
}
