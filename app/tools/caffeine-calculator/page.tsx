import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolFaqSection,
  toolAppJsonLd,
  toolMetadata,
  type RelatedLink,
  type ToolFaq,
} from "../_components/tool-extras";
import CaffeineCalculatorClient from "./CaffeineCalculatorClient";

export const metadata = toolMetadata({
  slug: "caffeine-calculator",
  title: "Caffeine Half-Life & Cutoff Calculator: How Much Is Left at Bedtime? | ARC",
  description:
    "Stack every coffee, espresso, or energy drink you've had today to see your exact mg of caffeine left at bedtime (4h, 5.5h, or 7h half-life) and your last safe cup.",
  keywords:
    "caffeine half life calculator, how much caffeine is left at bedtime, caffeine decay calculator, caffeine cutoff time, last coffee before bed, caffeine clearance calculator",
});

const FAQS: ToolFaq[] = [
  {
    q: "What is the half-life of caffeine?",
    a: "Roughly 4 to 7 hours depending on the person, around 5.5 on average. Genetics (CYP1A2 enzyme), pregnancy, smoking and medications all change it. The calculator lets you pick fast (4 h), average (5.5 h) or slow (7 h), the same three options the ARC app asks about.",
  },
  {
    q: "When should I stop drinking coffee before bed?",
    a: "There's no universal cutoff. For one average cup (about 100 mg) and an average metaboliser, caffeine takes roughly five and a half hours to fall below 50 mg. A bigger cup, a slower metabolism, or an earlier coffee still in your system pushes that earlier.",
  },
  {
    q: "How much caffeine is still in my system at bedtime?",
    a: "Take a 200 mg energy drink at 3 PM and a bedtime of 11 PM. Eight hours later you'd still have about 50 mg circulating if you clear caffeine fast, about 73 mg if you're average and about 91 mg if you're slow.",
  },
  {
    q: "Does my morning coffee affect my cutoff?",
    a: "Yes. Caffeine from earlier drinks is still in your system, so it uses up part of the room you have before bedtime. Two coffees at 8:20 and 10:45 can pull the last safe time for a third cup from about 3 PM to about 11 AM. Add every drink you've had today to see your real cutoff.",
  },
  {
    q: "Why does the calculator aim for under 50 mg at bedtime?",
    a: "It's the line the ARC app uses: a practical threshold rather than a hard biological cliff. If even a small afternoon coffee keeps you awake, choose the Slow setting to build in more margin.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/caffeine-half-life-optimization-guide",
    label: "The caffeine optimization guide",
    note: "half-life, cutoffs and resetting tolerance",
  },
  {
    href: "/blog/caffeine-half-life-calculator-science",
    label: "Why an afternoon coffee can still affect tonight's sleep",
  },
  {
    href: "/blog/caffeine-timing-when-to-stop-drinking-coffee",
    label: "Caffeine timing: when to stop drinking coffee",
  },
  {
    href: "/for/coffee-drinkers",
    label: "ARC for coffee drinkers",
  },
];

const POPULAR_DRINKS = [
  { name: "Celsius Energy Drink (200mg)", slug: "celsius-200mg", mg: "200 mg" },
  { name: "Starbucks Cold Brew Grande (205mg)", slug: "starbucks-cold-brew", mg: "205 mg" },
  { name: "Starbucks Blonde Espresso (150mg)", slug: "starbucks-blonde-espresso", mg: "150 mg" },
  { name: "Monster Energy (160mg)", slug: "monster-energy", mg: "160 mg" },
  { name: "Red Bull (80mg)", slug: "red-bull", mg: "80 mg" },
  { name: "Dunkin' Iced Coffee Medium (297mg)", slug: "dunkin-iced-coffee", mg: "297 mg" },
  { name: "Matcha Green Tea (70mg)", slug: "matcha", mg: "70 mg" },
  { name: "Starbucks Brewed Coffee (310mg)", slug: "starbucks-brewed-coffee", mg: "310 mg" },
  { name: "Celsius Heat (300mg)", slug: "celsius-heat", mg: "300 mg" },
  { name: "Rockstar Energy (160mg)", slug: "rockstar-energy", mg: "160 mg" },
  { name: "Nespresso Capsule (65mg)", slug: "nespresso-capsule", mg: "65 mg" },
  { name: "Diet Coke 12oz (46mg)", slug: "diet-coke", mg: "46 mg" },
];

export default function CaffeineCalculatorPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Caffeine Half-Life & Cutoff Calculator",
          slug: "caffeine-calculator",
          description:
            "A free tool to find your exact mg of caffeine left at bedtime and calculate your last safe cup, based on half-life decay curves and a 50 mg bedtime sleep threshold.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <CaffeineCalculatorClient />

      {/* Programmatic Drink Decay Guides Cluster */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Drink-Specific Caffeine Decay &amp; Clearance Tables
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Dedicated Clearance Guides
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Select a drink below to view its exact hour-by-hour metabolic decay schedule and bedtime residual levels:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {POPULAR_DRINKS.map((drink) => (
            <a
              key={drink.slug}
              href={`/tools/caffeine-calculator/${drink.slug}`}
              className="p-3.5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all block group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono text-accent font-bold">{drink.mg}</span>
                <span className="text-xs text-zinc-500 group-hover:text-accent transition-colors">&rarr;</span>
              </div>
              <div className="text-sm font-semibold text-white group-hover:text-accent transition-colors line-clamp-1">
                {drink.name}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* High-Intent Strategic Internal Links */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-4">
          Related Circadian Tools &amp; Protocols
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <a
            href="/tools/social-jetlag-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Circadian Recovery
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Social Jetlag Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Find out if your weekend sleep drift is causing your Monday fatigue.
            </div>
          </a>

          <a
            href="/tools/sleep-cocktail"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Supplement Protocol
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Huberman Sleep Cocktail Dosage Builder &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate exact doses: 144mg Magnesium Threonate, 50mg Apigenin, 100–200mg L-Theanine.
            </div>
          </a>

          <a
            href="/for/adhd"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Focus &amp; Stimulants
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              ARC for ADHD &amp; Executive Function &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              How circadian phase delays interact with stimulant medications and caffeine sensitivity.
            </div>
          </a>

          <a
            href="/guides/sleep-chronotype-couples-compatibility-guide"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Sleep Alignment
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Couples Chronotype Compatibility Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Synchronize caffeine schedules, evening wind-down, and sleep timing as a couple.
            </div>
          </a>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">The Science Behind the Calculator</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Caffeine has a <strong className="text-white">half-life</strong> of about 4 to 7 hours depending on how fast you metabolise it (around 5.5 on average). For an average metaboliser, about half of a coffee is still circulating 5 to 6 hours after you finish it, blocking adenosine receptors and holding off the sleep pressure that should be building.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why is my cutoff time so early?</h3>
          <p className="leading-relaxed mb-6">
            The calculator aims for under 50 mg of caffeine still circulating at bedtime, the same line the ARC app uses. If you have a 200 mg energy drink at 3:00 PM, you&apos;ll still have roughly 50 to 90 mg circulating at 11 PM (about 73 mg for an average metaboliser), above the 50 mg line. The calculator does the exponential decay math for you, so you&apos;re under 50 mg by the time you go to bed.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How does this affect my circadian rhythm?</h3>
          <p className="leading-relaxed mb-6">
            Caffeine doesn&apos;t remove sleep pressure; it masks it by blocking adenosine receptors. When it wears off, the adenosine that built up is still there, which is the crash. Caffeine late in the day can also make it harder to fall asleep and lighten your sleep, even on nights you drift off fine.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
