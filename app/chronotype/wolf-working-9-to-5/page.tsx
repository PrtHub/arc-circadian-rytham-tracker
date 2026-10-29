import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { ChronotypeScheduleCustomizer } from "@/components/ChronotypeScheduleCustomizer";
import { AppStoreButton } from "@/components/AppStoreButton";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arccircadian.com";

export const metadata: Metadata = {
  title: "Wolf Chronotype 9-to-5 Schedule: How Night Owls Survive & Thrive in Corporate Hours | ARC",
  description:
    "A clinically engineered 7:00 AM – 11:30 PM corporate survival routine for the Wolf chronotype: morning light timing, 90-minute coffee delay, afternoon deep work blocks, and weekend jetlag defense.",
  keywords:
    "wolf chronotype working 9 to 5, wolf chronotype 9 to 5 schedule, night owl corporate schedule, how to survive 9 to 5 as a night owl, wolf chronotype routine, delayed sleep phase corporate",
  alternates: {
    canonical: `${SITE_URL}/chronotype/wolf-working-9-to-5`,
  },
  openGraph: {
    title: "Wolf Chronotype 9-to-5 Schedule: How Night Owls Survive & Thrive in Corporate Hours | ARC",
    description:
      "A clinically engineered 7:00 AM – 11:30 PM corporate survival routine for the Wolf chronotype: morning light timing, 90-minute coffee delay, and afternoon deep focus blocks.",
    url: `${SITE_URL}/chronotype/wolf-working-9-to-5`,
    siteName: "ARC Circadian Rhythm Tracker",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wolf Chronotype 9-to-5 Schedule: How Night Owls Survive & Thrive in Corporate Hours | ARC",
    description:
      "A clinically engineered corporate survival routine for the Wolf chronotype: light timing, 90-min coffee delay, and deep work blocks.",
    creator: "@iPritamX",
  },
};

const CORPORATE_SCHEDULE = [
  { time: "07:00 AM", phase: "Alarm & No-Snooze Protocol", action: "Wake immediately without snoozing. Turn on bright overhead LEDs and splash cold water on face.", biology: "Snoozing fragments final sleep cycle, triggering severe sleep inertia that lasts 2–4 hours." },
  { time: "07:10 AM – 07:30 AM", phase: "Outdoor Light Anchor", action: "Step outside for 20 minutes of natural daylight (or sit by 10,000-lux lamp) while drinking 500ml water.", biology: "Melanopsin in retinal ipRGCs suppresses lingering melatonin and signals the SCN to start the biological day." },
  { time: "07:30 AM – 08:30 AM", phase: "Commute / Morning Routine", action: "Protein-rich breakfast (eggs, Greek yogurt) to entrain liver clocks. Listen to music or podcasts.", biology: "Avoid early morning high-stakes cognitive demands while cortisol is still rising." },
  { time: "08:30 AM – 09:00 AM", phase: "Strategic First Coffee Window", action: "First caffeinated beverage, delayed exactly 90 minutes post-wake.", biology: "Waiting allows natural cortisol to rise, clearing residual adenosine without building rapid tolerance or afternoon crashes." },
  { time: "09:00 AM – 11:30 AM", phase: "Administrative & Collaborative Work", action: "Clear emails, triage Slack messages, organize tickets, attend team standups, and handle low-friction tasks.", biology: "Prefrontal cortex executive control is warm-up phase; routine tasks preserve willpower for later." },
  { time: "11:30 AM – 12:30 PM", phase: "Mid-Morning Focus Window 1", action: "First analytical sprint: review designs, draft documentation, or tackle moderate-complexity challenges.", biology: "Core body temperature and cognitive vigilance reach first daily plateau." },
  { time: "12:30 PM – 01:30 PM", phase: "Protein Lunch & Outdoor Walk", action: "Low-glycemic meal with lean protein, vegetables, and complex carbs. 15-minute brisk walk outside.", biology: "Avoid heavy refined carbs that trigger excessive post-prandial insulin spikes and drowsiness." },
  { time: "01:30 PM – 02:00 PM", phase: "Hard Caffeine Cutoff", action: "Absolute final sip of coffee or energy drink. Switch strictly to water, herbal tea, or decaf.", biology: "Requires 9.5 hours to drop below the 50 mg bedtime sleep threshold before 11:30 PM sleep." },
  { time: "02:00 PM – 05:30 PM", phase: "Peak Deep Work Zenith", action: "Block calendar for high-leverage focus: complex coding, strategy decks, writing, or creative problem solving.", biology: "Wolf biological superpower: natural neurochemical surge in dopamine, attention, and executive bandwidth." },
  { time: "06:00 PM – 07:30 PM", phase: "Physical Workout & Evening Meal", action: "Strength training, running, or cycling, followed by a balanced dinner.", biology: "Core body temperature, lung capacity, and muscle protein synthesis peak in late afternoon/early evening." },
  { time: "09:30 PM – 10:30 PM", phase: "Digital Sunset & Blue Light Shield", action: "Dim overhead lights, switch devices to warm display color (Night Shift / f.lux), wear blue-blocking glasses.", biology: "Protects natural evening pineal melatonin synthesis from suppression by indoor screens." },
  { time: "10:30 PM – 11:30 PM", phase: "Wind-Down & Sleep", action: "Cool bedroom to 66°F (19°C), read fiction, practice 10-minute breathwork. Lights out by 11:30 PM.", biology: "Achieves 7.5 hours of uninterrupted sleep cycles before the 7:00 AM alarm." },
];

