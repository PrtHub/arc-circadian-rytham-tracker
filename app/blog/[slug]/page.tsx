import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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

    return (
        <div className="bg-black text-white min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Nav />

            <main className="max-w-3xl mx-auto px-6 py-20">
                <header className="mb-20">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#CCFF00] hover:translate-x-[-4px] transition-transform mb-8"
                    >
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4 rotate-180"
                        >
                            <path
                                fillRule="evenodd"
                                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to Journal
                    </Link>
                    <div className="flex items-center gap-3 mb-6 text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
                        <span>{post.category}</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span className="text-zinc-500">{post.readTime} read</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tighter mb-8 leading-none">
                        {post.title}
                    </h1>
                    <p className="text-zinc-400 text-xl leading-relaxed">{post.excerpt}</p>
                </header>

                <section className="max-w-none">
                    <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
                        {post.content
                            .trim()
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, i) => {
                                if (line.startsWith("# ")) return null;

                                if (line.startsWith("### ")) {
                                    return (
                                        <h3 key={i} className="text-xl font-semibold text-white mb-4 mt-12 lowercase [font-variant:small-caps] tracking-wider">
                                            {line.replace("### ", "")}
                                        </h3>
                                    );
                                }

                                if (line.startsWith("* ") || line.startsWith("- ")) {
                                    return (
                                        <div key={i} className="flex gap-3 items-start my-2">
                                            <span className="text-[#CCFF00] mt-2">•</span>
                                            <span>{line.replace(/^[*+-] /, "")}</span>
                                        </div>
                                    );
                                }

                                if (/^\d+\./.test(line)) {
                                    return (
                                        <div key={i} className="flex gap-3 items-start my-2">
                                            <span className="text-[#CCFF00] font-bold min-w-[20px]">{line.match(/^\d+\./)?.[0]}</span>
                                            <span>{line.replace(/^\d+\. /, "")}</span>
                                        </div>
                                    );
                                }

                                return <p key={i} className="mb-6">{line}</p>;
                            })}
                    </div>
                </section>

                <div className="mt-20 pt-10 border-t border-white/5 flex items-center justify-between gap-6">
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-600 block mb-2">
                            Editor
                        </span>
                        <span className="text-white font-bold">ARC Scientific Team</span>
                    </div>
                    <div>
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-600 block mb-2">
                            Date Published
                        </span>
                        <span className="text-white font-bold">{post.date}</span>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 p-8 rounded-3xl bg-linear-to-b from-[#CCFF00]/10 to-transparent border border-[#CCFF00]/20">
                    <h3 className="text-2xl font-extrabold tracking-tighter mb-4 text-white">
                        Unlock your Peak Performance.
                    </h3>
                    <p className="text-zinc-500 mb-8 max-w-md leading-relaxed">
                        Stop guessing your biology. Get your personalized trajectory, 22-point
                        diagnostic, and real-time caffeine-melatonin tracking.
                    </p>
                    <a
                        href="https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl bg-[#CCFF00] px-8 py-4 text-sm font-black text-black hover:scale-105 transition-all"
                    >
                        Start Your Journey
                        <svg
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 h-5"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
            </main>

            <Footer />
        </div>
    );
}
