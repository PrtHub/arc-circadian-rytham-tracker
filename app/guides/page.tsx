import type { Metadata } from "next";
import Link from "next/link";
import { guidesData } from "@/lib/guides-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

export const metadata: Metadata = {
  title: "Circadian Rhythm Protocols & Sleep Guides | ARC 2.0 Guides",
  description:
    "Comprehensive, step-by-step master guides on circadian rhythm resets, shift work protocols, caffeine pharmacokinetics, morning sunlight lux, and chronotype living.",
  keywords: [
    "circadian rhythm reset guide",
    "how to reset sleep schedule",
    "shift worker sleep protocol",
    "caffeine half life guide",
    "morning sunlight protocol",
    "chronotype daily schedule",
    "social jetlag recovery",
    "adhd sleep protocol",
  ],
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Circadian Rhythm Protocols & Sleep Guides | ARC 2.0 Guides",
    description:
      "Evidence-based master guides and protocols to recalibrate your biological clock, optimize caffeine half-life, and master sleep architecture.",
    url: "https://arcapp.sbs/guides",
  },
};

export default function GuidesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "ARC Circadian & Sleep Master Guides",
    "description":
      "Actionable step-by-step guides and scientific protocols for optimizing human circadian biology and sleep architecture.",
    "url": "https://arcapp.sbs/guides",
    "hasPart": guidesData.map((guide) => ({
      "@type": "HowTo",
      "name": guide.title,
      "description": guide.excerpt,
      "url": `https://arcapp.sbs/guides/${guide.slug}`,
    })),
  };

  const featured = guidesData[0];
  const remaining = guidesData.slice(1);

  const getDifficultyBadge = (difficulty: string) => {
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
  };

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
            Authoritative Playbooks &amp; Protocols
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Master <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">Guides</span>.
          </h1>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
            In-depth operational protocols for resetting your central pacemaker, managing night shifts, timing caffeine clearance, and structuring your life around your biology.
          </p>
        </header>

        {/* Featured Guide Hero */}
        {featured && (
          <section className="mb-14">
            <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) mb-4 block font-mono">
              Featured Pillar Guide
            </h2>
            <Link
              href={`/guides/${featured.slug}`}
              className="group block relative p-6 sm:p-10 rounded-3xl raised-card hover:border-(--accent)/50 transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
            >
              <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-(--accent)/10 blur-3xl pointer-events-none" />

              <div className="max-w-3xl relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold tracking-widest uppercase font-mono">
                  <span className="px-3 py-1 rounded-full bg-accent text-black font-black">
                    {featured.category}
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

                <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-accent group-hover:underline font-mono">
                  Read Full Master Guide
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
              </div>
            </Link>
          </section>
        )}

        {/* Calculative Mid-Hub Callout Banner */}
        <CalculativeAppCallout
          variant="banner"
          badge="Biological Automation"
          title="Don't manage complex circadian protocols manually"
          description="ARC synchronizes with your local GPS coordinates to time your exact solar windows, calculate caffeine decay, and automate your chronotype day plan on iOS."
          featureBullets={[
            "Live dynamic caffeine cutoff calculator",
            "10,000 lux morning light progress ring",
            "Personalized daily energy blueprints for Lion, Bear, Wolf & Dolphin",
          ]}
          location="guides_hub_mid_banner"
        />

        {/* Guides Grid (Expanded 3-Column Layout) */}
        <section className="mt-14">
          <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) mb-8 pb-4 border-b border-white/5 block font-mono">
            All Circadian Protocols &amp; Master Guides ({remaining.length + 1})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((guide) => (
              <article
                key={guide.slug}
                className="group raised-card overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-(--accent)/40"
              >
                <Link href={`/guides/${guide.slug}`} className="p-7 flex flex-col h-full justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] font-bold tracking-widest uppercase font-mono">
                      <span className="px-2.5 py-0.5 rounded-full bg-(--accent)/10 text-accent border border-(--accent)/20">
                        {guide.categoryLabel}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full border text-[10px] ${getDifficultyBadge(guide.difficulty)}`}>
                        {guide.difficulty}
                      </span>
                      <span className="text-zinc-600">•</span>
                      <span className="text-(--fg-muted) text-[11px]">{guide.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight mb-3 text-white group-hover:text-accent transition-colors leading-snug">
                      {guide.title}
                    </h3>

                    <p className="text-(--fg-muted) leading-relaxed mb-6 text-xs sm:text-sm line-clamp-3">
                      {guide.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] text-(--fg-muted) font-mono">
                      Timeline: <span className="text-white font-semibold">{guide.estimatedDays}</span>
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-accent group-hover:underline font-mono uppercase">
                      Start
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
            ))}
          </div>
        </section>

        {/* Bottom Tools Block */}
        <section className="mt-16 p-8 sm:p-12 rounded-[32px] raised-card border border-white/10 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-(--accent)/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4 inline-block font-mono border border-accent/20">
              Interactive Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Need personalized biological calculations?
            </h2>
            <p className="text-(--fg-muted) text-base mb-8">
              Explore our 10+ free circadian calculators to compute your exact caffeine cutoff, outdoor sunlight duration, and social jetlag score.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/tools"
                className="px-6 py-3 rounded-full bg-accent text-black font-bold text-sm font-mono uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Browse All Free Tools
              </Link>
              <Link
                href="/tools/chronotype-quiz"
                className="px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white font-bold text-sm font-mono uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Take Chronotype Quiz
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
