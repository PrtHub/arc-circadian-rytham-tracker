import type { Metadata } from "next";
import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { AppStoreButton } from "@/components/AppStoreButton";
import {
  SCHEDULE_WAKE_MINUTES,
  buildScheduleData,
  scheduleSlug,
  scheduleTimeLabel,
} from "@/lib/schedule-matrix";

const SITE_URL = "https://arccircadian.com";

export const metadata: Metadata = {
  title: "Daily Schedule Matrix: Science-Backed Routines by Wake Time",
  description:
    "Complete hour-by-hour circadian operating schedules for every wake time from 4:30 AM to 11:00 AM. 20-min sunlight anchors, 90-min delayed coffee, peak focus blocks, and caffeine cutoffs.",
  alternates: {
    canonical: `${SITE_URL}/schedules`,
  },
  openGraph: {
    title: "Daily Schedule Matrix: Science-Backed Routines by Wake Time | ARC",
    description:
      "Complete hour-by-hour circadian operating schedules for every wake time from 4:30 AM to 11:00 AM. Sunlight timing, caffeine cutoffs, and peak focus hours.",
    url: `${SITE_URL}/schedules`,
    type: "website",
    siteName: "ARC: Circadian Rhythm Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daily Schedule Matrix: Science-Backed Routines by Wake Time | ARC",
    description:
      "Hour-by-hour circadian schedules from 4:30 AM to 11:00 AM. Light anchors, delayed coffee, and caffeine cutoffs.",
  },
};

