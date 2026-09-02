import { notifications } from "@/components/arc-data";

export function Notifications() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
          Smart Notifications
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Nudges that speak your biology
        </h2>
        <p className="mt-4 text-(--fg-muted) max-w-xl mx-auto">
          Not generic reminders. Every alert is timed to your chronotype and written in plain language — so you know exactly why it matters.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.title}
            className="flex items-start gap-5 raised-card p-5 sm:p-6"
          >
            {/* iOS notification dot */}
            <div
              className="mt-1 w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: n.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="font-bold text-white">{n.title}</p>
                <span className="text-xs text-[var(--fg-muted)] shrink-0 font-mono">{n.time}</span>
              </div>
              <p className="mt-1 text-sm text-[var(--fg-muted)] leading-relaxed">{n.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-[var(--fg-muted)] mt-8">
        All notifications are chronotype-aware and delivered at the right moment for{" "}
        <span className="text-white">your</span> schedule — not a generic template.
      </p>
    </section>
  );
}
