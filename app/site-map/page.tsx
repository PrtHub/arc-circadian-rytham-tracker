import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CAFFEINE_DRINKS } from "@/lib/caffeine-drinks";
import { COMPATIBILITY_PAIRINGS } from "@/lib/chronotype-compatibility-data";
import { blogPosts } from "@/lib/blog-data";
import { chronotypeDetails } from "@/lib/chronotype-data";
import { audienceDetails } from "@/lib/audience-data";
import { scienceArticles } from "@/lib/science-data";
import { booksData } from "@/lib/book-data";
import { guidesData } from "@/lib/guides-data";
import { BED_TIMES, WAKE_TIMES, timeSlug, timeLabel } from "@/lib/sleep-times";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arccircadian.com";

export const metadata: Metadata = {
  title: "HTML Sitemap & Complete Page Index",
  description:
    "Complete index of all 255+ circadian rhythm tools, chronotype schedules, drink caffeine calculators, sleep cycle guides, and chronobiology articles on ARC.",
  alternates: {
    canonical: `${SITE_URL}/site-map`,
  },
  openGraph: {
    title: "HTML Sitemap & Directory | ARC",
    description: "Browse all 255+ free sleep calculators, chronotype daily routines, caffeine half-life tools, and scientific guides.",
    url: `${SITE_URL}/site-map`,
    siteName: "ARC",
    type: "website",
  },
};

