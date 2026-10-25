import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { ChronotypeScheduleCustomizer } from "@/components/ChronotypeScheduleCustomizer";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export const metadata: Metadata = {
  title: "Dolphin Chronotype 9-to-5 Schedule: How Light Sleepers Master Office Hours | ARC",
  description:
    "A clinically engineered 6:30 AM – 11:30 PM corporate survival routine for the Dolphin chronotype: manage morning brain fog, optimize the 10 AM – 1 PM focus window, and eliminate evening insomnia.",
  keywords:
    "dolphin chronotype working 9 to 5, dolphin chronotype 9 to 5 schedule, dolphin chronotype routine, light sleeper corporate schedule, insomniac work schedule, dolphin chronotype focus",
  alternates: {
    canonical: `${SITE_URL}/chronotype/dolphin-working-9-to-5`,
  },
  openGraph: {
    title: "Dolphin Chronotype 9-to-5 Schedule: How Light Sleepers Master Office Hours | ARC",
    description:
      "A clinically engineered 6:30 AM – 11:30 PM corporate survival routine for the Dolphin chronotype: conquer morning brain fog and evening insomnia.",
    url: `${SITE_URL}/chronotype/dolphin-working-9-to-5`,
    siteName: "ARC Circadian Rhythm Tracker",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dolphin Chronotype 9-to-5 Schedule: How Light Sleepers Master Office Hours | ARC",
    description:
      "A clinically engineered corporate survival routine for the Dolphin chronotype: conquer morning fog and bedroom insomnia.",
    creator: "@iPritamX",
  },
};

const CORPORATE_SCHEDULE = [
  { time: "06:30 AM", phase: "Gentle Awakening Protocol", action: "Wake with a gradual sunrise alarm or natural light. Do not check work emails or news on your phone in bed.", biology: "Dolphins wake with elevated central nervous system arousal; early smartphone stimulation spikes adrenaline and cortisol." },
  { time: "06:45 AM – 07:15 AM", phase: "Outdoor Light Anchor & Gentle Movement", action: "Step outside for 20 minutes of daylight while doing light walking or gentle mobility. Drink 500ml water.", biology: "Bright morning photons suppress lingering nocturnal melatonin and help stabilize the irregular Dolphin cortisol rhythm." },
  { time: "07:30 AM – 08:30 AM", phase: "Protein Breakfast & Mindful Commute", action: "Eat eggs, smoked salmon, or Greek yogurt. Listen to calming music or an engaging podcast rather than high-stress news.", biology: "High-protein intake supplies L-tyrosine for dopamine synthesis while stabilizing blood glucose across the morning." },
  { time: "09:00 AM – 09:30 AM", phase: "Delayed Low-Dose Caffeine Window", action: "Drink one single espresso or small cup of green tea/matcha (under 100mg caffeine). Delay at least 2 hours post-wake.", biology: "Dolphins are hyper-sensitive to methylxanthines; massive 200mg+ caffeine doses trigger tachycardia, jitters, and anxiety." },
  { time: "09:30 AM – 12:30 PM", phase: "Peak Cognitive Zenith Block", action: "Protect this window for your highest-value creative and analytical work: complex problem solving, coding, and writing.", biology: "Dolphin cognitive superpower: brain alertness, working memory, and pattern recognition reach their daily peak." },
  { time: "12:30 PM – 01:30 PM", phase: "Low-Glycemic Lunch & Decompression", action: "Nutrient-dense salad with olive oil, avocado, and protein. Step away from computer screens completely.", biology: "Heavy carbohydrate meals cause sharp blood sugar drops that exacerbate Dolphin nervous exhaustion." },
  { time: "01:30 PM – 02:00 PM", phase: "Strict Hard Caffeine Cutoff", action: "Absolute last sip of caffeine for the entire day. Switch exclusively to water, chamomile, or decaf.", biology: "Dolphins have slower hepatic clearance or higher receptor sensitivity. Any caffeine past 2:00 PM fuels 11:30 PM insomnia." },
  { time: "02:00 PM – 03:00 PM", phase: "NSDR or Power Walk (No Napping)", action: "Do a 15-minute Non-Sleep Deep Rest (NSDR / Yoga Nidra) audio session or take an outdoor walk. Do not take long naps.", biology: "Sleeping for 40+ minutes in the afternoon robs the Dolphin of vital sleep pressure needed for nocturnal sleep onset." },
  { time: "03:00 PM – 05:00 PM", phase: "Collaborative Work & Routine Execution", action: "Triage inbox, attend scheduled meetings, organize tomorrow's task lists, and wrap up collaborative projects.", biology: "Secondary focus plateau: executive stamina is lower, making this ideal for interactive or conversational tasks." },
  { time: "05:30 PM – 06:30 PM", phase: "Low-Intensity Exercise (Yoga / Pilates)", action: "Engage in moderate aerobic exercise, swimming, or resistance training. Avoid high-intensity HIIT after 7:00 PM.", biology: "High-intensity evening cardio spikes core body temperature and sympathetic tone, delaying melatonin onset by hours." },
  { time: "07:00 PM – 08:00 PM", phase: "Warm Digestion Dinner", action: "Enjoy dinner with complex carbohydrates (quinoa, sweet potatoes) to stimulate evening tryptophan and melatonin synthesis.", biology: "Finishing dinner 3.5 hours before bed prevents nocturnal gastroesophageal reflux and elevated resting heart rate." },
  { time: "09:30 PM – 11:30 PM", phase: "Strict Sensory Wind-Down & Sleep", action: "Warm bath or shower, amber lamp lighting, read fiction, write 'worry journal' to dump tomorrow's tasks. Sleep at 11:30 PM.", biology: "Stimulus control therapy: cools core body temperature via peripheral vasodilation and quiets the racing mind." },
];

