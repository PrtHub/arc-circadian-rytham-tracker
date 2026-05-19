"use client";

import { useState } from "react";
import Link from "next/link";

export default function CaffeineCalculatorClient() {
  const [targetSleep, setTargetSleep] = useState("23:00");
  const [caffeineAmount, setCaffeineAmount] = useState(100);

  const calculateCutoff = () => {
    if (caffeineAmount <= 25) return "Anytime (Very low dose)";

    const hoursNeeded = 6 * (Math.log(25 / caffeineAmount) / Math.log(0.5));

    const [hours, minutes] = targetSleep.split(":").map(Number);
    let sleepDate = new Date();
    sleepDate.setHours(hours, minutes, 0, 0);

    const cutoffDate = new Date(sleepDate.getTime() - hoursNeeded * 60 * 60 * 1000);

    return cutoffDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Caffeine <span className="text-[#CCFF00]">Half-Life</span> Calculator
        </h1>
        <p className="text-zinc-400 text-lg">
          Caffeine has a half-life of roughly 6 hours. Calculate exactly when you need to stop drinking coffee today to protect your deep sleep tonight.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Target Bedtime</label>
            <input
              type="time"
              value={targetSleep}
              onChange={(e) => setTargetSleep(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Drink Strength (mg)</label>
            <select
              value={caffeineAmount}
              onChange={(e) => setCaffeineAmount(Number(e.target.value))}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors appearance-none"
            >
              <option value="50">Black Tea (50mg)</option>
              <option value="100">Standard Coffee (100mg)</option>
              <option value="150">Double Espresso (150mg)</option>
              <option value="200">Energy Drink (200mg)</option>
              <option value="300">Pre-Workout (300mg)</option>
            </select>
          </div>
        </div>

        <div className="bg-black border border-[#CCFF00]/30 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"></div>
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Your Biological Cutoff Time</p>
          <div className="text-5xl sm:text-6xl font-black text-[#CCFF00] mb-4 drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            {calculateCutoff()}
          </div>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            You must finish your drink by this time to ensure you have less than 25mg of active caffeine in your brain at bedtime.
          </p>
        </div>
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Tired of doing the math?</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          The ARC app features a live, real-time SVG decay curve. Just tap what you drank, and watch the exact milligram count drop throughout the day.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>
      <div className="mt-12 bg-[#111] border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-2 text-white">Embed this calculator on your site</h3>
        <p className="text-zinc-400 text-sm mb-4">Are you a blogger or health coach? Copy the code below to add this tool to your website and help your readers protect their sleep.</p>
        <div className="relative">
          <pre className="bg-black text-zinc-500 p-4 rounded-xl text-xs overflow-x-auto border border-white/5">
            {`<iframe src="https://arcapp.sbs/tools/caffeine-calculator" width="100%" height="600px" frameborder="0"></iframe>`}
          </pre>
          <button 
            onClick={() => navigator.clipboard.writeText('<iframe src="https://arcapp.sbs/tools/caffeine-calculator" width="100%" height="600px" frameborder="0"></iframe>')}
            className="absolute top-2 right-2 text-xs bg-[#CCFF00] text-black font-bold py-1.5 px-3 rounded-md hover:bg-white transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}
