import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import SleepDebtClient from "./SleepDebtClient";

export const metadata: Metadata = {
  title: "Sleep Debt Calculator (Free) - Calculate Your Sleep Deficit",
  description: "Calculate your cumulative sleep debt and deficit over the last 5 days. Get a science-backed sleep recovery plan to catch up safely.",
  keywords: "sleep debt calculator, sleep deprivation test, calculate sleep debt, how to catch up on sleep, sleep tracker tool",
  alternates: {
    canonical: "/tools/sleep-debt-calculator",
  },
};

export default function SleepDebtPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Sleep Debt Calculator",
    "url": "https://arcapp.sbs/tools/sleep-debt-calculator",
    "description": "A free tool to calculate cumulative sleep debt and receive safe recovery advice based on circadian biology.",
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
      <SleepDebtClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What is Sleep Debt?</h2>
        
        <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Sleep debt</strong> is the difference between the amount of sleep your body biologically needs and the amount you actually get. It is cumulative. If you need 8 hours of sleep per night but only get 6 hours on Monday, you start Tuesday with a 2-hour sleep debt.
          </p>
          <p className="leading-relaxed mb-6">
            Many people treat sleep like a bank account, assuming they can deposit extra hours on the weekend to clear the debt. However, circadian biology does not work this way.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">The Myth of "Catching Up"</h3>
          <p className="leading-relaxed mb-6">
            When you attempt to pay back a week's worth of sleep debt by sleeping in for 10 hours on Saturday and Sunday, you commit a secondary circadian offense known as <em className="text-white">Social Jetlag</em>. This shifts your biological clock later, making it harder to fall asleep on Sunday night and guaranteeing you will be sleep-deprived again on Monday morning.
          </p>
          <p className="leading-relaxed mb-6">
            Research shows that while catch-up sleep can reduce daytime sleepiness, it does not reverse the metabolic disruption, insulin resistance, or cognitive deficits caused by chronic sleep debt.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How to Safely Recover from Sleep Debt</h3>
          <ol className="space-y-3 mb-6 list-decimal pl-5">
            <li><strong className="text-white">Maintain Consistent Wake Times:</strong> Do not sleep in by more than 60 minutes on weekends, even if you are tired.</li>
            <li><strong className="text-white">Add Sleep at the Beginning:</strong> Go to bed 30-60 minutes earlier than usual rather than waking up later.</li>
            <li><strong className="text-white">Strategic Napping:</strong> Take a short 20-30 minute power nap before 3:00 PM to take the edge off fatigue without destroying evening sleep pressure.</li>
          </ol>
        </div>
      </section>

      <Footer />
    </div>
  );
}
