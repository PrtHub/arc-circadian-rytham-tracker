"use client";

import { useEffect, useState } from "react";

export type CircadianPhase =
  | "night"
  | "rise"
  | "morning"
  | "peak"
  | "dip"
  | "evening"
  | "windDown";

export const PHASE_CONFIG: Record<
  CircadianPhase,
  { label: string; timeRange: string; icon: string; desc: string }
> = {
  night: {
    label: "Night",
    timeRange: "11:00 PM – 5:30 AM",
    icon: "🌌",
    desc: "Melatonin high, core temperature minimum",
  },
  rise: {
    label: "Rise",
    timeRange: "5:30 AM – 7:30 AM",
    icon: "🌅",
    desc: "Cortisol awakening response begins",
  },
  morning: {
    label: "Morning Light",
    timeRange: "7:30 AM – 10:30 AM",
    icon: "☀️",
    desc: "Critical 20-min sunlight anchor window",
  },
  peak: {
    label: "Peak Focus",
    timeRange: "10:30 AM – 1:30 PM",
    icon: "⚡",
    desc: "Optimal cognitive performance & executive function",
  },
  dip: {
    label: "Afternoon Dip",
    timeRange: "1:30 PM – 4:30 PM",
    icon: "⏳",
    desc: "Adenosine pressure peak, moving cutoff window",
  },
  evening: {
    label: "Evening",
    timeRange: "4:30 PM – 9:00 PM",
    icon: "🌆",
    desc: "Physical strength peak, avoid bright overhead light",
  },
  windDown: {
    label: "Wind Down",
    timeRange: "9:00 PM – 11:00 PM",
    icon: "🌙",
    desc: "Dim light melatonin onset (DLMO)",
  },
};

export function getPhaseFromDate(date: Date = new Date()): CircadianPhase {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const timeInMinutes = hours * 60 + minutes;

  // 5:30 AM = 330 mins
  // 7:30 AM = 450 mins
  // 10:30 AM = 630 mins
  // 1:30 PM = 810 mins
  // 4:30 PM = 990 mins
  // 9:00 PM = 1260 mins
  // 11:00 PM = 1380 mins

  if (timeInMinutes >= 330 && timeInMinutes < 450) {
    return "rise";
  } else if (timeInMinutes >= 450 && timeInMinutes < 630) {
    return "morning";
  } else if (timeInMinutes >= 630 && timeInMinutes < 810) {
    return "peak";
  } else if (timeInMinutes >= 810 && timeInMinutes < 990) {
    return "dip";
  } else if (timeInMinutes >= 990 && timeInMinutes < 1260) {
    return "evening";
  } else if (timeInMinutes >= 1260 && timeInMinutes < 1380) {
    return "windDown";
  } else {
    return "night";
  }
}

export function CircadianThemeProvider() {
  const [currentPhase, setCurrentPhase] = useState<CircadianPhase>("dip");
  const [isAuto, setIsAuto] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formattedTime, setFormattedTime] = useState("");

  useEffect(() => {
    // Initial sync
    const now = new Date();
    const phase = getPhaseFromDate(now);
    setCurrentPhase(phase);
    document.documentElement.setAttribute("data-phase", phase);
    setFormattedTime(
      now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    );

    // Sync every 30 seconds
    const interval = setInterval(() => {
      const updatedNow = new Date();
      setFormattedTime(
        updatedNow.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })
      );
      if (isAuto) {
        const nextPhase = getPhaseFromDate(updatedNow);
        setCurrentPhase(nextPhase);
        document.documentElement.setAttribute("data-phase", nextPhase);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isAuto]);

  const handleSelectPhase = (phase: CircadianPhase) => {
    setIsAuto(false);
    setCurrentPhase(phase);
    document.documentElement.setAttribute("data-phase", phase);
  };

  const handleResetAuto = () => {
    setIsAuto(true);
    const now = new Date();
    const phase = getPhaseFromDate(now);
    setCurrentPhase(phase);
    document.documentElement.setAttribute("data-phase", phase);
  };

  const activeConfig = PHASE_CONFIG[currentPhase];

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Live Phase HUD Trigger Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="chrome-bar rounded-full px-3.5 py-1.5 flex items-center gap-2.5 text-xs font-bold text-white shadow-2xl hover:border-white/30 transition-all hover:scale-105"
          title="Click to preview the 7 Living Light circadian sky phases"
          aria-label="Circadian phase switcher"
        >
          <span className="text-sm">{activeConfig.icon}</span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--accent)]">
            {activeConfig.label}
          </span>
          <span className="text-zinc-400 font-mono text-[10px]">
            {formattedTime}
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isAuto ? "bg-[var(--accent)] animate-pulse" : "bg-zinc-400"
            }`}
          />
        </button>

        {/* Phase Selector Popover */}
        {isOpen && (
          <div className="absolute bottom-12 left-0 w-72 rounded-2xl chrome-bar p-3.5 shadow-2xl border border-white/20 flex flex-col gap-2 backdrop-blur-3xl animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <p className="text-xs font-bold text-white">Living Light Theme</p>
                <p className="text-[10px] text-[var(--fg-muted)]">
                  Adapts with your biological clock
                </p>
              </div>
              {!isAuto && (
                <button
                  onClick={handleResetAuto}
                  className="text-[10px] font-mono text-[var(--accent)] hover:underline font-bold bg-white/5 px-2 py-0.5 rounded-md border border-white/10"
                >
                  Reset to Auto
                </button>
              )}
            </div>

            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              {(Object.keys(PHASE_CONFIG) as CircadianPhase[]).map((phaseKey) => {
                const cfg = PHASE_CONFIG[phaseKey];
                const isSelected = currentPhase === phaseKey;
                return (
                  <button
                    key={phaseKey}
                    onClick={() => handleSelectPhase(phaseKey)}
                    className={`w-full text-left px-2.5 py-2 rounded-xl flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-white/15 border border-white/20 text-white"
                        : "hover:bg-white/5 text-zinc-300"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cfg.icon}</span>
                      <div>
                        <p className="text-xs font-bold leading-none">
                          {cfg.label}
                        </p>
                        <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                          {cfg.timeRange}
                        </p>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="text-[10px] font-mono font-bold text-[var(--accent)]">
                        ACTIVE
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
