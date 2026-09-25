import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { chronotypeDetails } from "@/lib/chronotype-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/FinalCta";
import { AppStoreButton } from "@/components/AppStoreButton";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(chronotypeDetails).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const chronotype = chronotypeDetails[params.slug];

  if (!chronotype) {
    return { title: "Not Found" };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";
  const title = `${chronotype.name} Chronotype: Daily Schedule, Traits & Sleep`;
  const description = `The ${chronotype.name} chronotype explained: typical wake and sleep times, peak focus hours, morning light and caffeine timing, and answers to common questions.`;

  return {
    title,
    description,
    keywords: `${chronotype.name} chronotype, ${chronotype.name} sleep schedule, ${chronotype.name} chronotype schedule, chronotype test, chronobiology, circadian rhythm`,
    alternates: {
      canonical: `${SITE_URL}/chronotype/${params.slug}`,
    },
    openGraph: {
      title,
      description: chronotype.description,
      url: `${SITE_URL}/chronotype/${params.slug}`,
      siteName: "ARC Circadian Rhythm Tracker",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: chronotype.description,
      creator: "@iPritamX",
    },
  };
}

const LINK_PATTERN = /(\[[^\]]+\]\([^)]+\))/g;

/** Renders [text](/path) links inside plain data strings. */
function renderInline(text: string): ReactNode[] {
  return text.split(LINK_PATTERN).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return part;
    return (
      <Link
        key={i}
        href={match[2]}
        className="text-accent font-semibold underline decoration-(--accent)/30 hover:decoration-accent transition-colors"
      >
        {match[1]}
      </Link>
    );
  });
}

const stripLinks = (text: string) => text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

const CAFFEINE_FOOTNOTE =
  "There's no universal cutoff. For one average cup and an average metaboliser, caffeine takes roughly five hours to fall below 50 mg; a bigger cup, a slower metabolism, or an earlier coffee still in your system pushes that earlier. ARC works it out from your bedtime, how fast you clear caffeine, and everything you've logged today.";

