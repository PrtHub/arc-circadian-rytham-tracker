import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import SleepCocktailClient from "./SleepCocktailClient";

export const metadata: Metadata = {
  title: "Sleep Cocktail Builder & Dosage Calculator | ARC",
  description: "Optimize dosages, safety, and timings of science-backed sleep compounds. Get a personalized sleep stack guide based on Andrew Huberman's protocols.",
  keywords: "sleep cocktail builder, Huberman sleep stack, magnesium L-threonate, L-theanine, apigenin, inositol, sleep supplement dosage",
  alternates: {
    canonical: "/tools/sleep-cocktail",
  },
};

export default function SleepCocktailPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Sleep Cocktail Builder",
    "url": "https://arcapp.sbs/tools/sleep-cocktail",
    "description": "A tool to calculate personalized dosages and timings of recommended sleep compounds based on individual sleep challenges.",
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
      <SleepCocktailClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Science of Sleep Compounds</h2>

        <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
          <p className="leading-relaxed mb-6">
            The Sleep Cocktail, popularized by Stanford neurobiologist <strong className="text-white">Dr. Andrew Huberman</strong>, is a set of natural compounds designed to support sleep quality without the grogginess or dependency of prescription sedatives or high-dose melatonin.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How the Compounds Work</h3>
          <ul className="list-disc list-inside space-y-4 mb-6">
            <li>
              <strong className="text-white">Magnesium L-Threonate / Bisglycinate:</strong> Magnesium supports the activation of the parasympathetic nervous system. L-Threonate specifically crosses the blood-brain barrier to calm central nervous system activity, while Bisglycinate has high systemic bioavailability to relax muscle tissue.
            </li>
            <li>
              <strong className="text-white">L-Theanine:</strong> An amino acid that promotes relaxation by increasing GABA and alpha brainwave activity. It turns off the "racing mind" feeling.
            </li>
            <li>
              <strong className="text-white">Apigenin:</strong> Derived from chamomile, it binds to specific receptors in the brain to reduce latency (how long it takes to fall asleep).
            </li>
            <li>
              <strong className="text-white">Inositol:</strong> A naturally occurring sugar-like compound that enhances sleep depth and helps you transition back to sleep if you wake up in the night.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why Avoid Melatonin?</h3>
          <p className="leading-relaxed mb-6">
            Commercial melatonin supplements typically contain supra-physiological doses (3mg to 10mg), which is 10x to 50x what the human pineal gland naturally produces. This can desensitize melatonin receptors and disrupt endogenous hormone production over time.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
