import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import SunlightCalculatorClient from "./SunlightCalculatorClient";

export const metadata: Metadata = {
  title: "Sunlight Window Calculator | Free ARC Tool",
  description: "Calculate how much morning sunlight you need based on the weather to set your circadian rhythm and boost energy.",
  keywords: "sunlight calculator, morning sunlight duration, Huberman protocol, circadian rhythm light, set internal clock",
};

export default function SunlightCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Sunlight Window Calculator",
    "url": "https://arcapp.sbs/tools/sunlight-calculator",
    "description": "A free tool to calculate the required duration of morning sunlight exposure based on weather conditions to optimize circadian health.",
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
      <SunlightCalculatorClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter">The Science of Light Viewing</h2>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-zinc-400 leading-relaxed mb-6">
            Light is the primary driver of your circadian rhythm. When photons hit your eyes, they stimulate specialized cells called ipRGCs (intrinsically photosensitive retinal ganglion cells). These cells don't help you see shapes; they detect the presence of blue-wavelength light and tell your brain what time of day it is.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            According to neurobiologists like Dr. Andrew Huberman, getting bright light in your eyes within an hour of waking is the single most important habit for sleep, mood, and energy.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why Does Weather Matter?</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">
            The intensity of light is measured in <strong>lux</strong>. On a clear, sunny day, looking toward the sky (not directly at the sun) provides roughly 10,000 to 50,000 lux. On a heavy overcast day, that intensity drops to about 1,000 lux.
          </p>
          <p className="text-zinc-400 leading-relaxed mb-6">
            Your brain needs a certain cumulative threshold of photons to trigger the cortisol spike and stop melatonin production. If it's cloudy, you simply need to stand outside longer to get the same biological effect.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Rules for Light Viewing</h3>
          <ol className="text-zinc-400 space-y-3 mb-6 list-decimal pl-5">
            <li><strong>Be Outside:</strong> Window glass filters out the blue light wavelengths required to reset your clock. You must be outdoors.</li>
            <li><strong>No Sunglasses:</strong> Sunglasses block the light your brain needs. Clear prescription glasses or contacts are perfectly fine.</li>
            <li><strong>Do Not Stare at the Sun:</strong> Look toward the sky, but never directly at the sun to avoid retinal damage.</li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
