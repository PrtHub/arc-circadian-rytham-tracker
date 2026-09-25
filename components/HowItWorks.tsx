import { steps } from "@/components/arc-data";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
              HOW IT WORKS
            </p>
            <h2
              id="hiw-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight"
            >
              Set up once,
              <br />
              <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">then just live your day.</span>
            </h2>
          </div>
          <p className="text-(--fg-muted) text-sm max-w-sm leading-relaxed">
            Your log lives on your iPhone, not on a server, and there&apos;s no score or streak to keep up.
          </p>
        </div>

        <ol className="grid md:grid-cols-3 gap-4" aria-label="Getting started with ARC">
          {steps.map((s) => (
            <li key={s.step} className="raised-card p-6 flex flex-col gap-3">
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-(--accent)/10 border border-(--accent)/30 flex items-center justify-center text-accent text-xs font-black font-mono"
              >
                {s.step}
              </div>
              <h3 className="font-bold text-lg text-white">{s.title}</h3>
              <p className="text-(--fg-muted) text-sm leading-relaxed">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