export default function SchedulesIndexPage() {
  const allSchedules = SCHEDULE_WAKE_MINUTES.map((m) => buildScheduleData(m));

  const lionSchedules = allSchedules.filter((s) => s.wakeMinutes <= 6 * 60);
  const bearSchedules = allSchedules.filter(
    (s) => s.wakeMinutes > 6 * 60 && s.wakeMinutes <= 8 * 60
  );
  const wolfSchedules = allSchedules.filter((s) => s.wakeMinutes > 8 * 60);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Daily Schedule Matrix: Science-Backed Routines by Wake Time",
    url: `${SITE_URL}/schedules`,
    description:
      "Complete hour-by-hour circadian operating schedules for every wake time from 4:30 AM to 11:00 AM.",
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden bg-[#070a18]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/" backLabel="Home" />

      <main className="max-w-6xl mx-auto px-6 py-12 relative">
        <Breadcrumbs items={[{ name: "Schedules" }]} />

        {/* Hero Header */}
        <header className="mb-12 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-3 inline-block font-mono border border-(--accent)/20">
            Circadian Directory
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
            Wake-Time <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[50px]">Daily Schedule</span> Matrix
          </h1>
          <p className="text-(--fg-muted) text-base sm:text-lg leading-relaxed">
            Generic sleep sites only calculate bedtimes based on 90-minute sleep cycles. But human biology doesn&apos;t end when you wake up. Select your target wake time below to view your complete hour-by-hour daytime operating system: morning light timing, 90-minute delayed first coffee, peak focus windows, caffeine cutoffs, and bedtime.
          </p>
        </header>

        {/* Schedules Grid by Chronotype Band */}
        <div className="space-y-12 mb-16">
          {/* Section 1: Early Risers & Lion Schedules */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🦁</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Early Risers &amp; Lion Schedules (4:30 AM – 6:00 AM)
              </h2>
            </div>
            <p className="text-sm text-(--fg-muted) mb-5">
              Ideal for Lions, military personnel, and fitness enthusiasts. Focus peaks early; strict evening wind-downs are mandatory to prevent early afternoon collapse.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {lionSchedules.map((s) => (
                <Link
                  key={s.slug}
                  href={`/schedules/${s.slug}`}
                  className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-white group-hover:text-accent transition-colors">
                        {s.wakeLabel}
                      </span>
                      <span className="text-xs font-mono text-accent">5 Cycles</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-(--fg-muted)">
                      <div><strong className="text-white/80">First Coffee:</strong> {s.firstCoffee}</div>
                      <div><strong className="text-white/80">Peak Focus:</strong> {s.peakFocus}</div>
                      <div><strong className="text-white/80">Caffeine Cutoff:</strong> {s.caffeineCurfews[1].cutoffTime}</div>
                      <div><strong className="text-emerald-400">Bedtime:</strong> {s.bedtime5Cycles}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-xs font-bold text-accent flex items-center justify-between">
                    <span>View full timeline</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 2: Solar Rhythm & Bear Schedules */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐻</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Solar Rhythm &amp; Bear Schedules (6:30 AM – 8:00 AM)
              </h2>
            </div>
            <p className="text-sm text-(--fg-muted) mb-5">
              The sweet spot for ~55% of the population. Synchronized with natural solar light and standard workday productivity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {bearSchedules.map((s) => (
                <Link
                  key={s.slug}
                  href={`/schedules/${s.slug}`}
                  className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-white group-hover:text-accent transition-colors">
                        {s.wakeLabel}
                      </span>
                      <span className="text-xs font-mono text-accent">5 Cycles</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-(--fg-muted)">
                      <div><strong className="text-white/80">First Coffee:</strong> {s.firstCoffee}</div>
                      <div><strong className="text-white/80">Peak Focus:</strong> {s.peakFocus}</div>
                      <div><strong className="text-white/80">Caffeine Cutoff:</strong> {s.caffeineCurfews[1].cutoffTime}</div>
                      <div><strong className="text-emerald-400">Bedtime:</strong> {s.bedtime5Cycles}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-xs font-bold text-accent flex items-center justify-between">
                    <span>View full timeline</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Section 3: Late Risers & Wolf Schedules */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🐺</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Late Risers &amp; Wolf Schedules (8:30 AM – 11:00 AM)
              </h2>
            </div>
            <p className="text-sm text-(--fg-muted) mb-5">
              For evening chronotypes, creative founders, remote professionals, and late-shift workers. Focus peaks later in the afternoon.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wolfSchedules.map((s) => (
                <Link
                  key={s.slug}
                  href={`/schedules/${s.slug}`}
                  className="raised-card p-5 rounded-2xl border border-white/5 hover:border-accent/40 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-white group-hover:text-accent transition-colors">
                        {s.wakeLabel}
                      </span>
                      <span className="text-xs font-mono text-accent">5 Cycles</span>
                    </div>
                    <div className="space-y-1.5 text-xs text-(--fg-muted)">
                      <div><strong className="text-white/80">First Coffee:</strong> {s.firstCoffee}</div>
                      <div><strong className="text-white/80">Peak Focus:</strong> {s.peakFocus}</div>
                      <div><strong className="text-white/80">Caffeine Cutoff:</strong> {s.caffeineCurfews[1].cutoffTime}</div>
                      <div><strong className="text-emerald-400">Bedtime:</strong> {s.bedtime5Cycles}</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5 text-xs font-bold text-accent flex items-center justify-between">
                    <span>View full timeline</span>
                    <span>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Master Comparison Matrix Table */}
        <section className="mb-16 raised-card p-6 sm:p-8 rounded-3xl border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Complete Wake-Time Circadian Comparison Table
          </h2>
          <p className="text-sm text-(--fg-muted) mb-6">
            All 14 schedules side by side. Times are calculated assuming 5 complete 90-minute sleep cycles (7.5 hours sleep) and standard caffeine metabolism.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono uppercase text-(--fg-muted)">
                  <th className="py-3 px-3">Wake Time</th>
                  <th className="py-3 px-3">20m Sunlight Anchor</th>
                  <th className="py-3 px-3">First Coffee (90m)</th>
                  <th className="py-3 px-3">Peak Focus Window</th>
                  <th className="py-3 px-3">Caffeine Cutoff</th>
                  <th className="py-3 px-3 text-emerald-400 font-bold">Target Bedtime</th>
                  <th className="py-3 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {allSchedules.map((s) => (
                  <tr key={s.slug} className="hover:bg-white/[0.02]">
                    <td className="py-3 px-3 font-bold text-white">{s.wakeLabel}</td>
                    <td className="py-3 px-3 text-(--fg-muted)">{s.morningLight}</td>
                    <td className="py-3 px-3 text-accent font-semibold">{s.firstCoffee}</td>
                    <td className="py-3 px-3 text-(--fg-muted)">{s.peakFocus}</td>
                    <td className="py-3 px-3 text-(--fg-muted)">{s.caffeineCurfews[1].cutoffTime}</td>
                    <td className="py-3 px-3 text-emerald-400 font-bold font-mono">{s.bedtime5Cycles}</td>
                    <td className="py-3 px-3">
                      <Link href={`/schedules/${s.slug}`} className="text-xs font-bold text-accent hover:underline">
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Why Bedtime Calculators Alone Fail */}
        <section className="mb-16 raised-card p-6 sm:p-10 rounded-3xl border border-white/10">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-4">
            Why Bedtime Calculators Alone Are Not Enough
          </h2>
          <div className="prose prose-invert max-w-none text-sm sm:text-base text-(--fg-muted) leading-relaxed space-y-4">
            <p>
              Most sleep tools online are one-dimensional: you type in your wake time, and they subtract 90-minute increments to give you a bedtime like 10:45 PM.
            </p>
            <p>
              While sleep cycles are mathematically valid, **knowing when to go to bed is useless if your daytime biology was chaotic.** If you drank a cold brew at 3:30 PM, your neural adenosine receptors will be flooded with active stimulants at 10:45 PM. If you spent your morning under 300 lux office bulbs, your pineal gland has not received the signal to initiate Dim Light Melatonin Onset (DLMO).
            </p>
            <p>
              A true circadian operating system begins the second you open your eyes. By anchoring morning sunlight, delaying caffeine to match your natural Cortisol Awakening Response, and respecting afternoon dip physiology, your evening bedtime becomes an effortless, automatic consequence of your day.
            </p>
          </div>
        </section>

        {/* Free Tools Hub Links */}
        <section className="mb-14">
          <h2 className="text-2xl font-black text-white tracking-tight mb-4">
            Free Circadian Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link href="/tools/caffeine-calculator" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">☕</span>
              <h4 className="text-sm font-bold text-white mt-2">Caffeine Cutoff</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Live decay curve from your bedtime.</p>
            </Link>

            <Link href="/tools/chronotype-quiz" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">🦁</span>
              <h4 className="text-sm font-bold text-white mt-2">Chronotype Quiz</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Lion, Bear, Wolf, or Dolphin in 2 min.</p>
            </Link>

            <Link href="/tools/sunlight-calculator" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">☀️</span>
              <h4 className="text-sm font-bold text-white mt-2">Sunlight Calculator</h4>
              <p className="text-xs text-(--fg-muted) mt-1">Outdoor lux target for today.</p>
            </Link>

            <Link href="/tools/social-jetlag-calculator" className="raised-card p-4 rounded-2xl border border-white/5 hover:border-accent/40 transition-all block">
              <span className="text-xl">✈️</span>
              <h4 className="text-sm font-bold text-white mt-2">Social Jetlag</h4>
              <p className="text-xs text-(--fg-muted) mt-1">What your weekend lie-in costs on Monday.</p>
            </Link>
          </div>
        </section>

        {/* App Store CTA */}
        <section className="mb-14 raised-card p-8 sm:p-12 rounded-3xl border border-(--accent)/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-(--accent)/5 pointer-events-none -z-10" />
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            Your Day, Planned Around Your Biology
          </h2>
          <p className="text-sm sm:text-base text-(--fg-muted) max-w-xl mx-auto mb-6 leading-relaxed">
            ARC runs on your iPhone with no account, no wearable, and no sleep scores. It looks up your real local sunrise for a 20-minute Live Activity light timer, recalculates your caffeine cutoff with every cup you log, and tracks your afternoon crashes.
          </p>
          <div className="flex justify-center">
            <AppStoreButton location="schedules_index" />
          </div>
          <p className="text-xs text-white/40 mt-3">Free setup • Cancel anytime in the App Store</p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

