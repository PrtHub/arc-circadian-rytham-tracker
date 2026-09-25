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
import DaylightSavingPlannerClient from "./DaylightSavingPlannerClient";

export const metadata = toolMetadata({
  slug: "daylight-saving-time-planner",
  title: "Daylight Saving Time Sleep Planner",
  description:
    "A night-by-night plan to shift your sleep before the clocks change: bedtimes, wake times, and light and caffeine timing for the US, UK, EU, Australia and NZ.",
  keywords:
    "daylight saving time sleep, how to adjust to daylight saving time, clocks go back sleep, clocks go forward sleep, dst sleep schedule",
});

const FAQS: ToolFaq[] = [
  {
    q: "When do the clocks change?",
    a: "New Zealand moves forward on Sunday 27 September 2026 and back on Sunday 4 April 2027. Australia (NSW, Victoria, ACT, Tasmania and South Australia) moves forward on Sunday 4 October 2026 and back on Sunday 4 April 2027. The UK and Europe go back on Sunday 25 October 2026 and forward on Sunday 28 March 2027. The US and Canada go back on Sunday 1 November 2026 and forward on Sunday 14 March 2027. The planner above always works out the next change for your region.",
  },
  {
    q: "How do I adjust to the clocks going back?",
    a: "For a few nights beforehand, go to bed and get up 15 to 20 minutes later each day, get outside in the late afternoon or evening, and keep the early morning dim until you get up. After the change, keep your usual wake time on the new clock and get morning light soon after waking.",
  },
  {
    q: "How do I adjust to the clocks going forward?",
    a: "The spring change is usually harder because you lose an hour. For a few nights beforehand, go to bed and get up 15 to 20 minutes earlier each day, get about 20 minutes of outdoor light soon after waking, and dim screens and lights in the evening. The American Academy of Sleep Medicine recommends this gradual approach.",
  },
  {
    q: "How long does it take to adjust to daylight saving time?",
    a: "Most people's body clock moves by roughly an hour a day at most, and many take a few days to a week to feel fully settled, especially after the spring change. Shifting gradually beforehand and keeping a steady wake time afterwards shortens that.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/morning-sunlight-lux-protocol-guide",
    label: "The morning sunlight guide",
    note: "light is what actually moves your clock",
  },
  {
    href: "/blog/what-is-social-jetlag",
    label: "What is social jetlag?",
    note: "the weekly version of a clock change",
  },
  {
    href: "/tools/social-jetlag-calculator",
    label: "Social jetlag calculator",
  },
  {
    href: "/tools/caffeine-calculator",
    label: "Caffeine cutoff calculator",
  },
];

export default function DaylightSavingPlannerPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Daylight Saving Time Sleep Planner",
          slug: "daylight-saving-time-planner",
          description:
            "A free planner that finds the next clock change for your region and shifts your sleep gradually beforehand, with light and caffeine timing.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <DaylightSavingPlannerClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What a Clock Change Does to Your Body</h2>
        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            The clock on the wall jumps an hour overnight. The clock in your body doesn&apos;t. It keeps its own time, set mainly
            by when you see daylight, and it moves by roughly an hour a day at most. So for a few days after the change, your
            body is running an hour off the new schedule: a small, self-inflicted jet lag that everyone in your time zone gets at
            once.
          </p>
          <p className="leading-relaxed mb-6">
            <strong className="text-white">When the clocks go forward</strong> in spring, you lose an hour. Your body wants to
            stay up later by the new clock and resists the earlier alarm, which is why the Monday after tends to be rough. This
            is usually the harder change.
          </p>
          <p className="leading-relaxed mb-6">
            <strong className="text-white">When the clocks go back</strong> in autumn, you gain an hour. It&apos;s gentler, but
            many people wake an hour early for a few days and feel sleepy early in the evening, and the darker afternoons arrive
            at once.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why Shifting Early Helps</h3>
          <p className="leading-relaxed mb-6">
            The American Academy of Sleep Medicine suggests moving your bedtime 15 to 20 minutes a night for a few nights before
            the change. Small steps are easy for your body clock to follow, so by the Sunday most of the hour is already behind
            you. The planner moves your wake time by the same amount, which keeps your time in bed the same.
          </p>
          <p className="leading-relaxed mb-6">
            Light does the real work. Morning daylight pulls your clock earlier, and evening light pushes it later. That&apos;s
            why the plan asks for morning light before a spring change and evening light before an autumn one. About 20 minutes
            outside is plenty on most days; never look directly at the sun. Read more in the{" "}
            <Link href="/guides/morning-sunlight-lux-protocol-guide" className="text-accent hover:underline">
              morning sunlight guide
            </Link>
            .
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">After the Change</h3>
          <p className="leading-relaxed mb-6">
            Keep your wake time steady on the new clock, even at the weekend, and get outside soon after waking. Keep your last
            coffee well before your new bedtime: for one average cup, that&apos;s roughly five hours for an average metaboliser.
            The{" "}
            <Link href="/tools/caffeine-calculator" className="text-accent hover:underline">
              caffeine cutoff calculator
            </Link>{" "}
            works out your own number.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
