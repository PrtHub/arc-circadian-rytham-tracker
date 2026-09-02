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
    title: "22-Step Diagnostic Onboarding",
    desc: "Builds your full biological profile across 6 acts — wake timing, energy map, caffeine habits, and chronotype — before the paywall.",
  },
  {
    icon: "🌅",
    title: "Living Light Phase Ground",
    desc: "A three-stop gradient keyed to your biological phase, transitioning across 7 skies (night, rise, morning, peak, dip, evening, windDown).",
  },
  {
    icon: "🧭",
    title: "The One Ask & Day Plan",
    desc: "One sentence and one prioritized action at a time. A dynamic plan that adapts to what you log rather than a rigid calendar.",
  },
  {
    icon: "☕",
    title: "Dynamic Caffeine Cutoff",
    desc: "Calculates the exact minute your last coffee must clear to leave under 50mg active caffeine at bedtime, adapting with every drink logged.",
  },
  {
    icon: "☀️",
    title: "Solar Morning Light Anchor",
    desc: "Astronomical sunrise calculated from your time zone with zero GPS tracking. 20-min Live Activity timer runs in your Dynamic Island.",
  },
  {
    icon: "🧪",
    title: "5-Day Experiment Loops",
    desc: "Test one habit change at a time for five days against your recorded history, with honest verdicts including 'no difference'.",
  },
  {
    icon: "🔄",
    title: "7 Biological Event Loops",
    desc: "Automated triage for sleep debt recovery, jet lag seek/avoid-light windows, schedule drift, seasonal shifts, and dip corrections.",
  },
  {
    icon: "📊",
    title: "Measured Proof & Receipts",
    desc: "Track your afternoon crash rate drop from 3.5 to 1.0 a week from real check-ins, with 14-day adherence dot strips and monthly reports.",
  },
  {
    icon: "📚",
    title: "Vetted Learn Reference Library",
    desc: "23 scientific guides on light, caffeine, sleep, and chronobiology, held to strict engine accuracy with zero unverified claims.",
  },
  {
    icon: "🔒",
    title: "Local-First Architecture",
    desc: "100% on-device SQLite storage. No account, no login, and no server holding your biological history.",
  },
];

export const steps = [
  {
    step: "01",
    title: "Discover your profile",
    desc: "A 22-step onboarding across 6 acts reveals your chronotype, focus peaks, and natural circadian sleep pressure.",
  },
  {
    step: "02",
    title: "Follow your plan",
    desc: "One sentence, one action at a time. Follow a live dynamic day plan with Dynamic Island timers and dynamic caffeine cutoffs.",
  },
  {
    step: "03",
    title: "Get the measured receipts",
    desc: "Watch your afternoon crashes drop from 3.5 to 1.0 a week—proven from your own check-ins and verified by 5-day experiment loops.",
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
    desc: "Follows the sun; 50% of the world runs on Bear time.",
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
    title: "Mechanism, Never Verdict",
    desc: "ARC explains why you feel tired ('This is adenosine, not laziness') without guilt trips, arbitrary 0-100 sleep scores, rings, or streaks.",
  },
  {
    title: "Privacy-First Architecture",
    desc: "Local-first SQLite storage on your iPhone. No account, no cloud database, and zero health tracking sent to remote servers.",
  },
  {
    title: "One Question, One Action",
    desc: "No cluttered dashboards or 7am decision fatigue. Exactly one prioritized ask at a time, drawn as the first item of your day's plan.",
  },
  {
    title: "Measured Proof Over Weeks",
    desc: "ARC doesn't just assert facts; it proves them by measuring your crash reduction and testing protocols with 5-day experiments.",
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
    title: "Coffee window opens",
    body: "Your adenosine has cleared. Coffee now gives you clean energy without the afternoon crash.",
    color: "#CCFF00",
  },
  {
    time: "Dynamic Cutoff",
    title: "Last safe coffee — stop now",
    body: "Every coffee after this point leaves >50mg active at bed, disrupting deep slow-wave sleep.",
    color: "#FF4500",
  },
  {
    time: "Evening Wind-down",
    title: "Start winding down",
    body: "Melatonin production is ramping up. Dim lights and initiate circadian quiet hours.",
    color: "#7B61FF",
  },
];

