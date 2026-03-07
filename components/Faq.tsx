import { faqs } from "@/components/arc-data";

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-3xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
            FAQ
          </p>
          <h2
            id="faq-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Questions
            <br />
            <span className="text-[#CCFF00]">answered.</span>
          </h2>
        </div>

        <div className="space-y-2">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-white/5 bg-[#111] open:border-[#CCFF00]/20 transition-all"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-semibold text-white hover:text-[#CCFF00] transition-colors select-none">
                {f.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-zinc-500 group-open:text-[#CCFF00] group-open:rotate-45 transition-all text-2xl leading-none"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-zinc-400 text-sm leading-relaxed">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
