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

  return {
    title: `${audience.title} | ARC App`,
    description: audience.description,
    keywords: `${audience.name} sleep optimization, ${audience.name} circadian rhythm, focus app for ${audience.name}, chronotype`,
    openGraph: {
      title: audience.title,
      description: audience.description,
    },
  };
}

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
      <div className="bg-black text-white min-h-screen" style={{ fontFamily: "var(--font-geist-sans)" }}>
        <Nav />
        <main className="py-20 px-6 max-w-4xl mx-auto">
          <Link href="/#audience" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
            ← Back to Home
          </Link>
          
          <header className="mb-12">
            <div className="text-6xl mb-4">{audience.icon}</div>
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4">
              ARC for <span className="text-[#CCFF00]">{audience.name}</span>
            </h1>
            <p className="text-xl text-zinc-300 leading-relaxed max-w-2xl">
              {audience.description}
            </p>
          </header>

          <section className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">The Problem</h2>
              <ul className="space-y-4">
                {audience.painPoints.map((point, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300">
                    <span className="text-red-400 shrink-0">✕</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[#111] border border-white/5 p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6 border-b border-[#CCFF00]/20 pb-4 text-[#CCFF00]">The Biological Solution</h2>
              <p className="text-zinc-300 leading-relaxed mb-8">
                {audience.arcSolution}
              </p>
              
              <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">Key Features</h3>
              <ul className="space-y-3">
                {audience.features.map((feature, i) => (
                  <li key={i} className="flex gap-3 text-zinc-300 text-sm">
                    <span className="text-[#CCFF00] shrink-0">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </section>

        </main>
        <FinalCta />
        <Footer />
      </div>
    </>
  );
}
