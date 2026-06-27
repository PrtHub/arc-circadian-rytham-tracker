import type { Metadata } from "next";
import Link from "next/link";
import { scienceArticles } from "@/lib/science-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Science & Protocols | ARC Circadian Rhythm Tracker",
  description: "Explore protocols, biological mechanisms, glossary terms, and guides from the ARC scientific team.",
  alternates: {
    canonical: "/science",
  },
};

export default function SciencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ARC Science & Protocols Hub",
    "description": "Scientific resources, protocols, and definitions detailing human chronobiology.",
    "url": "https://arcapp.sbs/science",
    "hasPart": scienceArticles.map((article) => ({
      "@type": "WebPage",
      "headline": article.title,
      "url": `https://arcapp.sbs/science/${article.slug}`,
    })),
  };

  // Find featured article (e.g. caffeine tolerance reset protocol)
  const featured = scienceArticles.find(a => a.slug === "caffeine-tolerance-reset-protocol") || scienceArticles[0];
  const remaining = scienceArticles.filter(a => a.slug !== featured.slug);

  return (
    <div className="bg-black text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#CCFF00]/5 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />

      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-20 relative">
        <header className="mb-20 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-[#CCFF00]/10 text-[#CCFF00] text-xs font-black uppercase tracking-widest mb-4 inline-block">
            Scientific Reference Library
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter mb-6 leading-none">
            Science & <span className="text-[#CCFF00]">Protocols</span>.
          </h1>
          <p className="text-zinc-400 text-lg sm:text-xl leading-relaxed">
            Direct, evidence-based reference materials detailing circadian physiology, adenosine clearance protocols, and chronobiology glossary terms.
          </p>
        </header>

        {/* Featured Section */}
        {featured && (
          <section className="mb-16">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6 block">
              Featured Protocol
            </h2>
            <Link
              href={`/science/${featured.slug}`}
              className="group block relative p-8 sm:p-12 rounded-[36px] border border-[#CCFF00]/20 bg-gradient-to-br from-[#CCFF00]/10 via-[#CCFF00]/2 to-transparent overflow-hidden hover:border-[#CCFF00]/40 transition-all duration-300 hover:shadow-[0_0_50px_rgba(204,255,0,0.05)]"
            >
              {/* Card internal blur blob */}
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#CCFF00]/5 blur-3xl pointer-events-none" />

              <div className="max-w-2xl relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest uppercase">
                  <span className="px-3 py-1 rounded-full bg-[#CCFF00] text-black font-black">
                    {featured.categoryLabel}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-zinc-400">{featured.readTime} read</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white group-hover:text-[#CCFF00] transition-colors leading-tight">
                  {featured.title}
                </h3>

                <p className="text-zinc-400 leading-relaxed mb-8 text-base sm:text-lg">
                  {featured.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-[#CCFF00] group-hover:underline">
                  Launch Protocol Blueprint
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
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* Resources Grid */}
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-6 block">
            Science Resources & Reference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {remaining.map((article) => {
              let glowColor = "hover:border-[#CCFF00]/30 hover:shadow-[0_0_35px_rgba(204,255,0,0.03)]";
              let catBadge = "text-[#CCFF00] border-[#CCFF00]/20 bg-[#CCFF00]/5";
              let catIcon = "📋";

              if (article.category === "mechanism") {
                glowColor = "hover:border-blue-500/30 hover:shadow-[0_0_35px_rgba(59,130,246,0.03)]";
                catBadge = "text-blue-400 border-blue-500/20 bg-blue-500/5";
                catIcon = "🔬";
              } else if (article.category === "glossary") {
                glowColor = "hover:border-purple-500/30 hover:shadow-[0_0_35px_rgba(168,85,247,0.03)]";
                catBadge = "text-purple-400 border-purple-500/20 bg-purple-500/5";
                catIcon = "📖";
              } else if (article.category === "guide") {
                glowColor = "hover:border-amber-500/30 hover:shadow-[0_0_35px_rgba(245,158,11,0.03)]";
                catBadge = "text-amber-400 border-amber-500/20 bg-amber-500/5";
                catIcon = "🗺️";
              }

              return (
                <article
                  key={article.slug}
                  className={`group bg-zinc-950/60 backdrop-blur-md border border-white/5 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${glowColor}`}
                >
                  <Link href={`/science/${article.slug}`} className="p-8 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-6 text-xs font-bold tracking-widest uppercase">
                        <span className={`px-3 py-1 rounded-full border flex items-center gap-1.5 ${catBadge}`}>
                          <span>{catIcon}</span>
                          <span>{article.categoryLabel}</span>
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500">{article.readTime}</span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight mb-3 text-white group-hover:text-white transition-colors">
                        {article.title}
                      </h3>

                      <p className="text-zinc-500 leading-relaxed mb-8 text-sm">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[#CCFF00] group-hover:underline">
                      Access Science
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
