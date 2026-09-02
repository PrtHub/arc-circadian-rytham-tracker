import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import SleepCycleCalculatorClient from "./SleepCycleCalculatorClient";

export const metadata: Metadata = {
  title: "Sleep Cycle Calculator | Wake Up Refreshed | ARC",
  description: "Calculate the exact times to fall asleep or wake up based on 90-minute sleep cycles. Minimize grogginess and protect your deep sleep.",
  keywords: "sleep cycle calculator, sleep calculator, bedtime calculator, 90 minute sleep cycle, wake up refreshed, REM sleep calculator",
  alternates: {
    canonical: "/tools/sleep-cycle-calculator",
  },
};

export default function SleepCycleCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Sleep Cycle Calculator",
    "description": "Calculate optimal bedtime and wakeup times based on 90-minute biological sleep cycles to maximize sleep efficiency and prevent sleep inertia.",
    "url": "https://arcapp.sbs/tools/sleep-cycle-calculator",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires HTML5 support",
  };

  return (
    <div className="text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main className="py-12">
        <SleepCycleCalculatorClient />
      </main>
      <Footer />
    </div>
  );
}
