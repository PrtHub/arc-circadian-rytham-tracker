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
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
              THE SCIENCE
            </p>
            <h2
              id="science-heading"
              className="text-4xl sm:text-5xl font-black tracking-tighter"
            >
              Built on chronobiology,
              <br />
              <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">not hustle culture.</span>
            </h2>
          </div>
          <p className="text-(--fg-muted) text-sm max-w-sm leading-relaxed">
            Your energy isn&apos;t random — it follows a circadian rhythm set by light, sleep, and timing. ARC turns decades of sleep and circadian science into simple, personalized actions.
          </p>
        </div>

        {/* Mechanism cards */}
        <ul
          className="grid sm:grid-cols-3 gap-4 mb-8"
          aria-label="Biological mechanisms"
        >
          {mechanisms.map((m) => (
            <li
              key={m.molecule}
              className="raised-card p-6 flex flex-col gap-4 hover:border-(--accent)/30 transition-colors"
            >
              <div className="flex items-start justify-between">
                <span className="text-4xl" aria-hidden="true">
                  {m.symbol}
                </span>
                <span className="text-[10px] font-black tracking-widest text-accent uppercase border border-(--accent)/30 bg-(--accent)/10 rounded-full px-2.5 py-0.5 font-mono">
                  {m.tag}
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl text-white mb-1">
                  {m.molecule}
                </h3>
                <p className="text-xs font-bold text-accent mb-3">
                  {m.highlight}
                </p>
                <p className="text-sm text-(--fg-muted) leading-relaxed">
                  {m.body}
                </p>
              </div>
            </li>
          ))}
        </ul>

        {/* Stat Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-center">
          {[
            { value: "4", label: "Chronotypes mapped" },
            { value: "5-7h", label: "Caffeine metabolic half-life" },
            { value: "20 min", label: "Solar light target" },
          ].map((stat) => (
            <div key={stat.label} className="raised-card py-8 flex flex-col gap-1 items-center hover:border-(--accent)/30 transition-colors">
              <span className="text-4xl sm:text-5xl font-black text-accent font-sans tracking-tighter">
                {stat.value}
              </span>
              <span className="text-[10px] font-black tracking-widest text-(--fg-muted) uppercase font-mono mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Biological Briefing callout */}
        <div className="raised-card border-(--accent)/30 p-6 mb-10 flex flex-col sm:flex-row items-start gap-4">
          <div
            className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-black font-black text-sm bg-accent"
            aria-hidden="true"
          >
            ⚡
          </div>
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-2 font-mono">
              Sample Biological Directive
            </p>
            <blockquote className="text-white font-semibold text-lg leading-snug mb-2 font-display italic">
              &ldquo;You&apos;re 40 minutes into your afternoon dip. This is adenosine, not laziness.&rdquo;
            </blockquote>
            <p className="text-(--fg-muted) text-sm">
              Mechanism, never verdict. ARC explains today in one sentence using your own numbers, with the physiological reason one tap away under &ldquo;Why this works&rdquo;.
            </p>
          </div>
        </div>

        {/* Researcher citations */}
        <div className="border-t border-white/5 pt-8">
          <p className="text-xs font-bold tracking-widest text-(--fg-muted) uppercase mb-5 font-mono">
            Research Foundation
          </p>
          <ul
            className="flex flex-col sm:flex-row gap-4"
            aria-label="Research citations"
          >
            {researchers.map((r) => (
              <li
                key={r.name}
                className="flex items-center gap-4 raised-card px-5 py-4 flex-1 hover:border-(--accent)/30 transition-colors"
              >
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-black text-xs font-black font-mono bg-accent"
                  aria-hidden="true"
                >
                  {r.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{r.name}</p>
                  <p className="text-accent/90 text-xs font-medium">
                    {r.affiliation}
                  </p>
                  <p className="text-(--fg-muted) text-xs mt-0.5">{r.topic}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
