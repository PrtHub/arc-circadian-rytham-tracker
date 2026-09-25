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
    title: "Caffeine Tolerance Reset: A 7-Day Step-Down Plan",
    excerpt:
      "A 7-day plan to lower caffeine tolerance: halve your dose, switch to tea, then take two days off. Tapering usually means milder withdrawal than quitting cold.",
    category: "protocol",
    categoryLabel: "Protocol",
    date: "2026-06-27",
    readTime: "6 min",
    content: `
# Caffeine Tolerance Reset: A 7-Day Step-Down Plan

Over time, daily caffeine leads to **tolerance**: the same cup does less. Caffeine works by blocking adenosine receptors, and with regular use the brain appears to compensate, partly by adding more of those receptors (shown mainly in animal studies). So you need more coffee to feel the same, and you feel worse without it.

This 7-day plan steps you down gradually, so you can find out what your energy is like on less caffeine without the worst of the withdrawal.

## Why Not Quit Cold Turkey?
Withdrawal is real and fairly predictable. In a review of the research, symptoms such as headache, tiredness and low mood typically began 12 to 24 hours after the last dose, peaked within one to two days, and lasted anywhere from two to nine days (Juliano and Griffiths, 2004, Psychopharmacology). Tapering spreads that out and usually makes it milder.

## Day 1 to 2: The Step Down
Halve your usual daily caffeine. If you normally drink about 200 mg (roughly two cups of brewed coffee), stop at 100 mg, and have it in the morning.
> [!NOTE] You may feel a little flat. Anchor these days with about 20 minutes of outdoor morning light (the same target ARC's light timer uses). It's the strongest wake-up signal your body clock gets without caffeine.

Log each drink in ARC during the step-down: the live decay curve shows what's still circulating, and your last safe coffee moves as you cut back. Without the app, the free [caffeine calculator](/tools/caffeine-calculator) shows the same curve for a single day.

## Day 3 to 5: Switch to Tea
Swap coffee for green tea, which has less caffeine per cup and also contains L-theanine, an amino acid some people find takes the edge off caffeine. Keep your total under about 50 mg a day.

## Day 6 to 7: Caffeine-Free
Zero caffeine. Herbal tea is fine; decaf still contains a small amount. Keep your wake time and bedtime steady.
> [!IMPORTANT] Keep your wake times consistent during the reset. A drifting schedule adds its own grogginess on top of withdrawal, and you won't be able to tell which is which.

If headaches are severe, or you take medication or have a health condition affected by caffeine, check with a doctor or pharmacist before cutting down.

## After the Reset
When you bring caffeine back on Day 8, start with one cup and notice how much further it goes. How much you settle on is up to you, but a lower daily dose keeps tolerance from creeping back as quickly.

Some people also delay their first cup until 60 to 90 minutes after waking. It's a popular recommendation; the evidence is mixed, and the best test is your own afternoons. If you log energy check-ins in ARC, Trends shows your afternoon crashes per week, so you can compare a week of later coffee with the week before instead of relying on memory.

For why coffee can leave you more tired in the first place, see [why coffee makes you tired](/blog/why-coffee-makes-you-tired-caffeine-tolerance-adenosine). For timing your last cup, read the [caffeine half-life guide](/guides/caffeine-half-life-optimization-guide).
    `,
  },
  {
    slug: "what-is-zeitgeber",
    title: "What Is a Zeitgeber? Definition, Examples & Biology",
    excerpt:
      "A zeitgeber is an outside cue, like light, meals or activity, that keeps your body clock in step with the 24-hour day. Definition, examples and how it works.",
    category: "glossary",
    categoryLabel: "Circadian Glossary",
    date: "2026-06-25",
    readTime: "5 min",
    content: `
# What Is a Zeitgeber?

A **zeitgeber** (German for "time giver") is any external cue that keeps an organism's internal clock in step with the Earth's 24-hour cycle of light and dark. Light is by far the strongest one for humans; meals, activity, social routine and temperature play smaller roles.

## Why Your Clock Needs Zeitgebers
Your master clock, the suprachiasmatic nucleus (SCN) in the hypothalamus, keeps time on its own, but not perfectly. Kept away from daylight and clocks, the human circadian rhythm "free-runs" with an average period of about 24.2 hours (Czeisler et al., 1999, Science). Without daily cues, sleep and wake times would slowly drift later. Zeitgebers nudge the clock back into line every day, a process called **entrainment**.

## The Main Zeitgebers
1. **Light (the master zeitgeber)**: Light reaching the retina, especially the melanopsin-containing cells that respond most to blue-cyan light, signals the SCN directly through the retinohypothalamic tract. Morning light moves the clock earlier; bright light late in the evening moves it later.
2. **Meals**: When you eat is a strong cue for the clocks in your liver and gut (see peripheral clocks below).
3. **Exercise and movement**: Activity helps time the clocks in muscle and can shift the master clock a little.
4. **Social cues**: Work start times, alarms and shared meals shape when you see light and when you eat, which is why they matter so much.
5. **Temperature**: A drop in ambient temperature at night and a rise in the morning act as a cue, though a weak one in humans compared with light.

## Why Light Dominates
The SCN has a direct line from the eyes, and no other zeitgeber has that. Outdoor daylight is also far brighter than indoor lighting, so a short time outside sends a much clearer signal than a whole morning under ceiling lights. That's why most circadian advice starts with morning light; the [morning sunlight guide](/guides/morning-sunlight-lux-protocol-guide) covers how much you need.

## Peripheral Clocks: A Clock in Every Organ
The SCN isn't the only clock. Almost every tissue, from the liver and gut to muscle and fat, runs its own molecular clock built from the same core genes (CLOCK, BMAL1, PER and CRY). The SCN keeps these peripheral clocks in step through hormones, body temperature and nerve signals, but they also take cues of their own, most strongly from meals. In animal studies, restricting feeding to the wrong time of day shifted the liver clock away from the brain's, while the SCN kept its original timing (Damiola et al., 2000, Genes & Development).

The practical point: a large meal late at night sends a "daytime" signal to your liver while your master clock is signalling night. The [circadian fasting guide](/guides/circadian-intermittent-fasting-metabolic-clocks-guide) goes deeper on meal timing.

> [!TIP] To shorten jet lag or recover from a late weekend, line your zeitgebers up: get morning light at your new local time, eat at local mealtimes, and keep exercise in daylight hours.

When you cross time zones, ARC shows when to seek and when to avoid light each day, working from your phone's time zone with no location permission. Plan a trip ahead with the free [jet lag planner](/tools/jetlag-planner), or read why the [avoid-light window](/blog/the-avoid-light-window-jetlag) matters as much as the light you get.
    `,
  },
  {
    slug: "glymphatic-clearance-system",
    title: "The Glymphatic Clearance System: Brain Washing During Sleep",
    excerpt:
      "How the brain's glymphatic system flushes waste from between cells, why deep sleep seems to matter, and which parts of the research are still debated.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-04",
    readTime: "8 min",
    content: `
# The Glymphatic System: Brain Washing

While you're awake, your brain cells use energy and produce waste. In the rest of the body, the lymphatic system drains waste from tissue, but the brain has no conventional lymphatic vessels inside it. In 2012, researchers in Maiken Nedergaard's lab described a different route and named it the **glymphatic system**: cerebrospinal fluid (CSF) flows into the brain along the spaces around blood vessels, mixes with the fluid between cells, and carries waste out.

## The Cleaning Cycle
The glymphatic system appears to be most active during deep (N3) sleep, at least in animal studies. How strongly this applies to humans is still debated.
1. **More space between cells**: In mice, the space between brain cells grew by about 60% during sleep, letting fluid flow through faster (Xie et al., 2013, Science).
2. **Fluid flow**: With more room, CSF mixes with the fluid between cells and moves through brain tissue more easily.
3. **Waste clearance**: In the same mouse study, beta-amyloid, a protein associated with Alzheimer's disease, was cleared about twice as fast during sleep as during waking. Tau is thought to be cleared by the same route.

## The Research Isn't Settled
Most of the evidence comes from mice. A 2024 mouse study using a different method found brain clearance was actually lower during sleep and anaesthesia (Miao et al., 2024, Nature Neuroscience), and researchers are still arguing about the methods. What's reasonably clear is that sleep and brain fluid flow are linked. How much sleep "washes" the human brain, and what that means over a lifetime, is still open.

## The Circadian Link
Glymphatic flow also seems to follow a daily rhythm: in mice it's highest during their normal rest phase (Hablitz et al., 2020, Nature Communications). Melatonin and the evening drop in core body temperature both help you reach deep sleep at night, which is one more reason regular sleep timing matters. The [deep sleep guide](/guides/deep-sleep-slow-wave-optimization-guide) covers what helps, and the [core body temperature guide](/guides/core-body-temperature-tmin-deep-sleep-guide) explains the temperature side.

> [!NOTE] In a small brain-imaging study, one night without sleep raised beta-amyloid slightly in healthy adults (Shokri-Kojori et al., 2018, PNAS). Whether short-term changes like this add up over years isn't settled.

Regular timing is the part you control. ARC doesn't measure deep sleep, but its Trends show when your wake time is drifting later, and a wind-down reminder arrives before your bedtime. If you've had a run of short nights, the free [sleep debt calculator](/tools/sleep-debt-calculator) shows how much you're carrying.

ARC is a wellness app, not a medical device. If sleep problems persist, or you're worried about your memory, talk to a doctor.
    `,
  },
  {
    slug: "adenosine-clearance-afternoon-dip-protocol",
    title: "The Two-Process Model of Sleep: Process S and Process C",
    excerpt:
      "Borbély's 1982 Two-Process Model explains sleepiness as sleep pressure (Process S) meeting your body clock (Process C). How it works and what it predicts.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-07-08",
    readTime: "8 min",
    content: `
# The Two-Process Model of Sleep: Process S and Process C

Why do you feel sleepy at some times of day and wide awake at others, even after the same night's sleep? The most influential answer is the **Two-Process Model of Sleep Regulation**, proposed by Swiss sleep researcher Alexander Borbély in 1982. It describes sleepiness as the interaction of two separate processes: sleep pressure that builds the longer you're awake, and a body clock that runs on a roughly 24-hour cycle.

---

## Process S vs. Process C

Borbély proposed that sleep and wakefulness are governed by two independent, interacting processes.

### 1. Process S: The Homeostatic Sleep Drive
Process S is sleep pressure. It rises the whole time you're awake and falls while you sleep. One chemical signal behind it is **adenosine**, a by-product of the energy your neurons use.
* As adenosine accumulates, it binds to receptors (mainly A1 and A2A) that damp down wake-promoting brain activity.
* In the model, Process S rises along a curve that gradually flattens during the day, then drains away during sleep. By early afternoon, sleep pressure is well above its morning level, and it keeps rising until you sleep.

### 2. Process C: The Circadian Pacemaker
Process C is the body clock, generated by the **suprachiasmatic nucleus (SCN)**, a small cluster of neurons in the hypothalamus, and kept in step with the day mainly by light.
* Process C doesn't track how long you've been awake; it runs on its own roughly 24-hour cycle.
* Its alerting signal rises through the day and peaks in the evening, which is what holds rising sleep pressure off until bedtime.
* Many people also feel a smaller dip in alertness in the early afternoon. Why exactly it happens is still debated, and it shows up whether or not you've eaten lunch.

---

## What the Model Predicts
Put the two curves together and several everyday experiences fall out of it:
* **Bedtime**: You fall asleep most easily when sleep pressure is high and the circadian alerting signal is dropping, late in your biological evening.
* **The evening second wind**: A few hours before your usual bedtime, the circadian signal is at its strongest. Many people feel oddly alert then; researchers call it the wake maintenance zone.
* **The afternoon dip**: By early afternoon, sleep pressure has been building for hours while the circadian signal briefly levels off, so drowsiness gets through.
* **Jet lag and night shifts**: When you try to sleep at the wrong biological time, the two processes are out of step. Pressure says sleep, the clock says wake, and sleep comes out short and light.

2 PM is the textbook time for that dip; yours may be different. ARC asks for one-tap energy check-ins, and after about ten days (roughly four afternoon check-ins) it measures when your dip really lands and moves your plan to match. For practical ways to soften it, see [why you crash at 2 PM](/blog/why-do-i-crash-at-2pm-afternoon-energy-drop-fix).

> [!IMPORTANT] Caffeine blocks adenosine receptors for a while, but it does nothing to reduce Process S. Adenosine keeps building underneath, so the tiredness comes back once the caffeine wears off.

---

## What You Can Change
The model points to a few levers:
1. **Sleep is the only thing that drains Process S.** A short nap (20 minutes or less) takes a little off without making it hard to sleep that night; see [the science of naps](/blog/power-of-naps-science-of-siesta).
2. **Light strengthens Process C.** Morning daylight keeps your clock on time, and bright light has an immediate alerting effect that can blunt the afternoon dip. A short walk outside after lunch does both.
3. **Caffeine timing.** Caffeine masks Process S rather than lowering it, so the question is when it wears off. There's no universal cutoff: for one average cup and an average metaboliser, caffeine takes roughly five hours to fall below 50 mg, and a bigger cup, a slower metabolism or an earlier coffee still in your system pushes that earlier. The [caffeine half-life guide](/guides/caffeine-half-life-optimization-guide) goes through the math.
4. **Lunch.** A large, high-carbohydrate lunch can make the dip feel deeper for some people, but the dip happens without lunch too.

Delaying your first coffee until 60 to 90 minutes after waking is a popular recommendation; the evidence is mixed, and the best test is your own afternoons.

The model has been refined since 1982 (Borbély and colleagues published a reappraisal in 2016 in the Journal of Sleep Research), but its core idea still underpins much of sleep science. For how adenosine builds and clears in more detail, read the [adenosine and sleep pressure guide](/guides/adenosine-sleep-pressure-clearance-guide).
    `,
  },
  {
    slug: "phase-response-curve-light-timing",
    title: "Phase Response Curve: How Light Timing Shifts Your Clock",
    excerpt:
      "The phase response curve explains why morning light moves your body clock earlier and evening light moves it later, and why it shapes every jet lag plan.",
    category: "mechanism",
    categoryLabel: "Biological Mechanism",
    date: "2026-09-25",
    readTime: "6 min",
    content: `
# Phase Response Curve: How Light Timing Shifts Your Clock

A **phase response curve (PRC)** describes how much a signal, most often light, shifts your body clock, and in which direction, depending on when in your biological day it arrives. It's the reason the same 20 minutes of bright light can move your clock earlier in the morning and later at night.

## The Shape of the Light PRC
Plot the size of the shift against the time the light arrives and you get a curve with two halves:
* **Light in your biological evening and the first half of the night** moves the clock **later** (a phase delay). This is why bright screens and ceiling lights late at night make it harder to fall asleep the next evening.
* **Light in your late night and morning** moves the clock **earlier** (a phase advance). This is why morning daylight helps you wake up and feel sleepy on time.
* **Around the middle of your biological day,** light shifts the clock very little, though it still makes you more alert.

The crossover point sits close to your **core body temperature minimum**, which for most people falls a couple of hours before their usual wake time. Light before it delays you; light after it advances you. A careful lab study using single pulses of bright light mapped this curve in people (Khalsa et al., 2003, Journal of Physiology). The [core body temperature guide](/guides/core-body-temperature-tmin-deep-sleep-guide) explains the temperature low.

## It Follows Your Body, Not the Clock on the Wall
The curve is anchored to your internal time, not the time on your phone. For a night owl whose body runs two hours late, 7 AM light can still land in the delay zone, which is one reason very early light doesn't always help strong evening types, and why shifting in small steps works better. After a long flight, your body is still on home time, so the right window for light can fall at odd local hours.

## Jet Lag: Where the PRC Earns Its Keep
Flying east, your clock needs to move earlier, so you want light in your body's morning and darkness in its late night. Flying west, it needs to move later, so you want light in the evening. Get it backwards and you can push your clock the wrong way and make the jet lag last longer. Knowing when to **avoid** light is the half most travellers never hear; [the avoid-light window](/blog/the-avoid-light-window-jetlag) explains it, and the free [jet lag planner](/tools/jetlag-planner) works out both windows for your trip.

The same logic applies twice a year when the clocks change. The [daylight saving time planner](/tools/daylight-saving-time-planner) times light in the right direction for spring and autumn.

## Melatonin Has a Curve Too
Melatonin taken as a supplement also shifts the clock, roughly opposite to light: taken in the afternoon or early evening it tends to move the clock earlier, and taken in the morning it tends to move it later (Burgess et al., 2010, Journal of Clinical Endocrinology & Metabolism). In that study, a low dose shifted the clock about as much as a higher one; timing mattered most. Talk to a doctor or pharmacist before using melatonin, especially for children or if you take other medication.

> [!NOTE] How big a shift light produces depends on how bright it is, how long it lasts, and how much light you've seen recently. Outdoor daylight is far brighter than indoor lighting, which is why a short time outside does more than a whole morning under ceiling lights.

## Where ARC Fits
ARC applies this curve when you travel: it notices your phone's time zone change (no location permission) and gives you a seek-light and an avoid-light window each day while your body catches up, about an hour a day. At home, its 20-minute morning light timer starts from your real sunrise.
    `,
  },
  {
    slug: "dim-light-melatonin-onset-dlmo",
    title: "What Is DLMO? Dim Light Melatonin Onset Explained",
    excerpt:
      "DLMO is the evening moment your melatonin starts to rise, the most reliable marker of your body clock's timing. What it is, how it's measured, why it matters.",
    category: "glossary",
    categoryLabel: "Circadian Glossary",
    date: "2026-09-25",
    readTime: "5 min",
    content: `
# What Is DLMO? Dim Light Melatonin Onset

**DLMO** stands for **dim light melatonin onset**: the time in the evening when your melatonin level starts to rise, measured in dim light so that light doesn't hold it back. It's the most widely used marker of where your body clock is set, and researchers and sleep clinicians use it to tell whether someone's clock runs early, late or on time.

## Why Melatonin Makes a Good Marker
Your master clock, the suprachiasmatic nucleus, tells the pineal gland when to release melatonin. Levels stay low through the day, start rising in the evening, peak in the middle of the night and fall toward morning. That rise is tightly controlled by the clock, so its timing is a good readout of the clock itself. For most people, DLMO arrives roughly two hours before they naturally fall asleep.

The catch is light. Bright light in the evening suppresses melatonin, so a measurement taken under normal room lighting can make your clock look later than it really is. That's why the test is done in dim light.

## How It's Measured
In a sleep lab, or at home following careful instructions, you sit in dim light for several evening hours and give a saliva (or blood) sample every 30 to 60 minutes. The samples go to a lab, and DLMO is the time your melatonin crosses a set threshold or rises clearly above its daytime level. It isn't something a phone or a wearable can measure; consumer devices don't measure melatonin.

## What DLMO Tells You
* **Chronotype, measured rather than guessed.** Evening types have later DLMOs and morning types earlier ones. Questionnaires such as the Munich ChronoType Questionnaire estimate the same thing from your sleep times.
* **Delayed sleep phase.** In delayed sleep-wake phase disorder, DLMO is much later than usual, which is why going to bed "early" doesn't work. In adults with ADHD and trouble falling asleep, DLMO has been found to be delayed by about an hour and a half on average (Van Veen et al., 2010, Biological Psychiatry). The [ADHD sleep guide](/guides/adhd-delayed-sleep-phase-guide) covers what helps.
* **When to time light or melatonin.** Clinicians time bright light therapy and melatonin relative to DLMO, because the direction of the shift depends on timing; see the [phase response curve](/science/phase-response-curve-light-timing).

## Moving Your DLMO
You can't feel your DLMO, but you can move it:
1. **Morning light moves it earlier.** About 20 minutes outdoors soon after waking is a good daily habit; the [morning sunlight guide](/guides/morning-sunlight-lux-protocol-guide) explains how much you need.
2. **Dim evenings stop it being pushed later.** Lower the lights and screens in the last couple of hours before bed; the [evening light guide](/guides/evening-blue-light-melatonin-defense-guide) has specifics.
3. **Consistent timing keeps it stable.** Big swings in wake time at weekends move it around; see [what social jetlag is](/blog/what-is-social-jetlag).

> [!NOTE] Melatonin supplements are sometimes used to shift DLMO, usually at low doses and at a specific time. Talk to a doctor or pharmacist before using them.

## Where ARC Fits
ARC doesn't measure melatonin. It works on the habits that move it: a 20-minute morning light timer that starts from your real sunrise, and a wind-down reminder before the bedtime you set, a cue to dim the lights while your melatonin is rising.
    `,
  },
];
