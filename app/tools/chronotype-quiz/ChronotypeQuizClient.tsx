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
    },
    {
      q: "If you had nothing scheduled the next morning, when would you go to bed?",
      options: [
        { text: "Before 10:00 PM", score: 1 },
        { text: "Between 10:00 and 11:30 PM", score: 2 },
        { text: "After midnight", score: 3 },
        { text: "It varies; I often lie awake anyway.", score: 4 },
      ]
    },
    {
      q: "How do you feel in the first 30 minutes after waking?",
      options: [
        { text: "Alert and ready to go.", score: 1 },
        { text: "Groggy, but fine once I get moving.", score: 2 },
        { text: "Foggy for an hour or more.", score: 3 },
        { text: "Tired, even after a full night in bed.", score: 4 },
      ]
    },
    {
      q: "How would you describe your sleep?",
      options: [
        { text: "Deep. I fall asleep fast and stay asleep.", score: 1 },
        { text: "Solid on most nights.", score: 2 },
        { text: "Fine, once I finally fall asleep late.", score: 3 },
        { text: "Light. Small noises or thoughts wake me.", score: 4 },
      ]
    },
    {
      q: "When does exercise feel best for you?",
      options: [
        { text: "Early morning.", score: 1 },
        { text: "Midday or early evening.", score: 2 },
        { text: "Late evening.", score: 3 },
        { text: "No consistent time; it depends on how I slept.", score: 4 },
      ]
    },
    {
      q: "How do you handle a late night out?",
      options: [
        { text: "I fade early and struggle to stay up.", score: 1 },
        { text: "I can stay up, but I pay for it the next day.", score: 2 },
        { text: "Late nights are when I feel most alive.", score: 3 },
        { text: "I'm wired afterwards and can't wind down.", score: 4 },
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
    const max = Math.max(...counts);
    const tied = [1, 2, 3, 4].filter((s) => counts[s] === max);

    // Break ties with natural wake time (question 1), then Bear, the most common type.
    let winner = tied[0];
    if (tied.length > 1) {
      if (tied.includes(answers[0])) winner = answers[0];
      else if (tied.includes(2)) winner = 2;
    }

    if (winner === 1) return { name: "Lion", icon: "🦁", link: "/chronotype/lion" };
    if (winner === 2) return { name: "Bear", icon: "🐻", link: "/chronotype/bear" };
    if (winner === 3) return { name: "Wolf", icon: "🐺", link: "/chronotype/wolf" };
    return { name: "Dolphin", icon: "🐬", link: "/chronotype/dolphin" };
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-14 min-h-[70vh]">

      <header className="mb-12">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight mb-3 leading-tight">
          8-Question <span className="font-display italic font-normal text-accent text-3xl sm:text-4xl lg:text-[42px]">Chronotype</span> Quiz
        </h1>
        <p className="text-(--fg-muted) text-sm sm:text-base leading-relaxed">
          Stop guessing your biology. Take this rapid assessment to find out if you are a Lion, Bear, Wolf, or Dolphin.
        </p>
      </header>

      <div className="raised-card p-6 sm:p-10 mb-12 min-h-100 flex flex-col shadow-2xl relative overflow-hidden">
        {step < questions.length && (
          <div className="absolute top-0 left-0 h-1 bg-accent transition-all duration-500" style={{ width: `${(step / questions.length) * 100}%` }}></div>
        )}
        
        {step < questions.length ? (
          <div className="flex-1 flex flex-col">
            <p className="text-accent font-bold text-xs mb-4 tracking-widest uppercase font-mono">Question {step + 1} of {questions.length}</p>
            <h2 className="text-3xl font-bold mb-8 leading-snug text-white">{questions[step].q}</h2>
            <div className="space-y-4 mt-auto">
              {questions[step].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full text-left p-5 sunken-card border border-white/5 hover:border-accent hover:bg-(--accent)/10 transition-all text-base sm:text-lg text-white font-medium"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <p className="text-(--fg-muted) font-bold tracking-widest uppercase mb-4 text-xs font-mono">Your Estimated Chronotype</p>
            <div className="text-5xl sm:text-6xl mb-4 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">{getResult().icon}</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-4 text-white">The {getResult().name}</h2>
            <Link
              href={getResult().link}
              className="text-black bg-accent rounded-full px-8 py-3.5 font-black hover:scale-105 hover:brightness-110 active:scale-95 transition-all mb-8 text-base shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono"
            >
              Read the Full {getResult().name} Guide →
            </Link>
            <button onClick={() => { setStep(0); setAnswers([]); }} className="text-(--fg-muted) hover:text-white transition-colors font-mono text-xs">
              Retake Quiz
            </button>
          </div>
        )}
      </div>

      {step === questions.length && (
        <div className="raised-card border-(--accent)/30 p-10 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Want a plan built on your own numbers?</h2>
          <p className="text-(--fg-muted) mb-8 max-w-lg mx-auto leading-relaxed text-base">
            This 8-question quiz is a baseline estimate. The ARC app&apos;s <strong>22-step diagnostic onboarding</strong> maps your peak focus windows, caffeine cutoff, and daily schedule, then keeps checking them against your own check-ins.
          </p>
          <Link href="/#pricing" className="inline-block bg-accent text-black font-black py-4 px-10 rounded-full hover:scale-105 hover:brightness-110 active:scale-95 transition-all text-base shadow-[0_8px_25px_rgba(0,0,0,0.35)] font-mono">
            Unlock the Full Diagnosis
          </Link>
        </div>
      )}
    </main>
  );
}
