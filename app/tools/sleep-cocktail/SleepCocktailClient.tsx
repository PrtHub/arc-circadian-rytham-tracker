"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";

interface StackItem {
  name: string;
  dosage: string;
  mechanism: string;
  timing: string;
  warning?: string;
}

const ISSUE_OPTIONS = [
  { key: "fallingAsleep", label: "Difficulty Falling Asleep", desc: "Taking >30 minutes to drift off" },
  { key: "wakingMidNight", label: "Waking in Middle of Night", desc: "Waking up and struggling to fall back asleep" },
  { key: "overactiveBrain", label: "Overactive Brain / Racing Mind", desc: "Thoughts running wild when head hits the pillow" },
  { key: "restlessness", label: "Restlessness & Muscle Tension", desc: "Tossing, turning, or physical discomfort" },
] as const;

export default function SleepCocktailClient() {
  const [issues, setIssues] = useState({
    fallingAsleep: false,
    wakingMidNight: false,
    overactiveBrain: false,
    restlessness: false,
  });

  const toggleIssue = (key: keyof typeof issues) => {
    setIssues((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasIssue = Object.values(issues).some(Boolean);

  const getStack = (): StackItem[] => {
    const stack: StackItem[] = [];
    if (!hasIssue) return stack;

    // Magnesium: threonate for a racing mind, bisglycinate otherwise.
    if (issues.overactiveBrain) {
      stack.push({
        name: "Magnesium L-Threonate",
        dosage: "~2,000 mg compound (≈144 mg elemental magnesium)",
        mechanism: "A form of magnesium that may reach the brain more readily; most of that evidence comes from animal studies. Some people find it helps them feel calmer at night.",
        timing: "30-60 minutes before bedtime",
      });
    } else {
      stack.push({
        name: "Magnesium Bisglycinate",
        dosage: "100-200 mg elemental magnesium",
        mechanism: "A well-absorbed, gentle form of magnesium. Magnesium is involved in nerve signalling and relaxation. Check the label for elemental magnesium; the adult upper limit for supplemental magnesium is 350 mg/day.",
        timing: "30-60 minutes before bedtime",
      });
    }

    if (issues.fallingAsleep || issues.overactiveBrain) {
      stack.push({
        name: "L-Theanine",
        dosage: "100-200 mg",
        mechanism: "An amino acid found in tea. Small studies suggest it may help some people feel calmer and quieten mental chatter.",
        timing: "30-60 minutes before bedtime",
        warning: "Some people report vivid dreams on L-theanine; skip it if you have a history of sleepwalking or night terrors.",
      });
    }

    if (issues.fallingAsleep || issues.wakingMidNight) {
      stack.push({
        name: "Apigenin",
        dosage: "50 mg",
        mechanism: "A compound found in chamomile. Early evidence suggests a mild calming effect that may make it easier to fall asleep; human data are limited.",
        timing: "30-60 minutes before bedtime",
      });
    }

    if (issues.wakingMidNight || issues.restlessness) {
      stack.push({
        name: "Myo-Inositol",
        dosage: "900 mg",
        mechanism: "A naturally occurring sugar-like compound. Huberman describes using it occasionally, not nightly, to help fall back asleep after waking; the evidence for sleep is thin.",
        timing: "30-60 minutes before bedtime, on occasional nights",
      });
    }

    return stack;
  };

  const activeStack = getStack();

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Huberman Sleep Cocktail <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Builder</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          See the doses Andrew Huberman has described for each compound, and what the evidence does and doesn&apos;t show.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Select your primary sleep issues:</h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {ISSUE_OPTIONS.map((item) => (
            <button
              key={item.key}
              type="button"
              role="checkbox"
              aria-checked={issues[item.key]}
              onClick={() => toggleIssue(item.key)}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${issues[item.key]
                ? "border-(--accent) bg-(--accent)/10 text-white shadow-[0_0_15px_rgba(204,255,0,0.1)]"
                : "border-white/5 bg-white/5 hover:border-white/15 text-(--fg-muted)"
                }`}
            >
              <div className="mt-1">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${issues[item.key]
                  ? "border-(--accent) bg-accent"
                  : "border-white/20 bg-transparent"
                  }`}>
                  {issues[item.key] && (
                    <svg className="w-3.5 h-3.5 text-black stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="font-bold text-base block text-white">{item.label}</span>
                <span className="text-xs text-(--fg-muted) mt-1 block leading-relaxed">{item.desc}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="sunken-card border border-(--accent)/30 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-50"></div>

          {/* Safety notice sits above the results, at readable size. */}
          <div role="note" className="bg-amber-950/30 border border-(--aura-sun)/40 rounded-xl p-4 sm:p-5 mb-8 flex items-start gap-3">
            <span className="text-(--aura-sun) text-lg" aria-hidden="true">⚠️</span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-amber-200 mb-1">Educational only, not medical advice</h3>
              <p className="text-sm text-amber-100/90 leading-relaxed">
                Talk to your doctor or pharmacist before taking any supplement, especially if you are pregnant or breastfeeding, under 18, have kidney disease, or take medication (sedatives, blood-pressure or blood-thinning drugs, antidepressants, lithium). Don&apos;t give these to children without medical advice. The doses below are within commonly cited ranges, not a prescription. Try one compound at a time.
              </p>
            </div>
          </div>

          <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-6 font-mono">Doses as Huberman describes them</h3>

          {activeStack.length === 0 ? (
            <p className="text-sm text-(--fg-muted) leading-relaxed mb-8">
              Pick at least one issue above to see which compounds are commonly discussed for it.
            </p>
          ) : (
            <div className="space-y-6 mb-8">
              {activeStack.map((item) => (
                <div key={item.name} className="border-b border-white/5 last:border-b-0 pb-6 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent"></span>
                      {item.name}
                    </h4>
                    <span className="text-xs font-mono font-bold bg-(--accent)/15 text-accent px-2.5 py-1 rounded-md self-start border border-(--accent)/20">
                      {item.dosage}
                    </span>
                  </div>
                  <p className="text-sm text-(--fg-muted) leading-relaxed mb-1">{item.mechanism}</p>
                  <p className="text-xs text-white/70 font-mono">🕒 Timing: {item.timing}</p>

                  {item.warning && (
                    <div className="mt-3 p-3 bg-red-950/20 border border-(--aura-crash)/30 rounded-xl flex items-start gap-2.5">
                      <span className="text-(--aura-crash) text-sm" aria-hidden="true">⚠️</span>
                      <span className="text-xs text-red-300 leading-relaxed font-medium">{item.warning}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-(--fg-muted) font-mono">
            <span>💡 Try one compound at a time for a week and stop if it doesn&apos;t help. Most people shouldn&apos;t need these every night.</span>
            <span className="font-bold text-accent uppercase tracking-wider shrink-0">Doses as commonly discussed</span>
          </div>
        </div>
      </div>

      <div className="raised-card p-6 sm:p-8 mb-12">
        <h3 className="text-lg font-bold text-white mb-3">🕒 Light and Timing Come First</h3>
        <p className="text-(--fg-muted) text-sm leading-relaxed mb-4">
          Supplements matter far less than light and timing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-(--fg-muted)">
          <div className="sunken-card p-4 border border-white/5">
            <h4 className="font-bold text-white mb-1">Morning Light</h4>
            <p className="leading-relaxed">Get outside for about 20 minutes within an hour of waking (longer under heavy cloud). Look toward the sky, never directly at the sun. Morning daylight helps time tonight&apos;s melatonin release.</p>
          </div>
          <div className="sunken-card p-4 border border-white/5">
            <h4 className="font-bold text-white mb-1">Evening Dimming</h4>
            <p className="leading-relaxed">Bright light in the evening can delay melatonin, so dim lights and screens in the last hour or two before bed.</p>
          </div>
        </div>
      </div>

      <div className="raised-card p-8 text-center mb-12 border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Get the timing right first</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          ARC doesn&apos;t track supplements. It handles the timing that matters more: a caffeine cutoff computed from every drink you log, a 20-minute morning-light timer on your Lock Screen, and a wind-down reminder before your bedtime.
        </p>
        <AppStoreButton size="lg" location="tool_sleep_cocktail" />
      </div>
    </main>
  );
}
