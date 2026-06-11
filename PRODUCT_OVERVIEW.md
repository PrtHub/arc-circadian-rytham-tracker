# ARC // Product Overview & Documentation

**Status:** Live in production — iOS App Store approved.

## Mission Statement

**Stop fighting your biology. Start working with it.**

ARC is a circadian rhythm app that aligns your daily schedule with your natural energy peaks. Unlike generic wellness apps that treat every hour equally, ARC uses chronobiology to build your day around your unique biological blueprint — then gives you guided actions to actually follow it.

---

## Core Value Proposition

ARC answers one question: _"What should I be doing right now?"_

- **Chronotype Identity:** Lion, Bear, Wolf, or Dolphin — discovered through a 32-step personalized onboarding.
- **Live Caffeine Forecast:** A 12-hour SVG decay curve with a tap-to-scrub gesture. Drag anywhere on the curve to see exact mg at any future point.
- **AI Intelligence Layer:** Morning debrief + on-demand fatigue diagnosis powered by Google Gemini via OpenRouter.
- **Guided Actions:** Live sunlight duration tracking, focus sessions, wind-down sequences — not just timers and checklists.
- **Privacy First:** Local-first architecture (SQLite + AsyncStorage). No server, no account, no third-party login. Your biological data never leaves your device.

---

## Key Features

### 1. The 32-Step Personalized Onboarding

A deep onboarding flow — the longest in the category — that builds a full biological profile while delivering value at every stage:

- **Sleep Profile + Analysis:** Natural wake, bedtime, quality. Followed by a personalized loading-and-reveal sequence ("Analyzing your sleep timing..." → Sleep Education).
- **Calibration & Energy Map:** Age, work schedule, peak/crash windows, morning routine.
- **Energy Pattern Insight:** A personalized verdict (Misaligned / Aligned / Inverted / Trainable) based on focus × work-schedule combination.
- **Caffeine Arc:** Habit + first-coffee timing → Cortisol curve loading animation → personalized Caffeine Aha (the strongest aha in the flow).
- **Your #1 Mistake:** Personalized 3-mistake reveal before the paywall.
- **Chronotype Reveal:** Identity reveal (Lion / Bear / Wolf / Dolphin) derived from the full profile.
- **Conversion Sequence:** Post-reveal screens — testimonials with auto-presenting Apple-style rating modal, personal commitment ("type your why"), live demo with their actual data, 30-day future-self projection, risk reversal, and a final activating loading sequence.
- **Resume mid-flow:** All answers persist via AsyncStorage. If a call, app switch, or force-quit interrupts the flow, reopening resumes at the same step.

### 2. Home Tab — One Action at a Time

The home screen is built around the current block, not a full-day list:

- **Animal Identity Header:** Chronotype emoji (🦁🐻🐺🐬) in the streak badge. Greeting personalised to chronotype: "Good morning, Wolf."
- **AI Morning Debrief:** Smart card that appears before 2pm (or all day if already fetched). Pulls from today's logged data — caffeine, sunlight, energy, sleep quality — and delivers a 2–3 sentence personalised insight from Gemini. One fetch per day.
- **"Why Am I Tired?" Diagnosis:** Contextual AI card that appears only after the user logs a low energy check-in. Diagnoses the likely cause from their data and gives one fix for right now. 60-second call cooldown.
- **Hero Card:** Active protocol block with live countdown and contextual brief.
- **Caffeine Status Card:** Live 12-hour SVG decay curve with tap-to-scrub gesture, sleep-safe threshold line, and "safe at [time]" prediction.
- **Sunlight Timer:** Live duration tracking toward 20-minute morning target with progress ring.
- **Contextual HUD:** Sunlight / Move / Coffee quick-action buttons that adapt to time of day.

### 3. Live Caffeine Forecast (Flagship Feature)

- Log each drink with time and mg: espresso, double espresso, drip, cold brew, matcha, green tea, black tea, energy drink, pre-workout, cola, decaf, or custom mg.
- **Backdated logging:** Date pill row lets users log for any of the past 7 days.
- **Live SVG decay curve** with color-matched gradient (green → orange → red).
- **Scrubber gesture:** Tap or drag anywhere on the curve to see a tooltip with exact mg and time-from-now at that point. Auto-dismisses after 1.8s.
- **Sleep-safe threshold line** at 25mg, dashed purple.
- "Sleep-safe at [time]" prediction that updates with every log.

### 4. AI Intelligence Layer

Powered by Google Gemini (`google/gemini-3.1-flash-lite`) via OpenRouter. All calls are gated on `EXPO_PUBLIC_OPENROUTER_KEY`.

- **Morning Debrief:** Appears before 2pm on the home screen. Tapping opens a bottom sheet with a 2–3 sentence insight connecting the user's logged data to how they likely feel, plus one specific action for today. Cached once per day via `debrief-store`.
- **Why Am I Tired?:** Surfaces only when the most recent energy check-in today is "low." Diagnoses fatigue using caffeine timing, sunlight, sleep quality, and energy logs. Returns a direct cause + one fix for right now. Not cached — refreshes on each tap (60s rate limit).

### 5. Manual Sleep Check-in

- "How was your sleep?" prompt each morning before noon.
- Good/Poor response adjusts today's protocol emphasis.
- Data feeds into both AI features for context.

### 6. Actionable Insights

Every chart paired with a concrete recommendation:

- **Energy Correlation:** Sync score line overlaid on energy bar chart — see if low-energy days follow poor protocol days.
- **Photon Latency:** Daily sunlight latency bars with a 20-min target line and advice copy.
- **Anchor Stability:** Wake deviation line with ±30min safe zone. Worst-day callout.
- **Weekly Bio-Report:** Avg latency, avg offset, sync trend, caffeine burden card with estimated sleep cost.

