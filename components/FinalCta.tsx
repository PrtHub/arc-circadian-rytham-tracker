import { AppStoreButton } from "@/components/AppStoreButton";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(204,255,0,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
        <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase">
          Start Today
        </p>

        <h2
          id="cta-heading"
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter"
        >
          Your biology has
          <br />a <span className="text-[#CCFF00]">schedule.</span>
        </h2>

        <p className="text-zinc-400 text-lg max-w-md">
          Stop guessing when to focus, rest, and recharge. ARC shows you exactly
          when — backed by science.
        </p>

        <AppStoreButton size="lg" />

        <p className="text-zinc-600 text-xs">
          Free to download · 3-day Pro trial · No credit card needed
        </p>
      </div>
    </section>
  );
}
