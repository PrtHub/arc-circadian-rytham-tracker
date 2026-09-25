// Parses the markdown subset used by blog, guide, science and book content.
// One parser for every article template, so headings, the table of contents
// and callouts behave the same everywhere.

export type CalloutType = "TIP" | "NOTE" | "WARNING" | "IMPORTANT" | "CAUTION";

export type Block =
  | { kind: "heading"; level: 2 | 3 | 4; text: string; id: string }
  | { kind: "hr" }
  | { kind: "callout"; type: CalloutType; paragraphs: string[] }
  | { kind: "quote"; paragraphs: string[] }
  | { kind: "ul"; items: string[] }
  | { kind: "ol"; items: { marker: string; text: string }[] }
  | { kind: "table"; header: string[] | null; rows: string[][] }
  | { kind: "p"; text: string };

export interface Heading {
  id: string;
  title: string;
  level: 2 | 3;
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\*\*|\*|_/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const CALLOUT = /^\[!(TIP|NOTE|WARNING|IMPORTANT|CAUTION)\]\s*(.*)$/i;
const BULLET = /^[*\-•]\s+/;
const NUMBERED = /^(\d+)[.)]\s+/;
const TABLE_DIVIDER = /^\|?\s*:?-{3,}/;

function tableCells(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export function parseBlocks(content: string): Block[] {
  const lines = content.trim().split("\n");
  const blocks: Block[] = [];
  const usedIds = new Map<string, number>();
  let i = 0;

  const uniqueId = (text: string) => {
    const base = slugify(text) || "section";
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen + 1}`;
  };

  while (i < lines.length) {
    const line = lines[i].trim();

    if (!line || /^#\s/.test(line)) {
      // Blank lines separate blocks; "# " is the title, which the page renders itself.
      i++;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line)) {
      blocks.push({ kind: "hr" });
      i++;
      continue;
    }

    const heading = line.match(/^(#{2,4})\s+(.*?)\s*#*$/);
    if (heading) {
      const level = heading[1].length as 2 | 3 | 4;
      const text = heading[2];
      blocks.push({ kind: "heading", level, text, id: uniqueId(text) });
      i++;
      continue;
    }

    if (line.startsWith(">")) {
      // A run of "> " lines is one quote; a leading [!TYPE] turns it into a callout.
      const quoted: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoted.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      const callout = quoted[0].match(CALLOUT);
      const body = callout ? [callout[2], ...quoted.slice(1)] : quoted;
      const paragraphs = body.map((p) => p.trim()).filter(Boolean);
      blocks.push(
        callout
          ? { kind: "callout", type: callout[1].toUpperCase() as CalloutType, paragraphs }
          : { kind: "quote", paragraphs }
      );
      continue;
    }

    if (BULLET.test(line)) {
      const items: string[] = [];
      while (i < lines.length && BULLET.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(BULLET, ""));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (NUMBERED.test(line)) {
      const items: { marker: string; text: string }[] = [];
      while (i < lines.length && NUMBERED.test(lines[i].trim())) {
        const current = lines[i].trim();
        items.push({ marker: current.match(NUMBERED)![1], text: current.replace(NUMBERED, "") });
        i++;
      }
      blocks.push({ kind: "ol", items });
      continue;
    }

    if (line.startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i++;
      }
      const hasHeader = rows.length > 1 && TABLE_DIVIDER.test(rows[1]);
      const body = rows.filter((row) => !TABLE_DIVIDER.test(row)).map(tableCells);
      blocks.push({
        kind: "table",
        header: hasHeader ? body[0] : null,
        rows: hasHeader ? body.slice(1) : body,
      });
      continue;
    }

    blocks.push({ kind: "p", text: line });
    i++;
  }

  return blocks;
}

// Section headings for the table of contents. Uses "##" headings, or "###" when a
// piece has no "##" at all, with the same ids the renderer puts on the page.
export function extractHeadings(blocks: Block[]): Heading[] {
  const headings = blocks.filter(
    (b): b is Extract<Block, { kind: "heading" }> => b.kind === "heading"
  );
  const topLevel = headings.some((h) => h.level === 2) ? 2 : 3;
  return headings
    .filter((h) => h.level === topLevel)
    .map((h) => ({ id: h.id, title: h.text.replace(/\*\*|\*/g, ""), level: topLevel }));
}

// About 230 words a minute, rounded up.
export function readTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 230))} min`;
}
