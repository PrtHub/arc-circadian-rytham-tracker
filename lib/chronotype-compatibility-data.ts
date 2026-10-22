export interface CompatibilityPairingData {
  slug: string;
  typeA: {
    slug: string;
    name: string;
    icon: string;
    tag: string;
    wake: string;
    bed: string;
  };
  typeB: {
    slug: string;
    name: string;
    icon: string;
    tag: string;
    wake: string;
    bed: string;
  };
  title: string;
  description: string;
  keywords: string;
  bedGap: string;
  wakeGap: string;
  sharedAwakeHours: string;
  verdict: string;
  strengths: string[];
  challenges: string[];
  coSleepingRules: string[];
  scientificAnalysis: string;
  faqs: { q: string; a: string }[];
}

export const COMPATIBILITY_PAIRINGS: Record<string, CompatibilityPairingData> = {
  "lion-and-wolf": {
    slug: "lion-and-wolf",
    typeA: {
      slug: "lion",
      name: "Lion",
      icon: "🦁",
      tag: "Early Riser",
      wake: "6:00 AM",
      bed: "10:00 PM",
    },
    typeB: {
      slug: "wolf",
      name: "Wolf",
      icon: "🐺",
      tag: "Night Owl",
      wake: "8:45 AM",
      bed: "12:30 AM",
    },
    title: "Lion and Wolf Sleep Compatibility: Bedtime Gaps & Co-Sleeping Survival Guide | ARC",
    description:
      "Can an early-rising Lion and a night-owl Wolf share a bedroom without sleep divorce? Explore the 2.5-hour bedtime gap, shared awake hours, and practical sleep solutions.",
    keywords:
      "lion and wolf compatibility, lion and wolf sleep schedule, early bird and night owl relationship, chronotype couples compatibility, lion wolf co sleeping",
    bedGap: "2.5 hours",
    wakeGap: "2 hours 45 min",
    sharedAwakeHours: "10:00 AM – 8:30 PM (~10.5 hours)",
    verdict: "Opposite Chronotypes — High Friction, High Growth Potential",
    strengths: [
      "Guaranteed quiet solo time: Lion enjoys peaceful early mornings while Wolf sleeps in.",
      "Wolf enjoys quiet late evenings for creative or analytical deep focus.",
      "Clear division of household responsibilities across early morning and late night.",
      "Healthy boundary: neither partner feels suffocated or obligated to share 24/7 routines.",
    ],
    challenges: [
      "Largest bedtime offset of any pairing (10:00 PM vs. 12:30 AM).",
      "Morning alarm clash: Lion's 6:00 AM alarm often lands right during Wolf's deepest REM sleep cycle.",
      "Evening restlessness: Wolf entering the bedroom past midnight risks waking the light-sleeping Lion.",
      "Limited evening date night endurance: Lion crashes by 9:00 PM, just as Wolf's cognitive energy peaks.",
    ],
    coSleepingRules: [
      "Adopt the Scandinavian Sleep Method: Use two separate twin duvets on one king mattress to eliminate midnight blanket rustling.",
      "Vibrating Silent Alarms: Lion must wake using an Apple Watch or silent vibrating wristband rather than an audio alarm.",
      "Pre-Packed Morning Routine: Lion sets clothes and toiletries outside the bedroom the night before to avoid opening closets in the morning.",
      "Amber Nightlights & Separate Wind-Down Zone: Wolf remains in the living room under warm dim lamps until ready to slip into bed in total darkness.",
    ],
    scientificAnalysis:
      "The Lion-Wolf pairing represents the extreme ends of human circadian variation. Lions have an advanced phase angle with early melatonin secretion and a core body temperature minimum (Tmin) around 4:00 AM. Wolves have a delayed phase angle with Tmin near 7:00 AM and melatonin onset hours later. Forcing both to sleep at the same hour causes chronic circadian dysregulation for one partner. Honouring the 2.5-hour offset preserves slow-wave sleep for both.",
    faqs: [
      {
        q: "Can a Lion and a Wolf successfully share a bed?",
        a: "Yes. Clinical sleep studies show couples with opposite chronotypes sleep soundly together by adopting separate blankets (the Scandinavian sleep method), silent vibrating alarms, and leaving the bedroom when awake rather than browsing phones in bed.",
      },
      {
        q: "What are the best shared hours for Lion and Wolf?",
        a: "Their biological overlap occurs between 10:00 AM and 8:30 PM. This provides roughly 10.5 hours of synchronized waking time for meals, shared activities, and conversation before the Lion enters their wind-down phase.",
      },
      {
        q: "Should a Wolf try to force themselves to wake up early with the Lion?",
        a: "No. Chronotype is genetically anchored in PER3, CLOCK, and CRY1 gene polymorphisms. Forcing a natural Wolf into a 6:00 AM schedule creates chronic social jetlag, elevated evening cortisol, and suppressed cognitive performance.",
      },
    ],
  },
  "bear-and-wolf": {
    slug: "bear-and-wolf",
    typeA: {
      slug: "bear",
      name: "Bear",
      icon: "🐻",
      tag: "Solar Rhythm",
      wake: "7:00 AM",
      bed: "11:00 PM",
    },
    typeB: {
      slug: "wolf",
      name: "Wolf",
      icon: "🐺",
      tag: "Night Owl",
      wake: "8:45 AM",
      bed: "12:30 AM",
    },
    title: "Bear and Wolf Chronotype Compatibility: Schedule Alignment & Relationship Guide | ARC",
    description:
      "Can a solar-guided Bear and a late-night Wolf synchronize their lives? Discover the 1.5-hour bedtime gap, weekend drift traps, and co-sleeping advice.",
    keywords:
      "bear and wolf compatibility, bear wolf relationship, bear and wolf sleep schedule, chronotype compatibility bear wolf, night owl and solar rhythm couples",
    bedGap: "1.5 hours",
    wakeGap: "1 hour 45 min",
    sharedAwakeHours: "10:00 AM – 9:30 PM (~11.5 hours)",
    verdict: "Moderate Chronotype Gap — Highly Adaptable with Ground Rules",
    strengths: [
      "Bear provides a steady solar anchor that prevents the Wolf from drifting into extreme delayed phase.",
      "Substantial overlapping daytime hours (11.5 hours of shared wakefulness).",
      "Wolf's late-afternoon surge complements the Bear's post-slump energy recovery.",
      "Manageable bedtime gap (around 90 minutes) that allows shared evening dinner and wind-down.",
    ],
    challenges: [
      "Bear's early morning energy vs. Wolf's severe 8:00 AM sleep inertia.",
      "The weekend drift trap: Bear wants Sunday morning breakfast out, while Wolf wants to sleep until 10:30 AM.",
      "Bear fades around 10:30 PM while Wolf gets a second wind of creativity and conversational energy.",
    ],
    coSleepingRules: [
      "Shared Bedtime Wind-Down: Cuddle or talk in bed from 10:30 PM to 11:00 PM under dim amber lighting; then the Wolf gets up to work or read in another room.",
      "Weekend Compromise: Limit weekend sleep-in discrepancies to 60 minutes to prevent acute Monday social jetlag for both.",
      "Separate Bedding: Use individual duvets so Wolf's late arrival into bed at 12:30 AM does not physically jar the sleeping Bear.",
      "Post-Lunch Walk Together: Synchronize around the Bear's 2:30 PM slump with an outdoor walk, which doubles as the Wolf's midday light dose.",
    ],
    scientificAnalysis:
      "The Bear represents the median 50% of the population, closely synchronized with the solar cycle. Wolves sit roughly 90 to 120 minutes behind. Because the gap is moderate, the primary risk is not marital incompatibility but behavioral contagion: Bears frequently stay up past midnight to match their Wolf partner, suffering chronic sleep deprivation and morning grogginess.",
    faqs: [
      {
        q: "Is Bear and Wolf a good relationship match?",
        a: "Very good. Because 50% of the population are Bears and 20% are Wolves, this is one of the most common pairings. The 1.5-hour bedtime offset is manageable with simple bedroom etiquette.",
      },
      {
        q: "How can a Bear and Wolf handle weekend mornings?",
        a: "The Bear can enjoy solo morning hobbies, coffee, or exercise from 7:00 AM to 9:00 AM without waking the Wolf. Meeting in the kitchen at 9:30 AM for a late breakfast keeps both partners refreshed.",
      },
      {
        q: "Why do Bears feel tired when dating a Wolf?",
        a: "Bears often feel tempted to stay up until 12:30 AM to spend late-night time with their Wolf partner, but their biological clock still wakes them at 7:00 AM, resulting in a silent 1.5-hour sleep deficit every night.",
      },
    ],
  },
  "bear-and-lion": {
    slug: "bear-and-lion",
    typeA: {
      slug: "lion",
      name: "Lion",
      icon: "🦁",
      tag: "Early Riser",
      wake: "6:00 AM",
      bed: "10:00 PM",
    },
    typeB: {
      slug: "bear",
      name: "Bear",
      icon: "🐻",
      tag: "Solar Rhythm",
      wake: "7:00 AM",
      bed: "11:00 PM",
    },
    title: "Lion and Bear Chronotype Compatibility: Morning Momentum & Sleep Harmony | ARC",
    description:
      "How compatible are Lions and Bears? Explore their natural 1-hour alignment, synchronized morning momentum, shared afternoon slumps, and bedroom tips.",
    keywords:
      "lion and bear compatibility, lion bear relationship, chronotype compatibility lion bear, early bird couples sleep schedule",
    bedGap: "1 hour",
    wakeGap: "1 hour",
    sharedAwakeHours: "8:00 AM – 9:00 PM (~13 hours)",
    verdict: "High Natural Alignment — Harmonious Early-Riser Synergy",
    strengths: [
      "Closest natural circadian alignment across different chronotypes (only a 60-minute gap).",
      "Over 13 hours of shared awake time every single day.",
      "Shared morning productivity and appreciation for daylight and outdoor activities.",
      "Neither partner wants to stay up late, eliminating midnight bedroom disruptions.",
    ],
    challenges: [
      "Staggered afternoon slumps: Lion crashes at 1:30 PM, Bear crashes at 2:30 PM.",
      "Evening social plans are difficult: both struggle with dinners or events starting after 8:30 PM.",
      "Lion's 6:00 AM alarm can awaken the Bear during their final sleep cycle.",
    ],
    coSleepingRules: [
      "Silent Wake-Up for Lion: Use a haptic smart watch alarm so Lion slips out of bed without disturbing Bear's final hour of sleep.",
      "Early Evening Wind-Down: Begin lowering house lights by 9:00 PM; Lion sleeps at 10:00 PM while Bear reads quietly until 11:00 PM.",
      "Shared Morning Sunlight: Step outside together around 7:30 AM for mutual morning circadian anchoring.",
    ],
    scientificAnalysis:
      "Lions and Bears share morning-oriented circadian phase angles. Both exhibit robust cortisol awakening responses within an hour of dawn and begin winding down within 2 hours of astronomical sunset. This creates exceptional domestic harmony, as meal times, exercise habits, and bedroom temperature preferences closely match.",
    faqs: [
      {
        q: "Are Lions and Bears naturally compatible?",
        a: "Yes. Lion and Bear pairings report among the highest sleep satisfaction of any mixed-chronotype couples because their bedtimes and wake times differ by only one hour.",
      },
      {
        q: "What time should a Lion and Bear eat dinner?",
        a: "Between 6:00 PM and 7:00 PM. This allows the Lion 3 full hours to digest before their 10:00 PM bedtime, preventing elevated resting heart rate and gastroesophageal reflux during sleep.",
      },
    ],
  },
  "bear-and-dolphin": {
    slug: "bear-and-dolphin",
    typeA: {
      slug: "bear",
      name: "Bear",
      icon: "🐻",
      tag: "Solar Rhythm",
      wake: "7:00 AM",
      bed: "11:00 PM",
    },
    typeB: {
      slug: "dolphin",
      name: "Dolphin",
      icon: "🐬",
      tag: "Light Sleeper",
      wake: "6:30 AM",
      bed: "11:30 PM",
    },
    title: "Bear and Dolphin Chronotype Compatibility: Co-Sleeping & Sleep Sensitivity Guide | ARC",
    description:
      "How can a deep-sleeping Bear and a sensitive, light-sleeping Dolphin share a bed peacefully? Overcome nighttime awakenings, snoring friction, and bedroom triggers.",
    keywords:
      "bear and dolphin compatibility, bear dolphin relationship, light sleeper heavy sleeper couples, chronotype compatibility bear dolphin, insomnia co sleeping",
    bedGap: "30 minutes",
    wakeGap: "30 minutes",
    sharedAwakeHours: "7:30 AM – 10:30 PM (~15 hours)",
    verdict: "Close Biological Schedule — Sensitive Co-Sleeping Friction",
    strengths: [
      "Nearly identical daytime waking hours (around 15 hours of shared wakefulness).",
      "Convenient meal and exercise synchronization without circadian tug-of-war.",
      "Bear's calm, steady circadian rhythm provides psychological grounding for the anxious Dolphin.",
      "Manageable bedtime offset: both head to bed around the same 11:00 PM window.",
    ],
    challenges: [
      "Acoustic and motion sensitivity: Bear's snoring, heavy breathing, or tossing easily awakens the hyper-vigilant Dolphin.",
      "Dolphin's midnight wakefulness: When Dolphin wakes up during the night, their tossing or phone-checking disturbs the Bear.",
      "Bedtime anxiety asymmetry: Bear falls asleep in 10 minutes, which can trigger frustration and sleep anxiety in the racing-mind Dolphin.",
      "Morning restlessness: Dolphin often wakes early (6:30 AM) with unspent nervous energy while Bear needs full sleep cycles.",
    ],
    coSleepingRules: [
      "Zero-Motion Mattress: Use a split-king mattress or high-density memory foam to eliminate motion transfer when Bear shifts positions.",
      "Separate Blankets (Scandinavian Method): Eliminates 80% of accidental midnight wake-ups caused by blanket pulling.",
      "Brown Noise Machine: Running a continuous low-frequency sound machine masks Bear's breathing and outdoor neighborhood noise.",
      "Strict Bedroom Boundary: If Dolphin cannot sleep after 20 minutes, they must leave the bed and read under dim amber light in the living room.",
    ],
    scientificAnalysis:
      "Dolphins exhibit genetically atypical sleep architecture characterized by elevated central nervous system arousal, higher nocturnal core body temperature, and fragmented stage 3 slow-wave sleep. Bears, in contrast, have deep, restorative sleep cycles closely aligned with solar cycles. Co-sleeping friction in this couple is almost purely mechanical and sensory rather than circadian. Protecting the Dolphin from sensory triggers preserves sleep quality for both.",
    faqs: [
      {
        q: "Can a heavy-sleeping Bear and an insomniac Dolphin sleep in the same bed?",
        a: "Yes, provided the bedroom is acoustically and mechanically isolated. A motion-isolating mattress, continuous brown noise, separate duvets, and an eye mask allow 85% of Bear-Dolphin couples to co-sleep without waking each other.",
      },
      {
        q: "What should the Dolphin do when they can't fall asleep next to a snoring Bear?",
        a: "Follow stimulus control therapy: do not lie in bed frustrated. Slip out of bed quietly, sit in another room with dim amber lighting, and practice non-sleep deep rest (NSDR) or light reading until sleep pressure returns.",
      },
      {
        q: "What are the shared peak focus hours for Bear and Dolphin?",
        a: "Both chronotypes experience their primary cognitive peak between 10:00 AM and 1:00 PM. This is their optimal window for collaborative deep work, joint decision-making, and high-stakes conversations.",
      },
    ],
  },
  "lion-and-bear": {
    slug: "bear-and-lion",
    typeA: {
      slug: "lion",
      name: "Lion",
      icon: "🦁",
      tag: "Early Riser",
      wake: "6:00 AM",
      bed: "10:00 PM",
    },
    typeB: {
      slug: "bear",
      name: "Bear",
      icon: "🐻",
      tag: "Solar Rhythm",
      wake: "7:00 AM",
      bed: "11:00 PM",
    },
    title: "Lion and Bear Chronotype Compatibility: Morning Momentum & Sleep Harmony | ARC",
    description:
      "How compatible are Lions and Bears? Explore their natural 1-hour alignment, synchronized morning momentum, shared afternoon slumps, and bedroom tips.",
    keywords:
      "lion and bear compatibility, lion bear relationship, chronotype compatibility lion bear, early bird couples sleep schedule",
    bedGap: "1 hour",
    wakeGap: "1 hour",
    sharedAwakeHours: "8:00 AM – 9:00 PM (~13 hours)",
    verdict: "High Natural Alignment — Harmonious Early-Riser Synergy",
    strengths: [
      "Closest natural circadian alignment across different chronotypes (only a 60-minute gap).",
      "Over 13 hours of shared awake time every single day.",
      "Shared morning productivity and appreciation for daylight and outdoor activities.",
      "Neither partner wants to stay up late, eliminating midnight bedroom disruptions.",
    ],
    challenges: [
      "Staggered afternoon slumps: Lion crashes at 1:30 PM, Bear crashes at 2:30 PM.",
      "Evening social plans are difficult: both struggle with dinners or events starting after 8:30 PM.",
      "Lion's 6:00 AM alarm can awaken the Bear during their final sleep cycle.",
    ],
    coSleepingRules: [
      "Silent Wake-Up for Lion: Use a haptic smart watch alarm so Lion slips out of bed without disturbing Bear's final hour of sleep.",
      "Early Evening Wind-Down: Begin lowering house lights by 9:00 PM; Lion sleeps at 10:00 PM while Bear reads quietly until 11:00 PM.",
      "Shared Morning Sunlight: Step outside together around 7:30 AM for mutual morning circadian anchoring.",
    ],
    scientificAnalysis:
      "Lions and Bears share morning-oriented circadian phase angles. Both exhibit robust cortisol awakening responses within an hour of dawn and begin winding down within 2 hours of astronomical sunset. This creates exceptional domestic harmony, as meal times, exercise habits, and bedroom temperature preferences closely match.",
    faqs: [
      {
        q: "Are Lions and Bears naturally compatible?",
        a: "Yes. Lion and Bear pairings report among the highest sleep satisfaction of any mixed-chronotype couples because their bedtimes and wake times differ by only one hour.",
      },
      {
        q: "What time should a Lion and Bear eat dinner?",
        a: "Between 6:00 PM and 7:00 PM. This allows the Lion 3 full hours to digest before their 10:00 PM bedtime, preventing elevated resting heart rate and gastroesophageal reflux during sleep.",
      },
    ],
  },
};
