import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import { InArticleCta } from "@/components/article/ArticleExtras";
import { topicFor } from "@/lib/content-topics";
import { formatClock } from "@/lib/time";
import {
  BED_TIMES,
  WAKE_TIMES,
  bedBand,
  bedtimesForWake,
  lastCoffeeFor,
  timeLabel,
  timeSlug,
  wakeBand,
  wakeTimesForBed,
} from "@/lib/sleep-times";
import { RelatedReading, ToolFaqSection, type ToolFaq } from "@/app/tools/_components/tool-extras";

export type SleepTimesMode = "wake" | "bed";

export function sleepTimesTitle(mode: SleepTimesMode, minutes: number) {
  const t = timeLabel(minutes);
  return mode === "wake" ? `What Time Should I Go to Bed if I Wake Up at ${t}?` : `What Time Should I Wake Up if I Go to Bed at ${t}?`;
}

export function sleepTimesDescription(mode: SleepTimesMode, minutes: number) {
  const t = timeLabel(minutes);
  if (mode === "wake") {
    const [six, five] = bedtimesForWake(minutes);
    return `Waking at ${t}? Go to bed at ${formatClock(five.time)} for 7.5 hours of sleep or ${formatClock(six.time)} for 9, timed to full sleep cycles. All options and tips.`;
  }
  const [six, five] = wakeTimesForBed(minutes);
  return `Going to bed at ${t}? Wake up at ${formatClock(five.time)} for 7.5 hours of sleep or ${formatClock(six.time)} for 9, timed to full sleep cycles. All options and tips.`;
}

export const sleepTimesPath = (mode: SleepTimesMode, minutes: number) =>
  mode === "wake" ? `/bedtime/wake-up-at-${timeSlug(minutes)}` : `/wake-up-time/bed-at-${timeSlug(minutes)}`;

function tailoredAdvice(mode: SleepTimesMode, minutes: number, plannedBed: number) {
  const t = timeLabel(minutes);
  if (mode === "wake") {
    switch (wakeBand(minutes)) {
      case "early":
        return [
          `A ${t} alarm is early for most people. It suits Lions, the natural early risers; for Bears and especially Wolves, the hard part is falling asleep early enough. Move your bedtime earlier in 15-minute steps over a week rather than all at once, and keep the last hour of the evening dim.`,
          `On many winter mornings it will still be dark at ${t}. Turn on bright indoor lights when you get up, then get outside for about 20 minutes once the sun is up. Never look directly at the sun.`,
        ];
      case "typical":
        return [
          `${t} sits in the range most body clocks handle well, close to a typical Bear schedule. Keep it within about an hour at weekends so Monday doesn't feel like jet lag.`,
          `Get about 20 minutes of outdoor light soon after waking. It's the strongest signal for keeping your body clock, and tonight's sleepiness, on time.`,
        ];
      default:
        return [
          `${t} is a later schedule, closer to a Wolf's natural timing. That's fine if your days allow it. The main risk is drift: later wake times tend to slide later still, especially after late weekends.`,
          `Morning light is what holds a late body clock in place, so get outside for about 20 minutes soon after you wake, and keep evenings dim so your bedtime doesn't creep past ${formatClock(plannedBed)}.`,
        ];
    }
  }
  switch (bedBand(minutes)) {
    case "early":
      return [
        `A ${t} bedtime suits early chronotypes and anyone with an early start. If you often lie awake at this time, your body clock may not be ready yet: keep the evening dim and get morning light, and it will move earlier over a week or two.`,
        `Keep your wake time steady, including weekends. A consistent morning is what makes an early bedtime feel natural rather than forced.`,
      ];
    case "typical":
      return [
        `${t} is a common bedtime that works for most Bears, and it leaves room for a full night before a typical workday.`,
        `If you wake up groggy even after enough hours, try moving your alarm by 15 minutes either way; everyone's cycles run a little differently.`,
      ];
    default:
      return [
        `A ${t} bedtime is late for a standard workday. Wolves often feel most natural here; the risk is a short night if your alarm is early. If your wake time is fixed, start from that instead and work backwards with the bedtime pages below.`,
        `Bright screens and ceiling lights late in the evening push your body clock later still, so dim them in the last hour before bed.`,
      ];
  }
}

