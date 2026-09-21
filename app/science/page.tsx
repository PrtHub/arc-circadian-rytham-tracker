import type { Metadata } from "next";
import Link from "next/link";
import { scienceArticles } from "@/lib/science-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

export const metadata: Metadata = {
  title: "Circadian Protocols & Chronobiology Research | ARC 2.0 Science",
  description:
    "Explore peer-reviewed circadian protocols, adenosine clearance mechanics, zeitgeber anchors, and chronobiology glossary terms from the ARC scientific team.",
  keywords: [
    "circadian protocols",
    "chronobiology research",
    "adenosine sleep pressure",
    "caffeine tolerance reset",
    "zeitgeber meaning",
    "cortisol awakening response",
  ],
  alternates: {
    canonical: "/science",
  },
  openGraph: {
    title: "Circadian Protocols & Chronobiology Research | ARC 2.0 Science",
    description: "Evidence-based protocols and research detailing circadian physiology, adenosine clearance, and light exposure.",
    url: "https://arcapp.sbs/science",
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

  // Find featured article
  const featured = scienceArticles.find(a => a.slug === "caffeine-tolerance-reset-protocol") || scienceArticles[0];
  const remaining = scienceArticles.filter(a => a.slug !== featured.slug);

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      {/* Focused Hub Header (Left: Brand Logo, Right: Back to Home) */}
      <ContentNav backHref="/" backLabel="Home" />

      <main className="max-w-7xl mx-auto px-6 py-14 relative">
        <header className="mb-12 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-3 inline-block font-mono border border-(--accent)/20">
            Scientific Reference Library
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Science &amp; <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">Protocols</span>.
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
            Direct, evidence-based reference materials detailing circadian physiology, adenosine clearance protocols, and chronobiology glossary terms.
          </p>
        </header>

        {/* Featured Section */}
        {featured && (
          <section className="mb-14">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) mb-4 block font-mono">
              Featured Protocol
            </h2>
            <Link
              href={`/science/${featured.slug}`}
              className="group block relative p-6 sm:p-10 rounded-3xl raised-card hover:border-(--accent)/50 transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-(--accent)/10 blur-3xl pointer-events-none" />

              <div className="max-w-3xl relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold tracking-widest uppercase font-mono">
                  <span className="px-3 py-1 rounded-full bg-accent text-black font-black">
                    {featured.categoryLabel}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  <span className="text-(--fg-muted)">{featured.readTime} read</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-3 text-white group-hover:text-accent transition-colors leading-tight">
                  {featured.title}
                </h3>

                <p className="text-(--fg-muted) leading-relaxed mb-6 text-sm sm:text-base">
                  {featured.excerpt}
                </p>

                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-accent group-hover:underline font-mono">
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

        {/* Calculative Mid-Hub Callout Banner */}
        <CalculativeAppCallout
          variant="banner"
          badge="Chronobiology In Code"
          title="Turn peer-reviewed science into your daily operating system"
          description="ARC models your adenosine accumulation, core body temperature nadir (Tmin), and solar lux requirements with 100% private, on-device SQLite precision."
          featureBullets={[
            "Real-time caffeine half-life decay engine",
            "Automatic sunrise & sunset color temperature matching",
            "Zero cloud tracking • Works completely offline",
          ]}
          location="science_hub_mid_banner"
        />

        {/* Resources Grid (Expanded 3-Column Layout) */}
        <section className="mt-14">
          <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) mb-8 pb-4 border-b border-white/5 block font-mono">
            All Science Resources &amp; Protocols ({remaining.length + 1})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((article) => {
              let catBadge = "text-accent border-(--accent)/20 bg-(--accent)/10";
              let catIcon = "📋";

              if (article.category === "mechanism") {
                catBadge = "text-(--aura-ice) border-(--aura-ice)/20 bg-(--aura-ice)/10";
                catIcon = "🔬";
              } else if (article.category === "glossary") {
                catBadge = "text-(--aura-sleep) border-(--aura-sleep)/20 bg-(--aura-sleep)/10";
                catIcon = "📖";
              } else if (article.category === "guide") {
                catBadge = "text-(--aura-sun) border-(--aura-sun)/20 bg-(--aura-sun)/10";
                catIcon = "🗺️";
              }

              return (
                <article
                  key={article.slug}
                  className="group raised-card overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-(--accent)/40"
                >
                  <Link href={`/science/${article.slug}`} className="p-7 flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-2.5 mb-5 text-[11px] font-bold tracking-widest uppercase font-mono">
                        <span className={`px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${catBadge}`}>
                          <span>{catIcon}</span>
                          <span>{article.categoryLabel}</span>
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-(--fg-muted)">{article.readTime}</span>
                      </div>

                      <h3 className="text-xl font-bold tracking-tight mb-3 text-white group-hover:text-accent transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-(--fg-muted) leading-relaxed mb-6 text-xs sm:text-sm line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[11px] text-(--fg-muted) font-mono">
                        {article.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:underline font-mono">
                        Access Protocol
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
