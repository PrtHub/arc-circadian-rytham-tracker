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
import ChronotypeCompatibilityClient from "./ChronotypeCompatibilityClient";

export const metadata = toolMetadata({
  slug: "chronotype-compatibility",
  title: "Chronotype Compatibility Quiz: Compare Two Sleep Types",
  description:
    "Compare two chronotypes (Lion, Bear, Wolf, Dolphin): typical bedtime and wake-time gaps, shared awake hours, and practical ways to share a bedroom.",
  keywords:
    "chronotype compatibility quiz, chronotype compatibility calculator, sleep schedule compatibility, Lion Bear Wolf Dolphin compatibility",
});

const FAQS: ToolFaq[] = [
  {
    q: "Which chronotypes are most compatible?",
    a: "Matching or neighbouring types (Bear and Bear, Bear and Lion) share the most similar bed and wake times. But a gap isn't a verdict on a relationship: it tells you where the friction points are likely to be, mostly at bedtime and in the morning.",
  },
  {
    q: "Can a Lion and a Wolf share a bedroom?",
    a: "Yes, with some planning. Their typical bedtimes are about two and a half hours apart, so a quiet wind-down for the Lion, low evening lighting for the Wolf, a vibrating alarm and separate blankets go a long way.",
  },
  {
    q: "How does this tool calculate shared awake hours?",
    a: "It uses typical wake and bed times for each chronotype in Dr. Michael Breus's model and counts the hours between 8 AM and 11 PM when both of you are usually past morning grogginess and not yet winding down. Your real schedules will differ, so treat it as a starting point.",
  },
  {
    q: "What if we don't know our chronotypes?",
    a: "Take the free 8-question chronotype quiz first, each of you separately, then come back and compare your results here.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/sleep-chronotype-couples-compatibility-guide",
    label: "Couples with different sleep schedules: a practical playbook",
  },
  {
    href: "/tools/chronotype-quiz",
    label: "Take the free chronotype quiz",
  },
  {
    href: "/blog/what-is-a-chronotype-lion-bear-wolf-dolphin",
    label: "What is a chronotype? Lion, Bear, Wolf and Dolphin explained",
  },
  {
    href: "/guides/chronotype-lifestyle-design-guide",
    label: "Daily schedules for each chronotype",
  },
];

export default function ChronotypeCompatibilityPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Chronotype Compatibility Quiz",
          slug: "chronotype-compatibility",
          description:
            "Compare two chronotypes: typical bedtime and wake-time gaps, shared awake hours, and practical tips for sharing a bedroom.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <ChronotypeCompatibilityClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">How This Tool Compares Two Chronotypes</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Different body clocks under one roof can be a real source of friction. When an early-rising <strong className="text-white">Lion</strong> lives with a late-night <strong className="text-white">Wolf</strong>, one of you is usually going to bed, or getting up, while the other is asleep. This tool shows where those gaps fall. For a deeper look at making it work, read the{" "}
            <Link href="/guides/sleep-chronotype-couples-compatibility-guide" className="text-accent hover:underline">guide for couples with different sleep schedules</Link>.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Understanding the Pairings</h3>
          <ul className="list-disc list-inside space-y-4 mb-6">
            <li>
              <strong className="text-white">Matched Chronotypes (e.g. Bear & Bear):</strong> Similar energy curves. They tend to feel alert at the same hours, eat at similar times and go to bed together.
            </li>
            <li>
              <strong className="text-white">Opposite Chronotypes (e.g. Lion & Wolf):</strong> The largest bedtime offset (often 2-3 hours). That leaves time for independent focus, but one partner may be disturbed when the other goes to bed or gets up.
            </li>
            <li>
              <strong className="text-white">Pairings with a Dolphin:</strong> Dolphins tend to be light sleepers, so noise and light from a partner&apos;s different schedule matter more. Quiet routines and a dark room help.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How to Navigate the Gaps</h3>
          <p className="leading-relaxed mb-6">
            A gap doesn&apos;t mean incompatibility. Partners can make it work by protecting the early sleeper&apos;s wind-down, using white noise, sleeping under separate blankets (the Scandinavian sleep method), and treating each other&apos;s solo hours as a feature rather than neglect.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
