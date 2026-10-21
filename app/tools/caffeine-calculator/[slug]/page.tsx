import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { JsonLd, ToolFaqSection, toolAppJsonLd, type ToolFaq } from "../../_components/tool-extras";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import CaffeineCalculatorClient from "../CaffeineCalculatorClient";
import { CAFFEINE_DRINKS, getDrinkBySlug, calculateDecayTable } from "@/lib/caffeine-drinks";
import { mgRemaining } from "@/lib/caffeine";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CAFFEINE_DRINKS.map((drink) => ({
    slug: drink.slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const drink = getDrinkBySlug(params.slug);

  if (!drink) {
    return { title: "Drink Not Found" };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";
  const title = `${drink.name} Caffeine Half-Life & Decay: How Much Is Left at Bedtime? | ARC`;
  const description = `See exact caffeine decay for ${drink.name} (${drink.amount}mg). Hour-by-hour remaining mg table for 8 AM, 12 PM, 2 PM, and 4 PM intake, bedtime residual, and your last safe cup.`;

  return {
    title,
    description,
    keywords: `${drink.name} caffeine, ${drink.name} caffeine half life, how much caffeine in ${drink.name}, ${drink.name} before bed, caffeine decay calculator, when to stop drinking ${drink.name}`,
    alternates: {
      canonical: `${SITE_URL}/tools/caffeine-calculator/${drink.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tools/caffeine-calculator/${drink.slug}`,
      siteName: "ARC Circadian Rhythm Tracker",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@iPritamX",
    },
  };
}

export default async function DrinkCaffeinePage(props: Props) {
  const params = await props.params;
  const drink = getDrinkBySlug(params.slug);

  if (!drink) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";
  const decayTable = calculateDecayTable(drink.amount, 5.5);

  const fastResidual8h = Math.round(mgRemaining(drink.amount, 8, 4.0));
  const avgResidual8h = Math.round(mgRemaining(drink.amount, 8, 5.5));
  const slowResidual8h = Math.round(mgRemaining(drink.amount, 8, 7.0));

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: drink.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Tools",
        item: `${SITE_URL}/tools`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Caffeine Calculator",
        item: `${SITE_URL}/tools/caffeine-calculator`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: drink.name,
        item: `${SITE_URL}/tools/caffeine-calculator/${drink.slug}`,
      },
    ],
  };

  const otherDrinks = CAFFEINE_DRINKS.filter((d) => d.slug !== drink.slug).slice(0, 6);

  return (
    <div className="text-white min-h-screen relative overflow-hidden" style={{ fontFamily: "var(--font-geist-sans)" }}>
      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <JsonLd
        data={toolAppJsonLd({
          name: `${drink.name} Caffeine Half-Life & Decay Calculator`,
          slug: `caffeine-calculator/${drink.slug}`,
          description: `Hourly decay table and bedtime residual caffeine calculation for ${drink.name} (${drink.amount} mg).`,
        })}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <ContentNav backHref="/tools/caffeine-calculator" backLabel="Caffeine Calculator" />

      <main className="max-w-4xl mx-auto px-6 py-12">
        <Breadcrumbs
          items={[
            { name: "Tools", href: "/tools" },
            { name: "Caffeine Calculator", href: "/tools/caffeine-calculator" },
            { name: drink.name },
          ]}
        />

        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-(--accent)/30 bg-(--accent)/10 text-accent font-mono text-xs font-bold uppercase tracking-widest mb-4">
            {drink.category} · {drink.amount} mg Caffeine
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            {drink.name}{" "}
            <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[46px]">
              Caffeine Half-Life &amp; Bedtime Decay
            </span>
          </h1>
          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-6">
            {drink.description}
          </p>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-2xl bg-zinc-950/80 border border-white/10">
            <div>
              <span className="block text-xs font-mono text-zinc-400">Total Caffeine</span>
              <span className="text-xl font-bold font-mono text-accent">{drink.amount} mg</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-zinc-400">Serving Size</span>
              <span className="text-sm font-semibold text-white">{drink.servingSize}</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-zinc-400">Average Half-Life</span>
              <span className="text-sm font-semibold text-white">5.5 Hours</span>
            </div>
            <div>
              <span className="block text-xs font-mono text-zinc-400">Sleep-Safe Goal</span>
              <span className="text-sm font-semibold text-emerald-400">&lt; 50 mg by Bed</span>
            </div>
          </div>
        </header>

        {/* Interactive Stack Calculator with Drink Pre-filled */}
        <section className="mb-14">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Interactive Stack Calculator for {drink.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              We&apos;ve preloaded {drink.name} ({drink.amount}mg) below. Adjust your planned bedtime or add other drinks to see your exact curve.
            </p>
          </div>
          <CaffeineCalculatorClient initialDrinkName={drink.name} initialMg={drink.amount} />
        </section>

        {/* Static HTML Decay Table for Featured Snippets */}
        <section className="mb-14 raised-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
            <h2 className="text-2xl font-bold text-white">
              {drink.name} Hour-by-Hour Caffeine Decay Table
            </h2>
            <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
              Pharmacokinetic Decay (5.5h Half-Life)
            </span>
          </div>
          <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
            Exact milligrams of caffeine remaining in the bloodstream at 2-hour intervals if consumed at various times of day, based on an average human caffeine half-life of 5.5 hours. Target is less than 50mg active at 11:00 PM bedtime.
          </p>

          <div className="overflow-x-auto -mx-6 sm:mx-0">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                  <th scope="col" className="py-3 px-3 font-semibold">Intake Time</th>
                  <th scope="col" className="py-3 px-2.5 font-semibold text-center">+2 hrs</th>
                  <th scope="col" className="py-3 px-2.5 font-semibold text-center">+4 hrs</th>
                  <th scope="col" className="py-3 px-2.5 font-semibold text-center">+6 hrs</th>
                  <th scope="col" className="py-3 px-2.5 font-semibold text-center">+8 hrs</th>
                  <th scope="col" className="py-3 px-2.5 font-semibold text-center">+10 hrs</th>
                  <th scope="col" className="py-3 px-2.5 font-semibold text-center">+12 hrs</th>
                  <th scope="col" className="py-3 px-3 font-semibold text-right">At 11 PM Bed</th>
                  <th scope="col" className="py-3 px-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                {decayTable.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3.5 px-3 font-bold text-white whitespace-nowrap">
                      {row.intakeTimeLabel}
                    </td>
                    <td className="py-3.5 px-2.5 text-center text-zinc-300">{row.plus2h} mg</td>
                    <td className="py-3.5 px-2.5 text-center text-zinc-300">{row.plus4h} mg</td>
                    <td className="py-3.5 px-2.5 text-center text-zinc-300">{row.plus6h} mg</td>
                    <td className="py-3.5 px-2.5 text-center text-zinc-300">{row.plus8h} mg</td>
                    <td className="py-3.5 px-2.5 text-center text-zinc-300">{row.plus10h} mg</td>
                    <td className="py-3.5 px-2.5 text-center text-zinc-300">{row.plus12h} mg</td>
                    <td className="py-3.5 px-3 text-right font-bold text-accent whitespace-nowrap">
                      {row.atBedtime11PM} mg
                    </td>
                    <td className="py-3.5 px-3 text-right whitespace-nowrap">
                      {row.isSafeByBedtime ? (
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ✓ Sleep Safe
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          ✕ Above 50mg
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 text-xs text-zinc-400 leading-relaxed space-y-2">
            <p>
              <strong className="text-white">Cutoff Recommendation:</strong> {drink.cutoffRecommendation}
            </p>
            <p>
              Values are calculated using the standard exponential decay model: <code className="text-accent font-mono text-[11px]">mg_remaining = initial_mg * 0.5^(hours / half_life)</code>.
            </p>
          </div>
        </section>

        {/* Genetic Clearance Variations (Fast vs Slow Metabolizers) */}
        <section className="mb-14 raised-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-4 text-white">
            How Your Genetics (CYP1A2) Impact {drink.name} Clearance
          </h2>
          <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
            Over 95% of caffeine metabolism takes place in your liver via the cytochrome P450 enzyme <strong>CYP1A2</strong>. Depending on whether you carry the fast or slow metabolizing gene variant, clearance times for {drink.amount}mg vary drastically:
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-accent font-semibold block mb-1">
                Fast Metabolizer
              </span>
              <div className="text-2xl font-black text-white font-mono mb-1">4.0 Hours</div>
              <p className="text-xs text-zinc-400">
                Residual after 8 hours: <strong className="text-white font-mono">{fastResidual8h} mg</strong>.
                You clear caffeine rapidly and rarely experience insomnia from lunch beverages.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-(--accent)/30">
              <span className="text-xs font-mono uppercase text-accent font-semibold block mb-1">
                Average Metabolizer
              </span>
              <div className="text-2xl font-black text-white font-mono mb-1">5.5 Hours</div>
              <p className="text-xs text-zinc-400">
                Residual after 8 hours: <strong className="text-white font-mono">{avgResidual8h} mg</strong>.
                Standard biological decay rate representing ~50% of the population.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-mono uppercase text-accent font-semibold block mb-1">
                Slow Metabolizer
              </span>
              <div className="text-2xl font-black text-white font-mono mb-1">7.0+ Hours</div>
              <p className="text-xs text-zinc-400">
                Residual after 8 hours: <strong className="text-white font-mono">{slowResidual8h} mg</strong>.
                CYP1A2*1F carriers. Any caffeine consumed past noon will disrupt sleep architecture.
              </p>
            </div>
          </div>
        </section>

        {/* High-Intent Internal Links */}
        <section className="mb-14 grid sm:grid-cols-2 gap-4">
          <Link
            href="/tools/social-jetlag-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Circadian Tool
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Social Jetlag Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Find out whether late-afternoon caffeine is shifting your sleep midpoint and causing Monday morning brain fog.
            </div>
          </Link>

          <Link
            href="/tools/sleep-cocktail"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Supplement Protocol
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Huberman Sleep Cocktail Dosage Builder &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate exact dosages (144mg Magnesium L-Threonate, 50mg Apigenin, 100–200mg L-Theanine) to restore sleep quality.
            </div>
          </Link>

          <Link
            href="/for/adhd"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Neurodiversity
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Circadian Rhythms &amp; ADHD &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              How high-caffeine beverages interact with delayed circadian phases and stimulant medications in ADHD adults.
            </div>
          </Link>

          <Link
            href="/guides/caffeine-half-life-optimization-guide"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Complete Protocol
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Caffeine Optimization Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Adenosine receptor mechanics, half-life formulas, and how to reset your caffeine sensitivity.
            </div>
          </Link>
        </section>

        {/* FAQs */}
        <section className="mb-14">
          <ToolFaqSection
            faqs={drink.faqs.map((f) => ({
              q: f.q,
              a: f.a,
            }))}
          />
        </section>

        {/* Explore Other Drinks */}
        <section className="border-t border-white/10 pt-10 mb-12">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 font-mono">
            Check Caffeine Clearance for Other Popular Drinks
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {otherDrinks.map((od) => (
              <Link
                key={od.slug}
                href={`/tools/caffeine-calculator/${od.slug}`}
                className="p-3 rounded-xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all block group"
              >
                <span className="text-xs font-mono text-accent font-bold block">{od.amount} mg</span>
                <span className="text-xs font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
                  {od.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
