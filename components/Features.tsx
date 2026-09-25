import type { ReactNode } from "react";
import type { CircadianPhase } from "@/components/CircadianThemeProvider";
import { SLEEP_SAFE_MG, halfLifeFor, latestSafeCup, mgAt, type LoggedDrink } from "@/lib/caffeine";
import { formatClock } from "@/lib/time";

/* ── The coffee moment is computed, not typed in ───────────────────────────
   A small coffee at 8:20, an espresso logged at 10:45, an average metaboliser
   going to bed at 11 PM, and the next realistic cup being another small coffee. */
const HALF_LIFE = halfLifeFor("normal");
const BED = 23 * 60;
const NOW = 10 * 60 + 45;
const NEXT_CUP_MG = 95;
const BEFORE_ESPRESSO: LoggedDrink[] = [{ mg: 95, at: 8 * 60 + 20 }];
const AFTER_ESPRESSO: LoggedDrink[] = [...BEFORE_ESPRESSO, { mg: 65, at: NOW }];
const cutoffBefore = latestSafeCup(BEFORE_ESPRESSO, BED, HALF_LIFE, NEXT_CUP_MG) ?? NOW;
const cutoffAfter = latestSafeCup(AFTER_ESPRESSO, BED, HALF_LIFE, NEXT_CUP_MG) ?? NOW;

/* ── The day-10 moment: the window picked in onboarding vs the measured dip ── */
const DIP_AXIS = { from: 12 * 60, to: 18 * 60 };
const DIP_SAID = { from: 13 * 60, to: 15 * 60 };
const DIP_MEASURED = 15 * 60 + 40;

/* ── The monthly report: example weekly crash counts, month one vs month two ── */
const MONTH_ONE = [4, 3, 4, 3];
const MONTH_TWO = [2, 1, 1, 0];
const average = (weeks: number[]) => weeks.reduce((a, b) => a + b, 0) / weeks.length;

