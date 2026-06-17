import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import ChronotypeCompatibilityClient from "./ChronotypeCompatibilityClient";

export const metadata: Metadata = {
  title: "Chronotype Compatibility Quiz (Free) | ARC",
  description: "Find out if your sleep schedules align with your partner. Calculate compatibility scores for Lion, Bear, Wolf, and Dolphin pairings, and see alertness overlaps.",
  keywords: "chronotype compatibility quiz, sleep schedule compatibility, partner sleep styles, Lion Bear Wolf Dolphin compatibility, relationship sleep compatibility",
  alternates: {
    canonical: "/tools/chronotype-compatibility",
  },
};

export default function ChronotypeCompatibilityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Chronotype Compatibility Quiz",
    "url": "https://arcapp.sbs/tools/chronotype-compatibility",
    "description": "Calculate relationship/cohabitation compatibility scores and optimize sleep alignment between different chronotypes.",
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
      <ChronotypeCompatibilityClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter">The Science of Chronotype Alignment</h2>

        <div className="prose prose-invert prose-lg max-w-none text-zinc-400">
          <p className="leading-relaxed mb-6">
            Chronotype compatibility is one of the most overlooked components of relationship satisfaction and cohabitation hygiene. When partners have conflicting internal clocks (e.g. an early-rising <strong>Lion</strong> living with a late-night <strong>Wolf</strong>), it creates natural friction points known as "circadian misalignment."
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Understanding the Pairings</h3>
          <ul className="list-disc list-inside space-y-4 mb-6">
            <li>
              <strong>Matched Chronotypes (e.g. Bear & Bear):</strong> Benefit from identical energy trajectories. They feel alert at the same hours, prefer to eat meals at the same times, and have aligned bedtimes, resulting in natural harmony.
            </li>
            <li>
              <strong>Opposite Chronotypes (e.g. Lion & Wolf):</strong> Have the largest bedtime offset (often 2-3 hours). While this allows for independent focused time, it can cause sleep disruption when one partner goes to bed or wakes up while the other is sleeping.
            </li>
            <li>
              <strong>Sensitive Pairings (involving Dolphins):</strong> Dolphins are highly sensitive, light sleepers. Any chronotype paired with a Dolphin must practice strict noise and light hygiene to prevent chronic sleep fragmentation.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How to Navigate Conflict</h3>
          <p className="leading-relaxed mb-6">
            Misalignment doesn't mean incompatibility. Partners can thrive by setting boundaries: protecting the early sleeper's wind-down zone, using white noise machines, utilizing separate blankets (the Scandinavian Sleep Method), or respecting independent high-productivity hours without feeling neglected.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
