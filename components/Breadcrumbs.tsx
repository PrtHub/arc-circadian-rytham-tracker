import Link from "next/link";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  hideJsonLd?: boolean;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arccircadian.com";

export function Breadcrumbs({
  items,
  className = "mb-6",
  hideJsonLd = false,
}: BreadcrumbsProps) {
  // Always include Home as first item if not explicitly provided
  const allItems: BreadcrumbItem[] =
    items[0]?.name.toLowerCase() === "home"
      ? items
      : [{ name: "Home", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => {
      const position = index + 1;
      const fullUrl = item.href
        ? item.href.startsWith("http")
          ? item.href
          : `${SITE_URL}${item.href === "/" ? "" : item.href}`
        : undefined;

      return {
        "@type": "ListItem",
        position,
        name: item.name,
        ...(fullUrl ? { item: fullUrl } : {}),
      };
    }),
  };

  return (
    <>
      {!hideJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs font-mono text-zinc-400">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <li key={index} className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                {index > 0 && (
                  <span className="text-zinc-600 select-none" aria-hidden="true">
                    /
                  </span>
                )}
                {isLast || !item.href ? (
                  <span
                    className="text-accent truncate font-semibold max-w-[220px] sm:max-w-md"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors truncate max-w-[160px] sm:max-w-none"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
