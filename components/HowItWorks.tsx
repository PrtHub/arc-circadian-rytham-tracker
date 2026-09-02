import { steps } from "@/components/arc-data";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Steps */}
        <div>
          <p className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase mb-3 font-mono">
            HOW IT WORKS
          </p>
          <h2
            id="hiw-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter mb-12"
          >
            From confused to in-sync
            <br />
            <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">in one evening.</span>
          </h2>

          <ol className="relative space-y-10" aria-label="How ARC works">
            {steps.map((s, i) => (
              <li key={s.step} className="relative pl-16">
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[1.6rem] top-10 w-px h-14 bg-linear-to-b from-[var(--accent)]/40 to-transparent"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 flex items-center justify-center text-[var(--accent)] text-xs font-black font-mono"
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{s.title}</h3>
                <p className="text-[var(--fg-muted)] text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Dual Living Light 2.0 Interface Cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Card 1: Chronotype Discovery */}
          <div
            className="w-full max-w-[280px] rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left -rotate-2 hover:rotate-0 transition-transform"
            style={{
              background: "linear-gradient(180deg, #101E30 0%, #1E3C48 55%, #3B6146 100%)",
              color: "#F3FAF4",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#B9E88A] uppercase border border-[#B9E88A]/30 bg-[#B9E88A]/10 px-2.5 py-0.5 rounded-full">
                CHRONOTYPE
              </span>
              <span className="text-xl">🐻</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#C2DCC8] uppercase">YOUR BIOLOGICAL PROFILE</span>
              <h4 className="font-black text-xl text-white mt-0.5">Bear Chronotype</h4>
              <p className="text-xs text-[#C2DCC8] mt-1 leading-relaxed">
                Solar-synchronized. 50% of humans. Cortisol peak at 8:30 AM.
              </p>
            </div>
            <div className="raised-card p-3 space-y-1.5 text-[11px] font-mono">
              <div className="flex justify-between text-[#B9E88A]">
                <span>☀️ Light Window</span>
                <span>7:30 - 8:00 AM</span>
              </div>
              <div className="flex justify-between text-zinc-300">
                <span>☕ Safe Coffee</span>
                <span>Until 1:47 PM</span>
              </div>
            </div>
          </div>

          {/* Card 2: Today Protocol Execution */}
          <div
            className="w-full max-w-[280px] rounded-3xl p-5 border border-white/15 shadow-2xl flex flex-col gap-4 text-left rotate-2 sm:translate-y-4 hover:rotate-0 transition-transform"
            style={{
              background: "linear-gradient(180deg, #221D30 0%, #432F43 55%, #6B4536 100%)",
              color: "#FBEFE6",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFC48A] uppercase border border-[#FFC48A]/30 bg-[#FFC48A]/10 px-2.5 py-0.5 rounded-full">
                TODAY HUD
              </span>
              <span className="text-xs font-mono text-[#DCC0AE]">2:40 PM</span>
            </div>
            <p className="font-display italic text-lg leading-snug text-[#FBEFE6]">
              &ldquo;You&apos;re 40 minutes into your dip. Move 5 min to clear adenosine.&rdquo;
            </p>
            <div className="raised-card p-3 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono uppercase text-zinc-400 block">LAST SAFE COFFEE</span>
                <span className="font-display text-2xl font-bold text-white">1:47 PM</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#FFAA00] bg-[#FFAA00]/15 px-2 py-1 rounded-md">
                42m left
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
