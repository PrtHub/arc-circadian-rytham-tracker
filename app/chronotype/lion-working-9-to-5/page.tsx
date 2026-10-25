import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { ChronotypeScheduleCustomizer } from "@/components/ChronotypeScheduleCustomizer";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export const metadata: Metadata = {
  title: "Lion Chronotype 9-to-5 Schedule: How Early Birds Dominate Corporate Hours | ARC",
  description:
    "A clinically engineered 5:30 AM – 10:00 PM corporate schedule for the Lion chronotype: front-load deep work, avoid the 3:00 PM afternoon wall, and handle late meetings.",
  keywords:
    "lion chronotype working 9 to 5, lion chronotype 9 to 5 schedule, lion chronotype routine, early bird work schedule, how lions handle late meetings, corporate early riser",
  alternates: {
    canonical: `${SITE_URL}/chronotype/lion-working-9-to-5`,
  },
  openGraph: {
    title: "Lion Chronotype 9-to-5 Schedule: How Early Birds Dominate Corporate Hours | ARC",
    description:
      "A clinically engineered 5:30 AM – 10:00 PM corporate routine for the Lion chronotype: front-load deep work and conquer the 3:00 PM energy drop.",
    url: `${SITE_URL}/chronotype/lion-working-9-to-5`,
    siteName: "ARC Circadian Rhythm Tracker",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lion Chronotype 9-to-5 Schedule: How Early Birds Dominate Corporate Hours | ARC",
    description:
      "A clinically engineered 5:30 AM – 10:00 PM corporate routine for the Lion chronotype: front-load deep work and beat the 3 PM wall.",
    creator: "@iPritamX",
  },
};

const CORPORATE_SCHEDULE = [
  { time: "05:30 AM – 06:00 AM", phase: "Natural Dawn Wake-Up", action: "Wake effortlessly before your alarm. Drink 500ml water and step outside or open blinds for dawn light.", biology: "Advanced phase angle: cortisol awakening response occurs naturally around 5:00 AM; core body temperature already rising." },
  { time: "06:00 AM – 07:00 AM", phase: "Early Workout & High-Protein Breakfast", action: "Cardio, weight training, or mobility work followed by eggs, oatmeal, or a protein smoothie.", biology: "Lion cardiovascular stamina and metabolic efficiency are highest in early morning hours." },
  { time: "07:30 AM – 08:30 AM", phase: "First Coffee & Uninterrupted Deep Work", action: "First cup of coffee (delayed 2 hours post-wake). Tackle your most mentally demanding task while the office is quiet.", biology: "Lion superpower: prefrontal cortex executive control is at absolute zenith before colleagues arrive." },
  { time: "09:00 AM – 11:30 AM", phase: "Strategic Collaboration & Leadership", action: "Lead team standups, pitch presentations, provide strategic direction, and review important documents.", biology: "High morning verbal fluency and confidence make Lions exceptionally effective morning communicators." },
  { time: "11:30 AM – 12:30 PM", phase: "Light, Low-Carb Lunch", action: "Prioritize lean chicken, fish, greens, and healthy fats. Avoid heavy pastas or rice that hasten the afternoon crash.", biology: "Large carbohydrate meals trigger excessive insulin surges that accelerate the Lion's early afternoon fatigue." },
  { time: "12:30 PM – 01:00 PM", phase: "Absolute Hard Caffeine Cutoff", action: "Final sip of caffeinated tea or coffee. Strict switch to water and herbal infusions.", biology: "Because Lion bedtime is 10:00 PM, a 1:00 PM cutoff gives the liver 9 hours to clear under 50mg before sleep onset." },
  { time: "01:30 PM – 02:30 PM", phase: "The Lion Slump: Recovery Protocol", action: "Do not attempt high-stakes creative work. Take a 15-minute outdoor walk in sunlight or do 10 minutes of NSDR.", biology: "Lion circadian nadir: core body temperature dips earlier than Bears (around 1:30 PM vs 2:30 PM)." },
  { time: "02:30 PM – 04:30 PM", phase: "Low-Stakes Administration & Triage", action: "Sort inbox, answer routine Slack messages, schedule tomorrow's calendar, and execute routine tickets.", biology: "Cognitive bandwidth is lower; focus on execution of established workflows rather than open-ended strategy." },
  { time: "04:30 PM – 05:30 PM", phase: "Late Meetings Survival Strategy", action: "Hydrate with cold sparkling water, stand at your desk, or take walking calls if roped into late meetings.", biology: "Preventing sedentary posture counteracts dropping core temperature and natural evening adenosine buildup." },
  { time: "06:00 PM – 07:00 PM", phase: "Early Dinner Window", action: "Enjoy dinner with complex carbohydrates (sweet potatoes, quinoa) to promote evening serotonin release.", biology: "Eating by 6:30 PM allows a full 3.5 hours for digestion before 10:00 PM sleep, keeping heart rate low." },
  { time: "08:30 PM – 09:30 PM", phase: "Digital Sunset & House Dimming", action: "Turn off bright overhead lights. Put screens away or wear blue-light blocking glasses. Relax with family or reading.", biology: "Dim light melatonin onset (DLMO) occurs early in Lions (~8:30 PM). Exposure to blue LEDs suppresses this fragile wave." },
  { time: "10:00 PM", phase: "Lights Out & Deep Rest", action: "Cool bedroom to 66°F (19°C). Lights out by 10:00 PM for 7.5 hours of restorative sleep before 5:30 AM.", biology: "Early deep slow-wave sleep cycles ensure cellular repair and complete memory consolidation." },
];

