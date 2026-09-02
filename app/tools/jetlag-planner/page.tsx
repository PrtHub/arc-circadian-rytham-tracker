import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import JetlagPlannerClient from "./JetlagPlannerClient";

export const metadata: Metadata = {
  title: "Circadian Jetlag Recovery Planner (Free) | ARC",
  description: "Calculate and minimize travel jetlag using circadian phase advance & phase delay shift protocols. Get a personalized 3-day recovery timeline.",
  keywords: "jetlag planner, circadian rhythm shift, travel jetlag calculator, phase advance, phase delay, Andrew Huberman jetlag, flight timezone calculator",
  alternates: {
    canonical: "/tools/jetlag-planner",
  },
};

export default function JetlagPlannerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Circadian Jetlag Planner",
    "url": "https://arcapp.sbs/tools/jetlag-planner",
    "description": "Calculate timezone travel offset and generate a 3-day protocol using light and dark cycles to minimize jetlag.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All"
  };

  return (
    <div className="text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <JetlagPlannerClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Science of Jetlag & Phase Shifts</h2>

        <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
          <p className="leading-relaxed mb-6">
            Jetlag occurs when your body's master circadian clock, located in the suprachiasmatic nucleus (SCN) of the brain, is desynchronized from the actual astronomical solar day of your physical location.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Phase Advance vs. Phase Delay</h3>
          <p className="leading-relaxed mb-6">
            Depending on which direction you fly, your body needs to shift its clock in one of two directions:
          </p>
          <ul className="list-disc list-inside space-y-4 mb-6">
            <li>
              <strong className="text-white">Phase Advance (Flying Eastward):</strong> You are flying "into the future." You need to shift your bedtime and wake time earlier. To do this, get bright light early in your destination morning. Avoid light in the destination evening.
            </li>
            <li>
              <strong className="text-white">Phase Delay (Flying Westward):</strong> You are flying "back in time." You need to shift your bedtime and wake time later. To do this, get bright light in the destination late afternoon or evening. This delays your melatonin peak, helping you stay awake.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">What is Tmin (Temperature Minimum)?</h3>
          <p className="leading-relaxed mb-6">
            Your core body temperature fluctuates in a 24-hour cycle, reaching its absolute lowest point (Tmin) roughly 2 hours before your natural wake time.
            Light exposure <strong className="text-white">after</strong> Tmin advances your clock (wakes you up earlier). Light exposure <strong className="text-white">before</strong> Tmin delays your clock (wakes you up later). The Circadian Jetlag Planner uses your timezone shift to structure light exposure windows relative to this biological threshold.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
