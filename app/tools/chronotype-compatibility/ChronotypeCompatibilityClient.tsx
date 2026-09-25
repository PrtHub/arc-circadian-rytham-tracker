"use client";

import { useState } from "react";
import Link from "next/link";
import { AppStoreButton } from "@/components/AppStoreButton";
import { formatClock } from "@/lib/time";

const CHRONOTYPES = [
  { slug: "lion", name: "Lion", icon: "🦁", tag: "Early Riser" },
  { slug: "bear", name: "Bear", icon: "🐻", tag: "Solar Rhythm" },
  { slug: "wolf", name: "Wolf", icon: "🐺", tag: "Night Owl" },
  { slug: "dolphin", name: "Dolphin", icon: "🐬", tag: "Light Sleeper" },
];

// Typical times (minutes after midnight) in Breus's model, matching the site's chronotype pages.
const SCHEDULES: Record<string, { wake: number; windDown: number; bed: number }> = {
  lion: { wake: 6 * 60, windDown: 20.5 * 60, bed: 22 * 60 },
  bear: { wake: 7 * 60, windDown: 21.5 * 60, bed: 23 * 60 },
  wolf: { wake: 8.75 * 60, windDown: 23 * 60, bed: 24.5 * 60 },
  dolphin: { wake: 6.5 * 60, windDown: 22 * 60, bed: 23.5 * 60 },
};

const TIMELINE_HOURS = Array.from({ length: 16 }, (_, i) => i + 8); // 8 AM to 11 PM

// Awake and past morning grogginess (an hour after waking), and not yet winding down.
const isAwakeHour = (slug: string, hour: number) => {
  const s = SCHEDULES[slug];
  return hour * 60 >= s.wake + 60 && (hour + 1) * 60 <= s.windDown;
};

const formatGap = (mins: number) => {
  if (mins === 0) return "About the same";
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return [h ? `${h} h` : "", m ? `${m} min` : ""].filter(Boolean).join(" ");
};

const PAIRING_NOTES: Record<string, Record<string, {
  strengths: string[];
  challenges: string[];
  advice: string;
}>> = {
  bear: {
    bear: {
      strengths: ["Naturally synchronized routines", "Similar wake and sleep times", "Stable shared rhythm"],
      challenges: ["Shared afternoon dip around 2-3 PM"],
      advice: "You're closely synchronized. Protect your routine from weekend social jetlag, and use the afternoon dip for a walk together rather than another coffee.",
    },
    dolphin: {
      strengths: ["Bear's steady schedule gives the household a stable rhythm", "Overlapping alert hours in the afternoon"],
      challenges: ["Dolphin's lighter sleep vs Bear's normal household noise"],
      advice: "Blackout shades and a sound machine help the Dolphin through the lighter parts of the night, and a quiet morning routine helps too.",
    },
    lion: {
      strengths: ["Strong morning and midday overlap", "Bedtimes only about an hour apart"],
      challenges: ["Lion's earlier bedtime vs Bear's ~11 PM bedtime", "Afternoon dips land at slightly different times"],
      advice: "Respect the Lion's early bedtime. The Bear can use the last hour of the evening for low-light reading or solo tasks.",
    },
    wolf: {
      strengths: ["Good overlap from late afternoon into the evening", "Bear's steady schedule can anchor the Wolf"],
      challenges: ["Wolf's slow mornings vs Bear's peak work hours", "Bedtime gap (about 11 PM vs 12:30 AM)"],
      advice: "Use the late afternoon and early evening (4 PM - 8 PM) for time together. Wolves should keep lighting low late at night so the Bear can fall asleep.",
    },
  },
  dolphin: {
    dolphin: {
      strengths: ["Shared understanding of light sleep", "Similar need for a quiet, dark room"],
      challenges: ["Both wake easily", "If one wakes in the night, the other often does too"],
      advice: "Keep the room dark, quiet and cool. Separate blankets, or two mattresses pushed together, reduce movement transfer. Keeping devices out of the bedroom helps both of you wind down.",
    },
    lion: {
      strengths: ["Similar early wake times", "Dolphin's afternoon focus fits around Lion's mornings"],
      challenges: ["Lion's early alarm can land in Dolphin's lightest sleep", "Lion fades early while Dolphin's evenings can be restless"],
      advice: "Lion's early alarm lands in Dolphin's lightest sleep, so use a vibrating alarm and a quiet morning routine. Separate blankets (the Scandinavian sleep method) cut movement transfer.",
    },
    wolf: {
      strengths: ["Quiet evening focus hours", "Late afternoon alertness overlap"],
      challenges: ["Both can find it hard to switch off at night", "Dolphin's light sleep vs Wolf's later bedtime"],
      advice: "Agree on a shared wind-down time with dim lights. Late-night screens and intense conversations keep both of you up: evening light pushes the Wolf's clock later, and the Dolphin wakes easily once alert.",
    },
  },
  lion: {
    lion: {
      strengths: ["Matched bedtimes", "Joint morning activities", "Shared morning momentum"],
      challenges: ["Both fade in the late afternoon", "Late evening social plans are hard for both"],
      advice: "Enjoy your morning momentum together. Plan workouts or focused work before lunch, and start winding down together by about 8:30 PM.",
    },
    wolf: {
      strengths: ["Wolf gets quiet mornings to sleep", "Lion gets quiet evenings to sleep", "Plenty of independent focus time"],
      challenges: ["Opposing schedules (early bird vs night owl)", "Fewer shared awake hours in the morning and late evening"],
      advice: "Protect the Lion's early sleep window with white noise and low lights. The Lion should keep mornings quiet so the Wolf can sleep in.",
    },
  },
  wolf: {
    wolf: {
      strengths: ["Matched late bedtimes", "Shared evening energy", "No morning pressure on each other"],
      challenges: ["Slow mornings for both", "Schedules can drift later together"],
      advice: "Enjoy your evenings, but set a firm wake-up time and get outdoor light in the morning so your schedules don't drift later.",
    },
  },
};

