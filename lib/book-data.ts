export interface BookDetail {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  publishedDate: string;
  rating: string;
  keyMetric: string;
  excerpt: string;
  arcConnection: string;
  content: string;
}

export const booksData: BookDetail[] = [
  {
    slug: "the-power-of-when",
    title: "The Power of When",
    subtitle: "Discover your genetic chronotype to optimize the timing of your daily activities.",
    author: "Dr. Michael Breus",
    authorTitle: "Clinical Psychologist & Sleep Specialist",
    publishedDate: "2016",
    rating: "4.7/5",
    keyMetric: "4 Chronotypes",
    excerpt: "Dr. Michael Breus outlines why your biology's biological clock governs everything. Discover the science behind Lions, Bears, Wolves, and Dolphins.",
    arcConnection: "Direct foundation of ARC's onboarding quiz and chronotype-specific focus scheduling.",
    content: `
# The Power of When: Timing is Everything

In *The Power of When*, Dr. Michael Breus (known as the "Sleep Doctor") argues that when it comes to peak health and productivity, **when** you do something is just as important as **what** or **how** you do it. Dr. Breus explains that we are genetically programmed to operate on one of four distinct circadian cycles, which he calls **chronotypes**.

### The Biological Mechanism of Chronotypes
Our chronotype is determined by genetics—specifically, variations in clock genes like the **PER3 gene**. These genetic differences dictate our baseline sleep drive, our natural waking times, and the curves of our daily hormone production (primarily cortisol, melatonin, and thyroid-stimulating hormone). 

### The Four Chronotypes
1.  **Lions (15% of population)**: Early risers. Optimistic, analytical, and highly productive in the morning. They naturally wake up around 5:00 AM - 6:00 AM. Their mental peak is between 8:00 AM and 12:00 PM. They crash in the late afternoon and prefer an early bedtime (9:00 PM - 10:00 PM).
2.  **Bears (50% of population)**: Follow the solar cycle. Energetic, friendly, and steady. They naturally wake up around 7:00 AM. Peak productivity is mid-morning (10:00 AM - 2:00 PM). They require a solid 8 hours of sleep and naturally wind down around 11:00 PM.
3.  **Wolves (15-20% of population)**: Night owls. Creative, impulsive, and sharpest in the late afternoon and evening. They struggle to wake up before 9:00 AM. Their peak creative and cognitive windows occur between 5:00 PM and 11:00 PM. They prefer late bedtimes (12:00 AM - 2:00 AM).
4.  **Dolphins (10% of population)**: Light sleepers. Highly intelligent, anxious, and prone to insomnia. Their energy fluctuates irregularly, and they often wake up feeling unrefreshed. They have a split alertness curve, peaking late in the evening.

### The Bio-Time Blueprint: Daily Routine Optimizations
Dr. Breus outlines the biologically correct windows for key activities based on your sleep animal:

#### ☕ Caffeine Consumption
*   **Lions**: 8:00 AM - 10:00 AM (Allow natural cortisol to decline first).
*   **Bears**: 9:30 AM - 11:30 AM.
*   **Wolves**: 11:00 AM - 1:00 PM (Never drink coffee immediately upon waking).
*   **Dolphins**: 9:30 AM - 11:00 AM (Limit total intake to avoid late-night anxiety loops).

#### 🧠 Deep Cognitive Work
*   **Lions**: 8:00 AM - 12:00 PM (Schedule your most critical strategic planning here).
*   **Bears**: 10:00 AM - 2:00 PM.
*   **Wolves**: 4:30 PM - 8:00 PM.
*   **Dolphins**: 3:00 PM - 7:00 PM.

#### 💪 Physical Training
*   **Lions**: 6:30 AM (Morning runs fit their rapid core temperature rise).
*   **Bears**: 7:30 AM or 6:00 PM.
*   **Wolves**: 6:00 PM - 8:00 PM (Training late helps clear built-up adrenaline).
*   **Dolphins**: 6:30 PM (Use moderate exercise to facilitate evening temperature cooling).

> [!IMPORTANT]
> Chronotype mismatches are the leading cause of "social jetlag"—forcing a Wolf to attend an 8 AM team meeting is like asking a Lion to stay productive until 1 AM.

### How ARC Applies This
ARC translates Dr. Breus's scientific schedule into a live, interactive 24-hour visual timeline on your phone. Based on your chronotype, ARC sets your **Peak Focus Windows**, prompts you for **Caffeine Cutoffs**, and adjusts your bedtime alerts automatically so you stop fighting your biology.
    `,
  },
  {
    slug: "why-we-sleep",
    title: "Why We Sleep",
    subtitle: "Unlocking the power of sleep and dreams for physiological and mental longevity.",
    author: "Dr. Matthew Walker",
    authorTitle: "Professor of Neuroscience & Psychology at UC Berkeley",
    publishedDate: "2017",
    rating: "4.8/5",
    keyMetric: "90-Min Cycles",
    excerpt: "A neuroscientist explains why sleep is the single most effective thing we can do to reset our brain and body health.",
    arcConnection: "Powers ARC's Sleep Cycle Calculator and sleep-safe caffeine decay calculations.",
    content: `
# Why We Sleep: Unlocking the Science of Dreams

In *Why We Sleep*, neuroscientist Dr. Matthew Walker explores the physiological and neurological necessity of sleep. Sleep is not a state of passive inactivity; it is a highly active, complex biological process necessary for metabolic health, immune cell production, memory consolidation, and emotional regulation.

### Sleep Architecture: The 90-Minute Cycles
Human sleep is structured in repeating cycles of approximately 90 minutes. Each cycle is a balance between two main modes:
1.  **NREM (Non-Rapid Eye Movement) Sleep**: Divided into four stages. Stages 3 and 4 are known as **Slow-Wave Sleep (SWS)** or Deep Sleep. NREM sleep is responsible for physiological repair, muscle recovery, clearing neural waste, and archiving facts from the hippocampus (short-term) to the cortex (long-term).
2.  **REM (Rapid Eye Movement) Sleep**: The dreaming phase. REM sleep is responsible for emotional processing, integration of complex ideas, motor-skill consolidation, and creative problem-solving.

During the first half of the night, your sleep cycles are dominated by Deep NREM sleep. In the second half, NREM decreases and REM sleep increases. 

> [!WARNING]
> Waking up in the middle of a deep NREM stage triggers **sleep inertia** (severe grogginess). Waking up at the completion of a full 90-minute cycle allows you to transition smoothly to alertness.

### The Glymphatic System: Brain Washing
During slow-wave Deep Sleep, the brain's glial cells shrink by up to 60%, allowing cerebrospinal fluid (CSF) to rush through the interstitial space. This acts as a biological dishwasher, washing out metabolic waste, including **beta-amyloid plaques** (associated with Alzheimer's disease) and **tau proteins**. Without deep sleep, this waste accumulates, leading to cognitive decline.

### The Caffeine and Alcohol Interference
Dr. Walker highlights how common substances destroy sleep quality:
*   **Caffeine**: An adenosine antagonist with a half-life of 5-7 hours. Blocking adenosine receptors masks sleep pressure. Consuming caffeine too close to bedtime blocks slow-wave deep sleep, reducing sleep restoration by up to 30%.
*   **Alcohol**: A central nervous system sedative. Alcohol does not induce sleep; it sedates the brain, leading to fragmented sleep and suppressing REM sleep entirely, destroying emotional recovery and memory.

### How ARC Applies This
ARC translates Dr. Walker's research into two interactive features:
*   **The Sleep Cycle Calculator**: Allows you to calculate optimal bedtimes or alarm times in 90-minute increments, preventing mid-cycle wakeups.
*   **Active Caffeine Decay Tracker**: Visualizes your liver's metabolic clearance curve in real-time, helping you stop caffeine consumption at the exact biological minute required to preserve deep NREM sleep.
    `,
  },
  {
    slug: "change-your-schedule-change-your-life",
    title: "Change Your Schedule, Change Your Life",
    subtitle: "Harness the power of clock genes to lose weight, increase energy, and sleep deeply.",
    author: "Dr. Suhas Kshirsagar",
    authorTitle: "Ayurvedic Physician & Chronobiology Consultant",
    publishedDate: "2018",
    rating: "4.6/5",
    keyMetric: "Fasting Windows",
    excerpt: "Learn how synchronizing your eating, sleeping, and working windows with natural light-dark shifts clears chronic health issues.",
    arcConnection: "Guides ARC's recommendations for morning feeding alignment and digestive sunsets.",
    content: `
# Change Your Schedule, Change Your Life: Clock Genes

Dr. Suhas Kshirsagar blends ancient Ayurvedic daily routines (Dinacharya) with modern chronobiology. He explains that every cell in the human body contains "clock genes" that operate on localized timetables. When your daily activities are misaligned with these clock genes (e.g. eating late at night, sleeping in, working under fluorescent lights), you experience **circadian desynchrony**.

### The Three Shifts of the Day
Dr. Kshirsagar structures the day into three distinct 4-hour cycles:
1.  **Water & Earth (6:00 AM - 10:00 AM)**: Core temperature is rising. Melatonin is dropping. This is the optimal time for hydration, morning light, and physical movement.
2.  **Fire & Focus (10:00 AM - 2:00 PM)**: Digestive fire (Agni) and intellectual concentration are at their peak. Your largest meal should be consumed during this window.
3.  **Air & Movement (2:00 PM - 6:00 PM)**: Coordination and physical agility are high. Great for lighter work, administrative tasks, and exercise.

### The Science of Circadian Nutrition
Eating late at night is highly disruptive to metabolic health. 
*   **Insulin Sensitivity**: Insulin sensitivity drops in the evening as melatonin rises. Eating a heavy meal at 8:00 PM leads to higher blood sugar spikes compared to eating the same meal at 12:00 PM.
*   **Digestive Sunset**: Your body needs to redirect its resources from digestion to cellular repair (autophagy) during sleep. Stop eating at least **3 hours before bedtime** to facilitate a drop in core body temperature.

> [!NOTE]
> Going to sleep with a full stomach causes your heart rate to remain elevated and suppresses human growth hormone (HGH) release during the night.

### How ARC Applies This
ARC uses Dr. Kshirsagar's research to suggest feeding times. The app outlines:
*   Optimal breakfast slots linked to your morning sunlight timer.
*   A **Digestive Sunset** countdown timer reminding you to stop eating 3 hours before bed to ensure a cool core temperature and deep sleep.
    `,
  },
  {
    slug: "the-circadian-code",
    title: "The Circadian Code",
    subtitle: "Lose Weight, Supercharge Your Energy, and Transform Your Health from Morning to Midnight",
    author: "Dr. Satchin Panda",
    authorTitle: "Pioneer Circadian Biologist & Salk Institute Professor",
    publishedDate: "2018",
    rating: "4.8/5",
    keyMetric: "10-Hr Feeding",
    excerpt: "Salk Institute professor Dr. Satchin Panda details the impact of Time-Restricted Eating, light schedules, and sleep timing on metabolic health and longevity.",
    arcConnection: "Directly drives ARC's digestive sunset reminders and morning light counting features.",
    content: `
# The Circadian Code: Supercharge Your Energy

Dr. Satchin Panda is a professor at the Salk Institute and one of the world's leading researchers in circadian biology. In *The Circadian Code*, Dr. Panda presents research showing that managing your biological clock is the single most powerful lever for reversing metabolic syndromes, losing weight, and optimizing immune system response.

### SCN vs Peripheral Clocks
While the Suprachiasmatic Nucleus (SCN) in the brain is the "master clock" synchronized by light, Dr. Panda discovered that **every major organ—the liver, gut, kidneys, and heart—contains its own peripheral clock**.
*   **The Master SCN Clock** is set by light exposure.
*   **Peripheral Clocks** in the liver and kidneys are set primarily by **when we eat**.
When light exposure and eating times are misaligned (e.g. eating late at night while sitting under bright lights), your peripheral organs fall out of sync with your brain, triggering metabolic strain, inflammation, and insulin resistance.

### Time-Restricted Feeding (TRF)
Dr. Panda's research pioneered **Time-Restricted Feeding**. He advocates for keeping all calorie consumption within a strict **8-to-10 hour window** (maximum 12 hours). 
*   **Autophagy**: Keeping a consistent fasting window of 14-16 hours every day gives the liver and kidneys time to halt digestive strain and perform cellular self-cleaning.
*   **Metabolic Reset**: TRF increases insulin sensitivity, decreases systemic inflammation, and naturally deepens sleep quality by preventing nocturnal core temperature spikes.

> [!IMPORTANT]
> A critical rule: your circadian clock begins ticking the moment you consume anything other than water (including black coffee or tea, which trigger liver enzymes).

### How ARC Applies This
ARC integrates Dr. Panda's findings directly into daily routines. By coordinating your sleep timeline, ARC schedules a custom **Feeding Window** tracker, sending alerts when your digestive fire is entering its peak phase (usually around noon) and reminding you to start a "digestive sunset" to begin your 14-hour fast, protecting your liver and sleep.
    `,
  },
  {
    slug: "lifespan",
    title: "Lifespan",
    subtitle: "Why We Age—and Why We Don't Have To",
    author: "Dr. David Sinclair",
    authorTitle: "Harvard Genetics Professor & Longevity Researcher",
    publishedDate: "2019",
    rating: "4.7/5",
    keyMetric: "Cellular Longevity",
    excerpt: "Harvard geneticist Dr. David Sinclair presents a revolutionary theory of aging and outlines how circadian health preserves DNA repair.",
    arcConnection: "Informs ARC's emphasis on sleep as the primary biological longevity and DNA repair window.",
    content: `
# Lifespan: The Circadian Link to Longevity

Dr. David Sinclair, professor of genetics at Harvard Medical School, argues that aging is not an inevitable natural law, but a disease that can be treated. At the core of Dr. Sinclair's research is the **Information Theory of Aging**—the idea that our cells lose their epigenetic identity over time due to DNA damage.

### Sirtuins and the Circadian Connection
Sirtuins are a family of seven enzymes that regulate cellular health, defense, and longevity. However, sirtuins require a molecule called **NAD+** to function, and both sirtuins and NAD+ levels are heavily regulated by the **circadian clock**.
*   **Sirtuins** act as cellular first-responders. When you have DNA damage (from UV light, stress, or toxins), sirtuins leave their post of regulating clock genes to go repair the DNA.
*   **Circadian Drift**: If sirtuins are constantly distracted by repair tasks, or if your sleep-wake rhythm is highly erratic, your cells lose their genetic synchronization, accelerating the physiological aging process.

> [!NOTE]
> Dr. Sinclair explains that keeping a consistent sleep schedule and getting morning sunlight is a primary stressor mitigation strategy that protects cellular age indicators.

### Hormesis Protocols
Dr. Sinclair recommends activating protective "survival genes" through **hormesis**—subtle, healthy physiological stressors:
1.  **Intermittent Fasting**: Limits organ strain and triggers autophagy.
2.  **Cold/Heat Shock**: Triggers sirtuin activation and brown adipose tissue activity.
3.  **Strict Circadian Timing**: Ensures that cellular repair enzymes peak at the correct times of the day (e.g. during deep NREM sleep).

### How ARC Applies This
ARC acts as a biological shield against epigenetic wear. By aligning your daily sleep, focus, and light schedules with your genetic chronotype, ARC minimizes chronic environmental stress and ensures your body's restorative repair systems have designated, uninterrupted windows of operation every single night.
    `,
  },
  {
    slug: "breath",
    title: "Breath",
    subtitle: "The New Science of a Lost Art",
    author: "James Nestor",
    authorTitle: "Science Journalist & Author",
    publishedDate: "2020",
    rating: "4.8/5",
    keyMetric: "Nasal Breathing",
    excerpt: "James Nestor explores the evolutionary shift from nasal to mouth breathing and how correcting your respiratory habits resolves sleep apnea, snoring, and circadian fatigue.",
    arcConnection: "Guides ARC's breathing protocol recommendations during stress checks and morning lung oxygenation timers.",
    content: `
# Breath: The New Science of a Lost Art

In *Breath*, science journalist James Nestor investigates a basic but neglected aspect of human health: how we breathe. Nestor travels the world to explore the evolutionary, physiological, and neurological differences between mouth breathing and nasal breathing, showing that how we inhale and exhale dictates our sleep quality, metabolic speed, and stress levels.

### Mouth Breathing vs. Nasal Breathing
Nestor explains that humans have become chronic mouth breathers due to changes in jaw structure caused by modern soft diets. This shift has severe biological consequences:
*   **Mouth Breathing**: Bypasses the body's natural air filtration and humidification systems. It triggers the sympathetic nervous system ("fight or flight"), raising heart rate, increasing blood pressure, and contributing to sleep apnea, snoring, and daytime fatigue.
*   **Nasal Breathing**: Releases **nitric oxide**, a molecule that plays a vital role in increasing oxygen circulation, dilating blood vessels, and activating the parasympathetic nervous system ("rest and digest"). 

### Sleep Apnea and Circadian Sleep Structure
Mouth breathing during sleep causes the soft tissues in the back of the mouth to collapse, obstructing the airway. This results in **sleep apnea** and snoring, which fragment sleep architecture by forcing the brain to wake up briefly to gasp for air, preventing you from reaching slow-wave deep sleep.

> [!TIP]
> Nestor details "mouth taping"—using a small strip of surgical tape to keep lips closed during sleep—as a simple, effective method to force nasal breathing, eliminate snoring, and deepen sleep.

### Respiratory Protocols
Nestor outlines key exercises to restore optimal breathing:
1.  **Slower Breathing**: Breathe in for 5.5 seconds, and out for 5.5 seconds (about 5.5 breaths per minute). This matches the natural resonance rhythm of human blood circulation.
2.  **Hypoventilation**: Practice breathing less to build carbon dioxide tolerance, which enhances oxygen delivery to cells via the Bohr effect.

### How ARC Applies This
ARC incorporates Nestor's research into daily check-ins and recovery guides. The app prompts you to practice **Nasal Oxygenation** during morning light windows and offers structured 5.5-second breathing guides during high-stress alert periods to help you reset your nervous system.
    `,
  },
  {
    slug: "sleep-smarter",
    title: "Sleep Smarter",
    subtitle: "21 Essential Strategies to Sleep Your Way to a Better Body, Better Health, and Bigger Success",
    author: "Shawn Stevenson",
    authorTitle: "Nutritionist & Sleep Researcher",
    publishedDate: "2016",
    rating: "4.7/5",
    keyMetric: "Light & Sanctuary",
    excerpt: "Shawn Stevenson provides 21 practical lifestyle adjustments covering bedroom environment, gut health, and light signals to double your deep sleep.",
    arcConnection: "Informs ARC's bedroom setup checks, evening temperature cooling prompts, and dietary timing recommendations.",
    content: `
# Sleep Smarter: 21 Strategies to Optimize Sleep

In *Sleep Smarter*, nutritionist and wellness coach Shawn Stevenson presents a guide to improving sleep quality. Stevenson argues that sleep is the single most powerful driver of physical repair, fat loss, and mental clarity, and provides 21 practical strategies to optimize your sleep environment and daily habits.

### Designing the Sleep Sanctuary
Stevenson stresses that the bedroom should be treated as a biological sanctuary optimized for melatonin production and core temperature drops:
*   **Blackout Environments**: Even trace amounts of light (like a standby LED) hitting your skin can disrupt melatonin synthesis. Use blackout curtains and eliminate ambient light sources.
*   **Temperature Control**: Your body must drop its core temperature to initiate deep sleep. Set your room temperature to exactly **60-68°F (15-20°C)**.
*   **Electromagnetic Fields (EMFs)**: Move phones and Wi-Fi routers away from the bed to reduce neurological arousal during sleep.

### Gut Health and Sleep Neurotransmitters
Your gut microbiome is heavily involved in regulating sleep. 
*   **Serotonin Production**: Over 90% of your body's serotonin—the chemical precursor to melatonin—is manufactured in the gut. An inflamed, poorly nourished gut reduces serotonin production, directly impacting sleep latency.
*   **Magnesium Loading**: Stevenson recommends loading up on magnesium, a mineral that relaxes the central nervous system and helps muscles release tension.

> [!WARNING]
> Consuming alcohol before bed sedates the brain but destroys sleep architecture, blocking REM sleep and causing micro-awakenings throughout the night.

### How ARC Applies This
ARC translates Stevenson's sleep hygiene checklist into interactive daily prompts. The app tracks your sleep setup parameters, reminds you to set your room thermostat before bed, and guides you on magnesium and fluid timing so you don't disrupt your sleep gates.
    `,
  },
  {
    slug: "fast-like-a-girl",
    title: "Fast Like a Girl",
    subtitle: "A Woman's Guide to Using the Healing Power of Fasting to Burn Fat, Boost Energy, and Balance Hormones",
    author: "Dr. Mindy Pelz",
    authorTitle: "Holistic Health Expert & Author",
    publishedDate: "2022",
    rating: "4.8/5",
    keyMetric: "Hormonal Fasting",
    excerpt: "Dr. Mindy Pelz outlines how women must customize fasting windows, nutrition, and circadian timing around their monthly menstrual cycle.",
    arcConnection: "Powers ARC's female-specific dietary timing alerts and fasting cycle notifications.",
    content: `
# Fast Like a Girl: Circadian & Cycle Alignment

In *Fast Like a Girl*, Dr. Mindy Pelz provides a guide to fasting specifically tailored for women. Dr. Pelz explains that while standard time-restricted feeding is highly beneficial, women must adapt their eating windows and fast lengths to align with the fluctuations of their monthly hormonal cycles (estrogen, progesterone, and luteinizing hormone).

### The Three Hormonal Phases
Dr. Pelz breaks the menstrual cycle into three distinct phases, each requiring different fasting and nutritional strategies:
1.  **The Power Phase (Days 1-10)**: Estrogen is building. Estrogen thrives on low insulin and low cortisol. This is the optimal window for longer fasting windows (13 to 72 hours) and ketogenic, low-carb eating.
2.  **The Manifestation Phase (Days 11-15)**: Ovulation occurs. Estrogen peaks and testosterone rises. High stress or long fasts can disrupt ovulation. Keep fasting windows short (under 13-15 hours) and focus on hormone-supporting foods.
3.  **The Nurture Phase (Days 20 to the start of menstruation)**: Progesterone is building. Progesterone requires higher glucose levels and is highly sensitive to stress. Fasting during this phase raises cortisol, which suppresses progesterone, leading to anxiety, cravings, and disrupted sleep. **Fasting should be avoided during this phase.**

> [!IMPORTANT]
> Forcing a strict 16:8 fasting protocol during the Nurture Phase can disrupt progesterone production, leading to sleep onset insomnia and mood imbalances.

### How ARC Applies This
ARC integrates Dr. Pelz's menstrual-circadian alignment research by offering custom cycle tracking options. For female users, ARC adapts daily time-restricted feeding targets automatically, softening fasting gates and suggesting carbohydrate and cortisol-reduction routines during the Nurture Phase to protect sleep quality.
    `,
  },
  {
    slug: "peak-performance",
    title: "Peak Performance",
    subtitle: "Elevate Your Game, Avoid Burnout, and Thrive with the New Science of Success",
    author: "Brad Stulberg & Steve Magness",
    authorTitle: "Coaching & Performance Experts",
    publishedDate: "2017",
    rating: "4.6/5",
    keyMetric: "Stress + Rest",
    excerpt: "A guide on how to alternate high-stress cognitive output with deep biological recovery to achieve long-term cognitive peak.",
    arcConnection: "Directly informs ARC's scheduling of Focus blocks vs biological recovery breaks.",
    content: `
# Peak Performance: Stress + Rest = Growth

In *Peak Performance*, Brad Stulberg and Steve Magness outline the scientific patterns shared by top performers across athletics, arts, and business. The authors present a core formula for sustainable growth and success: **Stress + Rest = Growth**. 

They argue that peak performance is not about working continuously, but about matching intense, focused effort with deep, deliberate recovery.

### The Ultradian Rhythm of Work
Human focus operates on **ultradian cycles** of approximately 90 minutes. Trying to push past 90 minutes of high-intensity focus results in diminishing returns and cognitive fatigue:
*   **The Sprints**: Structure work into deep focus blocks of 50 to 90 minutes. During this time, eliminate all distractions.
*   **The Recovery**: Follow every sprint with a 10 to 15-minute recovery block. This rest allows the brain to clear metabolic waste and consolidate information.

### Sleep as the Ultimate Recovery
Stulberg and Magness highlight that sleep is the single most powerful recovery tool. During sleep, human growth hormone (HGH) peaks, rebuilding muscles, and the brain processes new skills and concepts. 

The authors argue that cutting sleep short to work longer hours is a biological deficit that lowers cognitive capacity and increases the risk of burnout.

> [!NOTE]
> Active recovery—such as taking a walk in nature or meditating—is far more effective at restoring focus than passive distraction (like scrolling social media).

### How ARC Applies This
ARC structures your daily timeline around these performance cycles. The app schedules **Peak Focus Blocks** aligned with your chronotype and prompts you to start **Active Recovery Gates** (suggesting walks, breathing exercises, or hydration breaks) between work sprints, helping you maintain energy without burning out.
    `,
  },
];
