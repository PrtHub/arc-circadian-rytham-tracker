import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import CaffeineCalculatorClient from "./CaffeineCalculatorClient";

export const metadata: Metadata = {
  title: "Caffeine Half-Life Calculator | Free ARC Tool",
  description: "Calculate your exact caffeine cutoff time. Enter your bedtime and drink strength to find out when to stop drinking coffee to protect your deep sleep.",
  keywords: "caffeine half life calculator, when to stop drinking coffee, caffeine cutoff time, sleep tracker tool, caffeine decay calculator",
};

export default function CaffeineCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Caffeine Half-Life Calculator",
    "url": "https://arcapp.sbs/tools/caffeine-calculator",
    "description": "A free tool to calculate when to stop drinking coffee to protect deep sleep, based on the 6-hour half-life of caffeine.",
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
      <CaffeineCalculatorClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter">The Science Behind the Calculator</h2>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Caffeine operates like a pharmaceutical with a specific <strong>half-life</strong>, typically around 5 to 7 hours for a healthy adult. This means 6 hours after you finish your coffee, exactly half of the caffeine is still active in your bloodstream, blocking adenosine receptors and preventing restorative deep sleep.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why is my cutoff time so early?</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            To achieve high-quality sleep, your active caffeine levels should ideally be below 25mg at bedtime. If you consume a 200mg energy drink at 3:00 PM, you will still have over 80mg active in your system at 11:00 PM. Our calculator does the exponential decay math for you, ensuring you hit that zero-point exactly when you need to sleep.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How does this affect my Circadian Rhythm?</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Caffeine doesn't give you energy; it borrows it from tomorrow. It binds to adenosine receptors (the chemical that makes you feel tired). When the caffeine finally wears off, all that built-up adenosine floods your receptors, causing a crash. Mismanaging this cycle disrupts your core temperature minimum and delays your natural melatonin release, throwing your entire circadian rhythm out of sync.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
