import { AppStoreButton } from "@/components/AppStoreButton";

export function FinalCta() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="py-24 px-6 relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial from-(--accent)/10 to-transparent blur-3xl opacity-60"
      />

      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8 relative z-10">
        <p className="text-xs font-bold tracking-widest text-accent uppercase font-mono">
          START TODAY
        </p>

        <h2
          id="cta-heading"
          className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter"
        >
          Stop fighting
          <br /><span className="font-display italic font-normal text-accent text-6xl sm:text-7xl lg:text-8xl">your clock.</span>
        </h2>

        <p className="text-(--fg-muted) text-lg max-w-md">
          Find your chronotype and build a day that works with your biology.
        </p>

        <AppStoreButton size="lg" location="final_cta" />

        <p className="text-(--fg-muted) text-xs opacity-70">
          Free to download · Cancel anytime · 100% On-Device Privacy
        </p>
      </div>
    </section>
  );
}
