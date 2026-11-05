import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { AppStoreButton } from "@/components/AppStoreButton";
import {
  DailyScheduleData,
  SCHEDULE_WAKE_MINUTES,
  scheduleSlug,
  scheduleTimeLabel,
} from "@/lib/schedule-matrix";

const SITE_URL = "https://arccircadian.com";

export function SchedulePage({ data }: { data: DailyScheduleData }) {
  const t = data.wakeLabel;
  const canonicalUrl = `${SITE_URL}/schedules/${data.slug}`;

  // Structured Data (WebPage + FAQPage)
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        url: canonicalUrl,
        name: `Wake Up at ${t} Daily Schedule: Circadian Rhythm Routine & Timeline`,
        description: `Complete science-backed daily routine for a ${t} wake-up. 20-min sunlight anchor, 90-min delayed coffee at ${data.firstCoffee}, peak focus block, caffeine cutoff, and bedtime.`,
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Schedules", item: `${SITE_URL}/schedules` },
            { "@type": "ListItem", position: 3, name: `Wake Up at ${t}`, item: canonicalUrl },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden bg-[#070a18]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      {/* Header Navigation */}
      <ContentNav backHref="/schedules" backLabel="All Schedules" />

      <main className="max-w-5xl mx-auto px-6 py-12 relative">
        <Breadcrumbs
          items={[
            { name: "Schedules", href: "/schedules" },
            { name: `Wake at ${t}` },
          ]}
        />

        {/* Hero Section */}
        <header className="mb-10 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-3 inline-block font-mono border border-(--accent)/20">
            Circadian Schedule Matrix
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Wake Up at <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">{t}</span> Daily Schedule
          </h1>
          <p className="text-(--fg-muted) text-base sm:text-lg leading-relaxed mb-4">
            {data.narratives.heroLead}
          </p>
          <p className="text-sm text-white/70 leading-relaxed border-l-2 border-accent/60 pl-4 py-1">
            <strong>Key Circadian Milestones:</strong> 20-min sunlight anchor at <strong className="text-white">{data.morningLight}</strong> • First coffee delayed until <strong className="text-white">{data.firstCoffee}</strong> • Peak focus block from <strong className="text-white">{data.peakFocus}</strong> • Strict caffeine cutoff at <strong className="text-white">{data.caffeineCurfews[1].cutoffTime}</strong> • Target lights-out bedtime at <strong className="text-emerald-400">{data.bedtime5Cycles}</strong>.
          </p>
        </header>

        {/* Quick Wake-Time Switcher */}
        <section className="mb-10 pb-6 border-b border-white/10" aria-label="Alternative wake times">
          <p className="text-xs font-bold uppercase tracking-widest text-(--fg-muted) mb-3 font-mono">
            Jump to any wake time:
          </p>
          <div className="flex flex-wrap gap-2">
            {SCHEDULE_WAKE_MINUTES.map((m) => {
              const label = scheduleTimeLabel(m);
              const slug = scheduleSlug(m);
              const isActive = m === data.wakeMinutes;
              return (
                <Link
                  key={slug}
                  href={`/schedules/${slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-accent text-[#070a18] shadow-lg shadow-accent/20 scale-105"
                      : "bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </section>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-12">
          <div className="raised-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
            <span className="text-xs uppercase font-mono text-(--fg-muted) tracking-wider">Morning Light</span>
            <div className="text-lg sm:text-xl font-bold text-white mt-1">{data.morningLight}</div>
            <span className="text-[11px] text-white/50 mt-1">20 min outdoor lux</span>
          </div>

          <div className="raised-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
            <span className="text-xs uppercase font-mono text-(--fg-muted) tracking-wider">First Coffee</span>
            <div className="text-lg sm:text-xl font-bold text-accent mt-1">{data.firstCoffee}</div>
            <span className="text-[11px] text-white/50 mt-1">90 min post-wake</span>
          </div>

          <div className="raised-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
            <span className="text-xs uppercase font-mono text-(--fg-muted) tracking-wider">Peak Focus</span>
            <div className="text-lg sm:text-xl font-bold text-white mt-1">{data.peakFocus}</div>
            <span className="text-[11px] text-white/50 mt-1">Deep cognitive work</span>
          </div>

          <div className="raised-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
            <span className="text-xs uppercase font-mono text-(--fg-muted) tracking-wider">Afternoon Dip</span>
            <div className="text-lg sm:text-xl font-bold text-amber-300 mt-1">{data.afternoonDip}</div>
            <span className="text-[11px] text-white/50 mt-1">Walk or 20m NSDR</span>
          </div>

          <div className="raised-card p-4 sm:p-5 rounded-2xl flex flex-col justify-between col-span-2 sm:col-span-1">
            <span className="text-xs uppercase font-mono text-(--fg-muted) tracking-wider">Target Bedtime</span>
            <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">{data.bedtime5Cycles}</div>
            <span className="text-[11px] text-white/50 mt-1">5 full cycles (7.5h)</span>
          </div>
        </div>

        {/* Master Hour-by-Hour Timeline Table */}
        <section className="mb-14" aria-label="Hour by hour daily schedule">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                The {t} Master Circadian Timeline
              </h2>
              <p className="text-sm text-(--fg-muted) mt-1">
                Calibrated to endogenous cortisol, adenosine buildup, and core body temperature.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {data.events.map((event, idx) => (
              <div
                key={idx}
                className="raised-card p-5 sm:p-6 rounded-2xl border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6"
              >
                <div className="sm:w-44 shrink-0 flex items-center sm:flex-col sm:items-start justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{event.icon}</span>
                    <span className="font-mono text-base sm:text-lg font-bold text-white">
                      {event.timeStr}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-widest text-(--fg-muted) px-2 py-0.5 rounded bg-white/5">
                    {event.category}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                    {event.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-2">
                    {event.detail}
                  </p>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-(--fg-muted) leading-relaxed">
                    <strong className="text-accent font-semibold">The Biology: </strong>
                    {event.science}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive Section 1: The Awakening Window */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10">
          <span className="text-xs uppercase font-mono text-accent tracking-widest block mb-2">
            Phase 1 • 0–90 Minutes
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            The Science of Waking Up at {t}
          </h2>
          <div className="prose prose-invert max-w-none text-sm sm:text-base text-(--fg-muted) leading-relaxed space-y-4">
            {data.narratives.awakeningScience.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Deep Dive Section 2: Deep Work & Focus Architecture */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10">
          <span className="text-xs uppercase font-mono text-accent tracking-widest block mb-2">
            Phase 2 • Focus Optimization
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            Deep Work Architecture: {data.peakFocus}
          </h2>
          <div className="prose prose-invert max-w-none text-sm sm:text-base text-(--fg-muted) leading-relaxed space-y-4">
            {data.narratives.deepWorkScience.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Deep Dive Section 3: The Afternoon Dip */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10">
          <span className="text-xs uppercase font-mono text-amber-300 tracking-widest block mb-2">
            Phase 3 • Circadian Trough
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            Navigating the Afternoon Dip: {data.afternoonDip}
          </h2>
          <div className="prose prose-invert max-w-none text-sm sm:text-base text-(--fg-muted) leading-relaxed space-y-4">
            {data.narratives.dipScience.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Caffeine Curfew Comparison Matrix */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10" aria-label="Caffeine cutoffs">
          <div className="max-w-2xl mb-6">
            <span className="text-xs uppercase font-mono text-accent tracking-widest block mb-2">
              Phase 4 • Pharmacokinetics
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Caffeine Curfews for a {t} Wake-Up
            </h2>
            <div className="text-sm sm:text-base text-(--fg-muted) mt-3 leading-relaxed space-y-3">
              {data.narratives.caffeinePharmacokinetics.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Three Metabolizers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {data.caffeineCurfews.map((c) => (
              <div key={c.metabolizer} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-white">{c.metabolizer} Metabolizer</span>
                    <span className="text-xs font-mono text-accent">{c.halfLife}h Half-Life</span>
                  </div>
                  <div className="text-2xl font-black text-white mb-2">
                    {c.cutoffTime}
                  </div>
                  <p className="text-xs text-(--fg-muted) leading-relaxed">
                    {c.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-white/50">
                  Target: &lt;50 mg residual at {data.bedtime5Cycles}
                </div>
              </div>
            ))}
          </div>

          {/* Specific Beverage Table */}
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold text-white mb-3">
              Common Beverage Cutoff Times (Average Metabolizer)
            </h3>
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono uppercase text-(--fg-muted)">
                  <th className="py-3 px-3">Beverage</th>
                  <th className="py-3 px-3">Caffeine (mg)</th>
                  <th className="py-3 px-3">Clearance Hours</th>
                  <th className="py-3 px-3 text-accent font-bold">Hard Cutoff Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {data.beverageCutoffs.map((b) => (
                  <tr key={b.drink} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-semibold text-white">{b.drink}</td>
                    <td className="py-3 px-3 text-(--fg-muted)">{b.mg} mg</td>
                    <td className="py-3 px-3 text-(--fg-muted)">{b.hoursBeforeBed} hours before bed</td>
                    <td className="py-3 px-3 text-accent font-bold font-mono">{b.cutoffTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
            <strong>Need custom drink math?</strong> Calculate cold brews, pre-workout, energy drinks, and espresso on our free{" "}
            <Link href="/tools/caffeine-calculator" className="underline font-bold text-amber-200 hover:text-white">
              Caffeine Half-Life Calculator
            </Link>.
          </div>
        </section>

        {/* Meal & Nutritional Timing Protocol */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10" aria-label="Meal timing">
          <span className="text-xs uppercase font-mono text-emerald-400 tracking-widest block mb-2">
            Metabolic Chronobiology
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Meal &amp; Hydration Windows for a {t} Wake-Up
          </h2>
          <p className="text-sm text-(--fg-muted) mb-6 max-w-3xl leading-relaxed">
            Nutrient timing serves as a potent secondary peripheral zeitgeber (time-giver) for your liver and muscle clocks. Synchronizing caloric intake with your {t} wake time prevents reactive hypoglycemia and safeguards deep sleep.
          </p>

          <div className="space-y-4">
            {data.mealWindows.map((m, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col md:flex-row md:items-start gap-4">
                <div className="md:w-56 shrink-0">
                  <div className="font-mono text-base font-bold text-accent">{m.timeStr}</div>
                  <div className="text-sm font-bold text-white mt-0.5">{m.name}</div>
                </div>
                <div className="flex-1 space-y-2 text-xs sm:text-sm">
                  <p className="text-white/90">
                    <strong className="text-white font-semibold">Goal: </strong>
                    {m.primaryGoal}
                  </p>
                  <p className="text-(--fg-muted)">
                    <strong className="text-white/80 font-semibold">Recommended Macros: </strong>
                    {m.macronutrients}
                  </p>
                  <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/60 leading-relaxed">
                    <strong className="text-accent/90">Circadian Impact: </strong>
                    {m.circadianImpact}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive Section 5: The Evening Wind-Down */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10">
          <span className="text-xs uppercase font-mono text-emerald-400 tracking-widest block mb-2">
            Phase 5 • Night Preparation
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            The 3-2-1 Wind-Down &amp; Core Temperature Cooling
          </h2>
          <div className="prose prose-invert max-w-none text-sm sm:text-base text-(--fg-muted) leading-relaxed space-y-4">
            {data.narratives.eveningWindDownScience.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </section>

        {/* Chronotype Realities Box */}
        <section className="mb-14 raised-card p-6 sm:p-10 rounded-3xl border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            How Chronotypes Experience Waking at {t}
          </h2>
          <p className="text-sm text-(--fg-muted) mb-6">
            The exact same {t} alarm feels completely different depending on your internal clock genes (PER3, CLOCK).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🦁</span>
                  <span className="font-bold text-white text-base">Lion (Early Chronotype)</span>
                </div>
                <p className="text-sm text-(--fg-muted) leading-relaxed">
                  {data.chronotypeNotes.lion}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <Link href="/chronotype/lion" className="text-xs font-bold text-accent hover:underline">
                  View Lion 24-Hour Schedule →
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🐻</span>
                  <span className="font-bold text-white text-base">Bear (Solar Chronotype)</span>
                </div>
                <p className="text-sm text-(--fg-muted) leading-relaxed">
                  {data.chronotypeNotes.bear}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <Link href="/chronotype/bear" className="text-xs font-bold text-accent hover:underline">
                  View Bear 24-Hour Schedule →
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🐺</span>
                  <span className="font-bold text-white text-base">Wolf (Night Owl)</span>
                </div>
                <p className="text-sm text-(--fg-muted) leading-relaxed">
                  {data.chronotypeNotes.wolf}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <Link href="/chronotype/wolf" className="text-xs font-bold text-accent hover:underline">
                  View Wolf 24-Hour Schedule →
                </Link>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🐬</span>
                  <span className="font-bold text-white text-base">Dolphin (Light Sleeper)</span>
                </div>
                <p className="text-sm text-(--fg-muted) leading-relaxed">
                  {data.chronotypeNotes.dolphin}
                </p>
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <Link href="/chronotype/dolphin" className="text-xs font-bold text-accent hover:underline">
                  View Dolphin 24-Hour Schedule →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/tools/chronotype-quiz"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline"
            >
              Not sure of your chronotype? Take the free 8-question Chronotype Quiz →
            </Link>
          </div>
        </section>

        {/* Edge Cases: Social Jetlag & Seasonal Dark Mornings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          <div className="raised-card p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              The Weekend Trap (Social Jetlag)
            </h3>
            <p className="text-sm text-(--fg-muted) leading-relaxed mb-4">
              {data.narratives.socialJetlagStrategy}
            </p>
            <Link
              href="/tools/social-jetlag-calculator"
              className="text-xs font-bold text-accent hover:underline"
            >
              Check your weekend drift with the Social Jetlag Calculator →
            </Link>
          </div>

          <div className="raised-card p-6 sm:p-8 rounded-3xl border border-white/10">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3">
              Dark Morning &amp; Winter Protocol
            </h3>
            <p className="text-sm text-(--fg-muted) leading-relaxed mb-4">
              {data.narratives.seasonalLightStrategy}
            </p>
            <Link
              href="/tools/sunlight-calculator"
              className="text-xs font-bold text-accent hover:underline"
            >
              Calculate your morning lux needs with the Sunlight Calculator →
            </Link>
          </div>
        </div>

        {/* Gradual Transition Section */}
        <section className="mb-14 raised-card p-6 sm:p-8 rounded-3xl border border-white/10">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
            How to Shift to a {t} Wake Time
          </h3>
          <p className="text-sm text-(--fg-muted) leading-relaxed">
            {data.narratives.gradualTransitionPlan}
          </p>
        </section>

        {/* Reciprocal Bedtime Link */}
        <section className="mb-14 p-6 rounded-3xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white">Looking strictly for sleep cycle bedtimes?</h3>
            <p className="text-sm text-(--fg-muted)">
              See the 90-minute sleep cycle calculation table for waking up at {t}.
            </p>
          </div>
          <Link
            href={`/bedtime/${data.slug}`}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm whitespace-nowrap transition-colors"
          >
            View Bedtimes for {t} →
          </Link>
        </section>

        {/* Extended FAQs */}
        <section className="mb-14">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-6">
            Frequently Asked Questions: {t} Routine
          </h2>
          <div className="space-y-4">
            {data.faqs.map((f, i) => (
              <div key={i} className="raised-card p-6 rounded-2xl border border-white/5">
                <h3 className="text-base sm:text-lg font-bold text-white mb-2">{f.q}</h3>
                <p className="text-sm sm:text-base text-(--fg-muted) leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Clinical Research Citations */}
        <section className="mb-14 raised-card p-6 sm:p-8 rounded-3xl border border-white/10" aria-label="Scientific references">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-accent text-sm font-mono uppercase tracking-widest font-bold">Scientific Validation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-4">
            Peer-Reviewed Clinical Literature &amp; Chronobiology Citations
          </h2>
          <p className="text-xs sm:text-sm text-(--fg-muted) mb-6 max-w-3xl leading-relaxed">
            Every timeline milestone, caffeine clearance window, and light protocol for this {t} schedule is built strictly upon published clinical trials and established chronobiological models.
          </p>
          <div className="space-y-3">
            {data.citations.map((c, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs sm:text-sm">
                <div className="font-semibold text-white/90">
                  {c.authors} ({c.year}). &ldquo;{c.title}.&rdquo; <span className="italic text-(--fg-muted)">{c.journal}</span>.
                </div>
                <div className="mt-1 text-xs text-white/60">
                  <strong className="text-accent/90">Clinical Takeaway: </strong>
                  {c.finding}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clock-Time Fatigue Diagnostics Interlinks */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-white tracking-tight mb-2">
            Diagnose Your Daytime Fatigue on a {t} Schedule
          </h2>
          <p className="text-sm text-(--fg-muted) mb-6">
            If you wake at {t} but still suffer from energy crashes, diagnose your exact biological bottleneck:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/blog/why-am-i-tired-at-10am" className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xs font-mono text-accent font-bold">10:00 AM Crash</span>
              <h4 className="text-sm font-bold text-white mt-1">Why Am I Tired at 10 AM?</h4>
              <p className="text-xs text-(--fg-muted) mt-1.5 leading-relaxed">
                Sleep inertia unmasked by early coffee during your natural Cortisol Awakening Response.
              </p>
            </Link>

            <Link href="/blog/why-do-i-crash-at-11am" className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xs font-mono text-amber-300 font-bold">11:00 AM Drop</span>
              <h4 className="text-sm font-bold text-white mt-1">Why Do I Crash at 11 AM?</h4>
              <p className="text-xs text-(--fg-muted) mt-1.5 leading-relaxed">
                Reactive hypoglycemia and the Kleitman 90-minute BRAC ultradian focus trough.
              </p>
            </Link>

            <Link href="/blog/why-am-i-so-tired-at-1pm" className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xs font-mono text-rose-300 font-bold">1:00 PM Slump</span>
              <h4 className="text-sm font-bold text-white mt-1">Why Am I Tired at 1 PM?</h4>
              <p className="text-xs text-(--fg-muted) mt-1.5 leading-relaxed">
                The Borbély Two-Process Model post-prandial drop and core body temperature dip.
              </p>
            </Link>

            <Link href="/blog/why-am-i-sleepy-at-5pm" className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xs font-mono text-purple-300 font-bold">5:00 PM Lull</span>
              <h4 className="text-sm font-bold text-white mt-1">Why Am I Sleepy at 5 PM?</h4>
              <p className="text-xs text-(--fg-muted) mt-1.5 leading-relaxed">
                Evening cortisol cliff unmasking cumulative daytime sleep debt on the commute home.
              </p>
            </Link>

            <Link href="/blog/tired-all-day-wired-at-night-11pm" className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xs font-mono text-cyan-300 font-bold">11:00 PM Insomnia</span>
              <h4 className="text-sm font-bold text-white mt-1">Tired All Day, Wired at 11 PM</h4>
              <p className="text-xs text-(--fg-muted) mt-1.5 leading-relaxed">
                Dr. Dale Edgar&apos;s Wake Maintenance Zone and circadian phase delay from late screens.
              </p>
            </Link>

            <Link href="/blog/waking-up-at-4am-and-cant-fall-back-asleep" className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xs font-mono text-emerald-300 font-bold">4:00 AM Awakening</span>
              <h4 className="text-sm font-bold text-white mt-1">Waking Up at 4 AM Early</h4>
              <p className="text-xs text-(--fg-muted) mt-1.5 leading-relaxed">
                Pre-dawn HPA axis cortisol surge, REM sleep fragility, and residual caffeine rebound.
              </p>
            </Link>
          </div>
        </section>

        {/* Free Circadian Tools Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-white tracking-tight mb-4">
            Free Circadian Calculators &amp; Protocols
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link href="/tools/caffeine-calculator" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">☕</span>
              <h4 className="text-sm font-bold text-white mt-2">Caffeine Cutoff</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Live decay curve from your bedtime.</p>
            </Link>

            <Link href="/tools/chronotype-quiz" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">🦁</span>
              <h4 className="text-sm font-bold text-white mt-2">Chronotype Quiz</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Lion, Bear, Wolf, or Dolphin in 2 min.</p>
            </Link>

            <Link href="/tools/sunlight-calculator" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">☀️</span>
              <h4 className="text-sm font-bold text-white mt-2">Sunlight Calculator</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Outdoor lux target for today.</p>
            </Link>

            <Link href="/tools/nap-calculator" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">😴</span>
              <h4 className="text-sm font-bold text-white mt-2">Nap Calculator</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Power nap timing without sleep inertia.</p>
            </Link>
          </div>
        </section>

        {/* In-Article App Store CTA */}
        <section className="mb-14 raised-card p-8 sm:p-12 rounded-3xl border border-(--accent)/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-(--accent)/5 pointer-events-none -z-10" />
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            Stop Guessing Your Routine. Let ARC Map Your Day.
          </h2>
          <p className="text-sm sm:text-base text-(--fg-muted) max-w-xl mx-auto mb-6 leading-relaxed">
            ARC runs on your iPhone with no account, no wearable, and no sleep scores. It looks up your real local sunrise for a 20-minute Live Activity light timer, recalculates your caffeine cutoff with every cup you log, and tracks your afternoon crashes.
          </p>
          <div className="flex justify-center">
            <AppStoreButton location="schedules_page" />
          </div>
          <p className="text-xs text-white/40 mt-3">Free setup • Cancel anytime in the App Store</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