function formatSpan(minutes: number) {
  const total = Math.round(minutes);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

const axisPercent = (t: number) => ((t - DIP_AXIS.from) / (DIP_AXIS.to - DIP_AXIS.from)) * 100;

/* ── Shared screen card: each one carries its own phase sky via data-phase ── */
function Screen({
  phase,
  label,
  time,
  children,
}: {
  phase: CircadianPhase;
  label: string;
  time: string;
  children: ReactNode;
}) {
  return (
    <div
      data-phase={phase}
      aria-hidden="true"
      className="w-full max-w-[380px] mx-auto lg:mx-0 rounded-3xl p-5 sm:p-6 border border-white/15 shadow-2xl flex flex-col gap-4 text-left text-(--fg)"
      style={{
        background: "linear-gradient(180deg, var(--g-top) 0%, var(--g-mid) 55%, var(--g-bot) 100%)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono font-bold tracking-widest text-accent uppercase border border-(--accent)/30 bg-(--accent)/10 px-2.5 py-0.5 rounded-full">
          {label}
        </span>
        <span className="text-[11px] font-mono text-(--fg-muted)">{time}</span>
      </div>
      {children}
    </div>
  );
}

function MorningCard() {
  return (
    <Screen phase="morning" label="Light window" time="7:40">
      <p className="font-display italic text-2xl leading-snug">
        &ldquo;You&apos;re in your light window. Twenty minutes outside now sets up your whole day.&rdquo;
      </p>
      <div className="raised-card p-4 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-(--aura-sun)/20 border border-(--aura-sun)/40 flex items-center justify-center text-lg shrink-0">
            ☀️
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-white">Get 20 min of light</p>
            <p className="text-[11px] text-(--fg-muted)">Running on your lock screen</p>
          </div>
          <span className="font-display text-2xl text-white">14:20</span>
        </div>
        <div className="w-full h-1.5 bg-black/30 rounded-full overflow-hidden">
          <div className="h-full rounded-full bg-linear-to-r from-(--aura-sun) to-accent" style={{ width: "28%" }} />
        </div>
      </div>
      <p className="text-[11px] font-mono text-(--fg-muted)">Sunrise 6:42 AM · from your time zone</p>
    </Screen>
  );
}

function DecayCurve() {
  const start = 8 * 60;
  const firstCup = BEFORE_ESPRESSO[0].at;
  const w = 300;
  const top = 8;
  const bottom = 76;
  const maxMg = 150;
  const x = (t: number) => ((t - start) / (BED - start)) * w;
  const y = (mg: number) => bottom - (Math.min(mg, maxMg) / maxMg) * (bottom - top);
  const path = (from: number, to: number) => {
    const points: string[] = [];
    for (let t = from; t <= to; t += 5) {
      points.push(`${x(t).toFixed(1)},${y(mgAt(AFTER_ESPRESSO, t, HALF_LIFE)).toFixed(1)}`);
    }
    return `M${points.join(" L")}`;
  };

  return (
    <div>
      <svg viewBox={`0 0 ${w} 84`} className="w-full h-auto">
        <line
          x1="0"
          x2={w}
          y1={y(SLEEP_SAFE_MG)}
          y2={y(SLEEP_SAFE_MG)}
          stroke="var(--aura-sleep)"
          strokeDasharray="3 3"
          strokeWidth="1"
        />
        <text x="2" y={y(SLEEP_SAFE_MG) + 10} fill="var(--fg-muted)" fontSize="8">
          Sleep line · {SLEEP_SAFE_MG} mg
        </text>
        <path d={path(firstCup, NOW)} fill="none" stroke="var(--aura-crash)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d={path(NOW, BED)} fill="none" stroke="var(--aura-crash)" strokeOpacity="0.55" strokeWidth="2" strokeDasharray="4 4" />
        <circle cx={x(NOW)} cy={y(mgAt(AFTER_ESPRESSO, NOW, HALF_LIFE))} r="3.5" fill="var(--accent)" />
      </svg>
      <div className="flex justify-between text-[9px] font-mono text-(--fg-muted) mt-1">
        <span>8 AM</span>
        <span>Bed · {formatClock(BED)}</span>
      </div>
    </div>
  );
}

function CoffeeCard() {
  return (
    <Screen phase="peak" label="Caffeine" time={formatClock(NOW, false)}>
      <div className="raised-card p-3 flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-white">☕ Espresso · 65 mg</span>
        <span className="font-mono text-(--fg-muted) shrink-0">Just now</span>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-(--fg-muted)">Last safe coffee</span>
          <span className="text-[10px] font-mono font-bold text-accent bg-(--accent)/15 px-2 py-0.5 rounded-md">
            {formatSpan(cutoffAfter - NOW)} left
          </span>
        </div>
        <p className="font-display text-5xl text-white mt-1 leading-none">{formatClock(cutoffAfter)}</p>
        <p className="text-[11px] text-(--fg-muted) mt-2">
          Was <span className="line-through">{formatClock(cutoffBefore)}</span> before that espresso
        </p>
      </div>
      <div className="sunken-card p-3">
        <DecayCurve />
      </div>
    </Screen>
  );
}

const PLAN = [
  { label: "Morning light", done: true, time: "" },
  { label: "Cutoff held", done: true, time: "" },
  { label: "Dim the lights", done: false, time: "9:30 PM" },
  { label: "Bed", done: false, time: "11:00 PM" },
];

function DipCard() {
  return (
    <Screen phase="dip" label="Afternoon dip" time="2:40">
      <p className="font-display italic text-2xl leading-snug">
        &ldquo;You&apos;re 40 minutes into your afternoon dip. This is adenosine, not laziness.&rdquo;
      </p>
      <div className="raised-card p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-(--aura-ice)/15 border border-(--aura-ice)/40 flex items-center justify-center text-lg shrink-0">
          🚶
        </div>
        <div className="flex-1">
          <p className="font-bold text-sm text-white">Walk for 15 minutes</p>
          <p className="text-[11px] text-(--fg-muted)">Instead of another coffee</p>
        </div>
        <span className="text-[10px] font-mono text-(--fg-muted) underline decoration-white/30">Why this?</span>
      </div>
      <div className="sunken-card p-3.5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-(--fg-muted) mb-2">Rest of today</p>
        <ul className="flex flex-col gap-1.5 text-xs">
          {PLAN.map((item) => (
            <li key={item.label} className="flex items-center justify-between">
              <span className={item.done ? "text-(--fg-muted) line-through" : "text-white"}>{item.label}</span>
              <span className="font-mono text-[10px] text-(--fg-muted)">{item.done ? "Done" : item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}

function DipLearnCard() {
  return (
    <Screen phase="evening" label="Your dip" time="Day 10">
      <p className="font-display italic text-2xl leading-snug">
        &ldquo;You told us your energy crashes between 1 and 3. It actually lands at {formatClock(DIP_MEASURED)}.&rdquo;
      </p>
      <div className="raised-card p-4">
        <div className="relative h-10">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/15" />
          <div
            className="absolute top-2 bottom-2 rounded-md bg-white/10 border border-dashed border-white/35"
            style={{
              left: `${axisPercent(DIP_SAID.from)}%`,
              width: `${axisPercent(DIP_SAID.to) - axisPercent(DIP_SAID.from)}%`,
            }}
          />
          <div
            className="absolute top-0 bottom-0 w-0.5 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]"
            style={{ left: `${axisPercent(DIP_MEASURED)}%` }}
          />
        </div>
        <div className="flex justify-between text-[9px] font-mono text-(--fg-muted) mt-1.5">
          <span>12 PM</span>
          <span>2 PM</span>
          <span>4 PM</span>
          <span>6 PM</span>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono mt-3">
          <span className="flex items-center gap-1.5 text-(--fg-muted)">
            <span className="w-3 h-2 rounded-sm border border-dashed border-white/40 bg-white/10" />
            You said
          </span>
          <span className="flex items-center gap-1.5 text-accent">
            <span className="w-0.5 h-3 rounded-full bg-accent" />
            Measured
          </span>
        </div>
      </div>
      <p className="text-[11px] font-mono text-(--fg-muted)">From 6 afternoon check-ins · your plan moved to match</p>
    </Screen>
  );
}

function ReportCard() {
  const peak = Math.max(...MONTH_ONE, ...MONTH_TWO);
  const bar = (n: number) => `${Math.max((n / peak) * 100, 4)}%`;

  return (
    <Screen phase="windDown" label="Monthly report" time="Example">
      <div>
        <p className="text-[10px] font-mono uppercase tracking-widest text-(--fg-muted)">Afternoon crashes per week</p>
        <p className="font-display text-4xl text-white mt-1 flex items-baseline gap-2">
          {average(MONTH_ONE)}
          <span className="text-lg text-(--fg-muted) font-sans">→</span>
          <span className="text-accent">{average(MONTH_TWO)}</span>
        </p>
      </div>
      <div>
        <div className="flex items-end gap-1.5 h-16">
          {MONTH_ONE.map((n, i) => (
            <div key={`m1-${i}`} className="flex-1 rounded-t-md bg-white/20" style={{ height: bar(n) }} />
          ))}
          {MONTH_TWO.map((n, i) => (
            <div key={`m2-${i}`} className="flex-1 rounded-t-md bg-accent" style={{ height: bar(n) }} />
          ))}
        </div>
        <div className="flex justify-between text-[10px] font-mono text-(--fg-muted) mt-1.5">
          <span>Month 1</span>
          <span>Month 2</span>
        </div>
      </div>
      <div className="sunken-card p-3.5">
        <p className="text-[10px] font-mono uppercase tracking-widest text-(--fg-muted) mb-2">5-day experiments</p>
        <ul className="flex flex-col gap-1.5 text-xs">
          <li className="flex items-center justify-between">
            <span className="text-white">Walk before the dip</span>
            <span className="font-mono text-[10px] font-bold text-accent">Fewer crashes</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-white">Cutoff 1h earlier</span>
            <span className="font-mono text-[10px] text-(--fg-muted)">No difference</span>
          </li>
        </ul>
      </div>
    </Screen>
  );
}

interface MomentData {
  time: string;
  title: string;
  body: string;
  detail?: string;
  card: ReactNode;
}

const today: MomentData[] = [
  {
    time: "7:40 AM",
    title: "One sentence, one thing to do",
    body: "ARC opens with a sentence about where you are in your day and a single action. In the morning that's usually light: a 20-minute timer that runs on your lock screen and in the Dynamic Island, so your phone can stay in your pocket.",
    detail: "Sunrise comes from your time zone. No location permission, with an indoor fallback on dark winter mornings.",
    card: <MorningCard />,
  },
  {
    time: formatClock(NOW),
    title: "Every coffee moves your cutoff",
    body: `Log a drink in one tap and your last safe coffee recalculates from your bedtime, how fast you clear caffeine, and everything you've had today. Here, one espresso pulls it ${formatSpan(cutoffBefore - cutoffAfter)} earlier.`,
    detail: "When no cup fits before bed anymore, ARC says so instead of showing a time.",
    card: <CoffeeCard />,
  },
  {
    time: "2:40 PM",
    title: "When the crash comes, so does the reason",
    body: "At the dip, ARC tells you what's happening and asks for a walk, not another coffee. The why is one tap away, and the rest of your day sits underneath: what's done, and what's still open.",
    card: <DipCard />,
  },
];

const weeks: MomentData[] = [
  {
    time: "Day 10",
    title: "It stops taking your word for it",
    body: "Once enough check-ins land, ARC measures when your dip really hits. If it's outside the window you picked on day one, it tells you, and everything timed around your dip moves with it.",
    card: <DipLearnCard />,
  },
  {
    time: "Day 28",
    title: "Then it shows you what changed",
    body: "Once a month, ARC puts your crash rate side by side, then versus now, from your own check-ins. Five-day experiments test one habit at a time, and “no difference” is an allowed answer.",
    detail: "No sleep score, no streaks, no rings.",
    card: <ReportCard />,
  },
];

function Moment({ moment }: { moment: MomentData }) {
  return (
    <li className="relative pl-11 lg:pl-16 pb-16 lg:pb-24">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 w-6 h-6 rounded-full border border-(--accent)/40 bg-(--accent)/10 flex items-center justify-center"
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
      </span>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-xs font-bold tracking-widest text-accent uppercase font-mono leading-6">
            {moment.time}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">{moment.title}</h3>
          <p className="text-(--fg-muted) leading-relaxed text-sm sm:text-base">{moment.body}</p>
          {moment.detail && (
            <p className="text-xs text-(--fg-muted) leading-relaxed opacity-80">{moment.detail}</p>
          )}
        </div>
        {moment.card}
      </div>
    </li>
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 px-6 relative overflow-hidden border-t border-white/5"
    >
      {/* Decorative glows (desktop only: large blurs are expensive on phones) */}
      <div
        className="hidden md:block pointer-events-none absolute right-[-20%] top-[10%] w-150 h-150 rounded-full bg-(--accent)/5 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="hidden md:block pointer-events-none absolute left-[-20%] bottom-[10%] w-150 h-150 rounded-full bg-(--aura-sleep)/5 blur-[150px]"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto">
        <header className="mb-16 max-w-2xl">
          <span className="text-xs font-bold tracking-widest text-accent uppercase font-mono border border-(--accent)/30 bg-(--accent)/5 px-3 py-1 rounded-full">
            A DAY WITH ARC
          </span>
          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white mt-4"
          >
            It explains today,
            <br />
            <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">and proves it over weeks.</span>
          </h2>
          <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed mt-4">
            One sentence about why you feel the way you do, one thing worth doing about it, and over
            time, your own numbers showing whether it worked.
          </p>
        </header>

        <div className="relative">
          {/* The timeline rail */}
          <div
            aria-hidden="true"
            className="absolute left-[11.5px] top-3 bottom-32 w-px bg-linear-to-b from-(--accent)/50 via-white/10 to-transparent"
          />
          <ol>
            {today.map((moment) => (
              <Moment key={moment.time} moment={moment} />
            ))}
            <li className="relative pl-11 lg:pl-16 pb-16 lg:pb-24">
              <span aria-hidden="true" className="absolute left-2 top-1 w-2 h-2 rounded-full bg-white/40" />
              <p className="eyebrow text-(--fg-muted) leading-4">Then, over the next weeks</p>
            </li>
            {weeks.map((moment) => (
              <Moment key={moment.time} moment={moment} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
