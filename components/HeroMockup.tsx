"use client";

import { useSyncExternalStore } from "react";
import {
  type CircadianPhase,
  PHASE_CONFIG,
  getPhaseFromDate,
} from "@/components/CircadianThemeProvider";
import { formatClock, toMinutes } from "@/lib/time";

interface PhaseScreenData {
  phaseLabel: string;
  // 24h clock shown when this phase is previewed rather than live.
  sampleTime: string;
  // 24h target that replaces "{countdown}" in metricSub / metricBadge.
  countdownTo?: string;
  quote: string;
  actionIcon: string;
  actionTitle: string;
  actionDesc: string;
  whyLink: string;
  metricLabel: string;
  metricBadge: string;
  metricValue: string;
  metricUnit: string;
  metricSub: string;
  timelineProgress: string;
}

const PHASE_SCREEN_CONTENT: Record<CircadianPhase, PhaseScreenData> = {
  morning: {
    phaseLabel: "MORNING PHASE",
    sampleTime: "08:15",
    countdownTo: "19:40",
    quote:
      "“You're in your light window. Twenty minutes outside now sets up your whole day.”",
    actionIcon: "☀️",
    actionTitle: "Light first, coffee later",
    actionDesc: "Delay caffeine 90 minutes today",
    whyLink: "Why this works",
    metricLabel: "LAST SAFE COFFEE",
    metricBadge: "Recovery",
    metricValue: "7:40",
    metricUnit: "pm",
    metricSub: "in {countdown}",
    timelineProgress: "35%",
  },
  peak: {
    phaseLabel: "PEAK FOCUS",
    sampleTime: "11:30",
    countdownTo: "14:00",
    quote:
      "“Your biological cognitive peak is active. Tackle your highest leverage deep work now.”",
    actionIcon: "⚡",
    actionTitle: "Deep Work Sprint",
    actionDesc: "Executive function & alertness at maximum",
    whyLink: "Focus biology",
    metricLabel: "LAST SAFE COFFEE",
    metricBadge: "Ahead · 45m",
    metricValue: "2:00",
    metricUnit: "pm",
    metricSub: "Cutoff in {countdown}",
    timelineProgress: "55%",
  },
  dip: {
    phaseLabel: "AFTERNOON DIP",
    sampleTime: "14:45",
    quote:
      "“Adenosine pressure peak. A 15-minute brisk walk or NSDR resets mental clarity.”",
    actionIcon: "⏳",
    actionTitle: "Clear Adenosine Backlog",
    actionDesc: "Switch to hydration or a 10m walk",
    whyLink: "Why this works",
    metricLabel: "LAST SAFE COFFEE",
    metricBadge: "Cutoff Passed",
    metricValue: "1:30",
    metricUnit: "pm",
    metricSub: "Target <50mg at bedtime",
    timelineProgress: "72%",
  },
  evening: {
    phaseLabel: "EVENING PHASE",
    sampleTime: "18:30",
    countdownTo: "21:30",
    quote:
      "“Core temperature and physical strength peak. Dim harsh overhead lighting to protect melatonin.”",
    actionIcon: "🌆",
    actionTitle: "Dim Overhead Lights",
    actionDesc: "Switch to warm low-angle lamps",
    whyLink: "Melatonin onset",
    metricLabel: "WIND DOWN ANCHOR",
    metricBadge: "On Track",
    metricValue: "9:30",
    metricUnit: "pm",
    metricSub: "in {countdown}",
    timelineProgress: "82%",
  },
  windDown: {
    phaseLabel: "WIND DOWN",
    sampleTime: "22:00",
    countdownTo: "23:00",
    quote:
      "“Dim light melatonin onset is underway. Keep screens filtered and lower room temperature.”",
    actionIcon: "🌙",
    actionTitle: "Prepare for Deep Sleep",
    actionDesc: "Cool room to 67°F & power down",
    whyLink: "DLMO mechanism",
    metricLabel: "BEDTIME TARGET",
    metricBadge: "In {countdown}",
    metricValue: "11:00",
    metricUnit: "pm",
    metricSub: "Target 5 cycles (7.5h)",
    timelineProgress: "92%",
  },
  night: {
    phaseLabel: "NIGHT PHASE",
    sampleTime: "00:05",
    countdownTo: "06:30",
    quote:
      "“Core temperature minimum and cellular repair. Restorative slow-wave sleep is prioritizing recovery.”",
    actionIcon: "🌌",
    actionTitle: "Restorative Recovery",
    actionDesc: "Glymphatic clearance · Silent mode",
    whyLink: "Sleep Architecture",
    metricLabel: "WAKE ANCHOR",
    metricBadge: "Restoring",
    metricValue: "6:30",
    metricUnit: "am",
    metricSub: "in {countdown}",
    timelineProgress: "98%",
  },
  rise: {
    phaseLabel: "RISE PHASE",
    sampleTime: "06:15",
    quote:
      "“Cortisol awakening response is initiating. Step into natural daylight to anchor your rhythm.”",
    actionIcon: "🌅",
    actionTitle: "Catch Early Photons",
    actionDesc: "Outdoor daylight before screens (never look at the sun)",
    whyLink: "Why this works",
    metricLabel: "COFFEE DELAY",
    metricBadge: "90m Buffer",
    metricValue: "7:45",
    metricUnit: "am",
    metricSub: "Clear baseline adenosine",
    timelineProgress: "15%",
  },
};

