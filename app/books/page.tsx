import type { Metadata } from "next";
import Link from "next/link";
import { booksData } from "@/lib/book-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recommended Circadian & Sleep Books | ARC",
  description: "Explore book reviews and deep scientific takeaways from Matthew Walker, Michael Breus, and Suhas Kshirsagar on chronobiology and sleep.",
  alternates: {
    canonical: "/books",
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

      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-20 relative">
        <header className="mb-20 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block font-mono border border-(--accent)/20">
            Scientific Literature
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-6 leading-none">
            Recommended <span className="font-display italic font-normal text-accent text-6xl sm:text-8xl">Books</span>.
          </h1>
          <p className="text-(--fg-muted) text-lg sm:text-xl leading-relaxed">
            Summaries and breakdowns of key scientific texts that inform ARC's biological protocols, chronotype algorithms, and sleep tracking features.
          </p>
        </header>

        {/* Books Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                <Link href={`/books/${book.slug}`} className="p-8 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-6 text-xs font-bold tracking-widest uppercase font-mono">
                      <span className={`px-3 py-1 rounded-full border ${badgeStyle}`}>
                        {book.keyMetric}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-(--fg-muted)">Rating: {book.rating}</span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-white group-hover:text-accent transition-colors">
                      {book.title}
                    </h2>

                    <p className="text-accent text-xs font-bold mb-4 uppercase tracking-wider font-mono">
                      By {book.author}
                    </p>

                    <p className="text-(--fg-muted) leading-relaxed mb-8 text-sm">
                      {book.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline mt-auto font-mono">
                    Explore Book Takeaways
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      </main>

      <Footer />
    </div>
  );
}
