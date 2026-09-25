import Link from "next/link";
import { notFound } from "next/navigation";
import { guidesData } from "@/lib/guides-data";
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
  return guidesData.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      publishedTime: new Date(guide.date).toISOString(),
      url: `${SITE_URL}/guides/${guide.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `${SITE_URL}/guides/${guide.slug}`,
    },
  };
}

function difficultyBadge(difficulty: string) {
  switch (difficulty) {
    case "Beginner":
      return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
    case "Intermediate":
      return "text-amber-400 border-amber-500/20 bg-amber-500/10";
    case "Advanced":
      return "text-rose-400 border-rose-500/20 bg-rose-500/10";
    default:
      return "text-accent border-(--accent)/20 bg-(--accent)/10";
  }
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const url = `${SITE_URL}/guides/${guide.slug}`;
  const blocks = parseBlocks(guide.content);
  const headings = extractHeadings(blocks);
  const topic = topicFor(guide.slug, guide.title);
  const companionTools = guide.relatedTools?.length
    ? guide.relatedTools.map((t) => ({ name: t.name, href: t.url, blurb: t.description }))
    : toolsFor(topic);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.excerpt,
    datePublished: new Date(guide.date).toISOString(),
    dateModified: new Date(guide.date).toISOString(),
    author: { "@type": "Organization", name: guide.author.name, url: SITE_URL },
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

      <ContentNav backHref="/guides" backLabel="All Guides" />

      <main className="max-w-6xl mx-auto px-6 py-14 relative">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-(--fg-muted)">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/guides" className="hover:text-white transition-colors">
                Guides
              </Link>
            </li>
            <li>/</li>
            <li className="text-accent truncate max-w-50 sm:max-w-md">{guide.categoryLabel}</li>
          </ol>
        </nav>

        <header className="mb-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest uppercase font-mono">
            <span className="px-3 py-1 rounded-full border border-(--accent)/20 bg-(--accent)/10 text-accent">
              {guide.categoryLabel}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border ${difficultyBadge(guide.difficulty)}`}>
              {guide.difficulty}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-(--fg-muted)">Timeline: {guide.estimatedDays}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-(--fg-muted)">{readTime(guide.content)} read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-snug">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-(--fg-muted) leading-relaxed mb-4">{guide.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3 text-sm text-(--fg-muted) font-mono pt-4 border-t border-white/10">
            <span>
              By <strong className="text-white">{guide.author.name}</strong>
            </span>
            <span>•</span>
            <span>{guide.author.role}</span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 space-y-6 text-(--fg) text-sm sm:text-base leading-relaxed">
            <ArticleBody
              blocks={blocks}
              insert={<InArticleCta topic={topic} location={`guide_${guide.slug}_inline`} />}
            />

            <p className="text-xs text-(--fg-muted) border-t border-white/10 pt-6">
              Educational content, not medical advice. ARC is a wellness app, not a medical device. If sleep
              problems persist, talk to a doctor.
            </p>

            <RelatedReading items={relatedFor(`/guides/${guide.slug}`, topic)} />

            <CalculativeAppCallout
              variant="banner"
              badge="Follow this guide with ARC"
              title="Let the app keep the timing for you"
              description="Guides like this one ask you to track light, caffeine and your energy by hand. ARC does the timing for you and shows whether it's working, from your own check-ins."
              featureBullets={[
                "20-minute light timer from your real sunrise",
                "Last safe coffee, recalculated with every cup",
                "Five-day experiments with honest verdicts",
              ]}
              location={`guide_${guide.slug}_bottom_banner`}
            />
          </article>

          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <TableOfContents headings={headings} label="Table of contents" />

            <ToolLinks tools={companionTools} />
          </aside>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:-translate-x-1 transition-transform font-mono"
          >
            ← Back to all guides
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-(--fg-muted) hover:text-white transition-colors font-mono"
          >
            Explore free tools →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
