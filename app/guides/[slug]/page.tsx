import Link from "next/link";
import { guidesData } from "@/lib/guides-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

export async function generateStaticParams() {
  return guidesData.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);
  if (!guide) return {};

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  return {
    title: `${guide.title} | ARC Guides`,
    description: guide.excerpt,
    openGraph: {
      title: `${guide.title} | ARC Master Guides`,
      description: guide.excerpt,
      type: "article",
      publishedTime: new Date(guide.date).toISOString(),
      url: `${SITE_URL}/guides/${guide.slug}`,
      images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt,
      images: [`${SITE_URL}/opengraph-image`],
    },
    alternates: {
      canonical: `${SITE_URL}/guides/${guide.slug}`,
    },
  };
}

function parseMarkdownText(text: string) {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\*.*?\*|\[.*?\]\(.*?\))/g;
  const tokens = text.split(regex);

  tokens.forEach((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      const boldText = token.slice(2, -2);
      parts.push(
        <strong key={index} className="text-white font-extrabold">
          {boldText}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      const italicText = token.slice(1, -1);
      parts.push(
        <em key={index} className="italic text-zinc-200">
          {italicText}
        </em>
      );
    } else if (token.startsWith("[") && token.includes("](")) {
      const closingBracketIndex = token.indexOf("](");
      const linkText = token.slice(1, closingBracketIndex);
      const linkUrl = token.slice(closingBracketIndex + 2, -1);

      const isExternal = linkUrl.startsWith("http") || linkUrl.startsWith("mailto");
      if (isExternal) {
        parts.push(
          <a
            key={index}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-semibold underline decoration-(--accent)/30 hover:decoration-accent transition-colors"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={index}
            href={linkUrl}
            className="text-accent font-semibold underline decoration-(--accent)/30 hover:decoration-accent transition-colors"
          >
            {linkText}
          </Link>
        );
      }
    } else {
      parts.push(token);
    }
  });

  return parts;
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guidesData.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.excerpt,
    datePublished: new Date(guide.date).toISOString(),
    author: {
      "@type": "Organization",
      name: guide.author.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "ARC Circadian",
      url: SITE_URL,
    },
    image: `${SITE_URL}/opengraph-image`,
    url: `${SITE_URL}/guides/${guide.slug}`,
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "text-emerald-400 border-emerald-500/20 bg-emerald-500/10";
      case "Intermediate":
        return "text-amber-400 border-amber-500/20 bg-amber-500/10";
      case "Advanced":
        return "text-rose-400 border-rose-500/20 bg-rose-500/10";
      default:
        return "text-accent border-(--accent)/20 bg-(--accent)/10";
    }
  };

  // Pre-process markdown for table detection
  const lines = guide.content.trim().split("\n");

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      {/* Focused Content Header (Left: Brand Logo, Right: Back to All Guides) */}
      <ContentNav backHref="/guides" backLabel="All Guides" />

      <main className="max-w-6xl mx-auto px-6 py-14 relative">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-(--fg-muted)">
            <li>
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/guides" className="hover:text-white transition-colors">
                Guides
              </Link>
            </li>
            <li>/</li>
            <li className="text-accent truncate max-w-[200px] sm:max-w-md">
              {guide.categoryLabel}
            </li>
          </ol>
        </nav>

        {/* Header Block */}
        <header className="mb-14 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest uppercase font-mono">
            <span className="px-3 py-1 rounded-full border border-(--accent)/20 bg-(--accent)/10 text-accent">
              {guide.categoryLabel}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full border ${getDifficultyBadge(guide.difficulty)}`}>
              {guide.difficulty}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-(--fg-muted)">Est. Timeline: {guide.estimatedDays}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-(--fg-muted)">{guide.readTime} read</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-snug">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-(--fg-muted) leading-relaxed mb-4">
            {guide.subtitle}
          </p>

          <div className="flex items-center gap-3 text-sm text-(--fg-muted) font-mono pt-4 border-t border-white/10">
            <span>By <strong className="text-white">{guide.author.name}</strong></span>
            <span>•</span>
            <span>{guide.author.role}</span>
          </div>
        </header>

        {/* Two-Column Layout: Article Body + Sticky Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Content */}
          <article className="lg:col-span-8 space-y-6 text-(--fg) text-sm sm:text-base leading-relaxed">
            {lines
              .filter((line) => line.trim() !== "")
              .map((line, i) => {
                if (line.startsWith("# ")) return null;

                if (line.trim() === "---") {
                  return <hr key={i} className="my-10 border-white/10" />;
                }

                // Callout Alert Box Match
                const alertMatch = line.match(
                  /^>\s*\[!(TIP|NOTE|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/i
                );
                if (alertMatch) {
                  const type = alertMatch[1].toUpperCase();
                  const content = alertMatch[2];

                  let styles = {
                    border: "border-(--accent)/30",
                    bg: "bg-(--accent)/5",
                    text: "text-accent",
                    label: "Tip",
                    icon: "💡",
                  };

                  if (type === "NOTE") {
                    styles = {
                      border: "border-white/10",
                      bg: "bg-white/5",
                      text: "text-zinc-300",
                      label: "Note",
                      icon: "ℹ️",
                    };
                  } else if (type === "WARNING" || type === "CAUTION") {
                    styles = {
                      border: "border-rose-500/30",
                      bg: "bg-rose-500/10",
                      text: "text-rose-400",
                      label: "Warning",
                      icon: "⚠️",
                    };
                  } else if (type === "IMPORTANT") {
                    styles = {
                      border: "border-amber-500/30",
                      bg: "bg-amber-500/10",
                      text: "text-amber-400",
                      label: "Important",
                      icon: "✨",
                    };
                  }

                  return (
                    <div
                      key={i}
                      className={`my-6 p-5 rounded-2xl border ${styles.border} ${styles.bg} flex items-start gap-3.5`}
                    >
                      <span className="text-xl shrink-0 select-none">{styles.icon}</span>
                      <div className="text-sm sm:text-base leading-relaxed">
                        <strong className={`font-mono text-xs uppercase tracking-wider block mb-1 font-bold ${styles.text}`}>
                          {styles.label}
                        </strong>
                        <div className="text-(--fg)">{parseMarkdownText(content)}</div>
                      </div>
                    </div>
                  );
                }

                // Regular Blockquote
                if (line.startsWith("> ")) {
                  return (
                    <blockquote
                      key={i}
                      className="border-l-2 border-accent pl-4 my-6 italic text-zinc-300 bg-white/[0.02] py-2 rounded-r-lg"
                    >
                      {parseMarkdownText(line.slice(2))}
                    </blockquote>
                  );
                }

                // H2 Heading
                if (line.startsWith("## ")) {
                  const headingText = line.replace("## ", "").trim();
                  const headingId = headingText
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, "")
                    .replace(/\s+/g, "-");

                  return (
                    <h2
                      id={headingId}
                      key={i}
                      className="text-xl sm:text-2xl font-bold text-white mt-10 mb-3 tracking-tight scroll-mt-28 flex items-center gap-2 group"
                    >
                      <span>{headingText}</span>
                      <a
                        href={`#${headingId}`}
                        aria-label={`Link to ${headingText}`}
                        className="opacity-0 group-hover:opacity-100 text-accent transition-opacity text-base font-normal"
                      >
                        #
                      </a>
                    </h2>
                  );
                }

                // H3 Heading
                if (line.startsWith("### ")) {
                  return (
                    <h3
                      key={i}
                      className="text-base sm:text-lg font-bold text-white mt-6 mb-2 tracking-tight"
                    >
                      {line.replace("### ", "")}
                    </h3>
                  );
                }

                // H4 Heading
                if (line.startsWith("#### ")) {
                  return (
                    <h4
                      key={i}
                      className="text-lg font-bold text-accent mt-6 mb-2 tracking-tight uppercase font-mono text-xs"
                    >
                      {line.replace("#### ", "")}
                    </h4>
                  );
                }

                // Bullet Lists
                if (line.startsWith("* ") || line.startsWith("- ")) {
                  return (
                    <li key={i} className="list-disc ml-6 my-2 text-(--fg)">
                      {parseMarkdownText(line.replace(/^(\*|-)\s+/, ""))}
                    </li>
                  );
                }

                // Numbered Lists
                if (/^\d+\.\s/.test(line)) {
                  const cleanText = line.replace(/^\d+\.\s+/, "");
                  return (
                    <div key={i} className="flex items-start gap-3 my-2 text-(--fg)">
                      <span className="font-mono text-accent font-bold text-sm shrink-0 mt-0.5">
                        {line.match(/^\d+\./)?.[0]}
                      </span>
                      <span>{parseMarkdownText(cleanText)}</span>
                    </div>
                  );
                }

                // Markdown Table Row
                if (line.startsWith("|")) {
                  if (line.includes("---")) return null; // table divider
                  const cells = line
                    .split("|")
                    .map((c) => c.trim())
                    .filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);

                  const isHeader = i > 0 && lines[i + 1]?.includes("---");

                  return (
                    <div
                      key={i}
                      className={`grid grid-cols-${cells.length} gap-4 p-3 rounded-lg border border-white/5 ${
                        isHeader ? "bg-white/10 font-bold text-white font-mono text-xs uppercase" : "bg-white/[0.02] text-sm text-(--fg-muted)"
                      }`}
                    >
                      {cells.map((cell, cIdx) => (
                        <div key={cIdx}>{parseMarkdownText(cell)}</div>
                      ))}
                    </div>
                  );
                }

                // Default Paragraph
                return (
                  <p key={i} className="text-(--fg) leading-relaxed">
                    {parseMarkdownText(line)}
                  </p>
                );
              })}

            {/* Calculative Protocol Bottom Banner */}
            <CalculativeAppCallout
              variant="banner"
              badge="Protocol Automation"
              title="Apply this circadian guide with zero manual guesswork"
              description="ARC turns complex biological research into real-time iOS Lock Screen alerts, solar lux timers, and caffeine half-life tracking."
              featureBullets={[
                "Living light phase matching your solar coordinates",
                "Dynamic caffeine half-life decay engine",
                "100% private on-device SQLite database",
              ]}
              location={`guide_${guide.slug}_bottom_banner`}
            />
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
            {/* Table of Contents Card */}
            {guide.tableOfContents && guide.tableOfContents.length > 0 && (
              <div className="p-6 rounded-3xl raised-card border border-white/10">
                <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-4 font-mono">
                  Table of Contents
                </h3>
                <nav className="space-y-2.5 text-sm">
                  {guide.tableOfContents.map((item, idx) => (
                    <a
                      key={idx}
                      href={`#${item.id}`}
                      className="block text-(--fg-muted) hover:text-white hover:translate-x-1 transition-all py-1 border-l-2 border-transparent hover:border-accent pl-3 text-xs leading-relaxed"
                    >
                      {item.title}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Calculative Sidebar App Card */}
            <CalculativeAppCallout
              badge="iOS Master Engine"
              title="Automate Your Daily Schedule"
              description="ARC tracks your solar window, caffeine decay curve, and chronotype in real time on iOS."
              featureBullets={[
                "Real-time solar lux window alerts",
                "Dynamic caffeine cutoff calculator",
                "iOS 17+ Lock Screen Live Activities",
              ]}
              location={`guide_${guide.slug}_sidebar`}
            />

            {/* Related Tools Card */}
            {guide.relatedTools && guide.relatedTools.length > 0 && (
              <div className="p-6 rounded-3xl raised-card border border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-(--accent) mb-2 block font-mono">
                  Interactive Calculators
                </span>
                <h4 className="text-lg font-bold text-white mb-4">
                  Companion Tools
                </h4>
                <div className="space-y-3">
                  {guide.relatedTools.map((tool, idx) => (
                    <Link
                      key={idx}
                      href={tool.url}
                      className="block p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/10 transition-all group"
                    >
                      <div className="text-sm font-bold text-white group-hover:text-accent transition-colors flex items-center justify-between">
                        <span>{tool.name}</span>
                        <span className="text-accent text-xs">→</span>
                      </div>
                      <p className="text-xs text-(--fg-muted) mt-1">
                        {tool.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Back Link */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:-translate-x-1 transition-transform font-mono"
          >
            ← Back to All Guides
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center gap-2 text-sm font-semibold text-(--fg-muted) hover:text-white transition-colors font-mono"
          >
            Explore Free Tools →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
