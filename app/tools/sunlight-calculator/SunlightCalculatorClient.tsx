"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { EducationalNote } from "../_components/tool-extras";

// Anchored on ARC's 20-minute morning light timer; dimmer skies need longer.
const DURATIONS: Record<string, string> = {
  sunny: "20",
  cloudy: "20-30",
  overcast: "30+",
};

const GOAL_NOTES: Record<string, string> = {
  alertness: "Within an hour of waking is ideal.",
  earlier: "Go out as soon as you can after waking, at about the same time every day. Consistency matters more than extra minutes.",
};

export default function SunlightCalculatorClient() {
  const [weather, setWeather] = useState("sunny");
  const [goal, setGoal] = useState("alertness");

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Morning <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Sunlight</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Andrew Huberman often stresses getting morning sunlight. But how long do you actually need to be outside? Pick today&apos;s weather to see your time.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="sun-weather" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Today&apos;s Weather</label>
            <select
              id="sun-weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none font-mono"
            >
              <option value="sunny">Bright &amp; Sunny (~10,000+ lux)</option>
              <option value="cloudy">Partly Cloudy (~5,000 lux)</option>
              <option value="overcast">Heavy Overcast (~1,000 lux)</option>
            </select>
          </div>
          <div>
            <label htmlFor="sun-goal" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Your Primary Goal</label>
            <select
              id="sun-goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent/50 transition-colors appearance-none font-mono"
            >
              <option value="alertness">Morning Alertness</option>
              <option value="earlier">Shifting My Sleep Earlier</option>
            </select>
          </div>
        </div>

        <div className="sunken-card border border-(--accent)/30 p-8 text-center relative overflow-hidden" aria-live="polite">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-(--accent) to-transparent opacity-50"></div>
          <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-2 font-mono">Recommended Time Outside</p>
          <div className="text-5xl sm:text-6xl font-black text-accent mb-4 font-mono">
            {DURATIONS[weather]} Minutes
          </div>
          <p className="text-white text-sm max-w-sm mx-auto leading-relaxed mb-3">
            ARC&apos;s timer is 20 minutes; on dim days, stay out longer. {GOAL_NOTES[goal]}
          </p>
          <p className="text-(--fg-muted) text-sm max-w-sm mx-auto leading-relaxed">
            Indoors, even next to a window, light is usually many times dimmer than outside, so step outside. If it&apos;s still dark, turn on bright indoor lights and go out once the sun is up; a 10,000 lux light box is an option (check with a doctor first if you have an eye condition or bipolar disorder). Never look directly at the sun.
          </p>
        </div>

        <EducationalNote />
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-white">Automate Your Morning Light</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto text-sm leading-relaxed">
          ARC&apos;s 20-minute light timer starts from your real sunrise, worked out from your time zone (no location permission), and runs as a Live Activity on your Lock Screen and in the Dynamic Island. When it&apos;s still dark, it offers an indoor fallback.
        </p>
        <AppStoreButton size="lg" location="tool_sunlight_calculator" />
      </div>
    </main>
  );
}