const FAQS = [
  {
    q: "Why do Dolphins struggle so much with traditional corporate hours?",
    a: "Dolphins have light, fragmented sleep architecture and frequently wake up multiple times per night. They often start their morning feeling unrefreshed, with morning brain fog that takes 1 to 2 hours to dissipate. Forcing rigid high-stakes morning meetings at 8:30 AM conflicts with their natural cognitive peak, which lands between 10:00 AM and 1:00 PM.",
  },
  {
    q: "Should a Dolphin take afternoon naps to compensate for poor sleep?",
    a: "Generally, no. For chronic light sleepers and insomniacs, daytime napping dissipates homeostatic sleep pressure (adenosine). Taking a 45-minute nap at 3:00 PM almost guarantees you will lie awake in bed at midnight. Instead, practice 15 to 20 minutes of Non-Sleep Deep Rest (NSDR), which restores mental clarity without reducing bedtime sleep drive.",
  },
  {
    q: "What is the best caffeine strategy for a Dolphin in an office?",
    a: "Low dose and strict early cutoff. Limit yourself to a single cup of green tea, matcha, or a small single-shot latte (50–80mg total) consumed around 9:30 AM. Never drink energy drinks (Celsius, Monster, Red Bull) or large cold brews, and enforce a strict 1:30 PM cutoff.",
  },
  {
    q: "What should a Dolphin do when they can't fall asleep at 11:30 PM?",
    a: "Follow clinical stimulus control therapy: if you are not asleep after 20 minutes, get out of bed. Lying in bed tossing conditions your brain to associate the mattress with frustration and vigilance. Go to another dimly lit room, read a physical book, and only return to bed when your eyelids feel heavy.",
  },
];

