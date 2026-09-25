"use client";

import { useState } from "react";
import { AppStoreButton } from "@/components/AppStoreButton";
import {
  CAFFEINE_SENSITIVITIES,
  SLEEP_SAFE_MG,
  halfLifeFor,
  latestSafeCup,
  mgAt,
  type LoggedDrink,
} from "@/lib/caffeine";
import { formatClock, toMinutes } from "@/lib/time";

interface DrinkRow {
  id: string;
  mg: number;
  time: string;
}

// The earliest a "next drink" makes sense; a cutoff before this has effectively passed.
const EARLIEST_DRINK = 5 * 60;

// Decay of today's drinks, plus (dashed) what a next drink at the cutoff would add.
function DecayChart({
  drinks,
  bed,
  halfLife,
  nextAt,
  nextMg,
}: {
  drinks: LoggedDrink[];
  bed: number;
  halfLife: number;
  nextAt: number | null;
  nextMg: number;
}) {
  const start = Math.min(bed - 60, ...drinks.map((d) => d.at), nextAt ?? bed) - 30;
  const withNext = nextAt !== null ? [...drinks, { mg: nextMg, at: nextAt }] : drinks;
  const times: number[] = [];
  for (let t = start; t <= bed; t += 10) times.push(t);
  const peak = Math.max(100, ...times.map((t) => mgAt(withNext, t, halfLife)));
  const w = 300;
  const h = 90;
  const x = (t: number) => ((t - start) / (bed - start)) * w;
  const y = (mg: number) => h - 6 - (mg / (peak * 1.1)) * (h - 12);
  const path = (list: LoggedDrink[]) =>
    "M" + times.map((t) => `${x(t).toFixed(1)},${y(mgAt(list, t, halfLife)).toFixed(1)}`).join(" L");

  return (
    <div className="mt-6">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full h-auto"
        role="img"
        aria-label="Caffeine in your system from your first drink to bedtime"
      >
        <line x1="0" x2={w} y1={y(SLEEP_SAFE_MG)} y2={y(SLEEP_SAFE_MG)} stroke="var(--aura-sleep)" strokeDasharray="3 3" strokeWidth="1" />
        <text x="2" y={y(SLEEP_SAFE_MG) - 3} fill="var(--fg-muted)" fontSize="7">
          {SLEEP_SAFE_MG} mg
        </text>
        {nextAt !== null && (
          <path d={path(withNext)} fill="none" stroke="var(--accent)" strokeOpacity="0.6" strokeWidth="1.6" strokeDasharray="4 3" />
        )}
        <path d={path(drinks)} fill="none" stroke="var(--aura-crash)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="flex justify-between text-[10px] font-mono text-(--fg-muted) mt-1">
        <span>{formatClock(start)}</span>
        <span>Bed · {formatClock(bed)}</span>
      </div>
      <p className="text-[11px] text-(--fg-muted) mt-2">
        Solid: caffeine from today&apos;s drinks.
        {nextAt !== null && " Dashed: with one more drink at your cutoff, landing on the 50 mg line at bedtime."}
      </p>
    </div>
  );
}

