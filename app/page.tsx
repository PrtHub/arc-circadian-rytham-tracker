import type { Metadata } from "next";
import "./landing.css";
import { LANDING_HTML } from "@/components/landing/landing-html";
import { LandingInteractive } from "@/components/landing/LandingInteractive";
import { SectionViewTracker } from "@/components/SectionViewTracker";
import {
  jsonLdApp,
  jsonLdFaq,
  jsonLdOrganization,
  jsonLdWebPage,
} from "@/components/arc-data";

export const metadata: Metadata = {
  title: "ARC – Circadian Rhythm Tracker",
  description:
    "ARC tells you why you feel tired right now, gives you the one thing worth doing about it, and shows you over the weeks whether it’s working. Circadian rhythm tracker for iPhone.",
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
    "arc",
    "living light",
  ],
  alternates: {
    canonical: "https://arccircadian.com",
  },
  openGraph: {
    title: "ARC – Circadian Rhythm Tracker",
    description:
      "You’re not lazy. You’re on the wrong clock. ARC plans your day around your chronotype, your coffee and the dip you actually have.",
    type: "website",
    url: "https://arccircadian.com",
    siteName: "ARC",
    locale: "en_US",
    images: [
      {
        url: "https://arccircadian.com/og.png",
        width: 1200,
        height: 630,
        alt: "ARC – Circadian Rhythm Tracker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ARC – Circadian Rhythm Tracker",
    description:
      "You’re not lazy. You’re on the wrong clock. ARC plans your day around your chronotype, your coffee and the dip you actually have.",
    creator: "@iPritamX",
    images: ["https://arccircadian.com/og.png"],
  },
  verification: {
    google: [
      "woQNSq6mTWzcznfxJsGOL1OTaKkR9-lvI01rFSTPBWs",
      "449Ube5J9JufizV9AJmYfoLHV7TbE7aqryFLe9f_aF0",
    ],
  },
  other: {
    "apple-itunes-app": "app-id=6758214892",
  },
};

export default function ArcPage() {
  return (
    <>
      <meta
        name="google-site-verification"
        content="woQNSq6mTWzcznfxJsGOL1OTaKkR9-lvI01rFSTPBWs"
      />
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

      <div
        className="landing-page"
        dangerouslySetInnerHTML={{ __html: LANDING_HTML }}
      />
      <LandingInteractive />
      <SectionViewTracker />
    </>
  );
}
