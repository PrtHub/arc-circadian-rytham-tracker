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
import CaffeineCalculatorClient from "./CaffeineCalculatorClient";

export const metadata = toolMetadata({
  slug: "caffeine-calculator",
  title: "Caffeine Half-Life Calculator: Your Coffee Cutoff Time",
  description:
    "Find your last safe coffee. Enter your bedtime, drink and caffeine sensitivity (4, 5.5 or 7 h half-life) to see when to stop so under 50 mg is left at bed.",
  keywords:
    "caffeine half life calculator, when to stop drinking coffee, caffeine cutoff time, caffeine decay calculator, last coffee before bed",
});

const FAQS: ToolFaq[] = [
  {
    q: "What is the half-life of caffeine?",
    a: "Roughly 4 to 7 hours depending on the person, around 5 on average. Genetics, pregnancy, smoking and some medications all change it. The calculator lets you pick fast (4 h), average (5.5 h) or slow (7 h), the same three options the ARC app asks about.",
  },
  {
    q: "When should I stop drinking coffee before bed?",
    a: "There's no universal cutoff. For one average cup (about 100 mg) and an average metaboliser, caffeine takes roughly five and a half hours to fall below 50 mg. A bigger cup, a slower metabolism, or an earlier coffee still in your system pushes that earlier.",
  },
  {
    q: "How much caffeine is still in my system at bedtime?",
    a: "Take a 200 mg energy drink at 3 PM and a bedtime of 11 PM. Eight hours later you'd still have about 50 mg circulating if you clear caffeine fast, about 73 mg if you're average and about 91 mg if you're slow.",
  },
  {
    q: "Why does the calculator aim for under 50 mg at bedtime?",
    a: "It's the line the ARC app uses: a practical threshold rather than a hard biological cliff. If even a small afternoon coffee keeps you awake, choose the Slow setting to build in more margin.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/caffeine-half-life-optimization-guide",
    label: "The caffeine optimization guide",
    note: "half-life, cutoffs and resetting tolerance",
  },
  {
    href: "/blog/caffeine-half-life-calculator-science",
    label: "Why an afternoon coffee can still affect tonight's sleep",
  },
  {
    href: "/blog/caffeine-timing-when-to-stop-drinking-coffee",
    label: "Caffeine timing: when to stop drinking coffee",
  },
  {
    href: "/for/coffee-drinkers",
    label: "ARC for coffee drinkers",
  },
];

export default function CaffeineCalculatorPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Caffeine Half-Life Calculator",
          slug: "caffeine-calculator",
          description:
            "A free tool to find your last safe coffee before bed, based on your caffeine half-life (4, 5.5 or 7 hours) and a target of under 50 mg at bedtime.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <CaffeineCalculatorClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Science Behind the Calculator</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Caffeine has a <strong className="text-white">half-life</strong> of about 4 to 7 hours depending on how fast you metabolise it (around 5.5 on average). For an average metaboliser, about half of a coffee is still circulating 5 to 6 hours after you finish it, blocking adenosine receptors and holding off the sleep pressure that should be building.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why is my cutoff time so early?</h3>
          <p className="leading-relaxed mb-6">
            The calculator aims for under 50 mg of caffeine still circulating at bedtime, the same line the ARC app uses. If you have a 200 mg energy drink at 3:00 PM, you&apos;ll still have roughly 50 to 90 mg circulating at 11 PM (about 73 mg for an average metaboliser), above the 50 mg line. The calculator does the exponential decay math for you, so you&apos;re under 50 mg by the time you go to bed.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How does this affect my circadian rhythm?</h3>
          <p className="leading-relaxed mb-6">
            Caffeine doesn&apos;t remove sleep pressure; it masks it by blocking adenosine receptors. When it wears off, the adenosine that built up is still there, which is the crash. Caffeine late in the day can also make it harder to fall asleep and lighten your sleep, even on nights you drift off fine.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