const CAFFEINE_DB = [
  { name: "Celsius Energy Drink", amount: 200, category: "Energy" },
  { name: "Monster Energy", amount: 160, category: "Energy" },
  { name: "Red Bull", amount: 80, category: "Energy" },
  { name: "Celsius Heat", amount: 300, category: "Energy" },
  { name: "Rockstar Energy", amount: 160, category: "Energy" },
  { name: "Red Bull Sugarfree", amount: 80, category: "Energy" },
  { name: "Starbucks Brewed (Grande)", amount: 310, category: "Coffee" },
  { name: "Starbucks Double Espresso", amount: 150, category: "Coffee" },
  { name: "Starbucks Cold Brew (Grande)", amount: 205, category: "Coffee" },
  { name: "Starbucks Latte (Grande)", amount: 150, category: "Coffee" },
  { name: "Dunkin' Brewed (Medium)", amount: 210, category: "Coffee" },
  { name: "Dunkin' Iced Coffee (Medium)", amount: 297, category: "Coffee" },
  { name: "Nespresso Capsule", amount: 65, category: "Coffee" },
  { name: "Matcha Green Tea", amount: 70, category: "Tea" },
  { name: "Yerba Mate (8 oz brewed)", amount: 85, category: "Tea" },
  { name: "Black Tea (8oz)", amount: 50, category: "Tea" },
  { name: "Green Tea (8oz)", amount: 35, category: "Tea" },
  { name: "Coca-Cola (12oz)", amount: 34, category: "Soda" },
  { name: "Diet Coke (12oz)", amount: 46, category: "Soda" },
  { name: "Mountain Dew (12oz)", amount: 54, category: "Soda" },
  { name: "Dr Pepper (12oz)", amount: 41, category: "Soda" },
];

const EMBED_SNIPPET =
  '<iframe src="https://arcapp.sbs/tools/caffeine-calculator" width="100%" height="600px" frameborder="0"></iframe>\n<p>Caffeine calculator by <a href="https://arcapp.sbs/tools/caffeine-calculator">ARC</a></p>';

