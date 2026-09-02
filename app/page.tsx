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
  title: "ARC 2.0 — Circadian Rhythm Tracker, Chronotype Quiz & Sleep Science",
  description:
    "You're not lazy — you're on the wrong clock. ARC 2.0 finds your chronotype (Lion, Bear, Wolf, Dolphin) and builds your day around your biology: dynamic caffeine cutoff, solar morning light Live Activity, and measured afternoon crash reduction.",
  keywords: [
    "chronotype",
    "circadian rhythm",
    "sleep tracker",
    "energy tracker",
    "caffeine timing",
    "morning light",
    "productivity",
    "focus",
    "lion chronotype",
    "bear chronotype",
    "wolf chronotype",
    "dolphin chronotype",
    "circadian rhythm tracker",
    "arc 2.0",
    "living light",
  ],
  alternates: {
    canonical: "https://arcapp.sbs",
  },
  openGraph: {
    title: "ARC 2.0 — Circadian Rhythm Tracker & Chronotype App",
    description:
      "You're not lazy. You're on the wrong clock. Discover your biological timing with ARC 2.0 Living Light.",
    type: "website",
    url: "https://arcapp.sbs",
    siteName: "ARC Circadian Rhythm Tracker",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC 2.0 — Circadian Rhythm Tracker & Chronotype App",
    description:
      "You're not lazy. You're on the wrong clock. Find your chronotype and follow your personalized day plan with ARC 2.0.",
    creator: "@iPritamX",
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
