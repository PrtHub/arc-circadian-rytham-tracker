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
import DailyScheduleClient from "./DailyScheduleClient";

export const metadata = toolMetadata({
  slug: "daily-schedule-generator",
  title: "Daily Schedule Generator by Chronotype",
  description:
    "A daily schedule timed to your body clock: morning light, peak focus, the afternoon dip, exercise and your last coffee, for Lions, Bears, Wolves and Dolphins.",
  keywords:
    "daily schedule generator, ideal daily routine, chronotype schedule, best daily schedule, wolf chronotype schedule, bear chronotype schedule",
});

const FAQS: ToolFaq[] = [
  {
    q: "What is the best daily schedule?",
    a: "The one that fits your body clock. The same routine can feel easy for an early riser and exhausting for a night owl. The biggest wins for almost everyone are a consistent wake time, about 20 minutes of morning daylight, hard work during your peak hours, and a last coffee that clears before bed.",
  },
  {
    q: "How is my schedule worked out?",
    a: "From your chronotype and wake time. Focus and exercise windows follow typical patterns for each chronotype in the popular Lion, Bear, Wolf and Dolphin framework; the afternoon dip is placed about 6.5 to 8.5 hours after waking; and the last safe coffee is the time one average cup falls below 50 mg by bedtime for an average metaboliser.",
  },
  {
    q: "Can I share my schedule?",
    a: "Yes. Copy my schedule copies it as text you can paste into a message or post, and Copy link gives a link that opens this exact schedule.",
  },
  {
    q: "How accurate is it?",
    a: "It's a sensible starting point, not a measurement. Your real dip might land earlier or later than the typical window. ARC measures yours from about ten days of one-tap energy check-ins and adjusts the plan.",
  },
];

const RELATED: RelatedLink[] = [
  { href: "/guides/chronotype-lifestyle-design-guide", label: "Chronotype daily schedules, in depth" },
  { href: "/blog/what-your-body-does-every-hour", label: "What your body is doing at every hour of the day" },
  { href: "/tools/chronotype-quiz", label: "Chronotype quiz" },
  { href: "/blog/peak-focus-windows-plan-day-around-biology", label: "Plan your workday around your peak hours" },
];

export default function DailySchedulePage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Daily Schedule Generator",
          slug: "daily-schedule-generator",
          description:
            "A free tool that builds a daily schedule timed to your chronotype and wake time, with light, focus, dip, exercise and caffeine timing.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <DailyScheduleClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">Why Your Schedule Should Follow Your Clock</h2>
        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Your body runs on a roughly 24-hour clock that shapes alertness, energy and sleepiness across the day. People differ in
            how early or late that clock runs, their <strong className="text-white">chronotype</strong>, and a schedule that ignores
            it tends to put your hardest work in your foggiest hours. Read{" "}
            <Link href="/blog/what-your-body-does-every-hour" className="text-accent hover:underline">
              what your body is doing at every hour
            </Link>{" "}
            for the full picture.
          </p>
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">What&apos;s in Your Day</h3>
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Morning light</strong> comes first because it&apos;s the strongest signal for keeping
            your clock on time. <strong className="text-white">Peak focus</strong> follows your chronotype: late morning for
            Bears, early for Lions, late afternoon into evening for Wolves. The <strong className="text-white">afternoon dip</strong>{" "}
            arrives several hours after waking for almost everyone. Your <strong className="text-white">last safe coffee</strong>{" "}
            is set by your bedtime, not a fixed rule; for your own drinks, use the{" "}
            <Link href="/tools/caffeine-calculator" className="text-accent hover:underline">
              caffeine cutoff calculator
            </Link>
            .
          </p>
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Make It Stick</h3>
          <p className="leading-relaxed mb-6">
            Consistency does more than precision. Keep your wake time within about an hour every day, weekends included, and the
            rest of the schedule settles around it. If your days don&apos;t allow your ideal timing, protect just one thing, usually
            your peak hours, and move the rest as you can.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
