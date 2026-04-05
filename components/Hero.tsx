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
          <div className="inline-flex items-center gap-2 rounded-full border border-[#CCFF00]/30 bg-[#CCFF00]/5 px-4 py-1.5 text-xs font-semibold tracking-widest text-[#CCFF00] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#CCFF00] animate-pulse" />
            iOS App · Science-Backed
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter">
            Stop Fighting
            <br />
            Your <span className="text-[#CCFF00]">Biology</span>
          </h1>

          <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
            ARC maps your <strong className="text-white">Perfect Day</strong>{" "}
            using chronobiology. Discover your chronotype, find your Peak Focus
            Windows, and unlock performance that lasts.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <AppStoreButton size="lg" />
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 px-8 py-4 text-sm font-semibold text-zinc-300 hover:bg-white/5 hover:text-white transition-all"
            >
              See How It Works
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex items-center gap-6 text-sm text-zinc-500 pt-2">
            <span className="flex items-center gap-1.5">
              <span className="text-[#CCFF00] font-bold">201+</span> downloads
            </span>
            <span className="w-px h-4 bg-zinc-800" />
            <span className="flex items-center gap-1.5">
              <span className="text-[#CCFF00] font-bold">Annual</span> free trial
            </span>
            <span className="w-px h-4 bg-zinc-800" />
            <span className="flex items-center gap-1.5">
              <span className="text-[#CCFF00] font-bold">Local-first</span>{" "}
              privacy
            </span>
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
