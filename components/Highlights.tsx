import { highlights } from "@/components/arc-data";

export function Highlights() {
  return (
    <section aria-labelledby="why-heading" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
            Why ARC
          </p>
          <h2
            id="why-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Built different.
            <br />
            <span className="text-[#CCFF00]">By design.</span>
          </h2>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4" aria-label="ARC highlights">
          {highlights.map((h) => (
            <li
              key={h.title}
              className="rounded-2xl border border-white/5 bg-[#111] p-8 hover:border-[#CCFF00]/20 transition-colors"
            >
              <div className="w-8 h-px bg-[#CCFF00] mb-6" aria-hidden="true" />
              <h3 className="font-bold text-white text-xl mb-3">{h.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{h.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
