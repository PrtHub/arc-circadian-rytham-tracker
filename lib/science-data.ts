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
];
