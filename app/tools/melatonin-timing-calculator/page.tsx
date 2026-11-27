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
import MelatoninTimingClient from "./MelatoninTimingClient";

export const metadata = toolMetadata({
  slug: "melatonin-timing-calculator",
  title: "Melatonin & Wind-Down Timing Calculator: DLMO & Digital Sunset",
  description:
    "Calculate your natural Dim Light Melatonin Onset (DLMO), Digital Sunset hour, and core temperature cooling window around your bedtime.",
  keywords:
    "melatonin timing calculator, when to dim lights before bed, digital sunset calculator, dim light melatonin onset calculator, evening wind down time",
});

const FAQS: ToolFaq[] = [
  {
    q: "When does natural melatonin start rising before bedtime?",
    a: "In healthy sleepers under dim indoor light (<50 lux), Dim Light Melatonin Onset (DLMO) typically begins roughly 2 hours before habitual sleep onset. Bright overhead LEDs and bright screens during those 2 hours can sharply suppress that rise.",
  },
  {
    q: "Is timing different for shifting sleep earlier vs falling asleep tonight?",
    a: "Chronobiology research distinguishes between circadian phase shifting—where low physiological doses (0.3–0.5 mg) and dark evenings are positioned ~4–5 hours before habitual sleep—versus pre-bedtime soporific timing. Always consult a clinician before taking melatonin supplements.",
  },
  {
    q: "Why include a warm shower 90 minutes before bed?",
    a: "Warm water brings blood toward your hands and feet. When you step out into a cool bedroom (~65–68°F / 18–20°C), that peripheral vasodilation dumps core body heat, accelerating the ~1°C drop needed for deep sleep.",
  },
  {
    q: "Do blue-light glasses replace dimming room lights?",
    a: "No. Standard orange-tinted glasses help reduce 460–480 nm wavelengths from screens, but bright ceiling fixtures still raise alertness through overall illuminance (lux). Floor-level warm lamps below 50 lux work much better.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/evening-blue-light-melatonin-defense-guide",
    label: "Blue Light & Melatonin Evening Guide",
    note: "why <50 lux matters after sunset",
  },
  {
    href: "/tools/sleep-cocktail",
    label: "Sleep Supplement Timing Explainer",
    note: "magnesium, L-theanine, apigenin safety notes",
  },
  {
    href: "/tools/sleep-cycle-calculator",
    label: "90-Minute Sleep Cycle Calculator",
    note: "align lights out to full sleep cycles",
  },
  {
    href: "/guides/revenge-bedtime-procrastination-circadian-protocol",
    label: "Fix Revenge Bedtime Procrastination",
    note: "break late-night scrolling loops",
  },
];

export default function MelatoninTimingCalculatorPage() {
  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Melatonin & Digital Sunset Timing Calculator",
          slug: "melatonin-timing-calculator",
          description:
            "Interactive circadian evening calculator estimating Dim Light Melatonin Onset (DLMO), Digital Sunset, and thermal cooling windows from your bedtime.",
        })}
      />

      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/tools" backLabel="All Tools" />
      <ToolBreadcrumbs title="Melatonin & Digital Sunset" />
      <MelatoninTimingClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          Why Evening Light Timing Matters More Than Pills
        </h2>
        <div className="space-y-5 text-(--fg-muted) text-base leading-relaxed">
          <p>
            Melatonin is the hormone of darkness—not darkness itself. Its job is simply to signal your organs that night has started. When overhead room lights stay bright until 10:45 PM, your brain receives conflicting signals: circadian night never cleanly begins.
          </p>
          <p>
            Combining a strict Digital Sunset 2 hours before bed with a <Link href="/tools/caffeine-calculator" className="text-accent hover:underline">bedtime-calibrated caffeine cutoff</Link> solves most sleep-onset delays naturally without needing daily sleep aids.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />
      <Footer />
    </div>
  );
}
