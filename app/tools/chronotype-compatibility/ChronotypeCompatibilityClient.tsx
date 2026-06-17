"use client";

import { useState } from "react";
import Link from "next/link";

const CHRONOTYPES = [
  { slug: "lion", name: "Lion", icon: "🦁", tag: "Early Riser" },
  { slug: "bear", name: "Bear", icon: "🐻", tag: "Solar Rhythm" },
  { slug: "wolf", name: "Wolf", icon: "🐺", tag: "Night Owl" },
  { slug: "dolphin", name: "Dolphin", icon: "Dolphin", tag: "Light Sleeper" },
];

const COMPATIBILITY_DATA: Record<string, Record<string, {
  score: number;
  strengths: string[];
  challenges: string[];
  overlap: number[];
  advice: string;
}>> = {
  bear: {
    bear: {
      score: 95,
      strengths: ["Naturally synchronized routines", "Solar-aligned wake and sleep cycles", "Excellent stability"],
      challenges: ["Shared mid-afternoon energy slump at 2 PM"],
      overlap: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
      advice: "You are highly synchronized. Protect your routines from weekend 'social jetlag'. Plan active dates or social coffee walks during the 2 PM slump to boost energy.",
    },
    dolphin: {
      score: 70,
      strengths: ["Stable solar baseline", "Complementary alert windows in the afternoon"],
      challenges: ["Dolphin's sleep fragility vs Bear's standard noise level"],
      overlap: [10, 11, 12, 13, 14, 15, 16, 17, 18],
      advice: "Bears should introduce light-blocking window shades and sound machines to help the Dolphin protect their fragile sleep-wake transition.",
    },
    lion: {
      score: 80,
      strengths: ["Strong morning/midday alignment", "Healthy shared sleep windows"],
      challenges: ["Lion's early bedtime vs Bear's 11 PM bedtime", "Slight afternoon dip clash"],
      overlap: [9, 10, 11, 12, 13, 14],
      advice: "Respect the Lion's early bedtime. Bear can use the last 60-90 minutes of the day for low-stimulus reading or independent tasks.",
    },
    wolf: {
      score: 75,
      strengths: ["Complementary evening overlap", "Bear's stability anchors the Wolf"],
      challenges: ["Wolf's slow morning vs Bear's peak work hours", "Bedtime misalignment (11 PM vs 1 AM)"],
      overlap: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
      advice: "Use the late afternoon/early evening (4 PM - 8 PM) for quality connection time. Wolves should use quiet lighting in the late night.",
    },
  },
  dolphin: {
    dolphin: {
      score: 55,
      strengths: ["Deep empathy for sleep issues", "Similar need for high sleep hygiene"],
      challenges: ["Mutual sleep anxiety", "Light disturbance loops (if one wakes, both wake)"],
      overlap: [15, 16, 17, 18, 19],
      advice: "Prioritize strict sleep hygiene. Use separate beds or twin mattresses joined together. Zero devices in the bedroom to prevent triggering each other's insomnia.",
    },
    lion: {
      score: 45,
      strengths: ["Intellectual stimulation", "Dolphin fits afternoon alert windows"],
      challenges: ["Dolphin's light sleep vs Lion's early alarms", "High anxiety-energy clash"],
      overlap: [15, 16, 17, 18, 19],
      advice: "Dolphins are extremely light sleepers. Lions must practice silent morning routines. Consider separate blankets (Scandinavian sleep method) to minimize movement transfer.",
    },
    wolf: {
      score: 50,
      strengths: ["Quiet evening focus hours", "Late afternoon alertness alignment"],
      challenges: ["Insomnia feedback loop", "Fragile sleep cycles vs irregular bedtime hours"],
      overlap: [15, 16, 17, 18, 19, 20],
      advice: "Establish a consistent 'digital sunset' together. Avoid late-night intense discussions or screen exposure, which trigger Dolphin insomnia and Wolf sleep delays.",
    },
  },
  lion: {
    lion: {
      score: 90,
      strengths: ["Perfect bedtime alignment", "Joint morning activities", "Highly active morning synergy"],
      challenges: ["Late-afternoon group crash", "Zero interest in evening social events"],
      overlap: [8, 9, 10, 11, 12],
      advice: "Enjoy your morning momentum together. Plan workouts or deep focus before lunch. Schedule evening downtime by 8:30 PM to wind down together.",
    },
    wolf: {
      score: 60,
      strengths: ["Wolf gets quiet mornings to sleep", "Lion gets quiet evenings for sleep", "High independent focus time"],
      challenges: ["Opposing schedules (Early Bird vs Night Owl)", "Struggle to find shared awake hours"],
      overlap: [15, 16, 17, 18],
      advice: "Protect the Lion's early sleep window using white noise. Wolf should respect early boundaries. Lion should avoid waking Wolf during their morning sleep-in.",
    },
  },
  wolf: {
    wolf: {
      score: 85,
      strengths: ["Perfect late-night alignment", "Shared peak creative energy", "No morning pressure"],
      challenges: ["Slow morning momentum", "Delayed routines can drift out of sync with society"],
      overlap: [16, 17, 18, 19, 20, 21, 22, 23],
      advice: "Enjoy your late-night creative flow, but set a firm anchor wake-up time. Prevent 'circadian drift' by getting outdoor light before 10 AM.",
    },
  },
};

