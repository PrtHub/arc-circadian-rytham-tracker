"use client";

import { useState } from "react";
import Link from "next/link";

export default function SleepCycleCalculatorClient() {
  const [activeTab, setActiveTab] = useState<"wake" | "sleep">("wake");
  const [targetTime, setTargetTime] = useState("07:00");
  const [calculatedTimes, setCalculatedTimes] = useState<{ time: string; hours: number; cycles: number; isRecommended: boolean }[] | null>(null);

  // Helper to format Date objects as HH:MM
  const formatTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Option 1: Calculate bedtimes when waking up at targetTime
  const calculateBedtimes = () => {
    const [h, m] = targetTime.split(":").map(Number);
    const results = [];

    // Base target date (set to tomorrow)
    const targetDate = new Date();
    targetDate.setHours(h, m, 0, 0);
    if (targetDate.getTime() <= Date.now()) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    // 15 minutes average sleep latency
    const sleepLatency = 15;

    // Calculate times for 3, 4, 5, and 6 cycles (90 minutes each)
    for (let cycles = 6; cycles >= 3; cycles--) {
      const minutesNeeded = cycles * 90 + sleepLatency;
      const bedtime = new Date(targetDate.getTime() - minutesNeeded * 60 * 1000);
      
      results.push({
        time: formatTime(bedtime),
        hours: (cycles * 90) / 60,
        cycles,
        isRecommended: cycles === 5 || cycles === 6,
      });
    }

    setCalculatedTimes(results);
  };

  // Option 2: Calculate wake times if going to sleep immediately
  const calculateWakeTimes = () => {
    const results = [];
    const now = Date.now();
    const sleepLatency = 15; // 15 mins to fall asleep

    // Calculate times for 3, 4, 5, and 6 cycles (90 minutes each)
    for (let cycles = 3; cycles <= 6; cycles++) {
      const minutesNeeded = sleepLatency + cycles * 90;
      const wakeTime = new Date(now + minutesNeeded * 60 * 1000);

      results.push({
        time: formatTime(wakeTime),
        hours: (cycles * 90) / 60,
        cycles,
        isRecommended: cycles === 5 || cycles === 6,
      });
    }

    setCalculatedTimes(results);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <header className="text-center mb-12">
        <span className="px-3 py-1 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-black uppercase tracking-widest font-mono border border-[var(--accent)]/20">
          Circadian Sleep Science
        </span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mt-4 mb-3">
          Sleep Cycle <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">Calculator</span>
        </h1>
        <p className="text-[var(--fg-muted)] max-w-xl mx-auto text-base">
          Sleep in sync with your brain's natural stages. Wake up at the completion of a 90-minute cycle to banish morning grogginess.
        </p>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 font-mono" role="tablist">
        <button
          onClick={() => {
            setActiveTab("wake");
            setCalculatedTimes(null);
          }}
          className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-colors focus:outline-none ${
            activeTab === "wake"
              ? "border-[var(--accent)] text-white"
              : "border-transparent text-[var(--fg-muted)] hover:text-white"
          }`}
          role="tab"
          aria-selected={activeTab === "wake"}
        >
          ⏰ I want to Wake Up at...
        </button>
        <button
          onClick={() => {
            setActiveTab("sleep");
            setCalculatedTimes(null);
          }}
          className={`flex-1 py-4 text-center text-xs font-bold uppercase tracking-wider border-b-2 transition-colors focus:outline-none ${
            activeTab === "sleep"
              ? "border-[var(--accent)] text-white"
              : "border-transparent text-[var(--fg-muted)] hover:text-white"
          }`}
          role="tab"
          aria-selected={activeTab === "sleep"}
        >
          💤 I am going to Sleep Now
        </button>
      </div>

      {/* Calculator Body */}
      <div className="raised-card p-8 mb-12">
        {activeTab === "wake" ? (
          <div>
            <label htmlFor="wake-time" className="block text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              What time do you need to wake up?
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-6">
              <input
                id="wake-time"
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="sunken-card px-6 py-4 text-white text-2xl font-bold flex-1 focus:outline-none focus:border-[var(--accent)]/50 font-mono"
              />
              <button
                onClick={calculateBedtimes}
                className="bg-[var(--accent)] text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
              >
                Calculate Bedtimes
              </button>
            </div>
            <p className="text-xs text-[var(--fg-muted)]">
              *Calculations include a standard 15-minute buffer representing the average latency to fall asleep.
            </p>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-[var(--fg-muted)] mb-6 text-lg">
              Going to bed right now? Click below to calculate when you should set your alarm to wake up between sleep cycles.
            </p>
            <button
              onClick={calculateWakeTimes}
              className="bg-[var(--accent)] text-black font-black text-xs uppercase tracking-wider px-10 py-5 rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
            >
              <span>Calculate Alarm Times</span>
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v4.59L12.8 13.5a.75.75 0 101.06-1.06l-3.11-3.11V6.75z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}

        {/* Results */}
        {calculatedTimes && (
          <div className="mt-8 pt-8 border-t border-white/5">
            <h3 className="text-[var(--accent)] text-xs font-bold uppercase tracking-wider mb-6 font-mono">
              {activeTab === "wake" ? "Optimal bedtime windows:" : "Optimal wakeup alarm times:"}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {calculatedTimes.map((result, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between ${
                    result.isRecommended
                      ? "bg-[var(--accent)]/10 border-[var(--accent)]/30 hover:border-[var(--accent)]/50"
                      : "sunken-card border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-3xl font-black tracking-tight text-white font-mono">
                      {result.time}
                    </span>
                    {result.isRecommended && (
                      <span className="bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full font-mono">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[var(--fg-muted)]">
                    <span className="font-bold text-white block mb-0.5">{result.cycles} Sleep Cycles ({result.hours} hours)</span>
                    {result.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-[var(--fg-muted)] leading-relaxed">
              💡 **Circadian Insight**: Waking up at the end of a cycle matches your brain's lightest sleep stage, making it feel like you woke up naturally without an alarm. Waking up mid-cycle triggers severe **sleep inertia** (grogginess).
            </div>
          </div>
        )}
      </div>

      {/* Explainer Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="p-8 rounded-3xl raised-card flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-4">💤</div>
            <h3 className="text-lg font-bold mb-2 text-white">90-Minute Sleep Cycles</h3>
            <p className="text-[var(--fg-muted)] text-sm leading-relaxed">
              Human sleep is composed of repeating cycles averaging 90 minutes. Each cycle proceeds from Light Sleep to Deep Sleep, and concludes with REM (Dreaming) sleep.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl raised-card flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-lg font-bold mb-2 text-white">The Danger of Sleep Inertia</h3>
            <p className="text-[var(--fg-muted)] text-sm leading-relaxed">
              If your alarm goes off during a Deep Sleep stage, your brain is forced from slow-wave states instantly, causing confusion, fatigue, and heavy limbs for hours.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl raised-card flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-4">☀️</div>
            <h3 className="text-lg font-bold mb-2 text-white">Re-anchoring Your Cycle</h3>
            <p className="text-[var(--fg-muted)] text-sm leading-relaxed">
              To lock in your sleep cycle length, get bright sunlight in your eyes within 30 minutes of waking up. This programs your biological timer for next night's cycle.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic CTA */}
      <div className="p-8 rounded-3xl raised-card border-[var(--accent)]/30 flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tighter mb-2 text-white">
            Get Daily Circadian Protocols
          </h3>
          <p className="text-[var(--fg-muted)] max-w-md text-sm leading-relaxed">
            Stop guessing your biology. ARC automatically calculates your cycle lengths, schedules sunlight reminders, and adapts to poor sleep in real time.
          </p>
        </div>
        <a
          href="https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--accent)] px-8 py-4 text-sm font-black text-black hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
        >
          Download ARC App
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
}
