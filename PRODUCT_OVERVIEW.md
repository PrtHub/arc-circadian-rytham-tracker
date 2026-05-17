# ARC // Product Overview & Documentation

**Status:** Live in production — iOS App Store approved.

## Mission Statement

**Stop fighting your biology. Start working with it.**

ARC is a circadian rhythm app that aligns your daily schedule with your natural energy peaks. Unlike generic wellness apps that treat every hour equally, ARC uses chronobiology to build your day around your unique biological blueprint — then gives you guided actions to actually follow it.

---

## Core Value Proposition

ARC answers one question: _"What should I be doing right now?"_

- **Chronotype Identity:** Lion, Bear, Wolf, or Dolphin — discovered through a 35-step personalized onboarding.
- **Live Caffeine Forecast:** A 12-hour SVG decay curve on the home screen with a sleep-safe threshold line. Watch your level rise and fall hour by hour.
- **Guided Actions:** Live sunlight duration tracking, focus sessions, wind-down sequences — not just timers and checklists.
- **Manual Sleep Check-in:** Morning prompt to rate sleep quality (Good/Poor) that adjusts today's protocol and triggers personalized Intel briefings.
- **Privacy First:** Local-first architecture (SQLite + AsyncStorage). No server, no account, no third-party login. Your biological data never leaves your device.

---

## Key Features

### 1. The 35-Step Personalized Onboarding

A deep onboarding flow — the longest in the category — that builds a full biological profile while delivering value at every stage:

- **Sleep Profile + Analysis:** Natural wake, bedtime, quality. Followed by a personalized loading-and-reveal sequence ("Analyzing your sleep timing..." → Sleep Education).
- **Calibration & Energy Map:** Age, work schedule, peak/crash windows, morning routine.
- **Energy Pattern Insight:** A personalized verdict (Misaligned / Aligned / Inverted / Trainable) based on focus × work-schedule combination.
- **Caffeine Arc:** Habit + first-coffee timing → Cortisol curve loading animation → personalized Caffeine Aha (the strongest aha in the flow).
- **Your #1 Mistake:** Personalized 3-mistake reveal before the paywall.
- **Chronotype Reveal:** Identity reveal (Lion / Bear / Wolf / Dolphin) derived from the full profile.
- **Conversion Sequence:** 7 post-reveal screens — testimonials with auto-presenting Apple-style rating modal, comparison, personal commitment ("type your why"), live demo with their actual data, 30-day future-self projection, risk reversal, and a final activating loading sequence.
- **Resume mid-flow:** All answers persist via AsyncStorage. If a call, app switch, or force-quit interrupts the flow, reopening resumes at the same step.

See [docs/onboarding.md](./onboarding.md) for the full spec.

### 2. Home Tab — One Action at a Time

The home screen is built around the current block, not a full-day list:

- **Hero Card:** Active protocol block with live countdown and contextual brief.
- **Caffeine Status Card:** Live 12-hour SVG decay curve showing predicted mg over time, with a dashed sleep-safe threshold line. Recomputes whenever a new entry is logged.
- **Sunlight Timer:** Live duration tracking toward 20-minute morning target with progress ring.
- **Contextual HUD:** Sunlight / Move / Coffee quick-action buttons that adapt to the time of day.
- **Today's Protocol:** Full timeline beneath for reference.

### 3. Live Caffeine Forecast (Flagship Feature)

The most unique feature in the category:

- Log each drink (espresso, cold brew, matcha, etc.) with time and estimated mg.
- **Live SVG decay curve** showing predicted caffeine mg over the next 12 hours, with a color-matched gradient fill (green when low → orange when moderate → red when high).
- **Sleep-safe threshold line** at 25mg, dashed purple — visualizes the moment caffeine drops below sleep-disrupting levels.
- "Sleep-safe at [time]" prediction that updates with every log.
- Caffeine wall notification: last safe coffee based on your target sleep time.

### 4. Manual Sleep Check-in

A lightweight morning prompt that captures sleep quality without requiring any device integration:

- "How was your sleep?" prompt shown each morning before noon.
- Good/Poor response adjusts today's protocol emphasis.
- Poor night triggers a recovery-mode Intel briefing: skip intense work, get sunlight early, delay caffeine 90 minutes.
- Data stored locally and used to power weekly Insights patterns.

### 5. Contextual Intel Feed

Daily briefings driven by yesterday's behavior — not a static article library:

- "You had coffee at 3:15 PM — past your wall. Here's why that cuts deep sleep..."
- "You woke 40 min late. Here's how to recover from social jetlag..."
- "3-day streak! Here's what happens to cortisol after 7 consistent days..."

