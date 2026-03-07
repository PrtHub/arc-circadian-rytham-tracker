const stats = [
  { value: "201+", label: "Downloads" },
  { value: "15-pt", label: "Precision Diagnosis" },
  { value: "4", label: "Chronotypes Mapped" },
  { value: "Local-First", label: "SQLite · Zero Cloud" },
  { value: "3-Day", label: "Free Trial" },
];

export function SocialProof() {
  return (
    <div
      className="border-y border-white/5 bg-[#0a0a0a] py-6 px-6"
      aria-label="Social proof"
    >
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-x-12 gap-y-4 text-center">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className="text-2xl font-black text-[#CCFF00]">{value}</span>
            <span className="text-xs text-zinc-500 tracking-wide uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
