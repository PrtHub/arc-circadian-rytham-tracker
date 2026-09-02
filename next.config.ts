import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
      // Blog Redirects
      {
        source: "/blogs",
        destination: "/blog",
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
      // Legal Redirects
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
    ];
  },
};

export default nextConfig;
