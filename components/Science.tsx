const mechanisms = [
  {
    symbol: "⚗️",
    molecule: "Adenosine",
    tag: "Sleep Pressure",
    body: "Adenosine builds up in your brain from the moment you wake. It creates sleep pressure that makes you feel tired. Caffeine doesn't remove it — it just masks the signal. ARC calculates the exact window to wait before your first coffee, preventing your 2 PM crash.",
    highlight: "The Adenosine Clear",
  },
  {
    symbol: "☀️",
    molecule: "Cortisol",
    tag: "Morning Anchor",
    body: "Morning sunlight triggers a cortisol spike that sets your entire daily rhythm — including when you'll feel alert and when melatonin will rise 12–16 hours later. ARC gives you a precise sunlight window within minutes of your wake time.",
    highlight: "Cortisol Pulse Timing",
  },
  {
    symbol: "🌙",
    molecule: "Melatonin",
    tag: "Sleep Onset",
    body: "Melatonin release is triggered by your morning cortisol spike and suppressed by evening light. ARC's Digital Sunset protocol tells you exactly when to dim screens and lights to let your natural sleep signal rise — every night.",
    highlight: "Digital Sunset Protocol",
  },
];

const researchers = [
  {
    name: "Dr. Andrew Huberman",
    affiliation: "Stanford Neuroscience Lab",
    topic: "Light exposure, cortisol rhythms & adenosine management",
    initials: "AH",
  },
  {
    name: "Dr. Matthew Walker",
    affiliation: "UC Berkeley Center for Sleep Science",
    topic: "Sleep architecture, circadian cycles & melatonin optimization",
    initials: "MW",
  },
];

export function Science() {
  return (
    <section
      aria-labelledby="science-heading"
      className="py-20 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
              The Science
            </p>
            <h2
              id="science-heading"
              className="text-4xl sm:text-5xl font-black tracking-tighter"
            >
              Biology you can
              <br />
              <span className="text-[#CCFF00]">actually use.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
            ARC is built on peer-reviewed chronobiology — not habit tracking
            folklore. Here&apos;s the science powering every recommendation.
          </p>
        </div>

        {/* Mechanism cards */}
        <ul
          className="grid sm:grid-cols-3 gap-4 mb-10"
          aria-label="Biological mechanisms"
        >
          {mechanisms.map((m) => (
            <li
              key={m.molecule}
              className="rounded-2xl border border-white/5 bg-[#111] p-6 flex flex-col gap-4 hover:border-[#CCFF00]/20 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl" aria-hidden="true">
                  {m.symbol}
                </span>
                <span className="text-[10px] font-black tracking-widest text-[#CCFF00]/60 uppercase border border-[#CCFF00]/20 rounded-full px-2.5 py-0.5">
                  {m.tag}
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl text-white mb-1">
                  {m.molecule}
                </h3>
                <p className="text-xs font-bold text-[#CCFF00] mb-3">
                  {m.highlight}
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Biological Briefing callout */}
        <div className="rounded-2xl border border-[#CCFF00]/20 bg-[#CCFF00]/5 p-6 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-black font-black text-sm"
            style={{ background: "#CCFF00" }}
            aria-hidden="true"
          >
            ⚡
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase mb-2">
              Sample Biological Briefing
            </p>
            <blockquote className="text-white font-semibold text-lg leading-snug mb-2">
              &ldquo;Strategic window. Waiting 90 mins after waking prevents
              your 2 PM focal crash.&rdquo;
            </blockquote>
            <p className="text-zinc-500 text-sm">
              ARC delivers context-aware coaching in plain language — with the
              science behind every action, not just a to-do list.
            </p>
          </div>
        </div>

        {/* Researcher citations */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs font-semibold tracking-widest text-zinc-600 uppercase mb-5">
            Research Foundation
          </p>
          <ul
            className="flex flex-col sm:flex-row gap-4"
            aria-label="Research citations"
          >
            {researchers.map((r) => (
              <li
                key={r.name}
                className="flex items-center gap-4 rounded-2xl border border-white/5 bg-[#111] px-5 py-4 flex-1"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-black text-xs font-black"
                  style={{ background: "#CCFF00" }}
                  aria-hidden="true"
                >
                  {r.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-[#CCFF00]/70 text-xs font-medium">
                    {r.affiliation}
                  </p>
                  <p className="text-zinc-600 text-xs mt-0.5">{r.topic}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