export default function DolphinWorking9To5Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Dolphin Chronotype 9-to-5 Schedule: How Light Sleepers Master Office Hours",
    description:
      "A clinically engineered 6:30 AM – 11:30 PM corporate survival routine for the Dolphin chronotype.",
    url: `${SITE_URL}/chronotype/dolphin-working-9-to-5`,
    author: {
      "@type": "Organization",
      name: "ARC",
    },
    publisher: {
      "@type": "Organization",
      name: "ARC Circadian Rhythm Tracker",
      url: SITE_URL,
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <div className="text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

      <ContentNav backHref="/chronotype/dolphin" backLabel="Dolphin Chronotype" />

      <div className="max-w-4xl mx-auto px-6 pt-6 -mb-6">
        <Breadcrumbs
          items={[
            { name: "Chronotypes", href: "/#chronotypes" },
            { name: "Dolphin Chronotype", href: "/chronotype/dolphin" },
            { name: "9-to-5 Corporate Schedule" },
          ]}
        />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-accent mb-4">
          <span>🐬 Dolphin Chronotype</span>
          <span className="text-zinc-500">&bull;</span>
          <span>Light Sleeper Office Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Dolphin Chronotype 9-to-5 Schedule
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          How light sleepers and insomniacs manage morning brain fog, leverage the 10:00 AM focus peak, and shut down nocturnal anxiety for deep corporate sleep.
        </p>
      </section>

      {/* Metrics Highlights */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Morning Wake</span>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">06:30 AM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Focus Zenith</span>
            <span className="text-lg sm:text-xl font-bold text-accent font-mono">9:30 AM – 12:30 PM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Low-Dose Cutoff</span>
            <span className="text-lg sm:text-xl font-bold text-rose-400 font-mono">01:30 PM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Target Bedtime</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-400 font-mono">11:30 PM</span>
          </div>
        </div>
      </section>

      {/* Schedule Customizer */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <ChronotypeScheduleCustomizer
          slug="dolphin"
          chronotypeName="Dolphin (Corporate 9-to-5)"
          defaultWake="06:30"
        />
      </section>

      {/* 12-Row Hour-by-Hour Table */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            Hour-by-Hour 9-to-5 Schedule for Dolphins
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Nervous System Protection
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Calibrate your office workday to prevent nervous system overload and preserve nighttime sleep latency:
        </p>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                <th scope="col" className="py-3 px-3 font-semibold">Time Window</th>
                <th scope="col" className="py-3 px-3 font-semibold">Routine Phase</th>
                <th scope="col" className="py-3 px-4 font-semibold">Action Protocol</th>
                <th scope="col" className="py-3 px-3 font-semibold text-right">Circadian Science</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {CORPORATE_SCHEDULE.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-white whitespace-nowrap">{row.time}</td>
                  <td className="py-3.5 px-3 font-semibold text-accent whitespace-nowrap">{row.phase}</td>
                  <td className="py-3.5 px-4 text-zinc-300 text-xs sm:text-sm leading-relaxed">{row.action}</td>
                  <td className="py-3.5 px-3 text-right text-zinc-400 text-xs font-mono hidden sm:table-cell">{row.biology}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recommended Tools Grid */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-4">
          Recommended Circadian Tools for Sensitive Sleepers
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/tools/sleep-cocktail"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Sleep Protocol
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Huberman Sleep Cocktail Builder &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate exact calming doses of Magnesium L-Threonate, Apigenin, and L-Theanine for insomnia.
            </div>
          </Link>

          <Link
            href="/tools/caffeine-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Micro-Dose Caffeine
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Caffeine Half-Life Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate clearance for low-dose green tea, matcha, and espresso to prevent evening insomnia.
            </div>
          </Link>

          <Link
            href="/tools/sleep-debt-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Sleep Deficit
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Sleep Debt Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Measure your true accumulated sleep debt without inducing orthosomnia or sleep anxiety.
            </div>
          </Link>

          <Link
            href="/tools/chronotype-compatibility/bear-and-dolphin"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Co-Sleeping Peace
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Bear &amp; Dolphin Compatibility Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              How light sleepers and heavy sleepers co-exist peacefully in the same bedroom.
            </div>
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <h3 className="text-base font-bold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-3xl mx-auto px-6 py-16 text-center border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
          Automate Your Dolphin 9-to-5 Schedule with ARC
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          ARC protects your sensitive nervous system: real-time caffeine tracking, gentle wind-down reminders, and morning sunlight timers designed to eliminate sleep anxiety.
        </p>
        <AppStoreButton />
      </section>

      <Footer />
    </div>
  );
}
