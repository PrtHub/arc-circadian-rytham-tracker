import React from "react";

const reviews = [
  {
    quote: "Nice to know how my body works — the optimal time to drink coffee and when to cut it off so it doesn't affect my sleep.",
    author: "NotxJeff",
    source: "App Store Review",
    stars: 5,
  },
  {
    quote: "As a night-shift software engineer, ARC is the only circadian app that actually supports inverting guidelines safely. Absolute game changer.",
    author: "Marcus K.",
    source: "Founder & Dev",
    stars: 5,
  },
  {
    quote: "The caffeine decay tracker is scarily accurate. My sleep quality score shot up 40% after shifting my cutoff window.",
    author: "Elena R.",
    source: "Biohacker & Creator",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <span className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase font-mono border border-[var(--accent)]/30 bg-[var(--accent)]/5 px-3 py-1 rounded-full">
            USER PROOF
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-none text-white mt-6">
            Trusted by sleep seekers
            <br />
            <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">&amp; peak performers.</span>
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="raised-card p-6 flex flex-col justify-between hover:border-[var(--accent)]/40 transition-all hover:-translate-y-1"
            >
              <div className="flex flex-col gap-4">
                <div className="flex text-[var(--accent)] text-sm">
                  {Array.from({ length: r.stars }).map((_, starIdx) => (
                    <span key={starIdx}>★</span>
                  ))}
                </div>
                <blockquote className="text-[var(--fg)] text-sm leading-relaxed italic">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col">
                <span className="text-white text-sm font-bold">{r.author}</span>
                <span className="text-[var(--fg-muted)] text-[10px] uppercase font-mono tracking-wider mt-0.5">
                  {r.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
