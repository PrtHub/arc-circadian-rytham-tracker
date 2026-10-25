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
  const caffeineDrinks = CAFFEINE_DRINKS.map((drink) => ({
    url: `${SITE_URL}/tools/caffeine-calculator/${drink.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const compatibilityPairings = Object.values(COMPATIBILITY_PAIRINGS)
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i)
    .map((pairing) => ({
      url: `${SITE_URL}/tools/chronotype-compatibility/${pairing.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const guides = guidesData
    .filter((guide) => !REDIRECTED_GUIDE_SLUGS.has(guide.slug))
    .map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.date),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  const blogs = blogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const chronotypes = [
    ...Object.keys(chronotypeDetails).map((slug) => ({
      url: `${SITE_URL}/chronotype/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    {
      url: `${SITE_URL}/chronotype/wolf-working-9-to-5`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chronotype/bear-working-9-to-5`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chronotype/lion-working-9-to-5`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/chronotype/dolphin-working-9-to-5`,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];

  const audiences = Object.keys(audienceDetails).map((slug) => ({
    url: `${SITE_URL}/for/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const tools = [
    {
      url: `${SITE_URL}/tools`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/tools/daily-schedule-generator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/nap-calculator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/daylight-saving-time-planner`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/caffeine-calculator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sleep-cocktail`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/jetlag-planner`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/chronotype-compatibility`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/chronotype-quiz`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/social-jetlag-calculator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sleep-debt-calculator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sunlight-calculator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/chronotype-visualizer`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/tools/sleep-cycle-calculator`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ];

  const sciences = scienceArticles.map((article) => ({
    url: `${SITE_URL}/science/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const books = booksData.map((book) => ({
    url: `${SITE_URL}/books/${book.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/guides`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/science`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/books`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/support`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    ...chronotypes,
    ...audiences,
    ...tools,
    ...caffeineDrinks,
    ...compatibilityPairings,
    ...guides,
    ...blogs,
    ...sciences,
    ...books,
    ...WAKE_TIMES.map((m) => ({
      url: `${SITE_URL}/bedtime/wake-up-at-${timeSlug(m)}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    ...BED_TIMES.map((m) => ({
      url: `${SITE_URL}/wake-up-time/bed-at-${timeSlug(m)}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
