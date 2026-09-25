import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { audienceDetails } from "@/lib/audience-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/FinalCta";
import { AppStoreButton } from "@/components/AppStoreButton";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(audienceDetails).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const audience = audienceDetails[params.slug];

  if (!audience) {
    return { title: "Not Found" };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  return {
    title: audience.title,
    description: audience.description,
    keywords: `${audience.name} circadian rhythm app, ${audience.name} energy, ${audience.name} sleep, caffeine cutoff, morning light, chronotype`,
    alternates: {
      canonical: `${SITE_URL}/for/${params.slug}`,
    },
    openGraph: {
      title: audience.title,
      description: audience.description,
      url: `${SITE_URL}/for/${params.slug}`,
      siteName: "ARC Circadian Rhythm Tracker",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: audience.title,
      description: audience.description,
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

const audienceCtaDetails: Record<string, { title: string; desc: string; buttonText: string; href: string }> = {
  adhd: {
    title: "Find Your Chronotype",
    desc: "ADHD is linked with later body clocks, and evening types (Wolves) are more common among people with ADHD. Take the 2-minute quiz to estimate your chronotype.",
    buttonText: "Take Chronotype Quiz",
    href: "/tools/chronotype-quiz",
  },
  founders: {
    title: "Find When You're Likely Sharpest",
    desc: "Take the 2-minute chronotype quiz to see when you're likely sharpest, and when the afternoon dip tends to land.",
    buttonText: "Take Chronotype Quiz",
    href: "/tools/chronotype-quiz",
  },
  "shift-workers": {
    title: "How Much Sleep Debt Have Your Shifts Built?",
    desc: "Add up your recent nights to see how much sleep debt you're carrying.",
    buttonText: "Sleep Debt Calculator",
    href: "/tools/sleep-debt-calculator",
  },
  "coffee-drinkers": {
    title: "Calculate Your Live Caffeine Decay",
    desc: "Enter your bedtime and today's drinks to see how much caffeine will still be circulating when you go to bed.",
    buttonText: "Caffeine Calculator",
    href: "/tools/caffeine-calculator",
  },
  "sleep-seekers": {
    title: "Measure Your Sleep Debt",
    desc: "Sleeping 8 hours but still tired? Add up your recent nights to see how much sleep debt you're carrying.",
    buttonText: "Sleep Debt Calculator",
    href: "/tools/sleep-debt-calculator",
  },
  biohackers: {
    title: "See Today's Sunrise and Light Window",
    desc: "See today's sunrise and your morning light window, the lever most of ARC's experiments start from.",
    buttonText: "Sunlight Calculator",
    href: "/tools/sunlight-calculator",
  },
};

export default async function AudiencePage(props: Props) {
  const params = await props.params;
  const audience = audienceDetails[params.slug];

  if (!audience) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: audience.title,
    description: audience.description,
    url: `${SITE_URL}/for/${audience.slug}`,
    publisher: {
      "@type": "Organization",
      name: "ARC",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: audience.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: stripLinks(faq.a) },
    })),
  };

  const cta = audienceCtaDetails[audience.slug];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />
      <div className="text-white min-h-screen relative overflow-hidden">
        {/* Decorative Radial Glowing Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

        {/* Focused Content Header */}
        <ContentNav backHref="/" backLabel="Home" />
        <main className="py-14 px-6 max-w-4xl mx-auto relative">

          <header className="mb-12">
            <div className="text-4xl mb-3">{audience.icon}</div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3 font-mono">ARC for {audience.name}</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-3 leading-tight">
              {audience.h1Lead}{" "}
              <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">{audience.name}</span>
            </h1>
            <p className="text-sm sm:text-base text-(--fg-muted) leading-relaxed max-w-2xl mb-6">
              {audience.description}
            </p>
            <AppStoreButton location={`for_${audience.slug}_header`} />
          </header>

          <section className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="raised-card p-8">
              <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 text-white">The Problem</h2>
              <ul className="space-y-4">
                {audience.painPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-(--fg-muted)">
                    <span className="text-(--aura-crash) shrink-0">✕</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="raised-card p-8">
              <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 text-accent">How ARC Helps</h2>
              <p className="text-(--fg-muted) leading-relaxed mb-8">
                {audience.arcSolution}
              </p>

              <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4 font-mono">Key Features</h3>
              <ul className="space-y-3">
                {audience.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-(--fg) text-sm">
                    <span className="text-accent shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {audience.sections.map((section, i) => (
            <section key={i} className="mb-12">
              <h2 className="text-2xl font-bold mb-4 text-white">{section.heading}</h2>
              <div className="space-y-4 text-(--fg) leading-relaxed">
                {section.paragraphs.map((paragraph, j) => (
                  <p key={j}>{renderInline(paragraph)}</p>
                ))}
              </div>
            </section>
          ))}

          {/* Free tool CTA (secondary to the App Store button above) */}
          {cta && (
            <div className="mb-16 p-8 rounded-3xl raised-card border-(--accent)/30 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tighter mb-2 text-white">
                  {cta.title}
                </h3>
                <p className="text-(--fg-muted) max-w-md text-sm leading-relaxed">
                  {cta.desc}
                </p>
              </div>
              <Link
                href={cta.href}
                className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-black text-black hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
              >
                {cta.buttonText}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}

          {/* FAQ Section */}
          {audience.faqs.length > 0 && (
            <section className="border-t border-white/10 pt-16 mb-12">
              <h2 className="text-3xl font-black mb-8 tracking-tighter text-white">
                Questions from {audience.name}
              </h2>
              <div className="space-y-4">
                {audience.faqs.map((faq, idx) => (
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
          )}

          {audience.disclaimer && (
            <p className="text-xs text-(--fg-muted) leading-relaxed border-t border-white/10 pt-6">
              {audience.disclaimer}
            </p>
          )}

        </main>
        <FinalCta />
        <Footer />
      </div>
    </>
  );
}
