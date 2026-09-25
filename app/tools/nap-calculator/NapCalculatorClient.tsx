"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import { SLEEP_SAFE_MG, halfLifeFor, mgRemaining } from "@/lib/caffeine";
import { formatClock, toMinutes } from "@/lib/time";
import { EducationalNote } from "../_components/tool-extras";

const NAP_TYPES = [
  {
    id: "power",
    label: "Power nap",
    detail: "10–20 min",
    sleepMins: 20,
    fallAsleepMins: 5,
    minBeforeBed: 6 * 60,
    why: "Short enough to stay in light sleep, so you wake up without the fog.",
  },
  {
    id: "full",
    label: "Full cycle",
    detail: "~90 min",
    sleepMins: 90,
    fallAsleepMins: 10,
    minBeforeBed: 7 * 60,
    why: "A whole sleep cycle ends in lighter sleep, so waking is easier than at 45 minutes.",
  },
  {
    id: "caffeine",
    label: "Caffeine nap",
    detail: "coffee + 20 min",
    sleepMins: 20,
    fallAsleepMins: 0,
    minBeforeBed: 6 * 60,
    why: "Caffeine takes about 20 minutes to kick in, so it arrives just as you wake up.",
  },
] as const;

type NapTypeId = (typeof NAP_TYPES)[number]["id"];

const CUP_MG = 95;
// The afternoon dip typically lands about 6.5 to 8.5 hours after waking.
const DIP_START_AFTER_WAKE = 6.5 * 60;
const DIP_END_AFTER_WAKE = 8.5 * 60;
// Too soon after waking, a nap cuts into the day's sleep pressure without a dip to fix.
const EARLIEST_AFTER_WAKE = 5 * 60;

function planNap(wakeTime: string, bedTime: string, typeId: NapTypeId) {
  if (!wakeTime || !bedTime) return null;
  const type = NAP_TYPES.find((t) => t.id === typeId) ?? NAP_TYPES[0];
  const wake = toMinutes(wakeTime);
  let bed = toMinutes(bedTime);
  if (bed <= wake) bed += 24 * 60; // a bedtime after midnight belongs to tonight

  const dipStart = wake + DIP_START_AFTER_WAKE;
  const dipEnd = wake + DIP_END_AFTER_WAKE;
  const napLength = type.fallAsleepMins + type.sleepMins;

  // Aim for early in the dip (a long nap starts at the very beginning of it).
  const ideal = type.id === "full" ? dipStart : dipStart + 30;
  const latestEnd = bed - type.minBeforeBed;
  const start = Math.min(ideal, latestEnd - napLength);
  const fits = start >= wake + EARLIEST_AFTER_WAKE;
  const movedEarlier = start < ideal;

  const caffeineAtBed =
    type.id === "caffeine" ? Math.round(mgRemaining(CUP_MG, (bed - start) / 60, halfLifeFor("normal"))) : null;

  return {
    type,
    dipStart,
    dipEnd,
    start,
    alarm: start + napLength,
    bed,
    fits,
    movedEarlier,
    caffeineAtBed,
    caffeineTooLate: caffeineAtBed !== null && caffeineAtBed >= SLEEP_SAFE_MG,
  };
}