export default function SiteMapPage() {
  const pairings = Object.values(COMPATIBILITY_PAIRINGS).filter(
    (v, i, a) => a.findIndex((t) => t.slug === v.slug) === i
  );

  return (
    <div className="text-[#FDF6EC] min-h-screen relative overflow-hidden">
      <ContentNav backHref="/" backLabel="Home" />

      <main className="max-w-6xl mx-auto px-6 py-14 relative">
        <Breadcrumbs items={[{ name: "Site Map" }]} />

        <header className="mb-12 max-w-3xl">
          <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-[#C3BACB] font-mono mb-3">
            DIRECTORY &amp; SITE MAP
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-normal text-[#FDF6EC] mb-6 leading-tight">
            Complete Index of <em>All Pages</em>
          </h1>
          <p className="text-[#C3BACB] text-base sm:text-lg leading-relaxed">
            Every interactive calculator, chronotype schedule, caffeine half-life lookup, sleep time table, and chronobiology guide across ARC.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 1. Core Chronotypes */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Chronotypes</span>
              <span className="text-xs font-mono text-[#C3BACB]">8 pages</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB]">
              {Object.values(chronotypeDetails).map((c) => (
                <li key={c.slug}>
                  <Link href={`/chronotype/${c.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors">
                    {c.name} Chronotype Schedule
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/chronotype/bear-working-9-to-5" className="hover:text-[#FFD9A0] hover:underline transition-colors">
                  Bear Chronotype 9-to-5 Schedule
                </Link>
              </li>
              <li>
                <Link href="/chronotype/wolf-working-9-to-5" className="hover:text-[#FFD9A0] hover:underline transition-colors">
                  Wolf Chronotype 9-to-5 Schedule
                </Link>
              </li>
              <li>
                <Link href="/chronotype/lion-working-9-to-5" className="hover:text-[#FFD9A0] hover:underline transition-colors">
                  Lion Chronotype 9-to-5 Schedule
                </Link>
              </li>
              <li>
                <Link href="/chronotype/dolphin-working-9-to-5" className="hover:text-[#FFD9A0] hover:underline transition-colors">
                  Dolphin Chronotype 9-to-5 Schedule
                </Link>
              </li>
            </ul>
          </section>

          {/* 2. Free Interactive Tools */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Interactive Calculators</span>
              <span className="text-xs font-mono text-[#C3BACB]">15 tools</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB]">
              <li><Link href="/tools/caffeine-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Caffeine Half-Life &amp; Cutoff Calculator</Link></li>
              <li><Link href="/tools/chronotype-quiz" className="hover:text-[#FFD9A0] hover:underline transition-colors">8-Question Chronotype Quiz</Link></li>
              <li><Link href="/tools/sleep-cycle-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">90-Minute Sleep Cycle Calculator</Link></li>
              <li><Link href="/tools/daily-schedule-generator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Daily Schedule Generator by Chronotype</Link></li>
              <li><Link href="/tools/nap-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Power Nap Timing Calculator</Link></li>
              <li><Link href="/tools/jetlag-planner" className="hover:text-[#FFD9A0] hover:underline transition-colors">Circadian Jet Lag Shift Planner</Link></li>
              <li><Link href="/tools/sunlight-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Morning Sunlight Lux &amp; Sunrise Calculator</Link></li>
              <li><Link href="/tools/chronotype-compatibility" className="hover:text-[#FFD9A0] hover:underline transition-colors">Couples Chronotype Compatibility Checker</Link></li>
              <li><Link href="/tools/social-jetlag-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Social Jetlag Difference Calculator</Link></li>
              <li><Link href="/tools/sleep-debt-calculator" className="hover:text-[#FFD9A0] hover:underline transition-colors">Sleep Debt Recovery Calculator</Link></li>
              <li><Link href="/tools/chronotype-visualizer" className="hover:text-[#FFD9A0] hover:underline transition-colors">24-Hour Energy Curve Visualizer</Link></li>
              <li><Link href="/tools/sleep-cocktail" className="hover:text-[#FFD9A0] hover:underline transition-colors">Huberman Sleep Cocktail Dosage Builder</Link></li>
              <li><Link href="/tools/daylight-saving-time-planner" className="hover:text-[#FFD9A0] hover:underline transition-colors">Daylight Saving Time Adjustment Planner</Link></li>
              <li><Link href="/tools" className="hover:text-[#FFD9A0] hover:underline transition-colors font-semibold">View All Free Tools Directory →</Link></li>
            </ul>
          </section>

          {/* 3. Chronotype Couples Compatibility */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Couples Compatibility</span>
              <span className="text-xs font-mono text-[#C3BACB]">11 pairings</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB]">
              {pairings.map((p) => (
                <li key={p.slug}>
                  <Link href={`/tools/chronotype-compatibility/${p.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors">
                    {p.typeA.name} &amp; {p.typeB.name} Compatibility Schedule
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 4. Drink Caffeine Calculators */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Drink-Specific Caffeine Cutoff Calculators</span>
              <span className="text-xs font-mono text-[#C3BACB]">{CAFFEINE_DRINKS.length} drinks</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-sm text-[#C3BACB]">
              {CAFFEINE_DRINKS.map((drink) => (
                <div key={drink.slug}>
                  <Link href={`/tools/caffeine-calculator/${drink.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors flex items-center justify-between gap-2">
                    <span className="truncate">{drink.name}</span>
                    <span className="text-xs font-mono text-zinc-400 shrink-0">{drink.amount}mg</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Audience & Profession Hubs */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>For Specialized Routines</span>
              <span className="text-xs font-mono text-[#C3BACB]">6 personas</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB]">
              {Object.entries(audienceDetails).map(([slug, a]) => (
                <li key={slug}>
                  <Link href={`/for/${slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors">
                    Circadian Rhythm for {a.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 6. Step-by-Step Guides */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Guides &amp; Protocols</span>
              <span className="text-xs font-mono text-[#C3BACB]">{guidesData.length} guides</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB] max-h-72 overflow-y-auto pr-2">
              {guidesData.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors truncate block">
                    {g.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 7. Chronobiology Science */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Chronobiology Science</span>
              <span className="text-xs font-mono text-[#C3BACB]">{scienceArticles.length} papers</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB]">
              {scienceArticles.map((s) => (
                <li key={s.slug}>
                  <Link href={`/science/${s.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors block">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 8. Sleep Book Summaries */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Sleep &amp; Rhythm Books</span>
              <span className="text-xs font-mono text-[#C3BACB]">{booksData.length} books</span>
            </h2>
            <ul className="space-y-2 text-sm text-[#C3BACB]">
              {booksData.map((b) => (
                <li key={b.slug}>
                  <Link href={`/books/${b.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors block">
                    {b.title} by {b.author}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* 9. Sleep Cycle Matrix (Waking & Bedtime) */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md md:col-span-2">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>90-Min Sleep Cycle Matrix</span>
              <span className="text-xs font-mono text-[#C3BACB]">{WAKE_TIMES.length + BED_TIMES.length} schedules</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#C3BACB]">
              <div>
                <p className="font-semibold text-white mb-2">When to Sleep If Waking Up At:</p>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                  {WAKE_TIMES.map((m) => (
                    <Link
                      key={m}
                      href={`/bedtime/wake-up-at-${timeSlug(m)}`}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-[#FFD9A0]/20 hover:text-[#FFD9A0] transition-colors"
                    >
                      {timeLabel(m)}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold text-white mb-2">When to Wake Up If Sleeping At:</p>
                <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
                  {BED_TIMES.map((m) => (
                    <Link
                      key={m}
                      href={`/wake-up-time/bed-at-${timeSlug(m)}`}
                      className="px-2 py-1 rounded bg-white/5 hover:bg-[#FFD9A0]/20 hover:text-[#FFD9A0] transition-colors"
                    >
                      {timeLabel(m)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 10. Articles & App Comparisons */}
          <section className="bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-md md:col-span-2 lg:col-span-3">
            <h2 className="text-xl font-display text-[#FFD9A0] mb-4 flex items-center justify-between">
              <span>Articles, App Comparisons &amp; Reviews</span>
              <span className="text-xs font-mono text-[#C3BACB]">{blogPosts.length} articles</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-sm text-[#C3BACB] max-h-96 overflow-y-auto pr-2">
              {blogPosts.map((post) => (
                <div key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="hover:text-[#FFD9A0] hover:underline transition-colors line-clamp-1">
                    {post.title}
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
