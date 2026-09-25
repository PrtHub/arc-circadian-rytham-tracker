import Link from "next/link";
import { notFound } from "next/navigation";
import { booksData } from "@/lib/book-data";
import { extractHeadings, parseBlocks } from "@/lib/article";
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
  return booksData.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = booksData.find((b) => b.slug === slug);
  if (!book) return {};

  const title = `${book.title}: Review & Key Takeaways`;
  return {
    title,
    description: book.excerpt,
    openGraph: {
      title,
      description: book.excerpt,
      type: "article",
      url: `${SITE_URL}/books/${book.slug}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: book.excerpt,
      images: ["/opengraph-image"],
    },
    alternates: {
      canonical: `${SITE_URL}/books/${book.slug}`,
    },
  };
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = booksData.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  const url = `${SITE_URL}/books/${book.slug}`;
  const blocks = parseBlocks(book.content);
  const headings = extractHeadings(blocks);
  const topic = topicFor(book.slug, book.title);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Book",
      name: book.title,
      author: { "@type": "Person", name: book.author },
    },
    reviewBody: book.excerpt,
    author: { "@type": "Organization", name: "ARC Scientific Team", url: SITE_URL },
    publisher: { "@type": "Organization", name: "ARC", url: SITE_URL },
    url,
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/books" backLabel="All Books" />

      <main className="max-w-6xl mx-auto px-6 py-14 relative">
        <header className="mb-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest text-accent uppercase font-mono">
            <span className="px-3 py-1 rounded-full border border-(--accent)/20 bg-(--accent)/10">By {book.author}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-(--fg-muted)">Published {book.publishedDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-3 leading-snug">
            {book.title}
          </h1>

          <p className="text-(--fg-muted) text-sm sm:text-base italic mb-4 leading-relaxed">
            &ldquo;{book.subtitle}&rdquo;
          </p>

          <div className="mt-6 p-5 rounded-2xl raised-card border border-(--accent)/20">
            <span className="text-xs font-black uppercase tracking-widest text-accent block mb-2 font-mono">
              Where ARC fits
            </span>
            <p className="text-(--fg) text-xs sm:text-sm leading-relaxed">{book.arcConnection}</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <article className="lg:col-span-8 space-y-6 text-(--fg) text-sm sm:text-base leading-relaxed">
            <ArticleBody
              blocks={blocks}
              insert={<InArticleCta topic={topic} location={`book_${book.slug}_inline`} />}
            />

            <p className="text-xs text-(--fg-muted) border-t border-white/10 pt-6">
              ARC isn&apos;t affiliated with or endorsed by {book.author} or the publisher. This summary is our
              own reading of the book. Educational content, not medical advice.
            </p>

            <RelatedReading items={relatedFor(`/books/${book.slug}`, topic)} />

            <CalculativeAppCallout
              variant="banner"
              badge="From reading to doing"
              title="Books explain the clock. ARC keeps time with it."
              description="ARC turns the timing ideas you just read about into one thing to do at a time, built from what you log, and shows whether it's working."
              featureBullets={[
                "Last safe coffee, recalculated with every cup",
                "20-minute light timer from your real sunrise",
                "Learns when your afternoon dip really lands",
              ]}
              location={`book_${book.slug}_bottom_banner`}
            />

            <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-(--fg-muted)">
              <div>
                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">Summary by</span>
                <span className="text-white font-bold">ARC Scientific Team</span>
              </div>
              <div>
                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">About the author</span>
                <span className="text-white font-bold">{book.authorTitle}</span>
              </div>
              <Link href="/books" className="text-accent hover:underline font-bold">
                ← All recommended books
              </Link>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            <TableOfContents headings={headings} label="Review chapters" />

            <ToolLinks tools={toolsFor(topic)} />
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
