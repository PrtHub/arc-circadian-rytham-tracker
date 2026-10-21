import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolBreadcrumbs,
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
    href: "/tools/sunlight-calculator",
    label: "Morning Sunlight Calculator & Lux Protocol",
    note: "calculate your required outdoor lux window",
  },
  {
    href: "/tools/social-jetlag-calculator",
    label: "Social Jetlag Calculator",
    note: "measure circadian drift between workdays and weekends",
  },
  {
    href: "/blog/why-coffee-makes-you-tired-caffeine-tolerance-adenosine",
    label: "Why Coffee Makes You Tired: Receptor Upregulation",
    note: "adenosine backlog and tolerance crashes",
  },
  {
    href: "/blog/caffeine-half-life-calculator-science",
    label: "Why an Afternoon Coffee Still Affects Tonight's Sleep",
    note: "deep sleep architecture and micro-arousals",
  },
  {
    href: "/for/coffee-drinkers",
    label: "ARC for Coffee Drinkers",
    note: "how the app tracks caffeine clearance in real time",
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
      <ToolBreadcrumbs title="Caffeine Calculator" />
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
            href="/tools/sunlight-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Circadian Anchor
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Morning Sunlight Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate outdoor lux requirements and timer durations to anchor your biological clock.
            </div>
          </a>
        </div>
      </section>

      {/* Static Benchmark Hour-by-Hour Caffeine Decay Table for Featured Snippets */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            Standard Coffee &amp; Caffeine Decay Table (Hour-by-Hour)
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            5.5-Hour Half-Life
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          How much caffeine is still in your system after drinking a cup of coffee or energy drink? This benchmark table shows the exponential clearance rate across common doses for an average metabolizer:
        </p>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                <th scope="col" className="py-3 px-3 font-semibold">Beverage / Starting Dose</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">+2 hrs</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">+4 hrs</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">+6 hrs</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">+8 hrs</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">+10 hrs</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">+12 hrs</th>
                <th scope="col" className="py-3 px-3 font-semibold text-right">Sleep-Safe Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">100 mg (Regular Brewed Coffee)</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">78 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">60 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">47 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">36 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">28 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">22 mg</td>
                <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">~5.5 hrs</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">150 mg (Double Espresso / Latte)</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">116 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">91 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">70 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">55 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">43 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">33 mg</td>
                <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">~8.5 hrs</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">200 mg (Celsius / Energy Drink)</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">155 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">121 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">94 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">73 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">57 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">44 mg</td>
                <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">~11.0 hrs</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">300 mg (Large Cold Brew / Drip)</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">233 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">181 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">141 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">109 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">85 mg</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">66 mg</td>
                <td className="py-3.5 px-3 text-right text-amber-400 font-bold">~14.5 hrs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Comprehensive In-Depth Scientific Pharmacology & Cutoff Guide */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          The Science of Caffeine Half-Life &amp; Sleep Pharmacology
        </h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            This interactive <strong className="text-white">coffee half-life calculator</strong> and <strong className="text-white">caffeine clearance calculator</strong> computes your metabolic decay timeline using the clinical pharmacokinetics of 1,3,7-trimethylxanthine. For an average adult, caffeine exhibits an elimination half-life of roughly 4 to 7 hours (averaging 5.5 hours in clinical settings). This means 5.5 hours after your final sip, exactly 50% of the active compound remains circulating in your bloodstream, actively blocking adenosine receptors in your brain.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            1. Pharmacokinetics: Absorption &amp; Adenosine Receptor Antagonism
          </h3>
          <p className="leading-relaxed mb-6">
            Caffeine is rapidly and completely absorbed through the gastrointestinal tract, reaching peak blood concentration (<strong className="text-white">Cmax</strong>) within <strong className="text-white">30 to 60 minutes</strong> of consumption.
          </p>
          <p className="leading-relaxed mb-6">
            Because it is both water- and lipid-soluble, caffeine effortlessly crosses the blood-brain barrier. Structurally, caffeine closely resembles <strong className="text-white">adenosine</strong>—the neuromodulator that builds up during waking hours to create homeostatic sleep pressure (Process S). Caffeine binds competitively to <strong className="text-white">A1 and A2A adenosine receptors</strong> without triggering intracellular signaling. By physically blocking these receptors, it prevents your brain from sensing fatigue. However, caffeine does not destroy adenosine; adenosine continues to accumulate in the interstitial space, leading to the dreaded &quot;caffeine crash&quot; once hepatic enzymes finally clear the compound.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            2. The CYP1A2 Genetic Divide: Fast vs. Slow Metabolizers
          </h3>
          <p className="leading-relaxed mb-6">
            Caffeine clearance is governed by the hepatic cytochrome P450 enzyme system—specifically the <strong className="text-white">CYP1A2 enzyme</strong>, which metabolizes caffeine into paraxanthine (84%), theobromine (12%), and theophylline (4%). Clearance velocity varies more than fourfold between individuals:
          </p>

          <div className="overflow-x-auto -mx-6 sm:mx-0 my-6">
            <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                  <th scope="col" className="py-3 px-3 font-semibold">Metabolic Rate</th>
                  <th scope="col" className="py-3 px-3 font-semibold">Half-Life</th>
                  <th scope="col" className="py-3 px-3 font-semibold">Regular Coffee Cutoff</th>
                  <th scope="col" className="py-3 px-3 font-semibold">Large Coffee Cutoff</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-mono">
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 font-bold text-white">Fast Metabolizer (CYP1A2*1A)</td>
                  <td className="py-3 px-3 text-zinc-300">~4.0 hours</td>
                  <td className="py-3 px-3 text-emerald-400">4.0 hrs before bed</td>
                  <td className="py-3 px-3 text-emerald-400">8.0 hrs before bed</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 font-bold text-white">Average Metabolizer</td>
                  <td className="py-3 px-3 text-zinc-300">~5.5 hours</td>
                  <td className="py-3 px-3 text-zinc-300">5.5 hrs before bed</td>
                  <td className="py-3 px-3 text-zinc-300">11.0 hrs before bed</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3 font-bold text-white">Slow Metabolizer (CYP1A2*1F)</td>
                  <td className="py-3 px-3 text-zinc-300">~7.0–10.0+ hours</td>
                  <td className="py-3 px-3 text-amber-400">7.0 hrs before bed</td>
                  <td className="py-3 px-3 text-amber-400">14.0 hrs before bed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 text-sm text-zinc-400 space-y-2">
            <p>
              <strong className="text-white">Critical Clearance Modifiers:</strong> Oral contraceptives and pregnancy significantly inhibit CYP1A2 activity, doubling or tripling caffeine half-life up to 12–16 hours. Fluvoxamine and certain antibiotics also slow clearance dramatically. In contrast, cigarette smoking and high intake of cruciferous vegetables (broccoli, Brussels sprouts) induce CYP1A2, speeding clearance.
            </p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            3. The Hidden Deep Sleep Penalty (Slow-Wave Suppression)
          </h3>
          <p className="leading-relaxed mb-6">
            Many coffee drinkers boast: <em>&quot;I can drink a double espresso at 9:00 PM and fall asleep immediately!&quot;</em>
          </p>
          <p className="leading-relaxed mb-6">
            While high homeostatic sleep pressure may indeed allow you to lose consciousness, polysomnography (brain wave monitoring) proves that circulating caffeine severely degrades your sleep architecture:
          </p>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>
              <strong className="text-white">Suppressed Slow-Wave Sleep (N3 Deep Sleep):</strong> Clinical trials (reviewed by Clark &amp; Landolt, 2017) demonstrate that caffeine taken in the late afternoon or evening reduces deep restorative N3 sleep by up to 20–30%. In a landmark trial by Drake et al. (2013, <em>Journal of Clinical Sleep Medicine</em>), a 400 mg dose taken 6 hours prior to bed reduced total sleep time by more than a full hour.
            </li>
            <li>
              <strong className="text-white">Glymphatic Clearance Impairment:</strong> Deep slow-wave sleep is the only phase where cerebrospinal fluid flushes the brain through the glymphatic system to eliminate metabolic waste products, including beta-amyloid. Without sufficient N3 sleep, you wake up groggy despite spending 8 hours in bed.
            </li>
            <li>
              <strong className="text-white">Micro-Arousals:</strong> Circulating caffeine elevates nocturnal autonomic nervous system activity, increasing cardiac heart rate and triggering dozens of subconscious micro-awakenings throughout the night.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            4. Why the 50 mg Bedtime Threshold Matters
          </h3>
          <p className="leading-relaxed mb-6">
            The ARC caffeine calculator sets a strict safety ceiling of <strong className="text-white">under 50 mg</strong> of active caffeine at bedtime. At levels below 50 mg, adenosine receptor occupancy is low enough that brain slow-wave sleep architecture remains intact. If you drink a 200 mg energy drink at 3:00 PM and go to bed at 11:00 PM (8 hours later), an average metabolizer still has roughly 73 mg circulating—well above the 50 mg cutoff.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            5. Synergistic Compounds &amp; 7-Day Tolerance Reset
          </h3>
          <p className="leading-relaxed mb-6">
            To smooth out caffeine jitters without increasing milligrams, pair your morning coffee with <strong className="text-white">L-Theanine at a 2:1 ratio</strong> (e.g. 200 mg L-Theanine with 100 mg caffeine). L-Theanine crosses the blood-brain barrier to promote alpha brain waves and GABAergic inhibition, smoothing out vasoconstriction and anxiety.
          </p>
          <p className="leading-relaxed mb-6">
            If caffeine has stopped working and you need multiple cups just to reach baseline, your brain has upregulated adenosine receptors. Reset your baseline with a structured 7-day taper:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-6">
            <li><strong className="text-white">Days 1–2:</strong> Cut your total daily caffeine intake by 50% (switch second cup to decaf or green tea).</li>
            <li><strong className="text-white">Days 3–4:</strong> Drop to 25% of baseline (single morning espresso or matcha).</li>
            <li><strong className="text-white">Days 5–7:</strong> Zero caffeine; substitute with brisk morning outdoor walks and cold hydration.</li>
            <li><strong className="text-white">Day 8:</strong> Reintroduce a single 100 mg cup; receptor sensitivity will be restored.</li>
          </ol>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}

