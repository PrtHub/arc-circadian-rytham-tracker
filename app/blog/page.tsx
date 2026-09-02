import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

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

    return (
        <div className="text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Nav />

            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-16">
                    <h1 className="text-5xl sm:text-6xl font-black tracking-tighter mb-4">
                        The <span className="font-display italic font-normal text-accent text-6xl sm:text-7xl">ARC Journal</span>
                    </h1>
                    <p className="text-(--fg-muted) text-lg max-w-xl">
                        Latest insights into chronobiology, sleep science, and the physics of human performance.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="group raised-card overflow-hidden hover:border-(--accent)/40 transition-all flex flex-col">
                            <Link href={`/blog/${post.slug}`} className="p-8 flex flex-col h-full justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-widest text-accent uppercase font-mono">
                                        <span>{post.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                        <span className="text-(--fg-muted)">{post.readTime} read</span>
                                    </div>

                                    <h2 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors text-white">
                                        {post.title}
                                    </h2>

                                    <p className="text-(--fg-muted) leading-relaxed mb-6 text-sm">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center gap-2 text-sm font-semibold text-accent group-hover:underline transition-colors font-mono">
                                    Read Article
                                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
