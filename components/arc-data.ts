export const APP_STORE_URL =
  "https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892";

export const screenshots = [
  {
    src: "/01.png",
    alt: "Stop Fighting Your Body — ARC home screen with Bear chronotype, active protocol block and sunlight countdown",
  },
  {
    src: "/02.png",
    alt: "Catch the Morning Light — ARC sunlight timer with 16-minute countdown and progress ring",
  },
  {
    src: "/03.png",
    alt: "Track Your Caffeine — ARC live caffeine decay tracker showing 63mg active and sleep-safe prediction",
  },
  {
    src: "/04.png",
    alt: "Never Miss Your Window — ARC smart iOS notifications for coffee time, caffeine wall, and wind-down",
  },
  {
    src: "/05.png",
    alt: "Find Your Chronotype — ARC Wolf chronotype reveal with personalized schedule explanation",
  },
];

export const features = [
  {
    icon: "🎯",
    title: "32-Step Personalized Onboarding",
    desc: "Builds your full biological profile — sleep schedule, energy map, caffeine habits, lifestyle context — before the first paywall.",
  },
  {
    icon: "🕐",
    title: "Dynamic Daily Trajectory",
    desc: "A live 24-hour timeline of biological missions — from sunrise to sleep.",
  },
  {
    icon: "🦁",
    title: "Chronotype Discovery",
    desc: "Lion, Bear, Wolf, or Dolphin — your identity mapped to your biology.",
  },
  {
    icon: "☕",
    title: "Caffeine Scrubber & Forecast",
    desc: "Log each drink. Watch the live 12-hour SVG decay curve and drag anywhere on the curve to see exact future mg levels.",
  },
  {
    icon: "🤖",
    title: "AI Intelligence Layer",
    desc: "Personalized morning debrief and on-demand fatigue diagnosis powered by Google Gemini via OpenRouter.",
  },
  {
    icon: "⚡",
    title: "Peak Focus Windows",
    desc: "Scientifically timed deep work intervals when your brain is sharpest.",
  },
  {
    icon: "☀️",
    title: "Morning Sunlight Anchoring",
    desc: "Cortisol & melatonin rhythm optimization starting the moment you wake.",
  },
  {
    icon: "😴",
    title: "Manual Sleep Check-in",
    desc: "Rate last night's sleep each morning. Poor sleep triggers recovery-mode protocol adjustments.",
  },
  {
    icon: "📡",
    title: "Contextual Intel Feed",
    desc: "Daily briefings driven by your actual yesterday — not a static article library. Behavior-aware coaching that adapts.",
  },
  {
    icon: "📊",
    title: "Actionable Insights",
    desc: "Sync score overlays, photon latency bars, anchor stability lines, and weekly reports with recommendations.",
  },
  {
    icon: "🔬",
    title: "Biological Briefings",
    desc: "Context-aware coaching with the peer-reviewed science behind each action.",
  },
  {
    icon: "🔒",
    title: "Local-First Architecture",
    desc: "SQLite on-device storage. Your biological data never leaves your phone.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Take the Diagnosis",
    desc: "Answer 32 science-backed questions about your sleep, energy patterns, caffeine habits, and lifestyle. ARC builds your full biological profile — the longest onboarding in the category.",
  },
  {
    step: "02",
    title: "Discover Your Chronotype",
    desc: "Find out if you're a Lion, Bear, Wolf, or Dolphin — and what it means for your daily schedule and peak performance windows.",
  },
  {
    step: "03",
    title: "Follow Your Daily Trajectory",
    desc: "Get a live 24-hour protocol with Peak Focus Windows, caffeine decay tracking, sunlight timer toward your 20-min morning target, and smart wind-down notifications.",
  },
];

export const chronotypes = [
  {
    icon: "🦁",
    name: "Lion",
    tagline: "Early Riser",
    desc: "Early riser, peaks before noon, fades by evening.",
  },
  {
    icon: "🐻",
    name: "Bear",
    tagline: "Solar Rhythm",
    desc: "Follows the sun; most of the world runs on Bear time.",
  },
  {
    icon: "🐺",
    name: "Wolf",
    tagline: "Night Owl",
    desc: "Slow mornings, sharp late — built for the night.",
  },
  {
    icon: "🐬",
    name: "Dolphin",
    tagline: "Light Sleeper",
    desc: "Light, sensitive sleeper with a busy mind.",
  },
];

