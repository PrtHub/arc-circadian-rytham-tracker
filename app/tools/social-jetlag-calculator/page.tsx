import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import SocialJetlagClient from "./SocialJetlagClient";

export const metadata: Metadata = {
  title: "Social Jetlag Calculator (Free) - Measure Weekend Sleep Shift",
  description: "Calculate your social jetlag to see how your weekend sleep-in habits shift your internal circadian clock. Fix Monday morning fatigue.",
  keywords: "social jetlag calculator, weekend sleep in, monday morning fatigue, fix sleep schedule, circadian rhythm shift",
  alternates: {
    canonical: "/tools/social-jetlag-calculator",
  },
};

export default function SocialJetlagPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Social Jetlag Calculator",
    "url": "https://arcapp.sbs/tools/social-jetlag-calculator",
    "description": "A free tool to calculate the exact hours of social jetlag induced by sleeping in on weekends, and its metabolic impact.",
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
      <SocialJetlagClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What is Social Jetlag?</h2>
        
        <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
          <p className="leading-relaxed mb-6">
            <strong className="text-white">Social jetlag</strong> occurs when your biological time (your body's natural circadian rhythm) is misaligned with your social time (the schedule dictated by your job, school, or weekend plans). 
          </p>
          <p className="leading-relaxed mb-6">
            If you wake up at 6:30 AM for work Monday through Friday, but stay up late and sleep in until 9:30 AM on Saturday and Sunday, you have just shifted your biological clock by 3 hours. To your brain and metabolism, this is the exact physiological equivalent of flying from New York to Los Angeles on Friday night, and flying back on Sunday night. 
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why does it matter?</h3>
          <p className="leading-relaxed mb-6">
            Your brain does not know what a "weekend" is. It relies on consistent environmental cues (light and temperature) to release hormones like cortisol and melatonin. When you shift your schedule on weekends, you delay your body's natural <em className="text-white">Temperature Minimum</em> and melatonin onset. This is why you cannot fall asleep on Sunday night, leading to massive sleep deprivation on Monday morning.
          </p>
          <p className="leading-relaxed mb-6">
            Chronic social jetlag is strongly correlated with metabolic disruption, weight gain, increased resting heart rate, and severe cognitive deficits early in the week.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">The 1-Hour Rule</h3>
          <p className="leading-relaxed mb-6">
            The golden rule of circadian biology is consistency. To eliminate social jetlag, your weekend wake time should never differ from your weekday wake time by more than <strong className="text-white">60 minutes</strong>. If you must sleep in, you need to use aggressive morning sunlight exposure immediately upon waking to anchor your rhythm and prevent it from drifting further.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
