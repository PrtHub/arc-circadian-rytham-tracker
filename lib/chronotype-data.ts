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
  seoTitle: string;
  seoDescription: string;
  fullScheduleTable: Array<{
    time: string;
    phase: string;
    action: string;
    biology: string;
  }>;
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
    seoTitle: "Lion Chronotype Schedule: Early Riser Daily Routine (5:30 AM–10 PM) | ARC",
    seoDescription: "Ideal Lion chronotype schedule: 5:30–6:30 AM wake, 8:00 AM–12:00 PM peak focus, 12:00 PM coffee cutoff, and 10:00 PM sleep—plus how to beat late-afternoon fatigue.",
    fullScheduleTable: [
      { time: "05:30 AM – 06:00 AM", phase: "Natural Wake & Hydration", action: "Wake naturally without alarm. Drink 16–20 oz water with electrolytes to replenish overnight fluid loss.", biology: "Cortisol awakening response (CAR) initiates core body temperature climb." },
      { time: "06:00 AM – 06:45 AM", phase: "Outdoor Morning Light", action: "Step outdoors for 15–20 minutes of morning daylight exposure. Light movement or stretching.", biology: "Retinal melanopsin cells suppress melatonin and calibrate tonight's sleep onset timer." },
      { time: "07:00 AM – 07:30 AM", phase: "High-Protein Breakfast", action: "Eat a protein-rich meal (30g+ protein) including eggs, avocado, or clean protein smoothie.", biology: "Activates peripheral metabolic clocks in the gut and liver, anchoring daily metabolism." },
      { time: "07:30 AM – 08:00 AM", phase: "First Coffee Window", action: "Enjoy first cup of coffee or tea, delayed 90–120 minutes post-wake.", biology: "Prevents adenosine receptor disruption and avoids the late-morning energy slump." },
      { time: "08:00 AM – 10:00 AM", phase: "Deep Work Peak 1", action: "Highest-priority cognitive tasks: deep analytical writing, strategic design, critical decisions.", biology: "Prefrontal cortex alertness and executive vigilance reach daily biological maximum." },
      { time: "10:00 AM – 12:00 PM", phase: "Deep Work Peak 2", action: "Secondary focused execution: problem solving, coding, data analysis, or core project milestones.", biology: "High neurochemical focus persists before the midday core temperature plateau." },
      { time: "12:00 PM", phase: "Strict Caffeine Cutoff", action: "Final caffeinated beverage for the day. Switch strictly to water, herbal tea, or decaf.", biology: "Requires 10-hour clearance half-life window to ensure <50mg active caffeine at 10 PM bed." },
      { time: "12:30 PM – 01:30 PM", phase: "Balanced Lunch & Walk", action: "Nutrient-dense lunch with complex carbohydrates and healthy fats. Take a 10-minute stroll.", biology: "Gentle post-meal physical activity prevents heavy post-prandial blood sugar spikes." },
      { time: "01:30 PM – 03:00 PM", phase: "Collaborative Work & Admin", action: "Schedule group meetings, client calls, email triage, and routine administrative tasks.", biology: "Alertness transitions from deep analytical focus to broader collaborative vigilance." },
      { time: "03:00 PM – 04:30 PM", phase: "Afternoon Dip Recovery", action: "Take a 15-minute brisk outdoor walk, do a 20-minute NSDR protocol, or hydrate with cold water.", biology: "Counters the circadian alertness trough without turning to sleep-disrupting caffeine." },
      { time: "06:00 PM – 07:30 PM", phase: "Dinner & Relaxation", action: "Balanced, easily digestible dinner with family or friends. Begin disconnecting from work.", biology: "Core body temperature begins its evening downward trajectory, signalling rest." },
      { time: "08:30 PM – 10:00 PM", phase: "Wind-Down & Sleep", action: "Dim overhead lights to warm amber, screens away, read or journal. Asleep by 10:00 PM.", biology: "Pineal gland secretes melatonin into bloodstream, preparing for slow-wave deep sleep." },
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
    seoTitle: "Bear Chronotype Schedule: Hour-by-Hour Daily Routine (7 AM–11 PM) | ARC",
    seoDescription: "Ideal Bear chronotype schedule: 7:00 AM wake, 10:00 AM–2:00 PM deep work, 2:00 PM caffeine cutoff, and 11:00 PM bedtime—plus how to fix the 2 PM afternoon crash.",
    fullScheduleTable: [
      { time: "07:00 AM – 07:30 AM", phase: "Wake & Rehydration", action: "Wake up without snoozing. Drink 16 oz cool water with electrolytes to clear sleep inertia.", biology: "Cortisol awakening response (CAR) triggers autonomic sympathetic system activation." },
      { time: "07:30 AM – 08:00 AM", phase: "Morning Daylight Viewing", action: "Step outside for 20 minutes in natural morning sunlight without sunglasses.", biology: "Retinal ipRGC photoreceptors reset the central SCN pacemaker for a 16-hour wake cycle." },
      { time: "08:00 AM – 08:30 AM", phase: "Nutritious Breakfast", action: "High-protein, low-glycemic breakfast (eggs, oats, Greek yogurt, or protein shake).", biology: "Nutrient sensing entrains peripheral circadian clocks in liver and digestive organs." },
      { time: "08:30 AM – 09:00 AM", phase: "First Coffee Window", action: "First cup of coffee or caffeinated tea, delayed 90 minutes post-wake.", biology: "Waiting allows cortisol to surge naturally, preventing caffeine tolerance and midday crashes." },
      { time: "09:00 AM – 10:00 AM", phase: "Morning Warm-Up & Planning", action: "Review priority objectives, organize daily agenda, clear urgent messages and triage emails.", biology: "Cognitive vigilance steadily accelerates as core body temperature rises." },
      { time: "10:00 AM – 12:00 PM", phase: "Deep Work Peak 1", action: "Execute hardest analytical challenge: coding, strategic writing, quantitative problem solving.", biology: "Bear working memory bandwidth, mental clarity, and executive control reach daily zenith." },
      { time: "12:30 PM – 01:30 PM", phase: "Lunch & Solar Reset", action: "Wholesome lunch with balanced protein, fiber, and healthy fats. 10-minute outdoor stroll.", biology: "Circadian daylight boost counters post-meal lethargy and stabilizes glucose levels." },
      { time: "01:30 PM – 02:00 PM", phase: "Secondary Focus Window", action: "Collaborative check-ins, team syncs, creative reviews, or secondary problem solving.", biology: "Transition period before natural circadian dip begins." },
      { time: "02:00 PM", phase: "Hard Caffeine Cutoff", action: "Absolute last caffeinated beverage for the day. Switch to water or decaf tea.", biology: "9-hour clearance window ensures blood caffeine levels drop below 50 mg before 11 PM bed." },
      { time: "02:30 PM – 03:30 PM", phase: "Afternoon Slump Fix", action: "20-minute power nap or NSDR protocol, or brisk outdoor walk in sunlight with cold water.", biology: "Homeostatic sleep pressure temporarily crosses the circadian alertness signal (Two-Process Model)." },
      { time: "04:00 PM – 06:00 PM", phase: "Exercise & Daily Wrap-Up", action: "Resistance workout, cardio session, or wrapping up administrative tasks and emails.", biology: "Peak physical power, cardiovascular efficiency, and body temperature for athletic exertion." },
      { time: "09:30 PM – 11:00 PM", phase: "Digital Sunset & Bedtime", action: "Dim lights, switch off screens or use blue blockers, read in bed. In bed by 11:00 PM.", biology: "Pineal melatonin secretion peaks in darkness; core temperature drops for deep restorative sleep." },
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
        "If you can, negotiate a later start: 10 or 11 AM moves your working hours much closer to your biology. If you can't, get outdoor light as soon as you're up, save routine tasks for the morning, and protect the late afternoon for the work that needs your best brain. See our comprehensive [Wolf 9-to-5 corporate survival schedule](/chronotype/wolf-working-9-to-5) for an hour-by-hour corporate blueprint.",
        "Keep your weekend wake time within about an hour of your weekday one; long lie-ins push the clock later and make Monday worse ([more on social jetlag](/guides/social-jetlag-recovery-guide)). And don't read your mornings as a character flaw. A later clock is partly genetic, it's common, and it tends to be latest around age 20 before moving earlier with age (Roenneberg et al., 2004).",
      ],
    },
    arcForType:
      "ARC places a Wolf's phases late: a 1 AM bedtime sits at the end of your plan, not the start of it. Your last safe coffee is calculated from your actual bedtime rather than an early-bird rule, and the 20-minute morning light timer starts from your real sunrise and runs on your Lock Screen, so you can get outside without watching the clock.",
    related:
      "Read more: our [Wolf 9-to-5 corporate schedule](/chronotype/wolf-working-9-to-5), [why you wake up tired after 8 hours](/blog/waking-up-tired-after-8-hours-sleep-inertia-fix), the [morning sunlight protocol](/tools/sunlight-calculator), and our [chronotype schedule guide](/guides/chronotype-lifestyle-design-guide) for all four types.",
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
    seoTitle: "Wolf Chronotype Schedule: Night Owl Daily Routine (& 9-to-5 Survival) | ARC",
    seoDescription: "Ideal Wolf chronotype schedule: 8:30 AM wake, 4:00 PM–8:00 PM peak focus, 4:00 PM coffee cutoff, 12:30 AM bedtime—plus a realistic 9-to-5 adaptation timetable.",
    fullScheduleTable: [
      { time: "08:30 AM – 09:00 AM", phase: "Gradual Wake & Light", action: "Wake up with sunrise simulation alarm or natural light. Drink 16 oz cool water immediately.", biology: "Wolf core body temperature minimum lands later; gradual wake buffers severe sleep inertia." },
      { time: "09:00 AM – 09:30 AM", phase: "High-Lux Sunlight Viewing", action: "Step outside for 20–30 minutes of direct daylight or sit by 10,000 lux therapy light box.", biology: "High-intensity photons stimulate ipRGC cells, phase-advancing the delayed circadian clock." },
      { time: "09:30 AM – 10:30 AM", phase: "Gentle Morning Warm-Up", action: "Light stretching, low-stakes administrative check-in, reviewing daily calendar.", biology: "Prefrontal cortex activity is low during early morning; avoid complex high-stakes decisions." },
      { time: "10:30 AM – 11:00 AM", phase: "First Coffee Window", action: "First cup of coffee or cold brew, delayed a full 2 hours after waking.", biology: "Allows lingering overnight adenosine to clear naturally before caffeine binds to receptors." },
      { time: "11:00 AM – 01:00 PM", phase: "Steady Focus & Collaboration", action: "Meetings, structured project reviews, communication, and client touchpoints.", biology: "Cognitive alertness steadily ramps up as nervous system reaches operational baseline." },
      { time: "01:30 PM – 02:30 PM", phase: "Nutrient-Dense Lunch", action: "Substantial lunch with clean protein and complex carbohydrates. Take a brief outdoor walk.", biology: "Maintains sustained glucose delivery without triggering a severe post-prandial crash." },
      { time: "02:30 PM – 04:00 PM", phase: "Operational Work & Admin", action: "Complete operational checklists, code reviews, email inbox triage, and planning.", biology: "Alertness builds momentum toward the late-afternoon neurological surge." },
      { time: "04:00 PM", phase: "Strict Caffeine Cutoff", action: "Final sip of caffeinated beverages. Switch to sparkling water or herbal teas.", biology: "8.5-hour clearance window ensures circulating caffeine falls below 50mg by 12:30 AM bed." },
      { time: "04:30 PM – 07:30 PM", phase: "Peak Cognitive Flow (Golden Hours)", action: "Hardest, most creative, and demanding work: deep coding, complex writing, breakthrough thinking.", biology: "Wolf executive function, divergent creativity, and mental stamina reach their absolute daily peak." },
      { time: "07:30 PM – 08:45 PM", phase: "Workout & Dinner", action: "Strength workout, running, or exercise, followed by a balanced dinner.", biology: "Anaerobic power, muscle temperature, and pain tolerance are highest in evening chronotypes." },
      { time: "09:00 PM – 11:00 PM", phase: "Secondary Creative Window", action: "Unstructured creative exploration, passion projects, reading, or relaxing socialization.", biology: "Wolf cognitive stamina remains high while morning types are already exhausted." },
      { time: "11:00 PM – 12:30 AM", phase: "Deliberate Wind-Down & Sleep", action: "Switch screens off or use strong blue blockers, dim to amber light, warm shower, asleep by 12:30 AM.", biology: "Melatonin secretion occurs later in Wolves; deliberate dimness is mandatory to trigger sleepiness." },
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
    seoTitle: "Dolphin Chronotype Schedule: Light Sleeper Daily Routine (6:30 AM–11:30 PM) | ARC",
    seoDescription: "Ideal Dolphin chronotype schedule: 6:30 AM wake, 3:00 PM–7:00 PM peak focus, 1:00 PM caffeine cutoff, and a 10:00 PM wind-down protocol to calm racing thoughts.",
    fullScheduleTable: [
      { time: "06:30 AM – 07:00 AM", phase: "Wake Without Snoozing", action: "Wake up immediately without hitting snooze. Splash cold water on face, drink 16 oz water.", biology: "Avoiding fragmented micro-sleep cycles prevents morning autonomic anxiety spikes." },
      { time: "07:00 AM – 07:45 AM", phase: "Gentle Sunlight & Movement", action: "Take a 20-minute gentle outdoor walk in morning sunlight. Light yoga or stretching.", biology: "Suppresses melatonin while calming basal autonomic nervous system arousal." },
      { time: "07:45 AM – 08:30 AM", phase: "High-Protein, Low-Sugar Breakfast", action: "Low-glycemic meal: eggs, avocado, smoked salmon, or Greek yogurt. Avoid sugary pastries.", biology: "Prevents rapid glucose spikes that trigger reactive adrenaline surges in sensitive sleepers." },
      { time: "08:30 AM – 09:15 AM", phase: "Moderate Caffeine Window", action: "Single cup of coffee or matcha green tea (contains calming L-theanine).", biology: "L-theanine buffers caffeine jitteriness by modulating GABA receptors in high-arousal individuals." },
      { time: "09:15 AM – 12:00 PM", phase: "Structured Low-Friction Admin", action: "Checklist-driven tasks: answering emails, scheduling, clearing invoices, routine admin.", biology: "Dolphin morning cognition is often scattered; structured routines provide focus scaffolding." },
      { time: "12:00 PM – 01:00 PM", phase: "Mindful Lunch Away From Screens", action: "Light, balanced lunch away from computer screens. Brief outdoor stroll in fresh air.", biology: "Lowers sensory cognitive load and resets sympathetic nervous tone." },
      { time: "01:00 PM", phase: "Strict Caffeine Cutoff", action: "Absolute caffeine cutoff (including decaf with trace caffeine, energy teas, and dark chocolate).", biology: "Dolphins metabolize stimulants slower; a 10.5-hour clearance window is required for sleep." },
      { time: "01:30 PM – 02:30 PM", phase: "Parasympathetic Reset / NSDR", action: "20 minutes of Non-Sleep Deep Rest (NSDR), body scan meditation, or box breathing.", biology: "Restores energy without deep slow-wave sleep, preventing post-nap sleep inertia." },
      { time: "03:00 PM – 07:00 PM", phase: "Peak Cognitive Window", action: "Deep analytical work, strategic writing, high-value problem solving, creative synthesis.", biology: "Dolphin mental alertness consolidates and anxiety drops as day progresses, unlocking peak focus." },
      { time: "07:00 PM – 08:30 PM", phase: "Restorative Movement & Light Dinner", action: "Gentle walk or restorative yoga, followed by a light, easy-to-digest dinner.", biology: "Prevents gastrointestinal distress and core body temperature elevation near bedtime." },
      { time: "08:30 PM – 10:00 PM", phase: "Brain Dump & Device Disconnect", action: "Write tomorrow's to-do list (Scullin protocol), close laptop, put phone in another room.", biology: "Offloads cognitive loops and rumination onto paper to halt bedtime prefrontal racing." },
      { time: "10:00 PM – 11:30 PM", phase: "Amber Wind-Down Protocol", action: "Warm bath or shower, dim warm amber ambient lighting, read physical book, asleep by 11:30 PM.", biology: "Vasodilation from warm bath accelerates core temperature drop, inducing natural sleep onset." },
    ],
  },
};
