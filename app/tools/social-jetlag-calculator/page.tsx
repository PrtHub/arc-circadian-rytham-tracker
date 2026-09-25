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
import SocialJetlagClient from "./SocialJetlagClient";

export const metadata = toolMetadata({
  slug: "social-jetlag-calculator",
  title: "Social Jetlag Calculator: Your Weekend Sleep Shift",
  description:
    "Calculate your social jetlag from weekday and weekend sleep times, using the mid-sleep method researchers use, and see how far weekends shift your clock.",
  keywords:
    "social jetlag calculator, weekend sleep in, monday morning fatigue, mid-sleep calculator, fix sleep schedule",
});

const FAQS: ToolFaq[] = [
  {
    q: "How is social jetlag calculated?",
    a: "Researchers compare the midpoint of your sleep on free days with the midpoint on work days (Wittmann and colleagues, 2006). If you sleep 11 PM to 6:30 AM on weekdays and 12:30 AM to 9:30 AM at weekends, your mid-sleep moves from 2:45 AM to 5:00 AM: 2 h 15 min of social jetlag.",
  },
  {
    q: "How much social jetlag is too much?",
    a: "There's no official cutoff. Under an hour is small; many researchers treat two hours or more as large. Studies link larger social jetlag with higher BMI in some groups and a higher resting heart rate, but those are associations, and the size of the effect varies.",
  },
  {
    q: "Is sleeping in on weekends bad?",
    a: "Not in itself. If you're short on sleep, the extra rest helps. The catch is that a much later wake time also shifts your body clock later, which makes Sunday night harder to fall asleep and Monday morning harder to wake up.",
  },
  {
    q: "How do I reduce social jetlag?",
    a: "Keep your weekend wake time within about an hour of your weekday one, go to bed a little earlier on weekdays if you're short on sleep, and get about 20 minutes of outdoor light soon after waking, especially on weekend mornings.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/blog/what-is-social-jetlag",
    label: "What is social jetlag? Why Monday mornings hurt",
  },
  {
    href: "/guides/social-jetlag-recovery-guide",
    label: "The social jetlag recovery guide",
  },
  {
    href: "/blog/sunday-night-insomnia-cure-social-jetlag-reset",
    label: "Can't sleep on Sunday night? How to reset",
  },
  {
    href: "/tools/sleep-debt-calculator",
    label: "Sleep debt calculator",
  },
];

export default function SocialJetlagPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Social Jetlag Calculator",
          slug: "social-jetlag-calculator",
          description:
            "A free tool to estimate your social jetlag: the shift in mid-sleep between weekdays and weekends.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <SocialJetlagClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">How This Calculator Measures Social Jetlag</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Social jetlag</strong> is the gap between your body&apos;s preferred timing and the schedule your week imposes. For the full explanation, read{" "}
            <Link href="/blog/what-is-social-jetlag" className="text-accent hover:underline">what social jetlag is and why Mondays hurt</Link>. This calculator uses the measure researchers use: the difference between the midpoint of your sleep on weekends and on weekdays (Wittmann, Dinich, Merrow &amp; Roenneberg, 2006).
          </p>
          <p className="leading-relaxed mb-6">
            Say you sleep 11 PM to 6:30 AM on weekdays, then 12:30 AM to 9:30 AM on Saturday and Sunday. Your mid-sleep moves from 2:45 AM to 5:00 AM, a shift of 2 h 15 min. It&apos;s a bit like flying from New York to Los Angeles on Friday and back on Sunday: your clock gets pulled later, then dragged back.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why does it matter?</h3>
          <p className="leading-relaxed mb-6">
            Your body clock doesn&apos;t know what a weekend is. It takes its cues from light, above all morning light. When you sleep in and see your first daylight hours later, your clock drifts later too, so your melatonin rises later on Sunday evening. That&apos;s why it&apos;s hard to fall asleep on Sunday night, and why Monday feels rough.
          </p>
          <p className="leading-relaxed mb-6">
            Studies link larger social jetlag with higher BMI in some groups (Roenneberg et al. 2012, Current Biology) and a higher resting heart rate (Rutters et al. 2014, Journal of Biological Rhythms). These are associations; how much social jetlag itself causes is still being worked out.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">A Useful Target: Within About an Hour</h3>
          <p className="leading-relaxed mb-6">
            Consistency matters more than any single night. A practical target is to keep your weekend wake time within about <strong className="text-white">60 minutes</strong> of your weekday one. If you do sleep in, get about 20 minutes of outdoor light soon after waking to help anchor your rhythm.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
