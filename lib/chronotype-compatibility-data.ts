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
  "lion-and-dolphin": {
    slug: "lion-and-dolphin",
    typeA: {
      slug: "lion",
      name: "Lion",
      icon: "🦁",
      tag: "Early Riser",
      wake: "6:00 AM",
      bed: "10:00 PM",
    },
    typeB: {
      slug: "dolphin",
      name: "Dolphin",
      icon: "🐬",
      tag: "Light Sleeper",
      wake: "6:30 AM",
      bed: "11:30 PM",
    },
    title: "Lion and Dolphin Chronotype Compatibility: Sleep Schedule & Co-Sleeping Tips | ARC",
    description:
      "Can an ambitious early Lion and a sensitive light-sleeping Dolphin share a bedroom peacefully? Manage the 1.5-hour bedtime offset, alarm sensitivity, and evening wind-down.",
    keywords:
      "lion and dolphin compatibility, lion dolphin relationship, chronotype compatibility lion dolphin, early bird insomniac couples, co sleeping light sleeper",
    bedGap: "1.5 hours",
    wakeGap: "30 minutes",
    sharedAwakeHours: "7:00 AM – 9:30 PM (~14.5 hours)",
    verdict: "Morning Synchronization — Evening Sleep Onset Friction",
    strengths: [
      "Close morning wake-up times (only 30 minutes apart) make mornings harmonious.",
      "Both partners appreciate a quiet, structured start to the day.",
      "Lion's grounded bedtime routine can help reduce Dolphin's evening hyper-vigilance.",
      "Substantial daytime overlap for shared meals, errands, and quality time.",
    ],
    challenges: [
      "Bedtime asymmetry: Lion falls asleep effortlessly at 10:00 PM, which can trigger frustration and anxiety in the sleepless Dolphin.",
      "Lion's 6:00 AM movement risks waking the hyper-alert Dolphin before their final sleep cycle completes.",
      "Dolphin gets a late cognitive second wind around 9:30 PM just as the Lion's brain completely shuts down.",
    ],
    coSleepingRules: [
      "Separate Wind-Down Spaces: Lion enters the dark bedroom at 10:00 PM while Dolphin reads in another room under dim amber light until drowsiness strikes.",
      "Haptic Alarms Only: Lion must wear a vibrating watch to prevent auditory alarms from jolting Dolphin awake.",
      "Continuous Brown Noise: Masks Lion's natural morning rustling and nighttime breathing.",
      "Scandinavian Duvets: Two individual twin comforters on one mattress prevent nocturnal awakenings from sheet movement.",
    ],
    scientificAnalysis:
      "Lions possess a pronounced morning circadian phase with early cortisol awakening response and early melatonin onset. Dolphins, however, exhibit dysregulated circadian cortisol curves, frequently spiking in the late evening. When sleeping together, the Lion's rapid sleep latency (falling asleep in under 10 minutes) can highlight the Dolphin's sleep latency anxiety. Establishing physical separation during the 10:00 PM to 11:30 PM window protects both partners.",
    faqs: [
      {
        q: "How can a Lion and a Dolphin co-sleep without waking each other?",
        a: "The biggest priority is preventing the Lion's 6:00 AM wake-up from disturbing the Dolphin. Using a haptic vibrating smartwatch alarm, a white/brown noise machine, and pre-staging the Lion's clothes outside the bedroom solves 90% of morning friction.",
      },
      {
        q: "What should the Dolphin do while the Lion is sleeping at 10:00 PM?",
        a: "The Dolphin should avoid lying awake in bed next to a sleeping partner, as this triggers conditioned insomnia. Instead, relax in a dimly lit living area with an audiobook, fiction reading, or gentle stretching until genuine sleepiness occurs.",
      },
    ],
  },
  "wolf-and-dolphin": {
    slug: "wolf-and-dolphin",
    typeA: {
      slug: "wolf",
      name: "Wolf",
      icon: "🐺",
      tag: "Night Owl",
      wake: "8:45 AM",
      bed: "12:30 AM",
    },
    typeB: {
      slug: "dolphin",
      name: "Dolphin",
      icon: "🐬",
      tag: "Light Sleeper",
      wake: "6:30 AM",
      bed: "11:30 PM",
    },
    title: "Wolf and Dolphin Chronotype Compatibility: Night Owls & Light Sleepers | ARC",
    description:
      "How do night owls (Wolves) and light sleepers (Dolphins) navigate shared sleep? Discover wake-up gaps, midnight boundary rules, and bedtime anxiety strategies.",
    keywords:
      "wolf and dolphin compatibility, wolf dolphin relationship, night owl light sleeper couples, chronotype compatibility wolf dolphin",
    bedGap: "1 hour",
    wakeGap: "2 hours 15 min",
    sharedAwakeHours: "9:00 AM – 11:00 PM (~14 hours)",
    verdict: "High Psychological Empathy — Acute Morning & Midnight Friction",
    strengths: [
      "Mutual understanding: neither partner feels forced into a rigid, judgmental early-bird mold.",
      "Late-evening companionship: both are naturally alert past 9:00 PM for deep conversation or entertainment.",
      "Shared sensitivity to sleep deprivation builds deep domestic compassion.",
      "Dolphin's quiet early morning hours provide undisturbed solo peace while Wolf sleeps soundly.",
    ],
    challenges: [
      "Wake time disparity: Dolphin is awake at 6:30 AM while Wolf is in deep restorative sleep until nearly 9:00 AM.",
      "Late bedroom entry: Wolf coming to bed at 12:30 AM easily awakens the light-sleeping, hyper-alert Dolphin.",
      "Sleep anxiety contagion: if both partners have a rough sleep night, mutual fatigue can strain daytime patience.",
    ],
    coSleepingRules: [
      "Midnight Entry Protocol: Wolf brushes teeth and gets changed in a separate bathroom before entering the master bedroom in total darkness.",
      "Dolphin's Morning Exit: When Dolphin wakes at 6:30 AM, they slip out of bed immediately without using bedside lights.",
      "Zero-Motion Memory Foam Mattress: Dampens vibrations when either partner shifts during the night.",
      "Separate Bedding: Essential to prevent middle-of-the-night blanket tugging.",
    ],
    scientificAnalysis:
      "Both Wolves and Dolphins deviate significantly from standard solar chronobiology. Wolves have delayed phase angles, while Dolphins have nervous system hyper-arousal and fragmented sleep architecture. The key danger in this relationship is evening stimulation: because both are awake and talkative late into the night, they can inadvertently reinforce each other's sleep delay. Setting a mutual 'digital wind-down' hour at 11:00 PM stabilizes both clocks.",
    faqs: [
      {
        q: "Why do Wolf and Dolphin couples often struggle with bedtime?",
        a: "Both chronotypes experience late-evening alertness. However, while the Wolf can sleep late into the morning to recover, the Dolphin often wakes up early due to high morning cortisol, leading to cumulative sleep debt for the Dolphin.",
      },
      {
        q: "What is the best co-sleeping setup for Wolf and Dolphin?",
        a: "A king-size motion-isolating pocket-spring or memory foam mattress, separate duvets, an eye mask for the Dolphin, and a strict rule that the Wolf slips into bed silently after midnight without turning on bedside lights.",
      },
    ],
  },
  "bear-and-bear": {
    slug: "bear-and-bear",
    typeA: {
      slug: "bear",
      name: "Bear 1",
      icon: "🐻",
      tag: "Solar Rhythm",
      wake: "7:00 AM",
      bed: "11:00 PM",
    },
    typeB: {
      slug: "bear",
      name: "Bear 2",
      icon: "🐻",
      tag: "Solar Rhythm",
      wake: "7:00 AM",
      bed: "11:00 PM",
    },
    title: "Bear and Bear Chronotype Compatibility: The Solar Rhythm Power Couple | ARC",
    description:
      "When two Bears date or marry: explore the seamless 0-hour bedtime gap, synchronized 10:00 AM focus peaks, mutual afternoon slumps, and the weekend oversleeping trap.",
    keywords:
      "bear and bear compatibility, two bears relationship, bear chronotype couple, solar rhythm sleep compatibility, bear chronotype co sleeping",
    bedGap: "0 hours (Identical)",
    wakeGap: "0 hours (Identical)",
    sharedAwakeHours: "7:00 AM – 11:00 PM (~16 hours)",
    verdict: "Perfect Circadian Synchrony — Watch Out for Mutual Weekend Drift",
    strengths: [
      "Identical biological clocks: wake up together at 7:00 AM and head to bed together at 11:00 PM.",
      "Shared daily energy curve: both feel energetic around 10:00 AM and ready for dinner by 7:00 PM.",
      "Over 16 hours of shared wakefulness every day with zero schedule friction.",
      "Standard societal compatibility: both naturally align with standard work and school schedules.",
    ],
    challenges: [
      "Mutual 2:30 PM afternoon slump: both crash at the exact same hour, leading to joint lethargy.",
      "The weekend drift trap: if one Bear suggests sleeping in until 10:00 AM, both do, causing severe Monday morning social jetlag.",
      "Complacency in bedtime discipline: staying up together to watch 'one more episode' robs both of critical sleep.",
    ],
    coSleepingRules: [
      "Mutual 11:00 PM Lights Out: Use your shared clock to your advantage with a strict joint bedtime pact.",
      "Conquer the Afternoon Slump Together: Step outside for a brisk 15-minute walk together at 2:30 PM rather than turning to afternoon caffeine.",
      "Cap Weekend Lie-Ins at 8:15 AM: Prevents Sunday night sleep-onset delay and preserves easy Monday mornings.",
      "Morning Sunlight Protocol: Open the blinds together at 7:00 AM to flood the bedroom with circadian-resetting daylight.",
    ],
    scientificAnalysis:
      "Because approximately 50% to 55% of the human population are Bears, Bear-Bear pairings are the most common relationship combination. Both partners have master clocks tightly synchronized to the solar cycle, with core body temperature rising around dawn and melatonin secretion commencing shortly after sunset. Circadian friction is practically non-existent; the primary hazard is behavioral contagion where poor sleep hygiene habits are mutually reinforced.",
    faqs: [
      {
        q: "Is Bear and Bear the easiest chronotype match?",
        a: "Yes. In clinical sleep surveys, couples with identical chronotypes report the lowest rates of sleep conflict and the highest satisfaction with bedroom intimacy and shared morning routines.",
      },
      {
        q: "How can two Bears prevent weekend sleep inertia?",
        a: "Keep weekend wake-up times within 60 to 75 minutes of your weekday alarm. If you wake at 7:00 AM during the week, don't sleep past 8:15 AM on Saturday and Sunday.",
      },
    ],
  },
  "wolf-and-wolf": {
    slug: "wolf-and-wolf",
    typeA: {
      slug: "wolf",
      name: "Wolf 1",
      icon: "🐺",
      tag: "Night Owl",
      wake: "8:45 AM",
      bed: "12:30 AM",
    },
    typeB: {
      slug: "wolf",
      name: "Wolf 2",
      icon: "🐺",
      tag: "Night Owl",
      wake: "8:45 AM",
      bed: "12:30 AM",
    },
    title: "Wolf and Wolf Chronotype Compatibility: The Late-Night Creative Duo | ARC",
    description:
      "When two night owls share a life: explore midnight focus synergy, vibrant late-night dinners, morning wake-up survival, and how to prevent runaway sleep drift.",
    keywords:
      "wolf and wolf compatibility, two wolves relationship, two night owls dating, wolf chronotype couple schedule, night owl co sleeping",
    bedGap: "0 hours (Identical)",
    wakeGap: "0 hours (Identical)",
    sharedAwakeHours: "9:00 AM – 1:00 AM (~16 hours)",
    verdict: "Creative Nighttime Utopia — High Morning Vulnerability",
    strengths: [
      "Zero morning guilt: neither partner judges the other for needing time to clear morning sleep inertia.",
      "Peak shared creativity: both hit their stride between 5:00 PM and 11:00 PM.",
      "Vibrant evening life: late dinners, spontaneous evening outings, and midnight projects feel natural.",
      "Complete harmony in bedroom timing: both turn in around 12:30 AM to 1:00 AM without sleep offsets.",
    ],
    challenges: [
      "Severe vulnerability to standard 9-to-5 corporate schedules and school commitments.",
      "Runaway sleep drift: without an early-bird partner to anchor the household, bedtimes can easily slip to 2:00 AM or 3:00 AM.",
      "Mornings can be disorganized if neither partner has morning executive energy.",
    ],
    coSleepingRules: [
      "Install Smart Sunrise Simulator Lights: Program bedroom lights to gradually illuminate from 8:00 AM to 8:30 AM to simulate natural dawn.",
      "Household Caffeine Cutoff at 3:00 PM: Protects both partners from late-afternoon caffeine stacking that pushes bedtime past 1:00 AM.",
      "Meal Prep the Night Before: Because morning executive function is low for both, prep breakfast and work clothes the evening prior.",
      "Weekend Drift Ceiling: Never let weekend bedtime slip past 1:30 AM to avoid debilitating Monday morning jetlag.",
    ],
    scientificAnalysis:
      "Two Wolves sharing a household experience profound psychological validation. Both partners produce melatonin hours later than the general population and reach their core body temperature minimum around 6:30 AM. However, without external zeitgeber discipline, two evening types can enter a positive feedback loop of delayed sleep phase, where late-night stimulation pushes bedtimes increasingly later.",
    faqs: [
      {
        q: "Can two night owls have a successful corporate schedule together?",
        a: "Yes, by creating strict morning environmental triggers: automated sunrise lamps, bright overhead LEDs at 8:30 AM, and 20 minutes of outdoor morning sunlight together to advance your biological master clocks.",
      },
      {
        q: "What is the biggest advantage of a Wolf-Wolf couple?",
        a: "Complete absence of circadian judgment. Neither partner is ever accused of being 'lazy' for sleeping until 9:00 AM, and both enjoy lively late-evening conversations and shared hobbies.",
      },
    ],
  },
  "lion-and-lion": {
    slug: "lion-and-lion",
    typeA: {
      slug: "lion",
      name: "Lion 1",
      icon: "🦁",
      tag: "Early Riser",
      wake: "6:00 AM",
      bed: "10:00 PM",
    },
    typeB: {
      slug: "lion",
      name: "Lion 2",
      icon: "🦁",
      tag: "Early Riser",
      wake: "6:00 AM",
      bed: "10:00 PM",
    },
    title: "Lion and Lion Chronotype Compatibility: The Early-Bird Power Couple | ARC",
    description:
      "When two early risers unite: explore 5:30 AM workouts, unmatched morning productivity, evening social limits, and how two Lions optimize shared sleep.",
    keywords:
      "lion and lion compatibility, two lions relationship, two early birds dating, lion chronotype couple schedule, early riser co sleeping",
    bedGap: "0 hours (Identical)",
    wakeGap: "0 hours (Identical)",
    sharedAwakeHours: "6:00 AM – 9:30 PM (~15.5 hours)",
    verdict: "High Morning Drive & Discipline — The 9:00 PM Social Crash",
    strengths: [
      "Flawless morning synergy: both wake energized around 6:00 AM with zero morning grogginess.",
      "Shared morning workouts, dawn runs, and peaceful early breakfast rituals.",
      "Both complete their high-leverage deep work early in the day before distractions begin.",
      "Effortless bedtime alignment: both are naturally sleepy and ready for lights-out by 10:00 PM.",
    ],
    challenges: [
      "Extremely limited evening stamina: both crash hard by 9:00 PM, making late dinners or evening events difficult.",
      "Mutual afternoon slump: both experience a heavy dip between 1:00 PM and 2:30 PM.",
      "High morning ambition can sometimes lead to domestic scheduling friction or competition.",
    ],
    coSleepingRules: [
      "Schedule Dinners Early (6:00 PM – 6:30 PM): Gives both Lions 3 full hours to digest before 10:00 PM sleep.",
      "Dim Overhead Lights by 8:30 PM: Complements natural early melatonin release and prepares both for restful sleep.",
      "Protect Shared Morning Walks: Step outside at dawn together to reinforce your synchronized cortisol awakening response.",
      "Embrace the 'Early Exit': Politely excuse yourselves from evening parties by 9:30 PM without social guilt.",
    ],
    scientificAnalysis:
      "Lion-Lion couples share an advanced circadian phase angle characterized by early-onset dim light melatonin onset (DLMO) and early morning core body temperature minimums. Their cardiovascular and cognitive metrics peak simultaneously before noon. Domestic harmony is exceptionally high, though both must actively guard against afternoon burnout and respect their body's need for an early sleep onset.",
    faqs: [
      {
        q: "What time should two Lions eat dinner?",
        a: "Ideally between 6:00 PM and 6:45 PM. Lions go to bed around 10:00 PM, and eating late elevates resting heart rate and interferes with deep slow-wave sleep in the first two sleep cycles.",
      },
      {
        q: "How do Lion couples handle evening social invitations?",
        a: "They thrive by prioritizing daytime and weekend morning socializing (brunches, morning hikes, lunch gatherings) and being transparent about their 9:30 PM wind-down routine.",
      },
    ],
  },
  "dolphin-and-dolphin": {
    slug: "dolphin-and-dolphin",
    typeA: {
      slug: "dolphin",
      name: "Dolphin 1",
      icon: "🐬",
      tag: "Light Sleeper",
      wake: "6:30 AM",
      bed: "11:30 PM",
    },
    typeB: {
      slug: "dolphin",
      name: "Dolphin 2",
      icon: "🐬",
      tag: "Light Sleeper",
      wake: "6:30 AM",
      bed: "11:30 PM",
    },
    title: "Dolphin and Dolphin Chronotype Compatibility: Two Light Sleepers Sharing a Bed | ARC",
    description:
      "When two light sleepers and insomniacs share a bedroom: how to eliminate secondhand sleep anxiety, handle midnight awakenings, and co-sleep peacefully.",
    keywords:
      "dolphin and dolphin compatibility, two dolphins relationship, two insomniacs dating, light sleeper couples, chronotype compatibility dolphin dolphin",
    bedGap: "Variable",
    wakeGap: "Variable",
    sharedAwakeHours: "7:00 AM – 11:00 PM (~16 hours)",
    verdict: "Deep Mutual Empathy — High Risk of Secondhand Sleep Anxiety",
    strengths: [
      "Total empathy for sleep struggles: neither partner ever invalidates insomnia or bedtime sensitivity.",
      "Shared peak cognitive window from 10:00 AM to 1:00 PM for deep collaboration.",
      "Both value bedroom calm, darkness, and low sensory disturbance.",
      "Mutual commitment to clean sleep hygiene and cognitive wind-down protocols.",
    ],
    challenges: [
      "Secondhand insomnia: one partner tossing or waking up immediately alerts the other's hyper-sensitive nervous system.",
      "Anxiety amplification: mutual worrying about sleep onset latency can create a tense bedroom environment.",
      "Light sleep architecture: outdoor noise, temperature changes, or mattress movement easily disturb both partners.",
    ],
    coSleepingRules: [
      "Guilt-Free 'Sleep Divorce' Option: Having a dedicated guest room or separate beds for nights of acute insomnia preserves relationship love and sleep quality.",
      "Motion-Isolating Split Mattress: Essential so that one partner shifting positions does not transmit kinetic vibration to the other.",
      "Strict No-Phone Bedroom Rule: Checking phones or clock-watching in bed triggers sympathetic nervous system arousal in both.",
      "Continuous Brown Noise & Cool Temperature: Keep bedroom at 65°F (18°C) with continuous sound masking to buffer sensory triggers.",
    ],
    scientificAnalysis:
      "Dolphins exhibit elevated nocturnal autonomic nervous system activity, reduced slow-wave delta sleep, and higher night core body temperature. When two Dolphins co-sleep, micro-arousals in one partner easily provoke micro-arousals in the other, leading to compound sleep fragmentation. Implementing rigorous stimulus control therapy and acoustic/motion isolation is essential for long-term health.",
    faqs: [
      {
        q: "Can two Dolphins sleep in the same bed successfully?",
        a: "Yes, but they require the most carefully engineered sleep environment of any pairing: a split-king motion-dampening mattress, separate blankets, 100% blackout shades, continuous brown noise, and an agreed-upon rule to leave the bed if awake for more than 20 minutes.",
      },
      {
        q: "What should two Dolphins do during a night of mutual insomnia?",
        a: "Never stay in bed tossing together. Both partners should quietly move to comfortable seating in another dimly lit room, practice non-sleep deep rest (NSDR) or read paper books, and only return to bed when physical drowsiness returns.",
      },
    ],
  },
};
