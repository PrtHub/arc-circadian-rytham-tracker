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
import SleepDebtClient from "./SleepDebtClient";

export const metadata = toolMetadata({
  slug: "sleep-debt-calculator",
  title: "Sleep Debt Calculator: How Much Sleep Do You Owe?",
  description:
    "Calculate your sleep debt over the last five nights against the sleep you need, and get practical tips to recover without shifting your body clock.",
  keywords:
    "sleep debt calculator, calculate sleep debt, how to catch up on sleep, sleep deficit calculator, recover from sleep debt",
});

const FAQS: ToolFaq[] = [
  {
    q: "How do you calculate sleep debt?",
    a: "Multiply the sleep you need per night by the number of nights, then subtract the sleep you actually got. If you need 8 hours and slept 7, 6, 7, 5 and 6 hours over five nights, you're 9 hours short.",
  },
  {
    q: "Can you catch up on sleep at the weekend?",
    a: "Partly. Extra sleep reduces daytime sleepiness, but a lab study found weekend recovery sleep didn't prevent the metabolic effects of repeated short nights (Depner et al. 2019, Current Biology). Sleeping in late also shifts your body clock, which makes Sunday night harder.",
  },
  {
    q: "How long does it take to recover from sleep debt?",
    a: "Usually a few nights of slightly longer sleep, not one long lie-in. Going to bed 30 to 60 minutes earlier while keeping your wake time steady is the gentlest way to pay it back.",
  },
  {
    q: "How much sleep do I need?",
    a: "Most adults need 7 to 9 hours. The best guide is how much you sleep on a long holiday once the first few catch-up nights are over, when you wake without an alarm and feel rested.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/blog/sleep-debt-myth-busted",
    label: "The sleep debt myth: why you can't fully catch up at weekends",
  },
  {
    href: "/guides/adenosine-sleep-pressure-clearance-guide",
    label: "Adenosine and sleep pressure explained",
  },
  {
    href: "/blog/power-of-naps-science-of-siesta",
    label: "How to nap without waking up groggy",
  },
  {
    href: "/tools/social-jetlag-calculator",
    label: "Social jetlag calculator",
  },
];

export default function SleepDebtPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Sleep Debt Calculator",
          slug: "sleep-debt-calculator",
          description:
            "A free tool to add up sleep debt over the last five nights and get practical recovery tips based on sleep and circadian research.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <SleepDebtClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What is Sleep Debt?</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Sleep debt</strong> is the difference between the sleep your body needs and the sleep you actually get. It adds up. If you need 8 hours a night but only get 6 on Monday, you start Tuesday 2 hours short.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why Weekend Lie-ins Only Partly Help</h3>
          <p className="leading-relaxed mb-6">
            Sleeping in for hours on Saturday and Sunday shifts your body clock later and creates <em className="text-white">social jetlag</em>, which makes it harder to fall asleep on Sunday night and makes Monday harder. Catch-up sleep does reduce daytime sleepiness, but in a lab study it didn&apos;t prevent the metabolic effects of repeated short nights (Depner et al. 2019, Current Biology). More on this in{" "}
            <Link href="/blog/sleep-debt-myth-busted" className="text-accent hover:underline">the sleep debt myth</Link>.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How to Recover from Sleep Debt</h3>
          <ol className="space-y-3 mb-6 list-decimal pl-5">
            <li><strong className="text-white">Keep Your Wake Time Steady:</strong> Try not to sleep in by more than about 60 minutes at weekends, even when you&apos;re tired.</li>
            <li><strong className="text-white">Add Sleep at the Start of the Night:</strong> Go to bed 30-60 minutes earlier than usual rather than waking up later.</li>
            <li><strong className="text-white">Nap Early and Short:</strong> A 20-30 minute nap before about 3:00 PM can take the edge off without eating into tonight&apos;s sleep pressure.</li>
          </ol>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
