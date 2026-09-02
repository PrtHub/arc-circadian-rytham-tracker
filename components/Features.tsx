const pillars = [
  {
    eyebrow: "ONE CLEAR MOVE",
    title: "The day's plan & one ask",
    desc: "One sentence, then a plan for the day. Exactly one prioritized ask at a time—get light, start your hard task, or take a walk—drawn as the first item of your plan. No cluttered dashboard, no decision fatigue at 7am.",
  },
  {
    eyebrow: "NEVER CRASH AT 3PM",
    title: "Dynamic caffeine cutoff",
    desc: "The last safe coffee time, computed dynamically from your bedtime, caffeine sensitivity, and every drink logged today. Three distinct states (ahead, passed, exhausted) ensure under 50mg of active caffeine remains at bedtime.",
  },
  {
    eyebrow: "ANCHOR YOUR CLOCK",
    title: "Solar morning light",
    desc: "Real astronomical sunrise calculated from your device's timezone with zero GPS permission. A 20-minute calibrated timer runs as a Live Activity in your Dynamic Island so your phone stays in your pocket, with indoor fallbacks for dark winter mornings.",
  },
  {
    eyebrow: "MECHANISM, NOT GUILT",
    title: "Tuned to your real biology",
    desc: "Every day explained in your own numbers. 'This is adenosine, not laziness.' Mechanism, never verdict—no guilt trips, arbitrary 0-100 sleep scores, rings, or streaks. Just clear physiological facts.",
  },
  {
    eyebrow: "MEASURED PROOF",
    title: "Receipts over weeks",
    desc: "Watch your afternoon crashes drop from 3.5 to 1.0 a week—measured from your own check-ins, not asserted. Backed by 14-day adherence dot strips, 5-day habit experiment loops, and 7 automated biological event loops.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 px-6 relative overflow-hidden border-t border-white/5"
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute right-[-20%] top-[10%] w-150 h-150 rounded-full bg-(--accent)/5 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[-20%] bottom-[10%] w-150 h-150 rounded-full bg-(--aura-sleep)/5 blur-[150px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <header className="mb-24 text-center">
          <span className="text-xs font-bold tracking-widest text-accent uppercase font-mono border border-(--accent)/30 bg-(--accent)/5 px-3 py-1 rounded-full">
            THE PILLARS
          </span>
          <h2
            id="features-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white mt-6"
          >
            Tactical features.
            <br />
            <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl lg:text-7xl">Biological precision.</span>
          </h2>
        </header>

        <div className="space-y-24 lg:space-y-36">
          {pillars.map((p, index) => {
            const isOdd = index % 2 === 1;
            return (
              <div
                key={p.title}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between ${
                  isOdd ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text column */}
                <div className="flex-1 max-w-xl flex flex-col gap-4">
                  <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase font-mono">
                    {p.eyebrow}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="text-[var(--fg-muted)] leading-relaxed text-base sm:text-lg">
                    {p.desc}
                  </p>
                </div>

                {/* Pure CSS/SVG Living Light Interactive Widget Column */}
                <div className="flex-1 w-full max-w-[340px] sm:max-w-[360px] relative flex justify-center">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-[var(--accent)]/5 blur-3xl -z-10" />
                  
                  {/* Pillar 1: Daily Protocol UI */}
                  {index === 0 && (
                    <div className="w-full rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left"
                      style={{
                        background: "linear-gradient(180deg, #12203E 0%, #22405F 55%, #355E78 100%)",
                        color: "#F4F9FC"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD9A0] uppercase border border-[#FFD9A0]/30 bg-[#FFD9A0]/10 px-2.5 py-0.5 rounded-full">
                          MORNING LIGHT
                        </span>
                        <span className="text-xs font-mono text-[#C4DAE7]">08:15 AM</span>
                      </div>
                      <p className="font-display italic text-2xl leading-snug text-[#F4F9FC]">
                        &ldquo;You&apos;re in your light window. Twenty minutes outside now sets up your whole day.&rdquo;
                      </p>
                      <div className="raised-card p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent)] font-bold">
                            THE ONE ACTION
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">1 of 1</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#FFAA00]/20 border border-[#FFAA00]/40 flex items-center justify-center text-lg shrink-0">
                            ☀️
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-sm text-white">Get 20 min of light</h4>
                            <p className="text-[11px] text-[#C4DAE7]">Runs in Dynamic Island · Phone stays in pocket</p>
                          </div>
                        </div>
                        <button className="w-full bg-[var(--accent)] text-black font-bold text-xs py-2.5 rounded-lg hover:brightness-110 transition-colors font-mono">
                          Start 20m Timer
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Pillar 2: Dynamic Caffeine Cutoff UI */}
                  {index === 1 && (
                    <div className="w-full rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left"
                      style={{
                        background: "linear-gradient(180deg, #221D30 0%, #432F43 55%, #6B4536 100%)",
                        color: "#FBEFE6"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFAA00] uppercase border border-[#FFAA00]/30 bg-[#FFAA00]/10 px-2.5 py-0.5 rounded-full">
                          CAFFEINE DECAY
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-md">
                          AHEAD · 42M LEFT
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#DCC0AE]">
                          LAST SAFE COFFEE
                        </span>
                        <div className="font-display text-5xl font-bold text-[#FBEFE6] mt-1">
                          1:47 PM
                        </div>
                        <span className="text-[11px] text-[#DCC0AE]">Target &lt;50mg active at 11:30 PM bed</span>
                      </div>
                      <div className="raised-card p-3 flex flex-col gap-2">
                        <div className="flex justify-between items-center text-[10px] font-mono">
                          <span className="text-white font-bold">☕ Double Espresso (150mg)</span>
                          <span className="text-zinc-400">9:15 AM</span>
                        </div>
                        <div className="w-full h-12 relative">
                          <svg viewBox="0 0 100 30" className="w-full h-full">
                            <line x1="0" y1="20" x2="100" y2="20" stroke="#7B61FF" strokeDasharray="2,2" strokeWidth="0.8" />
                            <path d="M 0 5 Q 30 7, 50 14 T 100 24" fill="none" stroke="#FF4500" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="50" cy="14" r="3" fill="var(--accent)" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pillar 3: Morning Light Window UI */}
                  {index === 2 && (
                    <div className="w-full rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left"
                      style={{
                        background: "linear-gradient(180deg, #1A1C3A 0%, #4A3352 55%, #7C4722 100%)",
                        color: "#FDF6EC"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFD9A0] uppercase border border-[#FFD9A0]/30 bg-[#FFD9A0]/10 px-2.5 py-0.5 rounded-full">
                          SOLAR ANCHOR
                        </span>
                        <span className="text-[10px] font-mono text-[#E2CBB4]">Sunrise: 06:42 AM</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#E2CBB4]">
                          LIVE ACTIVITY MIRROR
                        </span>
                        <div className="font-display text-4xl font-bold text-[#FDF6EC] mt-1">
                          14m 20s
                        </div>
                        <span className="text-[11px] text-[#E2CBB4]">20-minute master clock calibration</span>
                      </div>
                      <div className="raised-card p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[#FFAA00] animate-ping" />
                            Lock Screen Active
                          </span>
                          <span className="font-mono text-[var(--accent)] font-bold">72%</span>
                        </div>
                        <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                          <div className="h-full bg-linear-to-r from-[#FFAA00] to-[var(--accent)] rounded-full" style={{ width: "72%" }} />
                        </div>
                        <span className="text-[10px] font-mono text-zinc-400">Zero GPS tracking · Timezone-inferred sunrise</span>
                      </div>
                    </div>
                  )}

                  {/* Pillar 4: Tuned to Real Biology UI */}
                  {index === 3 && (
                    <div className="w-full rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left"
                      style={{
                        background: "linear-gradient(180deg, #0D1B2E 0%, #173248 55%, #2E5C76 100%)",
                        color: "#F6FAFD"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFE0A8] uppercase border border-[#FFE0A8]/30 bg-[#FFE0A8]/10 px-2.5 py-0.5 rounded-full">
                          DAILY DEBRIEF
                        </span>
                        <span className="text-[10px] font-mono text-[#C2D7E4]">Mechanism, not guilt</span>
                      </div>
                      <p className="font-display italic text-2xl leading-snug text-[#F6FAFD]">
                        &ldquo;This is adenosine, not laziness. Your sleep debt is 42m; we shifted your focus window accordingly.&rdquo;
                      </p>
                      <div className="raised-card p-3.5 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#FFE0A8] font-bold">⚡ Focus Peak Window</span>
                          <span className="text-white font-bold">10:00 AM - 12:30 PM</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#7B61FF] font-bold">🌙 Melatonin Onset</span>
                          <span className="text-white font-bold">9:45 PM</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Pillar 5: Receipts Over Weeks UI */}
                  {index === 4 && (
                    <div className="w-full rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left"
                      style={{
                        background: "linear-gradient(180deg, #0E1128 0%, #221A3A 55%, #3D263E 100%)",
                        color: "#E8DFEC"
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--accent)] uppercase border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 rounded-full">
                          28-DAY REPORT
                        </span>
                        <span className="text-[10px] font-mono text-[#A594AE]">Monthly Receipt</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#A594AE]">
                          AFTERNOON CRASHES
                        </span>
                        <div className="font-display text-4xl font-bold text-[var(--accent)] mt-1 flex items-baseline gap-2">
                          3.5 <span className="text-lg text-[#A594AE] font-sans font-normal">→</span> 1.0 <span className="text-xs text-[#A594AE] font-mono">/ wk</span>
                        </div>
                        <span className="text-[11px] text-[#A594AE]">-71% measured reduction from check-ins</span>
                      </div>
                      <div className="raised-card p-3.5 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                          14-DAY PROTOCOL ADHERENCE
                        </span>
                        <div className="flex items-center gap-1.5 justify-between">
                          {["✓","✓","✓","✓","✓","✓","•","✓","✓","✓","✓","✓","✓","✓"].map((dot, dotIdx) => (
                            <span
                              key={dotIdx}
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold font-mono ${
                                dot === "✓" ? "bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/40" : "bg-white/5 text-zinc-500 border border-white/10"
                              }`}
                            >
                              {dot}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
