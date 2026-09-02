import { highlights } from "@/components/arc-data";

export function Highlights() {
  return (
    <section aria-labelledby="why-heading" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-widest text-[var(--accent)] uppercase mb-3 font-mono">
            Why ARC
          </p>
          <h2
            id="why-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Built different.
            <br />
            <span className="font-display italic font-normal text-[var(--accent)] text-5xl sm:text-6xl">By design.</span>
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4" aria-label="ARC highlights">
          {highlights.map((h) => (
            <li
              key={h.title}
              className="raised-card p-8 hover:border-[var(--accent)]/40 transition-colors"
            >
              <div className="w-8 h-px bg-[var(--accent)] mb-6" aria-hidden="true" />
              <h3 className="font-bold text-white text-xl mb-3">{h.title}</h3>
              <p className="text-[var(--fg-muted)] leading-relaxed">{h.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
