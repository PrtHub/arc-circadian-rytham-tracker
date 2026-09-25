"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { formatClock } from "@/lib/time";

export default function SleepCycleCalculatorClient() {
  const [activeTab, setActiveTab] = useState<"wake" | "sleep">("wake");
  const [targetTime, setTargetTime] = useState("07:00");
  const [calculatedTimes, setCalculatedTimes] = useState<
    { time: string; hours: number; cycles: number; isRecommended: boolean; description: string }[] | null
  >(null);

  // 12-hour clock ("11:15 PM"), matching the other tools
  const formatTime = (date: Date): string => formatClock(date.getHours() * 60 + date.getMinutes());

  const getCycleDescription = (cycles: number): string => {
    switch (cycles) {
      case 6:
        return "9 h · The top of the 7-9 h range most adults need.";
      case 5:
        return "7.5 h · Inside the 7-9 h range most adults need.";
      case 4:
        return "6 h · OK for an occasional short night; most adults need 7-9 h.";
      case 3:
        return "4.5 h · A very short night; plan an earlier bedtime tomorrow.";
      default:
        return `${(cycles * 90) / 60} hours of structured sleep.`;
    }
  };

  // Option 1: Calculate bedtimes when waking up at targetTime
  const calculateBedtimes = () => {
    // A cleared time input gives "", so do nothing rather than show NaN.
    if (!targetTime) return;
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
        description: getCycleDescription(cycles),
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
        description: getCycleDescription(cycles),
      });
    }

    setCalculatedTimes(results);
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <header className="text-center mb-12">
        <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest font-mono border border-(--accent)/20">
          Circadian Sleep Science
        </span>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mt-4 mb-3 leading-tight">
          Sleep Cycle <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Calculator</span>
        </h1>
        <p className="text-(--fg-muted) max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Sleep cycles average about 90 minutes. Time your alarm for the end of a cycle, when sleep is lighter, and you&apos;re less likely to wake up groggy.
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
              ? "border-accent text-white"
              : "border-transparent text-(--fg-muted) hover:text-white"
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
              ? "border-accent text-white"
              : "border-transparent text-(--fg-muted) hover:text-white"
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
            <label htmlFor="wake-time" className="block text-accent text-xs font-bold uppercase tracking-wider mb-3 font-mono">
              What time do you need to wake up?
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch mb-6">
              <input
                id="wake-time"
                type="time"
                value={targetTime}
                onChange={(e) => setTargetTime(e.target.value)}
                className="sunken-card px-6 py-4 text-white text-2xl font-bold flex-1 focus:outline-none focus:border-accent/50 font-mono"
              />
              <button
                onClick={calculateBedtimes}
                disabled={!targetTime}
                className="bg-accent text-black font-black text-xs uppercase tracking-wider px-8 py-4 rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
              >
                Calculate Bedtimes
              </button>
            </div>
            <p className="text-xs text-(--fg-muted)">
              *Calculations include a standard 15-minute buffer representing the average latency to fall asleep.
            </p>
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-(--fg-muted) mb-6 text-lg">
              Going to bed right now? Click below to calculate when you should set your alarm to wake up between sleep cycles.
            </p>
            <button
              onClick={calculateWakeTimes}
              className="bg-accent text-black font-black text-xs uppercase tracking-wider px-10 py-5 rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all inline-flex items-center gap-2 shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
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
            <h3 className="text-accent text-xs font-bold uppercase tracking-wider mb-6 font-mono">
              {activeTab === "wake" ? "Optimal bedtime windows:" : "Optimal wakeup alarm times:"}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {calculatedTimes.map((result, i) => (
                <div
                  key={i}
                  className={`p-6 rounded-2xl border transition-colors flex flex-col justify-between ${
                    result.isRecommended
                      ? "bg-(--accent)/10 border-(--accent)/30 hover:border-(--accent)/50"
                      : "sunken-card border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-3xl font-black tracking-tight text-white font-mono">
                      {result.time}
                    </span>
                    {result.isRecommended && (
                      <span className="bg-(--accent)/20 text-accent border border-(--accent)/40 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full font-mono">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-(--fg-muted)">
                    <span className="font-bold text-white block mb-0.5">{result.cycles} Sleep Cycles ({result.hours} hours)</span>
                    <span>{result.description}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-(--fg-muted) leading-relaxed">
              💡 <strong>Circadian Insight</strong>: Waking near the end of a cycle, when sleep is lighter, usually feels easier. Waking from deep sleep can leave you groggy for 15-60 minutes (<strong>sleep inertia</strong>). Cycles vary from about 70 to 120 minutes, so treat these times as estimates.
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
            <p className="text-(--fg-muted) text-sm leading-relaxed">
              Sleep runs in repeating cycles that average about 90 minutes (roughly 70-120). Each cycle moves from light sleep to deep sleep and ends with REM (dreaming) sleep.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl raised-card flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-4">🧠</div>
            <h3 className="text-lg font-bold mb-2 text-white">Why Waking Mid-Cycle Feels Bad</h3>
            <p className="text-(--fg-muted) text-sm leading-relaxed">
              If your alarm goes off during deep sleep, you can feel groggy and slow for 15-60 minutes. It passes, and light and movement help it pass faster.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-3xl raised-card flex flex-col justify-between">
          <div>
            <div className="text-3xl mb-4">☀️</div>
            <h3 className="text-lg font-bold mb-2 text-white">Morning Light Sets Tonight</h3>
            <p className="text-(--fg-muted) text-sm leading-relaxed">
              Get about 20 minutes of outdoor light soon after waking (never look directly at the sun). It sets tonight&apos;s sleep timing.
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic CTA */}
      <div className="p-8 rounded-3xl raised-card border-(--accent)/30 flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
        <div>
          <h3 className="text-2xl font-extrabold tracking-tighter mb-2 text-white">
            Plan the day around your sleep
          </h3>
          <p className="text-(--fg-muted) max-w-md text-sm leading-relaxed">
            ARC doesn&apos;t track sleep stages and needs no wearable. It works on the clock around your sleep: a caffeine cutoff from every drink you log, a 20-minute morning-light timer on your Lock Screen, and a wind-down reminder before the bedtime you set.
          </p>
        </div>
        <div className="shrink-0">
          <AppStoreButton size="lg" location="tool_sleep_cycle_calculator" />
        </div>
      </div>
    </div>
  );
}
