import { plans, APP_STORE_URL } from "@/components/arc-data";

export function Pricing() {
  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest text-[#CCFF00] uppercase mb-3">
            Pricing
          </p>
          <h2
            id="pricing-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter mb-4"
          >
            Start free.
            <br />
            <span className="text-[#CCFF00]">Upgrade when ready.</span>
          </h2>
          <p className="text-zinc-500 text-sm">
            All plans include a{" "}
            <span className="text-[#CCFF00] font-semibold">
              3-day free trial
            </span>
            . Cancel anytime.
          </p>
        </div>

        <ul
          className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto"
          aria-label="Pricing plans"
        >
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col gap-5 transition-all ${plan.highlight
                ? "bg-[#CCFF00] text-black border-2 border-[#CCFF00]"
                : "bg-[#111] border border-white/5 text-white hover:border-[#CCFF00]/30"
                }`}
            >
              <div className="flex items-start justify-between">
                <h3
                  className={`font-black text-xl ${plan.highlight ? "text-black" : "text-white"}`}
                >
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className="rounded-full bg-black/20 px-3 py-0.5 text-xs font-black tracking-wide">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div>
                <span
                  className={`text-4xl font-black ${plan.highlight ? "text-black" : "text-white"}`}
                >
                  {plan.price}
                </span>
                <span
                  className={`text-sm ml-1 ${plan.highlight ? "text-black/60" : "text-zinc-500"}`}
                >
                  {plan.period}
                </span>
              </div>

              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get ARC ${plan.name} plan`}
                className={`w-full text-center rounded-xl py-3 text-sm font-black transition-all ${plan.highlight
                  ? "bg-black text-[#CCFF00] hover:bg-zinc-900"
                  : "bg-white/5 text-white hover:bg-[#CCFF00]/10 hover:text-[#CCFF00]"
                  }`}
              >
                Start Free Trial
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 bg-[#111] border border-white/5 rounded-2xl p-6 text-center max-w-2xl mx-auto flex flex-col items-center gap-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-b from-[#CCFF00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <p className="text-zinc-300 text-sm leading-relaxed">
            <strong className="text-white">Have questions or a tight budget?</strong><br />
            Whether you want to understand the science better, or you're a student experiencing financial hardship, we don't want price to be a barrier to your health.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 mt-2">
            <a
              href="mailto:pritamfinds@gmail.com"
              className="text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-white"
            >
              Email Us
            </a>
            <a
              href="https://x.com/iPritamX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#CCFF00] bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 transition-colors px-4 py-2 rounded-lg"
            >
              DM on X (@iPritamX)
            </a>
            <a
              href="https://www.instagram.com/arc.sync/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#CCFF00] bg-[#CCFF00]/10 hover:bg-[#CCFF00]/20 transition-colors px-4 py-2 rounded-lg"
            >
              DM on Insta (@arc.sync)
            </a>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-600 max-w-md mx-auto mt-8">
          Payment charged to Apple ID at purchase confirmation. Subscription
          auto-renews unless canceled 24h before end of period. Manage in App
          Store account settings.
        </p>
      </div>
    </section>
  );
}
