import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import type { Heading } from "@/lib/article";
import type { RelatedItem, ToolLink, Topic } from "@/lib/content-topics";

// Honest, topic-matched pitch placed inside the article, so phone readers
// meet it before the end of the page.
export function InArticleCta({ topic, location }: { topic: Topic; location: string }) {
  return (
    <aside aria-label="Get ARC for iPhone" className="my-4 raised-card border-(--accent)/30 p-6 sm:p-7">
      <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-accent mb-2">ARC for iPhone</p>
      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">{topic.cta.title}</h3>
      <p className="text-sm text-(--fg-muted) leading-relaxed mt-2">{topic.cta.body}</p>
      <ul className="mt-4 space-y-1.5 text-xs text-zinc-300">
        {topic.cta.bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-2">
            <span className="text-accent" aria-hidden="true">✓</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <AppStoreButton location={location} />
        <Link
          href={topic.tool.href}
          className="text-xs font-mono font-bold text-(--fg-muted) hover:text-white transition-colors"
        >
          Or try the free {topic.tool.name} →
        </Link>
      </div>
      <p className="mt-4 text-[11px] text-(--fg-muted)">
        7-day free trial on the annual plan · No account · Location never requested
      </p>
    </aside>
  );
}

export function RelatedReading({ items }: { items: RelatedItem[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="related-reading" className="pt-6">
      <h2 id="related-reading" className="text-xs font-black uppercase tracking-widest text-accent mb-4 font-mono">
        Keep reading
      </h2>
      <ul className="grid sm:grid-cols-3 gap-3">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block h-full p-4 rounded-2xl raised-card hover:border-(--accent)/40 transition-colors group"
            >
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-(--fg-muted)">
                {item.section}
              </span>
              <span className="block text-sm font-bold text-white mt-1 leading-snug group-hover:text-accent transition-colors">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ToolLinks({ tools }: { tools: ToolLink[] }) {
  return (
    <div className="p-6 rounded-3xl raised-card border border-white/10">
      <span className="text-[10px] font-black uppercase tracking-widest text-accent block font-mono mb-2">
        Free tools
      </span>
      <h3 className="text-base font-bold text-white mb-3">Try it on your own numbers</h3>
      <div className="space-y-2">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <span className="text-sm font-bold text-white group-hover:text-accent transition-colors">{tool.name} →</span>
            <span className="block text-xs text-(--fg-muted) mt-0.5">{tool.blurb}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function TableOfContents({ headings, label = "In this article" }: { headings: Heading[]; label?: string }) {
  if (headings.length < 2) return null;
  return (
    <div className="p-6 rounded-3xl raised-card border border-white/10">
      <h2 className="text-xs font-black uppercase tracking-widest text-accent mb-4 font-mono">{label}</h2>
      <nav aria-label={label} className="space-y-1 text-xs">
        {headings.map((heading) => (
          <a
            key={heading.id}
            href={`#${heading.id}`}
            className="block text-(--fg-muted) hover:text-white hover:translate-x-1 transition-all py-1 border-l-2 border-transparent hover:border-accent pl-3 leading-relaxed"
          >
            {heading.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
