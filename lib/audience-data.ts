export interface AudienceDetail {
  slug: string;
  name: string;
  icon: string;
  /** Page <title> (the layout adds the brand). Keep it at 60 characters or fewer. */
  title: string;
  /** Words before the highlighted name in the H1, e.g. "A circadian rhythm app for". */
  h1Lead: string;
  description: string;
  painPoints: string[];
  arcSolution: string;
  features: string[];
  /** Body sections; paragraphs may contain [text](/path) links. */
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { q: string; a: string }[];
  /** Optional medical / safety line shown at the end of the page. */
  disclaimer?: string;
}

const MEDICAL_LINE =
  "ARC is a wellness app, not a medical device. If sleep problems persist, talk to a doctor.";

const PRIVACY_FAQ = {
  q: "Where is my data stored?",
  a: "Your log stays on your iPhone. No account. The one exception is the daily sentence: to write it, ARC sends a short timing summary (wake time, bedtime, dip time and today's caffeine) to a language model.",
};

const WEARABLE_FAQ = {
  q: "Do I need a wearable?",
  a: "No. ARC works from one-tap check-ins and the drinks you log. It doesn't read Apple Health or connect to a watch or ring.",
};

export const audienceDetails: Record<string, AudienceDetail> = {
  adhd: {
    slug: "adhd",
    name: "ADHD",
    icon: "🧠",
    title: "Circadian Rhythm App for ADHD: Light, Caffeine & Sleep",
    h1Lead: "A circadian rhythm app for",
    description:
      "A to-do list is a decision, and decisions are expensive on a low-energy morning. ARC shows one next step at a time, timed to your energy.",
    painPoints: [
      "Afternoon crashes derailing focus",
      "Time blindness and unstructured days",
      "Difficulty winding down at night",
      "Revenge bedtime procrastination",
    ],
    arcSolution:
      "ARC isn't an ADHD treatment and doesn't replace your clinician or medication. What it does is hold the timing for you: one next step at a time, a morning light timer that starts at your real sunrise, and a caffeine cutoff that updates with every drink.",
    features: [
      "One next step at the top of a short day plan",
      "Focus blocks placed at your peak",
      "Live caffeine decay tracking",
      "Notifications for your coffee window, caffeine cutoff and wind-down",
    ],
    sections: [
      {
        heading: "A Day with ARC",
        paragraphs: [
          "ARC opens with one sentence explaining why you feel the way you do right now, and one next step at the top of a short day plan. Tap Not now and the next-best step surfaces instead; nothing piles up into a list you have to triage.",
          "The morning light timer starts from your real sunrise and runs on your Lock Screen, so you don't have to remember to stop it. Your last safe coffee updates every time you log a cup, which helps with the late-afternoon \"one more\" that quietly pushes bedtime back.",
        ],
      },
      {
        heading: "Why Timing Matters with ADHD",
        paragraphs: [
          "Research suggests many adults with ADHD have a later body clock: melatonin tends to rise later in the evening, which is part of why bedtime keeps sliding. Our [ADHD and delayed sleep phase guide](/guides/adhd-delayed-sleep-phase-guide) covers the research, and [this post on ADHD and melatonin timing](/blog/adhd-circadian-rhythm-delayed-melatonin-sleep-fix) covers practical fixes.",
          "For building structure into the day itself, see [ADHD, dopamine and a focus routine](/blog/adhd-dopamine-focus-routine).",
        ],
      },
      {
        heading: "What ARC Won't Do",
        paragraphs: [
          "ARC doesn't diagnose or treat ADHD, doesn't replace your clinician or medication, and won't tell you to change either. It's a timing tool: light, caffeine, focus and wind-down, arranged around your own body clock.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does ARC help with ADHD?",
        a: "It helps with timing, which is often the hard part: one step at a time, light at the right moment, and caffeine that doesn't wreck tonight's sleep. It doesn't treat ADHD. Talk to your clinician about symptoms or medication.",
      },
      {
        q: "Will it nag me?",
        a: "Notifications sit behind five toggles (morning, caffeine, energy, wind-down and extras), and you can switch any of them off.",
      },
      WEARABLE_FAQ,
    ],
    disclaimer: MEDICAL_LINE,
  },
  founders: {
    slug: "founders",
    name: "Founders",
    icon: "🚀",
    title: "Energy App for Founders: Beat the Afternoon Crash",
    h1Lead: "An energy app for",
    description:
      "Put your best hours on the hard work, and stop fighting the 2 PM crash with another coffee. ARC times your day to your body.",
    painPoints: [
      "Guessing when to do deep work",
      "Caffeine-induced sleep disruption",
      "Brain fog during crucial afternoon meetings",
      "Weekend 'social jetlag' ruining Monday",
    ],
    arcSolution:
      "ARC starts from your chronotype and the peak you tell it, then learns from one-tap energy check-ins. After about ten days it measures when your afternoon dip really lands and moves your plan to match.",
    features: [
      "22-step setup built from your wake, bed, caffeine and crash times",
      "Caffeine half-life & cutoff prediction",
      "After a short night, ARC adjusts your plan and caffeine cutoff for up to three days",
      "No account. Your log stays on your iPhone.",
    ],
    sections: [
      {
        heading: "A Day with ARC",
        paragraphs: [
          "The 22-step setup asks for your wake and bed times, work schedule, caffeine habits and when you usually crash. From that, ARC builds a day plan: light first, your peak hours protected for the hard task, a walk or rest block before the dip, and a caffeine cutoff that moves with every coffee you log.",
          "After about ten days of check-ins it stops taking your word for the dip and measures it. For the science behind the slump, see [why you crash at 2 PM](/blog/why-do-i-crash-at-2pm-afternoon-energy-drop-fix), and for arranging work around it, [planning your day around peak focus windows](/blog/peak-focus-windows-plan-day-around-biology).",
        ],
      },
      {
        heading: "Proof, Not Vibes",
        paragraphs: [
          "Trends shows your afternoon crashes per week and whether they're falling, from your own check-ins, plus what each habit changed. ARC can also run a five-day experiment on one change, like an earlier cutoff or a walk before the dip, and \"no difference\" is an allowed verdict.",
          "If caffeine is your main lever, the [caffeine half-life guide](/guides/caffeine-half-life-optimization-guide) explains why the same cup lands differently at 9 AM and 3 PM.",
        ],
      },
      {
        heading: "What ARC Won't Do",
        paragraphs: [
          "ARC isn't a calendar or a task manager, and it won't make a five-hour night feel like eight. It tells you when you're likely sharpest, and after a short night it adjusts the plan instead of pretending nothing happened.",
        ],
      },
    ],
    faqs: [WEARABLE_FAQ, PRIVACY_FAQ],
  },
  "shift-workers": {
    slug: "shift-workers",
    name: "Shift Workers",
    icon: "🌙",
    title: "Circadian Rhythm App for Shift Workers & Late Risers",
    h1Lead: "A circadian app for",
    description:
      "A 9-to-5 world wasn't built for your hours. ARC builds your day from your actual wake time, with notifications made for night-shift schedules.",
    painPoints: [
      "Constant fatigue from misaligned schedules",
      "Poor-quality daytime sleep",
      "Relying on caffeine at the wrong times",
      "Feeling judged for waking late",
    ],
    arcSolution:
      "ARC builds your day from your actual wake time, whenever that is. It doesn't tell you to wake at 5 AM; it plans light, caffeine and wind-down around your real start time.",
    features: [
      "Setup asks for your work schedule, wake time and bedtime",
      "Last safe coffee solved from the bedtime you set",
      "Wind-down reminder, plus a notification set for night-shift work",
      "One-tap check-ins that measure when your dip really lands",
    ],
    sections: [
      {
        heading: "Late Risers and Irregular Hours",
        paragraphs: [
          "Tell ARC your wake time, bedtime and work schedule during setup, and correct your wake time with one tap on days it guesses wrong. The plan follows your day: a 1 AM bedtime sits at the end of the list, and your last safe coffee is computed from that bedtime, not from a rule written for early birds.",
          "If your wake time drifts later over two weeks, ARC tells you. For weekend drift specifically, see the [social jetlag recovery guide](/guides/social-jetlag-recovery-guide).",
        ],
      },
      {
        heading: "If You Work Nights",
        paragraphs: [
          "ARC has a dedicated set of notifications for night-shift work, but it's honest to be clear about its limits: the morning light timer is built around the real sunrise, and ARC doesn't plan your daytime sleep after a night shift. Our [shift-worker survival guide](/guides/shift-worker-circadian-survival-guide) covers the commute home, daytime sleep and rotating back to days.",
          "Check how much debt a run of shifts has built with the free [sleep debt calculator](/tools/sleep-debt-calculator). And don't drive drowsy after a night shift: nap first, or take transit.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does ARC work for rotating shifts?",
        a: "Partly. It adapts to your wake time and has night-shift notifications, but it's built around a daytime-light world. If you rotate often, use it alongside the [shift-worker guide](/guides/shift-worker-circadian-survival-guide) rather than as a full rota planner.",
      },
      {
        q: "Will it tell me to wake up earlier?",
        a: "No. It works from your real wake time and bedtime, and moves the day's phases to match.",
      },
      PRIVACY_FAQ,
    ],
    disclaimer: MEDICAL_LINE,
  },
  "coffee-drinkers": {
    slug: "coffee-drinkers",
    name: "Coffee Drinkers",
    icon: "☕",
    title: "Caffeine Tracker App: Find Your Last Safe Coffee",
    h1Lead: "A caffeine tracker for",
    description:
      "Know your last safe coffee. ARC works it out from your bedtime, your caffeine sensitivity and every drink you log, aiming for under 50 mg at bedtime.",
    painPoints: [
      "Afternoon energy crashes despite drinking coffee",
      "Difficulty falling asleep on days you have late coffee",
      "Not knowing how much caffeine is still active at bedtime",
      "Guessing whether one more cup is OK",
    ],
    arcSolution:
      "ARC treats caffeine as a curve, not a rule. It asks whether you clear caffeine fast, average or slow (a half-life of about 4, 5.5 or 7 hours), tracks every drink you log, and tells you plainly when no cup fits before bed.",
    features: [
      "Live caffeine decay curve",
      "Last safe coffee, recalculated with every drink",
      "Cutoff widget for your Home and Lock Screen",
      "Drink logging by type",
    ],
    sections: [
      {
        heading: "How the Cutoff Works",
        paragraphs: [
          "There's no universal cutoff. For one average cup and an average metaboliser, caffeine takes roughly five hours to fall below 50 mg; a bigger cup, a slower metabolism, or an earlier coffee still in your system pushes that earlier. ARC works it out from your bedtime, how fast you clear caffeine, and everything you've logged today.",
          "The cutoff has three states: a countdown while you're ahead, passed once the time has gone, and no cup fits when even a small drink would still be above 50 mg at bedtime. The [caffeine half-life guide](/guides/caffeine-half-life-optimization-guide) goes through the math, and [when to stop drinking coffee](/blog/caffeine-timing-when-to-stop-drinking-coffee) covers the everyday version.",
        ],
      },
      {
        heading: "Why Coffee Sometimes Makes You More Tired",
        paragraphs: [
          "Caffeine blocks adenosine receptors; it doesn't clear adenosine. When it wears off, the tiredness that built up in the meantime comes back. More on that in [why coffee makes you tired](/blog/why-coffee-makes-you-tired-caffeine-tolerance-adenosine).",
          "ARC won't tell you to quit. If you want to lower your tolerance, our [7-day caffeine tolerance reset](/science/caffeine-tolerance-reset-protocol) is a step-down plan you can log in ARC as you go.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is the 50 mg target a medical threshold?",
        a: "No. It's a conservative target ARC uses so that little caffeine is left at bedtime. Sensitivity varies, which is why ARC asks how fast you clear caffeine.",
      },
      {
        q: "Is caffeine half-life the same for everyone?",
        a: "No: roughly 4 to 7 hours depending on the person (around 5 on average). Pregnancy and some medications can slow it considerably, and smoking speeds it up. If you're pregnant, ask your doctor or midwife about caffeine limits.",
      },
      PRIVACY_FAQ,
    ],
  },
  "sleep-seekers": {
    slug: "sleep-seekers",
    name: "Sleep Seekers",
    icon: "😴",
    title: "Better Sleep Starts in the Morning: A Circadian App",
    h1Lead: "Better timing for",
    description:
      "Still tired after 8 hours? Often it's timing, not just hours. ARC works on your mornings, caffeine and wind-down. If it persists, check with a doctor.",
    painPoints: [
      "Waking up groggy despite 8 hours of sleep",
      "Weekend lie-ins that make Monday worse",
      "Inconsistent bedtimes that ruin the week",
      "Anxiety about not being able to fall asleep",
    ],
    arcSolution:
      "ARC focuses on what you do while you're awake (morning light, caffeine timing, a steady wind-down), because those set when you get sleepy.",
    features: [
      "Log last night's sleep; after a short night, ARC adjusts the next few days",
      "20-minute morning light timer from your real sunrise",
      "Chronotype-aware wind-down reminder",
      "One sentence a day explaining why you feel the way you do",
    ],
    sections: [
      {
        heading: "Why Timing Matters",
        paragraphs: [
          "Two things decide when you get sleepy: sleep pressure, which builds while you're awake, and your body clock, which is set mostly by light. Morning light pulls the clock earlier, caffeine late in the day masks sleep pressure, and a bright evening pushes the clock later. The [Two-Process Model](/science/adenosine-clearance-afternoon-dip-protocol) explains how the two fit together.",
          "If you wake up tired even after a full night, [this post on sleep inertia](/blog/waking-up-tired-after-8-hours-sleep-inertia-fix) covers the usual causes.",
        ],
      },
      {
        heading: "A Week with ARC",
        paragraphs: [
          "Each morning, about 20 minutes outside: ARC's timer starts from your real sunrise and runs on your Lock Screen. Your last safe coffee updates with every cup, and a wind-down reminder lands before your bedtime.",
          "Log last night's sleep, and after a short night ARC adjusts the day plan and caffeine cutoff for up to three days, rather than leaving you to chase it with extra coffee. To see how much you're carrying, try the free [sleep debt calculator](/tools/sleep-debt-calculator).",
        ],
      },
      {
        heading: "When to See a Doctor",
        paragraphs: [
          "Persistent tiredness has medical causes too, including sleep apnea, thyroid problems, anaemia and depression. If you snore loudly, wake gasping, or feel exhausted most days despite enough sleep, talk to a doctor. Don't change any sleep medication without talking to your doctor first.",
        ],
      },
    ],
    faqs: [
      {
        q: "Does ARC track my sleep?",
        a: "Not automatically, and there's no sleep score ([here's why we removed it](/blog/why-we-removed-the-sleep-score)). You log hours and quality in a tap, and ARC uses that to adjust the next few days. It doesn't read Apple Health or a watch.",
      },
      {
        q: "Will ARC fix insomnia?",
        a: "No. It's a wellness app. If you have trouble sleeping at least three nights a week for three months, talk to a doctor: cognitive behavioural therapy for insomnia (CBT-I) is the first-line treatment.",
      },
      PRIVACY_FAQ,
    ],
    disclaimer: MEDICAL_LINE,
  },
  biohackers: {
    slug: "biohackers",
    name: "Biohackers",
    icon: "🧬",
    title: "Circadian Biohacking App: 5-Day Habit Experiments",
    h1Lead: "A habit-experiment app for",
    description:
      "Test one habit for five days and get an honest verdict, even 'no difference'. ARC measures your afternoon dip from your own check-ins. No wearable needed.",
    painPoints: [
      "Basic habit trackers lack scientific depth",
      "Wearables measure but don't tell you what to change",
      "Generic health advice doesn't account for individual differences",
      "Missing the connection between light, caffeine, and deep work",
    ],
    arcSolution:
      "ARC treats your habits as experiments: change one thing for five days, compare with the two weeks before, and keep what actually moved your energy.",
    features: [
      "Five-day single-habit experiments with honest verdicts",
      "Trends: crashes per week, dip timing, what each habit changed",
      "Schedule-drift detection",
      "No account. Your log stays on your iPhone.",
    ],
    sections: [
      {
        heading: "How the Experiments Work",
        paragraphs: [
          "ARC proposes one change (an earlier cutoff, morning light, a walk before the dip, rest at the dip, or a consistent wake time), runs it for five days, and scores it against the fortnight before using logs you've already made. \"No difference\" is a real verdict: it takes something off your list. Experiments are offered from day ten, once there's a baseline.",
          "One change at a time is the point. Change five things at once and you learn nothing you can keep, which is also why [generalised advice so often fails](/blog/personalized-schedules-why-generalized-advice-fails).",
        ],
      },
      {
        heading: "What Gets Measured",
        paragraphs: [
          "Energy check-ins (low, medium or high) are the outcome. From them, Trends shows afternoon crashes per week, when your dip lands (the median offset after waking), 14-day strips for morning light and cutoff held, and whether your wake time is drifting. At 28 days you get a then-vs-now report.",
          "ARC doesn't read Apple Health, connect to wearables, or measure cortisol, melatonin or light levels. It runs on one-tap logs. For the light side of the science, see the [morning sunlight guide](/guides/morning-sunlight-lux-protocol-guide).",
        ],
      },
    ],
    faqs: [
      {
        q: "Why is there no sleep score?",
        a: "Because a score is a verdict, and ARC tries to show mechanisms instead. [Here's the full reasoning](/blog/why-we-removed-the-sleep-score).",
      },
      WEARABLE_FAQ,
      PRIVACY_FAQ,
    ],
  },
};
