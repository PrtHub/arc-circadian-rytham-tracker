import { blogPosts } from "@/lib/blog-data";
import { guidesData } from "@/lib/guides-data";
import { scienceArticles } from "@/lib/science-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arccircadian.com";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const allItems: {
    title: string;
    link: string;
    description: string;
    date: Date;
    category: string;
  }[] = [];

  // 1. Blog posts
  for (const post of blogPosts) {
    allItems.push({
      title: post.title,
      link: `${SITE_URL}/blog/${post.slug}`,
      description: post.excerpt || post.content.slice(0, 280),
      date: new Date(post.date || "2026-01-01"),
      category: post.category || "Circadian Rhythms",
    });
  }

  // 2. Guides
  for (const guide of guidesData) {
    allItems.push({
      title: guide.title,
      link: `${SITE_URL}/guides/${guide.slug}`,
      description: guide.excerpt || guide.subtitle || "",
      date: new Date(guide.date || "2026-01-01"),
      category: "Guides",
    });
  }

  // 3. Science
  for (const science of scienceArticles) {
    allItems.push({
      title: science.title,
      link: `${SITE_URL}/science/${science.slug}`,
      description: science.excerpt || "",
      date: new Date(science.date || "2026-01-01"),
      category: "Science",
    });
  }

  // Sort newest first
  allItems.sort((a, b) => b.date.getTime() - a.date.getTime());

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ARC: Circadian Rhythm Tracker &amp; Chronobiology Updates</title>
    <link>${SITE_URL}</link>
    <description>Evidence-based sleep science, caffeine half-life calculations, chronotype routines, and circadian timing protocols from ARC.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${allItems
      .slice(0, 80)
      .map(
        (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.link}</guid>
      <description>${escapeXml(item.description)}</description>
      <category>${escapeXml(item.category)}</category>
      <pubDate>${item.date.toUTCString()}</pubDate>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(rssFeed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
