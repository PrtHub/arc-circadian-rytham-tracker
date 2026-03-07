import Image from "next/image";
import { steps } from "@/components/arc-data";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="hiw-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Steps */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
            The Process
          </p>
          <h2
            id="hiw-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter mb-12"
          >
            Three steps to your<br />
            <span className="text-[#CCFF00]">Perfect Day.</span>
          </h2>

          <ol className="relative space-y-10" aria-label="How ARC works">
            {steps.map((s, i) => (
              <li key={s.step} className="relative pl-16">
                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="absolute left-[1.6rem] top-10 w-px h-14 bg-linear-to-b from-[#CCFF00]/40 to-transparent"
                  />
                )}
                <div
                  aria-hidden="true"
                  className="absolute left-0 top-0 w-10 h-10 rounded-xl bg-[#CCFF00]/10 border border-[#CCFF00]/30 flex items-center justify-center text-[#CCFF00] text-xs font-black"
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-lg text-white mb-1">{s.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Screenshot pair */}
        <div className="flex gap-4 justify-center">
          {(["/03.png", "/07.png"] as const).map((src, i) => (
            <div
              key={src}
              className="w-40 sm:w-45"
              style={{
                transform: i === 0 ? "rotate(-3deg)" : "rotate(3deg) translateY(20px)",
              }}
            >
              <Image
                src={src}
                alt={
                  i === 0
                    ? "ARC daily trajectory timeline showing personalized schedule"
                    : "ARC optimized day schedule revealed"
                }
                width={1242}
                height={2688}
                className="w-full h-auto rounded-2xl shadow-2xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
