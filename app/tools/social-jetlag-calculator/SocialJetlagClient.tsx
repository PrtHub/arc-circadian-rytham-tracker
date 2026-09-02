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
    if (result.diffMins <= 60) return { text: "Optimal Alignment", color: "text-accent" };
    if (result.diffMins <= 120) return { text: "Moderate Drift", color: "text-(--aura-sun)" };
    return { text: "Severe Social Jetlag", color: "text-(--aura-crash)" };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-(--fg-muted) hover:text-white mb-8 transition-colors font-mono">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Social <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">Jetlag</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-lg">
          Sleeping in on weekends shifts your biological clock exactly like flying across time zones. Calculate your social jetlag to see why Monday mornings hurt so much.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Weekday Wake Time</label>
            <input
              type="time"
              value={weekdayWake}
              onChange={(e) => setWeekdayWake(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors font-mono"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Weekend Wake Time</label>
            <input
              type="time"
              value={weekendWake}
              onChange={(e) => setWeekendWake(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors font-mono"
            />
          </div>
        </div>

        <div className="sunken-card border border-white/10 p-8 text-center relative overflow-hidden">
          <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-2 font-mono">Your Weekly Time Zone Shift</p>
          <div className="text-5xl sm:text-6xl font-black mb-2 text-white font-mono">
            {result.hours}h {result.mins > 0 ? `${result.mins}m` : ''}
          </div>
          <p className={`text-lg font-bold mb-4 ${getSeverity().color} font-mono`}>
            {getSeverity().text}
          </p>
          <p className="text-(--fg-muted) text-sm max-w-sm mx-auto">
            {result.diffMins > 60 
              ? `You are biologically flying ${result.hours} time zones west on Friday, and flying back on Sunday night.` 
              : "Great job. Keeping your wake times consistent is the #1 rule of circadian health."}
          </p>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Need help fixing your rhythm?</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          The ARC app detects when you sleep in and automatically triggers a <strong className="text-white">Recovery Protocol</strong>—adjusting your light timers and caffeine cutoffs to gently pull your rhythm back into alignment without shocking your system.
        </p>
        <a
          href="https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-accent text-black font-extrabold py-3.5 px-8 rounded-2xl hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono text-sm"
        >
          Download ARC App
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </main>
  );
}
