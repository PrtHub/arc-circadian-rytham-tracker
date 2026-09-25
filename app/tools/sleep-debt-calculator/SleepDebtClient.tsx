"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { EducationalNote } from "../_components/tool-extras";

const NIGHT_LABELS = ["5 nights ago", "4 nights ago", "3 nights ago", "2 nights ago", "Last night"];

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const roundTenth = (value: number) => Math.round(value * 10) / 10;

export default function SleepDebtClient() {
  const [neededSleep, setNeededSleep] = useState(8);
  const [actualSleep, setActualSleep] = useState([7, 6, 7, 5, 6]); // Oldest night first

  // Need is clamped to a plausible 4-12 h so a cleared or odd entry can't produce nonsense.
  const need = clamp(neededSleep || 0, 4, 12);
  const totalActual = actualSleep.reduce((sum, h) => sum + clamp(h || 0, 0, 24), 0);
  const debt = roundTenth(need * actualSleep.length - totalActual);
  const perNight = roundTenth(debt / actualSleep.length);

  const getAdvice = () => {
    if (debt <= 0) return "No sleep debt over these five nights.";
    if (debt <= 5) {
      return `That's about ${perNight} h a night short. Try adding 30-60 minutes tonight by going to bed earlier, and keep your weekend wake time close to your weekday one.`;
    }
    return `That's about ${perNight} h a night short. Short nights add up, and attention and mood usually feel it first. Keep your wake time steady and go to bed a little earlier for a few nights rather than sleeping in.`;
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Sleep <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Debt</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Sleep debt adds up. If you need 8 hours but only get 6, you&apos;re 2 hours short. Calculate your total over the last five nights.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="mb-8">
          <label htmlFor="sleep-need" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">How many hours do you need to feel fully rested?</label>
          <input
            id="sleep-need"
            type="number"
            value={neededSleep}
            onChange={(e) => setNeededSleep(Number(e.target.value))}
            className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors font-mono"
            min="4"
            max="12"
            step="0.5"
          />
          {need !== neededSleep && (
            <p className="text-[11px] text-(--fg-muted) mt-2">Using {need} h (the calculator accepts 4 to 12 hours).</p>
          )}
        </div>

        <fieldset className="space-y-4 mb-8">
          <legend className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">How many hours did you actually sleep over the last 5 nights?</legend>
          <div className="grid grid-cols-5 gap-3">
            {actualSleep.map((val, i) => (
              <div key={NIGHT_LABELS[i]}>
                <label htmlFor={`sleep-night-${i}`} className="text-[11px] text-(--fg-muted) block mb-1 text-center font-mono">{NIGHT_LABELS[i]}</label>
                <input
                  id={`sleep-night-${i}`}
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const newSleep = [...actualSleep];
                    newSleep[i] = Number(e.target.value);
                    setActualSleep(newSleep);
                  }}
                  className="w-full sunken-card p-3 text-white text-center focus:outline-none focus:border-accent/50 transition-colors font-mono"
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
            ))}
          </div>
        </fieldset>

        <div className="sunken-card border border-white/10 p-8 text-center relative overflow-hidden" aria-live="polite">
          <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-2 font-mono">Your Total Sleep Debt</p>
          <div className={`text-5xl sm:text-6xl font-black mb-2 font-mono ${debt > 0 ? 'text-(--aura-sun)' : 'text-accent'}`}>
            {debt > 0 ? `${debt} hours` : "0 hours"}
          </div>
          <p className="text-(--fg-muted) text-sm max-w-sm mx-auto leading-relaxed">
            {getAdvice()}
          </p>
        </div>

        <EducationalNote />
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Let ARC track the debt for you</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed text-sm">
          Log last night&apos;s sleep in one tap and ARC tracks a real sleep debt against your own target. When it builds up, ARC switches to a recovery plan for up to three days, changing your daily sentence, your one ask and your caffeine cutoff.
        </p>
        <AppStoreButton size="lg" location="tool_sleep_debt_calculator" />
      </div>
    </main>
  );
}
