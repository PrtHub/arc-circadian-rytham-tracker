export const APP_STORE_URL =
  "https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892";

export const screenshots = [
  { src: "/01.png", alt: "Stop Fighting Your Biology — ARC circadian rhythm tracker home screen" },
  { src: "/02.png", alt: "Are You a Bear? — ARC chronotype discovery screen" },
  { src: "/03.png", alt: "Your Perfect Day Mapped — ARC daily trajectory timeline" },
  { src: "/04.png", alt: "Trace Your Caffeine — ARC caffeine half-life cutoff tracker" },
  { src: "/05.png", alt: "Learn Why You Crash — ARC adenosine and sleep pressure explainer" },
  { src: "/06.png", alt: "Never Miss Timing — ARC smart sunlight and wind-down alerts" },
  { src: "/07.png", alt: "Your Optimized Day Revealed — ARC personalized schedule screen" },
  { src: "/08.png", alt: "Built for Your Priority — ARC goal calibration screen" },
];

export const features = [
  {
    icon: "🎯",
    title: "15-Point Precision Diagnosis",
    desc: "Calibrates chronotype, age, goals & night habits for a profile that's actually yours.",
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
    desc: "Calculated cutoff time that protects your sleep quality every night.",
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
    desc: "Answer 15 science-backed questions about your sleep, energy patterns, caffeine habits, and goals. ARC calibrates your unique biological profile.",
  },
  {
    step: "02",
    title: "Discover Your Chronotype",
    desc: "Find out if you're a Lion, Bear, Wolf, or Dolphin — and what it means for your daily schedule and peak performance windows.",
  },
  {
    step: "03",
    title: "Follow Your Daily Trajectory",
    desc: "Get a personalized 24-hour timeline with Peak Focus Windows, optimal caffeine cutoff, sunlight anchoring time, and wind-down routine.",
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
    title: "Founders & Entrepreneurs",
    desc: "Optimize your decision-making and deep work windows around your natural energy peaks instead of burning out.",
  },
  {
    icon: "✍️",
    title: "Creators & Writers",
    desc: "Find your creative peak hours and stop forcing output when your brain is wired for rest.",
  },
  {
    icon: "🧬",
    title: "Biohackers & Health Enthusiasts",
    desc: "Go beyond sleep tracking. Understand the cortisol-melatonin rhythm that drives your entire day.",
  },
  {
    icon: "🧠",
    title: "ADHD Professionals",
    desc: "Structured visual missions replace overwhelming to-do lists. ARC gives your brain the timed, biology-aligned triggers it actually responds to.",
  },
  {
    icon: "😴",
    title: "Sleep Seekers",
    desc: "Struggling with insomnia or mid-day fatigue? ARC's adenosine and melatonin protocols attack the root cause — not just the symptoms.",
  },
  {
    icon: "💻",
    title: "Remote Workers",
    desc: "Design your flexible schedule around biology, not just calendar availability.",
  },
];

export const plans = [
  { name: "Weekly", price: "$3.99", period: "/ week", highlight: false, badge: null as string | null },
  { name: "Monthly", price: "$9.99", period: "/ month", highlight: false, badge: null as string | null },
  { name: "Yearly", price: "$29.99", period: "/ year", highlight: true, badge: "Save 75%" as string | null },
];

export const faqs = [
  {
    q: "What is a chronotype?",
    a: "A chronotype is your body's natural preference for when to sleep and wake. There are four types: Lion (early riser), Bear (solar rhythm), Wolf (night owl), and Dolphin (light sleeper). ARC identifies yours through a 15-point diagnosis.",
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
    q: "Is there a free trial?",
    a: "Yes. All ARC Pro plans include a 3-day free trial. The free tier includes core chronotype discovery and daily trajectory features with no time limit.",
  },
];

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

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
    "Circadian rhythm tracker that syncs your schedule with your biology. Discover your chronotype (Lion, Bear, Wolf, or Dolphin) and unlock peak performance with science-backed daily trajectory, caffeine cutoff tracking, and morning sunlight anchoring.",
  url: APP_STORE_URL,
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  featureList: [
    "15-Point Precision Chronotype Diagnosis",
    "Dynamic 24-Hour Daily Trajectory",
    "Chronotype Discovery: Lion, Bear, Wolf, Dolphin",
    "Caffeine Half-Life Tracking & Cutoff Calculator",
    "Peak Focus Windows for Deep Work",
    "Morning Sunlight Anchoring Protocol",
    "Biological Briefings with Science Citations",
    "Local-First SQLite Storage — Zero Cloud Sync",
    "Adenosine Clear Timing",
    "Digital Sunset Protocol",
    "Melatonin Optimization",
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
      description: "Core chronotype discovery and daily trajectory — free forever.",
    },
    {
      "@type": "Offer",
      price: "3.99",
      priceCurrency: "USD",
      name: "ARC Pro — Weekly",
      billingIncrement: "P1W",
    },
    {
      "@type": "Offer",
      price: "9.99",
      priceCurrency: "USD",
      name: "ARC Pro — Monthly",
      billingIncrement: "P1M",
    },
    {
      "@type": "Offer",
      price: "29.99",
      priceCurrency: "USD",
      name: "ARC Pro — Yearly",
      billingIncrement: "P1Y",
      description: "Save 75% vs weekly. Includes 3-day free trial.",
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
