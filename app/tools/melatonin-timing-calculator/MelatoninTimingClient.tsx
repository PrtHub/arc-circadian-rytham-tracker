"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { trackShareResult } from "@/lib/app-store";
import { formatClock, toMinutes } from "@/lib/time";

type MelatoninGoal = "sleep_easier" | "phase_advance" | "recover_late";

const DAY = 1440;
const norm = (m: number) => ((Math.round(m) % DAY) + DAY) % DAY;

export default function MelatoninTimingClient() {
  const [bedtime, setBedtime] = useState("23:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [goal, setGoal] = useState<MelatoninGoal>("sleep_easier");
  const [shareCopied, setShareCopied] = useState(false);

  const bedMin = toMinutes(bedtime || "23:00");
  const wakeMin = toMinutes(wakeTime || "07:00");

  const dinnerCutoff = norm(bedMin - 180); // 3h before bed
  const dlmoStart = norm(bedMin - 120); // 2h before bed: Dim Light Melatonin Onset
  const windDownStart = norm(bedMin - 60); // 1h before bed: screens off
  const warmShowerStart = norm(bedMin - 90); // 90m before bed: vasodilation cooling
  const morningLightAnchor = norm(wakeMin + 15);

  // Educational chronobiotic vs soporific timing windows
  const phaseAdvanceWindow = norm(bedMin - 270); // ~4.5h before habitual bedtime (Lewy PRC research)
  const bedtimeWindow = norm(bedMin - 45); // 30-60m before bed

  const goalSummary =
    goal === "phase_advance"
      ? {
          badge: "Circadian Phase Advance (Night Owl Shift)",
          primaryLabel: "Light Defense & Phase Window",
          primaryTime: `${formatClock(phaseAdvanceWindow)} – ${formatClock(dlmoStart)}`,
          detail:
            "Chronobiology research (Lewy et al.) shows that advancing a delayed clock relies on bright morning light after waking plus protecting your evening dark window. When melatonin is used clinically as a phase shifter rather than a sleeping pill, timing falls roughly 4–5 hours before habitual sleep onset in low physiological doses (0.3–0.5 mg), rather than high doses at bedtime.",
          refTimeLabel: "Educational Chronobiotic Reference (4.5h pre-bed)",
          refTime: formatClock(phaseAdvanceWindow),
        }
      : goal === "recover_late"
        ? {
            badge: "Late-Night Recovery Protection",
            primaryLabel: "Digital Sunset & Morning Light Pair",
            primaryTime: `${formatClock(dlmoStart)} tonight · ${formatClock(morningLightAnchor)} AM`,
            detail:
              "After one or two late nights, the fastest way back isn't sleeping in past noon—it is dimming indoor lighting below 50 lux two hours before tonight's target bedtime and stepping outside for 20 minutes tomorrow morning to suppress lingering melatonin cleanly.",
            refTimeLabel: "Tonight's Dim Light Melatonin Onset (2h pre-bed)",
            refTime: formatClock(dlmoStart),
          }
        : {
            badge: "Smooth Evening Wind-Down",
            primaryLabel: "Natural DLMO Light Cutoff",
            primaryTime: `${formatClock(dlmoStart)} (2h before bed)`,
            detail:
              "For most sleepers, your brain already makes enough melatonin naturally—460 nm overhead LEDs and phone screens just suppress it by up to 85%. Dropping lights below 50 lux at DLMO and taking a warm shower 90 minutes before bed lets natural drowsiness take over without groggy morning hangover.",
            refTimeLabel: "Standard Pre-Bed Wind-Down Window (30–60m)",
            refTime: formatClock(bedtimeWindow),
          };

  const shareTimeline = () => {
    const shareUrl = "https://arccircadian.com/tools/melatonin-timing-calculator";
    const summaryText = `My Evening Wind-Down Timeline for ${formatClock(bedMin)} bed: Dinner cutoff ${formatClock(dinnerCutoff)}, Digital Sunset / DLMO ${formatClock(dlmoStart)}, Warm shower ${formatClock(warmShowerStart)}, Lights out ${formatClock(bedMin)}.`;
    trackShareResult("melatonin_timing_calculator", `${formatClock(dlmoStart)}_${goal}`);

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      navigator
        .share({ title: "My Digital Sunset & DLMO Timeline", text: summaryText, url: shareUrl })
        .catch(() => {});
      return;
    }

    navigator.clipboard
      .writeText(`${summaryText} Calculate yours: ${shareUrl}`)
      .then(() => {
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2500);
      })
      .catch(() => setShareCopied(false));
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">
      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Melatonin &amp; <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Digital Sunset</span> Timing Calculator
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Calculate when your natural Dim Light Melatonin Onset (DLMO) begins, when to dim overhead screens, and how chronobiologists time light defense around your bedtime.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl space-y-8">
        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="dlmo-bedtime"
              className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono"
            >
              Usual / Target Bedtime
            </label>
            <input
              id="dlmo-bedtime"
              type="time"
              value={bedtime}
              onChange={(e) => setBedtime(e.target.value)}
              className="w-full sunken-card p-4 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label
              htmlFor="dlmo-wake"
              className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono"
            >
              Usual Wake Time
            </label>
            <input
              id="dlmo-wake"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full sunken-card p-4 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div>
          <p className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
            Your Goal Tonight
          </p>
          <div className="grid sm:grid-cols-3 gap-2.5 font-mono text-xs">
            {[
              { id: "sleep_easier", label: "Fall asleep smoothly" },
              { id: "phase_advance", label: "Shift sleep earlier" },
              { id: "recover_late", label: "Recover from late nights" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setGoal(item.id as MelatoninGoal)}
                aria-pressed={goal === item.id}
                className={`p-3 rounded-xl font-bold transition-colors cursor-pointer ${
                  goal === item.id
                    ? "bg-accent text-black"
                    : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="sunken-card border border-(--accent)/30 p-6 sm:p-8 relative overflow-hidden"
          aria-live="polite"
          data-nosnippet
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-60" />

          <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
            {goalSummary.badge}
          </span>

          <div className="text-3xl sm:text-4xl font-black text-white font-mono mb-2">
            {goalSummary.primaryTime}
          </div>
          <p className="text-xs font-mono uppercase tracking-wider text-(--fg-muted) mb-4">
            {goalSummary.primaryLabel}
          </p>

          <p className="text-sm text-zinc-300 leading-relaxed mb-6">
            {goalSummary.detail}
          </p>

          <div className="space-y-2.5 text-xs sm:text-sm font-mono mb-6">
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-(--fg-muted)">Finish heavy dinner (3h pre-bed)</span>
              <span className="font-bold text-white">{formatClock(dinnerCutoff)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-amber-300">Digital Sunset / DLMO starts (&lt;50 lux)</span>
              <span className="font-bold text-amber-300">{formatClock(dlmoStart)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-(--fg-muted)">Warm bath / shower cooling window</span>
              <span className="font-bold text-white">{formatClock(warmShowerStart)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-(--fg-muted)">Screens &amp; work off (Wind-down)</span>
              <span className="font-bold text-white">{formatClock(windDownStart)}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
              <span className="text-emerald-400">{goalSummary.refTimeLabel}</span>
              <span className="font-bold text-emerald-400">{goalSummary.refTime}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed mb-5">
            <strong>Educational Note Only:</strong> Exogenous melatonin is a hormone, not a simple herbal vitamin, and store-bought supplements vary widely in concentration. Speak with a doctor or pharmacist before starting or timing any supplement—light hygiene at {formatClock(dlmoStart)} handles most cases naturally.
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={shareTimeline}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
            >
              {shareCopied ? "✓ Copied timeline" : "Share my evening timeline →"}
            </button>
          </div>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-3 text-accent">
          Get an automatic {formatClock(windDownStart)} Wind-Down cue on iPhone.
        </h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm sm:text-base">
          ARC shifts your phone&apos;s Living Light sky into evening &amp; wind-down before bedtime, reminds you when melatonin onset starts, and flags any residual caffeine still keeping your brain alert.
        </p>
        <AppStoreButton
          size="lg"
          location="tool_melatonin_timing_calculator"
          qrHeadline={`Time your ${formatClock(windDownStart)} wind-down`}
          qrSubtitle={`Scan with your iPhone to automate evening Digital Sunset reminders and track residual bedtime caffeine.`}
        />
      </div>
    </main>
  );
}
