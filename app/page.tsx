import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Problem } from "@/components/Problem";
import { Chronotypes } from "@/components/Chronotypes";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Science } from "@/components/Science";
import { Testimonials } from "@/components/Testimonials";
import { Audience } from "@/components/Audience";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { jsonLdApp, jsonLdFaq, jsonLdOrganization, jsonLdWebPage } from "@/components/arc-data";

export const metadata: Metadata = {
  title: "ARC — Circadian Rhythm & Sleep | Energy Tracker & Chronotype",
  description:
    "You're not lazy — you're on the wrong clock. ARC finds your chronotype and builds your day around your real biological rhythm: when to get light, drink coffee, focus, and sleep.",
  keywords:
    "chronotype, circadian rhythm, sleep, energy, caffeine timing, morning light, productivity, focus, lion chronotype, bear chronotype, wolf chronotype, dolphin chronotype, circadian rhythm tracker",
  alternates: {
    canonical: "https://arcapp.sbs",
  },
  openGraph: {
    title: "ARC — Circadian Rhythm & Sleep",
    description:
      "You're not lazy. You're on the wrong clock. Find your biological timing with ARC.",
    type: "website",
    url: "https://arcapp.sbs",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC — Circadian Rhythm & Sleep",
    description:
      "You're not lazy. You're on the wrong clock. Discover your chronotype with ARC.",
  },
};

export default function ArcPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdApp) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <div className="min-h-screen">
        <Nav />
        <main>
          <Hero />
          <SocialProof />
          <Problem />
          <Chronotypes />
          <Features />
          <HowItWorks />
          <Science />
          <Testimonials />
          <Audience />
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
      </div>
    </>
  );
}
