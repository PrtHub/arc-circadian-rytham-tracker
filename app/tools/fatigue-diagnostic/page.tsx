import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolBreadcrumbs,
  ToolFaqSection,
  toolAppJsonLd,
  toolMetadata,
  type RelatedLink,
  type ToolFaq,
} from "../_components/tool-extras";
import FatigueDiagnosticClient from "./FatigueDiagnosticClient";

export const metadata = toolMetadata({
  slug: "fatigue-diagnostic",
  title: "Why Am I Tired Right Now? Free 30-Second Fatigue Diagnostic",
  description:
    "Pinpoint why you crash at 10 AM, 2 PM, 5 PM, or feel wired at 11 PM. Instant circadian diagnosis using wake time, cortisol windows, and caffeine timing.",
  keywords:
    "why am i tired right now, fatigue diagnostic calculator, why do i crash at 2pm, tired all day wired at night, why am i tired at 10am, waking up at 3am",
});

const FAQS: ToolFaq[] = [
  {
    q: "Why does the clock hour of my crash reveal what caused it?",
    a: "Different biological mechanisms fail at different hours after waking. A crash 2–3 hours after waking usually points to early coffee blunting the Cortisol Awakening Response or breakfast blood-sugar swings, whereas a crash 7–8 hours post-wake reflects the Two-Process Model's midday alerting trough.",
  },
  {
    q: "Why does drinking coffee right after waking cause a mid-morning crash?",
    a: "In the first 45 minutes after waking, your body releases a natural surge of cortisol while still clearing residual adenosine. Blocking receptors with caffeine right away causes un-cleared adenosine to rebound once that first cup wears off around 10 AM.",
  },
  {
    q: "Why do I feel exhausted at 5 PM and suddenly wired at 11 PM?",
    a: "At the end of the workday, stress hormones drop and unmask cumulative sleep pressure. Later in the evening, your circadian pacemaker fires its Wake Maintenance Zone burst right before bedtime—which bright screens and late caffeine amplify.",
  },
  {
    q: "Can ARC measure my personal dip timing automatically?",
    a: "Yes. ARC starts with an onboarding estimate and refines it from ~10 days of one-tap energy check-ins, correcting your phase windows if your real afternoon dip lands earlier or later than expected.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/tools/caffeine-calculator",
    label: "Caffeine Half-Life & Cutoff Calculator",
    note: "stack your cups against a 50 mg bedtime budget",
  },
  {
    href: "/tools/nap-calculator",
    label: "Power Nap Timing Calculator",
    note: "clear midday adenosine without grogginess",
  },
  {
    href: "/tools/circadian-reset-planner",
    label: "Sleep Schedule Reset Planner",
    note: "day-by-day shift calculator",
  },
  {
    href: "/blog/why-am-i-so-tired-at-1pm",
    label: "Why Am I So Tired at 1 PM?",
    note: "Borbély Two-Process Model explained",
  },
];

export default function FatigueDiagnosticPage() {
  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Clock-Time Fatigue Diagnostic",
          slug: "fatigue-diagnostic",
          description:
            "A free interactive circadian fatigue diagnostic that identifies the root biological cause of energy crashes from wake time and caffeine habits.",
        })}
      />

      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/tools" backLabel="All Tools" />
      <ToolBreadcrumbs title="Fatigue Diagnostic" />
      <FatigueDiagnosticClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          How Clock-Time Diagnostics Separate Causes
        </h2>
        <div className="space-y-5 text-(--fg-muted) text-base leading-relaxed">
          <p>
            Generic fatigue advice treats every tired hour the same way: sleep more, drink water, cut sugar. Chronobiology is far more specific—the <strong className="text-white">hour you crash relative to when you woke up</strong> points cleanly to the lever that fixes it.
          </p>
          <p>
            Pair this diagnostic with our <Link href="/tools/caffeine-calculator" className="text-accent hover:underline">Caffeine Half-Life Calculator</Link> if you wake up between 3–4 AM, or run a <Link href="/guides/5-day-afternoon-crash-experiment" className="text-accent hover:underline">5-day single-lever crash experiment</Link> to prove which habit actually moves your needle.
          </p>
          <p className="text-sm text-white/60">
            Note: ARC is a wellness and timing tool, not medical diagnosis. Persistent or severe daytime sleepiness should always be discussed with a physician.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />
      <Footer />
    </div>
  );
}
