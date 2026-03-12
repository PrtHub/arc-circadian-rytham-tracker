import type { Metadata } from "next";

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { SocialProof } from "@/components/SocialProof";
import { Screenshots } from "@/components/Screenshots";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Chronotypes } from "@/components/Chronotypes";
import { Highlights } from "@/components/Highlights";
import { Science } from "@/components/Science";
import { Audience } from "@/components/Audience";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { jsonLdApp, jsonLdFaq, jsonLdOrganization, jsonLdWebPage } from "@/components/arc-data";

export const metadata: Metadata = {
  title: "ARC: Circadian Rhythm Tracker — Sync Your Biology, Peak Every Day",
  description:
    "Stop fighting your biology. ARC maps your Perfect Day using chronobiology. Discover your chronotype (Lion, Bear, Wolf, or Dolphin), find Peak Focus Windows, optimize caffeine cutoff, and anchor your sleep-wake cycle. Science-backed, privacy-first iOS app.",
  keywords:
    "circadian rhythm tracker, chronotype test, chronotype quiz, sleep optimization, peak focus windows, caffeine timing, biohacking app, iOS health app, chronobiology, circadian rhythm app, lion chronotype, bear chronotype, wolf chronotype, dolphin chronotype, sleep science, cortisol rhythm, melatonin optimization",
  openGraph: {
    title: "ARC: Circadian Rhythm Tracker",
    description:
      "Discover your chronotype and unlock peak performance. Built on Stanford & UC Berkeley sleep science.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC: Circadian Rhythm Tracker",
    description:
      "Discover your chronotype. Find your Peak Focus Windows. Optimize caffeine timing.",
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

      <div className="bg-black text-white min-h-screen" style={{ fontFamily: "var(--font-geist-sans)" }}>
        <Nav />
        <main>
          <Hero />
          <SocialProof />
          <Screenshots />
          <Features />
          <HowItWorks />
          <Chronotypes />
          <Highlights />
          <Science />
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
