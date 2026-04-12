import { audience } from "@/components/arc-data";

export function Audience() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="py-20 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
            Sound Familiar?
          </p>
          <h2
            id="audience-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Built for people who are
            <br />
            <span className="text-[#CCFF00]">done guessing.</span>
          </h2>
        </div>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Target audience"
        >
          {audience.map((a) => (
            <li
              key={a.title}
              className="rounded-2xl border border-white/5 bg-[#111] p-6 hover:border-[#CCFF00]/20 transition-colors"
            >
              <span className="text-3xl mb-4 block" aria-hidden="true">
                {a.icon}
              </span>
              <h3 className="font-bold text-white mb-2">{a.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{a.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