export function SleepTimesPage({ mode, minutes }: { mode: SleepTimesMode; minutes: number }) {
  const t = timeLabel(minutes);
  const options = mode === "wake" ? bedtimesForWake(minutes) : wakeTimesForBed(minutes);
  const five = options.find((o) => o.cycles === 5)!;
  const six = options.find((o) => o.cycles === 6)!;
  const four = options.find((o) => o.cycles === 4)!;
  const plannedBed = mode === "wake" ? five.time : minutes;
  const lastCoffee = lastCoffeeFor(plannedBed);
  const slug = timeSlug(minutes);
  const siblings = mode === "wake" ? WAKE_TIMES : BED_TIMES;
  const otherMode: SleepTimesMode = mode === "wake" ? "bed" : "wake";

  const faqs: ToolFaq[] =
    mode === "wake"
      ? [
          {
            q: `Is 7.5 hours enough sleep if I wake up at ${t}?`,
            a: `Most adults need 7 to 9 hours. Going to bed at ${formatClock(five.time)} gives about 7.5 hours of sleep after you've dropped off, inside that range; ${formatClock(six.time)} gives about 9.`,
          },
          {
            q: `What if I can't fall asleep by ${formatClock(five.time)}?`,
            a: `Don't force it; lying awake makes sleep harder. Keep the ${t} alarm, get morning light, and your bedtime will move earlier over a few nights. Going to bed at ${formatClock(four.time)} gives about 6 hours: fine now and then, not every night.`,
          },
          {
            q: `When should I stop drinking coffee if I wake up at ${t}?`,
            a: `For a ${formatClock(five.time)} bedtime, finish one average cup by about ${formatClock(lastCoffee)}, roughly five hours before bed for an average metaboliser. A bigger cup, a slower metabolism, or earlier coffee still in your system moves that earlier.`,
          },
          {
            q: "Should I sleep in at weekends?",
            a: `Try to wake within about an hour of ${t}. Bigger lie-ins shift your body clock later, which makes Sunday night and Monday morning harder.`,
          },
        ]
      : [
          {
            q: `How many hours of sleep do I get if I go to bed at ${t}?`,
            a: `Allowing about 15 minutes to fall asleep, a ${formatClock(five.time)} alarm gives about 7.5 hours of sleep and ${formatClock(six.time)} gives about 9. Most adults need 7 to 9.`,
          },
          {
            q: `Is it OK to wake up at ${formatClock(four.time)}?`,
            a: `That's about 6 hours of sleep (4 cycles): fine occasionally, but most adults need more. If short nights are common, the sleep debt calculator shows how much you're carrying.`,
          },
          {
            q: `When should I stop drinking coffee for a ${t} bedtime?`,
            a: `Finish one average cup by about ${formatClock(lastCoffee)}, roughly five hours before bed for an average metaboliser. A bigger cup, a slower metabolism, or earlier coffee still in your system moves that earlier.`,
          },
          {
            q: "Why wake at the end of a sleep cycle?",
            a: "Near the end of a cycle, sleep is lighter, so waking tends to feel easier. Waking from deep sleep can leave you groggy for a while. Cycles vary from about 70 to 120 minutes, so treat the times as estimates.",
          },
        ];

  return (
    <div className="text-white min-h-screen">
      <ContentNav backHref="/tools/sleep-cycle-calculator" backLabel="Sleep Calculator" />

      <main className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-xs font-bold tracking-widest text-accent uppercase mb-3 font-mono">Sleep cycle times</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight mb-4">{sleepTimesTitle(mode, minutes)}</h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed mb-8">
          {mode === "wake"
            ? `To wake up at ${t} at the end of a sleep cycle, go to bed at ${formatClock(five.time)} for about 7.5 hours of sleep, or ${formatClock(six.time)} for about 9. These times include about 15 minutes to fall asleep.`
            : `If you go to bed at ${t}, set your alarm for ${formatClock(five.time)} for about 7.5 hours of sleep, or ${formatClock(six.time)} for about 9. These times allow about 15 minutes to fall asleep.`}
        </p>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {options.map((o) => (
            <div
              key={o.cycles}
              className={`p-5 rounded-2xl border ${o.recommended ? "bg-(--accent)/10 border-(--accent)/30" : "sunken-card border-white/5"}`}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-(--fg-muted) mb-1">
                {mode === "wake" ? "Go to bed at" : "Wake up at"}
                {o.recommended && <span className="text-accent ml-2">Recommended</span>}
              </p>
              <p className="font-display text-4xl text-white leading-none">{formatClock(o.time)}</p>
              <p className="text-xs text-(--fg-muted) mt-2">
                {o.cycles} cycles · about {o.hours} hours of sleep
                {o.cycles <= 4 && " · a short night"}
              </p>
            </div>
          ))}
        </div>

        <section className="space-y-4 text-(--fg-muted) text-sm sm:text-base leading-relaxed mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {mode === "wake" ? `Making a ${t} wake-up work` : `Making a ${t} bedtime work`}
          </h2>
          {tailoredAdvice(mode, minutes, plannedBed).map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            For a {formatClock(plannedBed)} bedtime, finish your last average cup of coffee by about{" "}
            <strong className="text-white">{formatClock(lastCoffee)}</strong>, roughly five hours before bed for an average
            metaboliser. The{" "}
            <Link href="/tools/caffeine-calculator" className="text-accent hover:underline">
              caffeine cutoff calculator
            </Link>{" "}
            works out yours from the drinks you&apos;ve had today.
          </p>
          <p>
            These times assume sleep cycles of about 90 minutes. Real cycles run from about 70 to 120 minutes and change
            through the night, so treat them as a starting point. For any other time, use the{" "}
            <Link href="/tools/sleep-cycle-calculator" className="text-accent hover:underline">
              sleep cycle calculator
            </Link>
            .
          </p>
        </section>

        <InArticleCta topic={topicFor("sleep-times", "sleep")} location={`${mode === "wake" ? "bedtime" : "waketime"}_${slug}_inline`} />

        <nav aria-label={mode === "wake" ? "Other wake-up times" : "Other bedtimes"} className="mt-12">
          <h2 className="text-xs font-black uppercase tracking-widest text-accent mb-3 font-mono">
            {mode === "wake" ? "Other wake-up times" : "Other bedtimes"}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {siblings.map((m) => (
              <li key={m}>
                {m === minutes ? (
                  <span className="inline-block px-3 py-1.5 rounded-full bg-accent text-black text-xs font-bold font-mono">{timeLabel(m)}</span>
                ) : (
                  <Link
                    href={sleepTimesPath(mode, m)}
                    className="inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold font-mono text-(--fg-muted) hover:text-white"
                  >
                    {timeLabel(m)}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <p className="text-xs text-(--fg-muted) mt-4">
            {mode === "wake" ? "Know your bedtime instead? " : "Know your wake-up time instead? "}
            <Link href={sleepTimesPath(otherMode, otherMode === "bed" ? BED_TIMES[4] : WAKE_TIMES[5])} className="text-accent hover:underline">
              {otherMode === "bed" ? "See wake-up times by bedtime" : "See bedtimes by wake-up time"}
            </Link>
          </p>
        </nav>
      </main>

      <ToolFaqSection faqs={faqs} />
      <RelatedReading
        links={[
          { href: "/blog/how-much-sleep-do-you-need", label: "How much sleep do you need?" },
          { href: "/tools/nap-calculator", label: "Nap calculator", note: "for the day after a short night" },
          { href: "/tools/sleep-debt-calculator", label: "Sleep debt calculator" },
          { href: "/blog/how-to-become-a-morning-person", label: "How to become a morning person" },
        ]}
      />
      <Footer />
    </div>
  );
}
