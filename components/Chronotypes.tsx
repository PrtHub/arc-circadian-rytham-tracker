import Link from "next/link";
import { chronotypes } from "@/components/arc-data";

export function Chronotypes() {
  return (
    <section
      aria-labelledby="chronotypes-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
              THE 4 CHRONOTYPES
            </p>
            <h2
              id="chronotypes-heading"
              className="text-4xl sm:text-5xl font-black tracking-tighter"
            >
              There are four clocks.
              <br />
              <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">Which is yours?</span>
            </h2>
          </div>
          <p className="text-(--fg-muted) text-sm max-w-xs leading-relaxed">
            Your chronotype dictates when you&apos;re wired to wake, peak, and sleep. A 22-step onboarding across 6 acts pinpoints yours.
          </p>
        </div>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          aria-label="Chronotype types"
        >
          {chronotypes.map((c) => (
            <li
              key={c.name}
              data-sky={c.name.toLowerCase()}
              className="raised-card hover:border-(--accent)/40 transition-all hover:-translate-y-1 group flex flex-col"
            >
              <Link href={`/chronotype/${c.name.toLowerCase()}`} className="p-6 flex-1 flex flex-col">
                <div className="text-5xl mb-5" aria-hidden="true">
                  {c.icon}
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="font-black text-xl text-white group-hover:text-accent transition-colors">
                    {c.name}
                  </h3>
                  <span className="text-xs font-semibold tracking-wider text-accent/80 uppercase font-mono">
                    {c.tagline}
                  </span>
                </div>
                <p className="text-sm text-(--fg-muted) leading-relaxed mb-4 flex-1">{c.desc}</p>
                <div className="text-accent text-xs font-bold uppercase tracking-wider group-hover:underline mt-auto font-mono">
                  Read full guide →
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
