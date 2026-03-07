import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata = {
    title: "Blog | ARC Circadian Rhythm Tracker",
    description: "Learn about chronobiology, sleep optimization, and peak performance on the ARC blog.",
};

export default function BlogPage() {
    return (
        <div className="bg-black text-white min-h-screen">
            <Nav />

            <main className="max-w-4xl mx-auto px-6 py-20">
                <header className="mb-16">
                    <h1 className="text-5xl font-black tracking-tighter mb-4">
                        The <span className="text-[#CCFF00]">ARC</span> Journal
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-xl">
                        Latest insights into chronobiology, sleep science, and the physics of human performance.
                    </p>
                </header>

                <div className="grid gap-12">
                    {blogPosts.map((post) => (
                        <article key={post.slug} className="group border-b border-white/5 pb-12 last:border-0">
                            <Link href={`/blog/${post.slug}`} className="block">
                                <div className="flex items-center gap-3 mb-4 text-xs font-bold tracking-widest text-[#CCFF00] uppercase">
                                    <span>{post.category}</span>
                                    <span className="w-1 h-1 rounded-full bg-zinc-800" />
                                    <span className="text-zinc-500">{post.readTime} read</span>
                                </div>

                                <h2 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-[#CCFF00] transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-zinc-500 leading-relaxed mb-6 max-w-2xl">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center gap-2 text-sm font-semibold text-white">
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