export const highlights = [
  {
    title: "Science-Backed, Not Guesswork",
    desc: "Built on peer-reviewed circadian research from Stanford Neuroscience and UC Berkeley Sleep Science. Every recommendation has a citation.",
  },
  {
    title: "Privacy-First Architecture",
    desc: "All data stays on your device with local-first SQLite storage. No cloud sync, no data harvesting — ever.",
  },
  {
    title: "Not Another Habit Tracker",
    desc: "ARC doesn't just track what you do — it tells you when to do it. Aligned with your biology, not arbitrary goals.",
  },
  {
    title: "Built for High Performers",
    desc: "Designed for founders, creators, and biohackers who treat their energy like a resource — not an afterthought.",
  },
];

export const audience = [
  {
    icon: "🚀",
    title: "High-Performers",
    desc: "Founders, engineers, and creators who need maximum focus hours. ARC maps your peak windows so you stop guessing.",
    slug: "founders",
  },
  {
    icon: "☕",
    title: "Coffee Drinkers",
    desc: "You drink coffee every day but have never understood how it actually interacts with your sleep. ARC shows you the exact cutoff minute.",
    slug: "coffee-drinkers",
  },
  {
    icon: "🧠",
    title: "ADHD Professionals",
    desc: "Structured visual missions replace overwhelming to-do lists. Biology-aligned triggers your brain actually responds to.",
    slug: "adhd",
  },
  {
    icon: "😴",
    title: "Sleep Seekers",
    desc: "Sleeping 7-8 hours but still exhausted? It's a timing problem, not a duration problem. ARC fixes the root cause.",
    slug: "sleep-seekers",
  },
  {
    icon: "🧬",
    title: "Biohackers",
    desc: "Real data and correlations — not just streaks and checkboxes. Understand the cortisol-melatonin rhythm driving your entire day.",
    slug: "biohackers",
  },
  {
    icon: "🐺",
    title: "Shift Workers",
    desc: "Design your flexible schedule around biology, not just calendar availability. Anchor your rhythm regardless of when you wake up.",
    slug: "shift-workers",
  },
];

export const notifications = [
  {
    time: "~90 min after wake",
    title: "Coffee time",
    body: "Your adenosine has cleared. Coffee now gives you clean energy without the afternoon crash.",
    color: "#CCFF00",
  },
  {
    time: "~early afternoon",
    title: "Caffeine wall — stop now",
    body: "Every coffee after this point costs you 15–20 min of deep sleep. Your cutoff is now.",
    color: "#ff6b35",
  },
  {
    time: "~1 hr before sleep",
    title: "Start winding down",
    body: "Melatonin production is ramping up. Dim lights and reduce screen brightness.",
    color: "#a78bfa",
  },
];

export const plans = [
  {
    name: "Weekly",
    price: "$4.99",
    period: "/ week",
    highlight: false,
    badge: null as string | null,
    note: "Cancel anytime",
  },
  {
    name: "Annual",
    price: "$39.99",
    period: "/ year",
    highlight: true,
    badge: "Most Popular" as string | null,
    note: "~$0.58 / week • Save 88%",
  },
];

