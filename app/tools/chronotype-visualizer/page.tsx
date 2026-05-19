import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import VisualizerClient from "./VisualizerClient";

export const metadata: Metadata = {
  title: "Interactive Chronotype Visualizer | Free ARC Tool",
  description: "Visualize your cortisol and melatonin curves based on your chronotype. See how your body's master hormones fluctuate throughout the day.",
  keywords: "chronotype visualizer, cortisol curve, melatonin onset, circadian rhythm graph, sleep animal behavior",
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
    <div className="bg-black text-white min-h-screen" style={{ fontFamily: "var(--font-geist-sans)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <VisualizerClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter">The Dance of Cortisol and Melatonin</h2>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Your body's internal clock is driven by the precise, oscillating relationship between two master hormones: <strong>Cortisol</strong> and <strong>Melatonin</strong>. They operate as opposites on a 24-hour spectrum.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Cortisol: The Alertness Driver</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Often called the "stress hormone," cortisol is actually your primary driver of wakefulness and cognitive focus. In a healthy circadian rhythm, cortisol surges in the morning (triggered by light hitting your eyes) to clear out the chemical buildup of sleep and prepare you for action. It naturally tapers off as the day progresses.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Melatonin: The Sleep Gatekeeper</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Melatonin is the signal that tells your body it is time to sleep. It is produced by the pineal gland in response to darkness. As evening approaches and blue light fades, melatonin levels rise, causing your core body temperature to drop and preparing your brain for memory consolidation and tissue repair.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How Chronotypes Shift the Curve</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            While everyone follows this general pattern, your <strong>chronotype</strong> dictates <em>when</em> these peaks and valleys occur. A Lion's cortisol spike happens hours before a Wolf's. Trying to force a Wolf to do deep analytical work at 8:00 AM is biologically hostile because their cortisol hasn't risen yet, and melatonin may still be active in their system.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
