"use client";

import { useState } from "react";
import Link from "next/link";

export default function VisualizerClient() {
  const [hour, setHour] = useState(8); // 6 to 24
  const [chronotype, setChronotype] = useState("bear");

  const getLevels = () => {
    let cortisol = 50;
    let melatonin = 10;
    
    let offset = 0;
    if (chronotype === "lion") offset = -2;
    if (chronotype === "wolf") offset = 3;
    if (chronotype === "dolphin") offset = 1;
    
    const adjustedHour = hour + offset;
    
    cortisol = Math.max(10, 90 - Math.abs(adjustedHour - 8) * 10);
    melatonin = Math.max(5, 90 - Math.abs(adjustedHour - 23) * 8);
    
    return { cortisol, melatonin };
  };

  const { cortisol, melatonin } = getLevels();

  const getHourLabel = (h: number) => {
    if (h === 12) return "12:00 PM";
    if (h === 24) return "12:00 AM";
    return h > 12 ? `${h - 12}:00 PM` : `${h}:00 AM`;
  };

  const getStatusText = () => {
    const adjHour = hour + (chronotype === "lion" ? -2 : chronotype === "wolf" ? 3 : chronotype === "dolphin" ? 1 : 0);
    
    if (adjHour >= 7 && adjHour <= 10) return "Peak Alertness. Cortisol is surging to clear morning adenosine.";
    if (adjHour >= 11 && adjHour <= 14) return "High Cognitive Focus. Best time for deep, analytical work.";
    if (adjHour >= 15 && adjHour <= 17) return "Afternoon Dip. Energy drops; good for light tasks or exercise.";
    if (adjHour >= 18 && adjHour <= 20) return "Second Wind. A minor peak in energy before the wind-down begins.";
    if (adjHour >= 21 && adjHour <= 23) return "Melatonin Onset. Body temperature drops to prepare for sleep.";
    return "Deep Sleep Phase. Body is repairing and consolidating memories.";
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="inline-flex items-center gap-2 text-sm text-(--fg-muted) hover:text-white mb-8 transition-colors font-mono">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Day in the Life <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">Visualizer</span>
        </h1>
        <p className="text-(--fg-muted) text-lg">
          Slide through the day to see how your master hormones fluctuate based on your genetic chronotype.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="flex gap-4 mb-8 justify-center flex-wrap font-mono text-xs">
          {["lion", "bear", "wolf", "dolphin"].map((t) => (
            <button
              key={t}
              onClick={() => setChronotype(t)}
              className={`px-5 py-2.5 rounded-full font-bold capitalize transition-colors ${
                chronotype === t 
                  ? "bg-accent text-black shadow-[0_0_15px_rgba(204,255,0,0.2)]" 
                  : "bg-white/5 text-(--fg-muted) border border-white/10 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-12 text-center">
          <div className="text-6xl font-black text-white mb-2 font-mono">{getHourLabel(hour)}</div>
          <p className="text-accent font-bold text-sm uppercase tracking-wider font-mono">{getStatusText()}</p>
        </div>

        <div className="mb-12 px-4">
          <input
            type="range"
            min="6"
            max="24"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="w-full h-2 bg-black/60 rounded-lg appearance-none cursor-pointer border border-white/10 focus:outline-none"
            style={{
              accentColor: "var(--accent)"
            }}
          />
          <div className="flex justify-between text-xs text-(--fg-muted) mt-2 font-mono">
            <span>6:00 AM</span>
            <span>12:00 PM</span>
            <span>6:00 PM</span>
            <span>12:00 AM</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="sunken-card p-6 text-center border border-white/5">
            <p className="text-xs text-(--fg-muted) font-bold uppercase mb-2 font-mono">Cortisol (Alertness)</p>
            <div className="text-4xl font-black text-(--aura-sun) mb-4 font-mono">{Math.round(cortisol)}%</div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-(--aura-sun) h-full transition-all duration-300" style={{ width: `${cortisol}%` }}></div>
            </div>
          </div>
          
          <div className="sunken-card p-6 text-center border border-white/5">
            <p className="text-xs text-(--fg-muted) font-bold uppercase mb-2 font-mono">Melatonin (Sleepiness)</p>
            <div className="text-4xl font-black text-(--aura-sleep) mb-4 font-mono">{Math.round(melatonin)}%</div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-(--aura-sleep) h-full transition-all duration-300" style={{ width: `${melatonin}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Live the perfect day</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed text-sm">
          Knowing the curves is step one. The ARC app actively builds your schedule to align with these exact peaks and valleys automatically.
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
