"use client";

import { useState } from "react";
import Link from "next/link";

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

  const getStack = () => {
    const stack = [];

    // Magnesium recommendation
    if (issues.overactiveBrain) {
      stack.push({
        name: "Magnesium L-Threonate",
        dosage: "140mg (elemental magnesium, approx. 2,000mg total)",
        mechanism: "Crosses the blood-brain barrier efficiently. Increases synapse density and enhances GABA levels, actively calming a racing mind.",
        timing: "30-60 minutes before bedtime",
      });
    } else if (issues.fallingAsleep || issues.restlessness || issues.wakingMidNight) {
      stack.push({
        name: "Magnesium Bisglycinate",
        dosage: "100mg - 200mg",
        mechanism: "Highly bioavailable form bound to glycine. Glycine acts as an inhibitory neurotransmitter in the brain, helping with physical relaxation and lowering core temperature.",
        timing: "30-60 minutes before bedtime",
      });
    } else {
      // Default baseline
      stack.push({
        name: "Magnesium L-Threonate or Bisglycinate",
        dosage: "140mg Threonate OR 100-200mg Bisglycinate",
        mechanism: "Acts as a baseline cofactor to activate the parasympathetic nervous system and support standard sleep architecture.",
        timing: "30-60 minutes before bedtime",
      });
    }

    // L-Theanine recommendation
    if (issues.fallingAsleep || issues.overactiveBrain) {
      stack.push({
        name: "L-Theanine",
        dosage: "100mg - 200mg",
        mechanism: "Promotes alpha brain wave production (associated with quiet, relaxed focus) and helps shut off excessive mental chatter.",
        timing: "30-60 minutes before bedtime",
        warning: "May cause vivid dreams or nightmares. Discontinue if sleep walking or night terrors occur.",
      });
    }

    // Apigenin recommendation
    if (issues.fallingAsleep || issues.wakingMidNight) {
      stack.push({
        name: "Apigenin",
        dosage: "50mg",
        mechanism: "An active compound derived from chamomile. Acts as a mild chloride-channel agonist, binding to GABA receptors to induce sleepiness and reduce latency.",
        timing: "30-60 minutes before bedtime",
      });
    }

    // Inositol recommendation
    if (issues.wakingMidNight || issues.restlessness) {
      stack.push({
        name: "Myo-Inositol",
        dosage: "900mg",
        mechanism: "Regulates calcium signaling in brain cells and balances serotonin and dopamine receptors, facilitating clean sleep-cycle transitions and reducing middle-of-the-night waking.",
        timing: "30-60 minutes before bedtime",
      });
    }

    return stack;
  };

  const activeStack = getStack();
  const hasTheanine = activeStack.some((item) => item.name === "L-Theanine");

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Sleep Cocktail <span className="text-[#CCFF00]">Builder</span>
        </h1>
        <p className="text-zinc-400 text-lg">
          Optimize the dosage, safety, and timing of science-backed sleep compounds. Build a personalized stack based on Stanford neurobiologist protocols.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <h2 className="text-xl font-bold text-white mb-6">Select your primary sleep issues:</h2>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { key: "fallingAsleep", label: "Difficulty Falling Asleep", desc: "Taking >30 minutes to drift off" },
            { key: "wakingMidNight", label: "Waking in Middle of Night", desc: "Waking up and struggling to fall back asleep" },
            { key: "overactiveBrain", label: "Overactive Brain / Racing Mind", desc: "Thoughts running wild when head hits the pillow" },
            { key: "restlessness", label: "Restlessness & Muscle Tension", desc: "Tossing, turning, or physical discomfort" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => toggleIssue(item.key as keyof typeof issues)}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${issues[item.key as keyof typeof issues]
                ? "border-[#CCFF00] bg-[#CCFF00]/5 text-white"
                : "border-white/5 bg-black hover:border-white/10 text-zinc-300"
                }`}
            >
              <div className="mt-1">
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${issues[item.key as keyof typeof issues]
                  ? "border-[#CCFF00] bg-[#CCFF00]"
                  : "border-zinc-600 bg-transparent"
                  }`}>
                  {issues[item.key as keyof typeof issues] && (
                    <svg className="w-3.5 h-3.5 text-black stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              <div>
                <span className="font-bold text-base block">{item.label}</span>
                <span className="text-xs text-zinc-500 mt-1 block leading-relaxed">{item.desc}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-black border border-[#CCFF00]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"></div>

          <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-6">Your Customized Sleep Stack</h3>

          <div className="space-y-6 mb-8">
            {activeStack.map((item) => (
              <div key={item.name} className="border-b border-white/5 last:border-b-0 pb-6 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CCFF00]"></span>
                    {item.name}
                  </h4>
                  <span className="text-xs font-mono font-bold bg-[#CCFF00]/10 text-[#CCFF00] px-2.5 py-1 rounded-md self-start">
                    {item.dosage}
                  </span>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed mb-1">{item.mechanism}</p>
                <p className="text-xs text-zinc-500 font-medium">🕒 Timing: {item.timing}</p>

                {item.warning && (
                  <div className="mt-3 p-3 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start gap-2.5">
                    <span className="text-red-400 text-sm">⚠️</span>
                    <span className="text-xs text-red-300 leading-relaxed font-medium">{item.warning}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {hasTheanine && (
            <div className="bg-amber-950/20 border border-amber-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
              <span className="text-amber-400 text-lg">⚠️</span>
              <div>
                <h5 className="text-sm font-bold text-amber-300 mb-1">L-Theanine Warning</h5>
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  L-Theanine increases GABA and alpha waves, which can trigger extremely intense, vivid dreams or nightmares. If you wake up startled or start sleepwalking, remove L-Theanine from your stack and continue with Magnesium and Apigenin only.
                </p>
              </div>
            </div>
          )}

          <div className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <span>💡 Protocol Tip: Take consistent doses every night.</span>
            <span className="font-bold text-[#CCFF00] uppercase tracking-wider">Science-backed dosages</span>
          </div>
        </div>
      </div>

      <div className="bg-[#111] border border-white/10 rounded-3xl p-6 sm:p-8 mb-12">
        <h3 className="text-lg font-bold text-white mb-3">🕒 Optimal Sleep Window Integration</h3>
        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
          Supplements are just the final 5% of sleep optimization. The primary drivers are light exposure and timing.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-xs text-zinc-500">
          <div className="bg-black/50 p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-zinc-300 mb-1">Morning Anchor</h4>
            <p className="leading-relaxed">Get bright sunlight in your eyes within 1 hour of waking to anchor your melatonin-release timer (which triggers ~15 hours later).</p>
          </div>
          <div className="bg-black/50 p-4 rounded-xl border border-white/5">
            <h4 className="font-bold text-zinc-300 mb-1">Digital Sunset</h4>
            <p className="leading-relaxed">Dim overhead lights and turn off screens or use blue-blockers 2 hours before bed. Bright screens block melatonin production immediately.</p>
          </div>
        </div>
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center mb-12">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Track your stack's efficiency</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          The ARC app features a Supplement Tracker that correlates your sleep cocktails with your deep sleep score. Log what you took, check sleep quality, and see what actually works.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>

      <div className="text-center max-w-xl mx-auto px-4">
        <p className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-wider">
          * Disclaimer: This builder is for educational purposes only. These statements have not been evaluated by the FDA. This product is not intended to diagnose, treat, cure, or prevent any disease. Always consult your doctor before starting any supplement protocol.
        </p>
      </div>
    </main>
  );
}
