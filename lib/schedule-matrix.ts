import { formatClock } from "@/lib/time";
import { halfLifeFor, hoursToClear } from "@/lib/caffeine";
import { CYCLE_MINS, FALL_ASLEEP_MINS } from "@/lib/sleep-times";

export const SCHEDULE_WAKE_MINUTES: number[] = [
  4 * 60 + 30, // 4:30 AM
  5 * 60,      // 5:00 AM
  5 * 60 + 30, // 5:30 AM
  6 * 60,      // 6:00 AM
  6 * 60 + 30, // 6:30 AM
  7 * 60,      // 7:00 AM
  7 * 60 + 30, // 7:30 AM
  8 * 60,      // 8:00 AM
  8 * 60 + 30, // 8:30 AM
  9 * 60,      // 9:00 AM
  9 * 60 + 30, // 9:30 AM
  10 * 60,     // 10:00 AM
  10 * 60 + 30,// 10:30 AM
  11 * 60,     // 11:00 AM
];

const DAY = 24 * 60;
const norm = (m: number) => ((m % DAY) + DAY) % DAY;

export function scheduleSlug(minutes: number): string {
  const m = norm(minutes);
  const h24 = Math.floor(m / 60);
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  const mins = m % 60;
  return `wake-up-at-${h12}${mins ? `-${String(mins).padStart(2, "0")}` : ""}${h24 < 12 ? "am" : "pm"}`;
}

export function parseScheduleSlug(slug: string): number | null {
  const match = slug.match(/^wake-up-at-(\d{1,2})(?:-(\d{2}))?(am|pm)$/);
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2] ?? 0);
  if (h < 1 || h > 12 || m > 59) return null;
  const total = ((h % 12) + (match[3] === "pm" ? 12 : 0)) * 60 + m;
  return SCHEDULE_WAKE_MINUTES.includes(total) ? total : null;
}

export function scheduleTimeLabel(minutes: number): string {
  return formatClock(minutes).replace(":00 ", " ");
}

export interface ScheduleEvent {
  timeStr: string;
  icon: string;
  name: string;
  category: "Morning" | "Focus" | "Metabolic" | "Rest" | "Evening" | "Night";
  detail: string;
  science: string;
}

export interface CaffeineCurfewItem {
  metabolizer: "Slow" | "Average" | "Fast";
  halfLife: number;
  cutoffTime: string;
  detail: string;
}

export interface BeverageCutoff {
  drink: string;
  mg: number;
  cutoffTime: string;
  hoursBeforeBed: number;
}

export interface MealWindow {
  name: string;
  timeStr: string;
  primaryGoal: string;
  macronutrients: string;
  circadianImpact: string;
}

export interface ResearchCitation {
  authors: string;
  year: number;
  title: string;
  journal: string;
  finding: string;
}

export interface DailyScheduleData {
  wakeMinutes: number;
  wakeLabel: string;
  slug: string;
  bedtime5Cycles: string;
  bedtime6Cycles: string;
  firstCoffee: string;
  morningLight: string;
  peakFocus: string;
  afternoonDip: string;
  exerciseWindow: string;
  windDown: string;
  events: ScheduleEvent[];
  caffeineCurfews: CaffeineCurfewItem[];
  beverageCutoffs: BeverageCutoff[];
  mealWindows: MealWindow[];
  citations: ResearchCitation[];
  chronotypeNotes: {
    lion: string;
    bear: string;
    wolf: string;
    dolphin: string;
  };
  narratives: {
    heroLead: string;
    awakeningScience: string;
    deepWorkScience: string;
    dipScience: string;
    caffeinePharmacokinetics: string;
    eveningWindDownScience: string;
    socialJetlagStrategy: string;
    seasonalLightStrategy: string;
    gradualTransitionPlan: string;
  };
  faqs: { q: string; a: string }[];
}