const FAQS = [
  {
    q: "Why do Lions hit an energy wall at 3:00 PM in the office?",
    a: "Lions wake up at 5:30 AM, meaning by 3:00 PM they have already been awake and operating for 9.5 hours—equivalent to a night owl's 7:00 PM. Combined with the biological mid-afternoon drop in core body temperature, Lions experience a heavy slump. The solution is front-loading your deep work before 11:30 AM and scheduling administrative or routine tasks for the afternoon.",
  },
  {
    q: "How can a Lion survive late-afternoon corporate meetings (4:00 PM – 6:00 PM)?",
    a: "Avoid drinking an afternoon coffee, which will ruin your 10:00 PM sleep. Instead, use physical zeitgebers: take a cold water splash to the face, stand up during the meeting, drink ice-cold water, and step outside for 5 minutes of fresh air beforehand.",
  },
  {
    q: "What is the biggest mistake Lions make with caffeine?",
    a: "Drinking coffee immediately upon waking at 5:30 AM. Because Lions already have a surging natural cortisol awakening response at dawn, early coffee builds rapid tolerance without extra energy. Waiting until 7:30 AM or 8:00 AM provides sustained energy that bridges into the late morning.",
  },
  {
    q: "How early should a Lion cut off caffeine?",
    a: "By 12:30 PM or 1:00 PM at the latest. Because Lions sleep early (around 10:00 PM), an afternoon coffee at 2:30 PM leaves over 65mg active in the brain at bedtime, fracturing early slow-wave sleep.",
  },
];

export default function LionWorking9To5Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Lion Chronotype 9-to-5 Schedule: How Early Birds Dominate Corporate Hours",
    description:
      "A clinically engineered 5:30 AM – 10:00 PM corporate routine for the Lion chronotype.",
    url: `${SITE_URL}/chronotype/lion-working-9-to-5`,
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

      <ContentNav backHref="/chronotype/lion" backLabel="Lion Chronotype" />

      <div className="max-w-4xl mx-auto px-6 pt-6 -mb-6">
        <Breadcrumbs
          items={[
            { name: "Chronotypes", href: "/#chronotypes" },
            { name: "Lion Chronotype", href: "/chronotype/lion" },
            { name: "9-to-5 Corporate Schedule" },
          ]}
        />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-accent mb-4">
          <span>🦁 Lion Chronotype</span>
          <span className="text-zinc-500">&bull;</span>
          <span>Early Bird Corporate Strategy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Lion Chronotype 9-to-5 Schedule
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          How early risers front-load high-leverage deep work, avoid the 3:00 PM afternoon wall, and navigate late corporate meetings without burnout.
        </p>
      </section>

      {/* Metrics Highlights */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Dawn Wake-Up</span>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">05:30 AM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Deep Work Peak</span>
            <span className="text-lg sm:text-xl font-bold text-accent font-mono">7:30 – 11:30 AM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Hard Cutoff</span>
            <span className="text-lg sm:text-xl font-bold text-rose-400 font-mono">01:00 PM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Target Bedtime</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-400 font-mono">10:00 PM</span>
          </div>
        </div>
      </section>

      {/* Schedule Customizer */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <ChronotypeScheduleCustomizer
          slug="lion"
          chronotypeName="Lion (Corporate 9-to-5)"
          defaultWake="05:30"
        />
      </section>

      {/* 12-Row Hour-by-Hour Table */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            Hour-by-Hour 9-to-5 Schedule for Lions
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Early Riser Alignment
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          Front-load your most strategic cognitive output while your mind is razor-sharp before lunchtime:
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
          Recommended Circadian Tools for Early Birds
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/tools/caffeine-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Early Cutoff Tool
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Caffeine Half-Life Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Find out why an afternoon coffee ruins a 10:00 PM Lion bedtime.
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
              Time a 15-minute power rest at 1:30 PM to survive late corporate meetings.
            </div>
          </Link>

          <Link
            href="/tools/chronotype-compatibility/lion-and-bear"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Couples Alignment
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Lion &amp; Bear Compatibility Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Discover how Lions and Bears share synchronized morning productivity and bedroom harmony.
            </div>
          </Link>

          <Link
            href="/tools/chronotype-compatibility/lion-and-wolf"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Couples Bedtime Gap
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Lion &amp; Wolf Compatibility Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              How early birds share a bedroom with night owls without waking each other up.
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
          Automate Your Lion 9-to-5 Schedule with ARC
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          ARC alerts you when your 1:00 PM caffeine cutoff arrives, plans your morning light window from local dawn, and helps you conquer the afternoon wall without burnout.
        </p>
        <AppStoreButton />
      </section>

      <Footer />
    </div>
  );
}
