import Image from "next/image";

const pillars = [
  {
    eyebrow: "ONE CLEAR MOVE",
    title: "Your daily protocol",
    desc: "Know exactly what to do, right now. A single focused action for each moment of your day — a live ring counts down your current window. No cluttered dashboard, no guesswork.",
    src: "/01.png",
    alt: "ARC daily protocol screen - live timeline and current biological mission",
  },
  {
    eyebrow: "NEVER CRASH AT 3PM",
    title: "Caffeine, timed right",
    desc: "See when your coffee peaks and the exact last safe time to drink it before it steals your sleep. A live decay curve shows caffeine leaving your system in real time.",
    src: "/03.png",
    alt: "ARC caffeine decay tracker screen - active caffeine mg and sleep-safe prediction",
  },
  {
    eyebrow: "ANCHOR YOUR CLOCK",
    title: "Morning light window",
    desc: "The single most powerful lever for your rhythm — get light at the right time for your chronotype, and everything downstream falls into place.",
    src: "/02.png",
    alt: "ARC morning light countdown screen - visual timer towards circadian anchor goal",
  },
  {
    eyebrow: "TUNED TO YOU",
    title: "Your AI circadian coach",
    desc: "A personal briefing every morning, based on how you actually slept, what you drank, and how your week is trending.",
    src: "/04.png",
    alt: "ARC circadian coach notifications - personalized biological wake-up triggers",
  },
  {
    eyebrow: "SEE IT WORKING",
    title: "Progress in plain language",
    desc: "Watch yourself get more in sync over time. One clear score, real proof — the deep charts are there when you want them.",
    src: "/05.png",
    alt: "ARC progress dashboard - chronotype compatibility and sleep score analytics",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 px-6 bg-[#050505] relative overflow-hidden"
    >
      {/* Decorative glows */}
      <div
        className="pointer-events-none absolute right-[-20%] top-[10%] w-[600px] h-[600px] rounded-full bg-[#CCFF00]/5 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[-20%] bottom-[10%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <header className="mb-24 text-center">
          <span className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase font-mono border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-3 py-1 rounded-full">
            THE PILLARS
          </span>
          <h2
            id="features-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-white mt-6"
          >
            Tactical features.
            <br />
            <span className="text-[#CCFF00]">Biological precision.</span>
          </h2>
        </header>

        <div className="space-y-24 lg:space-y-36">
          {pillars.map((p, index) => {
            const isOdd = index % 2 === 1;
            return (
              <div
                key={p.title}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-between ${
                  isOdd ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Text column */}
                <div className="flex-1 max-w-xl flex flex-col gap-4">
                  <span className="text-xs font-bold tracking-widest text-[#CCFF00] uppercase font-mono">
                    {p.eyebrow}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                    {p.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-base sm:text-lg">
                    {p.desc}
                  </p>
                </div>

                {/* Screenshot column */}
                <div className="flex-1 w-full max-w-[300px] sm:max-w-[320px] relative flex justify-center">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-[#CCFF00]/5 blur-3xl -z-10" />
                  <div className="w-full relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 p-2">
                    <div className="relative rounded-[2.2rem] overflow-hidden">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        width={1242}
                        height={2688}
                        className="w-full h-auto block"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