export function buildScheduleData(wake: number): DailyScheduleData {
  const t = scheduleTimeLabel(wake);
  const slug = scheduleSlug(wake);

  // Bedtimes for 5 cycles (7.5h sleep + 15m fall asleep = 465m) and 6 cycles (9h sleep + 15m = 555m)
  const bed5 = norm(wake - (5 * CYCLE_MINS + FALL_ASLEEP_MINS));
  const bed6 = norm(wake - (6 * CYCLE_MINS + FALL_ASLEEP_MINS));

  // Key relative milestones
  const lightStart = norm(wake + 15);
  const lightEnd = norm(wake + 35);
  const coffeeTime = norm(wake + 90);
  const focusStart = norm(wake + 2 * 60 + 30);
  const focusEnd = norm(wake + 5 * 60 + 30);
  const lunchStart = norm(wake + 6 * 60);
  const dipStart = norm(wake + 7 * 60);
  const dipEnd = norm(wake + 8 * 60 + 30);
  const exerciseStart = norm(wake + 9 * 60 + 30);
  const exerciseEnd = norm(wake + 11 * 60);
  const dinnerTime = norm(bed5 - 3 * 60);
  const windDownTime = norm(bed5 - 60);

  // Caffeine Curfews based on 50mg threshold
  const slowClearHours = hoursToClear(95, halfLifeFor("slow")); // 7h
  const avgClearHours = hoursToClear(95, halfLifeFor("normal")); // 5.5h
  const fastClearHours = hoursToClear(95, halfLifeFor("fast")); // 4h

  const slowCutoff = norm(bed5 - Math.round(slowClearHours * 60));
  const avgCutoff = norm(bed5 - Math.round(avgClearHours * 60));
  const fastCutoff = norm(bed5 - Math.round(fastClearHours * 60));

  // Specific beverage cutoffs for average metabolizer (5.5h)
  const drinks = [
    { name: "Double Espresso", mg: 126 },
    { name: "Drip Coffee (8 oz)", mg: 95 },
    { name: "Cold Brew (16 oz)", mg: 200 },
    { name: "Matcha / Green Tea", mg: 70 },
    { name: "Energy Drink", mg: 160 },
  ];

  const beverageCutoffs: BeverageCutoff[] = drinks.map((d) => {
    const hours = hoursToClear(d.mg, 5.5);
    const cutoff = norm(bed5 - Math.round(hours * 60));
    return {
      drink: d.name,
      mg: d.mg,
      cutoffTime: formatClock(cutoff),
      hoursBeforeBed: Math.round(hours * 10) / 10,
    };
  });

  const events: ScheduleEvent[] = [
    {
      timeStr: formatClock(wake),
      icon: "⏰",
      name: "Wake Up & Biological Ignition",
      category: "Morning",
      detail: "Get out of bed within 60 seconds of your alarm. Drink 500 mL of room-temperature water with a pinch of sea salt or electrolytes.",
      science: "Sleep inertia begins dissipating as adenosine deaminase clears leftover adenosine. Core body temperature turns upward from its 24-hour nadir (Tmin), and the Cortisol Awakening Response (CAR) initiates adrenal activation.",
    },
    {
      timeStr: `${formatClock(lightStart)} – ${formatClock(lightEnd)}`,
      icon: "☀️",
      name: "20-Min Outdoor Sunlight Anchor",
      category: "Morning",
      detail: "Step outside into natural daylight without sunglasses. Even on overcast or rainy mornings, outdoor lux reaches 2,500 to 10,000+ lux (indoor bulbs only emit 300–500 lux).",
      science: "Photons stimulate melanopsin-containing intrinsically photosensitive retinal ganglion cells (ipRGCs). These cells fire direct action potentials along the retinohypothalamic tract to the master clock (SCN), extinguishing melatonin and locking in your nighttime sleep gate.",
    },
    {
      timeStr: formatClock(coffeeTime),
      icon: "☕",
      name: "First Coffee (The 90-Minute Delay)",
      category: "Metabolic",
      detail: "Enjoy your first caffeinated beverage. Waiting 90 minutes after your alarm allows your endogenous cortisol to peak and clears sleep inertia.",
      science: "Caffeine acts as an adenosine receptor antagonist (blocking A1 and A2A receptors). If consumed immediately upon waking when adenosine is still clearing, it masks adenosine temporarily, causing a severe rebound crash at 10:30 AM.",
    },
    {
      timeStr: `${formatClock(focusStart)} – ${formatClock(focusEnd)}`,
      icon: "🧠",
      name: "Peak Focus & Deep Work Block",
      category: "Focus",
      detail: "Block out all low-value distractions. Dedicate these 3 hours to your highest-leverage cognitive output: deep strategy, architecture, coding, writing, or analysis.",
      science: "Prefrontal cortex glucose metabolism, working memory capacity, and high-frequency beta wave synchronization reach their diurnal peak as core body temperature rises toward midday.",
    },
    {
      timeStr: `${formatClock(lunchStart)} – ${formatClock(lunchStart + 45)}`,
      icon: "🥗",
      name: "Low-Glycemic Lunch & Metabolic Reset",
      category: "Metabolic",
      detail: "Eat a nutrient-dense lunch prioritizing 30g+ of lean protein, healthy fats, and prebiotic fiber. Avoid refined flours, pasta, pizzas, and sugary beverages.",
      science: "High-glycemic meals cause rapid insulin spikes followed by reactive hypoglycemia, drastically worsening the upcoming natural circadian dip.",
    },
    {
      timeStr: `${formatClock(dipStart)} – ${formatClock(dipEnd)}`,
      icon: "📉",
      name: "Afternoon Circadian Dip & NSDR",
      category: "Rest",
      detail: "Acknowledge the biological lull. Take a 15-minute outdoor walk, do 15 minutes of Non-Sleep Deep Rest (NSDR), or take a 20-minute power nap. Do NOT drink coffee.",
      science: "In Borbély's Two-Process Model, the circadian alerting drive (Process C) experiences an endogenous post-prandial dip between 7 and 8 hours post-wake, coinciding with a temporary drop in core body temperature.",
    },
    {
      timeStr: formatClock(avgCutoff),
      icon: "🛑",
      name: "Last Safe Coffee (Average Metabolizer)",
      category: "Metabolic",
      detail: `Your strict caffeine cutoff for tonight's ${formatClock(bed5)} bedtime. Switch to decaf, herbal tea, or water after this minute.`,
      science: "With an average elimination half-life of 5.5 hours, an 8 oz coffee consumed now leaves roughly 47 mg of active caffeine at bedtime, which is the ceiling for preventing slow-wave sleep disruption.",
    },
    {
      timeStr: `${formatClock(exerciseStart)} – ${formatClock(exerciseEnd)}`,
      icon: "🏃",
      name: "Physical Performance & Exercise Peak",
      category: "Focus",
      detail: "Ideal window for strength training, cardiovascular intervals, resistance workouts, or demanding sports.",
      science: "Human core body temperature, pulmonary function, neuromuscular reflex velocity, and grip strength peak between 9 and 11 hours after waking.",
    },
    {
      timeStr: formatClock(dinnerTime),
      icon: "🍽️",
      name: "Dinner (3 Hours Before Bed)",
      category: "Metabolic",
      detail: "Finish your evening meal 3 hours prior to lights out. Moderate complex carbohydrates here promote tryptophan uptake, aiding serotonin and melatonin synthesis.",
      science: "Late dinners force cardiac output toward splanchnic digestion, elevating nocturnal resting heart rate and suppressing the nighttime dip in core body temperature.",
    },
    {
      timeStr: formatClock(windDownTime),
      icon: "🌙",
      name: "The 3-2-1 Wind-Down Protocol",
      category: "Evening",
      detail: "Dim ambient household lighting below 50 lux. Turn off overhead LEDs, put away work screens, and activate red/amber lighting.",
      science: "Dim Light Melatonin Onset (DLMO) begins. Exposure to 460 nm blue-cyan light during this hour suppresses pineal melatonin by up to 85%, locking you into the wired-at-night trap.",
    },
    {
      timeStr: formatClock(bed5),
      icon: "😴",
      name: "Bedtime (7.5 Hours Sleep / 5 Cycles)",
      category: "Night",
      detail: `Lights out. Sleeping at ${formatClock(bed5)} gives you 15 minutes of sleep latency and exactly 5 complete 90-minute ultradian cycles before your ${t} alarm.`,
      science: "Completing 5 full cycles (450 minutes of sleep) guarantees sufficient Stage 3 Slow-Wave Deep Sleep during early cycles and robust REM sleep during late cycles.",
    },
  ];

  const caffeineCurfews: CaffeineCurfewItem[] = [
    {
      metabolizer: "Slow",
      halfLife: 7.0,
      cutoffTime: formatClock(slowCutoff),
      detail: "Carries the CYP1A2 slow-clearance allele (*1F). A single cup takes up to 14 hours to reach negligible bloodstream levels. Must stop caffeine before noon.",
    },
    {
      metabolizer: "Average",
      halfLife: 5.5,
      cutoffTime: formatClock(avgCutoff),
      detail: "Standard human pharmacokinetic clearance rate. Requires an 8-hour clearance window before tonight's bedtime.",
    },
    {
      metabolizer: "Fast",
      halfLife: 4.0,
      cutoffTime: formatClock(fastCutoff),
      detail: "Rapid hepatic CYP1A2 enzyme activity. Clears stimulants faster, but still requires evening discipline to avoid truncating deep delta sleep.",
    },
  ];

  // Tailored chronotype narratives
  const chronotypeNotes = {
    lion: wake <= 6 * 60
      ? `A ${t} wake time is prime biological territory for the Lion chronotype. Lions possess a shorter intrinsic circadian period (tau < 24.0h), which naturally advances cortisol and temperature curves. You will wake with low sleep inertia and reach peak focus during your early morning block. However, your biological day ends early: honor your 9:00 PM wind-down and do not attempt to force late-night social schedules.`
      : `Lions waking at ${t} will often feel as though half their productive day has already passed. If your work or lifestyle requires a ${t} wake-up, you must actively delay your evening light exposure to prevent waking up prematurely at 4:30 AM.`,
    bear: wake >= 6 * 60 + 30 && wake <= 8 * 60
      ? `${t} is the quintessential sweet spot for the Bear chronotype (~50–55% of the human population). Your internal master clock tracks the solar cycle closely. By following the 90-minute coffee delay at ${formatClock(coffeeTime)} and defending your ${formatClock(avgCutoff)} caffeine curfew, you will maintain consistent daytime energy and avoid the brutal 2:30 PM slump. Keep your weekend wake time within 45 minutes of ${t} to prevent social jetlag.`
      : wake < 6 * 60 + 30
      ? `Waking at ${t} is ambitious for a Bear. It requires waking during your natural circadian temperature rise before your cortisol has peaked. To succeed, make morning light non-negotiable: step outside for 20 minutes at ${formatClock(lightStart)} and do not negotiate on a ${formatClock(bed5)} bedtime.`
      : `A ${t} wake-up is on the later end for Bears. It risks drifting even later on weekends, which makes Monday mornings painful. Anchor your wake-up with bright light and a brisk walk immediately upon rising.`,
    wolf: wake >= 8 * 60 + 30
      ? `${t} aligns naturally with the Wolf (Night Owl) chronotype (~15–20% of the population). Wolves have a longer intrinsic circadian period (tau > 24.2h), causing delayed melatonin and cortisol curves. Do not expect to write a masterpiece at 9:00 AM; your executive function accelerates dramatically between 3:00 PM and 7:00 PM. Protect your late afternoon block and maintain strict evening light defense to prevent your bedtime from sliding past 1:30 AM.`
      : `Waking at ${t} is a physiological battle for a Wolf. You are waking in the middle of your biological temperature trough, and your Cortisol Awakening Response is delayed by up to 2 hours. To thrive on this schedule, you must use high-intensity light (10,000 lux lamp or direct sunlight) within 15 minutes of waking to forcibly advance your circadian phase.`,
    dolphin: `Dolphins are light, fragmented sleepers with high autonomic nervous system arousal and elevated evening cortisol. For a Dolphin, a ${t} alarm requires strict sleep hygiene. Do not hit snooze; get out of bed immediately to establish sleep-drive contrast. Use 10 minutes of morning breathwork or meditation to soothe sympathetic tone, and follow the ${formatClock(slowCutoff)} caffeine cutoff to protect fragile sleep maintenance.`,
  };

  // In-depth editorial prose sections (1,500+ words total)
  const isEarly = wake < 6 * 60;
  const isStandard = wake >= 6 * 60 && wake <= 8 * 60;

  const narratives = {
    heroLead: isEarly
      ? `Waking up at ${t} places you in an elite tier of early risers—whether by biological chronotype (Lion), military discipline, fitness dedication, or demanding executive schedules. However, most people who attempt a ${t} routine fail within three weeks. They don't fail from a lack of willpower; they fail because they treat an early wake-up as an isolated morning event rather than an interconnected 24-hour circadian cycle. When you wake at ${t}, every single biological milestone—from your Cortisol Awakening Response to your last safe coffee and your core body temperature nadir—shifts hours earlier than standard society.`
      : isStandard
      ? `A ${t} wake time represents the biological gold standard for human circadian entrainment. Synchronized closely with the natural diurnal cycle of the sun, waking at ${t} allows your endogenous hormonal rhythms—cortisol, melatonin, dopamine, and adenosine—to operate in optimal harmony with modern societal work hours. Yet millions of people waking at ${t} spend their mornings in a brain fog, crash at 11:00 AM, battle severe afternoon fatigue, and lie awake in bed at midnight. This schedule bridges the gap between what your body needs and how your workday actually flows.`
      : `Waking up at ${t} is typical for night owls, creative professionals, late-shift workers, and students who operate on a delayed circadian phase. Standard corporate culture often labels a ${t} wake time as "lazy," but modern chronobiology proves that individual circadian timing is largely genetic. However, thriving on a ${t} schedule requires intentional architecture: without strict anchors, late wake times have a dangerous tendency to drift even later, turning a healthy late rhythm into chronic insomnia and severe social isolation.`,

    awakeningScience: `The first 90 minutes after your ${t} alarm determine whether the rest of your day feels like an effortless sprint or an uphill slog. 

When you first regain consciousness, you are experiencing **sleep inertia**—the neurological lag caused by residual adenosine and slow-wave delta activity lingering across your prefrontal cortex. During the first 20 to 30 minutes, your cerebral blood flow velocity is reduced, and your reaction times are measurably impaired.

To clear sleep inertia effectively:
1. **Hydration First:** You lose between 500 mL and 1 liter of moisture overnight through perspiration and respiratory vapor loss. Mild dehydration increases blood viscosity and mimics cognitive fatigue. Drinking 500 mL of room-temperature water with a pinch of mineral salt immediately upon standing restores arterial blood pressure and cerebral perfusion.
2. **The 20-Minute Sunlight Mandate (${formatClock(lightStart)} – ${formatClock(lightEnd)}):** Sunlight is the premier *zeitgeber* (time-giver) in human chronobiology. Retinal ganglion cells express melanopsin, a photopigment specifically tuned to 460–480 nm blue light. When photons strike these cells, an electrical signal travels directly down the retinohypothalamic tract to the Suprachiasmatic Nucleus (SCN). The SCN immediately silences melatonin production in the pineal gland, triggers a surge in dopamine and daytime cortisol, and starts an internal 14-to-15 hour timer for tonight's Dim Light Melatonin Onset (DLMO).
3. **The 90-Minute Coffee Delay (${formatClock(coffeeTime)}):** Between 30 and 45 minutes post-wake, your adrenal glands produce the **Cortisol Awakening Response (CAR)**—a 50% to 75% natural surge in cortisol designed to mobilize glucose and initiate daytime alertness. Drinking coffee immediately upon waking blunts this natural spike and leads to rapid caffeine tolerance. By delaying your first cup until ${formatClock(coffeeTime)}, you allow sleep inertia to clear naturally, ensuring that caffeine docks into freshly cleared adenosine receptors and prevents a mid-morning crash.`,

    deepWorkScience: `Between ${formatClock(focusStart)} and ${formatClock(focusEnd)}, your biology enters its **Peak Focus Window**. 

During this 3-hour period, several physiological vectors align:
- Your core body temperature is climbing steadily toward its midday peak.
- Cortisol levels have stabilized into a steady daytime baseline.
- Prefrontal cortical glucose metabolism and neural transmission speeds reach their highest efficiency of the day.

This is not the time to check email, answer routine chat messages, or attend status-update meetings. Reserve this 180-minute block for your most intellectually rigorous work: strategic planning, deep programming, complex writing, financial modeling, or difficult problem solving. 

Human cognition operates on **90-minute ultradian cycles** (the Basic Rest-Activity Cycle, or BRAC). Within this 3-hour block, plan for two 75-to-90 minute deep focus sprints separated by a 10-minute micro-break where you stand up, look at distant objects to relax your eye muscles, and hydrate.`,

    dipScience: `Between ${formatClock(dipStart)} and ${formatClock(dipEnd)}, you will experience a noticeable drop in mental acuity, reaction time, and subjective energy. 

Many people mistakenly believe this is caused exclusively by their lunch. In clinical isolation experiments, however, human subjects placed in temporal isolation chambers with constant hourly caloric feeds experience this exact same post-prandial dip. 

It is governed by **Borbély's Two-Process Model of Sleep Regulation**:
- **Process S (Homeostatic Sleep Pressure):** By ${formatClock(dipStart)}, you have been awake for over 7 hours. Adenosine has been steadily accumulating in your basal forebrain.
- **Process C (Circadian Alerting Signal):** Your central circadian clock naturally dials down its wakefulness drive in the early afternoon, coinciding with a transient dip in core body temperature.

When Process S is high and Process C drops, you hit the afternoon valley. 

**The Golden Rule:** Do not fight this dip with a massive dose of caffeine. Drinking coffee at ${formatClock(dipStart)} will ruin tonight's sleep. Instead, take a 15-minute brisk outdoor walk to re-stimulate retinal cells with natural photons, or lie down for a 20-minute power nap or Non-Sleep Deep Rest (NSDR) protocol. A 20-minute nap clears just enough adenosine to restore mental sharpness without allowing your brain to enter slow-wave sleep.`,

    caffeinePharmacokinetics: `Caffeine is one of the most powerful performance tools available—and the single most common cause of fragmented sleep.

Caffeine is an adenosine receptor antagonist with an average human elimination half-life of **5.5 hours** (ranging from 4 hours in fast metabolizers to 7+ hours in slow metabolizers). Furthermore, caffeine has a **quarter-life of approximately 11 hours**.

Consider what happens if you drink a 16 oz cold brew (200 mg) or a double espresso (126 mg) in the afternoon:
- If you consume 150 mg of caffeine at ${formatClock(dipStart)}, approximately 75 mg is still circulating in your brain 5.5 hours later.
- By your ${formatClock(bed5)} bedtime, **nearly 40 to 50 mg of active caffeine** remains bound to your neural adenosine receptors.

Even if you are someone who claims, *"I can drink coffee after dinner and fall right asleep,"* clinical sleep studies prove that residual caffeine at bedtime **reduces Stage 3 Slow-Wave Deep Sleep by 20% to 30%**. You will wake up unrefreshed, building a compound sleep deficit that makes tomorrow's wake-up agonizing. 

Adhere strictly to your caffeine curfews:
- **Slow Metabolizers:** Cutoff at **${formatClock(slowCutoff)}**
- **Average Metabolizers:** Cutoff at **${formatClock(avgCutoff)}**
- **Fast Metabolizers:** Cutoff at **${formatClock(fastCutoff)}**`,

    eveningWindDownScience: `Your evening begins 3 hours before bed at ${formatClock(dinnerTime)}, when you finish your final caloric intake. 

Digestion is a metabolically demanding process that redirects significant cardiac output toward the splanchnic vascular bed and elevates your core body temperature. Eating a heavy meal within 2 hours of bedtime keeps your resting heart rate elevated during the first half of the night, robbing you of deep restorative sleep.

At ${formatClock(windDownTime)} (60 minutes before lights out), initiate the **3-2-1 Wind-Down Protocol**:
- **Dim Ambient Lux:** Turn off harsh overhead ceiling lights and switch to low-wattage, floor-level amber lamps.
- **Defend Against 460nm Wavelengths:** Blue light from smartphones, monitors, and televisions directly suppresses pineal melatonin secretion. If you must use screens, wear verified blue-blocking glasses or enable aggressive night-shift display filters.
- **Facilitate the 1°C Temperature Drop:** Human sleep onset requires your core body temperature to decrease by roughly 1°C (2°F). Take a warm shower or bath 60 minutes before bed. Heating the skin dilates peripheral blood vessels in your hands and feet (vasodilation), rapidly dumping heat from your core when you step out into a cool bedroom (ideally 65°F to 68°F / 18°C to 20°C).`,

    socialJetlagStrategy: `The number one killer of a ${t} wake-up schedule is the weekend lie-in.

When Friday night arrives, it is tempting to stay up late and sleep in until 9:00 AM or 10:00 AM on Saturday and Sunday. However, sleeping in by more than 60 to 90 minutes shifts your central circadian pacemaker eastward by two to three time zones. 

By Sunday night, you have accumulated only 12 to 13 hours of sleep pressure instead of the necessary 16 hours, leading to severe **Sunday night insomnia**. When your ${t} alarm rings on Monday morning, your brain is biologically in a different time zone.

**The Protocol:** Never shift your weekend wake time by more than **45 to 60 minutes** from ${t}. If you stay up late on a weekend, still wake up near ${t}, get your morning sunlight, and compensate with a 20-to-30 minute midday nap rather than sleeping in.`,

    seasonalLightStrategy: `Depending on your geographic latitude and the time of year, waking at ${t} may mean opening your eyes in total darkness during winter months.

If the sun has not risen when your alarm sounds at ${t}:
1. Turn on every bright overhead light in your bathroom and kitchen immediately upon rising.
2. Consider using a certified 10,000-lux seasonal daylight lamp positioned at a 45-degree angle 16 inches from your eyes for 20 minutes while you read or eat breakfast.
3. As soon as the actual sun breaches the horizon, step outside for 10 minutes. Even low-angle dawn sunlight provides far higher photon density than indoor artificial lighting.`,

    gradualTransitionPlan: `If your current wake time is significantly later than ${t}, do not attempt to leap to this schedule overnight. Making an abrupt 2-hour schedule shift shocks your endocrine system and leads to insomnia.

Use the **15-Minute Incremental Shift Protocol**:
- Day 1–3: Move your alarm 15 minutes earlier, and shift your bedtime 15 minutes earlier.
- Day 4–6: Shift by another 15 minutes.
- Continue in 15-minute increments every three days until your alarm matches ${t}.
- Anchor every single morning with outdoor light and delay your first coffee by 90 minutes to solidify the new phase.`,
  };

  const mealWindows: MealWindow[] = [
    {
      name: "Metabolic Anchor Breakfast",
      timeStr: `${formatClock(norm(wake + 60))} – ${formatClock(norm(wake + 90))}`,
      primaryGoal: "Stimulate peripheral liver/muscle circadian clocks without blood glucose spikes.",
      macronutrients: "30–35g lean protein (eggs, Greek yogurt, whey, smoked salmon) + healthy fats. Minimize fast-absorbing starches.",
      circadianImpact: "Protein triggers glucagon secretion, stabilizing blood sugar and providing tyrosine for catecholamine (dopamine/adrenaline) synthesis during your upcoming peak focus window.",
    },
    {
      name: "Low-Glycemic Sustained-Energy Lunch",
      timeStr: `${formatClock(lunchStart)} – ${formatClock(norm(lunchStart + 45))}`,
      primaryGoal: "Prevent post-prandial reactive hypoglycemia from compounding the natural afternoon dip.",
      macronutrients: "Substantial fibrous greens, cruciferous vegetables, olive oil or avocado, plus quality poultry, fish, or legumes.",
      circadianImpact: "High carbohydrate loads cause large insulin surges, driving rapid tryptophan uptake across the blood-brain barrier which induces immediate lethargy right as your Process C circadian alertness dips.",
    },
    {
      name: "Circadian Fasting & Sleep Prep Dinner",
      timeStr: `${formatClock(dinnerTime)} – ${formatClock(norm(dinnerTime + 45))}`,
      primaryGoal: "Complete digestion 3 full hours before lights out so core body temperature can fall.",
      macronutrients: "Easily digestible protein with moderate complex carbs (sweet potatoes, wild rice). Minimize spicy foods and alcohol.",
      circadianImpact: "Moderate nighttime complex carbohydrates enhance serotonin synthesis without blood sugar turmoil, while an empty stomach allows splanchnic blood flow to return to peripheral limbs for nocturnal cooling.",
    },
    {
      name: "Final Fluid & Hydration Curfew",
      timeStr: formatClock(norm(bed5 - 90)),
      primaryGoal: "Eliminate nocturnal awakenings driven by bladder distension (nocturia).",
      macronutrients: "Sip small quantities of room-temperature water or chamomile/lemon balm tea if thirsty. No large 500 mL boluses.",
      circadianImpact: "Vasopressin naturally rises during deep sleep to concentrate urine. Drinking excess water past this curfew overwhelms renal tubular reabsorption, causing fragmented REM cycles.",
    },
  ];

  const citations: ResearchCitation[] = [
    {
      authors: "Borbély, A. A.",
      year: 1982,
      title: "A two process model of sleep regulation",
      journal: "Human Neurobiology, 1(3), 195–204",
      finding: "Quantified how homeostatic sleep debt (Process S) and the endogenous circadian pacemaker (Process C) intersect to dictate daytime fatigue, the afternoon dip, and sleep onset timing.",
    },
    {
      authors: "Drake, C., Roehrs, T., Shambroom, J., & Roth, T.",
      year: 2013,
      title: "Caffeine effects on sleep taken 0, 3, or 6 hours before going to bed",
      journal: "Journal of Clinical Sleep Medicine, 9(11), 1195–1200",
      finding: "Controlled clinical trials demonstrating that caffeine consumed even 6 hours before bedtime reduces total sleep duration by more than one hour and significantly degrades delta slow-wave sleep.",
    },
    {
      authors: "Czeisler, C. A., et al.",
      year: 1999,
      title: "Stability, precision, and near-24-hour period of the human circadian pacemaker",
      journal: "Science, 284(5423), 2177–2181",
      finding: "Proved that retinal light exposure is the primary zeitgeber (time-giver) capable of resetting human circadian oscillations and entraining the central suprachiasmatic nucleus.",
    },
    {
      authors: "Roenneberg, T., Wirz-Justice, A., & Merrow, M.",
      year: 2003,
      title: "Life between clocks: daily temporal patterns of human chronotypes",
      journal: "Journal of Biological Rhythms, 18(1), 80–90",
      finding: "Coined 'Social Jetlag' and documented the biological misalignment between biological chronotype clocks and modern societal work requirements.",
    },
    {
      authors: "Kleitman, N.",
      year: 1982,
      title: "Basic rest-activity cycle—22 years later",
      journal: "Sleep, 5(4), 311–317",
      finding: "Discovered that daytime cognitive alertness and human cerebral performance operate on rhythmic 90-minute ultradian oscillations (BRAC).",
    },
  ];

  const faqs = [
    {
      q: `What time should I go to bed if I wake up at ${t}?`,
      a: `To complete 5 full 90-minute sleep cycles (7.5 hours of actual sleep plus 15 minutes of sleep latency), you should be in bed with lights out at ${formatClock(bed5)}. If you require 9 hours of sleep (6 full cycles), your target bedtime is ${formatClock(bed6)}.`,
    },
    {
      q: `When should I stop drinking coffee if I wake up at ${t}?`,
      a: `For an average metabolizer, your last safe coffee cutoff is ${formatClock(avgCutoff)}. If you are sensitive to caffeine or a slow metabolizer (carrying the CYP1A2 slow clearance allele), your cutoff is ${formatClock(slowCutoff)}. Fast metabolizers can extend to ${formatClock(fastCutoff)}.`,
    },
    {
      q: `Why must I wait 90 minutes before drinking coffee at ${formatClock(coffeeTime)}?`,
      a: `Waiting 90 minutes after your ${t} alarm allows your natural Cortisol Awakening Response (CAR) to peak and clear residual sleep inertia. Drinking coffee immediately causes an abrupt energy crash around mid-morning because adenosine gets trapped behind caffeine blockers and floods your receptors all at once.`,
    },
    {
      q: `What should I do if it is completely dark outside when I wake up at ${t}?`,
      a: `Turn on high-intensity indoor overhead lighting immediately upon rising, or use a 10,000 lux seasonal daylight lamp for 20 minutes. Once the sun rises in your area, step outside for 10–15 minutes to entrain your Suprachiasmatic Nucleus with real natural photons.`,
    },
    {
      q: `What is my peak focus window if I wake up at ${t}?`,
      a: `Your primary cognitive deep-work window runs from ${formatClock(focusStart)} to ${formatClock(focusEnd)}. This 3-hour period coincides with peak prefrontal glucose metabolism and rising core body temperature. Protect this window from shallow emails and administrative distractions.`,
    },
    {
      q: `How do I avoid crashing in the afternoon on a ${t} schedule?`,
      a: `The dip between ${formatClock(dipStart)} and ${formatClock(dipEnd)} is a biological reality governed by the Two-Process Model. Eat a low-glycemic lunch, take a 15-minute outdoor walk at ${formatClock(dipStart)}, or lie down for a 20-minute power nap. Do not consume caffeine during this dip.`,
    },
    {
      q: `Can I sleep in on weekends if I wake up at ${t} during the week?`,
      a: `Do not sleep in by more than 45 to 60 minutes on weekends. Sleeping in past ${formatClock(norm(wake + 60))} shifts your circadian clock eastward, causing severe Sunday night insomnia and brutal Monday morning social jetlag. If tired, use a 20-minute midday nap instead of a morning lie-in.`,
    },
  ];

  return {
    wakeMinutes: wake,
    wakeLabel: t,
    slug,
    bedtime5Cycles: formatClock(bed5),
    bedtime6Cycles: formatClock(bed6),
    firstCoffee: formatClock(coffeeTime),
    morningLight: `${formatClock(lightStart)} – ${formatClock(lightEnd)}`,
    peakFocus: `${formatClock(focusStart)} – ${formatClock(focusEnd)}`,
    afternoonDip: `${formatClock(dipStart)} – ${formatClock(dipEnd)}`,
    exerciseWindow: `${formatClock(exerciseStart)} – ${formatClock(exerciseEnd)}`,
    windDown: formatClock(windDownTime),
    events,
    caffeineCurfews,
    beverageCutoffs,
    mealWindows,
    citations,
    chronotypeNotes,
    narratives,
    faqs,
  };
}
