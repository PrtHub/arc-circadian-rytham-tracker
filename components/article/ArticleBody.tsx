import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, CalloutType } from "@/lib/article";

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*|\[[^\]]+\]\([^)\s]+\))/g);

  return tokens.map((token, i) => {
    // Bold and italic can wrap a link, so their contents are parsed again.
    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={i} className="text-white font-extrabold">
          {renderInline(token.slice(2, -2))}
        </strong>
      );
    }
    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={i} className="italic text-zinc-200">
          {renderInline(token.slice(1, -1))}
        </em>
      );
    }
    const link = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      const className =
        "text-accent font-semibold underline decoration-(--accent)/30 hover:decoration-accent transition-colors";
      return /^(https?:|mailto:)/.test(href) ? (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      ) : (
        <Link key={i} href={href} className={className}>
          {label}
        </Link>
      );
    }
    return token;
  });
}

const CALLOUT_STYLES: Record<CalloutType, { box: string; label: string; text: string; icon: string }> = {
  TIP: { box: "border-(--accent)/30 bg-(--accent)/5", label: "Tip", text: "text-accent", icon: "💡" },
  NOTE: { box: "border-white/10 bg-white/5", label: "Note", text: "text-zinc-300", icon: "ℹ️" },
  WARNING: { box: "border-(--aura-crash)/30 bg-(--aura-crash)/10", label: "Warning", text: "text-(--aura-crash)", icon: "⚠️" },
  CAUTION: { box: "border-(--aura-crash)/30 bg-(--aura-crash)/10", label: "Caution", text: "text-(--aura-crash)", icon: "⚠️" },
  IMPORTANT: { box: "border-(--aura-sleep)/30 bg-(--aura-sleep)/10", label: "Important", text: "text-(--aura-sleep)", icon: "✨" },
};

function renderBlock(block: Block, key: number): ReactNode {
  switch (block.kind) {
    case "hr":
      return <hr key={key} className="my-10 border-white/10" />;

    case "heading": {
      if (block.level === 2) {
        return (
          <h2
            key={key}
            id={block.id}
            className="text-xl sm:text-2xl font-bold text-white pt-4 tracking-tight scroll-mt-28 flex items-center gap-2 group"
          >
            <span>{renderInline(block.text)}</span>
            <a
              href={`#${block.id}`}
              aria-label={`Link to this section`}
              className="opacity-0 group-hover:opacity-100 text-accent transition-opacity text-base font-normal"
            >
              #
            </a>
          </h2>
        );
      }
      if (block.level === 3) {
        return (
          <h3 key={key} id={block.id} className="text-base sm:text-lg font-bold text-white pt-2 tracking-tight scroll-mt-28">
            {renderInline(block.text)}
          </h3>
        );
      }
      return (
        <h4 key={key} id={block.id} className="text-sm font-bold text-accent pt-2 tracking-tight">
          {renderInline(block.text)}
        </h4>
      );
    }

    case "callout": {
      const style = CALLOUT_STYLES[block.type];
      return (
        <div key={key} className={`p-5 rounded-2xl border ${style.box} flex items-start gap-3.5`}>
          <span className="text-xl shrink-0 select-none" aria-hidden="true">
            {style.icon}
          </span>
          <div className="text-sm sm:text-base leading-relaxed space-y-2">
            <strong className={`font-mono text-xs uppercase tracking-wider block font-bold ${style.text}`}>{style.label}</strong>
            {block.paragraphs.map((p, i) => (
              <p key={i} className="text-(--fg)">
                {renderInline(p)}
              </p>
            ))}
          </div>
        </div>
      );
    }

    case "quote":
      return (
        <blockquote key={key} className="border-l-2 border-accent pl-4 italic text-zinc-300 bg-white/2 py-2 rounded-r-lg space-y-2">
          {block.paragraphs.map((p, i) => (
            <p key={i}>{renderInline(p)}</p>
          ))}
        </blockquote>
      );

    case "ul":
      return (
        <ul key={key} className="list-disc ml-6 space-y-2 marker:text-accent">
          {block.items.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );

    case "ol":
      return (
        <ol key={key} className="space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-mono text-accent font-bold text-sm shrink-0 mt-0.5">{item.marker}.</span>
              <span>{renderInline(item.text)}</span>
            </li>
          ))}
        </ol>
      );

    case "table":
      return (
        <div key={key} className="overflow-x-auto rounded-xl border border-white/10">
          <table className="w-full text-sm text-left">
            {block.header && (
              <thead className="bg-white/10 text-white font-mono text-xs uppercase tracking-wide">
                <tr>
                  {block.header.map((cell, i) => (
                    <th key={i} scope="col" className="px-4 py-3 font-bold">
                      {renderInline(cell)}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-t border-white/5 bg-white/2">
                  {row.map((cell, c) => (
                    <td key={c} className="px-4 py-3 text-(--fg-muted) align-top">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "p":
      return <p key={key}>{renderInline(block.text)}</p>;
  }
}

// Where the in-article call to action goes: before the 3rd section (after two full
// sections), else before the last section, else about 40% of the way down.
function insertPosition(blocks: Block[]) {
  const level = blocks.some((b) => b.kind === "heading" && b.level === 2) ? 2 : 3;
  const sections = blocks.flatMap((b, i) => (b.kind === "heading" && b.level === level ? [i] : []));
  if (sections.length >= 3) return sections[2];
  if (sections.length === 2) return sections[1];
  let pos = Math.max(1, Math.floor(blocks.length * 0.4));
  while (pos < blocks.length && blocks[pos - 1]?.kind === "heading") pos++;
  return pos;
}

export function ArticleBody({ blocks, insert }: { blocks: Block[]; insert?: ReactNode }) {
  const at = insert ? insertPosition(blocks) : -1;
  const rendered = blocks.map(renderBlock);
  if (insert) rendered.splice(Math.min(at, rendered.length), 0, <div key="insert">{insert}</div>);
  return <>{rendered}</>;
}
