import { chronotypes } from "@/components/arc-data";

export function Chronotypes() {
  return (
    <section
      aria-labelledby="chronotypes-heading"
      className="py-20 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
              Your Identity
            </p>
            <h2
              id="chronotypes-heading"
              className="text-4xl sm:text-5xl font-black tracking-tighter"
            >
              Which one
              <br />
              <span className="text-[#CCFF00]">are you?</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
            Your chronotype is your body&apos;s built-in biological clock. ARC
            identifies yours in 5 minutes.
          </p>
        </div>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          aria-label="Chronotype types"
        >
          {chronotypes.map((c) => (
            <li
              key={c.name}
              className="rounded-2xl border border-white/5 bg-[#111] p-6 hover:border-[#CCFF00]/30 transition-all hover:-translate-y-0.5 group"
            >
              <div className="text-5xl mb-5" aria-hidden="true">
                {c.icon}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="font-black text-xl text-white group-hover:text-[#CCFF00] transition-colors">
                  {c.name}
                </h3>
                <span className="text-xs font-semibold tracking-wider text-[#CCFF00]/60 uppercase">
                  {c.tagline}
                </span>
              </div>
              <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
