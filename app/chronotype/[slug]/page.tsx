import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { chronotypeDetails } from "@/lib/chronotype-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/FinalCta";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const chronotype = chronotypeDetails[params.slug];
  
  if (!chronotype) {
    return { title: "Not Found" };
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  return {
    title: `${chronotype.name} Chronotype Schedule & Sleep Optimization | ARC`,
    description: `Learn the ideal daily schedule, peak focus windows, and caffeine cutoff for the ${chronotype.name} chronotype. Stop fighting your biology.`,
    keywords: `${chronotype.name} chronotype, ${chronotype.name} sleep schedule, chronotype test, chronobiology, peak focus window, circadian rhythm`,
    alternates: {
      canonical: `${SITE_URL}/chronotype/${params.slug}`,
    },
    openGraph: {
      title: `${chronotype.name} Chronotype Guide`,
      description: chronotype.description,
    },
  };
}

const chronotypeFaqs: Record<string, Array<{ q: string; a: string }>> = {
  lion: [
    {
      q: "Can a Lion chronotype shift their schedule later?",
      a: "Lions are genetically wired for early mornings due to PER3 gene variations. While you can force a later schedule temporarily, your biological temperature minimum will still wake you early, leading to sleep deprivation if bedtime is pushed back."
    },
    {
      q: "What is the best career schedule for a Lion?",
      a: "Lions thrive in traditional corporate environments and morning-heavy leadership roles. They perform best when they can schedule high-cognition tasks before noon and wrap up administrative work by 2:00 PM."
    }
  ],
  bear: [
    {
      q: "Can a Bear shift to a Wolf schedule?",
      a: "Bears follow the sun. Shifting to an evening Wolf schedule long-term is highly disruptive for Bears, leading to severe mid-afternoon energy crashes and accumulated sleep debt."
    },
    {
      q: "How many hours of sleep does a Bear need?",
      a: "Bears have a high sleep drive and typically require a full 8 hours of sleep to stay alert. Restricting sleep to 6 hours will trigger severe cognitive declines by day three."
    }
  ],
  wolf: [
    {
      q: "Am I lazy if I struggle to wake up at 7:00 AM?",
      a: "No. Wolves have a delayed circadian clock. When forced to wake up at 7 AM, a Wolf is biologically waking up in the middle of their deep sleep temperature minimum, leading to sleep inertia."
    },
    {
      q: "How can a Wolf survive a standard 9-to-5 schedule?",
      a: "Use bright light therapy immediately upon waking to advance your clock, delay caffeine by 2 hours, and schedule your most critical analytical tasks for 3 PM - 5 PM when your energy naturally peaks."
    }
  ],
  dolphin: [
    {
      q: "Why do Dolphins experience severe insomnia?",
      a: "Dolphins are characterized by nocturnal hyper-arousal. Their blood pressure and cortisol do not decline in the evening as they do for other chronotypes, keeping their brain alert."
    },
    {
      q: "Should Dolphins take melatonin supplements?",
      a: "Dolphins should avoid high-dose synthetic melatonin as it can cause daytime grogginess. Calm biological agents like L-Theanine, Magnesium Threonate, and dimming lights 2 hours before bed are much more effective."
    }
  ]
};

export default async function ChronotypePage(props: Props) {
  const params = await props.params;
  const chronotype = chronotypeDetails[params.slug];

  if (!chronotype) {
    notFound();
  }

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${chronotype.name} Chronotype Guide`,
    description: chronotype.description,
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <div className="bg-black text-white min-h-screen" style={{ fontFamily: "var(--font-geist-sans)" }}>
        <Nav />
        <main className="max-w-4xl mx-auto py-16 px-6" data-sky={chronotype.slug}>
          <Link href="/#chronotypes" className="inline-flex items-center gap-2 text-sm text-(--fg-muted) hover:text-white mb-8 transition-colors font-mono">
            ← Back to All Chronotypes
          </Link>
          
          <header className="mb-12">
            <div className="text-6xl mb-4">{chronotype.icon}</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4">
              The <span className="font-display italic font-normal text-accent text-6xl sm:text-7xl">{chronotype.name}</span> Chronotype
            </h1>
            <p className="text-xl text-(--fg-muted) font-medium mb-6">
              {chronotype.tagline} ({chronotype.populationPercentage} of population)
            </p>
            <p className="text-lg text-(--fg) leading-relaxed">
              {chronotype.description}
            </p>
          </header>

          <section className="mb-12 raised-card p-8">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Ideal Biological Schedule</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-accent font-bold text-xs uppercase tracking-wider mb-2 font-mono">Morning</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Natural Wake Time</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.wake}</span>
                  </li>
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Peak Focus Window</span>
                    <span className="font-bold text-lg text-white">{chronotype.idealSchedule.focus}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-accent font-bold text-xs uppercase tracking-wider mb-2 font-mono">Evening</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-(--fg-muted) text-sm">Caffeine Cutoff</span>
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
          </section>

          {/* Interactive Quiz CTA Card */}
          <div className="mb-12 p-8 rounded-3xl raised-card border-(--accent)/30 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tighter mb-2 text-white">
                Are you sure you are a {chronotype.name}?
              </h3>
              <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                Chronotypes aren't fixed guesses. Take our free 2-minute diagnostic based on clinical sleep markers to verify your true sleep animal.
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

          <section className="grid sm:grid-cols-2 gap-8 mb-16">
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

          <div className="prose prose-invert max-w-none mb-16">
            <h2>Optimize Your {chronotype.name} Schedule with ARC</h2>
            <p>
              Knowing your chronotype is only the first step. The real performance unlock comes from executing against it every single day. 
              The ARC app is built specifically to guide {chronotype.name}s through their optimal biological schedule.
            </p>
            <p>
              Instead of fighting your natural rhythm, ARC provides a live 24-hour daily trajectory. It tracks your caffeine half-life to ensure you hit your {chronotype.idealSchedule.caffeineCutoff} cutoff, times your morning sunlight exposure, and sends smart notifications precisely when your biology needs them.
            </p>
          </div>

          {/* FAQ Section */}
          <section className="border-t border-white/10 pt-16 mb-16">
            <h2 className="text-3xl font-black mb-8 tracking-tighter text-white">
              Frequently Asked Questions about {chronotype.name}s
            </h2>
            <div className="space-y-4">
              {chronotypeFaqs[chronotype.slug]?.map((faq, idx) => (
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
                    {faq.a}
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
