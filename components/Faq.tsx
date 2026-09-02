import { faqs } from "@/components/arc-data";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Questions
            <br />
            <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">answered.</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group raised-card open:border-(--accent)/40 transition-all overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-white hover:text-accent transition-colors select-none">
                {f.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-zinc-400 group-open:text-accent group-open:rotate-45 transition-all text-2xl leading-none font-mono"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-(--fg-muted) text-sm leading-relaxed border-t border-white/5 pt-3">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
