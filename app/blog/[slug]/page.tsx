import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";
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
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};

  // No explicit images: the post's own opengraph-image.tsx is used for sharing.
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: new Date(post.date).toISOString(),
      url: `${SITE_URL}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `${SITE_URL}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  const blocks = parseBlocks(post.content);
  const headings = extractHeadings(blocks);
  const topic = topicFor(post.slug, post.title);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: { "@type": "Organization", name: "ARC Scientific Team", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "ARC",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    image: `${url}/opengraph-image`,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/blog" backLabel="All Posts" />

      <main className="max-w-6xl mx-auto px-6 py-14 relative">
        <header className="mb-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest text-accent uppercase font-mono">
            <span className="px-3 py-1 rounded-full border border-(--accent)/20 bg-(--accent)/10">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-(--fg-muted)">{readTime(post.content)} read</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-(--fg-muted)">Published {post.date}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-snug">
            {post.title}
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 space-y-6 text-(--fg) text-sm sm:text-base leading-relaxed">
            <ArticleBody
              blocks={blocks}
              insert={<InArticleCta topic={topic} location={`blog_${post.slug}_inline`} />}
            />

            <RelatedReading items={relatedFor(`/blog/${post.slug}`, topic)} />

            <CalculativeAppCallout
              variant="banner"
              badge="ARC for iPhone"
              title="Stop guessing. ARC works out your day."
              description="One sentence explaining why you feel like this right now, one thing worth doing about it, and the rest of your day as a plan. Built from what you log, not a generic routine."
              featureBullets={[
                "Last safe coffee, recalculated with every cup",
                "20-minute light timer from your real sunrise",
                "Learns when your afternoon dip really lands",
              ]}
              location={`blog_${post.slug}_bottom_banner`}
            />

            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-(--fg-muted)">
              <div>
                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">Editor &amp; Review</span>
                <span className="text-white font-bold">ARC Scientific Team</span>
              </div>
              <div>
                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">Date Published</span>
                <span className="text-white font-bold">{post.date}</span>
              </div>
              <Link href="/blog" className="text-accent hover:underline font-bold">
                ← Browse all {blogPosts.length} articles
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <TableOfContents headings={headings} label="Article sections" />

            <ToolLinks tools={toolsFor(topic)} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