const FAQS = [
  {
    q: "Why is a 9-to-5 so exhausting for a Wolf chronotype?",
    a: "Wolves naturally produce melatonin roughly 2 to 3 hours later than Bears and Lions, and their core body temperature minimum (Tmin) lands around 6:30–7:00 AM. Forcing a wake-up at 7:00 AM interrupts deep REM sleep and triggers acute sleep inertia (grogginess), making mornings feel physically exhausting.",
  },
  {
    q: "Why should a Wolf wait 90 minutes before drinking their first coffee?",
    a: "Drinking coffee immediately upon waking interferes with your natural cortisol awakening response and binds to adenosine receptors before adenosine has been cleared. Delaying caffeine 90 minutes lets your natural morning alertness hormones activate, eliminating the severe 2:00 PM post-lunch crash.",
  },
  {
    q: "How can a Wolf fall asleep at 11:30 PM if their natural bedtime is 1:00 AM?",
    a: "The most powerful lever is morning light: get 20 minutes of natural outdoor sunlight within 30 minutes of waking at 7:00 AM to anchor your suprachiasmatic nucleus (SCN). Combine this with a hard caffeine cutoff at 2:00 PM and amber lighting starting at 9:30 PM to shift your melatonin release 90 minutes earlier.",
  },
  {
    q: "Can Wolves sleep in on weekends?",
    a: "Limit weekend sleep-ins to no more than 60 minutes past your weekday alarm (e.g. 8:00 AM instead of 7:00 AM). Sleeping until 10:30 AM shifts your circadian rhythm by multiple hours, creating severe 'social jetlag' that makes Sunday night insomnia and Monday morning exhaustion unbearable.",
  },
];

