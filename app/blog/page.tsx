import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { CalculativeAppCallout } from "@/components/CalculativeAppCallout";

export const metadata: Metadata = {
    title: "Circadian Science & Sleep Journal | ARC 2.0 Blog",
    description: "Deep-dive articles on chronobiology, caffeine metabolism, circadian light anchoring, and practical sleep architecture from the ARC scientific team.",
    keywords: [
        "chronobiology blog",
        "circadian rhythm articles",
        "sleep science guides",
        "caffeine half life",
        "morning light science",
        "sleep architecture",
    ],
    alternates: {
        canonical: "/blog",
    },
    openGraph: {
        title: "Circadian Science & Sleep Journal | ARC 2.0 Blog",
        description: "Evidence-based articles on circadian timing, caffeine decay, and human energy optimization.",
        url: "https://arcapp.sbs/blog",
    },
};

export default function BlogPage() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "The ARC Journal",
        "description": "Latest insights into chronobiology, sleep science, and the physics of human performance.",
        "url": "https://arcapp.sbs/blog",
        "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "url": `https://arcapp.sbs/blog/${post.slug}`,
            "datePublished": post.date
        }))
    };

    // Featured article
    const featured = blogPosts.find(p => p.slug === "why-do-i-crash-at-2pm-afternoon-energy-drop-fix") || blogPosts[0];
    const remaining = blogPosts.filter(p => p.slug !== featured.slug);

    const getCategoryBadge = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes("energy") || cat.includes("focus")) {
            return { badge: "text-accent border-(--accent)/20 bg-(--accent)/10", icon: "⚡" };
        }
        if (cat.includes("sleep")) {
            return { badge: "text-(--aura-sleep) border-(--aura-sleep)/20 bg-(--aura-sleep)/10", icon: "💤" };
        }
        if (cat.includes("biohack")) {
            return { badge: "text-(--aura-sun) border-(--aura-sun)/20 bg-(--aura-sun)/10", icon: "☕" };
        }
        if (cat.includes("adhd")) {
            return { badge: "text-(--aura-peak) border-(--aura-peak)/20 bg-(--aura-peak)/10", icon: "🧠" };
        }
        if (cat.includes("comparison")) {
            return { badge: "text-(--aura-ice) border-(--aura-ice)/20 bg-(--aura-ice)/10", icon: "⚖️" };
        }
        return { badge: "text-accent border-(--accent)/20 bg-(--accent)/10", icon: "📖" };
    };

    const featuredCat = getCategoryBadge(featured.category);

    return (
        <div className="text-white min-h-screen relative overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {/* Decorative Radial Glowing Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
            <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

            {/* Focused Hub Header (Left: Brand Logo, Right: Back to Home) */}
            <ContentNav backHref="/" backLabel="Home" />

            <main className="max-w-7xl mx-auto px-6 py-14 relative">
                <header className="mb-12 max-w-3xl">
                    <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-3 inline-block font-mono border border-(--accent)/20">
                        Circadian Science &amp; Sleep Journal
                    </span>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
                        The <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">ARC Journal</span>.
                    </h1>
                    <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
                        Deep-dive investigations into chronobiology, adenosine mechanics, caffeine clearance, and actionable protocols from the ARC team.
                    </p>
                </header>

                {/* Featured Section */}
                {featured && (
                    <section className="mb-14">
                        <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) mb-4 block font-mono">
                            Featured Investigation
                        </h2>
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group block relative p-6 sm:p-10 rounded-3xl raised-card hover:border-(--accent)/50 transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.08)]"
                        >
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-(--accent)/10 blur-3xl pointer-events-none" />

                            <div className="max-w-3xl relative z-10">
                                <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-bold tracking-widest uppercase font-mono">
                                    <span className="px-3 py-1 rounded-full bg-accent text-black font-black">
                                        {featured.category}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                    <span className="text-(--fg-muted)">{featured.readTime} read</span>
                                </div>

                                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight mb-3 text-white group-hover:text-accent transition-colors leading-tight">
                                    {featured.title}
                                </h3>

                                <p className="text-(--fg-muted) leading-relaxed mb-6 text-sm sm:text-base">
                                    {featured.excerpt}
                                </p>

                                <span className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-accent group-hover:underline font-mono">
                                    Read Full Investigation
                                    <svg
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </section>
                )}

                {/* Calculative App Callout Banner (Mid-Hub Placement) */}
                <CalculativeAppCallout
                    variant="banner"
                    badge="iOS Living Light Engine"
                    title="Track your circadian trajectory in real time"
                    description="ARC turns chronobiology research into automated daily notifications, dynamic caffeine half-life curves, and solar lux timers directly on iOS."
                    featureBullets={[
                        "Real-time caffeine decay curve on Lock Screen",
                        "22-step biological chronotype onboarding",
                        "100% private SQLite storage with zero tracking",
                    ]}
                    location="blog_hub_mid_banner"
                />

                {/* All Articles Grid (Expanded 3-Column Layout to reduce vertical scroll length) */}
                <section className="mt-14">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                        <h2 className="text-xs font-black uppercase tracking-widest text-(--fg-muted) font-mono">
                            All Journal Articles &amp; Case Studies ({remaining.length + 1})
                        </h2>
                        <span className="text-xs text-accent font-mono">
                            Sorted by Date
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {remaining.map((post) => {
                            const catStyle = getCategoryBadge(post.category);
                            return (
                                <article
                                    key={post.slug}
                                    className="group raised-card overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 hover:border-(--accent)/40"
                                >
                                    <Link href={`/blog/${post.slug}`} className="p-7 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex items-center gap-2.5 mb-5 text-[11px] font-bold tracking-widest uppercase font-mono">
                                                <span className={`px-2.5 py-0.5 rounded-full border flex items-center gap-1 ${catStyle.badge}`}>
                                                    <span>{catStyle.icon}</span>
                                                    <span>{post.category}</span>
                                                </span>
                                                <span className="text-zinc-600">•</span>
                                                <span className="text-(--fg-muted)">{post.readTime}</span>
                                            </div>

                                            <h3 className="text-xl font-bold tracking-tight mb-3 text-white group-hover:text-accent transition-colors leading-snug">
                                                {post.title}
                                            </h3>

                                            <p className="text-(--fg-muted) leading-relaxed mb-6 text-xs sm:text-sm line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                                            <span className="text-[11px] text-(--fg-muted) font-mono">
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-semibold text-accent group-hover:underline font-mono">
                                                Read
                                                <svg
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
