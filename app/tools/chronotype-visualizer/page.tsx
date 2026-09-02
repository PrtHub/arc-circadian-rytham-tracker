import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import VisualizerClient from "./VisualizerClient";

export const metadata: Metadata = {
  title: "Chronotype Visualizer (Free) - Cortisol & Melatonin Graph",
  description: "Interactive chronotype visualizer. Slide through the day to graph your cortisol and melatonin hormones based on your biological animal type.",
  keywords: "chronotype visualizer, cortisol curve, melatonin onset, circadian rhythm graph, sleep animal behavior",
  alternates: {
    canonical: "/tools/chronotype-visualizer",
  },
};

export default function VisualizerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Chronotype Visualizer",
    "url": "https://arcapp.sbs/tools/chronotype-visualizer",
    "description": "An interactive tool to visualize hormonal fluctuations (cortisol and melatonin) throughout the day based on biological chronotypes.",
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
      <VisualizerClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Dance of Cortisol and Melatonin</h2>
        
        <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
          <p className="leading-relaxed mb-6">
            Your body's internal clock is driven by the precise, oscillating relationship between two master hormones: <strong className="text-white">Cortisol</strong> and <strong className="text-white">Melatonin</strong>. They operate as opposites on a 24-hour spectrum.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Cortisol: The Alertness Driver</h3>
          <p className="leading-relaxed mb-6">
            Often called the "stress hormone," cortisol is actually your primary driver of wakefulness and cognitive focus. In a healthy circadian rhythm, cortisol surges in the morning (triggered by light hitting your eyes) to clear out the chemical buildup of sleep and prepare you for action. It naturally tapers off as the day progresses.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Melatonin: The Sleep Gatekeeper</h3>
          <p className="leading-relaxed mb-6">
            Melatonin is the signal that tells your body it is time to sleep. It is produced by the pineal gland in response to darkness. As evening approaches and blue light fades, melatonin levels rise, causing your core body temperature to drop and preparing your brain for memory consolidation and tissue repair.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How Chronotypes Shift the Curve</h3>
          <p className="leading-relaxed mb-6">
            While everyone follows this general pattern, your <strong className="text-white">chronotype</strong> dictates <em>when</em> these peaks and valleys occur. A Lion's cortisol spike happens hours before a Wolf's. Trying to force a Wolf to do deep analytical work at 8:00 AM is biologically hostile because their cortisol hasn't risen yet, and melatonin may still be active in their system.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