// The phase lives on <html data-phase>, set before paint and updated by CircadianThemeProvider.
function subscribePhase(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-phase"],
  });
  return () => observer.disconnect();
}

function getPhaseSnapshot(): CircadianPhase {
  const phase = document.documentElement.getAttribute("data-phase");
  return phase && phase in PHASE_SCREEN_CONTENT ? (phase as CircadianPhase) : "dip";
}

// Minute-resolution clock, so the snapshot stays stable between ticks. Null on the server.
function subscribeMinute(onChange: () => void) {
  const id = setInterval(onChange, 15000);
  return () => clearInterval(id);
}

const getMinuteSnapshot = () => Math.floor(Date.now() / 60000);
const getServerMinute = () => null;

function formatCountdown(fromMinutes: number, toHHMM: string) {
  const diff = (((toMinutes(toHHMM) - fromMinutes) % 1440) + 1440) % 1440;
  const h = Math.floor(diff / 60);
  const m = diff % 60;
  if (h === 0) return `${m}m`;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function HeroMockup() {
  const phase = useSyncExternalStore(subscribePhase, getPhaseSnapshot, () => "dip" as CircadianPhase);
  const minute = useSyncExternalStore(subscribeMinute, getMinuteSnapshot, getServerMinute);

  const content = PHASE_SCREEN_CONTENT[phase] || PHASE_SCREEN_CONTENT.dip;

  // Live when the previewed phase is the visitor's real one; otherwise show that phase's sample time.
  const now = minute === null ? null : new Date(minute * 60000);
  const isLive = now !== null && getPhaseFromDate(now) === phase;
  const screenMinutes = isLive ? now.getHours() * 60 + now.getMinutes() : toMinutes(content.sampleTime);

  const fillCountdown = (text: string) =>
    content.countdownTo
      ? text.replace("{countdown}", formatCountdown(screenMinutes, content.countdownTo))
      : text;
  const metricBadge = fillCountdown(content.metricBadge);
  const metricSub = fillCountdown(content.metricSub);

  return (
    <div className="relative w-full max-w-[285px] sm:max-w-[295px]">
      {/* Outer Ambient Glow matched to biological sky */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -m-6 rounded-[60px] bg-radial from-[var(--g-mid)]/50 via-[var(--accent)]/15 to-transparent blur-3xl -z-10 transition-colors duration-700"
      />

      {/* Titanium Outer Chassis */}
      <div className="relative rounded-[48px] p-[2.5px] bg-linear-to-b from-neutral-600 via-neutral-800 to-neutral-900 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.15)] transition-all">
        {/* Inner Black Bezel */}
        <div className="relative rounded-[45.5px] p-[5.5px] bg-black">
          {/* Ceramic Shield Glass Reflection */}
          <div className="pointer-events-none absolute inset-0 rounded-[45.5px] bg-linear-to-tr from-transparent via-white/[0.02] to-white/[0.06] z-30" />

          {/* Dynamic Living Light Screen Canvas (Synchronized with Website Background) */}
          <div
            className="relative w-full min-h-[585px] rounded-[40px] overflow-hidden px-4.5 pt-3.5 pb-4 flex flex-col justify-between text-left border border-white/10"
            style={{
              background:
                "linear-gradient(180deg, var(--g-top) 0%, var(--g-mid) 55%, var(--g-bot) 100%)",
              color: "var(--fg, #f4f9fc)",
              transition: "background 0.6s cubic-bezier(0.4, 0, 0.2, 1), color 0.6s ease",
            }}
          >
            {/* 1. Status Bar */}
            <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-white/90">
              <span className="tracking-tight font-mono">{formatClock(screenMinutes, false)}</span>
              <div className="flex items-center gap-1.5 text-xs opacity-90">
                {/* Signal Bars */}
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-1 bg-white rounded-2xs" />
                  <span className="w-0.5 h-1.5 bg-white rounded-2xs" />
                  <span className="w-0.5 h-2 bg-white rounded-2xs" />
                  <span className="w-0.5 h-2.5 bg-white rounded-2xs" />
                </div>
                {/* Wifi */}
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4z" />
                </svg>
                {/* Battery */}
                <div className="w-5 h-2.5 border border-white/80 rounded-xs p-0.5 flex items-center">
                  <div className="w-3.5 h-full bg-white rounded-2xs" />
                </div>
              </div>
            </div>

            {/* 2. Top Header: Phase Pill & Settings */}
            <div className="flex items-center justify-between pt-3">
              <span className="text-[10px] font-mono tracking-widest text-[var(--accent)] uppercase font-bold transition-colors duration-500">
                {content.phaseLabel}
              </span>
              <button
                type="button"
                aria-label="Settings"
                className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-zinc-300 shadow-inner hover:bg-white/15 transition-colors"
              >
                <span className="text-xs">⚙️</span>
              </button>
            </div>

            {/* 3. The Daily Directive Sentence (Editorial Serif) */}
            <div className="py-1">
              <p className="font-display italic text-[1.18rem] sm:text-[1.24rem] leading-[1.28] text-[var(--fg,#ffffff)] transition-colors duration-500">
                {content.quote}
              </p>
            </div>

            {/* 4. Action Card (Frosted Glassmorphic) */}
            <div className="flex flex-col gap-2">
              <div className="rounded-2xl p-3 bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.3)] flex items-center justify-between transition-all">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/15 border border-[var(--accent)]/30 flex items-center justify-center text-sm shrink-0 transition-colors duration-500">
                    {content.actionIcon}
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white leading-tight">
                      {content.actionTitle}
                    </h4>
                    <p className="text-[9.5px] text-[var(--fg-muted)] leading-tight mt-0.5 transition-colors duration-500">
                      {content.actionDesc}
                    </p>
                  </div>
                </div>
                <span className="text-[var(--fg-muted)] text-xs font-bold font-mono">›</span>
              </div>

              <div className="flex items-center justify-between px-1 text-[9.5px] text-[var(--fg-muted)] font-medium">
                <span className="hover:text-white transition-colors cursor-pointer flex items-center gap-1">
                  {content.whyLink}{" "}
                  <span className="text-[8px] border border-white/20 rounded-full w-2.5 h-2.5 inline-flex items-center justify-center">
                    i
                  </span>
                </span>
                <span className="hover:text-white transition-colors cursor-pointer">
                  Not now
                </span>
              </div>
            </div>

            {/* Subtle Divider */}
            <div className="h-[1px] bg-white/10 w-full" />

            {/* 5. Biological Metric Section */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[8.5px] font-mono tracking-wider text-[var(--fg-muted)] uppercase font-bold transition-colors duration-500">
                  {content.metricLabel}
                </span>
                <span className="text-[8px] font-mono font-bold text-[var(--accent)] bg-[var(--accent)]/15 border border-[var(--accent)]/30 px-1.5 py-0.5 rounded-full transition-colors duration-500">
                  {metricBadge}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="font-display italic text-3xl font-medium text-[var(--accent)] leading-none transition-colors duration-500">
                  {content.metricValue}
                </span>
                <span className="font-display italic text-base text-[var(--accent)]/80 transition-colors duration-500">
                  {content.metricUnit}
                </span>
              </div>
              <span className="text-[9px] text-[var(--fg-muted)] -mt-0.5 transition-colors duration-500">
                {metricSub}
              </span>

              {/* Timeline Graph */}
              <div className="w-full relative pt-1 pb-0.5">
                {/* Dotted threshold line */}
                <div className="w-full border-b border-dashed border-[var(--aura-sleep,#7b61ff)]/40 mb-3" />

                {/* Axis Line with indicator dot */}
                <div className="relative w-full h-[2px] bg-[var(--accent)]/30 rounded-full transition-colors duration-500">
                  {/* Vertical line indicator */}
                  <div
                    className="absolute bottom-0 w-[1px] h-6 bg-[var(--accent)]/50 transition-all duration-500"
                    style={{ left: content.timelineProgress }}
                  />
                  {/* Dot marker */}
                  <div
                    className="absolute -top-1 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] transition-all duration-500"
                    style={{ left: content.timelineProgress }}
                  />
                </div>

                {/* Time axis labels */}
                <div className="flex justify-between items-center text-[7.5px] font-mono text-[var(--fg-muted)] pt-1.5 transition-colors duration-500">
                  <span>Now</span>
                  <span>+4h</span>
                  <span>+7h</span>
                  <span>+11h</span>
                  <span className="font-bold text-white">Bed</span>
                </div>
              </div>
            </div>

            {/* 6. Floating Navigation Pill Dock */}
            <div className="pt-1 w-fit mx-auto">
              <div className="rounded-full p-1 bg-black/40 backdrop-blur-xl border border-white/15 flex items-center justify-between shadow-xl">
                {/* Active Home Pill */}
                <button
                  type="button"
                  className="bg-[var(--accent)] text-neutral-950 font-bold text-[10px] px-5 py-1.5 rounded-full shadow-md transition-all duration-500"
                >
                  Home
                </button>

                {/* Trends Tab */}
                <button
                  type="button"
                  className="text-[var(--fg-muted)] hover:text-white font-medium text-[10px] px-4 py-1.5 transition-colors duration-300"
                >
                  Trends
                </button>
              </div>

              {/* Home Indicator */}
              <div className="w-20 h-0.5 bg-white/30 rounded-full mx-auto mt-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Tells visitors the page is already running on their clock */}
      {now !== null && (
        <p className="mt-5 text-center text-xs text-(--fg-muted) leading-relaxed">
          {isLive ? (
            <>
              It&apos;s <strong className="text-white">{formatClock(screenMinutes, true)}</strong> where
              you are: your <span className="text-accent">{PHASE_CONFIG[phase].label}</span>. This page is
              tinted to it, and the phone shows what ARC would tell you right now.
            </>
          ) : (
            <>
              Previewing <span className="text-accent">{PHASE_CONFIG[phase].label}</span>. The phone shows
              what ARC would tell you then.
            </>
          )}
        </p>
      )}
    </div>
  );
}
