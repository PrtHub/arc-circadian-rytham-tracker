export interface BookDetail {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorTitle: string;
  publishedDate: string;
  keyMetric: string;
  excerpt: string;
  arcConnection: string;
  content: string;
}

export const booksData: BookDetail[] = [
  {
    slug: "the-power-of-when",
    title: "The Power of When",
    subtitle:
      "Discover Your Chronotype—and the Best Time to Eat Lunch, Ask for a Raise, Have Sex, Write a Novel, Take Your Meds, and More",
    author: "Dr. Michael Breus",
    authorTitle: "Clinical Psychologist & Sleep Specialist",
    publishedDate: "2016",
    keyMetric: "4 Chronotypes",
    excerpt:
      "Dr. Michael Breus's popular book sorts people into Lions, Bears, Wolves and Dolphins and times the day around each one. Here's what holds up.",
    arcConnection:
      "ARC uses the same four chronotype names (Lion, Bear, Wolf, Dolphin) to set the phases of your day. Your caffeine cutoff isn't a chronotype rule: ARC computes it from your bedtime, sensitivity and every drink you log.",
    content: `
# The Power of When: Timing is Everything

In *The Power of When*, Dr. Michael Breus (known as "The Sleep Doctor") argues that **when** you do something matters as much as **what** or **how** you do it. He sorts people into four **chronotypes**, each named after an animal, and builds a daily schedule around each one.

## What's Behind a Chronotype
Breus's four animals are a popular framework built on morning–evening preference research, not a clinical classification. The science underneath is solid: people differ in how early or late their body clock runs, partly for genetic reasons (PER3 is one of several genes linked to it), and chronotype shifts with age. Researchers such as Till Roenneberg measure it on a continuous scale, for example with the Munich ChronoType Questionnaire, rather than in four boxes. Breus's contribution is making the idea easy to act on.

## The Four Chronotypes
1. [Lions](/chronotype/lion), about 15–20% of people by Breus's estimate: Early risers who wake around 5:00 to 6:00 AM, think best between about 8:00 AM and noon, fade in the late afternoon and prefer a 9:00 to 10:00 PM bedtime.
2. [Bears](/chronotype/bear), about 50% and the most common type: They follow the sun, wake around 7:00 AM, peak from mid-morning to early afternoon, feel a clear afternoon slump and wind down around 11:00 PM.
3. [Wolves](/chronotype/wolf), about 15–20%: Night owls. They struggle to wake before 9:00 AM, are sharpest from late afternoon into the evening, and prefer bedtimes between midnight and 2:00 AM.
4. [Dolphins](/chronotype/dolphin), about 10%: Light sleepers. Breus describes them as anxious and detail-focused, often waking unrefreshed, with uneven energy that settles later in the day.

Not sure which one you are? The free [chronotype quiz](/tools/chronotype-quiz) gives you an estimate in about two minutes.

## Breus's Daily Timing Suggestions
Breus sets out windows for key activities for each animal. Treat them as his rules of thumb rather than lab-tested prescriptions.

### ☕ Caffeine
Breus's general advice is to wait a while after waking before the first coffee and to keep caffeine to the earlier part of your day, with Wolves starting and stopping later than Lions, and Dolphins keeping their intake low.

There's no universal cutoff, though. For one average cup and an average metaboliser, caffeine takes roughly five hours to fall below 50 mg; a bigger cup, a slower metabolism, or an earlier coffee still in your system pushes that earlier.

### 🧠 Deep Cognitive Work
* **Lions**: roughly 8:00 AM to noon.
* **Bears**: roughly 10:00 AM to 2:00 PM.
* **Wolves**: late afternoon into the evening (about 4:30 to 8:00 PM).
* **Dolphins**: mid-to-late afternoon (about 3:00 to 7:00 PM).

### 💪 Exercise
* **Lions**: early morning.
* **Bears**: morning or early evening.
* **Wolves**: early evening.
* **Dolphins**: moderate exercise in the early evening.

> [!IMPORTANT] Social jetlag is the gap between your chronotype and your schedule. Forcing a Wolf into an 8 AM meeting is a bit like asking a Lion to stay sharp until 1 AM. More in [what social jetlag is](/blog/what-is-social-jetlag).

## How This Connects to ARC
ARC uses the same four chronotypes to set the phases of your day, so a Wolf's plan starts and ends later than a Lion's. Your caffeine cutoff isn't a chronotype rule, though: ARC computes it from your bedtime, your caffeine sensitivity and every drink you log, and it moves each time you log one. A wind-down notification arrives before bed. Our [chronotype schedule guide](/guides/chronotype-lifestyle-design-guide) goes further. ARC isn't affiliated with or endorsed by Dr. Breus; this summary is our own reading of the book.
    `,
  },
  {
    slug: "why-we-sleep",
    title: "Why We Sleep",
    subtitle: "Unlocking the Power of Sleep and Dreams",
    author: "Dr. Matthew Walker",
    authorTitle: "Professor of Neuroscience & Psychology at UC Berkeley",
    publishedDate: "2017",
    keyMetric: "90-Min Cycles",
    excerpt:
      "Matthew Walker's bestseller on what deep and REM sleep do, and how caffeine and alcohol get in the way. The key takeaways, with a few corrections.",
    arcConnection:
      "Walker's chapter on caffeine is the part ARC puts into practice: it tracks every coffee you log and shows the latest time another cup still drops under 50 mg by bedtime.",
    content: `
# Why We Sleep: Unlocking the Science of Dreams

In *Why We Sleep*, neuroscientist Dr. Matthew Walker explains why sleep matters for almost everything: metabolic health, immune function, memory and emotional regulation. Sleep isn't passive downtime; it's a busy biological process.

## Sleep Architecture: The 90-Minute Cycles
Sleep runs in repeating cycles of roughly 90 minutes (in practice anywhere from about 70 to 120). Each cycle moves between two main modes:
1. **NREM (Non-Rapid Eye Movement) Sleep**: Walker describes four stages, with stages 3 and 4 known as **slow-wave** or deep sleep (today's scoring merges these into one stage, N3). Deep NREM sleep supports physical repair and helps move memories from the hippocampus (short-term) to the cortex (long-term).
2. **REM (Rapid Eye Movement) Sleep**: The main dreaming stage. Walker links REM to emotional processing, creativity and connecting ideas.

Deep NREM dominates the first half of the night; REM takes up more of the second half. That's why cutting a night short at either end costs you different things.

> [!WARNING] Waking from deep NREM sleep tends to make grogginess (sleep inertia) worse. A popular idea, not Walker's, is to time your alarm to the end of a cycle, but cycles vary from about 70 to 120 minutes, so the math is rough at best.

## The Glymphatic System: Brain Washing
Walker describes the brain's cleaning system opening up during deep sleep (in mice, the space between brain cells grew by about 60%, letting fluid flush through faster). That fluid carries away waste, including **beta-amyloid** and **tau**, proteins associated with Alzheimer's disease. The mouse findings are striking, but how much they apply to humans is still being worked out; our explainer on the [glymphatic system](/science/glymphatic-clearance-system) covers the debate.

## Caffeine and Alcohol
Walker spends a lot of time on two everyday substances:
* **Caffeine**: Blocks adenosine receptors, masking sleep pressure rather than removing it. Walker gives a half-life of 5 to 7 hours; in practice it's roughly 4 to 7 hours depending on the person (around 5 on average). He notes that caffeine late in the day can reduce deep sleep even in people who fall asleep without trouble.
* **Alcohol**: A sedative, not a sleep aid. Walker explains that it fragments sleep and suppresses REM sleep.

## How This Connects to ARC
If you want a rough bedtime or alarm time in 90-minute steps, try our free [sleep cycle calculator](/tools/sleep-cycle-calculator); it's a web tool, not part of the app. In the app, ARC's live caffeine curve shows what's still circulating from every drink you log, and your last safe coffee is recalculated each time, aiming for under 50 mg at bedtime. ARC isn't affiliated with or endorsed by Dr. Walker; this summary is our own.
    `,
  },
  {
    slug: "change-your-schedule-change-your-life",
    title: "Change Your Schedule, Change Your Life",
    subtitle:
      "How to Harness the Power of Clock Genes to Lose Weight, Optimize Your Workout, and Finally Get a Good Night's Sleep",
    author: "Dr. Suhas Kshirsagar",
    authorTitle: "Ayurvedic Physician & Author",
    publishedDate: "2018",
    keyMetric: "Fasting Windows",
    excerpt:
      "Dr. Suhas Kshirsagar blends Ayurveda with chronobiology and argues that aligning meals, sleep and work with daylight improves energy and digestion.",
    arcConnection:
      "ARC doesn't plan meals. What it shares with this book is the morning anchor: about 20 minutes of outdoor light, timed from your real sunrise.",
    content: `
# Change Your Schedule, Change Your Life: Clock Genes

Dr. Suhas Kshirsagar blends the Ayurvedic daily routine (Dinacharya) with modern chronobiology. His argument: almost every cell runs on "clock genes", and when your habits fight those clocks (eating late at night, sleeping in, spending your days under dim indoor light) you end up in **circadian desynchrony**: tired, poorly rested and out of sorts.

## The Three Periods of the Day
Kshirsagar maps the day onto the three Ayurvedic doshas, each ruling a four-hour block that repeats in the evening:
1. **Kapha, earth and water (6:00 AM - 10:00 AM)**: A steady, heavier period. He recommends getting up, getting outside and moving early in this window.
2. **Pitta, fire and water (10:00 AM - 2:00 PM)**: Digestion (Agni) and concentration are strongest, so he makes lunch the largest meal of the day.
3. **Vata, air and space (2:00 PM - 6:00 PM)**: A lighter, more changeable period he suggests for creative work, lighter tasks and exercise.

## Meal Timing
Kshirsagar's advice lines up with a growing body of circadian research:
* **Insulin sensitivity** tends to be lower in the evening, so the same meal generally raises blood sugar more at 8:00 PM than at noon.
* **An early dinner**: He recommends finishing eating well before bed, around three hours, so digestion is winding down as you go to sleep.

> [!NOTE] A large meal close to bedtime keeps your digestive system busy just as your body is trying to cool down for sleep, and many people find it harder to fall asleep. If you have diabetes or take glucose-lowering medication, talk to your doctor before changing when you eat.

## How This Connects to ARC
ARC doesn't plan meals. What it shares with this book is the morning anchor: ARC times about 20 minutes of outdoor light from your real sunrise and runs the timer on your Lock Screen. For the meal-timing side, our [circadian fasting guide](/guides/circadian-intermittent-fasting-metabolic-clocks-guide) covers the research, and the free [sunlight calculator](/tools/sunlight-calculator) shows today's sunrise and light window. ARC isn't affiliated with or endorsed by Dr. Kshirsagar; this summary is our own.
    `,
  },
  {
    slug: "the-circadian-code",
    title: "The Circadian Code",
    subtitle:
      "Lose Weight, Supercharge Your Energy, and Transform Your Health from Morning to Midnight",
    author: "Dr. Satchin Panda",
    authorTitle: "Circadian Biologist & Salk Institute Professor",
    publishedDate: "2018",
    keyMetric: "10-Hr Feeding",
    excerpt:
      "Salk Institute professor Dr. Satchin Panda explains how time-restricted eating, light and sleep timing affect metabolic health, and what the research shows.",
    arcConnection:
      "ARC doesn't track meals. It handles the light half of Panda's advice: a 20-minute morning light timer from your real sunrise, and seek-light and avoid-light windows when you travel.",
    content: `
# The Circadian Code: Supercharge Your Energy

Dr. Satchin Panda is a professor at the Salk Institute and a leading researcher in circadian biology. In *The Circadian Code*, he argues that working with your body clock, through when you eat, when you see light and when you sleep, can improve metabolic health, weight and immune function.

## SCN vs. Peripheral Clocks
The suprachiasmatic nucleus (SCN) in the brain is the "master clock". But organs such as the liver, gut, kidneys and heart also run their own **peripheral clocks**. These were described by several labs in the late 1990s (for example, Balsalobre et al., 1998), and Dr. Panda's lab helped show how much of the liver's work runs on a daily clock.
* **The master SCN clock** is set mainly by light.
* **Peripheral clocks** in the liver and gut are strongly influenced by **when we eat**.

When light and meals send conflicting signals (for example, eating late at night under bright lights), Panda argues that your organs drift out of step with your brain, adding metabolic strain.

## Time-Restricted Eating
Panda's lab is best known for its time-restricted eating research, starting in mice: animals that ate a high-fat diet within an 8-hour window were protected from much of the weight gain and metabolic damage seen in mice that ate the same diet around the clock (Hatori et al., 2012, Cell Metabolism). In the book he recommends keeping all eating within an **8 to 10-hour window**, and no more than 12.
* **Overnight fast**: A consistent daily fast of 12 hours or more, he argues, gives the liver and gut time for repair.
* **Human results**: Some small human trials have shown improvements in markers such as insulin sensitivity; larger trials have had mixed results, particularly for weight loss.

> [!IMPORTANT] Panda's rule of thumb: the eating window starts with the first thing you consume other than water, including black coffee or tea.

Talk to your doctor before fasting or changing your meal timing, especially if you're pregnant, breastfeeding, diabetic, underweight or have a history of eating disorders.

## How This Connects to ARC
ARC doesn't track meals. It handles the other half of Panda's advice, light: a 20-minute morning light timer that starts from your real sunrise, and seek-light and avoid-light windows when you cross time zones. For the eating side, see our [circadian fasting guide](/guides/circadian-intermittent-fasting-metabolic-clocks-guide); for travel, the free [jet lag planner](/tools/jetlag-planner). ARC isn't affiliated with or endorsed by Dr. Panda; this summary is our own.
    `,
  },
  {
    slug: "lifespan",
    title: "Lifespan",
    subtitle: "Why We Age—and Why We Don't Have To",
    author: "Dr. David Sinclair",
    authorTitle: "Harvard Genetics Professor & Longevity Researcher",
    publishedDate: "2019",
    keyMetric: "Cellular Longevity",
    excerpt:
      "Harvard geneticist David Sinclair's Information Theory of Aging, sirtuins and NAD+, and his habits for healthy ageing, plus where your body clock fits in.",
    arcConnection:
      "ARC won't slow ageing. It overlaps with this book only where rhythm matters: a steady wake time, morning light, and sleep protected from late caffeine.",
    content: `
# Lifespan: The Circadian Link to Longevity

Dr. David Sinclair, professor of genetics at Harvard Medical School, argues that ageing is not an inevitable natural law but a process that can be slowed and, he believes, eventually treated like a disease. At the core of his book is the **Information Theory of Aging**: the idea that cells gradually lose their epigenetic "information" (which genes should be switched on or off), partly because of the work of repairing DNA damage.

## Sirtuins and NAD+
Sirtuins are a family of seven enzymes involved in cellular maintenance and defence, and they need a molecule called **NAD+** to work. In Sinclair's model:
* **Sirtuins as first responders**: When DNA is damaged (by UV light, radiation or toxins), sirtuins leave their posts controlling genes to help with repairs. Repeated over a lifetime, he argues, this leaves gene regulation more and more disordered.
* **NAD+ declines with age**, which Sinclair sees as one reason sirtuins become less effective.

## Where the Body Clock Fits
*Lifespan* is mostly about genes and metabolism, not circadian rhythm. The overlap is real but indirect: NAD+ levels rise and fall across the day, and in mice the sirtuin SIRT1 interacts with core clock genes. Whether keeping a steady daily rhythm slows human ageing hasn't been shown.

## Sinclair's Hormesis Habits
Sinclair recommends mild, healthy stressors (**hormesis**) that he believes switch on the body's defences:
1. **Eating less often**: Intermittent fasting or skipping meals.
2. **Exercise**: Especially the kind that leaves you out of breath.
3. **Cold exposure**: Time in the cold, which he links to activating brown fat.

> [!NOTE] Check with your doctor before fasting or cold exposure, especially if you're pregnant, have diabetes, a heart condition or a history of eating disorders.

## How This Connects to ARC
ARC won't slow ageing. It helps with the parts of this book about rhythm: a steady wake time (Trends tells you when yours starts drifting later), about 20 minutes of morning light timed from your real sunrise, and a caffeine cutoff that protects your sleep. For the basics of how your body clock works, start with [what a circadian rhythm is](/blog/what-is-circadian-rhythm-beginner-guide). ARC isn't affiliated with or endorsed by Dr. Sinclair; this summary is our own.
    `,
  },
  {
    slug: "breath",
    title: "Breath",
    subtitle: "The New Science of a Lost Art",
    author: "James Nestor",
    authorTitle: "Science Journalist & Author",
    publishedDate: "2020",
    keyMetric: "Nasal Breathing",
    excerpt:
      "James Nestor explores how breathing through your nose instead of your mouth affects sleep, snoring and stress, and what the research actually supports.",
    arcConnection:
      "ARC doesn't coach breathing. If you want to pair Nestor's slow breathing with something ARC does, try it during your 20-minute morning light walk.",
    content: `
# Breath: The New Science of a Lost Art

In *Breath*, science journalist James Nestor investigates something most of us never think about: how we breathe. He travels widely to explore the differences between mouth breathing and nasal breathing, and argues that how we inhale and exhale affects sleep, stress and overall health.

## Mouth Breathing vs. Nasal Breathing
Nestor argues that modern soft diets have changed human jaw structure, narrowing airways and making mouth breathing more common. In his account:
* **Mouth breathing**: Bypasses the nose's filtering and humidifying, and Nestor links it to snoring, sleep apnea and daytime tiredness.
* **Nasal breathing**: The nose and sinuses produce **nitric oxide**, which helps blood vessels widen, and slow nasal breathing tends to shift the nervous system toward "rest and digest".

## Sleep Apnea and Snoring
Breathing through the mouth during sleep can make the airway more likely to collapse. In obstructive sleep apnea, the airway repeatedly narrows or closes during sleep and the brain briefly wakes to restart breathing, fragmenting sleep so you get less deep sleep.

Sleep apnea is a medical condition. If you snore loudly, stop breathing or gasp in your sleep, or feel exhausted despite enough time in bed, see a doctor. It's treatable, and breathing exercises aren't a substitute for a diagnosis.

> [!CAUTION] Nestor describes mouth taping (a small strip of tape to keep the lips closed during sleep) as a way to encourage nasal breathing. Evidence is limited. Don't tape if you can't breathe easily through your nose, and talk to a doctor first if you snore loudly or might have sleep apnea: taping can hide the symptom without treating it.

## Breathing Practices
Nestor outlines a few practices:
1. **Slower breathing**: In for about 5.5 seconds and out for about 5.5 seconds, roughly 5.5 breaths a minute. Nestor describes this as a natural "resonant" rhythm.
2. **Breathing less**: Nestor argues that practising lighter breathing builds tolerance to carbon dioxide, which he says improves oxygen delivery to cells (the Bohr effect). Evidence for health benefits is mostly early-stage.

Skip breath-holding exercises while driving or in water, and check with a doctor first if you're pregnant or have a heart or lung condition.

## How This Connects to ARC
ARC doesn't coach breathing. If you want to pair Nestor's slow breathing with something ARC does, try it during your 20-minute morning light walk; ARC's timer starts from your real sunrise and runs on your Lock Screen. For evening habits, see [the evening wind-down ritual](/blog/the-3rd-half-evening-wind-down-ritual). ARC is a wellness app, not a medical device. If sleep problems persist, talk to a doctor. ARC isn't affiliated with or endorsed by James Nestor; this summary is our own.
    `,
  },
  {
    slug: "sleep-smarter",
    title: "Sleep Smarter",
    subtitle:
      "21 Essential Strategies to Sleep Your Way to a Better Body, Better Health, and Bigger Success",
    author: "Shawn Stevenson",
    authorTitle: "Nutritionist, Author & Podcast Host",
    publishedDate: "2016",
    keyMetric: "Light & Sanctuary",
    excerpt:
      "Shawn Stevenson's 21 practical changes to your bedroom, evening light and daily habits for better sleep, with notes on which ones the evidence backs.",
    arcConnection:
      "ARC doesn't check your bedroom or advise on supplements. It handles the timing side: a wind-down reminder before bed and a caffeine cutoff computed from every drink you log.",
    content: `
# Sleep Smarter: 21 Strategies to Optimize Sleep

In *Sleep Smarter*, nutritionist and podcast host Shawn Stevenson offers 21 practical strategies for better sleep. He argues that sleep drives physical repair, fat loss and mental clarity, and that small changes to your environment and daily habits add up.

## Designing the Sleep Sanctuary
Stevenson treats the bedroom as a space built for darkness, coolness and calm:
* **Darkness**: Blackout curtains and removing light sources. Stevenson argues that even small amounts of light, like a standby LED, can disrupt melatonin. Light reaching your eyes matters most; the claim that light on your skin disrupts sleep has weak evidence.
* **Temperature**: Your core temperature needs to fall for you to fall asleep easily, so he suggests a cool room, around **60–68°F (15–20°C)**.
* **Electronics**: Stevenson suggests moving phones and Wi-Fi routers away from the bed. The evidence that electromagnetic fields affect sleep is weak, but keeping your phone out of reach does help with late-night scrolling.

## Gut Health and Sleep
Stevenson links gut health to sleep:
* **Serotonin**: Over 90% of the body's serotonin, a precursor to melatonin, is made in the gut. Gut serotonin doesn't reach the brain, though, so any link to sleep is indirect.
* **Magnesium**: Stevenson recommends magnesium, a mineral involved in muscle and nerve function. Talk to a doctor or pharmacist before starting a supplement, especially if you're pregnant, breastfeeding, have kidney problems or take medication. Our post on [magnesium and other sleep supplements](/blog/chronobiotic-supplements-magnesium-apigenin) covers the evidence.

> [!WARNING] Alcohol before bed sedates the brain but disrupts sleep, suppressing REM sleep and causing more awakenings later in the night.

## How This Connects to ARC
ARC doesn't check your bedroom or advise on supplements. It handles the timing side: a wind-down reminder before bed and a caffeine cutoff computed from every drink you log. For the evening-light part of Stevenson's advice, see our [evening light and melatonin guide](/guides/evening-blue-light-melatonin-defense-guide). ARC isn't affiliated with or endorsed by Shawn Stevenson; this summary is our own.
    `,
  },
  {
    slug: "fast-like-a-girl",
    title: "Fast Like a Girl",
    subtitle:
      "A Woman's Guide to Using the Healing Power of Fasting to Burn Fat, Boost Energy, and Balance Hormones",
    author: "Dr. Mindy Pelz",
    authorTitle: "Chiropractor (DC), Author & Podcast Host",
    publishedDate: "2022",
    keyMetric: "Hormonal Fasting",
    excerpt:
      "Dr. Mindy Pelz argues women should time fasting around their menstrual cycle. Here's her phase plan, what the evidence says, and when to check with a doctor.",
    arcConnection:
      "ARC doesn't track menstrual cycles, meals or fasting. We include this book because Pelz ties fasting to sleep and stress; ARC's part is the timing of light, caffeine and wind-down.",
    content: `
# Fast Like a Girl: Circadian & Cycle Alignment

In *Fast Like a Girl*, Dr. Mindy Pelz, a chiropractor and wellness author, offers a fasting guide written specifically for women. She argues that while time-restricted eating can help, women should adjust how long they fast and what they eat to the hormonal changes of the menstrual cycle (estrogen, progesterone and others).

## Pelz's Cycle Phases
Pelz divides a typical cycle into four phases, each with its own fasting and food advice:
1. **Power phase (days 1–10)**: Estrogen is building. Pelz argues estrogen does best with low insulin and low cortisol, and recommends longer fasts and lower-carb eating here.
2. **Manifestation phase (days 11–15)**: Around ovulation, estrogen peaks and testosterone rises. She recommends shorter fasts (under about 13 to 15 hours) and hormone-supporting foods.
3. **Second power phase (days 16–19)**: A return to longer fasts and lower-carb eating.
4. **Nurture phase (day 20 until your period)**: Progesterone rises. Pelz argues progesterone needs more glucose and is sensitive to stress, and advises against fasting in this phase.

Pelz suggests fasts of 13 to 72 hours in the power phases. Talk to your doctor before fasting for more than a day, and don't if you're pregnant, breastfeeding, diabetic, underweight or have a history of eating disorders. Cycles also vary in length, so her day counts are only a guide.

> [!IMPORTANT] Pelz argues that a strict 16:8 fasting routine in the Nurture phase can disrupt progesterone and lead to poor sleep and mood changes. Clinical evidence on cycle-synced fasting is limited, so treat this as her framework rather than settled science.

## How This Connects to ARC
ARC doesn't track menstrual cycles or fasting. What it can do is keep the rest of your day's timing steady: about 20 minutes of morning light from your real sunrise, a caffeine cutoff computed from each drink you log, and a wind-down reminder before bed. For the research on meal timing more broadly, see our [circadian fasting guide](/guides/circadian-intermittent-fasting-metabolic-clocks-guide). ARC is a wellness app, not a medical device. ARC isn't affiliated with or endorsed by Dr. Pelz; this summary is our own.
    `,
  },
  {
    slug: "peak-performance",
    title: "Peak Performance",
    subtitle:
      "Elevate Your Game, Avoid Burnout, and Thrive with the New Science of Success",
    author: "Brad Stulberg & Steve Magness",
    authorTitle: "Performance Coaches & Authors",
    publishedDate: "2017",
    keyMetric: "Stress + Rest",
    excerpt:
      "Brad Stulberg and Steve Magness's formula, Stress + Rest = Growth: focused work blocks, real recovery and enough sleep to perform without burning out.",
    arcConnection:
      "Echoes ARC's day plan, which mixes focus blocks with short movement and rest blocks and re-times them around your measured afternoon dip.",
    content: `
# Peak Performance: Stress + Rest = Growth

In *Peak Performance*, Brad Stulberg and Steve Magness look at the habits shared by top performers in sport, the arts and business. Their core formula for sustainable growth is **Stress + Rest = Growth**.

They argue that peak performance isn't about working continuously, but about pairing intense, focused effort with deliberate recovery.

## Work in Blocks
The authors recommend working in focused blocks and then stepping away:
* **The sprints**: Deep focus blocks of about 50 to 90 minutes with distractions removed. The 90-minute figure echoes sleep researcher Nathaniel Kleitman's idea of a roughly 90-minute rest-activity cycle, though evidence for a fixed daytime cycle is thin; treat it as a guide, not a timer.
* **The recovery**: A 10 to 15-minute break after each sprint, which they argue helps the brain consolidate what it just worked on.

## Sleep as the Ultimate Recovery
Stulberg and Magness call sleep the most powerful recovery tool. Growth hormone is released mostly in deep sleep early in the night, supporting muscle repair, and sleep helps the brain lock in new skills.

They argue that cutting sleep to work longer hours lowers the quality of the work you do and raises the risk of burnout.

> [!NOTE] The authors argue that active recovery, such as a walk outside or a few minutes of meditation, restores focus better than passive distraction like scrolling social media.

## How This Connects to ARC
ARC's day plan mixes focus blocks with short movement and rest blocks, and after about ten days of check-ins it measures when your afternoon dip really lands and adjusts the plan to match. It doesn't coach breathing or hydration. For planning your day around your best hours, see [peak focus windows](/blog/peak-focus-windows-plan-day-around-biology). ARC isn't affiliated with or endorsed by the authors; this summary is our own.
    `,
  },
];