export default async function ChronotypePage(props: Props) {
  const params = await props.params;
  const chronotype = chronotypeDetails[params.slug];

  if (!chronotype) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${chronotype.name} Chronotype: Daily Schedule, Traits & Sleep`,
    description: chronotype.description,
    url: `${SITE_URL}/chronotype/${chronotype.slug}`,
    author: {
      "@type": "Organization",
      name: "ARC",
    },
    publisher: {
      "@type": "Organization",
      name: "ARC",
      logo: {
        "@type": "ImageObject",
        url: "https://arcapp.sbs/icon.png",
      },
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: chronotype.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(faq.a) },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <div className="bg-black text-white min-h-screen relative overflow-hidden" style={{ fontFamily: "var(--font-geist-sans)" }}>
        {/* Decorative Radial Glowing Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

        {/* Focused Content Header */}
        <ContentNav backHref="/#chronotypes" backLabel="Chronotypes" />
        <main className="max-w-4xl mx-auto py-14 px-6 relative" data-sky={chronotype.slug}>

          <header className="mb-12">
            <div className="text-4xl mb-3">{chronotype.icon}</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 leading-tight">
              The <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">{chronotype.name}</span> Chronotype
            </h1>
            <p className="text-base sm:text-lg text-(--fg-muted) font-medium mb-4">
              {chronotype.tagline} (Breus estimates ~{chronotype.populationPercentage} of people)
            </p>
            <p className="text-lg text-(--fg) leading-relaxed mb-4">
              {chronotype.description}
            </p>
            <p className="text-sm text-(--fg-muted) leading-relaxed">
              {renderInline(
                "Lion, Bear, Wolf and Dolphin come from sleep psychologist Dr. Michael Breus's book The Power of When ([our summary](/books/the-power-of-when)). They're popular shorthand for morning–evening preference, not a clinical diagnosis."
              )}
            </p>
          </header>

          <section className="mb-12 raised-card p-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">A Typical {chronotype.name} Schedule</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-accent font-bold text-xs uppercase tracking-wider mb-2 font-mono">Morning</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Natural Wake Time</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.wake}</span>
                  </li>
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Peak Focus Hours</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.focus}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-accent font-bold text-xs uppercase tracking-wider mb-2 font-mono">Evening</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Typical Last Coffee*</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.caffeineCutoff}</span>
                  </li>
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Wind Down</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.windDown}</span>
                  </li>
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Target Sleep</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.sleep}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3 text-sm text-(--fg-muted) leading-relaxed">
              <p>
                <span className="text-white font-semibold">*Caffeine for a {chronotype.name}: </span>
                {chronotype.caffeineNote}
              </p>
              <p>{CAFFEINE_FOOTNOTE}</p>
              <p>
                <span className="text-white font-semibold">Morning light: </span>
                {chronotype.lightNote}
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">How to Tell You&apos;re a {chronotype.name}</h2>
            <ul className="space-y-2 text-(--fg-muted)">
              {chronotype.signs.map((sign, i) => (
                <li key={i}>• {sign}</li>
              ))}
            </ul>
          </section>

          {/* Interactive Quiz CTA Card */}
          <div className="mb-12 p-8 rounded-3xl raised-card border-(--accent)/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tighter mb-2 text-white">
                Are you sure you are a {chronotype.name}?
              </h3>
              <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                Take our free 2-minute, 8-question quiz to estimate your chronotype.
              </p>
            </div>
            <Link
              href="/tools/chronotype-quiz"
              className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-black text-black hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
            >
              Take Chronotype Quiz
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          <section className="mb-12 raised-card p-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 text-white">A Sample {chronotype.name} Day</h2>
            <ul className="space-y-3">
              {chronotype.sampleDay.map((item, i) => (
                <li key={i} className="grid grid-cols-[9rem_1fr] gap-4 text-sm">
                  <span className="font-mono font-bold text-accent">{item.time}</span>
                  <span className="text-(--fg)">{item.activity}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-(--fg-muted)">
              Times are illustrative. Your own day depends on your wake time and commitments.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4 text-white">{chronotype.deepDive.heading}</h2>
            <div className="space-y-4 text-(--fg) leading-relaxed">
              {chronotype.deepDive.paragraphs.map((paragraph, i) => (
                <p key={i}>{renderInline(paragraph)}</p>
              ))}
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-8 mb-4">
            <div className="raised-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <span className="text-accent">✓</span> Strengths
              </h3>
              <ul className="space-y-2 text-(--fg-muted)">
                {chronotype.strengths.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
            <div className="raised-card p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                <span className="text-(--aura-crash)">✕</span> Challenges
              </h3>
              <ul className="space-y-2 text-(--fg-muted)">
                {chronotype.challenges.map((c, i) => (
                  <li key={i}>• {c}</li>
                ))}
              </ul>
            </div>
          </section>
          <p className="mb-16 text-xs text-(--fg-muted)">Strengths and challenges as Breus describes them; individuals vary.</p>

          <div className="prose prose-invert max-w-none mb-8">
            <h2>What ARC Changes for a {chronotype.name}</h2>
            <p>
              Knowing your chronotype helps most when your day actually follows it. ARC uses your chronotype to set the phases of your day, then gives you one sentence explaining why you feel the way you do right now, and one next step at the top of a short day plan.
            </p>
            <p>{chronotype.arcForType}</p>
            <p>{renderInline(chronotype.related)}</p>
          </div>
          <div className="mb-16">
            <AppStoreButton location={`chronotype_${chronotype.slug}_bridge`} />
          </div>

          {/* FAQ Section */}
          <section className="border-t border-white/10 pt-16 mb-16">
            <h2 className="text-3xl font-black mb-8 tracking-tighter text-white">
              Frequently Asked Questions about {chronotype.name}s
            </h2>
            <div className="space-y-4">
              {chronotype.faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group raised-card p-6 [&_summary::-webkit-details-marker]:hidden open:border-(--accent)/40 transition-all"
                >
                  <summary className="flex justify-between items-center font-bold text-lg cursor-pointer text-white list-none group-open:text-accent transition-colors">
                    {faq.q}
                    <span className="text-zinc-400 group-open:rotate-180 transition-transform duration-200 font-mono">
                      ▼
                    </span>
                  </summary>
                  <p className="mt-4 text-(--fg-muted) leading-relaxed text-sm">
                    {renderInline(faq.a)}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Other Chronotype Links */}
          <section className="border-t border-white/10 pt-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-(--fg-muted) mb-6 font-mono">Explore Other Chronotypes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.values(chronotypeDetails)
                .filter((c) => c.slug !== chronotype.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/chronotype/${c.slug}`}
                    data-sky={c.slug}
                    className="raised-card p-4 text-center hover:border-(--accent)/40 transition-all block group"
                  >
                    <span className="text-2xl block mb-2">{c.icon}</span>
                    <span className="font-bold text-sm text-white block group-hover:text-accent transition-colors">{c.name}</span>
                    <span className="text-(--fg-muted) text-xs block">{c.tagline}</span>
                  </Link>
                ))}
            </div>
          </section>

        </main>
        <FinalCta />
        <Footer />
      </div>
    </>
  );
}