export default function NapCalculatorClient() {
  const [wakeTime, setWakeTime] = useState("07:00");
  const [bedTime, setBedTime] = useState("23:00");
  const [napType, setNapType] = useState<NapTypeId>("power");

  const plan = planNap(wakeTime, bedTime, napType);

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">
      <header className="mb-10">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Nap <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Calculator</span>
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Most people hit an afternoon dip a few hours after lunch, whether or not they ate. Enter when you woke up and when
          you&apos;ll go to bed to find the best time to nap today, and when to set the alarm.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-8 mb-8 flex flex-col gap-7">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="nap-wake" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
              I woke up at
            </label>
            <input
              id="nap-wake"
              type="time"
              value={wakeTime}
              onChange={(e) => setWakeTime(e.target.value)}
              className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label htmlFor="nap-bed" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">
              I&apos;ll go to bed at
            </label>
            <input
              id="nap-bed"
              type="time"
              value={bedTime}
              onChange={(e) => setBedTime(e.target.value)}
              className="w-full sunken-card px-4 py-3 text-lg text-white font-mono scheme-dark focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Kind of nap</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {NAP_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={napType === t.id}
                onClick={() => setNapType(t.id)}
                className={`p-3 rounded-xl text-left transition-all ${
                  napType === t.id
                    ? "bg-accent text-black"
                    : "bg-white/5 border border-white/10 text-white hover:border-white/25"
                }`}
              >
                <span className="block text-sm font-bold">{t.label}</span>
                <span className={`block text-xs font-mono ${napType === t.id ? "text-black/70" : "text-(--fg-muted)"}`}>
                  {t.detail}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="raised-card border-(--accent)/40 p-6 sm:p-8 mb-12" aria-live="polite">
        {!plan ? (
          <p className="text-(--fg-muted)">Enter both times to see your nap plan.</p>
        ) : (
          <>
            <p className="eyebrow text-(--fg-muted) mb-2">Your afternoon dip (typical estimate)</p>
            <p className="text-lg text-white font-mono mb-6">
              {formatClock(plan.dipStart)} – {formatClock(plan.dipEnd)}
            </p>

            {plan.fits ? (
              <>
                <p className="eyebrow text-(--fg-muted) mb-2">Best time to nap</p>
                <p className="font-display text-6xl sm:text-7xl text-accent leading-none tracking-[-0.03em]">
                  {formatClock(plan.start)}
                </p>
                <p className="text-sm text-(--fg-muted) mt-3">
                  {plan.type.id === "caffeine"
                    ? `Drink a coffee, lie down straight away, and set an alarm for ${formatClock(plan.alarm)}.`
                    : `Set an alarm for ${formatClock(plan.alarm)}: ${plan.type.sleepMins} minutes of sleep plus about ${plan.type.fallAsleepMins} to fall asleep.`}
                </p>

                <ul className="mt-6 space-y-3 text-sm text-(--fg) leading-relaxed">
                  <li className="sunken-card p-4">{plan.type.why}</li>
                  {plan.movedEarlier && (
                    <li className="sunken-card p-4">
                      Moved earlier so it ends at least {plan.type.minBeforeBed / 60} hours before your {formatClock(plan.bed)} bedtime.
                      Napping later eats into the sleep pressure you need tonight.
                    </li>
                  )}
                  {plan.caffeineAtBed !== null && (
                    <li className={`sunken-card p-4 ${plan.caffeineTooLate ? "border border-(--aura-crash)/40" : ""}`}>
                      {plan.caffeineTooLate ? (
                        <>
                          A {CUP_MG} mg coffee at {formatClock(plan.start)} would still leave about{" "}
                          <strong className="text-white">{plan.caffeineAtBed} mg</strong> in you at bedtime, over the {SLEEP_SAFE_MG} mg
                          line for an average metaboliser. Skip the coffee today and take a plain power nap.
                        </>
                      ) : (
                        <>
                          A {CUP_MG} mg coffee at {formatClock(plan.start)} leaves about{" "}
                          <strong className="text-white">{plan.caffeineAtBed} mg</strong> at bedtime for an average metaboliser, under
                          the {SLEEP_SAFE_MG} mg line. If afternoon coffee usually keeps you up, skip it.
                        </>
                      )}
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <div className="sunken-card p-5 text-sm text-(--fg) leading-relaxed">
                <p className="font-bold text-white mb-1">Today, a walk beats a nap.</p>
                <p>
                  With a {formatClock(plan.bed)} bedtime there isn&apos;t room for a {plan.type.label.toLowerCase()} that ends at
                  least {plan.type.minBeforeBed / 60} hours before bed. Ten minutes outside in daylight is a good substitute, or try
                  a shorter power nap earlier in the afternoon.
                </p>
              </div>
            )}
          </>
        )}
        <EducationalNote text="Educational, not medical advice. If you feel very sleepy during the day even after enough sleep, talk to a doctor." />
      </div>

      <section className="raised-card border-(--accent)/30 p-8 text-center">
        <h2 className="text-2xl font-bold mb-3 text-white">Find out when your dip really lands</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto leading-relaxed">
          This calculator uses a typical estimate. ARC measures yours: after about ten days of one-tap energy check-ins it uses
          the hour you actually crash. &ldquo;Rest at the dip&rdquo; and &ldquo;a walk before the dip&rdquo; are two of its
          five-day experiments, scored against your own history, and &ldquo;no difference&rdquo; is an allowed answer.
        </p>
        <div className="flex justify-center">
          <AppStoreButton size="lg" location="tool_nap_calculator" />
        </div>
      </section>
    </main>
  );
}
