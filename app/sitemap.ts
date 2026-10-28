import { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { chronotypeDetails } from "@/lib/chronotype-data";
import { audienceDetails } from "@/lib/audience-data";
import { scienceArticles } from "@/lib/science-data";
import { booksData } from "@/lib/book-data";
import { guidesData } from "@/lib/guides-data";
import { BED_TIMES, WAKE_TIMES, timeSlug } from "@/lib/sleep-times";
import { CAFFEINE_DRINKS } from "@/lib/caffeine-drinks";
import { COMPATIBILITY_PAIRINGS } from "@/lib/chronotype-compatibility-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

const REDIRECTED_GUIDE_SLUGS = new Set([
  "caffeine-half-life-optimization-guide",
  "morning-sunlight-lux-protocol-guide",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Root and primary hubs
  const primaryHubs: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/site-map`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/science`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/books`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/support`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Core standalone interactive calculators
  const coreTools: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/tools/caffeine-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/chronotype-quiz`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/sleep-cycle-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/daily-schedule-generator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/nap-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/jetlag-planner`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sunlight-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/chronotype-compatibility`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/social-jetlag-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sleep-debt-calculator`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/chronotype-visualizer`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sleep-cocktail`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/daylight-saving-time-planner`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Chronotype main profiles and 9-to-5 workday schedules
  const chronotypes: MetadataRoute.Sitemap = [
    ...Object.keys(chronotypeDetails).map((slug) => ({
      url: `${SITE_URL}/chronotype/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/chronotype/wolf-working-9-to-5`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chronotype/bear-working-9-to-5`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chronotype/lion-working-9-to-5`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chronotype/dolphin-working-9-to-5`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // 44 drink-specific caffeine clearance calculators
  const caffeineDrinks: MetadataRoute.Sitemap = CAFFEINE_DRINKS.map((drink) => ({
    url: `${SITE_URL}/tools/caffeine-calculator/${drink.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // 11 chronotype couple compatibility combinations
  const compatibilityPairings: MetadataRoute.Sitemap = Object.values(COMPATIBILITY_PAIRINGS)
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i)
    .map((pairing) => ({
      url: `${SITE_URL}/tools/chronotype-compatibility/${pairing.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Targeted audience pages
  const audiences: MetadataRoute.Sitemap = Object.keys(audienceDetails).map((slug) => ({
    url: `${SITE_URL}/for/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // In-depth guides
  const guides: MetadataRoute.Sitemap = guidesData
    .filter((guide) => !REDIRECTED_GUIDE_SLUGS.has(guide.slug))
    .map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.date || now),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  // Blog posts & competitor alternatives
  const blogs: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date || now),
    changeFrequency: "monthly" as const,
    priority: post.slug === "best-circadian-rhythm-apps-2026" ? 0.9 : 0.8,
  }));

  // Chronobiology science articles
  const sciences: MetadataRoute.Sitemap = scienceArticles.map((article) => ({
    url: `${SITE_URL}/science/${article.slug}`,
    lastModified: new Date(article.date || now),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Sleep book summaries
  const books: MetadataRoute.Sitemap = booksData.map((book) => ({
    url: `${SITE_URL}/books/${book.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Bedtime calculation matrix (when to sleep if waking at X)
  const bedtimes: MetadataRoute.Sitemap = WAKE_TIMES.map((m) => ({
    url: `${SITE_URL}/bedtime/wake-up-at-${timeSlug(m)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Wake-up calculation matrix (when to wake if sleeping at Y)
  const wakeUpTimes: MetadataRoute.Sitemap = BED_TIMES.map((m) => ({
    url: `${SITE_URL}/wake-up-time/bed-at-${timeSlug(m)}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...primaryHubs,
    ...coreTools,
    ...chronotypes,
    ...audiences,
    ...caffeineDrinks,
    ...compatibilityPairings,
    ...guides,
    ...blogs,
    ...sciences,
    ...books,
    ...bedtimes,
    ...wakeUpTimes,
  ];
}
