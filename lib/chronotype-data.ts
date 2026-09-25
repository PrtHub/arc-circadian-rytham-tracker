export interface ChronotypeDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  /** Breus's estimate, shown as "Breus estimates ~X of people". */
  populationPercentage: string;
  idealSchedule: {
    wake: string;
    focus: string;
    /** Rule of thumb only; the page footnotes it with the standard caffeine wording. */
    caffeineCutoff: string;
    windDown: string;
    sleep: string;
  };
  /** Chronotype-specific caffeine note shown under the schedule. */
  caffeineNote: string;
  lightNote: string;
  signs: string[];
  sampleDay: { time: string; activity: string }[];
  deepDive: { heading: string; paragraphs: string[] };
  arcForType: string;
  /** Contextual links, written as [text](/path). */
  related: string;
  strengths: string[];
  challenges: string[];
  faqs: { q: string; a: string }[];
}

const breusFaq = (name: string) => ({
  q: `Is the ${name} chronotype scientific?`,
  a: `Lion, Bear, Wolf and Dolphin are sleep psychologist Dr. Michael Breus's popular labels from his book The Power of When, not a clinical diagnosis. The science underneath is real: people differ in how early or late their body clock runs, partly for genetic reasons, and researchers such as Till Roenneberg measure it on a continuous scale rather than in four boxes. Treat "${name}" as useful shorthand for where you sit on that scale.`,
});

