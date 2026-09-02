import { audience } from "@/components/arc-data";
import Link from "next/link";

export function Audience() {
  return (
    <section
      aria-labelledby="audience-heading"
      className="py-20 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="mb-14">
          <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">
            Sound Familiar?
          </p>
          <h2
            id="audience-heading"
            className="text-4xl sm:text-5xl font-black tracking-tighter"
          >
            Built for people who are
            <br />
            <span className="font-display italic font-normal text-accent text-5xl sm:text-6xl">done guessing.</span>
          </h2>
        </div>

        <ul
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-label="Target audience"
        >
          {audience.map((a: any) => (
            <li
              key={a.title}
              className="raised-card hover:border-(--accent)/40 transition-all hover:-translate-y-1 flex flex-col group"
            >
              {a.slug ? (
                <Link href={`/for/${a.slug}`} className="p-6 flex-1 flex flex-col">
                  <span className="text-3xl mb-4 block" aria-hidden="true">{a.icon}</span>
                  <h3 className="font-bold text-white mb-2 group-hover:text-accent transition-colors">{a.title}</h3>
                  <p className="text-sm text-(--fg-muted) leading-relaxed mb-4 flex-1">{a.desc}</p>
                  <div className="text-accent text-xs font-bold uppercase tracking-wider group-hover:underline mt-auto font-mono">
                    View Guide →
                  </div>
                </Link>
              ) : (
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-3xl mb-4 block" aria-hidden="true">{a.icon}</span>
                  <h3 className="font-bold text-white mb-2">{a.title}</h3>
                  <p className="text-sm text-(--fg-muted) leading-relaxed">{a.desc}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
