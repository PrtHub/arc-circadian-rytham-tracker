"use client";

import { useState } from "react";
import Link from "next/link";

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
  { name: "Yerba Mate (Guayaki)", amount: 85, category: "Tea" },
  { name: "Black Tea (8oz)", amount: 50, category: "Tea" },
  { name: "Green Tea (8oz)", amount: 35, category: "Tea" },
  { name: "Coca-Cola (12oz)", amount: 34, category: "Soda" },
  { name: "Diet Coke (12oz)", amount: 46, category: "Soda" },
  { name: "Mountain Dew (12oz)", amount: 54, category: "Soda" },
  { name: "Dr Pepper (12oz)", amount: 41, category: "Soda" },
];

export default function CaffeineCalculatorClient() {
  const [targetSleep, setTargetSleep] = useState("23:00");
  const [caffeineAmount, setCaffeineAmount] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const calculateCutoff = () => {
    if (caffeineAmount <= 25) return "Anytime (Very low dose)";

    const hoursNeeded = 6 * (Math.log(25 / caffeineAmount) / Math.log(0.5));

    const [hours, minutes] = targetSleep.split(":").map(Number);
    let sleepDate = new Date();
    sleepDate.setHours(hours, minutes, 0, 0);

    const cutoffDate = new Date(sleepDate.getTime() - hoursNeeded * 60 * 60 * 1000);

    return cutoffDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredDb = CAFFEINE_DB.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          Caffeine <span className="text-[#CCFF00]">Half-Life</span> Calculator
        </h1>
        <p className="text-zinc-400 text-lg">
          Caffeine has a half-life of roughly 6 hours. Calculate exactly when you need to stop drinking coffee today to protect your deep sleep tonight.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 shadow-2xl">
        <div className="grid sm:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Target Bedtime</label>
            <input
              type="time"
              value={targetSleep}
              onChange={(e) => setTargetSleep(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Drink Strength (mg)</label>
            <input
              type="number"
              value={caffeineAmount || ""}
              onChange={(e) => setCaffeineAmount(Math.max(0, Number(e.target.value)))}
              className="w-full bg-black border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
              placeholder="e.g. 100"
              min="0"
            />
          </div>
        </div>

        {/* Database Quick-Select */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Or Quick-Select from Database</h3>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search drinks (e.g. Celsius, Starbucks)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#CCFF00] transition-colors"
            />
            <div className="flex flex-wrap gap-1.5">
              {["All", "Energy", "Coffee", "Tea", "Soda"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#CCFF00] text-black"
                      : "bg-black border border-white/10 text-zinc-400 hover:text-white"
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
                onClick={() => setCaffeineAmount(drink.amount)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  caffeineAmount === drink.amount
                    ? "border-[#CCFF00] bg-[#CCFF00]/10"
                    : "border-white/5 bg-black hover:border-white/20"
                }`}
              >
                <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{drink.category}</span>
                <span className="text-sm font-bold text-white my-1 leading-snug">{drink.name}</span>
                <span className="text-xs font-bold text-[#CCFF00]">{drink.amount} mg</span>
              </button>
            ))}
            {filteredDb.length === 0 && (
              <div className="col-span-full py-8 text-center text-zinc-500 text-sm">
                No drinks found matching your search.
              </div>
            )}
          </div>
        </div>

        <div className="bg-black border border-[#CCFF00]/30 rounded-2xl p-8 text-center relative overflow-hidden mt-8">
          <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-[#CCFF00] to-transparent opacity-50"></div>
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-2">Your Biological Cutoff Time</p>
          <div className="text-5xl sm:text-6xl font-black text-[#CCFF00] mb-4 drop-shadow-[0_0_15px_rgba(204,255,0,0.3)]">
            {calculateCutoff()}
          </div>
          <p className="text-zinc-500 text-sm max-w-sm mx-auto">
            You must finish your drink by this time to ensure you have less than 25mg of active caffeine in your brain at bedtime.
          </p>
        </div>
      </div>

      <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/5 to-transparent rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#CCFF00]">Tired of doing the math?</h2>
        <p className="text-zinc-400 mb-6 max-w-lg mx-auto">
          The ARC app features a live, real-time SVG decay curve. Just tap what you drank, and watch the exact milligram count drop throughout the day.
        </p>
        <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
          Get ARC Pro
        </a>
      </div>
      <div className="mt-12 bg-[#111] border border-white/10 rounded-2xl p-6">
        <h3 className="text-lg font-bold mb-2 text-white">Embed this calculator on your site</h3>
        <p className="text-zinc-400 text-sm mb-4">Are you a blogger or health coach? Copy the code below to add this tool to your website and help your readers protect their sleep.</p>
        <div className="relative">
          <pre className="bg-black text-zinc-500 p-4 rounded-xl text-xs overflow-x-auto border border-white/5">
            {`<iframe src="https://arcapp.sbs/tools/caffeine-calculator" width="100%" height="600px" frameborder="0"></iframe>`}
          </pre>
          <button 
            onClick={() => navigator.clipboard.writeText('<iframe src="https://arcapp.sbs/tools/caffeine-calculator" width="100%" height="600px" frameborder="0"></iframe>')}
            className="absolute top-2 right-2 text-xs bg-[#CCFF00] text-black font-bold py-1.5 px-3 rounded-md hover:bg-white transition-colors"
          >
            Copy
          </button>
        </div>
      </div>
    </main>
  );
}
