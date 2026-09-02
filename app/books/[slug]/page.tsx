import Link from "next/link";
import { booksData } from "@/lib/book-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return booksData.map((book) => ({
    slug: book.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = booksData.find((b) => b.slug === slug);
  if (!book) return {};

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  return {
    title: `${book.title} | ARC Recommended Books`,
    description: book.excerpt,
    openGraph: {
      title: book.title,
      description: book.excerpt,
      type: "article",
      url: `${SITE_URL}/books/${book.slug}`,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: book.title,
      description: book.excerpt,
      images: [`${SITE_URL}/opengraph-image`],
    },
    alternates: {
      canonical: `${SITE_URL}/books/${book.slug}`,
    },
  };
}

function parseMarkdownText(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const tokens = text.split(regex);

  tokens.forEach((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      const boldText = token.slice(2, -2);
      parts.push(<strong key={index} className="text-white font-extrabold">{boldText}</strong>);
    } else if (token.startsWith("[") && token.includes("](")) {
      const closingBracketIndex = token.indexOf("](");
      const linkText = token.slice(1, closingBracketIndex);
      const linkUrl = token.slice(closingBracketIndex + 2, -1);

      const isExternal = linkUrl.startsWith("http") || linkUrl.startsWith("mailto");
      if (isExternal) {
        parts.push(
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold underline decoration-(--accent)/30 hover:decoration-accent transition-colors"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={index}
            href={linkUrl}
            className="text-accent font-semibold underline decoration-(--accent)/30 hover:decoration-accent transition-colors"
          >
            {linkText}
          </Link>
        );
      }
    } else {
      parts.push(token);
    }
  });

  return parts;
}

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = booksData.find((b) => b.slug === slug);

  if (!book) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Book",
      "name": book.title,
      "author": {
        "@type": "Person",
        "name": book.author,
      },
    },
    "reviewBody": book.excerpt,
    "author": {
      "@type": "Organization",
      "name": "ARC Scientific Team",
    },
  };

  return (
    <div className="text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Nav />

      <main className="max-w-3xl mx-auto px-6 py-20">
        <header className="mb-20">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:-translate-x-1 transition-transform mb-8 font-mono"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 rotate-180"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
            Back to Books Directory
          </Link>
          
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest text-accent uppercase font-mono">
            <span>By {book.author}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>Rating: {book.rating}</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span className="text-(--fg-muted)">Released: {book.publishedDate}</span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4 leading-none">
            {book.title}
          </h1>
          <p className="text-(--fg-muted) text-lg italic mb-6 leading-relaxed">
            "{book.subtitle}"
          </p>

          <div className="mt-8 p-6 raised-card">
            <span className="text-xs font-black uppercase tracking-widest text-accent block mb-2 font-mono">
              ARC Integration Hook:
            </span>
            <p className="text-(--fg) text-sm leading-relaxed">
              {book.arcConnection}
            </p>
          </div>
        </header>

        <section className="max-w-none">
          <div className="space-y-6 text-(--fg) text-lg leading-relaxed">
            {book.content
              .trim()
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, i) => {
                if (line.startsWith("# ")) return null;

                const alertMatch = line.match(/^>\s*\[!(TIP|NOTE|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/i);
                if (alertMatch) {
                  const type = alertMatch[1].toUpperCase();
                  const content = alertMatch[2];

                  let styles = {
                    border: "border-(--accent)/30",
                    bg: "bg-(--accent)/5",
                    text: "text-accent",
                    label: "Tip",
                    icon: "💡"
                  };

                  if (type === "NOTE") {
                    styles = {
                      border: "border-white/10",
                      bg: "bg-white/5",
                      text: "text-zinc-300",
                      label: "Note",
                      icon: "ℹ️"
                    };
                  } else if (type === "WARNING" || type === "CAUTION") {
                    styles = {
                      border: "border-(--aura-crash)/30",
                      bg: "bg-(--aura-crash)/10",
                      text: "text-(--aura-crash)",
                      label: "Warning",
                      icon: "⚠️"
                    };
                  } else if (type === "IMPORTANT") {
                    styles = {
                      border: "border-(--aura-sleep)/30",
                      bg: "bg-(--aura-sleep)/10",
                      text: "text-(--aura-sleep)",
                      label: "Important",
                      icon: "✨"
                    };
                  }

                  return (
                    <div key={i} className={`my-8 p-6 rounded-2xl border ${styles.border} ${styles.bg} flex gap-4 items-start`}>
                      <span className="text-2xl shrink-0">{styles.icon}</span>
                      <div>
                        <span className={`text-xs font-black uppercase tracking-widest ${styles.text} block mb-1 font-mono`}>
                          {styles.label}
                        </span>
                        <div className="text-white text-base leading-relaxed">
                          {parseMarkdownText(content)}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-xl font-bold text-white mb-4 mt-12 lowercase [font-variant:small-caps] tracking-wider">
                      {parseMarkdownText(line.replace("### ", ""))}
                    </h3>
                  );
                }

                if (line.startsWith("* ") || line.startsWith("- ")) {
                  return (
                    <div key={i} className="flex gap-3 items-start my-2">
                      <span className="text-accent mt-2">•</span>
                      <span>{parseMarkdownText(line.replace(/^[*+-] /, ""))}</span>
                    </div>
                  );
                }

                if (/^\d+\./.test(line)) {
                  return (
                    <div key={i} className="flex gap-3 items-start my-2">
                      <span className="text-accent font-bold min-w-5 font-mono">{line.match(/^\d+\./)?.[0]}</span>
                      <span>{parseMarkdownText(line.replace(/^\d+\. /, ""))}</span>
                    </div>
                  );
                }

                return <p key={i} className="mb-6">{parseMarkdownText(line)}</p>;
              })}
          </div>
        </section>

        <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between gap-6 font-mono text-xs text-(--fg-muted)">
          <div>
            <span className="font-black uppercase tracking-widest block mb-2 opacity-70">
              Reviewed By
            </span>
            <span className="text-white font-bold">ARC Scientific Team</span>
          </div>
          <div>
            <span className="font-black uppercase tracking-widest block mb-2 opacity-70">
              Author Biography
            </span>
            <span className="text-white font-bold">{book.authorTitle}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 p-8 rounded-3xl raised-card border-(--accent)/30">
          <h3 className="text-2xl font-extrabold tracking-tighter mb-4 text-white">
            Structure your timing around science.
          </h3>
          <p className="text-(--fg-muted) mb-8 max-w-md leading-relaxed">
            Put chronotypes and sleep stage cycles on autopilot. Unlock customized daily protocols with ARC.
          </p>
          <a
            href="https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-accent px-8 py-4 text-sm font-black text-black hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
          >
            Download ARC App
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
