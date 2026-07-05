import Image from "next/image";
import { AppStoreButton } from "@/components/AppStoreButton";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden pt-20 pb-10 px-6"
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-225 h-150 rounded-full opacity-10"
        style={{
          background: "radial-gradient(ellipse, #CCFF00 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-4 py-1.5 text-xs font-bold tracking-widest text-[#CCFF00] uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            KNOW YOUR TYPE
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter">
            You&apos;re not lazy.
            <br />
            You&apos;re on the <span className="text-[#CCFF00]">wrong clock.</span>
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-lg">
            Most advice treats everyone the same. ARC finds your chronotype and builds your entire day around your real biological rhythm — so focus, energy, and sleep come naturally.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <AppStoreButton size="lg" location="hero" />
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-1 text-zinc-400 hover:text-white text-sm font-bold transition-all py-3 px-4 hover:translate-y-0.5"
            >
              See how it works ↓
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 pt-2 tracking-wide font-mono uppercase">
            <span className="text-[#CCFF00] text-sm">★★★★★</span>
            <span>Loved by night owls, early birds & everyone in between.</span>
          </div>
        </div>

        {/* Right — screenshot already contains the phone mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative w-70 sm:w-85">
            <Image
              src="/01-cut.png"
              alt="ARC circadian rhythm tracker — Daily trajectory showing your personalized biological schedule"
              width={1242}
              height={2688}
              className="w-full h-auto drop-shadow-2xl"
              priority
            />
            <div
              aria-hidden="true"
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-12 blur-2xl rounded-full"
              style={{ background: "#CCFF0040" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
