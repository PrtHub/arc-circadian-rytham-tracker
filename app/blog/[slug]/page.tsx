import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) return {};

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

    return {
        title: post.title,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: "article",
            publishedTime: new Date(post.date).toISOString(),
            url: `${SITE_URL}/blog/${post.slug}`,
            images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [`${SITE_URL}/opengraph-image`],
        },
        alternates: {
            canonical: `${SITE_URL}/blog/${post.slug}`,
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
            parts.push(<strong key={index} className="text-white font-extrabold">{boldText}</strong>);
        } else if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
            const italicText = token.slice(1, -1);
            parts.push(<em key={index} className="italic text-zinc-200">{italicText}</em>);
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

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: new Date(post.date).toISOString(),
        author: {
            "@type": "Organization",
            name: "ARC Scientific Team",
            url: SITE_URL,
        },
        image: `${SITE_URL}/opengraph-image`,
        url: `${SITE_URL}/blog/${post.slug}`,
    };

    // Extract table of contents from markdown H2s
    const lines = post.content.trim().split("\n");
    const headings: { id: string; title: string }[] = [];
    lines.forEach((line) => {
        if (line.startsWith("## ")) {
            const title = line.replace("## ", "").trim();
            const id = title.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
            headings.push({ id, title });
        }
    });

    return (
        <div className="text-white min-h-screen relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />

            {/* Decorative Radial Glowing Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

            {/* Focused Content Header (Left: Brand Logo, Right: Back to All Posts) */}
            <ContentNav backHref="/blog" backLabel="All Posts" />

            <main className="max-w-6xl mx-auto px-6 py-14 relative">
                {/* Header Block */}
                <header className="mb-14 max-w-4xl">
                    <div className="flex flex-wrap items-center gap-3 mb-6 text-xs font-bold tracking-widest text-accent uppercase font-mono">
                        <span className="px-3 py-1 rounded-full border border-(--accent)/20 bg-(--accent)/10">
                            {post.category}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="text-(--fg-muted)">{post.readTime} read</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="text-(--fg-muted)">Published {post.date}</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 leading-snug">
                        {post.title}
                    </h1>
                    <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
                        {post.excerpt}
                    </p>
                </header>

                {/* Two-Column Responsive Layout: Expanded Reading Column + Sticky Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Main Article Content (Expanded Width) */}
                    <article className="lg:col-span-8 space-y-6 text-(--fg) text-sm sm:text-base leading-relaxed">
                        {lines
                            .filter((line) => line.trim() !== "")
                            .map((line, i) => {
                                if (line.startsWith("# ")) return null;

                                if (line.trim() === "---") {
                                    return <hr key={i} className="my-10 border-white/10" />;
                                }

                                const alertMatch = line.match(/^>\s*\[!(TIP|NOTE|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/i);
                                if (alertMatch) {
                                    const type = alertMatch[1].toUpperCase();
                                    const content = alertMatch[2];
                                    
                                    let styles = {
                                        border: "border-(--accent)/30",
                                        bg: "bg-(--accent)/5",
                                        text: "text-accent",
                                        label: "Tip",
                                        icon: "💡"
                                    };
                                    
                                    if (type === "NOTE") {
                                        styles = {
                                            border: "border-white/10",
                                            bg: "bg-white/5",
                                            text: "text-zinc-300",
                                            label: "Note",
                                            icon: "ℹ️"
                                        };
                                    } else if (type === "WARNING" || type === "CAUTION") {
                                        styles = {
                                            border: "border-(--aura-crash)/30",
                                            bg: "bg-(--aura-crash)/10",
                                            text: "text-(--aura-crash)",
                                            label: "Warning",
                                            icon: "⚠️"
                                        };
                                    } else if (type === "IMPORTANT") {
                                        styles = {
                                            border: "border-(--aura-sleep)/30",
                                            bg: "bg-(--aura-sleep)/10",
                                            text: "text-(--aura-sleep)",
                                            label: "Important",
                                            icon: "✨"
                                        };
                                    }
                                    
                                    return (
                                        <div key={i} className={`my-6 p-5 rounded-2xl border ${styles.border} ${styles.bg} flex items-start gap-3.5`}>
                                            <span className="text-xl shrink-0 select-none">{styles.icon}</span>
                                            <div className="text-sm sm:text-base leading-relaxed">
                                                <strong className={`font-mono text-xs uppercase tracking-wider block mb-1 font-bold ${styles.text}`}>
                                                    {styles.label}
                                                </strong>
                                                <div className="text-(--fg)">
                                                    {parseMarkdownText(content)}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }

                                if (line.startsWith("> ")) {
                                    return (
                                        <blockquote key={i} className="border-l-2 border-accent pl-4 my-6 italic text-zinc-300 bg-white/[0.02] py-2 rounded-r-lg">
                                            {parseMarkdownText(line.slice(2))}
                                        </blockquote>
                                    );
                                }

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

                                if (line.startsWith("### ")) {
                                    return (
                                        <h3 key={i} className="text-base sm:text-lg font-bold text-white mt-6 mb-2 tracking-tight">
                                            {line.replace("### ", "")}
                                        </h3>
                                    );
                                }

                                if (line.startsWith("#### ")) {
                                    return (
                                        <h4 key={i} className="text-lg font-bold text-accent mt-6 mb-2 tracking-tight uppercase font-mono text-xs">
                                            {line.replace("#### ", "")}
                                        </h4>
                                    );
                                }

                                if (line.startsWith("* ") || line.startsWith("- ")) {
                                    return (
                                        <li key={i} className="list-disc ml-6 my-2 text-(--fg)">
                                            {parseMarkdownText(line.replace(/^(\*|-)\s+/, ""))}
                                        </li>
                                    );
                                }

                                if (/^\d+\. /.test(line)) {
                                    return (
                                        <div key={i} className="flex items-start gap-3 my-2 text-(--fg)">
                                            <span className="font-mono text-accent font-bold text-sm shrink-0 mt-0.5">
                                                {line.match(/^\d+\./)?.[0]}
                                            </span>
                                            <span>{parseMarkdownText(line.replace(/^\d+\. /, ""))}</span>
                                        </div>
                                    );
                                }

                                return <p key={i} className="mb-6">{parseMarkdownText(line)}</p>;
                            })}

                        {/* Calculative Mid-Article / Bottom Callout Banner */}
                        <CalculativeAppCallout
                            variant="banner"
                            badge="Automate This Protocol"
                            title="Stop calculating your biological windows manually"
                            description="ARC's local-first iOS app tracks your solar light windows, dynamic caffeine half-life decay, and chronotype in real time directly on your Lock Screen."
                            featureBullets={[
                                "Live caffeine decay curve updating with every sip",
                                "10,000 lux morning sunlight countdown ring",
                                "Zero account required • 100% private SQLite storage",
                            ]}
                            location={`blog_${post.slug}_bottom_banner`}
                        />

                        {/* Author Metadata Footer */}
                        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-(--fg-muted)">
                            <div>
                                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">
                                    Editor &amp; Review
                                </span>
                                <span className="text-white font-bold">ARC Scientific Team</span>
                            </div>
                            <div>
                                <span className="font-black uppercase tracking-widest block mb-1 opacity-70">
                                    Date Published
                                </span>
                                <span className="text-white font-bold">{post.date}</span>
                            </div>
                            <div>
                                <Link
                                    href="/blog"
                                    className="text-accent hover:underline font-bold"
                                >
                                    ← Browse All {blogPosts.length} Articles
                                </Link>
                            </div>
                        </div>
                    </article>

                    {/* Sticky Sidebar (Width & Space Optimization) */}
                    <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
                        {/* Table of Contents */}
                        {headings.length > 0 && (
                            <div className="p-6 rounded-3xl raised-card border border-white/10">
                                <h3 className="text-xs font-black uppercase tracking-widest text-accent mb-4 font-mono">
                                    Article Sections
                                </h3>
                                <nav className="space-y-2 text-xs">
                                    {headings.map((heading, idx) => (
                                        <a
                                            key={idx}
                                            href={`#${heading.id}`}
                                            className="block text-(--fg-muted) hover:text-white hover:translate-x-1 transition-all py-1 border-l-2 border-transparent hover:border-accent pl-3 leading-relaxed"
                                        >
                                            {heading.title}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        )}

                        {/* Calculative Sidebar App Callout */}
                        <CalculativeAppCallout
                            badge="iOS Companion"
                            title="Living Light & Circadian Tracking"
                            description="Sync your iPhone with the solar spectrum outside and eliminate afternoon energy crashes."
                            featureBullets={[
                                "Smart coffee cutoff alerts",
                                "Automatic sunrise lux tracking",
                                "Chronotype daily energy blueprints",
                            ]}
                            location={`blog_${post.slug}_sidebar`}
                        />

                        {/* Quick Navigation to Free Tools */}
                        <div className="p-6 rounded-3xl raised-card border border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent block font-mono mb-2">
                                Free Calculators
                            </span>
                            <h4 className="text-base font-bold text-white mb-3">
                                Test Your Biology
                            </h4>
                            <div className="space-y-2 text-xs font-mono">
                                <Link
                                    href="/tools/caffeine-calculator"
                                    className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-accent transition-colors"
                                >
                                    ☕ Caffeine Decay Calculator →
                                </Link>
                                <Link
                                    href="/tools/chronotype-quiz"
                                    className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-accent transition-colors"
                                >
                                    🦁 Find Your Chronotype →
                                </Link>
                                <Link
                                    href="/tools/sunlight-calculator"
                                    className="block p-2.5 rounded-xl bg-white/5 hover:bg-white/10 hover:text-accent transition-colors"
                                >
                                    ☀️ Morning Lux Timer →
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>

            <Footer />
        </div>
    );
}
