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
import SleepCocktailClient from "./SleepCocktailClient";

export const metadata = toolMetadata({
  slug: "sleep-cocktail",
  title: "Huberman Sleep Cocktail: Doses, Timing & Safety",
  description:
    "What's in Andrew Huberman's sleep cocktail (magnesium, L-theanine, apigenin, inositol), the doses he describes, when to take them, and who should skip them.",
  keywords:
    "Huberman sleep cocktail, Huberman sleep stack, magnesium L-threonate, L-theanine, apigenin, inositol, sleep supplement dosage",
});

const FAQS: ToolFaq[] = [
  {
    q: "What is in the Huberman sleep cocktail?",
    a: "Andrew Huberman has described taking magnesium (L-threonate or bisglycinate), L-theanine and apigenin 30 to 60 minutes before bed, with myo-inositol on some nights. It is one person's routine shared on a podcast, not a clinical protocol, and he suggests working on light and timing first.",
  },
  {
    q: "What doses does Huberman describe?",
    a: "Roughly 2,000 mg of magnesium L-threonate (about 144 mg elemental magnesium) or 100 to 200 mg elemental magnesium as bisglycinate, 100 to 200 mg L-theanine, 50 mg apigenin and around 900 mg myo-inositol. These sit within commonly cited ranges, but check with a doctor or pharmacist before trying them.",
  },
  {
    q: "Who should not take these supplements?",
    a: "Talk to a doctor or pharmacist first if you're pregnant or breastfeeding, under 18, have kidney disease, or take any medication, especially sedatives, blood-pressure or blood-thinning drugs, antidepressants or lithium. Don't give them to children without medical advice.",
  },
  {
    q: "Should I take the sleep cocktail every night?",
    a: "Most people shouldn't need these every night. Try one compound at a time for about a week, and stop if it doesn't help. If sleep problems persist, talk to a doctor rather than adding more supplements.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/blog/chronobiotic-supplements-magnesium-apigenin",
    label: "Chronobiotic supplements: magnesium, apigenin and melatonin alternatives",
  },
  {
    href: "/blog/melatonin-more-than-sleep-hormone",
    label: "Melatonin: more than a sleep hormone",
  },
  {
    href: "/blog/huberman-lab-sleep-protocol-how-to-follow-it-daily",
    label: "The Huberman Lab sleep protocol, day by day",
  },
  {
    href: "/guides/evening-blue-light-melatonin-defense-guide",
    label: "Evening light and melatonin: a wind-down guide",
  },
];

export default function SleepCocktailPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Sleep Cocktail Builder",
          slug: "sleep-cocktail",
          description:
            "An educational lookup of the sleep supplements and doses Andrew Huberman has described, with timing, evidence notes and safety guidance.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <SleepCocktailClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What the Sleep Cocktail Is (and Isn&apos;t)</h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            The &quot;sleep cocktail&quot; is the set of over-the-counter supplements that <strong className="text-white">Andrew Huberman</strong>, a Stanford neuroscientist and podcast host, has described taking himself. It is one person&apos;s routine, not a clinical protocol, and the evidence behind each compound ranges from modest to early. These are over-the-counter compounds, not a treatment for insomnia. If you take sleep medication, don&apos;t change it without your doctor.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">How the Compounds May Work</h3>
          <ul className="list-disc list-inside space-y-4 mb-6">
            <li>
              <strong className="text-white">Magnesium L-Threonate / Bisglycinate:</strong> Magnesium is involved in nerve signalling and relaxation, and low magnesium has been linked with poorer sleep. L-threonate may reach the brain more readily (much of that evidence is from animal studies); bisglycinate is a well-absorbed, gentle form.
            </li>
            <li>
              <strong className="text-white">L-Theanine:</strong> An amino acid found in tea. Small studies suggest it may help some people feel calmer and fall asleep more easily.
            </li>
            <li>
              <strong className="text-white">Apigenin:</strong> A compound found in chamomile. Early evidence suggests a mild calming effect; human sleep data are limited.
            </li>
            <li>
              <strong className="text-white">Inositol:</strong> A naturally occurring sugar-like compound. Huberman describes using it occasionally to fall back asleep after waking in the night; the evidence for sleep is thin.
            </li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Why This Stack Leaves Out Melatonin</h3>
          <p className="leading-relaxed mb-6">
            Most shop melatonin is 3 to 10 mg, far more than your body makes. Small, well-timed doses (0.5 to 1 mg is commonly used) can help shift timing for jet lag and delayed sleep phase, but ask a doctor about dose and timing, and don&apos;t give melatonin to children without medical advice.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">Sources</h3>
          <ul className="list-disc list-inside space-y-3 mb-6">
            <li>
              <a href="https://www.hubermanlab.com/newsletter/toolkit-for-sleep" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">Huberman Lab: Toolkit for Sleep</a> (the doses and timing described above)
            </li>
            <li>
              <a href="https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">NIH Office of Dietary Supplements: Magnesium fact sheet</a> (forms, safety, and the adult upper limit for supplemental magnesium)
            </li>
          </ul>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
