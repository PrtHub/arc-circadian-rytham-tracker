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
import VisualizerClient from "./VisualizerClient";

export const metadata = toolMetadata({
  slug: "chronotype-visualizer",
  title: "Chronotype Visualizer: Cortisol & Melatonin by Hour",
  description:
    "Slide through the day to see an illustrative cortisol and melatonin curve for your chronotype (Lion, Bear, Wolf, Dolphin) and what each hour is good for.",
  keywords:
    "chronotype visualizer, cortisol curve, melatonin onset, circadian rhythm graph, chronotype daily schedule",
});

const FAQS: ToolFaq[] = [
  {
    q: "When does cortisol peak?",
    a: "Cortisol rises sharply in the first 30 to 45 minutes after waking (the cortisol awakening response), then drifts down through the day and reaches its lowest point around the middle of the night.",
  },
  {
    q: "When does melatonin start rising?",
    a: "Melatonin usually starts rising about two hours before your natural bedtime in dim light, peaks in the middle of the night, and falls away towards morning. Bright light in the evening can push that rise later.",
  },
  {
    q: "Does my chronotype change my hormone timing?",
    a: "Yes. The shape of the curves is similar for everyone, but an early chronotype's curves run earlier and a late chronotype's run later, which is why a Wolf can feel groggy at an hour when a Lion is already at their best.",
  },
  {
    q: "Are these real hormone levels?",
    a: "No. The percentages are an illustrative model based on typical timing for each chronotype, not measurements. Real levels vary from person to person and day to day.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/cortisol-awakening-response-optimization-guide",
    label: "The cortisol awakening response guide",
  },
  {
    href: "/blog/melatonin-more-than-sleep-hormone",
    label: "Melatonin: more than a sleep hormone",
  },
  {
    href: "/blog/peak-focus-windows-plan-day-around-biology",
    label: "Peak focus windows: plan your day around your biology",
  },
  {
    href: "/blog/what-is-a-chronotype-lion-bear-wolf-dolphin",
    label: "What is a chronotype? Lion, Bear, Wolf and Dolphin explained",
  },
];

export default function VisualizerPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Chronotype Visualizer",
          slug: "chronotype-visualizer",
          description:
            "An interactive, illustrative view of how cortisol and melatonin timing shifts through the day for each chronotype.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <VisualizerClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Dance of Cortisol and Melatonin</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Your master clock, the suprachiasmatic nucleus (SCN) in the brain, times two key signals: <strong className="text-white">cortisol</strong> and <strong className="text-white">melatonin</strong>. They run roughly opposite each other across the 24-hour day.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Cortisol: The Alertness Driver</h3>
          <p className="leading-relaxed mb-6">
            Often called the &quot;stress hormone,&quot; cortisol is also part of how you wake up. It rises in the first hour after waking, helping you feel alert, and morning daylight strengthens that rise. It then tapers off as the day goes on.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Melatonin: The Sleep Signal</h3>
          <p className="leading-relaxed mb-6">
            Melatonin tells your body it&apos;s night. The pineal gland releases it in response to darkness, starting roughly two hours before your natural bedtime. As it rises, your core body temperature drops and sleep gets easier. Bright evening light can delay that rise.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How Chronotypes Shift the Curve</h3>
          <p className="leading-relaxed mb-6">
            Everyone follows the same general pattern, but your <strong className="text-white">chronotype</strong> shifts <em>when</em> the peaks and valleys happen. A Lion&apos;s cortisol rise comes hours before a Wolf&apos;s. At 8:00 AM a Wolf&apos;s cortisol may not have risen yet and melatonin can still be present, which is why deep analytical work usually goes better for them later in the day.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