export default function ChronotypeCompatibilityClient() {
  const [partnerA, setPartnerA] = useState("bear");
  const [partnerB, setPartnerB] = useState("wolf");

  const getCompatibility = (a: string, b: string) => {
    const sorted = [a, b].sort();
    const p1 = sorted[0];
    const p2 = sorted[1];
    
    return COMPATIBILITY_DATA[p1]?.[p2] || {
      score: 70,
      strengths: ["Complementary schedules"],
      challenges: ["Slight bedtime offsets"],
      overlap: [10, 11, 12, 13, 14, 15, 16, 17],
      advice: "Respect each other's schedules and align by finding middle grounds."
    };
  };

  const data = getCompatibility(partnerA, partnerB);

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Chronotype <span className="text-[#CCFF00]">Compatibility</span> Quiz
        </h1>
        <p className="text-zinc-400 text-lg">
          Map your sleep schedules and relationship alignment. Calculate sleep compatibility scores and find optimal alertness windows.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-10">
          {/* Partner A Select */}
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-3">Partner A Chronotype</label>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Partner A Chronotype Selection">
              {CHRONOTYPES.map((c) => (
                <button
                  key={`a-${c.slug}`}
                  role="radio"
                  aria-checked={partnerA === c.slug}
                  onClick={() => setPartnerA(c.slug)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    partnerA === c.slug
                      ? "border-[#CCFF00] bg-[#CCFF00]/10 text-white"
                      : "border-white/5 bg-black hover:border-white/10 text-zinc-400"
                  }`}
                >
                  <span className="text-2xl mb-1">{c.icon === "Dolphin" ? "🐬" : c.icon}</span>
                  <div>
                    <span className="font-bold text-sm block">{c.name}</span>
                    <span className="text-[10px] opacity-60">{c.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Partner B Select */}
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-3">Partner B Chronotype</label>
            <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Partner B Chronotype Selection">
              {CHRONOTYPES.map((c) => (
                <button
                  key={`b-${c.slug}`}
                  role="radio"
                  aria-checked={partnerB === c.slug}
                  onClick={() => setPartnerB(c.slug)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    partnerB === c.slug
                      ? "border-[#CCFF00] bg-[#CCFF00]/10 text-white"
                      : "border-white/5 bg-black hover:border-white/10 text-zinc-400"
                  }`}
                >
                  <span className="text-2xl mb-1">{c.icon === "Dolphin" ? "🐬" : c.icon}</span>
                  <div>
                    <span className="font-bold text-sm block">{c.name}</span>
                    <span className="text-[10px] opacity-60">{c.tag}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="bg-black border border-[#CCFF00]/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"></div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-white/5 pb-6 mb-6">
            <div>
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-1">Compatibility Score</p>
              <div className="text-5xl sm:text-6xl font-black text-[#CCFF00] tracking-tight drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">
                {data.score}%
              </div>
            </div>
            <div className="text-zinc-400 text-sm max-w-md">
              <span className="font-bold text-white block mb-1">
                {partnerA.toUpperCase()} & {partnerB.toUpperCase()} Pairing
              </span>
              Detailed chronobiological compatibility analysis based on sleep-wake cycle overlapping thresholds.
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-green-400 mb-2">🟢 Strengths</h4>
              <ul className="space-y-1.5 text-zinc-300 text-xs list-disc list-inside">
                {data.strengths.map((str, idx) => (
                  <li key={idx}>{str}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400 mb-2">🟠 Challenges</h4>
              <ul className="space-y-1.5 text-zinc-300 text-xs list-disc list-inside">
                {data.challenges.map((ch, idx) => (
                  <li key={idx}>{ch}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Co-Alertness Timeline */}
          <div className="border-t border-white/5 pt-6 mb-6">
            <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider block mb-3">Co-Alertness Timeline (8 AM - 11 PM)</span>
            <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-16 gap-1.5">
              {Array.from({ length: 16 }, (_, i) => i + 8).map((hour) => {
                const isOverlapping = data.overlap.includes(hour);
                const displayHour = hour > 12 ? `${hour - 12} PM` : hour === 12 ? "12 PM" : `${hour} AM`;
                return (
                  <div
                    key={hour}
                    className={`p-2 rounded-lg text-center transition-all ${
                      isOverlapping
                        ? "bg-[#CCFF00]/15 border border-[#CCFF00]/40 text-white"
                        : "bg-[#111] border border-white/5 text-zinc-600"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold block">{displayHour.split(" ")[0]}</span>
                    <span className="text-[8px] uppercase font-bold block opacity-60">{displayHour.split(" ")[1]}</span>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-zinc-500 mt-2.5 leading-relaxed">
              💡 Highlighted blocks indicate times of day where both partners' natural circadian hormones overlap to support wakefulness and peak communication.
            </p>
          </div>

          <div className="border-t border-white/5 pt-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-2">🏠 Cohabitation Guidelines</h4>
            <p className="text-xs text-zinc-400 leading-relaxed font-medium">{data.advice}</p>
          </div>
        </div>
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Solve relationship circadian friction</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          The ARC app features Partner Syncing. Invite your partner, link your schedules, and get a unified visual timeline of your shared alert hours, quiet sleep boundaries, and optimal shared wake windows.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>
    </main>
  );
}