export default function ChronotypeCompatibilityClient() {
  const [partnerA, setPartnerA] = useState("bear");
  const [partnerB, setPartnerB] = useState("wolf");

  const [p1, p2] = [partnerA, partnerB].sort();
  const notes = PAIRING_NOTES[p1]?.[p2];

  const a = SCHEDULES[partnerA];
  const b = SCHEDULES[partnerB];
  const bedGap = Math.abs(a.bed - b.bed);
  const wakeGap = Math.abs(a.wake - b.wake);
  const sharedHours = TIMELINE_HOURS.filter((h) => isAwakeHour(partnerA, h) && isAwakeHour(partnerB, h));

  const typeA = CHRONOTYPES.find((c) => c.slug === partnerA)!;
  const typeB = CHRONOTYPES.find((c) => c.slug === partnerB)!;

  const renderPicker = (label: string, id: string, value: string, onChange: (slug: string) => void) => (
    <div>
      <p id={id} className="block text-xs font-bold text-accent uppercase tracking-wider mb-3 font-mono">{label}</p>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-labelledby={id}>
        {CHRONOTYPES.map((c) => (
          <button
            key={`${id}-${c.slug}`}
            type="button"
            role="radio"
            aria-checked={value === c.slug}
            onClick={() => onChange(c.slug)}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              value === c.slug
                ? "border-accent bg-(--accent)/15 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "border-white/5 bg-white/5 hover:border-white/15 text-(--fg-muted)"
            }`}
          >
            <span className="text-2xl mb-1" aria-hidden="true">{c.icon}</span>
            <div>
              <span className="font-bold text-sm block text-white">{c.name}</span>
              <span className="text-[10px] opacity-60 font-mono">{c.tag}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Chronotype <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Compatibility</span> Quiz
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Pick both of your chronotypes to see how far apart your usual bed and wake times are, and which hours you&apos;re both typically awake.
        </p>
        <p className="text-sm mt-3">
          <Link href="/tools/chronotype-quiz" className="text-accent font-semibold hover:underline">
            Not sure of your type? Take the 8-question chronotype quiz →
          </Link>
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          {renderPicker("Partner A Chronotype", "partner-a-label", partnerA, setPartnerA)}
          {renderPicker("Partner B Chronotype", "partner-b-label", partnerB, setPartnerB)}
        </div>

        {/* Results Panel */}
        <div className="sunken-card border border-(--accent)/30 p-6 sm:p-8 relative overflow-hidden mb-8" aria-live="polite">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-50"></div>

          <div className="border-b border-white/5 pb-6 mb-6">
            <span className="font-bold text-white block mb-4">
              {typeA.name} &amp; {typeB.name}
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
              <div>
                <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-1">Typical bedtime gap</p>
                <p className="text-2xl sm:text-3xl font-black text-accent">{formatGap(bedGap)}</p>
                <p className="text-[11px] text-(--fg-muted)">{formatClock(a.bed)} vs {formatClock(b.bed)}</p>
              </div>
              <div>
                <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-1">Typical wake gap</p>
                <p className="text-2xl sm:text-3xl font-black text-accent">{formatGap(wakeGap)}</p>
                <p className="text-[11px] text-(--fg-muted)">{formatClock(a.wake)} vs {formatClock(b.wake)}</p>
              </div>
              <div>
                <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-1">Shared awake hours</p>
                <p className="text-2xl sm:text-3xl font-black text-accent">{sharedHours.length} h</p>
                <p className="text-[11px] text-(--fg-muted)">between 8 AM and 11 PM</p>
              </div>
            </div>
            <p className="text-(--fg-muted) text-xs mt-4 leading-relaxed">
              Based on typical wake and bed times for each chronotype. A starting point for planning, not a verdict on your relationship.
            </p>
          </div>

          {notes && (
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="raised-card p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-green-400 mb-2 font-mono">🟢 Strengths</h4>
                <ul className="space-y-1.5 text-white text-xs list-disc list-inside">
                  {notes.strengths.map((str) => (
                    <li key={str}>{str}</li>
                  ))}
                </ul>
              </div>
              <div className="raised-card p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-2 font-mono">🟠 Friction points</h4>
                <ul className="space-y-1.5 text-white text-xs list-disc list-inside">
                  {notes.challenges.map((ch) => (
                    <li key={ch}>{ch}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Shared awake-hours timeline */}
          <div className="border-t border-white/5 pt-6 mb-6">
            <span className="text-accent text-xs font-bold uppercase tracking-wider block mb-3 font-mono">Shared Awake Hours (8 AM - 11 PM)</span>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5 font-mono">
              {TIMELINE_HOURS.map((hour) => {
                const isOverlapping = sharedHours.includes(hour);
                const displayHour = hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`;
                return (
                  <div
                    key={hour}
                    className={`p-2 rounded-xl text-center transition-all ${
                      isOverlapping
                        ? "bg-(--accent)/20 border border-(--accent)/50 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                        : "bg-white/5 border border-white/5 text-(--fg-muted) opacity-50"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block">{displayHour.split(" ")[0]}</span>
                    <span className="text-[8px] uppercase font-bold block opacity-70">{displayHour.split(" ")[1]}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-(--fg-muted) mt-2.5 leading-relaxed font-mono">
              💡 Highlighted hours: both of you are typically awake, past morning grogginess, and not yet winding down.
            </p>
          </div>

          {notes && (
            <div className="border-t border-white/5 pt-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2 font-mono">🏠 Sharing a Bedroom</h4>
              <p className="text-xs text-(--fg-muted) leading-relaxed font-medium">{notes.advice}</p>
            </div>
          )}

          <div className="border-t border-white/5 pt-6 mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-mono">
            <Link href={`/chronotype/${typeA.slug}`} className="text-accent hover:underline">Read about the {typeA.name} →</Link>
            {typeB.slug !== typeA.slug && (
              <Link href={`/chronotype/${typeB.slug}`} className="text-accent hover:underline">Read about the {typeB.name} →</Link>
            )}
          </div>
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-accent">Know your own clock first</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto">
          ARC is a personal app: one iPhone, no account. Each of you can set your own chronotype and get a day plan built around it. After about 10 days of one-tap energy check-ins, ARC measures when your afternoon dip really lands, so you know which hours you actually have for each other.
        </p>
        <AppStoreButton size="lg" location="tool_chronotype_compatibility" />
      </div>
    </main>
  );
}
