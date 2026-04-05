# ARC // Product Overview & Documentation

## Mission Statement

**Stop fighting your biology. Start working with it.**

ARC is a circadian rhythm app that aligns your daily schedule with your natural energy peaks. Unlike generic wellness apps that treat every hour equally, ARC uses chronobiology to build your day around your unique biological blueprint — then gives you guided actions to actually follow it.

---

## Core Value Proposition

ARC answers one question: _"What should I be doing right now?"_

- **Chronotype Identity:** Lion, Bear, Wolf, or Dolphin — discovered through a 22-point precision diagnosis.
- **Guided Actions:** Not just timers and checklists — live sunlight duration tracking, real-time caffeine half-life curves, focus sessions, and wind-down sequences.
- **Caffeine Intelligence:** Log every drink, watch the decay curve in real time, and know the exact minute it's safe to sleep.
- **Manual Sleep Check-in:** Morning prompt to rate sleep quality (Good/Poor) that adjusts today's protocol and triggers personalized Intel briefings.
- **Privacy First:** Local-first architecture. Your biological data never leaves your device.

---

## Key Features (Current)

### 1. The 22-Point Precision Diagnosis

A deep onboarding flow — the longest in the category — that builds a full biological profile before the first paywall. Collects:

- **Sleep Profile:** Natural wake time, actual bedtime, sleep quality, and weekend drift (social jetlag).
- **Energy Map:** Peak focus window, energy crash timing, morning routine habit.
- **Caffeine Habits:** Drink preference, first coffee timing relative to wake (the #1 mistake ARC fixes).
- **Lifestyle Context:** Exercise timing, work schedule, night screen habits.
- **Personalized "Aha" Moments:** Education screens triggered by the user's own answers — not generic content.
- **Your #1 Mistake:** A personalized reveal before the paywall showing the single biggest circadian error from their data.
- **Chronotype Reveal:** Identity reveal (Lion / Bear / Wolf / Dolphin) derived from their full profile.

### 2. Home Tab — One Action at a Time

The home screen is built around the current block, not a full-day list:

- **Hero Card:** Active protocol block with live countdown and contextual brief.
- **Caffeine Status Card:** Real-time caffeine mg level with half-life decay curve and sleep-safe prediction.
- **Sunlight Timer:** Live duration tracking toward 20-minute morning target with progress ring.
- **Contextual HUD:** Sunlight / Move / Coffee quick-action buttons that adapt to the time of day.
- **Today's Protocol:** Full timeline beneath for reference.

### 3. Caffeine Tracking (Flagship Feature)

The most unique feature in the category:

- Log each drink (espresso, cold brew, matcha, etc.) with time and estimated mg.
- Live caffeine decay curve showing current mg active based on 5-hour half-life.
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

### 7. Adaptive Protocols

The protocol adjusts to real life:

- Weekend mode for expected sleep-ins.
- Timezone detection for travel.
- Seasonal sunrise adjustment (4+ hour variation across the year).
- Recovery shift when user reports poor sleep quality via morning check-in.

### 8. Smart Notifications

Chronotype-aware nudges written in human language:

- "Coffee time — Your adenosine has cleared. Coffee now gives you clean energy without the afternoon crash." (10:00 AM)
- "Caffeine wall — stop now — Every coffee after this point costs you 15-20 min of deep sleep." (4:30 PM)
- "Start winding down — Melatonin production is ramping up. Dim lights and reduce screen brightness." (9:00 PM)

---

## Pricing

| Plan   | Price                     | Notes                                          |
| ------ | ------------------------- | ---------------------------------------------- |
| Weekly | $4.99/week                | No free trial. Instant access, cancel anytime. |
| Annual | $34.99/year (~$0.67/week) | Includes 3-day free trial. Save 86% vs weekly. |

Monthly plan exists in RevenueCat but is not shown in UI — reserved for future use.

---

## The Science Behind ARC

Built on protocols from **Dr. Andrew Huberman** (Stanford) and **Dr. Matthew Walker** (UC Berkeley).

- **Circadian Rhythm:** The internal 24-hour clock governing alertness, metabolism, and sleep pressure.
- **Adenosine Management:** ARC times coffee intake after the adenosine clear window — preventing the afternoon crash.
- **Cortisol Awakening Response:** Morning sunlight anchors the cortisol peak, setting the entire day's energy curve.
- **Melatonin Anchoring:** Consistent light exposure in the morning triggers melatonin onset ~14-16 hours later.
- **Social Jetlag:** Weekend sleep drift creates a perpetual "Monday jetlag." ARC quantifies it and helps reduce it.
- **Caffeine Half-Life:** ~5-hour half-life means an afternoon coffee is still 25% active at midnight. ARC visualizes this in real time.

---

## Target Audience

- **High-Performers:** Founders, engineers, and creators who need maximum focus hours.
- **Coffee Drinkers:** Anyone who drinks coffee and has never understood how it actually interacts with their sleep.
- **ADHD Professionals:** People who need structured, visual guidance rather than open-ended to-do lists.
- **Sleep Seekers:** People sleeping 7-8 hours but still waking exhausted — the timing problem, not a duration problem.
- **Biohackers:** Users who want real data and correlations, not just streaks and checkboxes.

---

## Technical Stack

ARC is a local-first mobile app built for speed and privacy.

- **Framework:** Expo / React Native
- **State:** Zustand (Persistence via `expo-sqlite`)
- **Database:** SQLite (local storage)
- **Animations:** React Native Reanimated
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Payments:** RevenueCat (IAP management)
- **Notifications:** Expo Notifications (push, scheduled)

---

## Roadmap (Next)

1. **Advanced Biometrics:** Oura, Whoop, and Apple Watch integration for real-time energy scoring.
2. **Widget Support:** Caffeine wall countdown and current block on the iOS home screen.
3. **Android:** Port after iOS v1 is stable.

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
