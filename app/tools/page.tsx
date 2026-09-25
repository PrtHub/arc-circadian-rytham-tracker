import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

const INDEX_TITLE = "Free Circadian Rhythm & Sleep Calculators";
const INDEX_DESCRIPTION =
  "Twelve free circadian tools: caffeine cutoff, nap, sleep cycle, sleep debt and sunrise calculators, a chronotype quiz, and jet lag and daylight saving planners.";

export const metadata: Metadata = {
  title: INDEX_TITLE,
  description: INDEX_DESCRIPTION,
  keywords: [
    "circadian rhythm calculators",
    "free sleep calculator",
    "caffeine half life calculator",
    "chronotype quiz",
    "sleep debt calculator",
    "jet lag planner",
    "sunlight calculator",
  ],
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: `${INDEX_TITLE} | ARC`,
    description: INDEX_DESCRIPTION,
    url: "/tools",
    type: "website",
    siteName: "ARC: Circadian Rhythm Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: `${INDEX_TITLE} | ARC`,
    description: INDEX_DESCRIPTION,
  },
};

const tools = [
  {
    title: "Caffeine Half-Life Calculator",
    description: "Find your last safe coffee for tonight's bedtime, counting what you've already drunk today and your caffeine sensitivity (4, 5.5 or 7 h half-life).",
    icon: "☕",
    href: "/tools/caffeine-calculator",
    status: "Live",
  },
  {
    title: "Nap Calculator",
    description: "Find the best time to nap from your wake time and bedtime: your likely afternoon dip, when to lie down, when to set the alarm, and whether a caffeine nap fits.",
    icon: "😴",
    href: "/tools/nap-calculator",
    status: "New",
  },
  {
    title: "Daylight Saving Time Planner",
    description: "A night-by-night plan to shift your sleep before the clocks change, with light and caffeine timing, for the US, UK, Europe, Australia and New Zealand.",
    icon: "🕰️",
    href: "/tools/daylight-saving-time-planner",
    status: "New",
  },
  {
    title: "Huberman Sleep Cocktail Builder",
    description: "Magnesium, L-theanine, apigenin and inositol: the doses Andrew Huberman has described, with timing and safety notes.",
    icon: "💊",
    href: "/tools/sleep-cocktail",
    status: "Live",
  },
  {
    title: "Jet Lag Planner",
    description: "When to seek light, avoid light, sleep and have your last coffee after a flight, shifting your body clock about an hour a day.",
    icon: "🛫",
    href: "/tools/jetlag-planner",
    status: "Live",
  },
  {
    title: "Chronotype Compatibility Quiz",
    description: "Compare two chronotypes: typical bedtime and wake gaps, shared awake hours, and practical ways to share a bedroom.",
    icon: "💞",
    href: "/tools/chronotype-compatibility",
    status: "Live",
  },
  {
    title: "Chronotype Quiz",
    description: "Are you a Lion, Bear, Wolf, or Dolphin? Eight quick questions to estimate your natural sleep and energy timing.",
    icon: "🧬",
    href: "/tools/chronotype-quiz",
    status: "Live",
  },
  {
    title: "Social Jetlag Calculator",
    description: "Measure how far your weekend sleep shifts from your weekdays, using the mid-sleep method researchers use, and see why Mondays feel rough.",
    icon: "✈️",
    href: "/tools/social-jetlag-calculator",
    status: "Live",
  },
  {
    title: "Sleep Debt Calculator",
    description: "Add up your sleep debt over the last five nights and get practical tips to recover without shifting your rhythm.",
    icon: "📉",
    href: "/tools/sleep-debt-calculator",
    status: "Live",
  },
  {
    title: "Morning Sunlight Calculator",
    description: "Today's sunrise in your city, when to step outside after waking, and for how long. ARC's light timer is 20 minutes; stay out longer under heavy cloud.",
    icon: "☀️",
    href: "/tools/sunlight-calculator",
    status: "Live",
  },
  {
    title: "Chronotype Visualizer",
    description: "Slide through the day to see an illustrative cortisol and melatonin curve for your chronotype, hour by hour.",
    icon: "📊",
    href: "/tools/chronotype-visualizer",
    status: "Live",
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Find the best times to go to bed or wake up based on roughly 90-minute sleep cycles, so your alarm is less likely to land mid-cycle.",
    icon: "⏰",
    href: "/tools/sleep-cycle-calculator",
    status: "Live",
  },
];

export default function ToolsIndex() {
  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      {/* Focused Hub Header (Left: Brand Logo, Right: Back to Home) */}
      <ContentNav backHref="/" backLabel="Home" />

      <main className="max-w-7xl mx-auto px-6 py-14 min-h-[70vh] relative">
        <header className="mb-12 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-3 inline-block font-mono border border-(--accent)/20">
            10 Free Interactive Tools
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Free Circadian Rhythm &amp; <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">Sleep Tools</span>
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
            Free calculators and quizzes, grounded in sleep and circadian research, to help you understand your own timing before you download anything.
          </p>
        </header>

        {/* Calculative Mid-Hub Callout Banner */}
        <CalculativeAppCallout
          variant="banner"
          badge="Let ARC do the math"
          title="Tired of calculating your cutoffs by hand?"
          description="ARC runs the caffeine and morning-light math for you all day: a live caffeine curve, a last-safe-coffee countdown on your widget, and a 20-minute light timer in the Dynamic Island."
          featureBullets={[
            "Last safe coffee recalculated with every drink you log",
            "A heads-up before your caffeine cutoff",
            "No account • your log stays on your iPhone",
          ]}
          location="tools_hub_banner"
        />

        {/* Tools Grid */}
        <section className="mt-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group raised-card p-8 rounded-3xl hover:border-(--accent)/40 transition-all hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-4xl">{tool.icon}</span>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-white/10 rounded-full text-accent font-mono uppercase tracking-wider">{tool.status}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors text-white tracking-tight">{tool.title}</h2>
                  <p className="text-(--fg-muted) leading-relaxed mb-6 text-sm">{tool.description}</p>
                </div>
                <div className="flex items-center gap-2 text-accent text-sm font-semibold uppercase tracking-wider group-hover:underline font-mono">
                  Open Tool
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-white/10 pt-16">
          <div className="max-w-3xl">
            <span className="text-xs font-black uppercase tracking-widest text-(--fg-muted) mb-3 block font-mono">
              The Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-black mb-6 tracking-tighter text-white">
              Why We Built Free Circadian Tools
            </h2>
            <div className="space-y-6 text-(--fg-muted) text-base sm:text-lg leading-relaxed">
              <p>
                Most health apps track your past. They tell you how poorly you slept last night or how many steps you took yesterday. But by the time you see that data, it is too late to change it. <strong className="text-white">Circadian biology</strong> is about predicting and shaping your future. It is about knowing what to do <em>right now</em> to shape tomorrow.
              </p>
              <p>
                We built these free calculators and quizzes because understanding your biological rhythm should not require a wearable or a subscription. Knowing your <strong className="text-white">chronotype</strong> (Lion, Bear, Wolf, or Dolphin) and how long <strong className="text-white">caffeine</strong> stays in your system is a good place to start.
              </p>
              <p>
                Use these tools to establish a baseline understanding of your body&apos;s internal clock. When you want the caffeine and light math done for you, one sentence a day explaining why you feel the way you do, and a day plan built around your chronotype, download <strong className="text-accent">ARC for iPhone</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
