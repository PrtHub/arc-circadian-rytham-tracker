import type { Metadata } from "next";
import Link from "next/link";
import { booksData } from "@/lib/book-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

export const metadata: Metadata = {
  title: "Best Circadian Rhythm & Sleep Books",
  description:
    "Curated reviews and takeaways from essential chronobiology texts: Matthew Walker, Dr. Michael Breus, and Suhas Kshirsagar on circadian health and energy.",
  keywords: [
    "best sleep books",
    "circadian rhythm books",
    "the power of when summary",
    "why we sleep summary",
    "chronotype books",
  ],
  alternates: {
    canonical: "/books",
  },
  openGraph: {
    title: "Best Circadian Rhythm & Sleep Books",
    description: "Curated reviews and scientific summaries of foundational texts in chronobiology, sleep science, and human performance.",
    url: "https://arcapp.sbs/books",
  },
};

export default function BooksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ARC Recommended Circadian Books Directory",
    "description": "Scientific reviews and summaries of critical texts on sleep science, chronotypes, and biological routines.",
    "url": "https://arcapp.sbs/books",
    "hasPart": booksData.map((book) => ({
      "@type": "WebPage",
      "headline": book.title,
      "url": `https://arcapp.sbs/books/${book.slug}`,
    })),
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-137.5 h-137.5 rounded-full bg-(--accent)/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      {/* Focused Hub Header (Left: Brand Logo, Right: Back to Home) */}
      <ContentNav backHref="/" backLabel="Home" />

      <main className="max-w-7xl mx-auto px-6 py-14 relative">
        <header className="mb-12 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-3 inline-block font-mono border border-(--accent)/20">
            Scientific Literature &amp; Reviews
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Recommended <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">Books</span>.
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
            Summaries of the books behind the ideas ARC builds on: chronotypes, light, caffeine and sleep pressure. Our own reading, not affiliated with the authors.
          </p>
        </header>

        {/* Calculative Mid-Hub Callout Banner */}
        <CalculativeAppCallout
          variant="banner"
          badge="ARC for iPhone"
          title="Stop guessing. ARC works out your day."
          description="One sentence explaining why you feel like this right now, one thing worth doing about it, and the rest of your day as a plan. Built from what you log, not a generic routine."
          featureBullets={[
            "Last safe coffee, recalculated with every cup",
            "20-minute light timer from your real sunrise",
            "No account. Your log stays on your iPhone",
          ]}
          location="books_hub_banner"
        />

        {/* Books Grid (Expanded 3-Column Layout) */}
        <section className="mt-14">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) font-mono">
              Curated Chronobiology Reading List ({booksData.length})
            </h2>
            <span className="text-xs text-accent font-mono">
              Verified Science
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {booksData.map((book) => {
              let badgeStyle = "text-accent border-(--accent)/20 bg-(--accent)/10";

              if (book.slug === "why-we-sleep") {
                badgeStyle = "text-(--aura-ice) border-(--aura-ice)/20 bg-(--aura-ice)/10";
              } else if (book.slug === "change-your-schedule-change-your-life") {
                badgeStyle = "text-(--aura-sun) border-(--aura-sun)/20 bg-(--aura-sun)/10";
              }

              return (
                <article
                  key={book.slug}
                  className="group raised-card overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-(--accent)/40"
                >
                  <Link href={`/books/${book.slug}`} className="p-7 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-5 text-[11px] font-bold tracking-widest uppercase font-mono">
                        <span className={`px-2.5 py-0.5 rounded-full border ${badgeStyle}`}>
                          {book.keyMetric}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold tracking-tight mb-2 text-white group-hover:text-accent transition-colors leading-snug">
                        {book.title}
                      </h2>

                      <p className="text-accent text-xs font-semibold mb-3 font-mono">
                        By {book.author}
                      </p>

                      <p className="text-(--fg-muted) text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                        {book.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-(--fg-muted) font-mono">
                        {book.publishedDate}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-bold text-accent group-hover:underline font-mono uppercase">
                        Book Review
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
