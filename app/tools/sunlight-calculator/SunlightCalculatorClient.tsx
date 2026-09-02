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
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-(--fg-muted) hover:text-white mb-8 transition-colors font-mono">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Sunlight <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">Window</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-lg">
          Huberman says morning sunlight is non-negotiable. But how long do you actually need to stand outside? Calculate your minimum effective dose based on today&apos;s weather.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Today&apos;s Weather</label>
            <select 
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none font-mono"
            >
              <option value="sunny">Bright &amp; Sunny (10,000+ lux)</option>
              <option value="cloudy">Partly Cloudy (5,000 lux)</option>
              <option value="overcast">Heavy Overcast (1,000 lux)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Your Primary Goal</label>
            <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none font-mono"
            >
              <option value="alertness">Morning Alertness</option>
              <option value="sleep">Resetting Bad Sleep</option>
            </select>
          </div>
        </div>

        <div className="sunken-card border border-(--accent)/30 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-50"></div>
          <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-2 font-mono">Recommended Duration</p>
          <div className="text-5xl sm:text-6xl font-black text-accent mb-4 font-mono">
            {calculateTime()} Minutes
          </div>
          <p className="text-(--fg-muted) text-sm max-w-sm mx-auto leading-relaxed">
            Get outside within your morning sunrise window. Window glass filters out the required blue-cyan photons by up to 70%, so you must step outside. If it is dark before sunrise, use an indoor 10,000 lux circadian lamp.
          </p>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Automate Your Morning Sunlight</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          The ARC iOS app tracks your astronomical solar window and counts down your exact 20-minute light requirement on your lock screen with a Live Activity.
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
