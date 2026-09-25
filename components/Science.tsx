const mechanisms = [
  {
    symbol: "⚗️",
    molecule: "Adenosine",
    tag: "Sleep Pressure",
    body: "Adenosine builds up in your brain from the moment you wake, and that sleep pressure is what the afternoon dip feels like. Caffeine doesn't remove it; it masks the signal until it wears off. ARC tracks how much caffeine is still on board and solves your last safe coffee from your bedtime.",
    highlight: "Sleep pressure, not laziness",
  },
  {
    symbol: "☀️",
    molecule: "Cortisol",
    tag: "Morning Anchor",
    body: "Cortisol rises naturally after waking, and morning daylight is the strongest signal for setting the body clock that times it, along with when you'll feel alert and when melatonin rises that evening. ARC works out your real sunrise and runs a 20-minute light timer.",
    highlight: "Morning light sets the clock",
  },
  {
    symbol: "🌙",
    molecule: "Melatonin",
    tag: "Sleep Onset",
    body: "Melatonin rises in the evening on a schedule set by your body clock, and bright light late at night pushes it back. ARC's wind-down reminder tells you when to dim screens and lights, timed to your own bedtime.",
    highlight: "Wind-down, on your schedule",
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
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight"
            >
              Built on chronobiology,
              <br />
              <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">not hustle culture.</span>
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
            { value: "4–7h", label: "Caffeine half-life range" },
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
