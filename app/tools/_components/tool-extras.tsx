import type { Metadata } from "next";
import Link from "next/link";

// Shared building blocks for the free tool pages: metadata with social previews,
// JSON-LD, a visible FAQ that matches its FAQPage schema, and related reading.

const SITE_URL = "https://arcapp.sbs";

export interface ToolFaq {
  q: string;
  a: string;
}

export interface RelatedLink {
  href: string;
  label: string;
  note?: string;
}

export function toolMetadata({
  slug,
  title,
  description,
  keywords,
}: {
  slug: string;
  title: string;
  description: string;
  keywords: string;
}): Metadata {
  const url = `/tools/${slug}`;
  const socialTitle = `${title} | ARC`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: socialTitle,
      description,
      url,
      type: "website",
      siteName: "ARC: Circadian Rhythm Tracker",
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function toolAppJsonLd({
  name,
  slug,
  description,
}: {
  name: string;
  slug: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${SITE_URL}/tools/${slug}`,
    description,
    applicationCategory: "HealthApplication",
    operatingSystem: "All",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

export function ToolFaqSection({ faqs }: { faqs: ToolFaq[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section className="max-w-3xl mx-auto px-6 pb-12">
      <JsonLd data={jsonLd} />
      <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
        Frequently asked questions
      </h2>
      <div className="space-y-4">
        {faqs.map((f) => (
          <div key={f.q} className="raised-card p-6">
            <h3 className="text-lg font-bold text-white mb-2">{f.q}</h3>
            <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
              {f.a}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function RelatedReading({ links }: { links: RelatedLink[] }) {
  return (
    <section className="max-w-3xl mx-auto px-6 pb-16">
      <h2 className="text-2xl font-black mb-4 tracking-tight text-white">
        Related reading
      </h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href} className="text-sm sm:text-base leading-relaxed">
            <Link href={l.href} className="text-accent font-semibold hover:underline">
              {l.label}
            </Link>
            {l.note && <span className="text-(--fg-muted)">: {l.note}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
}

// One-line educational disclaimer for the health tools. Readable size, not fine print.
export function EducationalNote({
  text = "Educational, not medical advice. If sleep problems persist, talk to a doctor.",
}: {
  text?: string;
}) {
  return (
    <p className="mt-6 text-sm text-(--fg-muted) leading-relaxed border-l-2 border-(--accent)/40 pl-3">
      {text}
    </p>
  );
}