### 7. Chronotype-Aware Notifications

18 notification template families (12 daytime + 6 night-shift), each with 4 chronotype variants × 3 rotating bodies. The You tab → Notification Center exposes:

- **Chronotype-prefixed toggles:** "Wolf Morning Routine" / "Wolf Caffeine Timing" / "Wolf Wind-Down."
- **Preview card** showing real sample messages for the user's chronotype.

### 8. Adaptive Protocols

- Weekend mode for expected sleep-ins.
- Timezone detection for travel.
- Seasonal sunrise adjustment (4+ hour variation across the year).
- Recovery shift when user reports poor sleep.
- Night-shift inversion: full protocol flips for shift workers.

### 9. Display Preferences

- **12h / 24h time format toggle** in You tab → Display section.
- All times across the app re-render via `useFormatTime()`.

---

## Pricing

| Plan    | Price        | Notes                                                               |
| ------- | ------------ | ------------------------------------------------------------------- |
| Weekly  | $4.99/week   | No free trial. Pay as you go.                                       |
| Monthly | $9.99/month  | No free trial. Accessed via "Want monthly billing?" link on paywall.|
| Annual  | $29.99/year  | No free trial. Best value.                                          |

No free trials on any plan. Monthly surfaced via slide-up modal to avoid three-tier decision paralysis on the main paywall.

---

## The Science Behind ARC

Built on protocols from **Dr. Andrew Huberman** (Stanford) and **Dr. Matthew Walker** (UC Berkeley).

- **Circadian Rhythm:** The internal 24-hour clock governing alertness, metabolism, and sleep pressure.
- **Adenosine Management:** ARC times coffee intake after the adenosine clear window — preventing the afternoon crash.
- **Cortisol Awakening Response:** Morning sunlight anchors the cortisol peak, setting the entire day's energy curve.
- **Melatonin Anchoring:** Consistent light exposure in the morning triggers melatonin onset ~14-16 hours later.
- **Social Jetlag:** Weekend sleep drift creates a perpetual "Monday jetlag." ARC quantifies it and helps reduce it.
- **Caffeine Half-Life:** ~5-hour half-life means an afternoon coffee is still 25% active at midnight. ARC visualises this in real time.

---

## Target Audience

- **High-Performers:** Founders, engineers, and creators who need maximum focus hours.
- **Coffee Drinkers:** Anyone who drinks coffee and has never understood how it actually interacts with their sleep.
- **ADHD Professionals:** People who need structured, visual guidance rather than open-ended to-do lists.
- **Sleep Seekers:** People sleeping 7-8 hours but still waking exhausted — the timing problem, not a duration problem.
- **Wolves & Night-Shift Workers:** The 73% who don't fit a 9-to-5 template.
- **Biohackers:** Users who want real data and correlations, not just streaks and checkboxes.

---

## Technical Stack

- **Framework:** Expo SDK 54 / React Native
- **Platform:** iOS (primary); iPad supported (`supportsTablet: true`)
- **State:** Zustand with `persist` middleware (AsyncStorage for onboarding + debrief state)
- **Database:** SQLite (`expo-sqlite`) for daily logs, protocol tracking, caffeine entries
- **AI:** Google Gemini via OpenRouter (`google/gemini-3.1-flash-lite`). Key via `EXPO_PUBLIC_OPENROUTER_KEY` (gitignored `.env.local`)
- **Animations:** React Native Reanimated
- **Vector Graphics:** `react-native-svg` (caffeine decay curve, cortisol animation)
- **Gestures:** `PanResponder` (caffeine curve scrubber)
- **Styling:** NativeWind (Tailwind CSS for React Native)
- **Payments:** RevenueCat (Weekly / Monthly / Annual SKUs, StoreKit)
- **Notifications:** Expo Notifications (push, scheduled, chronotype-aware)
- **Analytics:** Mixpanel
- **Reviews:** `expo-store-review` (gated by 4-5 star self-rating)

---

## Roadmap (Next)

1. **Sound on Chronotype Reveal.** 2-3 second ambient tone per animal on the identity screen. Needs `expo-av` + 4 audio assets (lion/bear/wolf/dolphin).
2. **Day-30 Motivation Callback.** Surface the user's "type your why" text on Day 30 with a recommit CTA.
3. **Apple Introductory Offer.** "$19.99 first year, then $29.99" — triggered on second paywall visit.
4. **Widget Support.** Caffeine wall countdown + current block on iOS home screen.
5. **Apple HealthKit.** Real sleep times, steps, HRV — unlock true correlation data in Insights.
6. **Android Port.** Once iOS retention metrics stabilize.

---

## App Store Metadata — Title & Subtitle Combinations

| Option | Title | Subtitle | Best For |
|--------|-------|----------|----------|
| A | ARC: Circadian Rhythm & Sleep | Chronotype · Sleep Schedule | US (defend existing rankings) |
| B | ARC: Sleep Schedule Optimizer | Circadian Rhythm · Chronotype | New markets, lead with traffic |
| C | ARC: Sleep & Energy Tracker | Circadian Rhythm · Chronotype | AU/CA (fitness/biohacking) |
| D | ARC: Circadian Rhythm Tracker | Sleep Schedule · Productivity | JP/KR/SG (productivity markets) |
| F | ARC: Circadian Rhythm & Sleep | Chronotype · Productivity Tracker | Small storefronts, fast rank |

---

_"Your energy has a schedule. ARC just shows it to you."_
