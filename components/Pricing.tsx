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

        <p className="text-center text-xs text-zinc-600 max-w-md mx-auto mt-8">
          Payment charged to Apple ID at purchase confirmation. Subscription
          auto-renews unless canceled 24h before end of period. Manage in App
          Store account settings.
        </p>
      </div>
    </section>
  );
}
