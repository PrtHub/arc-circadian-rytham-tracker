import { notifications } from "@/components/arc-data";

export function Notifications() {
  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-14">
        <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
          Smart Notifications
        </p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
          Nudges that speak your biology
        </h2>
        <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
          Not generic reminders. Every alert is timed to your chronotype and written in plain language — so you know exactly why it matters.
        </p>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <div
            key={n.title}
            className="flex items-start gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 sm:p-6"
          >
            {/* iOS notification dot */}
            <div
              className="mt-1 w-3 h-3 rounded-full shrink-0"
              style={{ backgroundColor: n.color }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <p className="font-bold text-white">{n.title}</p>
                <span className="text-xs text-zinc-500 shrink-0">{n.time}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-400 leading-relaxed">{n.body}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-zinc-600 mt-8">
        All notifications are chronotype-aware and delivered at the right moment for{" "}
        <span className="text-zinc-400">your</span> schedule — not a generic template.
      </p>
    </section>
  );
}
