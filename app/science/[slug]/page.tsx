import Link from "next/link";
import { notFound } from "next/navigation";
import { scienceArticles } from "@/lib/science-data";
import { extractHeadings, parseBlocks, readTime } from "@/lib/article";
import { relatedFor, toolsFor, topicFor } from "@/lib/content-topics";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";
import { ArticleBody } from "@/components/article/ArticleBody";
import {
  InArticleCta,
  RelatedReading,
  TableOfContents,
  ToolLinks,
} from "@/components/article/ArticleExtras";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export async function generateStaticParams() {
  return scienceArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = scienceArticles.find((a) => a.slug === slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: new Date(article.date).toISOString(),
      url: `${SITE_URL}/science/${article.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `${SITE_URL}/science/${article.slug}`,
    },
  };
}

export default async function ScienceArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = scienceArticles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  const url = `${SITE_URL}/science/${article.slug}`;
  const blocks = parseBlocks(article.content);
  const headings = extractHeadings(blocks);
  const topic = topicFor(article.slug, article.title);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: { "@type": "Organization", name: "ARC Scientific Team", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "ARC",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    image: `${SITE_URL}/opengraph-image`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/science" backLabel="All Science" />

      <main className="max-w-6xl mx-auto px-6 py-14 relative">
        <header className="mb-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest text-accent uppercase font-mono">
            <span className="px-3 py-1 rounded-full border border-(--accent)/20 bg-(--accent)/10">
              {article.categoryLabel}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-(--fg-muted)">{readTime(article.content)} read</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-(--fg-muted)">Published {article.date}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-snug">
            {article.title}
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">{article.excerpt}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 space-y-6 text-(--fg) text-sm sm:text-base leading-relaxed">
            <ArticleBody
              blocks={blocks}
              insert={<InArticleCta topic={topic} location={`science_${article.slug}_inline`} />}
            />

            <p className="text-xs text-(--fg-muted) border-t border-white/10 pt-6">
              Educational content, not medical advice. ARC is a wellness app, not a medical device.
            </p>

            <RelatedReading items={relatedFor(`/science/${article.slug}`, topic)} />

            <CalculativeAppCallout
              variant="banner"
              badge="From mechanism to plan"
              title="ARC turns this into one thing to do today"
              description="The science explains why you feel the way you do. ARC uses it to plan your day from what you log, and shows whether the plan is working."
              featureBullets={[
                "Last safe coffee, recalculated with every cup",
                "20-minute light timer from your real sunrise",
                "Learns when your afternoon dip really lands",
              ]}
              location={`science_${article.slug}_bottom_banner`}
            />

            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-(--fg-muted)">
              <div>
                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">Written by</span>
                <span className="text-white font-bold">ARC Scientific Team</span>
              </div>
              <Link href="/science" className="text-accent hover:underline font-bold">
                ← All science articles
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <TableOfContents headings={headings} />

            <ToolLinks tools={toolsFor(topic)} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
