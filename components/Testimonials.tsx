import React from "react";
import { APP_STORE_URL } from "@/components/arc-data";

// Only verbatim App Store reviews belong here.
const reviews = [
  {
    quote: "Nice to know how my body works — the optimal time to drink coffee and when to cut it off so it doesn't affect my sleep.",
    author: "NotxJeff",
    source: "App Store Review",
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
        <header className="mb-12 text-center">
          <span className="text-xs font-bold tracking-widest text-accent uppercase font-mono border border-(--accent)/30 bg-(--accent)/5 px-3 py-1 rounded-full">
            FROM THE APP STORE
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white mt-4">
            Finally understand
            <br />
            <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">how your body works.</span>
          </h2>
        </header>

        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="raised-card p-8 sm:p-10 flex flex-col items-center text-center hover:border-(--accent)/40 transition-all"
            >
              <div className="flex text-accent text-sm mb-5">
                {Array.from({ length: r.stars }).map((_, starIdx) => (
                  <span key={starIdx}>★</span>
                ))}
              </div>
              <blockquote className="text-(--fg) text-base sm:text-lg leading-relaxed italic">
                &ldquo;{r.quote}&rdquo;
              </blockquote>

              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col w-full">
                <span className="text-white text-sm font-bold">{r.author}</span>
                <span className="text-(--fg-muted) text-[10px] uppercase font-mono tracking-wider mt-0.5">
                  {r.source}
                </span>
              </div>
            </div>
          ))}

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-center text-xs font-mono font-bold uppercase tracking-wider text-(--fg-muted) hover:text-white transition-colors"
          >
            Read all reviews on the App Store →
          </a>
        </div>
      </div>
    </section>
  );
}
