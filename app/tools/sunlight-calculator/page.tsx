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
import SunlightCalculatorClient from "./SunlightCalculatorClient";

export const metadata = toolMetadata({
  slug: "sunlight-calculator",
  title: "Morning Sunlight Calculator: When & How Long to Go Out",
  description:
    "See today's sunrise in your city, when to step outside after waking, and how long to stay out: about 20 minutes, longer under cloud. No location needed.",
  keywords:
    "morning sunlight calculator, sunrise time today, how long morning sunlight, morning light exposure, when to get morning sunlight",
});

const FAQS: ToolFaq[] = [
  {
    q: "What time is sunrise where I live?",
    a: "Pick your nearest city and a date in the calculator above. It works out sunrise with the standard solar formula, in your city's local time including daylight saving, without asking for your location.",
  },
  {
    q: "How long should I get morning sunlight?",
    a: "About 20 minutes outside in the morning, ideally within an hour of waking. Stay out longer under heavy cloud. That's the dose ARC's morning light timer uses.",
  },
  {
    q: "Does morning light still count on a cloudy day?",
    a: "Yes. Even an overcast sky is usually far brighter than indoor lighting, so it still helps; you just need more time outside, often 30 minutes or more.",
  },
  {
    q: "Can I get morning light through a window?",
    a: "Not much. Indoors, even next to a window, light is usually many times dimmer than outside, so step outside if you can. Glasses and contact lenses are fine; skip sunglasses if it's safe to, and never look directly at the sun.",
  },
  {
    q: "What if I wake up before sunrise?",
    a: "Turn on bright indoor lights, then get outside once the sun is up. Some people use a 10,000 lux light box; check with a doctor first if you have an eye condition or bipolar disorder.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/morning-sunlight-lux-protocol-guide",
    label: "The morning sunlight and lux guide",
  },
  {
    href: "/blog/science-of-morning-sunlight-productivity-hack",
    label: "The science of morning sunlight",
  },
  {
    href: "/blog/huberman-morning-routine-app",
    label: "The Huberman morning routine, and how ARC automates it",
  },
  {
    href: "/guides/seasonal-affective-disorder-winter-circadian-guide",
    label: "Dark winter mornings and your body clock",
  },
];

export default function SunlightCalculatorPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Morning Sunlight Calculator",
          slug: "sunlight-calculator",
          description:
            "A free tool to estimate how long to spend outside in the morning for today's weather, anchored on a 20-minute daily dose.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <SunlightCalculatorClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Science of Morning Light</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Light is the main signal that sets your circadian rhythm. Specialised cells in your retina called ipRGCs (intrinsically photosensitive retinal ganglion cells) don&apos;t help you see shapes; they measure how bright your surroundings are, and they&apos;re most sensitive to blue-cyan light. Their signal tells your brain&apos;s master clock what time of day it is.
          </p>
          <p className="leading-relaxed mb-6">
            Andrew Huberman often stresses getting outdoor daylight within an hour of waking, and it&apos;s one of the most useful habits for sleep timing, mood and energy.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why Does Weather Matter?</h3>
          <p className="leading-relaxed mb-6">
            Light intensity is measured in <strong className="text-white">lux</strong>. Outside on a clear morning, looking toward the sky (not at the sun), you&apos;re typically getting 10,000 lux or more. Under heavy overcast it can drop to around 1,000 lux, which is still brighter than most indoor lighting.
          </p>
          <p className="leading-relaxed mb-6">
            Morning light strengthens the morning cortisol rise and sets the timer for tonight&apos;s melatonin. The dimmer the sky, the longer it takes to get the same effect, so on cloudy days you stay out longer.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Rules for Morning Light</h3>
          <ol className="space-y-3 mb-6 list-decimal pl-5">
            <li><strong className="text-white">Be Outside:</strong> Indoors, even next to a window, light is usually many times dimmer than outside, so step outside.</li>
            <li><strong className="text-white">Skip Sunglasses if You Can:</strong> Sunglasses cut the light that reaches your eyes. Clear prescription glasses or contacts are fine.</li>
            <li><strong className="text-white">Never Look at the Sun:</strong> Look around you or toward the sky, but never directly at the sun, which can damage your eyes.</li>
          </ol>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
