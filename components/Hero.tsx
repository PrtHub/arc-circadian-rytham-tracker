import { AppStoreButton } from "@/components/AppStoreButton";
import { HeroMockup } from "@/components/HeroMockup";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden pt-12 sm:pt-16 pb-20 px-6"
    >
      {/* Background ambient solar glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[720px] h-[480px] rounded-full opacity-25 blur-[150px]"
        style={{
          background: "radial-gradient(ellipse, var(--accent) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Focused Copy & Value Proposition */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-(--accent)/30 bg-(--accent)/10 px-3.5 py-1 text-xs font-bold tracking-widest text-accent uppercase font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
            ARC 2.0 · LIVING LIGHT
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.06] tracking-tight text-white">
            You&apos;re not lazy.
            <br />
            You&apos;re on the{" "}
            <span className="font-display italic font-normal text-accent text-4xl sm:text-5xl lg:text-[62px]">
              wrong clock.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-(--fg-muted) leading-relaxed max-w-lg">
            ARC explains why you feel tired right now, gives you the one thing worth doing about it,
            and proves the answer over weeks by halving your afternoon crashes.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto pt-2">
            <AppStoreButton size="lg" location="hero" />
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-1.5 text-(--fg-muted) hover:text-white text-sm font-bold font-mono transition-all py-3.5 px-5 rounded-full border border-white/10 hover:bg-white/5"
            >
              See how it works ↓
            </a>
          </div>

          {/* Trust Signals */}
          <div className="flex items-center gap-2.5 text-xs font-bold text-(--fg-muted) pt-1 font-mono uppercase tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>100% On-Device Privacy · No Account · No Wearables Required</span>
          </div>
        </div>

        {/* Right Column: Authentic ARC Living Light Device Screen */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end select-none">
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}
