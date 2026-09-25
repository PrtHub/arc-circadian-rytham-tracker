import { AppStoreButton } from "@/components/AppStoreButton";

interface CalculativeAppCalloutProps {
  badge?: string;
  title: string;
  description: string;
  featureBullets?: string[];
  location: string;
  variant?: "card" | "banner";
}

export function CalculativeAppCallout({
  badge = "ARC 2.0 on iOS",
  title,
  description,
  featureBullets = [
    "Last safe coffee, recalculated with every cup",
    "20-minute light timer from your real sunrise",
    "No account. Your log stays on your iPhone",
  ],
  location,
  variant = "card",
}: CalculativeAppCalloutProps) {
  if (variant === "banner") {
    return (
      <aside
        aria-label="Download ARC app"
        className="my-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0c1228] via-[#090d1e] to-[#060914] border border-accent/25 relative overflow-hidden shadow-2xl shadow-black/50"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest font-mono border border-accent/20 mb-3 inline-block">
              {badge}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
              {title}
            </h3>
            <p className="text-sm sm:text-base text-(--fg-muted) leading-relaxed mb-4">
              {description}
            </p>
            <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
              {featureBullets.map((bullet, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-accent">✓</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 flex flex-col items-start sm:items-center gap-3">
            <AppStoreButton size="lg" location={location} />
            <span className="text-[11px] text-(--fg-muted) font-mono">
              7-day free trial on annual · iOS 16.4+
            </span>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="Download ARC app"
      className="p-6 rounded-3xl bg-gradient-to-br from-[#0d142c] via-[#080d1e] to-[#050813] border border-accent/25 relative overflow-hidden shadow-xl shadow-black/40"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="relative z-10">
        <span className="px-2.5 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest font-mono border border-accent/20 mb-3 inline-block">
          {badge}
        </span>
        <h3 className="text-lg font-black text-white tracking-tight mb-2 leading-snug">
          {title}
        </h3>
        <p className="text-xs text-(--fg-muted) leading-relaxed mb-4">
          {description}
        </p>

        <ul className="space-y-1.5 text-xs text-zinc-300 font-mono mb-5">
          {featureBullets.map((bullet, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="text-accent text-[11px]">✓</span>
              <span className="text-[11px]">{bullet}</span>
            </li>
          ))}
        </ul>

        <AppStoreButton location={location} />

        <p className="mt-3 pt-3 border-t border-white/5 text-[10px] text-(--fg-muted) font-mono">
          iPhone · iOS 16.4+ · 7-day free trial on annual
        </p>
      </div>
    </aside>
  );
}