export const chronotypeDetails: Record<string, ChronotypeDetail> = {
  lion: {
    slug: "lion",
    name: "Lion",
    icon: "🦁",
    tagline: "The Early Riser",
    description:
      "Lions wake early without much effort and do their best thinking before noon. Energy is high in the morning and fades by late afternoon, so evenings are for winding down.",
    populationPercentage: "15–20%",
    idealSchedule: {
      wake: "5:30 AM - 6:30 AM",
      focus: "8:00 AM - 12:00 PM",
      caffeineCutoff: "~5 h before bed",
      windDown: "8:30 PM",
      sleep: "10:00 PM",
    },
    caffeineNote:
      "With a 10 PM bedtime, one average cup finished by about 5 PM is usually below 50 mg by bed. Most Lions don't need it that late: their energy is front-loaded, and a late-afternoon coffee mostly fights the natural wind-down.",
    lightNote:
      "Lions are often up around sunrise. Get about 20 minutes of outdoor light once it's light out (longer under heavy cloud; never look directly at the sun). If you'd like to shift a little later, some outdoor light in the late afternoon helps more than extra morning light.",
    signs: [
      "You wake before your alarm, even on weekends",
      "Your sharpest hours are before lunch",
      "You're fading by 9 PM, and late events feel like work",
      "Sleeping in past 7 AM rarely happens",
    ],
    sampleDay: [
      { time: "5:45 AM", activity: "Wake, usually without the alarm" },
      { time: "6:30 AM", activity: "About 20 minutes of outdoor light and movement" },
      { time: "7:00 AM", activity: "First coffee, if you drink it" },
      { time: "8:00 AM - 12:00 PM", activity: "Hardest work: strategy, writing, decisions" },
      { time: "1:00 - 3:00 PM", activity: "Meetings and admin" },
      { time: "3:00 - 4:00 PM", activity: "Energy fades; a short walk beats another coffee" },
      { time: "8:30 PM", activity: "Wind down: dim the room, screens away" },
      { time: "10:00 PM", activity: "Sleep" },
    ],
    deepDive: {
      heading: "Living as a Lion in a 9-to-5",
      paragraphs: [
        "A 9-to-5 suits Lions better than most, but the day runs back to front: your best hours are half gone by the time the office warms up, and the afternoon meetings land when you're fading. Protect the first two or three hours of the workday for your hardest task, and push collaborative work later.",
        "Evening plans are the real friction. A late night costs a Lion more than it costs a Wolf, because the early wake-up tends to happen anyway. If a late event is unavoidable, keep the next morning's wake time close to normal and take a short nap (20 minutes or less) in the early afternoon rather than sleeping in.",
      ],
    },
    arcForType:
      "For a Lion, ARC starts the day's phases early: the light window opens at your real sunrise, your peak comes first, and the one next step at the top of your plan is usually the hard task, before lunch. After about ten days of check-ins, ARC measures when your afternoon dip really lands and moves your plan to match.",
    related:
      "Read more: [what a chronotype is](/blog/what-is-a-chronotype-lion-bear-wolf-dolphin), our [chronotype schedule guide](/guides/chronotype-lifestyle-design-guide) for all four types, and [our summary of The Power of When](/books/the-power-of-when).",
    strengths: [
      "High morning productivity",
      "Consistent energy early in the day",
      "Natural goal-getters",
    ],
    challenges: [
      "Late afternoon fatigue",
      "Difficulty staying awake for evening social events",
      "Rigid sleep needs",
    ],
    faqs: [
      {
        q: "Can a Lion chronotype shift their schedule later?",
        a: "A little. Morning types tend to have earlier body clocks, partly for genetic reasons (PER3 is one gene linked to it). Some outdoor light in the late afternoon can nudge you later, but your body-temperature low will still tend to wake you early, so pushing bedtime back usually costs sleep rather than moving it.",
      },
      {
        q: "What is the best work schedule for a Lion?",
        a: "Lions tend to do well in morning-heavy roles. Put the hardest thinking before noon, keep meetings and admin for the early afternoon, and don't schedule demanding work for the evening.",
      },
      breusFaq("Lion"),
    ],
  },
  bear: {
    slug: "bear",
    name: "Bear",
    icon: "🐻",
    tagline: "The Solar Rhythm",
    description:
      "Bears follow the sun: awake soon after it's light, sleepy a few hours after dark. The most common type, it fits a typical 9-to-5 better than most, apart from a clear mid-afternoon slump.",
    populationPercentage: "50%",
    idealSchedule: {
      wake: "7:00 AM",
      focus: "10:00 AM - 2:00 PM",
      caffeineCutoff: "~5 h before bed",
      windDown: "9:30 PM",
      sleep: "11:00 PM",
    },
    caffeineNote:
      "With an 11 PM bedtime, one average cup finished by about 6 PM is usually below 50 mg by bed. In practice many Bears find mid-afternoon a sensible default, because the 2 PM slump tempts a second or third cup, and those add up.",
    lightNote:
      "Get about 20 minutes of outdoor light within an hour or so of waking (longer under heavy cloud; a window cuts most of the useful light, and never look directly at the sun). It keeps a Bear's clock from sliding later, especially after a late weekend.",
    signs: [
      "You wake around 7 without much of a fight",
      "Your focus peaks mid-morning",
      "You hit a wall somewhere around 2 to 3 PM",
      "You feel best on 7 to 8 hours and notice when you get less",
      "Late weekends leave you groggy on Monday",
    ],
    sampleDay: [
      { time: "7:00 AM", activity: "Wake; about 20 minutes of outdoor light" },
      { time: "8:00 AM", activity: "First coffee, if you drink it" },
      { time: "10:00 AM - 12:00 PM", activity: "Deep work: your logical peak" },
      { time: "12:30 PM", activity: "Lunch" },
      { time: "2:00 - 3:00 PM", activity: "The slump: a nap of 20 minutes or less, or a short walk outside" },
      { time: "3:00 - 5:00 PM", activity: "Collaborative work, meetings, brainstorming" },
      { time: "5:00 - 6:00 PM", activity: "Exercise, if it fits" },
      { time: "9:30 PM", activity: "Wind down: dim the lights" },
      { time: "11:00 PM", activity: "Sleep" },
    ],
    deepDive: {
      heading: "The Bear Afternoon Slump (and the Weekend Trap)",
      paragraphs: [
        "Bears often feel a dip between about 2 and 3 PM. It's normal: sleep pressure has been building since you woke, and your body clock's alerting signal eases off for a while in the early afternoon. More caffeine hides it for a few hours; a nap of 20 minutes or less, or a short walk outdoors, handles it without touching tonight's sleep. The [Two-Process Model](/science/adenosine-clearance-afternoon-dip-protocol) explains why it happens.",
        "The other Bear trap is the weekend. Two late nights and two lie-ins shift your clock later, so Monday's alarm goes off while your body still thinks it's early morning. That's [social jetlag](/blog/what-is-social-jetlag). Keeping your weekend wake time within about an hour of your weekday one limits it.",
      ],
    },
    arcForType:
      "For a Bear, ARC's biggest job is the afternoon. It asks for one-tap energy check-ins, and after about ten days (roughly four afternoon check-ins) it measures when your dip really lands and moves the walk or rest block in your plan to match. If your wake time starts drifting later over two weeks, ARC tells you.",
    related:
      "Read more: [why you crash at 2 PM](/blog/why-do-i-crash-at-2pm-afternoon-energy-drop-fix), [how to nap without waking up groggy](/blog/power-of-naps-science-of-siesta), and our [chronotype schedule guide](/guides/chronotype-lifestyle-design-guide) for all four types.",
    strengths: [
      "Steady, reliable energy",
      "Fits well with standard societal schedules",
      "Good team players",
    ],
    challenges: [
      "Mid-afternoon slump around 2 PM",
      "Susceptible to 'social jetlag' on weekends",
      "Needs full 8 hours",
    ],
    faqs: [
      {
        q: "Can a Bear shift to a Wolf schedule?",
        a: "Somewhat, but it costs. Bears who stay up late while still waking early for work build up sleep debt and tend to feel the afternoon slump harder. If you need a later schedule, shift gradually, move your light exposure later with it, and keep the wake time consistent, weekends included.",
      },
      {
        q: "How many hours of sleep does a Bear need?",
        a: "Most adults need 7 to 9 hours, and Breus describes Bears as feeling it quickly when they get less. Six hours a night adds up for everyone, not just Bears: in a lab study, two weeks of it impaired attention about as much as a night without sleep, and people didn't notice how impaired they were (Van Dongen et al., 2003).",
      },
      breusFaq("Bear"),
    ],
  },
  wolf: {
    slug: "wolf",
    name: "Wolf",
    icon: "🐺",
    tagline: "The Night Owl",
    description:
      "Wolves struggle to wake early and don't reach their mental peak until late afternoon or evening. Morning grogginess isn't laziness: it's a later body clock meeting an early alarm.",
    populationPercentage: "15–20%",
    idealSchedule: {
      wake: "8:30 AM - 9:00 AM",
      focus: "4:00 PM - 8:00 PM",
      caffeineCutoff: "~5 h before bed",
      windDown: "11:00 PM",
      sleep: "12:00 AM - 1:00 AM",
    },
    caffeineNote:
      "With a midnight-to-1 AM bedtime, a Wolf's cutoff falls later than other types: one average cup finished by about 7 PM is usually down to around 50 mg by midnight, and lower still by 1 AM. The catch is the early alarm. If you're up at 7 for a 9-to-5 and drink coffee all day to push through, the cutoff arrives sooner, because every earlier cup is still partly in your system.",
    lightNote:
      "Morning light is the most useful lever a Wolf has: about 20 minutes outdoors soon after waking helps pull the clock earlier (longer under heavy cloud; never look directly at the sun). Bright screens late at night do the opposite, so dim things in the last hour or two before bed.",
    signs: [
      "Your alarm feels brutal no matter when you went to bed",
      "You're not properly awake until late morning",
      "Ideas and energy show up after dinner",
      "Given a free week, you'd sleep from about 1 AM to 9 AM",
      "Weekends drift later and Mondays hurt",
    ],
    sampleDay: [
      { time: "8:30 AM", activity: "Wake; about 20 minutes of outdoor light" },
      { time: "9:30 AM", activity: "First coffee, once the grogginess lifts" },
      { time: "10:00 AM - 12:00 PM", activity: "Email, admin, routine tasks" },
      { time: "1:00 PM", activity: "Lunch" },
      { time: "4:00 - 7:00 PM", activity: "Peak: your hardest or most creative work" },
      { time: "7:00 PM", activity: "Exercise or a walk" },
      { time: "11:00 PM", activity: "Wind down: dim the lights, screens down" },
      { time: "12:30 AM", activity: "Sleep" },
    ],
    deepDive: {
      heading: "Surviving a 9-to-5 as a Wolf",
      paragraphs: [
        "If you can, negotiate a later start: 10 or 11 AM moves your working hours much closer to your biology. If you can't, get outdoor light as soon as you're up, save routine tasks for the morning, and protect the late afternoon for the work that needs your best brain.",
        "Keep your weekend wake time within about an hour of your weekday one; long lie-ins push the clock later and make Monday worse ([more on social jetlag](/guides/social-jetlag-recovery-guide)). And don't read your mornings as a character flaw. A later clock is partly genetic, it's common, and it tends to be latest around age 20 before moving earlier with age (Roenneberg et al., 2004).",
      ],
    },
    arcForType:
      "ARC places a Wolf's phases late: a 1 AM bedtime sits at the end of your plan, not the start of it. Your last safe coffee is calculated from your actual bedtime rather than an early-bird rule, and the 20-minute morning light timer starts from your real sunrise and runs on your Lock Screen, so you can get outside without watching the clock.",
    related:
      "Read more: [why you wake up tired after 8 hours](/blog/waking-up-tired-after-8-hours-sleep-inertia-fix), the [morning sunlight guide](/guides/morning-sunlight-lux-protocol-guide), and our [chronotype schedule guide](/guides/chronotype-lifestyle-design-guide) for all four types.",
    strengths: [
      "High creativity in the evening",
      "Can push through late-night deadlines",
      "Adaptable to irregular schedules",
    ],
    challenges: [
      "Waking up early",
      "Brain fog in the morning",
      "Out of sync with the 9-to-5 world",
    ],
    faqs: [
      {
        q: "Am I lazy if I struggle to wake up at 7:00 AM?",
        a: "No. Wolves have a later body clock. At 7 AM a Wolf is often waking close to their body-temperature low point, when grogginess (sleep inertia) is strongest. That's timing, not character.",
      },
      {
        q: "How can a Wolf survive a standard 9-to-5 schedule?",
        a: "Get about 20 minutes of outdoor light as soon as you can after waking to pull your clock earlier, keep screens dim late at night, and put your most demanding work in the late afternoon, when your energy naturally rises. ARC's 20-minute light timer starts from your real sunrise and runs on your Lock Screen.",
      },
      {
        q: "Can a Wolf become a morning person?",
        a: "Partly. Consistent morning light and a fixed wake time, weekends included, can move a Wolf's clock noticeably earlier. Most Wolves stay later than average, though, because chronotype is partly genetic. It does tend to move earlier with age.",
      },
      breusFaq("Wolf"),
    ],
  },
  dolphin: {
    slug: "dolphin",
    name: "Dolphin",
    icon: "🐬",
    tagline: "The Light Sleeper",
    description:
      "Breus describes Dolphins as light, easily woken sleepers with busy minds at night. Energy tends to be uneven in the morning, with focus settling from mid-afternoon.",
    populationPercentage: "10%",
    idealSchedule: {
      wake: "6:30 AM",
      focus: "3:00 PM - 7:00 PM",
      caffeineCutoff: "~5 h before bed",
      windDown: "10:00 PM",
      sleep: "11:30 PM",
    },
    caffeineNote:
      "With an 11:30 PM bedtime, one average cup finished by about 6:30 PM would usually be below 50 mg by bed. Dolphins are light sleepers, though, so start conservatively: keep to one or two cups early in the day. If caffeine seems to linger for you, choosing the slow setting in ARC moves your cutoff earlier.",
    lightNote:
      "About 20 minutes of outdoor light each morning (longer under heavy cloud; never look directly at the sun) gives a Dolphin's clock a clear, consistent signal. A steady wake time, even after a bad night, matters more than trying to catch up with a lie-in.",
    signs: [
      "You wake at small noises and take a while to drop off",
      "You often wake before your alarm and can't get back to sleep",
      "Your mind gets busy at bedtime",
      "Mornings feel uneven, and you settle into focus later in the day",
    ],
    sampleDay: [
      { time: "6:30 AM", activity: "Wake at the same time, even after a rough night" },
      { time: "7:00 AM", activity: "About 20 minutes of outdoor light and gentle movement" },
      { time: "8:00 AM", activity: "First (and maybe only) coffee" },
      { time: "10:00 AM - 12:00 PM", activity: "Routine work; don't expect peak focus yet" },
      { time: "3:00 - 7:00 PM", activity: "Your steadiest focus" },
      { time: "7:00 PM", activity: "Low-stimulation evening: light dinner, no heavy news" },
      { time: "10:00 PM", activity: "Wind down; write tomorrow's to-do list" },
      { time: "11:30 PM", activity: "Sleep" },
    ],
    deepDive: {
      heading: "Calming a Dolphin's Evenings",
      paragraphs: [
        "Real dolphins sleep with one half of the brain at a time while the other stays alert, which is where Breus got the name. Human Dolphins tend to need more time than others to wind down. Keep evenings low-stimulation (no intense news, hard conversations or complex work late), avoid heavy dinners, and dim the lights for the last couple of hours.",
        "Try writing tomorrow's to-do list before bed. In one sleep-lab study, people who did that fell asleep faster than people who wrote about what they'd already done (Scullin et al., 2018). If you have trouble sleeping at least three nights a week for three months, talk to a doctor: cognitive behavioural therapy for insomnia (CBT-I) is the first-line treatment.",
      ],
    },
    arcForType:
      "ARC won't treat insomnia; it's a wellness app, not a medical device. What it does for a Dolphin is keep the timing steady: a consistent light window from your real sunrise, a wind-down reminder before bed, and a caffeine cutoff that moves earlier if you tell it you clear caffeine slowly. After a short night, ARC adjusts the day plan instead of leaving you to guess.",
    related:
      "Read more: [stress, cortisol and trouble falling asleep](/blog/stress-cortisol-sleep-onset-insomnia), [building an evening wind-down](/blog/the-3rd-half-evening-wind-down-ritual), and the [evening light and melatonin guide](/guides/evening-blue-light-melatonin-defense-guide).",
    strengths: [
      "Attention to detail",
      "Can function on less sleep if necessary",
      "Perfectionistic drive",
    ],
    challenges: [
      "Light, easily broken sleep",
      "Anxious energy",
      "Hard time winding down at night",
    ],
    faqs: [
      {
        q: "Why do Dolphins have trouble sleeping?",
        a: "Breus describes Dolphins as light, easily woken sleepers who stay mentally alert at night. That's a description, not a diagnosis. If you have trouble sleeping at least three nights a week for three months, talk to a doctor: CBT-I (cognitive behavioural therapy for insomnia) is the first-line treatment.",
      },
      {
        q: "Should Dolphins take melatonin supplements?",
        a: "Melatonin is mainly a timing signal rather than a sedative, and when it's used, low doses (0.5 to 1 mg) are common. Dimming lights for the last couple of hours before bed helps too. Evidence for supplements like L-theanine and magnesium is weaker than for melatonin. Talk to a doctor or pharmacist before starting any sleep supplement, especially if you're pregnant, breastfeeding or take medication, and don't give melatonin to children without medical advice.",
      },
      breusFaq("Dolphin"),
    ],
  },
};
