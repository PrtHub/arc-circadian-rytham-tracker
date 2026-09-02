"use client";

import { useState } from "react";
import Link from "next/link";

export default function SocialJetlagClient() {
  const [weekdayWake, setWeekdayWake] = useState("06:30");
  const [weekendWake, setWeekendWake] = useState("09:30");

  const calculateJetlag = () => {
    const [wdHours, wdMins] = weekdayWake.split(":").map(Number);
    const [weHours, weMins] = weekendWake.split(":").map(Number);

    let wdTotal = wdHours * 60 + wdMins;
    let weTotal = weHours * 60 + weMins;

    // Handle crossing midnight (unlikely for wake times, but just in case)
    if (weTotal < wdTotal) weTotal += 24 * 60;

    const diffMins = Math.abs(weTotal - wdTotal);
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;

    return { hours, mins, diffMins };
  };

  const result = calculateJetlag();

  const getSeverity = () => {
    if (result.diffMins <= 60) return { text: "Optimal", color: "text-[var(--accent)]" };
    if (result.diffMins <= 120) return { text: "Moderate Drift", color: "text-[var(--aura-sun)]" };
    return { text: "Severe Social Jetlag", color: "text-[var(--aura-crash)]" };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-white mb-8 transition-colors font-mono">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Social <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">Jetlag</span> Calculator
        </h1>
        <p className="text-[var(--fg-muted)] text-lg">
          Sleeping in on weekends shifts your biological clock exactly like flying across time zones. Calculate your "social jetlag" to see why Monday mornings hurt so much.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-mono">Weekday Wake Time</label>
            <input
              type="time"
              value={weekdayWake}
              onChange={(e) => setWeekdayWake(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-mono">Weekend Wake Time</label>
            <input
              type="time"
              value={weekendWake}
              onChange={(e) => setWeekendWake(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
            />
          </div>
        </div>

        <div className="sunken-card border border-white/10 p-8 text-center relative overflow-hidden">
          <p className="text-[var(--fg-muted)] text-xs font-bold uppercase tracking-widest mb-2 font-mono">Your Weekly Time Zone Shift</p>
          <div className="text-5xl sm:text-6xl font-black mb-2 text-white font-mono">
            {result.hours}h {result.mins > 0 ? `${result.mins}m` : ''}
          </div>
          <p className={`text-lg font-bold mb-4 ${getSeverity().color} font-mono`}>
            {getSeverity().text}
          </p>
          <p className="text-[var(--fg-muted)] text-sm max-w-sm mx-auto">
            {result.diffMins > 60 
              ? `You are biologically flying ${result.hours} time zones west on Friday, and flying back on Sunday night.` 
              : "Great job. Keeping your wake times consistent is the #1 rule of circadian health."}
          </p>
        </div>
      </div>

      {result.diffMins > 60 && (
        <div className="raised-card p-8 text-center border-[var(--accent)]/30">
          <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Need help fixing your rhythm?</h2>
          <p className="text-[var(--fg-muted)] mb-6 max-w-lg mx-auto">
            The ARC app detects when you sleep in and automatically triggers a <strong>Recovery Protocol</strong>—adjusting your light timers and caffeine cutoffs to gently pull your rhythm back into alignment without shocking your system.
          </p>
          <a href="/#pricing" className="inline-block bg-[var(--accent)] text-black font-extrabold py-3.5 px-8 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono">
            Get ARC Pro
          </a>
        </div>
      )}
    </main>
  );
}
