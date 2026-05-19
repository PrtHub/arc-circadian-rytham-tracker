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
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Day in the Life <span className="text-[#CCFF00]">Visualizer</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Slide through the day to see how your master hormones fluctuate based on your genetic chronotype.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="flex gap-4 mb-8 justify-center flex-wrap">
          {["lion", "bear", "wolf", "dolphin"].map((t) => (
            <button
              key={t}
              onClick={() => setChronotype(t)}
              className={`px-5 py-2 rounded-full font-bold capitalize transition-colors ${
                chronotype === t 
                  ? "bg-[#CCFF00] text-black" 
                  : "bg-black text-zinc-500 border border-white/10 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mb-12 text-center">
          <div className="text-6xl font-black text-white mb-2">{getHourLabel(hour)}</div>
          <p className="text-[#CCFF00] font-bold text-sm uppercase tracking-wider">{getStatusText()}</p>
        </div>

        <div className="mb-12 px-4">
          <input
            type="range"
            min="6"
            max="24"
            value={hour}
            onChange={(e) => setHour(Number(e.target.value))}
            className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer border border-white/10 focus:outline-none"
            style={{
              accentColor: "#CCFF00"
            }}
          />
          <div className="flex justify-between text-xs text-zinc-600 mt-2">
            <span>6:00 AM</span>
            <span>12:00 PM</span>
            <span>6:00 PM</span>
            <span>12:00 AM</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="bg-black border border-white/5 rounded-2xl p-6 text-center">
            <p className="text-xs text-zinc-500 font-bold uppercase mb-2">Cortisol (Alertness)</p>
            <div className="text-4xl font-black text-orange-500 mb-4">{Math.round(cortisol)}%</div>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full transition-all duration-300" style={{ width: `${cortisol}%` }}></div>
            </div>
          </div>
          
          <div className="bg-black border border-white/5 rounded-2xl p-6 text-center">
            <p className="text-xs text-zinc-500 font-bold uppercase mb-2">Melatonin (Sleepiness)</p>
            <div className="text-4xl font-black text-blue-500 mb-4">{Math.round(melatonin)}%</div>
            <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${melatonin}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Live the perfect day</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto leading-relaxed">
          Knowing the curves is step one. The ARC app actively builds your schedule to align with these exact peaks and valleys automatically.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>
    </main>
  );
}
