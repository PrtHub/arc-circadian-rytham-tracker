"use client";

import { useEffect, useState } from "react";

export function Problem() {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="py-24 px-6 relative overflow-hidden bg-[#050505] border-t border-white/5"
    >
      {/* Background glow */}
      <div
        className="pointer-events-none absolute -left-1/4 top-1/4 w-[500px] h-[500px] rounded-full bg-[#FF4500]/5 blur-[120px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
        {/* Left: Content */}
        <div className="flex flex-col items-start gap-6">
          <span className="text-xs font-bold tracking-widest text-[#FF4500] uppercase font-mono border border-[#FF4500]/30 bg-[#FF4500]/5 px-3 py-1 rounded-full">
            THE MISALIGNMENT
          </span>

          <h2
            id="problem-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white"
          >
            Tired in a way
            <br />
            <span className="text-[#FF4500]">sleep doesn&apos;t fix?</span>
          </h2>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
            You&apos;ve been told you&apos;re undisciplined because you can&apos;t function at 8:00 AM, or you&apos;re wired at midnight. It&apos;s not a character flaw — <strong className="text-white">it&apos;s your chronotype</strong>. Your body runs on a biological clock, and most of us are fighting ours all day.
          </p>

          <ul className="w-full space-y-4 mt-2" aria-label="Circadian disruption indicators">
            {[
              {
                icon: "🌫️",
                title: "Mornings feel like fog until 10am",
                desc: "Your cortisol rise is delayed, keeping you in sleep mode long after your alarm.",
              },
              {
                icon: "📉",
                title: "The 3pm crash every single day",
                desc: "Drinking coffee at the wrong time blockades adenosine receptors, ensuring an afternoon crash.",
              },
              {
                icon: "🌙",
                title: "Wide awake exactly when you need to sleep",
                desc: "Fluorescent lights and digital screens suppress melatonin, pushing your sleep gate back hours.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-4 rounded-2xl border border-white/5 bg-[#121212]/50 p-4 hover:border-white/10 transition-colors"
              >
                <span className="text-2xl shrink-0 mt-0.5" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Circadian Clock Radar Visual */}
        <div className="flex justify-center items-center">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-white/5 bg-zinc-950/40 backdrop-blur-3xl flex items-center justify-center shadow-2xl">
            {/* Ambient glows behind radar */}
            <div className="absolute inset-0 rounded-full bg-radial from-[#FF4500]/10 to-transparent opacity-60" />
            
            {/* Clock ticks / radar lines */}
            <div className="absolute w-11/12 h-11/12 rounded-full border border-dashed border-white/10" />
            <div className="absolute w-8/12 h-8/12 rounded-full border border-white/5" />
            <div className="absolute w-5/12 h-5/12 rounded-full border border-white/5" />
            
            {/* Out-of-sync indicators */}
            <div className="absolute top-12 left-12 w-3 h-3 rounded-full bg-[#FF4500] animate-ping" />
            <div className="absolute top-12 left-12 w-3 h-3 rounded-full bg-[#FF4500]" />
            
            {/* Safe zone indicator */}
            <div className="absolute bottom-16 right-16 w-2 h-2 rounded-full bg-[#CCFF00]" />
            
            {/* Radar hand sweeps dynamically */}
            <div className="absolute inset-0 flex items-center justify-center animate-spin" style={{ animationDuration: "12s" }}>
              <div className="w-1/2 h-[1px] bg-linear-to-r from-transparent to-[#FF4500]/60 relative origin-left" />
            </div>

            {/* Central biological core status */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-[#FF4500] font-black animate-pulse">
                OUT OF SYNC
              </span>
              <span className="text-4xl font-extrabold text-white mt-1 select-none font-sans">
                -3.5h
              </span>
              <span className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">
                CIRCADIAN DRIFT
              </span>
            </div>

            {/* Custom tactical label boxes floating inside the clock container */}
            <div className="absolute top-6 right-1/4 bg-[#121212] border border-white/5 rounded-lg px-2.5 py-1 text-[9px] font-mono text-zinc-400 select-none shadow-lg">
              ☕ COFFEE BLOCKADE
            </div>
            <div className="absolute bottom-12 left-6 bg-[#121212] border border-white/5 rounded-lg px-2.5 py-1 text-[9px] font-mono text-[#FF4500] select-none shadow-lg font-bold">
              ⚠️ NOCTURNAL CRASH
            </div>
            <div className="absolute right-6 bottom-1/3 bg-[#121212] border border-white/5 rounded-lg px-2.5 py-1 text-[9px] font-mono text-[#CCFF00] select-none shadow-lg">
              ☀️ OPTIMAL SYNC
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
