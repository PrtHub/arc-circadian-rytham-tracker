export interface ScienceArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: "protocol" | "mechanism" | "glossary" | "guide";
  categoryLabel: string;
  date: string;
  readTime: string;
  content: string;
}

export const scienceArticles: ScienceArticle[] = [
  {
    slug: "caffeine-tolerance-reset-protocol",
    title: "The Caffeine Tolerance Reset Protocol",
    excerpt: "Reset your adenosine receptors and restore daily energy in 7 days without severe withdrawal.",
    category: "protocol",
    categoryLabel: "Protocol",
    date: "2026-06-27",
    readTime: "6 min",
    content: `
# The Caffeine Tolerance Reset Protocol

Over time, daily caffeine intake leads to **tolerance**. Your brain compensates for blocked adenosine receptors by creating *more* receptors, requiring higher doses of coffee to achieve the same alertness.

This 7-day protocol is designed to reset your receptor sensitivity back to baseline.

### Day 1 to 2: The Step Down
Do not cold-turkey. Halve your daily caffeine dose. If you normally drink 200mg (about 2 cups), limit yourself to 100mg before 10:00 AM.
> [!NOTE]
> You may feel minor lethargy. Anchor this day with 15 minutes of direct morning sunlight to boost natural cortisol.

### Day 3 to 5: The Inversion
Switch your delivery mechanism to green tea or yerba mate. This introduces **L-Theanine**, which relaxes the central nervous system and mitigates caffeine withdrawal headaches. Keep intake under 50mg.

### Day 6 to 7: Complete Clearance
Zero caffeine. Drink herbal teas or decaf (which contains trace amounts). Focus on hydration and keeping a strict bedtime to clear remaining metabolic waste.
> [!IMPORTANT]
> Keep your wake times consistent during the reset. Sleep drift will worsen withdrawal fatigue.

### Post-Protocol Maintenance
When you reintroduce caffeine on Day 8, limit consumption to **150mg per day** and always delay your first cup by **90 minutes** after waking.
    `,
  },
  {
    slug: "adenosine-sleep-pressure",
    title: "Adenosine and the Biology of Sleep Pressure",
    excerpt: "How a simple cellular byproduct builds sleep pressure and controls your biological tiredness.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-06-26",
    readTime: "7 min",
    content: `
# Adenosine: The Sleep Pressure Molecule

Every second your brain cells are active, they consume energy in the form of Adenosine Triphosphate (ATP). As ATP is broken down, it leaves behind a chemical byproduct: **adenosine**.

Adenosine accumulates in the extracellular space of your brain during waking hours, acting as a biological meter of how long you have been awake.

### The Mechanism of Sleep Pressure
As adenosine levels rise, they bind to specific A1 and A2A receptors in the brain:
1.  **A1 Receptors**: Inhibit wake-promoting neurons, slowing down cognitive firing.
2.  **A2A Receptors**: Excite sleep-promoting neurons in the ventrolateral preoptic nucleus (VLPO).

This biological accumulation is what scientists refer to as **sleep pressure**.

### Caffeine Interception
Caffeine acts as a competitive antagonist for these receptors. It is structurally similar to adenosine and blocks the ports, preventing sleep pressure from registering. 
> [!WARNING]
> Blocking receptors does not stop adenosine from accumulating. Once caffeine is metabolized, the accumulated backlog floods the receptors, resulting in a sudden crash.
    `,
  },
  {
    slug: "what-is-zeitgeber",
    title: "What is a Zeitgeber? The External Clocks That Rule Our Biology",
    excerpt: "Learn the definition, examples, and biology behind environmental cues that synchronize your master clock.",
    category: "glossary",
    categoryLabel: "Circadian Glossary",
    date: "2026-06-25",
    readTime: "5 min",
    content: `
# Zeitgeber (Noun)

A **Zeitgeber** (German for "time giver" or "synchronizer") is any external environmental cue that synchronizes an organism's biological clock to the Earth's 24-hour light/dark cycle.

Without Zeitgebers, the human circadian clock "free-runs" at approximately 24.2 hours, causing sleep times to drift later every day.

### Core Examples of Zeitgebers
1.  **Light (The Master Zeitgeber)**: Photons hit the retina, sending signals through the retinohypothalamic tract to the suprachiasmatic nucleus (SCN).
2.  **Temperature**: A drop in ambient temperature signals nighttime; a rise signals morning.
3.  **Food/Feeding Times**: Eating resets peripheral clocks in the liver and digestive tract.
4.  **Exercise/Movement**: Muscle activity coordinates peripheral tissue rhythmicity.

> [!TIP]
> To cure jetlag or social shift fatigue, adjust your Zeitgebers simultaneously: get morning light, eat at local times, and exercise during daylight hours.
    `,
  },
  {
    slug: "ultimate-circadian-reset-guide",
    title: "The Ultimate Guide to Circadian Resetting",
    excerpt: "Step-by-step instructions to rebuild your biological clock from scratch after travel, illness, or sleep drift.",
    category: "guide",
    categoryLabel: "Ultimate Guide",
    date: "2026-06-24",
    readTime: "9 min",
    content: `
# The Ultimate Circadian Reset Guide

Whether you are recovering from international travel, night shift rotations, or a weekend of late-night social schedules, your master clock can become misaligned. Here is how to perform a total circadian reset in 48 hours.

### Step 1: The Waking Light Anchor
Wake up at your target time (even if sleep-deprived) and view **10,000+ lux of light** for 20 minutes. If the sun isn't up, use a 10,000 lux circadian lamp.
> [!IMPORTANT]
> Do not look through glass or sunglasses. The physical refraction reduces photon intensity by up to 90%.

### Step 2: The Fasting Shift
Do not eat breakfast until you have completed your light exposure. Aligning food with light triggers liver and SCN clock coordination.

### Step 3: Temperature Inversion
In the evening, take a hot bath or shower 90 minutes before bed. The subsequent vasodilation causes your core temperature to plummet, signaling the brain to initiate deep sleep cycles.
> [!NOTE]
> Keep your bedroom cooling to exactly 65-68°F (18-20°C) to facilitate this temperature dip.
    `,
  },
  {
    slug: "cortisol-awakening-response",
    title: "Understanding the Cortisol Awakening Response (CAR)",
    excerpt: "Understand the morning cortisol surge that triggers natural alertness, anchors your daily rhythm, and prepares you for deep work.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-06",
    readTime: "8 min",
    content: `
# Understanding the Cortisol Awakening Response (CAR)

The **Cortisol Awakening Response (CAR)** is a natural, sharp spike in cortisol levels that occurs in the first 30 to 45 minutes after waking up. It serves as your body's biological alarm system, triggering immediate alertness, elevating blood pressure, and increasing core body temperature to transition you out of sleep.

### The SCN-Adrenal Axis
CAR is regulated by the **suprachiasmatic nucleus (SCN)**—the master clock in your brain. Waking up triggers a neural pathway from the SCN to the adrenal glands, prompting them to dump cortisol into the bloodstream. 

Under healthy conditions, this spike is high and sharp. A flat, sluggish CAR is the primary biomarker for morning fatigue, burnout, and chronic stress.

### The Role of Waking Light
Nothing anchors your CAR like immediate light exposure.
1.  **Photoreceptors**: Light hitting your retina sends immediate electrical triggers to the SCN.
2.  **Hormone Coordination**: This retinal trigger shuts down melatonin synthesis in the pineal gland and amplifies the cortisol curve.
3.  **Timing Anchor**: The peak of your CAR sets a countdown timer in your brain; approximately 14-16 hours later, your brain will begin releasing melatonin to trigger sleep gates.

> [!WARNING]
> Waking up to an alarm clock in a dark room and immediately looking at your phone suppresses a healthy CAR, leading to grogginess (sleep inertia) that lasts for hours.

### Optimization Protocol
*   **Sunlight**: Step outside within 15 minutes of waking. If it is sunny, 5-10 minutes is enough. If it is overcast, aim for 15-20 minutes.
*   **Physical Movement**: Engaging in moderate walking or stretching during this window amplifies the cortisol rise.
    `,
  },
  {
    slug: "melatonin-digital-sunset",
    title: "Melatonin and the Digital Sunset Protocol",
    excerpt: "A scientific blueprint to initiate your evening melatonin wave and protect your sleep architecture from blue light pollution.",
    category: "protocol",
    categoryLabel: "Protocol",
    date: "2026-07-05",
    readTime: "7 min",
    content: `
# Melatonin and the Digital Sunset Protocol

**Melatonin** is the hormone of darkness, synthesized in the pineal gland. It does not put you to sleep directly; rather, it signals to your organs and brain cells that the day has ended and it is time to transition into cellular cleanup and sleep mode.

### The Light/Dark Receptors
A subpopulation of cells in the retina called **intrinsically photosensitive Retinal Ganglion Cells (ipRGCs)** are highly sensitive to blue light wavelengths (460-480nm).
*   **Daytime Light**: Blue light hits ipRGCs, which contain a pigment called **melanopsin**. This triggers SCN pathways to block melatonin synthesis, keeping you alert.
*   **Nighttime Blue Light**: Looking at bright screens or overhead fluorescent lights at night tricks the ipRGCs into signaling that it is still daytime, suppressing melatonin release.

> [!IMPORTANT]
> A single exposure to a bright screen close to bedtime can delay melatonin release by up to 2 hours, disrupting deep sleep cycles.

### The Digital Sunset Protocol
To safeguard your evening melatonin wave, initiate a **Digital Sunset** 2 hours before bed:
1.  **First Sunset (120 min to bed)**: Turn off all overhead fluorescent lights. Switch to low-level floor lamps, amber warm lights, or red light bulbs.
2.  **Screen Sunset (60 min to bed)**: Turn off television, tablet, and computer screens. If you must use a device, set it to maximum warm shift (Night Shift) and reduce brightness to minimum.
3.  **Dark Sunset (30 min to bed)**: Eliminate all screens. Focus on reading, journaling, or stretching in dim, warm light.
    `,
  },
  {
    slug: "glymphatic-clearance-system",
    title: "The Glymphatic Clearance System: Brain Washing During Sleep",
    excerpt: "Discover the brain's overnight self-cleaning cycle that flushes cognitive waste and preserves long-term brain health.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-04",
    readTime: "8 min",
    content: `
# The Glymphatic System: Brain Washing

While you are awake, your brain cells are constantly consuming energy and producing metabolic byproducts. In any other organ, the lymphatic system drains this waste. However, the brain is walled off by the blood-brain barrier. To solve this, the brain uses its own specialized cleaning mechanism: **the glymphatic clearance system**.

### The Cleaning Cycle
The glymphatic system is almost exclusively active during **slow-wave Deep Sleep** (Stages 3 and 4 of NREM sleep). 
1.  **Glial Cell Shrinkage**: During deep sleep, astrocytes (supporting brain cells) shrink by up to 60%.
2.  **Convective Flow**: This shrinkage opens up interstitial space, allowing cerebrospinal fluid (CSF) to mix with interstitial fluid (ISF) and flow rapidly through the brain tissue.
3.  **Toxin Clearance**: The flowing CSF clears out metabolic toxins, including **beta-amyloid** (associated with Alzheimer's disease) and **tau proteins**.

### The Circadian Gate
Glymphatic clearance is highly synchronized with your circadian rhythm. Melatonin and a drop in core body temperature are both prerequisites to enter the deep sleep stages where astrocytes shrink. 

> [!TIP]
> Chronic sleep deprivation or sleeping at irregular times restricts the glymphatic system from finishing its cycle, leading to the accumulation of plaque and cognitive fatigue.
    `,
  },
  {
    slug: "social-jetlag-circadian-misalignment",
    title: "Social Jetlag and Circadian Misalignment",
    excerpt: "Understand the biological strain, metabolic load, and sleep debt caused by shifting sleep schedules between workdays and weekends.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-03",
    readTime: "10 min",
    content: `
# Social Jetlag and Circadian Misalignment

**Social Jetlag** is the discrepancy between an individual's biological clock and their social clock (usually dictated by work, study, or social schedules). It is most commonly experienced as a shift in sleep timing between workdays and free days (weekends). 

For example, sleeping from 11:00 PM to 7:00 AM during the week, but shifting to 2:00 AM to 10:00 AM on weekends, creates a 3-hour biological phase shift—the equivalent of flying from New York to Los Angeles and back every single week.

### The Physiology of Phase Drifts
Your circadian clock does not reset instantly. Shifting sleep times by just two hours on Friday night delays your SCN's light sensitivity curve. 
*   **Melatonin Delay**: Melatonin begins releasing later on Sunday night, making it difficult to fall asleep at your weekday target.
*   **Waking Exhaustion**: Waking up at 7:00 AM on Monday cuts off your final, REM-heavy sleep cycle, leading to "Monday morning fog."

### Metabolic and Health Impacts
Circadian misalignment forces biological systems to operate out of phase:
1.  **Insulin Resistance**: Digestion, insulin sensitivity, and liver enzymes expect food during daylight. Shifting feeding times late into the evening reduces glucose tolerance.
2.  **Systemic Stress**: Chronic misalignment raises baseline cortisol, contributing to elevated resting heart rate and systemic inflammation.
3.  **Gut Microbiome Dysbiosis**: The bacteria in your digestive tract follow circadian activity waves. Shifting eating schedules disrupts this cycle, reducing digestive efficiency.

> [!WARNING]
> Chronic social jetlag is statistically linked to elevated risks of metabolic syndrome, weight gain, and depressive symptoms.

### Mitigation and Syncing Protocol
*   **Limit Sleep Drift**: Keep your weekend wake time within **60 minutes** of your weekday wake time.
*   **Catch-up Nap**: If sleep-deprived, wake up at your regular time to anchor your cortisol spike, then take a 20-30 minute nap around 1:00 PM to pay down sleep debt without delaying your night sleep gate.
    `,
  },
  {
    slug: "core-body-temperature-sleep-gate",
    title: "The Science of Core Body Temperature & Sleep Gate",
    excerpt: "How your body's temperature curve dictates your peak alertness windows and opens your evening sleep gate.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-02",
    readTime: "9 min",
    content: `
# Core Body Temperature and the Sleep Gate

Your body temperature is not constant. It follows a highly predictable, circadian rhythm that fluctuates by about 1.5°F (1°C) over 24 hours. This temperature curve is the single most powerful driver of physical alertness and sleep onset.

### The Temperature Alertness Curve
*   **The Rise**: Your core body temperature begins rising about 2 hours before you wake up. It continues to rise throughout the day, peaking in the late afternoon/early evening (around 5:00 PM - 7:00 PM). This peak corresponds to your window of maximum physical agility, reaction time, and cardiovascular efficiency.
*   **The Fall**: After peaking, core temperature begins to decline, reaching its absolute lowest point (the nadir) around 2 hours before your natural wake time (typically 4:00 AM).

### Thermal Gating of Sleep
To initiate sleep, your core body temperature **must drop by approximately 2°F (1°C)**. 
1.  **Distal Vasodilation**: The body dumps heat by dilating blood vessels in your extremities (hands and feet). This is why warm hands and feet are essential for falling asleep.
2.  **Melatonin Interaction**: Melatonin release triggers vasodilation, initiating the core temperature drop.
3.  **The Sleep Gate**: When core temperature is falling at its fastest rate, the brain opens the sleep gate, facilitating rapid sleep onset.

> [!NOTE]
> Trying to sleep when your core temperature is still near its peak (e.g. after a late workout or heavy meal) leads to tossing, turning, and light, fragmented sleep.

### Room and Habit Optimization
*   **The Warm Bath Paradox**: Taking a hot bath or shower 90 minutes before bed raises skin temperature, dilating blood vessels. When you step out, heat radiates away rapidly, causing your core temperature to plummet and triggering sleep gates.
*   **Ambient Environment**: Keep your bedroom cool (60-68°F / 15-20°C). A cool room assists the body's natural heat dumping process.
    `,
  },
  {
    slug: "zeitgebers-peripheral-clocks",
    title: "Zeitgebers and Peripheral Clocks: Gut, Liver, and Muscle Rhythms",
    excerpt: "How food, exercise, and temperature act as local synchronizers for organs, independently of the brain's master clock.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-01",
    readTime: "9 min",
    content: `
# Zeitgebers and Peripheral Organ Clocks

For decades, scientists believed the master clock in the brain's suprachiasmatic nucleus (SCN) was the sole timekeeper of human physiology. We now know that **almost every tissue and organ in the body contains autonomous molecular clocks** driven by localized clock gene loops (CLOCK, BMAL1, PER, CRY).

These localized systems are called **peripheral clocks**, and they sync with the SCN via external signals called **Zeitgebers**.

### SCN Master Clock vs. Peripheral Clocks
While the SCN is synchronized primarily by light, peripheral organs respond to non-photic Zeitgebers:
*   **The Liver and Gut Clocks**: Synchronized almost entirely by **food intake**. Eating a meal triggers liver enzymes and intestinal motility processes.
*   **The Muscle and Cardiovascular Clocks**: Heavily influenced by **physical movement and exercise**, which reset metabolic genes in skeletal tissue.
*   **The Kidney Clock**: Regulated by fluid intake and blood pressure rhythms.

### The Danger of Circadian Desynchronization
Circadian desynchronization occurs when you send conflicting timing signals to your master and peripheral clocks. 
*   **Midnight Dining**: If you eat a heavy meal at midnight, you tell your liver and gut clocks that it is "midday" (feeding phase). However, because it is dark, your SCN master clock is signaling "night" (sleep/repair phase).
*   **Organ Conflict**: This conflict shifts organ function out of phase, leading to metabolic strain, digestive issues, and disrupted insulin signaling.

> [!TIP]
> Align your food intake with daylight. Keeping your feeding window within daylight hours ensures SCN and liver clocks are synchronized, promoting optimal fat oxidation and immune health.
    `,
  },
  {
    slug: "sleep-safe-caffeine-decay",
    title: "The Sleep-Safe Caffeine Decay Protocol",
    excerpt: "A mathematical and biological guide to tracking caffeine clearance, half-life variations, and locking in your daily cutoff time.",
    category: "protocol",
    categoryLabel: "Protocol",
    date: "2026-06-30",
    readTime: "8 min",
    content: `
# The Sleep-Safe Caffeine Decay Protocol

Caffeine is the world's most widely consumed psychoactive substance. While it is highly effective for masking fatigue, its long metabolic clearance curve poses a hidden threat to sleep architecture.

To protect your slow-wave deep sleep, you must understand the mathematics of caffeine clearance.

### The Half-Life and Quarter-Life Curve
Caffeine is metabolized in the liver by the **CYP1A2 enzyme**. 
*   **Half-Life (5 to 7 hours)**: If you consume a cup of coffee (100mg of caffeine) at 2:00 PM, approximately 50mg of active caffeine remains in your bloodstream at 8:00 PM.
*   **Quarter-Life (10 to 12 hours)**: At midnight, 25mg of active caffeine is still circulating in your brain. 

Even if you can fall asleep with 25mg of caffeine in your system, the active molecule blockades adenosine receptors, suppressing deep slow-wave delta sleep by up to 30%.

> [!IMPORTANT]
> The genetic variations in the CYP1A2 gene categorize individuals into fast and slow metabolizers. Slow metabolizers require up to 12 hours to clear caffeine to safe sleep thresholds.

### Scheduling Your Caffeine Cutoff
To lock in your personal caffeine wall, apply this 3-step calculation:
1.  **Establish Sleep Target**: Identify your target sleep window (e.g. 11:00 PM).
2.  **Backtrack 10 Hours**: To ensure circulating caffeine is below the disruptive threshold, set your strict **caffeine cutoff wall** 10 hours before sleep (e.g. 1:00 PM).
3.  **Adenosine Delay**: Delay morning intake by 90 minutes after waking to allow adenosine to clear naturally, preventing a caffeine-induced afternoon crash.
    `,
  },
];
