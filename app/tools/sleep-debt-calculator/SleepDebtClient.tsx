"use client";

import { useState } from "react";
import Link from "next/link";

export default function SleepDebtClient() {
  const [neededSleep, setNeededSleep] = useState(8);
  const [actualSleep, setActualSleep] = useState([7, 6, 7, 5, 6]); // Last 5 days

  const calculateDebt = () => {
    const totalNeeded = neededSleep * actualSleep.length;
    const totalActual = actualSleep.reduce((a, b) => a + b, 0);
    return totalNeeded - totalActual;
  };

  const debt = calculateDebt();

  const getAdvice = () => {
    if (debt <= 0) return "You have no sleep debt! Your rhythm is perfectly aligned.";
    if (debt <= 5) return "You have a mild sleep debt. Try to add 30-60 minutes of sleep tonight, but do not sleep in excessively on the weekend.";
    return "You have a severe sleep debt. This level of deprivation causes significant cognitive deficits. Prioritize consistent wake times and use the ARC Recovery Protocol.";
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-white mb-8 transition-colors font-mono">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Sleep <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">Debt</span> Calculator
        </h1>
        <p className="text-[var(--fg-muted)] text-lg">
          Sleep debt is cumulative. If you need 8 hours but only get 6, you owe your body 2 hours. Calculate your total debt over the last 5 days.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="mb-8">
          <label className="block text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-mono">How many hours do you need to feel fully rested?</label>
          <input
            type="number"
            value={neededSleep}
            onChange={(e) => setNeededSleep(Number(e.target.value))}
            className="w-full sunken-card p-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
            min="5"
            max="12"
          />
        </div>

        <div className="space-y-4 mb-8">
          <label className="block text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-mono">How many hours did you actually get over the last 5 days?</label>
          <div className="grid grid-cols-5 gap-3">
            {actualSleep.map((val, i) => (
              <div key={i}>
                <label className="text-xs text-[var(--fg-muted)] block mb-1 text-center font-mono">Day {i + 1}</label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const newSleep = [...actualSleep];
                    newSleep[i] = Number(e.target.value);
                    setActualSleep(newSleep);
                  }}
                  className="w-full sunken-card p-3 text-white text-center focus:outline-none focus:border-[var(--accent)] transition-colors font-mono"
                  min="0"
                  max="24"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="sunken-card border border-white/10 p-8 text-center relative overflow-hidden">
          <p className="text-[var(--fg-muted)] text-xs font-bold uppercase tracking-widest mb-2 font-mono">Your Total Sleep Debt</p>
          <div className={`text-5xl sm:text-6xl font-black mb-2 font-mono ${debt > 0 ? 'text-[var(--aura-crash)]' : 'text-[var(--accent)]'}`}>
            {debt > 0 ? `+${debt}` : debt} hours
          </div>
          <p className="text-[var(--fg-muted)] text-sm max-w-sm mx-auto leading-relaxed">
            {getAdvice()}
          </p>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-[var(--accent)]/30">
        <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Stop paying back debt with interest</h2>
        <p className="text-[var(--fg-muted)] mb-6 max-w-lg mx-auto leading-relaxed">
          Binge sleeping on weekends to pay back debt actually causes <em>Social Jetlag</em>, making you more tired on Monday. The ARC app helps you recover safely by keeping your wake times consistent and optimizing your light exposure instead.
        </p>
        <a href="/#pricing" className="inline-block bg-[var(--accent)] text-black font-extrabold py-3.5 px-8 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono">
          Get ARC Pro
        </a>
      </div>
    </main>
  );
}
