const stats = [
  { icon: "📉", value: "3.5 → 1.0", label: "Afternoon Crashes / wk", note: "Measured over 28 days" },
  { icon: "🧬", value: "22-Point", label: "Biological Diagnostic", note: "Deep chronotype analysis" },
  { icon: "🔒", value: "100%", label: "Local On-Device SQLite", note: "Zero GPS or ad trackers" },
  { icon: "⏱️", value: "0", label: "Wearables Required", note: "Runs via iPhone & Dynamic Island" },
  { icon: "☀️", value: "4", label: "Chronotypes Mapped", note: "Lion, Bear, Wolf, Dolphin" },
];

export function SocialProof() {
  return (
    <section
      className="py-10 px-6 relative"
      aria-label="Social proof and biological benchmarks"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {stats.map(({ icon, value, label, note }) => (
          <div
            key={label}
            className="raised-card p-4 rounded-2xl flex flex-col justify-between text-left hover:border-[var(--accent)]/40 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{icon}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-black text-white group-hover:text-[var(--accent)] font-sans tracking-tight block transition-colors">
                {value}
              </span>
              <span className="text-xs font-bold text-zinc-300 block mt-1 font-mono uppercase tracking-tight leading-tight">
                {label}
              </span>
              <span className="text-[10px] text-[var(--fg-muted)] block mt-0.5 font-mono">
                {note}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
