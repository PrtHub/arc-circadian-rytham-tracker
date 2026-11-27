"use client";

import { useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { trackShareResult } from "@/lib/app-store";
import { formatClock, toMinutes } from "@/lib/time";

type CrashTiming =
  | "morning_10am"
  | "afternoon_2pm"
  | "evening_5pm"
  | "wired_11pm"
  | "wake_3am";

type FirstCoffeeTiming = "immediate" | "delayed" | "none";
type AfternoonCaffeine = "none" | "early" | "late";

const CRASH_OPTIONS: { id: CrashTiming; label: string; sub: string }[] = [
  { id: "morning_10am", label: "Mid-morning crash", sub: "9:00 – 11:30 AM" },
  { id: "afternoon_2pm", label: "Afternoon slump", sub: "1:00 – 3:30 PM" },
  { id: "evening_5pm", label: "Late-afternoon drain", sub: "4:00 – 6:30 PM" },
  { id: "wired_11pm", label: "Tired all day, wired at night", sub: "10:00 PM – 1:00 AM" },
  { id: "wake_3am", label: "Waking wide awake early", sub: "3:00 – 4:30 AM" },
];

export default function FatigueDiagnosticClient() {
  const [timing, setTiming] = useState<CrashTiming>("afternoon_2pm");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [firstCoffee, setFirstCoffee] = useState<FirstCoffeeTiming>("immediate");
  const [afternoonCaffeine, setAfternoonCaffeine] = useState<AfternoonCaffeine>("early");
  const [shareCopied, setShareCopied] = useState(false);

  const wakeMin = toMinutes(wakeTime || "07:00");
  const lightStart = formatClock(wakeMin + 15);
  const delayedCoffee = formatClock(wakeMin + 90);
  const dipStart = formatClock(wakeMin + 420);
  const dipEnd = formatClock(wakeMin + 510);
  const bedTarget = formatClock(wakeMin - 465); // 5 x 90m cycles + 15m latency
  const avgCutoff = formatClock(wakeMin - 465 - 330); // ~5.5h before bed for average cup

  const diagnose = () => {
    if (timing === "morning_10am") {
      if (firstCoffee === "immediate") {
        return {
          title: "Cortisol Awakening Blunting + Trapped Adenosine",
          badge: "Early Caffeine Crash",
          explanation:
            "Drinking coffee within 30 minutes of waking sits right on top of your natural Cortisol Awakening Response (CAR) while residual sleep-inertia adenosine is still high. Around 9:30–11:00 AM, as that first caffeine spike fades, the trapped adenosine floods your receptors all at once.",
          actionNow:
            "Drink 500 mL of water, step outside for 5–10 minutes of daylight, and avoid adding a panic espresso—let the residual adenosine clear naturally.",
          fixTomorrow: `Wait until ${delayedCoffee} (90 minutes after waking at ${formatClock(wakeMin)}) for your first cup, and step into outdoor light at ${lightStart}.`,
          guideHref: "/blog/why-am-i-tired-at-10am",
          guideLabel: "Why Am I Tired at 10 AM?",
        };
      }
      return {
        title: "Ultradian BRAC Trough or Breakfast Glucose Spike",
        badge: "90-Min Cycle Dip",
        explanation:
          "Without immediate coffee on board, a 10–11:30 AM crash usually points to either the trough of your first 90-minute Basic Rest-Activity Cycle (BRAC) or reactive hypoglycemia from a fast-carb breakfast (pastry, juice, sweetened cereal).",
        actionNow:
          "Stand up from your screen for 10 minutes, hydrate, and switch from heavy focus to light admin until the next 90-minute focus crest arrives.",
        fixTomorrow: `Anchor breakfast with 30g+ protein + fiber, and get 20 minutes of bright outdoor light around ${lightStart} to strengthen morning alertness.`,
        guideHref: "/blog/why-do-i-crash-at-11am",
        guideLabel: "Why Do I Crash at 11 AM?",
      };
    }

    if (timing === "afternoon_2pm") {
      return {
        title: "Borbély Two-Process Midday Circadian Dip",
        badge: "Endogenous Dip",
        explanation: `Roughly 7 to 8.5 hours after waking (${dipStart}–${dipEnd}), homeostatic sleep pressure (adenosine) overlaps with a temporary dip in your suprachiasmatic nucleus's alerting signal. It happens even when you skip lunch—heavy lunches only amplify it.`,
        actionNow:
          afternoonCaffeine === "late"
            ? "Skip afternoon caffeine—drinking coffee now leaves sleep-disrupting milligrams circulating at bedtime. Take a 12-minute brisk outdoor walk or a 15–20 minute rest (NSDR)."
            : "Step outside for a 15-minute walk or take an alarm-capped 20-minute power nap / NSDR session instead of forcing deep analytical work.",
        fixTomorrow: `Protect ${dipStart}–${dipEnd} for lighter tasks, eat a lower-glycemic lunch, and keep your last coffee before ${avgCutoff}.`,
        guideHref: "/blog/why-am-i-so-tired-at-1pm",
        guideLabel: "Why Am I So Tired at 1 PM?",
      };
    }

    if (timing === "evening_5pm") {
      return {
        title: "Evening Cortisol Cliff Unmasking Sleep Debt",
        badge: "Sympathetic Drop",
        explanation:
          "Stress hormones and workday momentum keep alertness artificially elevated until late afternoon. The moment work stops around 5 PM, sympathetic tone drops sharply—exposing the cumulative sleep debt and residual adenosine built up since morning.",
        actionNow:
          "Do not drink caffeine this late (even a small cup can linger past bedtime). Splash cold water on your face or take a 15-minute walk outside to transition cleanly into evening.",
        fixTomorrow: `Aim for lights out near ${bedTarget} (7.5h sleep across five 90-min cycles before ${formatClock(wakeMin)}) and keep caffeine strictly before ${avgCutoff}.`,
        guideHref: "/blog/why-am-i-sleepy-at-5pm",
        guideLabel: "Why Am I Sleepy at 5 PM?",
      };
    }

    if (timing === "wired_11pm") {
      return {
        title: "Wake Maintenance Zone + Melatonin Suppression",
        badge: "Phase Delay / Second Wind",
        explanation:
          "In the two hours before your biological bedtime, your circadian system fires a final burst of alerting drive (the Wake Maintenance Zone). Combine that with overhead LEDs, phone screens (460–480 nm blue light), or late caffeine, and pineal melatonin gets delayed by up to 90 minutes.",
        actionNow:
          "Drop overhead lighting below 50 lux right now, put screens on the charger outside arms' reach, and switch to low-dopamine winding down (paper book or warm shower).",
        fixTomorrow: `Get 20 minutes of outdoor light right at ${lightStart} to anchor tomorrow's melatonin timer, and cut all caffeine by ${avgCutoff}.`,
        guideHref: "/blog/tired-all-day-wired-at-night-11pm",
        guideLabel: "Tired All Day, Wired at 11 PM",
      };
    }

    // wake_3am
    return {
      title:
        afternoonCaffeine === "late"
          ? "Residual Bedtime Caffeine (>50 mg) + Pre-Dawn Cortisol Surge"
          : "REM Architecture Fragility & Pre-Dawn Cortisol Pulse",
      badge: "3–4 AM Awakening",
      explanation:
        afternoonCaffeine === "late"
          ? "Late-afternoon caffeine may not stop you from falling asleep, but >50 mg circulating at bedtime suppresses deep slow-wave sleep and fragments the lighter REM cycles between 3:00 and 4:30 AM—right as early-morning cortisol begins to rise."
          : "Around 3:00–4:30 AM, sleep pressure has mostly cleared, REM sleep dominates, and your HPA axis begins ramping cortisol toward morning. Warm bedroom air, late alcohol, or evening screen stress turns this transition into a full wake-up.",
      actionNow:
        "Do NOT check the clock or pick up your bright phone (that triggers morning melanopsin signals). Stay in dim quiet or move to another dim chair until drowsy again.",
      fixTomorrow: `Set a strict caffeine cutoff at ${avgCutoff}, finish dinner 3 hours before ${bedTarget}, and cool your bedroom to ~65–68°F (18–20°C).`,
      guideHref: "/blog/waking-up-at-4am-and-cant-fall-back-asleep",
      guideLabel: "Waking Up at 4 AM Early",
    };
  };

  const result = diagnose();

  const shareResult = () => {
    const shareUrl = "https://arccircadian.com/tools/fatigue-diagnostic";
    const summaryText = `My ARC Fatigue Diagnosis: ${result.title}. Fix: Morning light at ${lightStart}, first coffee at ${delayedCoffee}, cutoff at ${avgCutoff}.`;
    trackShareResult("fatigue_diagnostic", result.title);

    if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
      navigator
        .share({ title: "ARC Fatigue Diagnostic", text: summaryText, url: shareUrl })
        .catch(() => {});
      return;
    }

    navigator.clipboard
      .writeText(`${summaryText} Run yours: ${shareUrl}`)
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
          Why Am I <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Tired Right Now?</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          30-second circadian diagnostic: pick when your energy drops, when you woke up, and your coffee timing to see the likely biological mechanism—and the one thing worth doing next.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl space-y-8">
        <div>
          <p className="block text-xs font-bold text-accent uppercase tracking-wider mb-3 font-mono">
            1. When are you feeling tired or wired?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {CRASH_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTiming(opt.id)}
                aria-pressed={timing === opt.id}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  timing === opt.id
                    ? "bg-accent text-black border-accent"
                    : "bg-white/5 border-white/10 text-white hover:border-white/25"
                }`}
              >
                <div className="text-sm font-bold leading-snug">{opt.label}</div>
                <div
                  className={`text-xs font-mono mt-0.5 ${
                    timing === opt.id ? "text-black/75" : "text-(--fg-muted)"
                  }`}
                >
                  {opt.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 pt-6 border-t border-white/10">
          <div>
            <label
              htmlFor="diag-wake-time"
              className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono"
            >
              2. Wake time today
            </label>
            <input
              id="diag-wake-time"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full sunken-card p-3.5 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <p className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
              3. First coffee
            </p>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { id: "immediate", label: "< 30m after wake" },
                { id: "delayed", label: "90m+ after wake" },
                { id: "none", label: "No coffee today" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFirstCoffee(item.id as FirstCoffeeTiming)}
                  className={`w-full px-3 py-2 rounded-xl text-left font-bold transition-colors cursor-pointer ${
                    firstCoffee === item.id
                      ? "bg-accent text-black"
                      : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
              4. Afternoon caffeine
            </p>
            <div className="space-y-1.5 font-mono text-xs">
              {[
                { id: "none", label: "None after noon" },
                { id: "early", label: "12:00 – 2:00 PM" },
                { id: "late", label: "After 2:00 PM" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setAfternoonCaffeine(item.id as AfternoonCaffeine)}
                  className={`w-full px-3 py-2 rounded-xl text-left font-bold transition-colors cursor-pointer ${
                    afternoonCaffeine === item.id
                      ? "bg-accent text-black"
                      : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Diagnosis Output */}
        <div
          className="sunken-card border border-(--accent)/30 p-6 sm:p-8 relative overflow-hidden"
          aria-live="polite"
          data-nosnippet
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-60" />

          <span className="inline-block px-3 py-1 rounded-full bg-accent/15 text-accent text-[11px] font-mono font-bold uppercase tracking-widest mb-3">
            {result.badge}
          </span>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            {result.title}
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6">
            {result.explanation}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                One thing to do right now
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {result.actionNow}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent mb-1">
                How to prevent it tomorrow
              </div>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                {result.fixTomorrow}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono text-xs mb-6">
            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
              <div className="text-[10px] text-(--fg-muted) uppercase">Morning Light</div>
              <div className="text-white font-bold mt-0.5">{lightStart}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
              <div className="text-[10px] text-(--fg-muted) uppercase">First Coffee</div>
              <div className="text-accent font-bold mt-0.5">{delayedCoffee}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
              <div className="text-[10px] text-(--fg-muted) uppercase">Expected Dip</div>
              <div className="text-amber-300 font-bold mt-0.5">{dipStart}</div>
            </div>
            <div className="p-2.5 rounded-xl bg-black/30 border border-white/5">
              <div className="text-[10px] text-(--fg-muted) uppercase">Coffee Cutoff</div>
              <div className="text-emerald-400 font-bold mt-0.5">{avgCutoff}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
            <Link
              href={result.guideHref}
              className="text-xs font-mono font-bold text-accent hover:underline"
            >
              Read the deep-dive: {result.guideLabel} →
            </Link>
            <button
              type="button"
              onClick={shareResult}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-white transition-colors cursor-pointer"
            >
              {shareCopied ? "✓ Copied diagnosis" : "Share my diagnosis →"}
            </button>
          </div>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-3 text-accent">
          Get this answer automatically—plus a 10-day proof check.
        </h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          ARC tells you in one sentence why you feel the way you do right now, recalibrates your coffee cutoff with every drink, and measures after ~10 days of one-tap check-ins whether your crashes are actually dropping.
        </p>
        <AppStoreButton
          size="lg"
          location="tool_fatigue_diagnostic"
          qrHeadline={`Fix your ${result.badge.toLowerCase()} in ARC`}
          qrSubtitle={`Scan with your iPhone to put your ${lightStart} light timer, ${delayedCoffee} coffee anchor, and ${avgCutoff} cutoff on your Lock Screen.`}
        />
      </div>
    </main>
  );
}
