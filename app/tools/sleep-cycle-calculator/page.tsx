import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolFaqSection,
  toolAppJsonLd,
  toolMetadata,
  type RelatedLink,
  type ToolFaq,
} from "../_components/tool-extras";
import SleepCycleCalculatorClient from "./SleepCycleCalculatorClient";

export const metadata = toolMetadata({
  slug: "sleep-cycle-calculator",
  title: "Sleep Cycle Calculator: Best Times to Sleep and Wake",
  description:
    "Find the best times to fall asleep or wake up based on roughly 90-minute sleep cycles, with 15 minutes to drift off. Less grogginess, more rested mornings.",
  keywords:
    "sleep cycle calculator, sleep calculator, bedtime calculator, 90 minute sleep cycle, what time should I go to bed, wake up refreshed",
});

const FAQS: ToolFaq[] = [
  {
    q: "How long is a sleep cycle?",
    a: "About 90 minutes on average, but cycles vary from roughly 70 to 120 minutes between people and across the night. Early cycles hold more deep sleep; later ones hold more REM sleep. That's why the times here are best estimates, not exact.",
  },
  {
    q: "What time should I go to bed if I wake up at 7 AM?",
    a: "For five cycles (7.5 hours of sleep) plus 15 minutes to fall asleep, aim for about 11:15 PM. For six cycles (9 hours), about 9:45 PM. For four cycles (6 hours), about 12:45 AM.",
  },
  {
    q: "Is it better to sleep 6 or 7.5 hours?",
    a: "7.5 hours, if you can. Most adults need 7 to 9 hours. Waking at the end of a cycle after 6 hours may feel easier than waking mid-cycle after 7, but it doesn't make up for the missing sleep over time.",
  },
  {
    q: "What if I wake up mid-cycle and feel groggy?",
    a: "Sleep inertia usually fades within 15 to 60 minutes. Get outdoor light, move around, and hold your first coffee a little if that suits you. If you regularly wake exhausted after a full night, it's worth talking to a doctor.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/sleep-inertia-elimination-protocol-guide",
    label: "The sleep inertia guide: waking up clear-headed",
  },
  {
    href: "/blog/waking-up-tired-after-8-hours-sleep-inertia-fix",
    label: "Why you wake up tired after 8 hours",
  },
  {
    href: "/guides/deep-sleep-slow-wave-optimization-guide",
    label: "Deep sleep (N3) explained",
  },
  {
    href: "/blog/sleep-cycle-app-vs-arc-smart-alarm-vs-chronotype",
    label: "Sleep Cycle app vs ARC: smart alarm or chronotype plan?",
  },
];

export default function SleepCycleCalculatorPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Sleep Cycle Calculator",
          slug: "sleep-cycle-calculator",
          description:
            "Estimate the best bedtimes and wake-up times based on roughly 90-minute sleep cycles and a 15-minute buffer to fall asleep.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <main className="py-14">
        <SleepCycleCalculatorClient />

        <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
          <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">How the Sleep Cycle Calculator Works</h2>

          <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
            <p className="leading-relaxed mb-6">
              Through the night you move through repeating cycles of light sleep, deep sleep and REM (dreaming) sleep. Each cycle lasts about 90 minutes on average. The calculator counts back (or forward) in 90-minute steps from the time you give it and adds 15 minutes, a typical time to fall asleep, so your alarm is more likely to land near the end of a cycle, when sleep is lighter.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why the times are estimates</h3>
            <p className="leading-relaxed mb-6">
              Cycles vary from about 70 to 120 minutes, differ between people, and change across the night: the first cycles hold most of your deep sleep, while REM stretches out towards morning. Stress, alcohol, caffeine and a late night all shift things too. Treat the suggested times as a good starting point, and adjust by 15 minutes either way if you still wake groggy.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-10">How much sleep you need</h3>
            <p className="leading-relaxed mb-6">
              Most adults need 7 to 9 hours a night, which is five or six cycles. Four cycles (6 hours) is fine for an occasional short night, but regularly sleeping less than you need builds sleep debt that no alarm timing can hide. If you want to see how far behind you are, try the{" "}
              <Link href="/tools/sleep-debt-calculator" className="text-accent hover:underline">sleep debt calculator</Link>.
            </p>

            <h3 className="text-2xl font-bold mb-4 text-white mt-10">If you wake up mid-cycle</h3>
            <p className="leading-relaxed mb-6">
              Waking from deep sleep can leave you groggy for 15 to 60 minutes. This is sleep inertia, and it passes. Getting about 20 minutes of outdoor light soon after waking helps you feel alert and sets up tonight&apos;s sleep timing. Never look directly at the sun.
            </p>
          </div>
        </section>

        <ToolFaqSection faqs={FAQS} />
        <RelatedReading links={RELATED} />
      </main>
      <Footer />
    </div>
  );
}
