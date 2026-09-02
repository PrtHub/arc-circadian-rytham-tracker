"use client";

import { plans, APP_STORE_URL } from "@/components/arc-data";
import mixpanel from "mixpanel-browser";

export function Pricing() {
  const handlePlanClick = (planName: string) => {
    try {
      mixpanel.track("App Store Button Clicked", {
        location: "pricing_tier",
        plan: planName,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
            PRICING
          </p>
          <h2
            id="pricing-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter mb-4"
          >
            Start syncing
            <br />
            <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">today.</span>
          </h2>
          <p className="text-(--fg-muted) text-sm">
            Subscription auto-renews, cancel anytime. Managed through the App Store.
          </p>
        </div>

        <ul
          className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto"
          aria-label="Pricing plans"
        >
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={`p-8 flex flex-col gap-6 transition-all rounded-3xl ${
                plan.highlight
                  ? "raised-card border-2 border-accent text-white shadow-[0_12px_35px_rgba(0,0,0,0.4)] relative overflow-hidden"
                  : "raised-card text-white hover:border-(--accent)/40"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-(--accent) to-transparent" />
              )}
              <div className="flex items-start justify-between">
                <h3 className="font-black text-xl text-white">
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className="rounded-full bg-accent text-black px-3 py-1 text-xs font-black tracking-wide font-mono uppercase shadow-sm">
                    {plan.badge}
                  </span>
                )}
              </div>

              <div>
                <span className={`text-4xl font-black ${plan.highlight ? "text-accent font-mono" : "text-white"}`}>
                  {plan.price}
                </span>
                <span className="text-sm ml-1 text-(--fg-muted)">
                  {plan.period}
                </span>
                {plan.note && (
                  <p className="text-xs mt-1 text-(--fg-muted)">
                    {plan.note}
                  </p>
                )}
              </div>

              <a
                href={APP_STORE_URL}
                onClick={() => handlePlanClick(plan.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get ARC ${plan.name} plan`}
                className={`w-full text-center rounded-2xl py-4 text-sm font-black transition-all font-mono ${
                  plan.highlight
                    ? "bg-accent text-black hover:brightness-110 hover:scale-[1.02] shadow-lg active:scale-95"
                    : "sunken-card text-white hover:border-(--accent)/50 hover:text-accent"
                }`}
              >
                Get Instant Access
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-12 raised-card p-6 text-center max-w-2xl mx-auto flex flex-col items-center gap-3 relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-b from-(--accent)/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <p className="text-(--fg) text-sm leading-relaxed">
            <strong className="text-white">
              Have questions or a tight budget?
            </strong>
            <br />
            Whether you want to understand the science better, or you&apos;re a
            student experiencing financial hardship, we don&apos;t want price to
            be a barrier to your health.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3 mt-2">
            <a
              href="mailto:pritamfinds@gmail.com"
              className="text-xs font-bold bg-white/10 hover:bg-white/20 transition-colors px-4 py-2 rounded-lg text-white font-mono"
            >
              Email Us
            </a>
            <a
              href="https://x.com/iPritamX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-accent bg-(--accent)/10 hover:bg-(--accent)/20 transition-colors px-4 py-2 rounded-lg font-mono"
            >
              DM on X (@iPritamX)
            </a>
            <a
              href="https://www.instagram.com/arc.sync/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-accent bg-(--accent)/10 hover:bg-(--accent)/20 transition-colors px-4 py-2 rounded-lg font-mono"
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
