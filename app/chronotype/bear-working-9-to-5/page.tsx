import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { ChronotypeScheduleCustomizer } from "@/components/ChronotypeScheduleCustomizer";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arccircadian.com";

export const metadata: Metadata = {
  title: "Bear Chronotype 9-to-5 Schedule: How 55% of People Master Corporate Hours | ARC",
  description:
    "A clinically engineered 7:00 AM – 11:00 PM corporate schedule for the Bear chronotype: conquer the 2:30 PM post-lunch slump, optimize the 10 AM focus peak, and protect evening sleep.",
  keywords:
    "bear chronotype working 9 to 5, bear chronotype 9 to 5 schedule, bear chronotype routine, bear chronotype afternoon slump, bear work schedule, corporate circadian routine",
  alternates: {
    canonical: `${SITE_URL}/chronotype/bear-working-9-to-5`,
  },
  openGraph: {
    title: "Bear Chronotype 9-to-5 Schedule: How 55% of People Master Corporate Hours | ARC",
    description:
      "A clinically engineered 7:00 AM – 11:00 PM corporate schedule for the Bear chronotype: conquer the 2:30 PM slump and optimize morning focus peaks.",
    url: `${SITE_URL}/chronotype/bear-working-9-to-5`,
    siteName: "ARC Circadian Rhythm Tracker",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bear Chronotype 9-to-5 Schedule: How 55% of People Master Corporate Hours | ARC",
    description:
      "A clinically engineered 7:00 AM – 11:00 PM corporate routine for the Bear chronotype: conquer the 2:30 PM slump and optimize focus.",
    creator: "@iPritamX",
  },
};

const CORPORATE_SCHEDULE = [
  { time: "07:00 AM", phase: "Natural Solar Wake-Up", action: "Wake smoothly with the sunrise. Open bedroom curtains immediately to flood eyes with natural photons.", biology: "Cortisol awakening response begins; body temperature rises steadily to clear mild sleep inertia." },
  { time: "07:15 AM – 07:45 AM", phase: "Hydration & Outdoor Light Anchor", action: "Drink 500ml of water with electrolytes. Take a brisk 15-minute walk outside in morning daylight.", biology: "Suppresses lingering melatonin via retinal melanopsin receptors and anchors the suprachiasmatic nucleus." },
  { time: "07:45 AM – 08:30 AM", phase: "High-Protein Breakfast & Commute", action: "Consume 30g of protein (eggs, smoked salmon, or Greek yogurt). Avoid heavy sugary cereals or pastries.", biology: "Protein stabilizes blood glucose and entrains liver peripheral clocks for steady morning neurotransmitter synthesis." },
  { time: "08:30 AM – 09:30 AM", phase: "First Coffee Window & Daily Planning", action: "First cup of coffee, delayed 90 minutes post-wake. Review daily priorities, organize tickets, and plan meetings.", biology: "Waiting 90 minutes prevents adenosine rebound crashes at 2:00 PM and optimizes caffeine receptor binding." },
  { time: "09:30 AM – 12:00 PM", phase: "Deep Analytical Work Zenith", action: "Protect this block for your highest-cognitive tasks: complex strategy, coding, writing, and analytical problem-solving.", biology: "Bear cognitive golden hours: prefrontal cortex blood flow, working memory, and mental vigilance reach daily peak." },
  { time: "12:00 PM – 01:00 PM", phase: "Balanced Lunch & Social Time", action: "Nutrient-dense lunch with complex carbohydrates and lean protein. Socialize with colleagues or eat outdoors.", biology: "Digestion initiates parasympathetic activation; insulin response should be moderated to reduce afternoon fatigue." },
  { time: "01:30 PM – 02:00 PM", phase: "Hard Caffeine Cutoff", action: "Final caffeinated beverage of the day. Switch to herbal tea, sparkling water, or decaf.", biology: "Requires 9.5 hours to clear below 50mg before 11:00 PM sleep. Any coffee after 2:00 PM impairs deep slow-wave sleep." },
  { time: "02:00 PM – 03:00 PM", phase: "Conquering the Post-Prandial Dip", action: "Do not reach for another coffee. Take a 15-minute outdoor walk, do 10 minutes of NSDR, or schedule collaborative meetings.", biology: "Natural circadian drop in core body temperature and transient alertness dip common to all solar chronotypes." },
  { time: "03:00 PM – 05:00 PM", phase: "Administrative Sprint & Execution", action: "Process emails, attend team standups, close administrative tasks, and clear communication backlog.", biology: "Secondary focus window: steady cognitive recovery suitable for execution and collaborative tasks." },
  { time: "05:30 PM – 07:00 PM", phase: "Cardio or Strength Workout", action: "Hit the gym, run, or practice yoga. Bear physical performance and coordination peak in late afternoon.", biology: "Core body temperature, lung capacity, and muscle flexibility reach maximum daily efficiency." },
  { time: "07:30 PM – 08:30 PM", phase: "Balanced Dinner & Relaxation", action: "Nutritious dinner with complex carbs to facilitate evening serotonin and melatonin production.", biology: "Eating 3 hours before bed allows gastric emptying and prevents elevated nocturnal resting heart rate." },
  { time: "09:30 PM – 11:00 PM", phase: "Digital Sunset & Lights Out", action: "Dim overhead lamps, turn devices to warm display mode, read fiction, and cool bedroom to 66°F (19°C). Lights out by 11:00 PM.", biology: "Pineal gland initiates dim light melatonin onset (DLMO). Delivers 8 full hours of sleep before 7:00 AM." },
];