export const plans = [
  {
    name: "Weekly",
    price: "$4.99",
    period: "/ week",
    highlight: false,
    badge: null as string | null,
    note: "Cancel anytime in App Store",
  },
  {
    name: "Annual",
    price: "$39.99",
    period: "/ year",
    highlight: true,
    badge: "Best Value" as string | null,
    note: "~$0.77 / week • Includes full ARC 2.0 features",
  },
];

export const faqs = [
  {
    q: "Why doesn't ARC have sleep scores (0-100), rings, or streaks?",
    a: "A number out of 100 invites gaming an arbitrary score rather than understanding your body. Breaking a streak causes app abandonment. ARC rejects gamification and focuses on physiological mechanisms ('This is adenosine, not laziness') and measured proof—like halving your afternoon crashes.",
  },
  {
    q: "How does the dynamic caffeine cutoff work?",
    a: "Unlike generic 'no coffee 8 hours before bed' rules, ARC computes your cutoff dynamically from your target bedtime, personal metabolic sensitivity (fast, normal, or slow), and every drink logged today to ensure under 50mg of active circulating caffeine remains at bedtime.",
  },
  {
    q: "Do I need a wearable or Apple Watch?",
    a: "No. ARC works completely standalone from your wake time, light timers, and quick one-tap check-ins. It calculates your biological rhythm without requiring expensive hardware.",
  },
  {
    q: "Does ARC require GPS location permissions for morning light?",
    a: "No location permission is ever requested. ARC calculates the true astronomical sunrise and solar angles directly from your device's time zone.",
  },
  {
    q: "What is the 5-day experiment loop?",
    a: "ARC tests one habit change at a time (like an earlier cutoff or pre-dip walk) for five days against your recorded history, scoring the outcome with honest verdicts including 'no difference'.",
  },
  {
    q: "Is my data private?",
    a: "Yes. ARC is built on local-first SQLite on your iPhone. There are no accounts, no logins, and no remote cloud database holding your check-ins or habits.",
  },
  {
    q: "Does it work for shift workers?",
    a: "Yes. ARC features dedicated night-shift and flexible protocols that invert and calibrate guidance around your actual wake time.",
  },
  {
    q: "How do I cancel?",
    a: "Anytime in one tap through your Apple ID subscription settings.",
  },
];

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export const jsonLdApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "ARC: Circadian Rhythm Tracker",
  alternateName: ["ARC Circadian Rhythm Tracker", "ARC 2.0 Living Light"],
  operatingSystem: "iOS 16.0 or later",
  applicationCategory: "HealthApplication",
  applicationSubCategory: "Lifestyle",
  softwareVersion: "2.0.0",
  inLanguage: "en-US",
  countriesSupported: "US, CA, GB, AU, IN, DE",
  description:
    "ARC 2.0 Living Light. Stop fighting your body. Discover your chronotype and follow your personalized day plan with dynamic caffeine cutoff, solar morning light Live Activities, and 5-day habit experiment loops.",
  url: APP_STORE_URL,
  downloadUrl: APP_STORE_URL,
  installUrl: APP_STORE_URL,
  featureList: [
    "22-Step Diagnostic Onboarding across 6 Acts",
    "Living Light Visual Identity with 7 Biological Phase Gradients",
    "The One Ask & Dynamic Day Plan",
    "Dynamic Caffeine Cutoff (<50mg target at bedtime)",
    "Live SVG Caffeine Decay Curve with Tap-to-Scrub",
    "Astronomical Solar Morning Light Engine (No GPS Required)",
    "Live Activity & Dynamic Island 20-Min Timer",
    "5-Day Single-Variable Experiment Loops",
    "7 Biological Event Loops (Recovery, Travel/Jet Lag, Drift, DST, Dip Correction)",
    "Measured Proof (Afternoon crashes dropping from 3.5 to 1.0/wk)",
    "23 Vetted Scientific Articles in Learn Library",
    "Local-First SQLite On-Device Storage (No Account Required)",
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