export default function CaffeineCalculatorClient() {
  const [targetSleep, setTargetSleep] = useState("23:00");
  const [drinkRows, setDrinkRows] = useState<DrinkRow[]>([{ id: "d1", mg: 95, time: "08:00" }]);
  const [caffeineAmount, setCaffeineAmount] = useState(100);
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const [sensitivity, setSensitivity] = useState("normal");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copied, setCopied] = useState(false);

  const halfLife = halfLifeFor(sensitivity);

  // Pure minute arithmetic from the inputs, so the server and browser render the same result.
  let bed = targetSleep ? toMinutes(targetSleep) : null;
  if (bed !== null && bed < 12 * 60) bed += 24 * 60; // an after-midnight bedtime belongs to tonight
  const drinks: LoggedDrink[] = drinkRows
    .filter((r) => r.time && r.mg > 0)
    .map((r) => ({ mg: r.mg, at: toMinutes(r.time) }));
  const lastDrinkAt = drinks.length ? Math.max(...drinks.map((d) => d.at)) : null;
  const atBed = bed !== null ? Math.round(mgAt(drinks, bed, halfLife)) : null;
  const cutoff = bed !== null && caffeineAmount > 0 ? latestSafeCup(drinks, bed, halfLife, caffeineAmount) : null;
  const state =
    bed === null || caffeineAmount <= 0
      ? "incomplete"
      : cutoff === null
        ? "exhausted"
        : cutoff >= bed
          ? "anytime"
          : cutoff < Math.max(EARLIEST_DRINK, lastDrinkAt ?? 0)
            ? "passed"
            : "ahead";

  const updateRow = (id: string, patch: Partial<DrinkRow>) =>
    setDrinkRows((rows) => rows.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  const addRow = () =>
    setDrinkRows((rows) => [...rows, { id: `d${Date.now()}`, mg: caffeineAmount || 95, time: "12:00" }]);
  const removeRow = (id: string) => setDrinkRows((rows) => rows.filter((r) => r.id !== id));

  const filteredDb = CAFFEINE_DB.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyEmbed = () => {
    navigator.clipboard
      .writeText(EMBED_SNIPPET)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          Caffeine <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Half-Life &amp; Cutoff</span> Calculator
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Caffeine&apos;s half-life ranges from about 4 to 7 hours depending on how fast you metabolise it. Add what you&apos;ve already drunk today to find the last time your next drink still leaves under 50 mg in your system at bedtime.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label htmlFor="caffeine-bedtime" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Target Bedtime</label>
            <input
              id="caffeine-bedtime"
              type="time"
              value={targetSleep}
              onChange={(e) => setTargetSleep(e.target.value)}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent transition-colors font-mono"
            />
          </div>
          <div>
            <label htmlFor="caffeine-mg" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Next Drink (mg)</label>
            <input
              id="caffeine-mg"
              type="number"
              value={caffeineAmount || ""}
              onChange={(e) => {
                setCaffeineAmount(Math.max(0, Number(e.target.value) || 0));
                setSelectedDrink(null);
              }}
              className="w-full sunken-card p-4 text-white focus:outline-none focus:border-accent transition-colors font-mono"
              placeholder="e.g. 100"
              min="0"
            />
          </div>
        </div>

        <div>
          <p id="caffeine-sensitivity-label" className="block text-xs font-bold text-accent uppercase tracking-wider mb-2 font-mono">Caffeine Sensitivity</p>
          <div className="grid grid-cols-3 gap-2 font-mono" role="group" aria-labelledby="caffeine-sensitivity-label">
            {CAFFEINE_SENSITIVITIES.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSensitivity(s.id)}
                aria-pressed={sensitivity === s.id}
                className={`px-3 py-3 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 ${
                  sensitivity === s.id
                    ? "bg-accent text-black"
                    : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                }`}
              >
                <span>{s.label}</span>
                <span className="text-[10px] font-normal opacity-80">{s.halfLife}h half-life</span>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-(--fg-muted) mt-2">
            Not sure? If an afternoon coffee keeps you up at night, pick Slow.
          </p>
        </div>

        {/* Drinks already had today */}
        <fieldset className="mt-8 pt-8 border-t border-white/10">
          <legend className="text-lg font-bold text-white mb-1">Drinks so far today</legend>
          <p className="text-xs text-(--fg-muted) mb-4">Earlier caffeine is still in your system and pulls your cutoff earlier.</p>
          <div className="space-y-2">
            {drinkRows.map((row, i) => (
              <div key={row.id} className="flex items-end gap-2">
                <div className="flex-1">
                  <label
                    htmlFor={`drink-mg-${row.id}`}
                    className="block text-[10px] font-mono uppercase tracking-wider text-(--fg-muted) mb-1"
                  >
                    Drink {i + 1} (mg)
                  </label>
                  <input
                    id={`drink-mg-${row.id}`}
                    type="number"
                    min="0"
                    value={row.mg || ""}
                    onChange={(e) => updateRow(row.id, { mg: Math.max(0, Number(e.target.value) || 0) })}
                    className="w-full sunken-card px-3 py-2.5 text-white font-mono focus:outline-none focus:border-accent"
                  />
                </div>
                <div className="flex-1">
                  <label
                    htmlFor={`drink-time-${row.id}`}
                    className="block text-[10px] font-mono uppercase tracking-wider text-(--fg-muted) mb-1"
                  >
                    Time
                  </label>
                  <input
                    id={`drink-time-${row.id}`}
                    type="time"
                    value={row.time}
                    onChange={(e) => updateRow(row.id, { time: e.target.value })}
                    className="w-full sunken-card px-3 py-2.5 text-white font-mono scheme-dark focus:outline-none focus:border-accent"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  aria-label={`Remove drink ${i + 1}`}
                  className="shrink-0 h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addRow} className="mt-3 text-xs font-mono font-bold text-accent hover:underline">
            + Add a drink
          </button>
        </fieldset>

        {/* Database Quick-Select */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Pick your next drink</h3>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              aria-label="Search drinks"
              placeholder="Search drinks (e.g. Celsius, Starbucks)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 sunken-card px-4 py-3 text-sm text-white focus:outline-none focus:border-accent transition-colors"
            />
            <div className="flex flex-wrap gap-1.5 font-mono">
              {["All", "Energy", "Coffee", "Tea", "Soda"].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-accent text-black"
                      : "bg-white/5 border border-white/10 text-(--fg-muted) hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
            {filteredDb.map((drink) => (
              <button
                key={drink.name}
                type="button"
                onClick={() => {
                  setCaffeineAmount(drink.amount);
                  setSelectedDrink(drink.name);
                }}
                aria-pressed={selectedDrink === drink.name}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedDrink === drink.name
                    ? "border-accent bg-(--accent)/15 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    : "border-white/5 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="text-[10px] text-(--fg-muted) font-bold uppercase tracking-wider font-mono">{drink.category}</span>
                <span className="text-sm font-bold text-white my-1 leading-snug">{drink.name}</span>
                <span className="text-xs font-bold text-accent font-mono">{drink.amount} mg</span>
              </button>
            ))}
            {filteredDb.length === 0 && (
              <div className="col-span-full py-8 text-center text-(--fg-muted) text-sm">
                No drinks found matching your search.
              </div>
            )}
          </div>
        </div>

        <div className="sunken-card border border-(--accent)/30 p-8 text-center relative overflow-hidden mt-8" aria-live="polite">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-accent to-transparent opacity-50"></div>
          <p className="text-(--fg-muted) text-xs font-bold uppercase tracking-widest mb-2 font-mono">
            {state === "exhausted" ? "No drink of this size fits tonight" : `Last safe ${caffeineAmount || ""} mg drink`}
          </p>
          <div className="text-4xl sm:text-5xl font-black text-accent mb-3 font-mono">
            {state === "incomplete" && "Set a bedtime and drink size"}
            {state === "anytime" && "Anytime before bed"}
            {state === "ahead" && cutoff !== null && formatClock(cutoff)}
            {state === "passed" && cutoff !== null && `Passed (${formatClock(Math.max(cutoff, 0))})`}
            {state === "exhausted" && "Not tonight"}
          </div>
          <p className="text-(--fg-muted) text-sm max-w-md mx-auto">
            {state === "exhausted"
              ? `Today's drinks already leave about ${atBed} mg at bedtime, so any more caffeine keeps you over the 50 mg line.`
              : state === "passed"
                ? "For this drink size, the safe window closed earlier today. A smaller drink, or decaf, may still fit."
                : "Calculated so that under 50 mg of caffeine is still circulating at bedtime, counting today's drinks."}
          </p>
          {atBed !== null && drinks.length > 0 && state !== "exhausted" && (
            <p className="text-xs text-(--fg-muted) mt-3">
              Today&apos;s drinks alone leave about <strong className="text-white">{atBed} mg</strong> at bedtime.
            </p>
          )}
          {bed !== null && (drinks.length > 0 || state === "ahead") && (
            <DecayChart
              drinks={drinks}
              bed={bed}
              halfLife={halfLife}
              nextAt={state === "ahead" ? cutoff : null}
              nextMg={caffeineAmount}
            />
          )}
        </div>
      </div>

      <div className="raised-card p-8 text-center border-(--accent)/30">
        <h2 className="text-2xl font-bold mb-4 text-accent">Stop guessing your cutoff.</h2>
        <p className="text-(--fg-muted) mb-6 max-w-lg mx-auto">
          Here you type your drinks in. ARC does the same math from every drink you log in one tap, moves your last safe coffee the moment you log a cup, shows it as a live countdown, and tells you plainly when no cup fits any more.
        </p>
        <AppStoreButton size="lg" location="tool_caffeine_calculator" />
      </div>
      <div className="mt-12 raised-card p-6">
        <h3 className="text-lg font-bold mb-2 text-white">Embed this calculator on your site</h3>
        <p className="text-(--fg-muted) text-sm mb-4">Are you a blogger or health coach? Copy the code below to add this tool to your website and help your readers protect their sleep.</p>
        <div className="relative">
          <pre className="bg-black/60 text-(--fg-muted) p-4 pr-20 rounded-xl text-xs overflow-x-auto border border-white/5 font-mono">
            {EMBED_SNIPPET}
          </pre>
          <button
            type="button"
            onClick={copyEmbed}
            className="absolute top-2 right-2 text-xs bg-accent text-black font-bold py-1.5 px-3 rounded-lg hover:bg-white transition-colors font-mono"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </main>
  );
}
