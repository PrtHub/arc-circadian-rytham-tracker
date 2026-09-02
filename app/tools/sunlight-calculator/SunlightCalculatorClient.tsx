"use client";

import { useState } from "react";
import Link from "next/link";

export default function SunlightCalculatorClient() {
  const [weather, setWeather] = useState("sunny");
  const [goal, setGoal] = useState("alertness");

  const calculateTime = () => {
    // Base times in minutes
    let minutes = 10;
    
    if (weather === "cloudy") minutes = 20;
    if (weather === "overcast") minutes = 30;
    
    if (goal === "sleep") minutes = Math.round(minutes * 1.5); // Need more light to reset if struggling
    
    return minutes;
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-[var(--fg-muted)] hover:text-white mb-8 transition-colors font-mono">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Sunlight <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">Window</span> Calculator
        </h1>
        <p className="text-[var(--fg-muted)] text-lg">
          Huberman says morning sunlight is non-negotiable. But how long do you actually need to stand outside? Calculate your minimum effective dose based on today's weather.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-mono">Today's Weather</label>
            <select 
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none font-mono"
            >
              <option value="sunny">Bright & Sunny (10,000+ lux)</option>
              <option value="cloudy">Partly Cloudy (5,000 lux)</option>
              <option value="overcast">Heavy Overcast (1,000 lux)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-[var(--accent)] uppercase tracking-wider mb-2 font-mono">Your Primary Goal</label>
            <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-[var(--accent)] transition-colors appearance-none font-mono"
            >
              <option value="alertness">Morning Alertness</option>
              <option value="sleep">Resetting Bad Sleep</option>
            </select>
          </div>
        </div>

        <div className="sunken-card border border-[var(--accent)]/30 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[var(--accent)] to-transparent opacity-50"></div>
          <p className="text-[var(--fg-muted)] text-xs font-bold uppercase tracking-widest mb-2 font-mono">Recommended Duration</p>
          <div className="text-5xl sm:text-6xl font-black text-[var(--accent)] mb-4 font-mono">
            {calculateTime()} Minutes
          </div>
          <p className="text-[var(--fg-muted)] text-sm max-w-sm mx-auto leading-relaxed">
            Get outside within your morning sunrise window. Window glass filters out the required blue-cyan photons by up to 90%, so you must step outside. If it is dark before sunrise, use an indoor 10,000 lux circadian lamp.
          </p>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-[var(--accent)]/30">
        <h2 className="text-2xl font-bold mb-4 text-[var(--accent)]">Automate Your Morning Sunlight</h2>
        <p className="text-[var(--fg-muted)] mb-6 max-w-lg mx-auto">
          The ARC iOS app checks your local cloud cover at sunrise and counts down your exact light requirement on your lock screen with a Live Activity.
        </p>
        <a href="/#pricing" className="inline-block bg-[var(--accent)] text-black font-extrabold py-3.5 px-8 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono">
          Get ARC Pro
        </a>
      </div>
    </main>
  );
}
