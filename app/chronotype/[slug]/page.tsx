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

  return {
    title: `${chronotype.name} Chronotype Schedule & Sleep Optimization | ARC`,
    description: `Learn the ideal daily schedule, peak focus windows, and caffeine cutoff for the ${chronotype.name} chronotype. Stop fighting your biology.`,
    keywords: `${chronotype.name} chronotype, ${chronotype.name} sleep schedule, chronotype test, chronobiology, peak focus window, circadian rhythm`,
    openGraph: {
      title: `${chronotype.name} Chronotype Guide`,
      description: chronotype.description,
    },
  };
}

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
        <main className="py-20 px-6 max-w-4xl mx-auto">
          <Link href="/#chronotypes" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
            ← Back to All Chronotypes
          </Link>
          
          <header className="mb-12">
            <div className="text-6xl mb-4">{chronotype.icon}</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4">
              The <span className="text-[#CCFF00]">{chronotype.name}</span> Chronotype
            </h1>
            <p className="text-xl text-zinc-400 font-medium mb-6">
              {chronotype.tagline} ({chronotype.populationPercentage} of population)
            </p>
            <p className="text-lg text-zinc-300 leading-relaxed">
              {chronotype.description}
            </p>
          </header>

          <section className="mb-12 bg-[#111] border border-white/5 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">Ideal Biological Schedule</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-[#CCFF00] font-semibold text-sm uppercase tracking-wider mb-2">Morning</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-zinc-500 text-sm">Natural Wake Time</span>
                    <span className="font-bold text-lg">{chronotype.idealSchedule.wake}</span>
                  </li>
                  <li>
                    <span className="block text-zinc-500 text-sm">Peak Focus Window</span>
                    <span className="font-bold text-lg">{chronotype.idealSchedule.focus}</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#CCFF00] font-semibold text-sm uppercase tracking-wider mb-2">Evening</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-zinc-500 text-sm">Caffeine Cutoff</span>
                    <span className="font-bold text-lg">{chronotype.idealSchedule.caffeineCutoff}</span>
                  </li>
                  <li>
                    <span className="block text-zinc-500 text-sm">Wind Down</span>
                    <span className="font-bold text-lg">{chronotype.idealSchedule.windDown}</span>
                  </li>
                  <li>
                    <span className="block text-zinc-500 text-sm">Target Sleep</span>
                    <span className="font-bold text-lg">{chronotype.idealSchedule.sleep}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="grid sm:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-green-400">✓</span> Strengths
              </h3>
              <ul className="space-y-2 text-zinc-300">
                {chronotype.strengths.map((s, i) => (
                  <li key={i}>• {s}</li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-400">✕</span> Challenges
              </h3>
              <ul className="space-y-2 text-zinc-300">
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

        </main>
        <FinalCta />
        <Footer />
      </div>
    </>
  );
}
