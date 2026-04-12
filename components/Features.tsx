import { features } from "@/components/arc-data";

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-20 px-6 bg-[#0a0a0a]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
            What You Get
          </p>
          <h2
            id="features-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Finally understand
            <br />
            <span className="text-[#CCFF00]">why you feel this way.</span>
          </h2>
        </div>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          aria-label="App features"
        >
          {features.map((f) => (
            <li
              key={f.title}
              className="rounded-2xl border border-white/5 bg-[#111] p-5 hover:border-[#CCFF00]/20 transition-colors group"
            >
              <span className="text-3xl mb-4 block" aria-hidden="true">
                {f.icon}
              </span>
              <h3 className="font-bold text-white mb-2 leading-snug group-hover:text-[#CCFF00] transition-colors">
                {f.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
