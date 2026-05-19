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
    if (result.diffMins <= 60) return { text: "Optimal", color: "text-[#CCFF00]" };
    if (result.diffMins <= 120) return { text: "Moderate Drift", color: "text-yellow-500" };
    return { text: "Severe Social Jetlag", color: "text-red-500" };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Social <span className="text-[#CCFF00]">Jetlag</span> Calculator
        </h1>
        <p className="text-zinc-400 text-lg">
          Sleeping in on weekends shifts your biological clock exactly like flying across time zones. Calculate your "social jetlag" to see why Monday mornings hurt so much.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Weekday Wake Time</label>
            <input
              type="time"
              value={weekdayWake}
              onChange={(e) => setWeekdayWake(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Weekend Wake Time</label>
            <input
              type="time"
              value={weekendWake}
              onChange={(e) => setWeekendWake(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
        </div>

        <div className="bg-black border border-white/10 rounded-2xl p-8 text-center relative overflow-hidden">
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Your Weekly Time Zone Shift</p>
          <div className="text-5xl sm:text-6xl font-black mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {result.hours}h {result.mins > 0 ? `${result.mins}m` : ''}
          </div>
          <p className={`text-lg font-bold mb-4 ${getSeverity().color}`}>
            {getSeverity().text}
          </p>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            {result.diffMins > 60 
              ? `You are biologically flying ${result.hours} time zones west on Friday, and flying back on Sunday night.` 
              : "Great job. Keeping your wake times consistent is the #1 rule of circadian health."}
          </p>
        </div>
      </div>

      {result.diffMins > 60 && (
        <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Need help fixing your rhythm?</h2>
          <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
            The ARC app detects when you sleep in and automatically triggers a <strong>Recovery Protocol</strong>—adjusting your light timers and caffeine cutoffs to gently pull your rhythm back into alignment without shocking your system.
          </p>
          <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
            Get ARC Pro
          </a>
        </div>
      )}
    </main>
  );
}
