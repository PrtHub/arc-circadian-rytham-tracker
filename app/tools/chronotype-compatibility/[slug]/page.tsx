import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolFaqSection,
  toolAppJsonLd,
  type RelatedLink,
} from "../../_components/tool-extras";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import ChronotypeCompatibilityClient from "../ChronotypeCompatibilityClient";
import {
  COMPATIBILITY_PAIRINGS,
  type CompatibilityPairingData,
} from "@/lib/chronotype-compatibility-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(COMPATIBILITY_PAIRINGS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const pairing = COMPATIBILITY_PAIRINGS[params.slug];

  if (!pairing) {
    return { title: "Not Found" };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  return {
    title: pairing.title,
    description: pairing.description,
    keywords: pairing.keywords,
    alternates: {
      canonical: `${SITE_URL}/tools/chronotype-compatibility/${pairing.slug}`,
    },
    openGraph: {
      title: pairing.title,
      description: pairing.description,
      url: `${SITE_URL}/tools/chronotype-compatibility/${pairing.slug}`,
      siteName: "ARC Circadian Rhythm Tracker",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: pairing.title,
      description: pairing.description,
      creator: "@iPritamX",
    },
  };
}

export default async function ChronotypePairingPage(props: Props) {
  const params = await props.params;
  const pairing = COMPATIBILITY_PAIRINGS[params.slug];

  if (!pairing) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: pairing.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pairing.title,
    description: pairing.description,
    url: `${SITE_URL}/tools/chronotype-compatibility/${pairing.slug}`,
    author: {
      "@type": "Organization",
      name: "ARC",
    },
    publisher: {
      "@type": "Organization",
      name: "ARC Circadian Rhythm Tracker",
      url: SITE_URL,
    },
  };

  const otherPairings = Object.values(COMPATIBILITY_PAIRINGS).filter(
    (p) => p.slug !== pairing.slug
  );

  const relatedLinks: RelatedLink[] = [
    {
      href: "/tools/chronotype-quiz",
      label: "Take the 8-Question Chronotype Quiz",
      note: "identify your true biological sleep animal",
    },
    {
      href: `/chronotype/${pairing.typeA.slug}`,
      label: `${pairing.typeA.name} Chronotype In-Depth Guide & Schedule`,
      note: `full hour-by-hour protocol for ${pairing.typeA.name}s`,
    },
    {
      href: `/chronotype/${pairing.typeB.slug}`,
      label: `${pairing.typeB.name} Chronotype In-Depth Guide & Schedule`,
      note: `full hour-by-hour protocol for ${pairing.typeB.name}s`,
    },
    {
      href: "/tools/social-jetlag-calculator",
      label: "Social Jetlag Calculator",
      note: "calculate circadian drift between weekday and weekend sleep",
    },
    {
      href: "/guides/sleep-chronotype-couples-compatibility-guide",
      label: "Couples Sleep Alignment Master Guide",
      note: "clinical strategies for bedroom harmony across mixed sleep clocks",
    },
  ];

  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: `${pairing.typeA.name} and ${pairing.typeB.name} Chronotype Compatibility`,
          slug: `chronotype-compatibility/${pairing.slug}`,
          description: pairing.description,
        })}
      />
      <JsonLd data={jsonLdFaq} />
      <JsonLd data={jsonLdArticle} />

      <ContentNav
        backHref="/tools/chronotype-compatibility"
        backLabel="All Pairings"
      />

      <div className="max-w-4xl mx-auto px-6 pt-6 -mb-6">
        <Breadcrumbs
          items={[
            { name: "Tools", href: "/tools" },
            { name: "Chronotype Compatibility", href: "/tools/chronotype-compatibility" },
            { name: `${pairing.typeA.name} & ${pairing.typeB.name}` },
          ]}
        />
      </div>

      {/* Header Badge */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-accent mb-4">
          <span>{pairing.typeA.icon} {pairing.typeA.name}</span>
          <span className="text-zinc-500">&times;</span>
          <span>{pairing.typeB.icon} {pairing.typeB.name}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          {pairing.typeA.name} &amp; {pairing.typeB.name} Sleep Compatibility
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {pairing.verdict}. Compare bedtimes, shared awake hours, and how to co-sleep without sacrificing restorative rest.
        </p>
      </section>

      {/* Interactive Tool Component Pre-Selected */}
      <ChronotypeCompatibilityClient
        initialPartnerA={pairing.typeA.slug}
        initialPartnerB={pairing.typeB.slug}
      />

      {/* Synchronized Daily Comparison Matrix Table for Featured Snippets */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            {pairing.typeA.name} vs. {pairing.typeB.name} Daily Routine Matrix
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Synchronized Comparison
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          How do the daily schedules of a {pairing.typeA.name} and {pairing.typeB.name} overlap? This side-by-side schedule highlights friction points and alignment windows:
        </p>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                <th scope="col" className="py-3 px-3 font-semibold">Biological Phase</th>
                <th scope="col" className="py-3 px-3 font-semibold">{pairing.typeA.icon} {pairing.typeA.name}</th>
                <th scope="col" className="py-3 px-3 font-semibold">{pairing.typeB.icon} {pairing.typeB.name}</th>
                <th scope="col" className="py-3 px-3 font-semibold text-right">Relationship Dynamic</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Wake Time</td>
                <td className="py-3.5 px-3 text-zinc-300">{pairing.typeA.wake}</td>
                <td className="py-3.5 px-3 text-zinc-300">{pairing.typeB.wake}</td>
                <td className="py-3.5 px-3 text-right text-accent font-bold">{pairing.wakeGap} offset</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Peak Deep Work</td>
                <td className="py-3.5 px-3 text-zinc-300">Morning (8:00 AM – 12:00 PM)</td>
                <td className="py-3.5 px-3 text-zinc-300">Late Afternoon (3:00 PM – 7:00 PM)</td>
                <td className="py-3.5 px-3 text-right text-emerald-400">Independent focus</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Caffeine Cutoff</td>
                <td className="py-3.5 px-3 text-zinc-300">12:00 PM – 2:00 PM</td>
                <td className="py-3.5 px-3 text-zinc-300">2:00 PM – 4:00 PM</td>
                <td className="py-3.5 px-3 text-right text-zinc-400">Staggered clearance</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Bedtime</td>
                <td className="py-3.5 px-3 text-zinc-300">{pairing.typeA.bed}</td>
                <td className="py-3.5 px-3 text-zinc-300">{pairing.typeB.bed}</td>
                <td className="py-3.5 px-3 text-right text-rose-400 font-bold">{pairing.bedGap} offset</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Shared Awake Window</td>
                <td colSpan={2} className="py-3.5 px-3 text-zinc-300 text-center">{pairing.sharedAwakeHours}</td>
                <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">Ideal for dinner &amp; dates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Clinical Relationship Analysis & Co-Sleeping Rules */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          Circadian Science of the {pairing.typeA.name} &amp; {pairing.typeB.name} Pairing
        </h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            {pairing.scientificAnalysis}
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            Key Relationship Strengths
          </h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            {pairing.strengths.map((str, idx) => (
              <li key={idx} className="text-zinc-300">{str}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            Friction Points &amp; Clash Triggers
          </h3>
          <ul className="list-disc list-inside space-y-2 mb-6">
            {pairing.challenges.map((chl, idx) => (
              <li key={idx} className="text-zinc-300">{chl}</li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            4 Practical Rules for Co-Sleeping Peace
          </h3>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            {pairing.coSleepingRules.map((rule, idx) => (
              <li key={idx} className="text-zinc-300">{rule}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* Other Popular Pairings Hub */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-4">
          Other Chronotype Compatibility Guides
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {otherPairings.map((p) => (
            <Link
              key={p.slug}
              href={`/tools/chronotype-compatibility/${p.slug}`}
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{p.typeA.icon}</span>
                <span className="text-xs font-mono text-zinc-400">&times;</span>
                <span className="text-base">{p.typeB.icon}</span>
              </div>
              <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
                {p.typeA.name} &amp; {p.typeB.name} Compatibility &rarr;
              </div>
              <div className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                {p.description}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ToolFaqSection faqs={pairing.faqs} />
      <RelatedReading links={relatedLinks} />

      <Footer />
    </div>
  );
}