### 6. Actionable Insights

Every chart paired with a concrete recommendation:

- Photon latency, anchor stability, sync score.
- "Your latency was 45 min — here's what to change tomorrow."
- Weekly pattern analysis: avg sunlight latency, avg wake deviation, trend direction.

### 7. Chronotype-Aware Notifications

Notifications adapt to the user's chronotype — Lions, Bears, Wolves, and Dolphins each receive different copy for the same event. The system has 18 notification templates (12 daytime + 6 night-shift), each with 4 chronotype variants × 3 rotating bodies (~216 unique copies, day-of-year picks the variant).

The You tab → Notification Center exposes:

- **Chronotype-prefixed toggles:** "Wolf Morning Routine" / "Wolf Caffeine Timing" / "Wolf Wind-Down" (substitutes user's actual chronotype).
- **"Preview" card** showing real sample messages for the user's chronotype, pulled directly from the templates so users see what they'll actually receive.

### 8. Adaptive Protocols

The protocol adjusts to real life:

- Weekend mode for expected sleep-ins.
- Timezone detection for travel.
- Seasonal sunrise adjustment (4+ hour variation across the year).
- Recovery shift when user reports poor sleep quality via morning check-in.
- Night-shift inversion: full protocol flips for shift workers (evening sunlight anchor, late strategic caffeine, daytime blackout sleep).

### 9. Display Preferences

- **12h / 24h time format toggle** in You tab → Display section.
- All times across the app — schedule, caffeine wall, paywall numbers, sleep window — re-render via the `useFormatTime()` hook.

---

## Pricing

| Plan    | Price                     | Notes                                                                         |
| ------- | ------------------------- | ----------------------------------------------------------------------------- |
| Weekly  | $4.99/week                | No free trial. Pay as you go, pause anytime.                                  |
| Monthly | $9.99/month               | No free trial. Accessed via the "Want monthly billing?" link on hard paywall. |
| Annual  | $34.99/year (~$0.67/week) | **Includes 3-day free trial. Save 86% vs weekly.**                            |

Monthly is surfaced via a slide-up modal triggered by the "Want monthly billing?" link below the Continue CTA — keeps the default picker focused on Weekly vs Annual without three-tier decision paralysis. Selecting Monthly shows an aura-green confirmation pill and swaps the timeline copy.

---

## The Science Behind ARC

Built on protocols from **Dr. Andrew Huberman** (Stanford) and **Dr. Matthew Walker** (UC Berkeley).

- **Circadian Rhythm:** The internal 24-hour clock governing alertness, metabolism, and sleep pressure.
- **Adenosine Management:** ARC times coffee intake after the adenosine clear window — preventing the afternoon crash.
- **Cortisol Awakening Response:** Morning sunlight anchors the cortisol peak, setting the entire day's energy curve.
- **Melatonin Anchoring:** Consistent light exposure in the morning triggers melatonin onset ~14-16 hours later.
- **Social Jetlag:** Weekend sleep drift creates a perpetual "Monday jetlag." ARC quantifies it and helps reduce it.
- **Caffeine Half-Life:** ~5-hour half-life means an afternoon coffee is still 25% active at midnight. ARC visualizes this in real time via the live decay curve.

---

## Target Audience

- **High-Performers:** Founders, engineers, and creators who need maximum focus hours.
- **Coffee Drinkers:** Anyone who drinks coffee and has never understood how it actually interacts with their sleep.
- **ADHD Professionals:** People who need structured, visual guidance rather than open-ended to-do lists.
- **Sleep Seekers:** People sleeping 7-8 hours but still waking exhausted — the timing problem, not a duration problem.
- **Wolves & Night-Shift Workers:** The 73% who don't fit a 9-to-5 template. ARC is one of the few apps that fully respects DSPD and inverted schedules.
- **Biohackers:** Users who want real data and correlations, not just streaks and checkboxes.

---

## Technical Stack

ARC is a local-first iPhone app built for speed and privacy.

- **Framework:** Expo / React Native
- **Platform:** iOS only (`supportsTablet: false`).
- **State:** Zustand (with `persist` middleware backed by AsyncStorage for in-progress onboarding state)
- **Database:** SQLite (via `expo-sqlite`) for completed onboarding profile + daily logs
- **Animations:** React Native Reanimated
- **Vector Graphics:** `react-native-svg` (caffeine decay curve, cortisol loading animation)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Payments:** RevenueCat (Weekly / Monthly / Annual SKUs, all managed via Apple's StoreKit)
- **Notifications:** Expo Notifications (push, scheduled, chronotype-aware copy via 18 template families)
- **Analytics:** Mixpanel (funnel, segmentation, conversion events)
- **Reviews:** `expo-store-review` (Apple's native StoreKit prompt, gated by 4-5 star self-rating to preserve quota)

---

## Roadmap (Next)

1. **Day-30 Motivation Callback.** Surface the user's original "type your why" text on Day 30 with a recommit CTA. Retention lever.
2. **Apple Introductory Offer.** "$19.99 first year, then $34.99" — triggered only on second paywall visit, configured via App Store Connect → Subscriptions → Promotional Offers.
3. **Advanced Biometrics (optional).** Apple Watch / Oura / Whoop support for real-time energy scoring (only after retention is solid — current app is fully manual / local-first).
4. **Widget Support.** Caffeine wall countdown and current block on the iOS home screen.
5. **Android Port.** Once iOS retention metrics stabilize.

---

_"Your energy has a schedule. ARC just shows it to you."_

---

## App Store Metadata — Title & Subtitle Combinations

**Strategy:** Each combination targets a different keyword cluster. Deploy across regions to maximize keyword coverage without cannibalizing the same search traffic.

**Keyword data (US, en-US):**

| Keyword              | Current Position | Difficulty | Traffic |
| -------------------- | ---------------- | ---------- | ------- |
| Circadian Rhythm     | #25              | 32         | 48      |
| Chronotype           | #46              | 22         | 42      |
| Sleep Schedule       | —                | 44         | 73      |
| Morning Routine      | —                | 44         | 68      |
| Productivity Tracker | —                | 39         | 68      |
| Sleep Optimizer      | —                | 46         | 68      |
| Energy Tracker       | —                | 44         | 57      |

---

### Option A — Defend & Grow (Recommended for US)

> **Title:** ARC: Circadian Rhythm & Sleep
> **Subtitle:** Chronotype · Sleep Schedule

Keywords: Circadian Rhythm (already #25, difficulty 32), Chronotype (already #46, difficulty 22), Sleep Schedule (traffic 73).
Best for markets where you already have brand recognition. Reinforces existing rankings and adds highest-traffic keyword.

---

### Option B — Go for Traffic

> **Title:** ARC: Sleep Schedule Optimizer
> **Subtitle:** Circadian Rhythm · Chronotype

Keywords: Sleep Schedule (traffic 73), Sleep Optimizer (traffic 68), Circadian Rhythm, Chronotype.
Best for new markets where brand is unknown. Leads with what people are already searching for.

---

### Option C — Broad Appeal

> **Title:** ARC: Sleep & Energy Tracker
> **Subtitle:** Circadian Rhythm · Chronotype

Keywords: Energy Tracker (traffic 57), Circadian Rhythm, Chronotype.
Best for markets with a strong fitness/biohacking culture (AU, CA, UK).

---

### Option D — Productivity Angle

> **Title:** ARC: Circadian Rhythm Tracker
> **Subtitle:** Sleep Schedule · Productivity

Keywords: Circadian Rhythm (anchor), Sleep Schedule (traffic 73), Productivity Tracker (traffic 68, difficulty 39).
Best for markets where productivity apps dominate (JP, KR, SG).

---

### Option E — Productivity + Sleep

> **Title:** ARC: Sleep & Productivity
> **Subtitle:** Circadian Rhythm · Chronotype

Keywords: Sleep Schedule, Productivity Tracker, Circadian Rhythm, Chronotype.
Best for markets where neither anchor keyword is indexed yet — leads with two high-traffic terms.

---

### Option F — Fast Rank (Easiest to climb)

> **Title:** ARC: Circadian Rhythm & Sleep
> **Subtitle:** Chronotype · Productivity Tracker

Keywords: Circadian Rhythm (difficulty 32), Chronotype (difficulty 22 — lowest on list), Productivity Tracker (difficulty 39).
Best for smaller or newer storefronts where ranking fast matters more than raw traffic volume.

---

### Region Deployment Suggestion

| Region           | Recommended Option | Reason                                                   |
| ---------------- | ------------------ | -------------------------------------------------------- |
| US               | Option A           | Already ranking, push existing keywords up               |
| UK               | Option C           | Fitness/biohacking audience, energy angle                |
| CA               | Option D           | Productivity-driven market                               |
| AU               | Option B           | New market, lead with traffic                            |
| Other EN markets | Option F           | Low difficulty = fast ranking in uncontested storefronts |

> Note: Check keyword traffic/difficulty per-region before deploying — search volume varies significantly outside the US.
