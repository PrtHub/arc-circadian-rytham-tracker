import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { audienceDetails } from "@/lib/audience-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/FinalCta";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const audience = audienceDetails[params.slug];
  
  if (!audience) {
    return { title: "Not Found" };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  return {
    title: `${audience.title} | ARC 2.0 Living Light`,
    description: audience.description,
    keywords: `${audience.name} sleep optimization, ${audience.name} circadian rhythm, focus app for ${audience.name}, chronotype`,
    alternates: {
      canonical: `${SITE_URL}/for/${params.slug}`,
    },
    openGraph: {
      title: `${audience.title} | ARC 2.0`,
      description: audience.description,
      url: `${SITE_URL}/for/${params.slug}`,
      siteName: "ARC Circadian Rhythm Tracker",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${audience.title} | ARC 2.0`,
      description: audience.description,
      creator: "@iPritamX",
    },
  };
}

const audienceCtaDetails: Record<string, { title: string; desc: string; buttonText: string; href: string }> = {
  adhd: {
    title: "Find Your Chronotype Strategy",
    desc: "Discover your genetic chronotype (often Wolves have ADHD) to map your tasks to your peak dopamine windows.",
    buttonText: "Take Chronotype Quiz",
    href: "/tools/chronotype-quiz"
  },
  founders: {
    title: "Optimize Your Peak Focus Windows",
    desc: "Stop guessing when you are sharpest. Take our 2-minute sleep animal diagnosis to unlock your productivity blueprint.",
    buttonText: "Verify Your Chronotype",
    href: "/tools/chronotype-quiz"
  },
  "shift-workers": {
    title: "Inverted Schedule Diagnosis",
    desc: "We support shift-workers and night owls. Discover your biological chronotype to build a customizable schedule.",
    buttonText: "Find Your Chronotype",
    href: "/tools/chronotype-quiz"
  },
  "coffee-drinkers": {
    title: "Calculate Your Live Caffeine Decay",
    desc: "Input your bedtime and drink history to see exactly when your body clears caffeine to protect deep sleep.",
    buttonText: "Caffeine Calculator",
    href: "/tools/caffeine-calculator"
  },
  "sleep-seekers": {
    title: "Measure Your Sleep Debt",
    desc: "Sleeping 8 hours but still tired? Calculate your cumulative biological sleep deficit and get a recovery protocol.",
    buttonText: "Sleep Debt Calculator",
    href: "/tools/sleep-debt-calculator"
  },
  biohackers: {
    title: "Calculate Your Sunlight Window",
    desc: "Reset your master clock by calculating exactly how many minutes of outdoor light you need based on cloud cover.",
    buttonText: "Sunlight Calculator",
    href: "/tools/sunlight-calculator"
  }
};

export default async function AudiencePage(props: Props) {
  const params = await props.params;
  const audience = audienceDetails[params.slug];

  if (!audience) {
    notFound();
  }

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: audience.title,
    description: audience.description,
    publisher: {
      "@type": "Organization",
      name: "ARC",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <div className="text-white min-h-screen relative overflow-hidden">
        {/* Decorative Radial Glowing Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
        <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

        <Nav />
        <main className="py-20 px-6 max-w-4xl mx-auto relative">
          <Link href="/#audience" className="inline-flex items-center gap-2 text-sm text-(--fg-muted) hover:text-white mb-8 transition-colors font-mono">
            ← Back to Home
          </Link>
          
          <header className="mb-12">
            <div className="text-6xl mb-4">{audience.icon}</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4">
              ARC for <span className="font-display italic font-normal text-accent text-6xl sm:text-7xl">{audience.name}</span>
            </h1>
            <p className="text-xl text-(--fg-muted) leading-relaxed max-w-2xl">
              {audience.description}
            </p>
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
              <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4 text-accent">The Biological Solution</h2>
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

          {/* Custom SEO Interactive CTA Banner */}
          {audienceCtaDetails[audience.slug] && (
            <div className="mb-16 p-8 rounded-3xl raised-card border-(--accent)/30 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-2xl font-extrabold tracking-tighter mb-2 text-white">
                  {audienceCtaDetails[audience.slug].title}
                </h3>
                <p className="text-(--fg-muted) max-w-md text-sm leading-relaxed">
                  {audienceCtaDetails[audience.slug].desc}
                </p>
              </div>
              <Link
                href={audienceCtaDetails[audience.slug].href}
                className="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-black text-black hover:scale-105 hover:brightness-110 active:scale-95 transition-all shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
              >
                {audienceCtaDetails[audience.slug].buttonText}
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          )}

        </main>
        <FinalCta />
        <Footer />
      </div>
    </>
  );
}
