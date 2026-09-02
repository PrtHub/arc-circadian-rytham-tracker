import { AppStoreButton } from "@/components/AppStoreButton";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden pt-12 sm:pt-16 pb-20 px-6"
    >
      {/* Background ambient solar glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full opacity-25 blur-[150px]"
        style={{
          background: "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Focused Copy & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--accent)/30 bg-(--accent)/10 px-3.5 py-1 text-xs font-bold tracking-widest text-accent uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            ARC 2.0 · LIVING LIGHT
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter text-white">
            You&apos;re not lazy.
            <br />
            You&apos;re on the{" "}
            <span className="font-display italic font-normal text-accent text-6xl sm:text-7xl lg:text-8xl">
              wrong clock.
            </span>
          </h1>

          <p className="text-lg text-(--fg-muted) leading-relaxed max-w-lg">
            ARC explains why you feel tired right now, gives you the one thing worth doing about it,
            and proves the answer over weeks by halving your afternoon crashes.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <AppStoreButton size="lg" location="hero" />
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-1.5 text-(--fg-muted) hover:text-white text-sm font-bold font-mono transition-all py-3.5 px-5 rounded-full border border-white/10 hover:bg-white/5"
            >
              See how it works ↓
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-2.5 text-xs font-bold text-(--fg-muted) pt-1 font-mono uppercase tracking-wide">
            <span className="text-accent text-sm tracking-wider">★★★★★</span>
            <span>4.9 on App Store · 100% On-Device Privacy · No Wearables Required</span>
          </div>
        </div>

        {/* Right Column: Authentic ARC Living Light Device Screen */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end select-none">
          {/* Ambient Backlight Halo */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-radial from-[#15273d]/40 via-[#FFD9A0]/10 to-transparent blur-3xl -z-10"
          />

          {/* iPhone Chassis */}
          <div className="relative w-full max-w-[285px] sm:max-w-[295px]">
            {/* Outer Titanium Bezel */}
            <div className="relative rounded-[48px] p-[2.5px] bg-linear-to-b from-neutral-600 via-neutral-800 to-neutral-900 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.15)]">
              {/* Inner Black Border */}
              <div className="relative rounded-[45.5px] p-[5.5px] bg-black">
                {/* Ceramic Shield Glass Reflection */}
                <div className="pointer-events-none absolute inset-0 rounded-[45.5px] bg-linear-to-tr from-transparent via-white/[0.02] to-white/[0.06] z-30" />

                {/* Device Screen Canvas — Matching Reference Screenshot */}
                <div
                  className="relative w-full min-h-[585px] rounded-[40px] overflow-hidden px-4.5 pt-3.5 pb-4 flex flex-col justify-between text-left border border-white/10"
                  style={{
                    background: "linear-gradient(180deg, #12203E 0%, #22405F 55%, #355E78 100%)",
                    color: "#F4F9FC",
                  }}
                >
                  {/* 1. Status Bar */}
                  <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-white/90">
                    <span className="tracking-tight">12:05</span>
                    <div className="flex items-center gap-1.5 text-xs opacity-90">
                      {/* Signal Bars */}
                      <div className="flex items-end gap-0.5 h-2.5">
                        <span className="w-0.5 h-1 bg-white rounded-2xs" />
                        <span className="w-0.5 h-1.5 bg-white rounded-2xs" />
                        <span className="w-0.5 h-2 bg-white rounded-2xs" />
                        <span className="w-0.5 h-2.5 bg-white rounded-2xs" />
                      </div>
                      {/* Wifi */}
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                      </svg>
                      {/* Battery */}
                      <div className="w-5 h-2.5 border border-white/80 rounded-xs p-0.5 flex items-center">
                        <div className="w-3.5 h-full bg-white rounded-2xs" />
                      </div>
                    </div>
                  </div>

                  {/* 2. Top Header: MORNING & Settings Gear */}
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#FFD9A0] uppercase font-bold">
                      MORNING PHASE
                    </span>
                    <button
                      type="button"
                      aria-label="Settings"
                      className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-zinc-300 shadow-inner"
                    >
                      <span className="text-xs">⚙️</span>
                    </button>
                  </div>

                  {/* 3. The Daily Directive Sentence (Editorial Serif) */}
                  <div className="py-1">
                    <p className="font-display italic text-[1.18rem] sm:text-[1.24rem] leading-[1.28] text-white">
                      &ldquo;You&apos;re in your light window. Twenty minutes outside now sets up your whole day.&rdquo;
                    </p>
                  </div>

                  {/* 4. Action Card */}
                  <div className="flex flex-col gap-2">
                    <div className="rounded-2xl p-3 bg-[#15273d]/90 backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-sm shrink-0">
                          🩹
                        </div>
                        <div>
                          <h4 className="font-bold text-xs text-white leading-tight">Light first, coffee later</h4>
                          <p className="text-[9.5px] text-[#A6C0D4] leading-tight mt-0.5">Delay caffeine 90 minutes today</p>
                        </div>
                      </div>
                      <span className="text-zinc-400 text-xs font-bold font-mono">›</span>
                    </div>

                    <div className="flex items-center justify-between px-1 text-[9.5px] text-zinc-400 font-medium">
                      <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                        Why this works <span className="text-[8px] border border-zinc-500 rounded-full w-2.5 h-2.5 inline-flex items-center justify-center">i</span>
                      </span>
                      <span className="hover:text-white transition-colors cursor-pointer">
                        Not now
                      </span>
                    </div>
                  </div>

                  {/* Subtle Divider */}
                  <div className="h-[1px] bg-white/10 w-full" />

                  {/* 5. Last Safe Coffee Section */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[8.5px] font-mono tracking-wider text-zinc-400 uppercase font-bold">
                        LAST SAFE COFFEE
                      </span>
                      <span className="text-[8px] font-mono font-bold text-amber-200 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.5 rounded-full">
                        Recovery
                      </span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="font-display italic text-3xl font-medium text-[#FFD9A0] leading-none">
                        7:40
                      </span>
                      <span className="font-display italic text-base text-[#FFD9A0]/80">
                        pm
                      </span>
                    </div>
                    <span className="text-[9px] text-zinc-400 -mt-0.5">in 7h 35m</span>

                    {/* Timeline Graph */}
                    <div className="w-full relative pt-1 pb-0.5">
                      {/* Dotted sleep threshold line */}
                      <div className="w-full border-b border-dashed border-[#7B61FF]/40 mb-3" />

                      {/* Axis Line with indicator dot */}
                      <div className="relative w-full h-[2px] bg-[#FFD9A0]/30 rounded-full">
                        {/* Vertical line indicator at +4h */}
                        <div className="absolute left-[35%] bottom-0 w-[1px] h-6 bg-[#FFD9A0]/50" />
                        {/* Dot marker */}
                        <div className="absolute left-[35%] -top-1 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#FFD9A0] shadow-[0_0_6px_#FFD9A0]" />
                      </div>

                      {/* Time axis labels */}
                      <div className="flex justify-between items-center text-[7.5px] font-mono text-zinc-400 pt-1.5">
                        <span>Now</span>
                        <span>+4h</span>
                        <span>+7h</span>
                        <span>+11h</span>
                        <span className="font-bold text-white">Bed</span>
                      </div>
                    </div>
                  </div>

                  {/* 6. Floating Navigation Pill Dock (Exact Screenshot Match) */}
                  <div className="pt-1 w-fit mx-auto">
                    <div className="rounded-full p-1 bg-[#15273d]/90 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-xl">
                      {/* Active Home Pill */}
                      <button
                        type="button"
                        className="bg-[#FFD9A0] text-neutral-950 font-bold text-[10px] px-5 py-1.5 rounded-full shadow-md transition-transform"
                      >
                        Home
                      </button>

                      {/* Trends Tab */}
                      <button
                        type="button"
                        className="text-zinc-300 hover:text-white font-medium text-[10px] px-4 py-1.5 transition-colors"
                      >
                        Trends
                      </button>
                    </div>

                    {/* Home Indicator */}
                    <div className="w-20 h-0.5 bg-white/30 rounded-full mx-auto mt-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
