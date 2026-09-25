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
import NapCalculatorClient from "./NapCalculatorClient";

export const metadata = toolMetadata({
  slug: "nap-calculator",
  title: "Nap Calculator: The Best Time to Nap Today",
  description:
    "Find the best time to nap from your wake time and bedtime: your likely afternoon dip, when to lie down, when to set the alarm, and if a caffeine nap fits.",
  keywords:
    "nap calculator, best time to nap, power nap calculator, how long should a nap be, caffeine nap, afternoon dip",
});

const FAQS: ToolFaq[] = [
  {
    q: "What is the best time to take a nap?",
    a: "Early in your afternoon dip, which for most people lands about six and a half to eight and a half hours after waking. If you wake at 7 AM, that's roughly 1:30 to 3:30 PM. Napping then works with your body clock, and it leaves enough time before bed to rebuild sleep pressure for the night.",
  },
  {
    q: "How long should a nap be?",
    a: "Either short or a full cycle. A 10 to 20 minute nap keeps you in light sleep, so you wake up clear. A nap of about 90 minutes covers a whole sleep cycle. Naps of 30 to 60 minutes often end in deep sleep, which is why they can leave you groggy for a while afterwards.",
  },
  {
    q: "What is a caffeine nap?",
    a: "You drink a coffee and lie down straight away for about 20 minutes. Caffeine takes roughly that long to kick in, so it arrives as you wake up. Studies of sleepy drivers found the combination worked better than either on its own (Reyner and Horne, 1997). It only makes sense early enough in the day for the coffee to clear before bed.",
  },
  {
    q: "Can napping ruin my sleep at night?",
    a: "Long or late naps can. Napping releases some of the sleep pressure that builds up during the day, so a long nap close to bedtime can make it harder to fall asleep. If you have insomnia, it's often better to skip naps altogether, and if you're very sleepy during the day despite enough sleep, talk to a doctor.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/blog/why-do-i-crash-at-2pm-afternoon-energy-drop-fix",
    label: "Why do I crash at 2pm?",
    note: "what the afternoon dip is and what helps",
  },
  {
    href: "/guides/adenosine-sleep-pressure-clearance-guide",
    label: "The sleep pressure guide",
  },
  {
    href: "/guides/nsdr-non-sleep-deep-rest-guide",
    label: "NSDR: rest without sleeping",
    note: "an option when you can't nap",
  },
  {
    href: "/tools/caffeine-calculator",
    label: "Caffeine cutoff calculator",
  },
];

export default function NapCalculatorPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Nap Calculator",
          slug: "nap-calculator",
          description:
            "A free tool that estimates your afternoon dip from your wake time and suggests when to nap, how long, and when to set the alarm.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <NapCalculatorClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">Why You Get Sleepy After Lunch</h2>
        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            The mid-afternoon slump isn&apos;t really about lunch. It shows up even when people skip the meal (Monk, 2005). Two
            things overlap: <strong className="text-white">sleep pressure</strong>, which has been building since you woke up as
            adenosine accumulates in the brain, and a small dip in the <strong className="text-white">body clock&apos;s</strong>{" "}
            alerting signal in the early afternoon. For a while the clock&apos;s push toward wakefulness can&apos;t quite keep up,
            and you feel it as heavy eyelids and slow thinking. Read more in{" "}
            <Link href="/blog/why-do-i-crash-at-2pm-afternoon-energy-drop-fix" className="text-accent hover:underline">
              why you crash at 2pm
            </Link>
            .
          </p>
          <p className="leading-relaxed mb-6">
            Because the dip follows your own day, the most useful input is when you woke up. This calculator places it about six
            and a half to eight and a half hours after waking. That&apos;s a typical estimate; your own dip can land earlier or
            later.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Power Nap, Full Cycle or Caffeine Nap?</h3>
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Power nap (10–20 minutes).</strong> The safest choice for most afternoons. You stay in
            light sleep, so there&apos;s little grogginess afterwards. In one study of sleep-restricted adults, a 10-minute nap
            gave the best balance of quick recovery and little grogginess (Brooks and Lack, 2006).
          </p>
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Full cycle (about 90 minutes).</strong> Useful after a short night, if you have the
            time. A full cycle ends in lighter sleep, so waking is easier than at the 45-minute mark. Start it early in the dip so
            it finishes well before the evening.
          </p>
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Caffeine nap.</strong> Drink a coffee, then lie down for about 20 minutes; the
            caffeine arrives as you wake. It only works if that coffee can clear by bedtime, so the calculator checks it against
            the same under-50 mg line the ARC app uses. Use the{" "}
            <Link href="/tools/caffeine-calculator" className="text-accent hover:underline">
              caffeine cutoff calculator
            </Link>{" "}
            to see your own last safe coffee.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">When to Skip the Nap</h3>
          <p className="leading-relaxed mb-6">
            If you struggle to fall asleep at night, naps can make it harder by releasing sleep pressure you need later. A short
            walk outside in daylight is a good alternative: it lifts alertness without touching tonight&apos;s sleep. And if you
            feel very sleepy during the day even after a full night, that&apos;s worth raising with a doctor.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