export const faqs = [
  {
    q: "What's a chronotype?",
    a: "Your body's natural timing type — when you're wired to sleep, wake, and peak. ARC sorts you into one of four (Lion, Bear, Wolf, Dolphin).",
  },
  {
    q: "Do I need a wearable?",
    a: "No. ARC works from a few simple inputs and gets smarter as you log.",
  },
  {
    q: "Does it work for shift workers?",
    a: "Yes — there's a dedicated night-shift protocol that inverts the guidance safely.",
  },
  {
    q: "Will it wake me up / is it an alarm?",
    a: "No. ARC is a coach, not an alarm clock — gentle, well-timed nudges you fully control.",
  },
  {
    q: "Is my data private?",
    a: "Your data stays on your device. See our Privacy Policy.",
  },
  {
    q: "How do I cancel?",
    a: "Anytime, through your App Store subscription settings.",
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export const jsonLdApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ARC: Circadian Rhythm Tracker",
  alternateName: ["ARC Circadian Rhythm Tracker", "ARC Sync Your Life"],
  operatingSystem: "iOS 16.0 or later",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Lifestyle",
  softwareVersion: "1.0.9",
  inLanguage: "en-US",
  countriesSupported: "US, CA, GB, AU, IN",
  description:
    "Stop fighting your body. ARC syncs your schedule with your biology using a 32-step personalized onboarding. Discover if you're a Lion, Bear, Wolf, or Dolphin — then get a live daily protocol with caffeine decay tracking, sunlight timer, and smart notifications timed to your biology.",
  url: APP_STORE_URL,
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  featureList: [
    "32-Step Personalized Onboarding",
    "Dynamic 24-Hour Daily Trajectory",
    "Chronotype Discovery: Lion, Bear, Wolf, Dolphin",
    "Live Caffeine Decay Curve with Tap-to-Scrub Gesture & Sleep-Safe Prediction",
    "AI Intelligence Layer with Morning Debrief & Fatigue Diagnosis",
    "Peak Focus Windows for Deep Work",
    "Morning Sunlight Anchoring Protocol",
    "Manual Sleep Check-in with Recovery Mode",
    "Contextual Intel Feed — Behavior-Aware Briefings",
    "Adaptive Protocols: Weekend, Travel, Recovery",
    "Biological Briefings with Science Citations",
    "Local-First SQLite Storage — Zero Cloud Sync",
    "Adenosine Clear Timing",
    "Digital Sunset Protocol",
    "Melatonin Optimization",
    "Social Jetlag Tracking",
    "Smart Notifications: Sunlight, Caffeine, Wind-Down",
  ],
  screenshot: screenshots.map((s) => ({
    "@type": "ImageObject",
    url: `${SITE_URL}${s.src}`,
    description: s.alt,
  })),
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      name: "Free Tier",
      description:
        "Core chronotype discovery and daily trajectory — free forever.",
    },
    {
      "@type": "Offer",
      price: "4.99",
      priceCurrency: "USD",
      name: "ARC Pro — Weekly",
      billingIncrement: "P1W",
      description: "Cancel anytime.",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      name: "ARC Pro — Monthly",
      billingIncrement: "P1M",
      description: "Cancel anytime.",
    },
    {
      "@type": "Offer",
      price: "29.99",
      priceCurrency: "USD",
      name: "ARC Pro — Annual",
      billingIncrement: "P1Y",
      description: "Save 88% vs weekly. Best value.",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "201",
    bestRating: "5",
    worstRating: "1",
  },
  author: {
    "@type": "Person",
    name: "Pritam",
    email: "pritamfinds@gmail.com",
  },
  publisher: {
    "@type": "Organization",
    name: "ARC",
    url: SITE_URL,
  },
};

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ARC",
  url: SITE_URL,
  logo: `${SITE_URL}/icon.png`,
  contactPoint: {
    "@type": "ContactPoint",
    email: "pritamfinds@gmail.com",
    contactType: "customer support",
  },
  sameAs: [APP_STORE_URL],
};

export const jsonLdWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "ARC: Circadian Rhythm Tracker — Sync Your Biology, Peak Every Day",
  description:
    "Stop fighting your biology. ARC maps your Perfect Day using chronobiology. Discover your chronotype, find Peak Focus Windows, and anchor your sleep-wake cycle.",
  url: SITE_URL,
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    name: "ARC Circadian Rhythm Tracker",
    url: SITE_URL,
  },
  about: {
    "@type": "SoftwareApplication",
    name: "ARC: Circadian Rhythm Tracker",
    url: APP_STORE_URL,
  },
  mainEntity: {
    "@type": "SoftwareApplication",
    name: "ARC: Circadian Rhythm Tracker",
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ARC Circadian Rhythm Tracker",
        item: SITE_URL,
      },
    ],
  },
};

export const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};
