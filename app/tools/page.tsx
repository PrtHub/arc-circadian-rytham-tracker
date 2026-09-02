import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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
    <div className="text-white min-h-screen">
      <Nav />
      <main className="max-w-4xl mx-auto px-6 py-20 min-h-[70vh]">
        <header className="mb-16">
          <p className="text-[var(--accent)] font-bold tracking-widest text-xs uppercase mb-4 font-mono">Free Resources</p>
          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-6">
            Circadian <span className="font-display italic font-normal text-[var(--accent)] text-6xl sm:text-7xl">Tools.</span>
          </h1>
          <p className="text-[var(--fg-muted)] text-lg max-w-xl">
            Calculators and assessments to help you understand your biology before you even download the app.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link 
              key={tool.href} 
              href={tool.href}
              className="group raised-card p-8 hover:border-[var(--accent)]/40 transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">{tool.icon}</span>
                <span className="text-xs font-bold px-2.5 py-1 bg-white/10 rounded-full text-[var(--accent)] font-mono">{tool.status}</span>
              </div>
              <h2 className="text-2xl font-bold mb-3 group-hover:text-[var(--accent)] transition-colors text-white">{tool.title}</h2>
              <p className="text-[var(--fg-muted)] leading-relaxed mb-6 flex-1 text-sm">{tool.description}</p>
              <div className="text-[var(--accent)] text-sm font-bold uppercase tracking-wider group-hover:underline font-mono">
                Open Tool →
              </div>
            </Link>
          ))}
        </div>

        <section className="mt-20 border-t border-white/10 pt-16">
          <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">Why We Built Free Circadian Tools</h2>
          <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
            <p className="mb-6">
              Most health apps track your past. They tell you how poorly you slept last night or how many steps you took yesterday. But by the time you see that data, it's too late to change it. <strong className="text-white">Circadian biology</strong> is about predicting and shaping your future. It's about knowing what to do *right now* to guarantee a better tomorrow.
            </p>
            <p className="mb-6">
              We built these free calculators and quizzes because understanding your biological rhythm shouldn't require a wearable or a subscription. Knowing your genetic <strong className="text-white">chronotype</strong> (whether you are a Lion, Bear, Wolf, or Dolphin) and understanding the <strong className="text-white">caffeine half-life</strong> in your bloodstream are foundational concepts of human performance. 
            </p>
            <p>
              Use these tools to get a baseline understanding of your body's internal clock. When you are ready to automate these calculations and receive a personalized daily protocol, download the <strong className="text-[var(--accent)]">ARC app</strong>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
