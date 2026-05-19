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
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Sunlight <span className="text-[#CCFF00]">Window</span> Calculator
        </h1>
        <p className="text-zinc-400 text-lg">
          Huberman says morning sunlight is non-negotiable. But how long do you actually need to stand outside? Calculate your minimum effective dose based on today's weather.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Today's Weather</label>
            <select 
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors appearance-none"
            >
              <option value="sunny">Bright & Sunny (10,000+ lux)</option>
              <option value="cloudy">Partly Cloudy (5,000 lux)</option>
              <option value="overcast">Heavy Overcast (1,000 lux)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Your Primary Goal</label>
            <select 
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors appearance-none"
            >
              <option value="alertness">Morning Alertness</option>
              <option value="sleep">Resetting Bad Sleep</option>
            </select>
          </div>
        </div>

        <div className="bg-black border border-[#CCFF00]/30 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"></div>
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Recommended Duration</p>
          <div className="text-5xl sm:text-6xl font-black text-[#CCFF00] mb-4 drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            {calculateTime()} Minutes
          </div>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto leading-relaxed">
            Get outside within 1 hour of waking. Do not wear sunglasses. Do not look directly at the sun. Window glass filters out the required wavelengths, so you must be outside.
          </p>
        </div>
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Lost track of time?</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          The ARC app features a live, active Sunlight Timer. It uses your local weather API to calculate the exact lux and counts down the minutes in your ear while you walk.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>
    </main>
  );
}