const FAQS = [
  {
    q: "Why do Bears struggle with the 2:30 PM afternoon slump?",
    a: "The post-lunch dip is a biological circadian rhythm phenomenon, not just food coma. Around 7 to 8 hours after waking, human core body temperature experiences a slight natural drop. For Bears, this lands between 2:00 PM and 3:00 PM. Fighting it with sugar or caffeine worsens sleep tonight; the clinical antidote is a 15-minute outdoor walk or 10-minute non-sleep deep rest (NSDR).",
  },
  {
    q: "What is the single most productive work window for a Bear?",
    a: "Between 9:30 AM and 12:00 PM. This is when Bear cortisol, body temperature, and executive prefrontal function align for peak analytical focus. Block this time from low-value meetings to get your hardest work done.",
  },
  {
    q: "What time should a Bear stop drinking caffeine on a corporate workday?",
    a: "No later than 2:00 PM. An average cup of coffee has a 5.5-hour half-life. If you drink a 150mg coffee at 3:30 PM, over 65mg remains circulating in your brain at your 11:00 PM bedtime, blocking adenosine and destroying restorative deep sleep.",
  },
  {
    q: "How can Bears avoid Monday morning fatigue?",
    a: "Limit weekend sleep-in times to within 60 minutes of your weekday 7:00 AM alarm. If you sleep until 10:00 AM on Sunday, you shift your biological clock by 3 hours, creating social jetlag that makes Monday morning feel like a trans-Atlantic flight.",
  },
];

export default function BearWorking9To5Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Bear Chronotype 9-to-5 Schedule: How 55% of People Master Corporate Hours",
    description:
      "A clinically engineered 7:00 AM – 11:00 PM corporate schedule for the Bear chronotype.",
    url: `${SITE_URL}/chronotype/bear-working-9-to-5`,
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

      <ContentNav backHref="/chronotype/bear" backLabel="Bear Chronotype" />

      <div className="max-w-4xl mx-auto px-6 pt-6 -mb-6">
        <Breadcrumbs
          items={[
            { name: "Chronotypes", href: "/#chronotypes" },
            { name: "Bear Chronotype", href: "/chronotype/bear" },
            { name: "9-to-5 Corporate Schedule" },
          ]}
        />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-accent mb-4">
          <span>🐻 Bear Chronotype</span>
          <span className="text-zinc-500">&bull;</span>
          <span>Corporate Mastery Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Bear Chronotype 9-to-5 Schedule
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          How the 55% majority masters standard office hours: defeat the 2:30 PM slump, maximize the 10:00 AM focus peak, and enjoy deep sleep every night.
        </p>
      </section>

      {/* Overview Metrics Cards */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Solar Alarm</span>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">07:00 AM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Deep Work Peak</span>
            <span className="text-lg sm:text-xl font-bold text-accent font-mono">9:30 AM – 12 PM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Caffeine Cutoff</span>
            <span className="text-lg sm:text-xl font-bold text-rose-400 font-mono">02:00 PM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Target Sleep</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-400 font-mono">11:00 PM</span>
          </div>
        </div>
      </section>

      {/* Interactive Schedule Customizer */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <ChronotypeScheduleCustomizer
          slug="bear"
          chronotypeName="Bear (Corporate 9-to-5)"
          defaultWake="07:00"
        />
      </section>

      {/* 12-Row Hour-by-Hour Semantic HTML Table */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            Hour-by-Hour 9-to-5 Schedule for Bears
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Solar Chronotype Alignment
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          This evidence-aligned corporate timetable aligns your cognitive energy, digestion, and caffeine clearance with the solar arc:
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
          Recommended Circadian Tools for Bears
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/tools/caffeine-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Afternoon Cutoff Tool
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Caffeine Half-Life Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate exact milligrams active in your bloodstream at 11:00 PM bedtime.
            </div>
          </Link>

          <Link
            href="/tools/sunlight-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Circadian Master Clock
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Morning Sunlight Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate your optimal outdoor lux exposure window for a 7:00 AM wake time.
            </div>
          </Link>

          <Link
            href="/tools/nap-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Slump Defense
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Power Nap Timing Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Time a 20-minute power nap or NSDR session at 2:30 PM without entering groggy slow-wave sleep.
            </div>
          </Link>

          <Link
            href="/tools/chronotype-compatibility/bear-and-wolf"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Couples Alignment
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Bear &amp; Wolf Compatibility Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              How Bears navigate relationships with late-night Wolves without suffering sleep debt.
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
          Automate Your Bear 9-to-5 Schedule with ARC
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          ARC tracks your caffeine clearance in real time, alerts you when your 2:00 PM cutoff arrives, and displays your morning light countdown directly on your iPhone Lock Screen.
        </p>
        <AppStoreButton />
      </section>

      <Footer />
    </div>
  );
}