export default function WolfWorking9To5Page() {
  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Wolf Chronotype 9-to-5 Schedule: How Night Owls Survive & Thrive in Corporate Hours",
    description:
      "A clinically engineered 7:00 AM – 11:30 PM corporate survival routine for the Wolf chronotype.",
    url: `${SITE_URL}/chronotype/wolf-working-9-to-5`,
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

      <ContentNav backHref="/chronotype/wolf" backLabel="Wolf Chronotype" />

      <div className="max-w-4xl mx-auto px-6 pt-6 -mb-6">
        <Breadcrumbs
          items={[
            { name: "Chronotypes", href: "/#chronotypes" },
            { name: "Wolf Chronotype", href: "/chronotype/wolf" },
            { name: "9-to-5 Corporate Schedule" },
          ]}
        />
      </div>

      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono uppercase tracking-widest text-accent mb-4">
          <span>🐺 Wolf Chronotype</span>
          <span className="text-zinc-500">&bull;</span>
          <span>Corporate Survival Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
          Wolf Chronotype 9-to-5 Schedule
        </h1>
        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          How night owls survive and thrive in standard corporate hours without chronic exhaustion, afternoon crashes, or sleep deprivation.
        </p>
      </section>

      {/* High-Level Overview Cards */}
      <section className="max-w-4xl mx-auto px-6 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Corporate Alarm</span>
            <span className="text-lg sm:text-xl font-bold text-white font-mono">07:00 AM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">First Coffee</span>
            <span className="text-lg sm:text-xl font-bold text-accent font-mono">08:30 AM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Deep Work Zenith</span>
            <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">2:00 – 5:30 PM</span>
          </div>
          <div className="p-4 rounded-2xl border border-white/10 bg-white/5">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block mb-1">Lights Out</span>
            <span className="text-lg sm:text-xl font-bold text-indigo-400 font-mono">11:30 PM</span>
          </div>
        </div>
      </section>

      {/* Interactive Schedule Customizer */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <ChronotypeScheduleCustomizer
          slug="wolf"
          chronotypeName="Wolf (Corporate 9-to-5)"
          defaultWake="07:00"
        />
      </section>

      {/* 12-Row Hour-by-Hour Semantic HTML Table for Featured Snippets */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            Hour-by-Hour 9-to-5 Schedule for Wolves
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Corporate Chronotype Alignment
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          This schedule phase-advances your biological clock by 90 minutes while aligning high-stakes analytical work with your natural late-afternoon dopamine peak:
        </p>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[620px]">
            <thead>
              <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                <th scope="col" className="py-3 px-3 font-semibold">Time Window</th>
                <th scope="col" className="py-3 px-3 font-semibold">Phase</th>
                <th scope="col" className="py-3 px-4 font-semibold">Action &amp; Strategy</th>
                <th scope="col" className="py-3 px-3 font-semibold text-right">Circadian Biology</th>
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

      {/* Strategic Internal Links */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-4">
          Recommended Circadian Tools for Night Owls
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/tools/caffeine-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Sleep Clearance
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Caffeine Half-Life &amp; Cutoff Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Find out how much caffeine from your afternoon coffee remains active at 11:30 PM bedtime.
            </div>
          </Link>

          <Link
            href="/tools/sunlight-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Circadian Phase Advance
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Morning Sunlight Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Determine exact outdoor lux exposure required to reset your master clock after a 7:00 AM wake-up.
            </div>
          </Link>

          <Link
            href="/tools/social-jetlag-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Weekend Fatigue
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Social Jetlag Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate your sleep midpoint drift between workdays and weekends to prevent Monday morning grogginess.
            </div>
          </Link>

          <Link
            href="/tools/chronotype-compatibility/lion-and-wolf"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Couples Sleep Alignment
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Lion &amp; Wolf Compatibility Guide &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              How early birds and night owls can share a bedroom peacefully without waking each other up.
            </div>
          </Link>
        </div>
      </section>

      {/* In-Depth Scientific Survival Guide */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          The Biology of the Corporate Night Owl
        </h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            If you are a Wolf chronotype working in a standard 9-to-5 corporate environment, your daily exhaustion is <strong className="text-white">not a moral failing or lack of discipline</strong>. It is a biological consequence of <strong className="text-white">social jetlag</strong>: an ongoing structural mismatch between your genetically determined circadian clock and societal operating hours.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            1. Why 7:00 AM Feels Brutal: The Tmin Discrepancy
          </h3>
          <p className="leading-relaxed mb-6">
            Every human body clock revolves around the <strong className="text-white">core body temperature minimum (Tmin)</strong>, which occurs approximately 90 to 120 minutes before natural awakening. For a Bear or Lion, Tmin occurs around 4:30 AM to 5:30 AM. By 7:00 AM, their body temperature is already rising, cortisol has peaked, and sleep inertia has cleared.
          </p>
          <p className="leading-relaxed mb-6">
            For a natural Wolf, Tmin lands around <strong className="text-white">6:30 AM to 7:00 AM</strong>. Waking at 7:00 AM means your alarm is sounding at your absolute nadir of metabolic alertness, during heavy REM sleep. This triggers intense sleep inertia that can impair executive function, reaction time, and working memory for up to 3 hours.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            2. The 90-Minute Caffeine Delay Rule
          </h3>
          <p className="leading-relaxed mb-6">
            The most common mistake corporate Wolves make is reaching for a double espresso at 7:15 AM to force their eyes open.
          </p>
          <p className="leading-relaxed mb-6">
            When you wake up, adenosine (sleep pressure) is still being cleared by astrocytes, and your body is attempting to launch its natural <strong className="text-white">cortisol awakening response (CAR)</strong>. Ingesting caffeine immediately binds to adenosine receptors and blunts natural cortisol production. Once that caffeine wears off around 1:30 PM, the accumulated adenosine floods back into unoccupied receptors, triggering a brutal afternoon crash. By waiting until <strong className="text-white">8:30 AM</strong>, you let cortisol do its job, build zero unnecessary tolerance, and maintain steady energy throughout the afternoon.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            3. Protecting Your 2:00 PM – 5:30 PM Superpower
          </h3>
          <p className="leading-relaxed mb-6">
            While corporate culture praises early-morning productivity, morning people almost always suffer a severe dip by 2:00 PM. In contrast, <strong className="text-white">the afternoon is where the Wolf shines</strong>. Between 2:00 PM and 5:30 PM, Wolf dopamine, executive focus, and abstract problem-solving capabilities reach their daily zenith.
          </p>
          <p className="leading-relaxed mb-6">
            Structure your workday strategically:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li><strong className="text-white">09:00 AM – 11:30 AM:</strong> Low-cognitive administrative work (emails, ticket reviews, routine syncs).</li>
            <li><strong className="text-white">02:00 PM – 05:30 PM:</strong> Guard this block fiercely for deep work (coding, strategic documents, complex creative execution).</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            4. The Weekend Trap: Keep Drift Under 60 Minutes
          </h3>
          <p className="leading-relaxed mb-6">
            After a grueling 5-day week, Wolves naturally want to sleep until 11:00 AM on Saturday and Sunday. However, shifting your sleep midpoint by 3 to 4 hours on weekends causes acute circadian phase delay. When your 7:00 AM alarm rings on Monday, your internal clock is biologically living in a time zone 4 hours west.
          </p>
          <p className="leading-relaxed mb-6">
            To stop suffering from &quot;Monday morning blues,&quot; cap weekend wake-up times at <strong className="text-white">8:00 AM or 8:30 AM</strong>. If you need extra rest, take a 20-minute power nap or 30-minute NSDR session around 2:30 PM rather than sleeping late into the morning.
          </p>
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
          Automate Your Wolf 9-to-5 Schedule with ARC
        </h2>
        <p className="text-zinc-400 mb-8 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          ARC tracks your caffeine clearance in real time, alerts you when your last safe coffee cutoff arrives, and runs your 20-minute morning light timer directly on your iPhone Lock Screen.
        </p>
        <AppStoreButton />
      </section>

      <Footer />
    </div>
  );
}
