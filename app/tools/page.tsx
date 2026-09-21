import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

export const metadata: Metadata = {
  title: "Free Circadian Rhythm & Sleep Calculators | ARC 2.0",
  description:
    "Explore 10+ free, science-backed circadian rhythm calculators: dynamic caffeine cutoff, chronotype quiz, sleep debt, sunlight window, and jet lag recovery planner.",
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
    title: "Free Circadian Rhythm & Sleep Calculators | ARC 2.0",
    description:
      "Calculate your caffeine cutoff, discover your chronotype, analyze sleep cycles, and plan jet lag shifts with free science-backed tools.",
    url: "https://arcapp.sbs/tools",
  },
};

const tools = [
  {
    title: "Caffeine Half-Life Calculator",
    description: "Find out exactly when you need to stop drinking coffee to protect your deep sleep. Calculates active milligrams based on standard metabolic decay.",
    icon: "☕",
    href: "/tools/caffeine-calculator",
    status: "Live",
  },
  {
    title: "Huberman Sleep Cocktail Builder",
    description: "Optimize dosage, safety, and timings of Stanford's recommended sleep compounds based on your specific nighttime struggles.",
    icon: "💊",
    href: "/tools/sleep-cocktail",
    status: "Live",
  },
  {
    title: "Circadian Jetlag Planner",
    description: "Shift your circadian rhythm. Generate a personalized 3-day phase advance/delay schedule based on origin and destination offsets.",
    icon: "🛫",
    href: "/tools/jetlag-planner",
    status: "Live",
  },
  {
    title: "Chronotype Compatibility Quiz",
    description: "Map sleep schedule compatibility with your partner. Discover alert/sleep overlap graphs and cohabitation adjustments.",
    icon: "💞",
    href: "/tools/chronotype-compatibility",
    status: "Live",
  },
  {
    title: "Chronotype Quiz",
    description: "Are you a Lion, Bear, Wolf, or Dolphin? Take this quick 2-minute assessment to discover your biological sleep preference.",
    icon: "🧬",
    href: "/tools/chronotype-quiz",
    status: "Live",
  },
  {
    title: "Social Jetlag Calculator",
    description: "Calculate how many time zones you are biologically flying every weekend by sleeping in, and see the impact on your Monday morning.",
    icon: "✈️",
    href: "/tools/social-jetlag-calculator",
    status: "Live",
  },
  {
    title: "Sleep Debt Calculator",
    description: "Calculate your cumulative sleep debt over the last 5 days and get advice on how to recover safely without ruining your rhythm.",
    icon: "📉",
    href: "/tools/sleep-debt-calculator",
    status: "Live",
  },
  {
    title: "Sunlight Window Calculator",
    description: "Calculate exactly how many minutes you need to stand outside based on today's weather to reset your master clock.",
    icon: "☀️",
    href: "/tools/sunlight-calculator",
    status: "Live",
  },
  {
    title: "Chronotype Visualizer",
    description: "Slide through the day to see how your master hormones (cortisol and melatonin) fluctuate based on your chronotype.",
    icon: "📊",
    href: "/tools/chronotype-visualizer",
    status: "Live",
  },
  {
    title: "Sleep Cycle Calculator",
    description: "Calculate the exact times to go to bed or wake up based on 90-minute sleep cycles. Banish morning grogginess and sleep in sync with your brain.",
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
            10+ Free Interactive Calculators
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Circadian <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">Tools</span>.
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
            Free science-backed calculators and assessments to help you understand and calculate your biology before you even download the app.
          </p>
        </header>

        {/* Calculative Mid-Hub Callout Banner */}
        <CalculativeAppCallout
          variant="banner"
          badge="Automate Calculations"
          title="Tired of calculating your biological cutoffs manually?"
          description="ARC puts these 10+ calculators on autopilot with real-time iOS Lock Screen widgets, automated countdown rings, and dynamic caffeine decay curves."
          featureBullets={[
            "Live Lock Screen widget showing current biological phase",
            "Automatic notification 30 mins before your caffeine cutoff",
            "Zero account creation • 100% private SQLite storage",
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
                Most health apps track your past. They tell you how poorly you slept last night or how many steps you took yesterday. But by the time you see that data, it is too late to change it. <strong className="text-white">Circadian biology</strong> is about predicting and shaping your future. It is about knowing what to do *right now* to guarantee a better tomorrow.
              </p>
              <p>
                We built these free calculators and quizzes because understanding your biological rhythm should not require a wearable or a subscription. Knowing your genetic <strong className="text-white">chronotype</strong> (Lion, Bear, Wolf, or Dolphin) and understanding the <strong className="text-white">caffeine half-life decay</strong> in your bloodstream are foundational rights of human health.
              </p>
              <p>
                Use these tools to establish a baseline understanding of your body&apos;s internal clock. When you are ready to automate these calculations and follow a live daily trajectory on your lock screen, download the <strong className="text-accent">ARC app on iOS</strong>.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
