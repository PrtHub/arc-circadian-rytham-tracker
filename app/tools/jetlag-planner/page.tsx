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
import JetlagPlannerClient from "./JetlagPlannerClient";

export const metadata = toolMetadata({
  slug: "jetlag-planner",
  title: "Jet Lag Planner: Light & Sleep Schedule by Time Zone",
  description:
    "Plan your jet lag recovery day by day: when to seek and avoid light, when to sleep, and your last coffee, shifting your body clock about an hour a day.",
  keywords:
    "jet lag planner, jet lag calculator, jet lag light schedule, flying east jet lag, flying west jet lag, phase advance, phase delay",
});

const FAQS: ToolFaq[] = [
  {
    q: "Is jet lag worse flying east or west?",
    a: "For most people, east. Flying east means your body clock has to move earlier (a phase advance), and the human clock shifts later more easily than earlier, so westward trips usually settle faster.",
  },
  {
    q: "How long does jet lag last?",
    a: "Your body clock moves roughly an hour a day, so a 6-hour time difference can take around 6 days to settle fully. Timing light well helps you shift in the right direction; timing it badly can make the trip longer.",
  },
  {
    q: "When should I get light after flying east?",
    a: "In your body's morning, which for the first days after a big eastward flight is late morning to early afternoon at your destination. Light in the early destination morning can fall before your body temperature low and push your clock the wrong way, so keep that time dim.",
  },
  {
    q: "Should I take melatonin for jet lag?",
    a: "Low doses (0.5 to 1 mg is commonly used) taken at the destination bedtime can help some people shift. Talk to a doctor about dose and timing first, especially if you take other medication, and don't give melatonin to children without medical advice.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/travel-jetlag-rapid-adaptation-guide",
    label: "The jet lag travel guide: shifting your clock about an hour a day",
  },
  {
    href: "/blog/the-avoid-light-window-jetlag",
    label: "The avoid-light window: the missing half of jet lag advice",
  },
  {
    href: "/guides/core-body-temperature-tmin-deep-sleep-guide",
    label: "Core body temperature (Tmin) and why it decides which light helps",
  },
];

export default function JetlagPlannerPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Jet Lag Planner",
          slug: "jetlag-planner",
          description:
            "Calculate the time zone shift between two cities and get daily seek-light, avoid-light, sleep and last-coffee times, shifting about an hour a day.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <JetlagPlannerClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Science of Jet Lag &amp; Phase Shifts</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Jet lag happens when your body&apos;s master clock, the suprachiasmatic nucleus (SCN) in the brain, is out of step with the day at your destination. The wall clock jumps the moment you land; your body clock moves about an hour a day.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Phase Advance vs. Phase Delay</h3>
          <p className="leading-relaxed mb-6">
            Depending on which direction you fly, your body needs to shift its clock in one of two directions:
          </p>
          <ul className="list-disc list-inside space-y-4 mb-6">
            <li>
              <strong className="text-white">Phase Advance (Flying Eastward):</strong> You need to shift your bedtime and wake time earlier. Get bright light in your body&apos;s morning. For the first days after an eastward flight that&apos;s late morning to early afternoon at your destination; keep the early destination morning dim.
            </li>
            <li>
              <strong className="text-white">Phase Delay (Flying Westward):</strong> You need to shift your bedtime and wake time later. Get bright light in the destination late afternoon or evening, which pushes your melatonin rise later and helps you stay awake, and keep the very early morning dim.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">What is Tmin (Temperature Minimum)?</h3>
          <p className="leading-relaxed mb-6">
            Your core body temperature follows a 24-hour cycle and reaches its lowest point (Tmin) roughly 2 hours before your natural wake time. Light <strong className="text-white">after</strong> Tmin advances your clock (earlier); light <strong className="text-white">before</strong> Tmin delays it (later). That&apos;s why the planner puts your seek-light window after your body&apos;s Tmin when you fly east, and why its avoid-light window matters as much as the seek-light one.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
