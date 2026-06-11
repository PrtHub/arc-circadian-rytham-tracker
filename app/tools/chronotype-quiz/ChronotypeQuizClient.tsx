"use client";

import { useState } from "react";
import Link from "next/link";

export default function ChronotypeQuizClient() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = [
    {
      q: "If you had no alarm and no obligations, what time would you naturally wake up?",
      options: [
        { text: "Before 6:30 AM", score: 1 }, // Lion
        { text: "Between 7:00 AM and 8:30 AM", score: 2 }, // Bear
        { text: "After 9:00 AM", score: 3 }, // Wolf
        { text: "It varies wildly; I struggle with sleep.", score: 4 }, // Dolphin
      ]
    },
    {
      q: "When do you feel your absolute most productive and focused?",
      options: [
        { text: "Early morning. I crush tasks before noon.", score: 1 },
        { text: "Mid-morning to early afternoon.", score: 2 },
        { text: "Late afternoon or late at night.", score: 3 },
        { text: "I get bursts of nervous energy randomly.", score: 4 },
      ]
    },
    {
      q: "How do you feel around 3:00 PM on a normal day?",
      options: [
        { text: "Exhausted. I need a nap or strong coffee.", score: 1 },
        { text: "A bit sluggish, hitting a minor wall.", score: 2 },
        { text: "I'm just starting to hit my stride.", score: 3 },
        { text: "Tired, but my brain won't shut off.", score: 4 },
      ]
    }
  ];

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const getResult = () => {
    const counts = [0, 0, 0, 0, 0];
    answers.forEach(a => counts[a]++);
    const maxIndex = counts.indexOf(Math.max(...counts));

    if (maxIndex === 1) return { name: "Lion", icon: "🦁", link: "/chronotype/lion" };
    if (maxIndex === 2) return { name: "Bear", icon: "🐻", link: "/chronotype/bear" };
    if (maxIndex === 3) return { name: "Wolf", icon: "🐺", link: "/chronotype/wolf" };
    return { name: "Dolphin", icon: "🐬", link: "/chronotype/dolphin" };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-20 min-h-[70vh]">
      <Link href="/tools" className="text-[#CCFF00] text-sm font-bold hover:underline mb-8 inline-block">
        ← Back to Tools
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
          3-Question <span className="text-[#CCFF00]">Chronotype</span> Quiz
        </h1>
        <p className="text-zinc-400 text-lg">
          Stop guessing your biology. Take this rapid assessment to find out if you are a Lion, Bear, Wolf, or Dolphin.
        </p>
      </header>

      <div className="bg-[#111] border border-white/10 p-6 sm:p-10 rounded-3xl mb-12 min-h-[400px] flex flex-col shadow-2xl relative overflow-hidden">
        {step < questions.length && (
          <div className="absolute top-0 left-0 h-1 bg-[#CCFF00] transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }}></div>
        )}
        
        {step < questions.length ? (
          <div className="flex-1 flex flex-col">
            <p className="text-[#CCFF00] font-bold text-sm mb-4 tracking-widest uppercase">Question {step + 1} of {questions.length}</p>
            <h2 className="text-3xl font-bold mb-8 leading-snug">{questions[step].q}</h2>
            <div className="space-y-4 mt-auto">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-5 border border-white/10 rounded-xl hover:border-[#CCFF00] hover:bg-[#CCFF00]/5 transition-all text-lg"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-zinc-400 font-bold tracking-widest uppercase mb-4">Your Estimated Chronotype</p>
            <div className="text-7xl mb-6 drop-shadow-[0_0_20px_rgba(204,255,0,0.4)]">{getResult().icon}</div>
            <h2 className="text-5xl font-black mb-6">The {getResult().name}</h2>
            <Link
              href={getResult().link}
              className="text-[#CCFF00] border-2 border-[#CCFF00] rounded-full px-8 py-3 font-bold hover:bg-[#CCFF00] hover:text-black transition-colors mb-8 text-lg"
            >
              Read the Full {getResult().name} Guide →
            </Link>
            <button onClick={() => { setStep(0); setAnswers([]); }} className="text-zinc-500 hover:text-white transition-colors">
              Retake Quiz
            </button>
          </div>
        )}
      </div>

      {step === questions.length && (
        <div className="border border-white/5 bg-linear-to-b from-[#CCFF00]/10 to-transparent rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Want true clinical precision?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto leading-relaxed text-lg">
            This 3-question quiz is just a baseline estimate. The ARC app features a clinical-grade <strong>32-Step Precision Diagnosis</strong> that maps your exact peak focus windows, caffeine cutoffs, and biological schedule.
          </p>
          <a href="/#pricing" className="inline-block bg-[#CCFF00] text-black font-black py-4 px-10 rounded-full hover:bg-white transition-colors text-lg">
            Unlock the Full Diagnosis
          </a>
        </div>
      )}
    </main>
  );
}
