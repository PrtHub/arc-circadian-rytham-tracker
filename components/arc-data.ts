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
    title: "22-Point Precision Diagnosis",
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
    title: "Caffeine Half-Life Tracking",
    desc: "Log every drink. Watch the live decay curve. Know the exact minute it's safe to sleep.",
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
    desc: "Rate last night's sleep each morning. Poor sleep triggers a recovery-mode protocol — sunlight early, caffeine delayed 90 minutes.",
  },
  {
    icon: "📡",
    title: "Contextual Intel Feed",
    desc: "Daily briefings driven by your actual yesterday — not a static article library. Behavior-aware coaching that adapts.",
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
    desc: "Answer 22 science-backed questions about your sleep, energy patterns, caffeine habits, and lifestyle. ARC builds your full biological profile — the longest onboarding in the category.",
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
    desc: "Peak energy in the morning. You do your best deep work before noon. Protect your mornings fiercely.",
  },
  {
    icon: "🐻",
    name: "Bear",
    tagline: "Solar Rhythm",
    desc: "You follow the sun. Steady energy during daylight with a natural afternoon dip. The most common chronotype.",
  },
  {
    icon: "🐺",
    name: "Wolf",
    tagline: "Night Owl",
    desc: "Peak creativity and energy in the evening. You're wired for late nights and slow mornings.",
  },
  {
    icon: "🐬",
    name: "Dolphin",
    tagline: "Light Sleeper",
    desc: "Irregular patterns and light sleep. Highly alert and anxious. Your schedule needs the most precision.",
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
  },
  {
    icon: "☕",
    title: "Coffee Drinkers",
    desc: "You drink coffee every day but have never understood how it actually interacts with your sleep. ARC shows you the exact cutoff minute.",
  },
  {
    icon: "🧠",
    title: "ADHD Professionals",
    desc: "Structured visual missions replace overwhelming to-do lists. Biology-aligned triggers your brain actually responds to.",
  },
  {
    icon: "😴",
    title: "Sleep Seekers",
    desc: "Sleeping 7-8 hours but still exhausted? It's a timing problem, not a duration problem. ARC fixes the root cause.",
  },
  {
    icon: "🧬",
    title: "Biohackers",
    desc: "Real data and correlations — not just streaks and checkboxes. Understand the cortisol-melatonin rhythm driving your entire day.",
  },
  {
    icon: "💻",
    title: "Remote Workers",
    desc: "Design your flexible schedule around biology, not just calendar availability.",
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
    price: "$34.99",
    period: "/ year",
    highlight: true,
    badge: "Save 86%" as string | null,
    note: "Cancels anytime",
  },
];

export const faqs = [
  {
    q: "What is a chronotype?",
    a: "A chronotype is your body's natural preference for when to sleep and wake. There are four types: Lion (early riser), Bear (solar rhythm), Wolf (night owl), and Dolphin (light sleeper). ARC identifies yours through a 22-point precision diagnosis.",
  },
  {
    q: "How is ARC different from a sleep tracker?",
    a: "Sleep trackers tell you how well you slept last night. ARC tells you how to structure your entire day — when to do deep work, when to have caffeine, when to get sunlight, and when to wind down. It's proactive, not reactive.",
  },
  {
    q: "Is ARC based on real science?",
    a: "Yes. ARC is powered by peer-reviewed chronobiology research from Dr. Andrew Huberman (Stanford Neuroscience) and Dr. Matthew Walker (UC Berkeley). Every recommendation has a scientific basis.",
  },
  {
    q: "Does ARC collect my health data?",
    a: "No. ARC uses a local-first architecture — all your data is stored on your device using SQLite. Nothing is sent to external servers. You can delete everything at any time from app settings.",
  },
  {
    q: "What does the caffeine cutoff feature do?",
    a: "Caffeine has a half-life of 5–6 hours. ARC calculates your personal cutoff time based on your sleep schedule so caffeine doesn't interfere with your sleep quality.",
  },
  {
    q: "Is there a free tier?",
    a: "Yes — the free tier includes core chronotype discovery and daily trajectory with no time limit. Pro unlocks all features. Both paid plans are cancel anytime, no commitment.",
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
    "Stop fighting your body. ARC syncs your schedule with your biology using a 22-point chronotype diagnosis. Discover if you're a Lion, Bear, Wolf, or Dolphin — then get a live daily protocol with caffeine decay tracking, sunlight timer, and smart notifications timed to your biology.",
  url: APP_STORE_URL,
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  featureList: [
    "22-Point Precision Chronotype Diagnosis",
    "Dynamic 24-Hour Daily Trajectory",
    "Chronotype Discovery: Lion, Bear, Wolf, Dolphin",
    "Live Caffeine Decay Curve & Sleep-Safe Prediction",
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
      price: "34.99",
      priceCurrency: "USD",
      name: "ARC Pro — Annual",
      billingIncrement: "P1Y",
      description: "Save 86% vs weekly. Cancel anytime.",
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
