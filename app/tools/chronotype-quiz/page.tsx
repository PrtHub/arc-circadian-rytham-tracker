import { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import ChronotypeQuizClient from "./ChronotypeQuizClient";

export const metadata: Metadata = {
  title: "Chronotype Quiz (Free) - Find Your Sleep Animal (Lion, Bear, Wolf)",
  description: "Are you a Lion, Bear, Wolf, or Dolphin? Take this free 2-minute chronotype test to discover your biological rhythm and optimize your schedule.",
  keywords: "chronotype quiz, chronotype test, am I a lion or bear, sleep animal quiz, find my chronotype, circadian rhythm test",
  alternates: {
    canonical: "/tools/chronotype-quiz",
  },
};

export default function ChronotypeQuizPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ARC Chronotype Quiz",
    "url": "https://arcapp.sbs/tools/chronotype-quiz",
    "description": "A rapid 3-question assessment to estimate your genetic chronotype (Lion, Bear, Wolf, or Dolphin) and optimize your circadian rhythm.",
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
      <ChronotypeQuizClient />
      
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What is a Chronotype?</h2>
        
        <div className="prose prose-invert prose-lg max-w-none text-[var(--fg-muted)]">
          <p className="leading-relaxed mb-6">
            Your chronotype is your genetic predisposition toward waking and sleeping at specific times. It dictates your body's natural <strong className="text-white">circadian rhythm</strong>. It is not a habit you build or a choice you make; it is a biological reality governed by your genetics (specifically, variations in the PER3 gene). Understanding whether you are naturally a morning person or a night owl is the single most important step to optimizing your life and productivity.
          </p>
          
          <h3 className="text-2xl font-bold mb-4 text-white mt-10">The Four Clinical Chronotypes</h3>
          <p className="leading-relaxed mb-6">
            While internet quizzes often simplify this, sleep scientists generally categorize humans into four distinct biological categories based on their natural cortisol and melatonin oscillations:
          </p>
          
          <div className="space-y-6">
            <div className="raised-card p-6 border-[var(--accent)]/20">
              <h4 className="text-xl font-bold text-[var(--accent)] mb-2 flex items-center gap-2">🦁 The Lion (15%)</h4>
              <p className="text-[var(--fg-muted)] text-sm leading-relaxed">Naturally wakes up very early (5 AM - 6 AM) without an alarm. They have massive morning energy and peak cognitive focus before noon, but experience a sharp crash in the late afternoon.</p>
            </div>
            
            <div className="raised-card p-6 border-[var(--accent)]/20">
              <h4 className="text-xl font-bold text-[var(--accent)] mb-2 flex items-center gap-2">🐻 The Bear (50%)</h4>
              <p className="text-[var(--fg-muted)] text-sm leading-relaxed">Follows the natural cycle of the sun. They wake up around 7 AM and have a steady energy burn throughout the day, with peak focus hitting mid-morning to early afternoon.</p>
            </div>
            
            <div className="raised-card p-6 border-[var(--accent)]/20">
              <h4 className="text-xl font-bold text-[var(--accent)] mb-2 flex items-center gap-2">🐺 The Wolf (15-20%)</h4>
              <p className="text-[var(--fg-muted)] text-sm leading-relaxed">The classic night owl. They struggle immensely to wake up before 9 AM and feel groggy all morning. Their biological peak focus window doesn't open until late afternoon or late at night.</p>
            </div>
            
            <div className="raised-card p-6 border-[var(--accent)]/20">
              <h4 className="text-xl font-bold text-[var(--accent)] mb-2 flex items-center gap-2">🐬 The Dolphin (10%)</h4>
              <p className="text-[var(--fg-muted)] text-sm leading-relaxed">Light, anxious sleepers with irregular rhythms. They often suffer from insomnia and have bursts of nervous energy rather than a steady, predictable curve.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
