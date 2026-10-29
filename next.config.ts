import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Host-Level Domain Migration: arcapp.sbs -> arccircadian.com
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "arcapp.sbs",
          },
        ],
        destination: "https://arccircadian.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.arcapp.sbs",
          },
        ],
        destination: "https://arccircadian.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.arccircadian.com",
          },
        ],
        destination: "https://arccircadian.com/:path*",
        permanent: true,
      },
      // Caffeine Calculator
      {
        source: "/tools/caffeine",
        destination: "/tools/caffeine-calculator",
        permanent: true,
      },
      {
        source: "/tools/caffeine-half-life-calculator",
        destination: "/tools/caffeine-calculator",
        permanent: true,
      },
      // Sleep Cocktail
      {
        source: "/tools/sleep-cocktail-builder",
        destination: "/tools/sleep-cocktail",
        permanent: true,
      },
      {
        source: "/tools/huberman-sleep-cocktail",
        destination: "/tools/sleep-cocktail",
        permanent: true,
      },
      // Jetlag Planner
      {
        source: "/tools/jetlag",
        destination: "/tools/jetlag-planner",
        permanent: true,
      },
      {
        source: "/tools/jetlag-calculator",
        destination: "/tools/jetlag-planner",
        permanent: true,
      },
      // Chronotype Compatibility
      {
        source: "/tools/chronotype-compatibility-quiz",
        destination: "/tools/chronotype-compatibility",
        permanent: true,
      },
      {
        source: "/tools/chronotype-calculator",
        destination: "/tools/chronotype-compatibility",
        permanent: true,
      },
      // Chronotype Quiz
      {
        source: "/tools/chronotype-test",
        destination: "/tools/chronotype-quiz",
        permanent: true,
      },
      // Social Jetlag
      {
        source: "/tools/social-jetlag",
        destination: "/tools/social-jetlag-calculator",
        permanent: true,
      },
      // Sleep Debt
      {
        source: "/tools/sleep-debt",
        destination: "/tools/sleep-debt-calculator",
        permanent: true,
      },
      // Sunlight Calculator
      {
        source: "/tools/sunlight",
        destination: "/tools/sunlight-calculator",
        permanent: true,
      },
      {
        source: "/tools/sunlight-window-calculator",
        destination: "/tools/sunlight-calculator",
        permanent: true,
      },
      // Chronotype Visualizer
      {
        source: "/tools/chronotype-chart",
        destination: "/tools/chronotype-visualizer",
        permanent: true,
      },
      // Sleep Cycle Calculator
      {
        source: "/tools/sleep-cycle",
        destination: "/tools/sleep-cycle-calculator",
        permanent: true,
      },
      {
        source: "/tools/sleep-calculator",
        destination: "/tools/sleep-cycle-calculator",
        permanent: true,
      },
      // Daily Schedule Generator
      { source: "/tools/daily-schedule", destination: "/tools/daily-schedule-generator", permanent: true },
      { source: "/tools/schedule-generator", destination: "/tools/daily-schedule-generator", permanent: true },
      // Nap Calculator
      { source: "/tools/nap", destination: "/tools/nap-calculator", permanent: true },
      { source: "/tools/best-time-to-nap", destination: "/tools/nap-calculator", permanent: true },
      // Daylight Saving Planner
      { source: "/tools/daylight-saving-time", destination: "/tools/daylight-saving-time-planner", permanent: true },
      { source: "/tools/dst-planner", destination: "/tools/daylight-saving-time-planner", permanent: true },
      // Blog Redirects
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blog/timeshifter-vs-arc-jetlag-app",
        destination: "/blog/timeshifter-alternative",
        permanent: true,
      },
      {
        source: "/blog/lifestack-vs-arc",
        destination: "/blog/lifestack-vs-arc-circadian-app",
        permanent: true,
      },
      {
        source: "/blogs/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/posts/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/post/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Chronotypes Redirects
      {
        source: "/chronotypes",
        destination: "/tools",
        permanent: true,
      },
      {
        source: "/chronotypes/:slug",
        destination: "/chronotype/:slug",
        permanent: true,
      },
      {
        source: "/chronotype",
        destination: "/tools",
        permanent: true,
      },
      // Audience/For redirects
      {
        source: "/for",
        destination: "/",
        permanent: true,
      },
      {
        source: "/audience/:slug",
        destination: "/for/:slug",
        permanent: true,
      },
      {
        source: "/audiences/:slug",
        destination: "/for/:slug",
        permanent: true,
      },
      // Content consolidation (Sep 2026): duplicate and thin pages folded into
      // the strongest page for the same search intent.
      ...[
        ["/blog/oura-ring-alternative-circadian-tracking-no-hardware", "/blog/oura-ring-vs-arc-circadian-rhythm-tracker"],
        ["/blog/caffeine-half-life-paradox", "/blog/caffeine-half-life-calculator-science"],
        ["/blog/bear-chronotype-guide-common-sleep-pattern", "/chronotype/bear"],
        ["/blog/night-owls-wolf-chronotype-survival-guide", "/chronotype/wolf"],
        ["/blog/dolphin-chronotype-mastering-sensitive-sleep", "/chronotype/dolphin"],
        ["/blog/chronotypes-explained-not-lazy", "/blog/what-is-a-chronotype-lion-bear-wolf-dolphin"],
        ["/blog/social-jetlag-weekend-sleep-trap", "/blog/what-is-social-jetlag"],
        ["/blog/social-jetlag-weekend-sleep-in-cost", "/blog/what-is-social-jetlag"],
        ["/blog/understanding-the-cortisol-spike-morning-energy", "/guides/cortisol-awakening-response-optimization-guide"],
        ["/blog/digital-detox-managing-blue-light-circadian-rhythm", "/guides/evening-blue-light-melatonin-defense-guide"],
        ["/blog/time-restricted-feeding-circadian-rhythm", "/guides/circadian-intermittent-fasting-metabolic-clocks-guide"],
        ["/blog/fasting-liver-clock-digestion", "/guides/circadian-intermittent-fasting-metabolic-clocks-guide"],
        ["/blog/exercise-timing-workouts-for-your-chronotype", "/guides/circadian-exercise-timing-hypertrophy-sleep-guide"],
        ["/blog/chronobiology-101-how-internal-clock-affects-everything", "/blog/what-is-circadian-rhythm-beginner-guide"],
        ["/blog/hydration-cortisol-morning-routine", "/blog/science-of-coffee-timing-delay-90-minutes"],
        ["/blog/adenosine-receptor-caffeine-tolerance", "/blog/why-coffee-makes-you-tired-caffeine-tolerance-adenosine"],
        ["/blog/morning-walk-sunlight-huberman-protocol", "/blog/huberman-morning-routine-app"],
        ["/blog/temperature-minimum-tmin-shifting-rhythm", "/blog/the-avoid-light-window-jetlag"],
        ["/blog/shift-work-circadian-survival", "/guides/shift-worker-circadian-survival-guide"],
        ["/blog/90-minute-ultradian-rhythm-focus", "/blog/peak-focus-windows-plan-day-around-biology"],
        ["/blog/mouth-taping-sleep-architecture", "/guides/deep-sleep-slow-wave-optimization-guide"],
        ["/blog/biological-age-vs-circadian-health", "/blog/what-is-circadian-rhythm-beginner-guide"],
        ["/science/ultimate-circadian-reset-guide", "/guides/complete-circadian-rhythm-reset-guide"],
        ["/science/adenosine-sleep-pressure", "/guides/adenosine-sleep-pressure-clearance-guide"],
        ["/science/sleep-safe-caffeine-decay", "/tools/caffeine-calculator"],
        ["/guides/caffeine-half-life-optimization-guide", "/tools/caffeine-calculator"],
        ["/science/cortisol-awakening-response", "/guides/cortisol-awakening-response-optimization-guide"],
        ["/science/melatonin-digital-sunset", "/guides/evening-blue-light-melatonin-defense-guide"],
        ["/science/social-jetlag-circadian-misalignment", "/guides/social-jetlag-recovery-guide"],
        ["/science/core-body-temperature-sleep-gate", "/guides/core-body-temperature-tmin-deep-sleep-guide"],
        ["/science/zeitgebers-peripheral-clocks", "/science/what-is-zeitgeber"],
        ["/science/lux-thresholds-retinal-iprgc-entrainment", "/tools/sunlight-calculator"],
        ["/guides/morning-sunlight-lux-protocol-guide", "/tools/sunlight-calculator"],
        ["/guides/night-shift-to-day-shift-rotation-protocol-guide", "/guides/shift-worker-circadian-survival-guide"],
        ["/chronotype/wolf-9-to-5", "/chronotype/wolf-working-9-to-5"],
        ["/chronotype/wolf-9-to-5-schedule", "/chronotype/wolf-working-9-to-5"],
        ["/chronotype/bear-9-to-5", "/chronotype/bear-working-9-to-5"],
        ["/chronotype/bear-9-to-5-schedule", "/chronotype/bear-working-9-to-5"],
        ["/chronotype/lion-9-to-5", "/chronotype/lion-working-9-to-5"],
        ["/chronotype/lion-9-to-5-schedule", "/chronotype/lion-working-9-to-5"],
        ["/chronotype/dolphin-9-to-5", "/chronotype/dolphin-working-9-to-5"],
        ["/chronotype/dolphin-9-to-5-schedule", "/chronotype/dolphin-working-9-to-5"],
        ["/blog/oura-ring-vs-arc-circadian-rhythm-tracker", "/blog/oura-ring-vs-arc-circadian-tracker"],
        ["/blog/whoop-alternative", "/blog/whoop-vs-arc-circadian-tracker"],
        ["/blog/oura-alternative", "/blog/oura-ring-vs-arc-circadian-tracker"],
        ["/blog/sleep-cycle-alternative", "/blog/sleep-cycle-app-alternative"],
        ["/tools/caffeine-calculator/celsius", "/tools/caffeine-calculator/celsius-200mg"],
        ["/tools/caffeine-calculator/monster", "/tools/caffeine-calculator/monster-energy"],
        ["/tools/caffeine-calculator/red-bull-energy", "/tools/caffeine-calculator/red-bull"],
        ["/tools/caffeine-calculator/dunkin", "/tools/caffeine-calculator/dunkin-iced-coffee"],
        ["/tools/caffeine-calculator/ghost", "/tools/caffeine-calculator/ghost-energy"],
        ["/tools/caffeine-calculator/alani", "/tools/caffeine-calculator/alani-nu"],
        ["/tools/caffeine-calculator/reign", "/tools/caffeine-calculator/reign-energy"],
        ["/tools/caffeine-calculator/bang", "/tools/caffeine-calculator/bang-energy"],
        ["/tools/caffeine-calculator/prime", "/tools/caffeine-calculator/prime-energy"],
        ["/tools/night-shift-sleep-calculator", "/for/shift-workers"],
        ["/tools/adhd-sleep-schedule-calculator", "/for/adhd"],
      ].map(([source, destination]) => ({ source, destination, permanent: true })),
      // Legal & Directory Redirects
      {
        source: "/privacy-policy",
        destination: "/privacy",
        permanent: true,
      },
      {
        source: "/terms-of-service",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/sitemap.html",
        destination: "/site-map",
        permanent: true,
      },
      {
        source: "/directory",
        destination: "/site-map",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
