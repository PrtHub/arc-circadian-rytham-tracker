# ARC SEO Rules & Growth Playbook

**Stop writing general sleep blogs and biology guides immediately, and put 100% of your focus into your Interactive Tools, Chronotype Schedule pages, and App Comparison posts.**

Your Search Console numbers tell a very clear story: Google treats general sleep/biology articles (`cortisol`, `adenosine`, `melatonin`, `alcohol and sleep`) as **medical (YMYL) content** and blocks new domains without medical authority from ranking. At the same time, Google has **no medical filter on interactive calculators, chronotype schedules, or app comparisons**—which is why those three buckets generate **99% of your impressions**.

---

## 1. The Verdict by Content Type (Based on Search Console Data)

| Content Bucket on [arccircadian.com](https://arccircadian.com/)                                                    | 3-Mo Impressions | 3-Mo Clicks | Verdict                                                   | Why                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :----------------------------------------------------------------------------------------------------------------- | :--------------- | :---------- | :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1. Free Calculators ([/tools/\*](https://arccircadian.com/tools))**                                              | **3,071+**       | **16**      | **#1 Priority (Scale High-Intent Child Tools)**           | Drives **55%+ of all site impressions**. [Caffeine Calculator](https://arccircadian.com/tools/caffeine-calculator) (`2,411` imp), [Chronotype Quiz](https://arccircadian.com/tools/chronotype-quiz) (`281` imp), [Sunlight Calculator](https://arccircadian.com/tools/sunlight-calculator) (`236` imp), and [Social Jetlag Calculator](https://arccircadian.com/tools/social-jetlag-calculator) (`51` imp, `5.9%` CTR) bypass medical-blog filters because users want a calculator, not an essay.                |
| **2. Chronotype Pages ([/chronotype/\*](https://arccircadian.com/chronotype/wolf))**                               | **2,029+**       | **13**      | **#2 Priority (Upgrade Existing Pages First)**            | [Wolf](https://arccircadian.com/chronotype/wolf) (`653` imp), [Bear](https://arccircadian.com/chronotype/bear) (`597+` imp), [Dolphin](https://arccircadian.com/chronotype/dolphin) (`428` imp), and [Lion](https://arccircadian.com/chronotype/lion) (`351` imp) already rank **#4 to #8 on Page 1 of Google**, but lose clicks to [Sleepopolis](https://sleepopolis.com/education/bear-chronotype/) and [Lifestack](https://lifestack.ai/blog/wolf-chronotype) because generic pages lack hour-by-hour tables. |
| **3. App Comparison & Identity Blogs ([/blog/\*](https://arccircadian.com/blog/best-circadian-rhythm-apps-2026))** | **535**          | **9**       | **#3 Priority (Only Write Bottom-of-Funnel Comparisons)** | 8 of 10 generic blog posts have **0 clicks** because health publishers own generic sleep queries. Your **only** blog winners are [Best Circadian Rhythm Apps in 2026](https://arccircadian.com/blog/best-circadian-rhythm-apps-2026) (`396` imp, `7` clicks, **#1 on Google**) and `signs-you-are-a-night-owl` (`139` imp, `2` clicks).                                                                                                                                                                          |
| **4. Science & Step-by-Step Guides (`/guides/*` & `/science/*`)**                                                  | **11**           | **1**       | **Freeze Creation Here**                                  | 11 in-depth guides and science explainers (`cortisol`, `adenosine`, `zeitgeber`, `circadian reset`) generated almost 0 traffic. The lone click came from `sleep-chronotype-couples-compatibility-guide` (`11` imp, `1` click)—which is really a chronotype tool query.                                                                                                                                                                                                                                           |

---

## 2. Fix Existing Pages vs. Add New Pages: The 70 / 30 Rule

Do **not** add more general content pages right now. When a new domain has 35+ thin or zero-impression URLs (`/guides/*`, `/science/*`, `/for/*`), Google spreads your limited crawl budget and internal link equity too thin.

### Spend 70% of Your Effort Upgrading the Existing High-Impression Pages

- **Upgrade the 4 Chronotype URLs ([Wolf](https://arccircadian.com/chronotype/wolf), [Bear](https://arccircadian.com/chronotype/bear), [Lion](https://arccircadian.com/chronotype/lion), [Dolphin](https://arccircadian.com/chronotype/dolphin))**:
  - Keep the exact same URLs.
  - Fix title tags and meta descriptions to include clock times.
  - Add a 12-row hour-by-hour HTML schedule table (`6:00 AM` to `11:00 PM`).
  - Embed the interactive `/tools/daily-schedule-generator` widget directly inside all four pages.
  - Moving those four pages from #4–#8 to #1–#3 with a 6%–10% CTR turns **2,029 impressions into 150–200 clicks** on its own.
- **Upgrade [Caffeine Half-Life Calculator](https://arccircadian.com/tools/caffeine-calculator)**:
  - Add `data-nosnippet` to the live calculated output to prevent Google from answering queries in zero-click snippets.
  - Add the exact phrases `"coffee half-life calculator"` and `"caffeine half-time calculator"` in the prose.
  - Place a static **Hour-by-Hour Caffeine Decay Table** below the calculator for Googlebot to index.
- **Fold invisible `/guides/*` content into the `/tools/*` pages they belong to**:
  - Move the best sections and tables from `/guides/caffeine-half-life-optimization-guide` and `/guides/morning-sunlight-lux-protocol-guide` directly onto [Caffeine Calculator](https://arccircadian.com/tools/caffeine-calculator) and [Morning Sunlight Calculator](https://arccircadian.com/tools/sunlight-calculator) (`236` impressions, `3` clicks).
  - 301-redirect the dead guide URLs to the tools. That makes your tool pages 1,500-word powerhouses that outrank single-widget competitors like Jitterliss and SunlightCalculator.com.

---

## 3. High-ROI Scaled Page Architecture (255+ Total Pages)

> [!IMPORTANT]
> **Localization Rule**: Avoid translations (`/de/`, `/es/`, `/pt/`) at this point. Focus 100% of engineering and content efforts on English-language high-intent clusters first.

Every page created sits strictly inside the four high-ROI search pockets where Google rewards ARC with top impressions and zero YMYL medical penalties:

### Cluster A: Competitor App Alternatives & Comparisons (4 Pages)

| Exact URL Slug                            | Target Keywords & Intent                                   | Live SERP Gap & Why ARC Ranks Fast                                                                                                                                                                                               |
| :---------------------------------------- | :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/blog/rise-sleep-app-alternative`        | `rise sleep app alternative` / `apps like rise sleep`      | Auto-generated scraper pages on Unstar.app rank #1–#9 (listing irrelevant apps like BitePal). ARC's [Best Circadian Rhythm Apps in 2026](https://arccircadian.com/blog/best-circadian-rhythm-apps-2026) is already #1 on Google. |
| `/blog/timeshifter-alternative`           | `timeshifter app alternative` / `free jet lag app`         | Funnels high-intent travelers directly to ARC's [Jet Lag Planner](https://arccircadian.com/tools/jetlag-planner) and Travel Mode.                                                                                                |
| `/blog/lifestack-vs-arc`                  | `lifestack vs rise` / `lifestack alternative`              | Lifestack targets ARC's exact chronotype keywords; a head-to-head comparison captures their brand traffic and highlights ARC's zero-wearable privacy & local SQLite architecture.                                                |
| `/blog/best-caffeine-tracker-apps-iphone` | `best caffeine tracker app iphone` / `caffeine cutoff app` | Zero authoritative comparison posts focus on bedtime cutoff math vs. simple milligram logging.                                                                                                                                   |

### Cluster B: Drink-Specific Caffeine Calculators (8 Pages)

| Exact URL Slug                                   | Target Keywords & Intent                                                               | Live SERP Gap & Why ARC Ranks Fast                                                                                                             |
| :----------------------------------------------- | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `/tools/caffeine-calculator/celsius`             | `how long does celsius stay in your system` / `celsius 200mg caffeine half life`       | Zero dedicated calculators rank on Google for this exact query. Pre-fill 200 mg (Celsius) and 300 mg (Celsius Heat) with a static decay table. |
| `/tools/caffeine-calculator/starbucks-cold-brew` | `starbucks cold brew caffeine half life` / `when to stop drinking starbucks cold brew` | Only one static guide targets this. Pre-fill 205 mg (Grande) and show hour-by-hour clearance.                                                  |
| `/tools/caffeine-calculator/monster-energy`      | `how long does monster stay in your system` (160 mg)                                   | High daily search volume from gamers, students, and shift workers asking when a 160 mg Monster clears below 50 mg.                             |
| `/tools/caffeine-calculator/red-bull`            | `red bull caffeine half life` (80 mg & 114 mg 12oz)                                    | Captures afternoon energy drink searchers who don't realize an 80 mg can at 4:00 PM leaves ~32 mg active at 11:00 PM.                          |
| `/tools/caffeine-calculator/dunkin-iced-coffee`  | `dunkin iced coffee caffeine cutoff` (297 mg Medium)                                   | Dunkin's Medium Iced Coffee has nearly 3x the caffeine of standard coffee (297 mg); massive surprise factor and search demand.                 |
| `/tools/caffeine-calculator/espresso`            | `double shot espresso half life` (120–150 mg)                                          | Targets afternoon espresso and latte drinkers calculating their 10:00 PM or 11:00 PM bedtime residual.                                         |
| `/tools/caffeine-calculator/matcha`              | `matcha caffeine half life` (70 mg + L-theanine)                                       | Cross-links to the [Huberman Sleep Cocktail Builder](https://arccircadian.com/tools/sleep-cocktail) regarding L-theanine calming kinetics.     |
| `/tools/caffeine-calculator/pre-workout`         | `pre workout caffeine calculator bedtime` (200–350 mg)                                 | Evening gym-goers taking 250–300 mg pre-workout at 5:30 PM are one of the highest-converting audiences for a cutoff calculator.                |

### Cluster C: Chronotype Life & Pair Pages (7 Pages)

| Exact URL Slug                                                           | Target Keywords & Intent                                                         | Live SERP Gap & Why ARC Ranks Fast                                                                                                                        |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/chronotype/wolf-working-9-to-5`                                        | `wolf chronotype 9 to 5 schedule` / `night owl 8am job schedule`                 | Builds on your #1 page ([Wolf Chronotype](https://arccircadian.com/chronotype/wolf), 653 impressions) and outranks brand-new 3-week-old calculator sites. |
| `/tools/chronotype-compatibility/lion-and-wolf`                          | `lion and wolf chronotype relationship` / `early bird night owl couple schedule` | Zero dedicated tools rank for specific animal pairings, while ARC's compatibility quiz and couples guide already receive high CTR.                        |
| `/tools/chronotype-compatibility/bear-and-wolf`                          | `bear and wolf chronotype compatibility`                                         | The single most common couple pairing (~50% Bears + ~20% Wolves); show exact overlap windows for dinner, focus, and sleep.                                |
| `/tools/chronotype-compatibility/lion-and-bear`                          | `lion and bear chronotype compatibility`                                         | Second most common pairing; bridges the 9:30 PM vs. 11:00 PM bedtime gap.                                                                                 |
| `/tools/chronotype-compatibility/bear-and-dolphin`                       | `bear and dolphin chronotype compatibility`                                      | Solves co-sleeping friction when one partner is a heavy sleeper (Bear) and the other is an insomniac/light sleeper (Dolphin).                             |
| `/tools/night-shift-sleep-calculator` (or embed on `/for/shift-workers`) | `night shift sleep schedule calculator` / `shift work sleep calculator`          | Brand-new micro-sites are already ranking on Page 1. Embed this tool directly on your indexed `/for/shift-workers` page.                                  |
| `/tools/adhd-sleep-schedule-calculator` (or embed on `/for/adhd`)        | `adhd circadian rhythm schedule` / `delayed sleep phase calculator`              | The `/for/adhd` page already gets a 9.1% CTR, and communities in r/adhdwomen and r/DSPD constantly seek non-judgmental schedules.                         |

---

## 4. Why This Content Mix Beats Writing More Blogs

1. **Reuses Existing React Components**:
   - Every drink page uses the existing `CaffeineCalculatorClient` with pre-filled defaults (`defaultDrink="Celsius"`, `defaultMg=200`) plus a 300-word drink-specific scientific intro and static decay table.
   - Every pairing page reuses the `ChronotypeCompatibilityClient` engine.
2. **Piggybacks on #1 Ranking Assets**:
   - Because Google already ranks [Best Circadian Rhythm Apps in 2026](https://arccircadian.com/blog/best-circadian-rhythm-apps-2026) at #1, internal links from that post to `/blog/rise-sleep-app-alternative` and `/blog/best-caffeine-tracker-apps-iphone` pass immediate PageRank and index them on Page 1 within days.
3. **Fixes Thin Landing Pages**:
   - Instead of leaving `/for/shift-workers` and `/for/adhd` as thin marketing copy, embedding the Night Shift Calculator and ADHD Schedule Builder directly on those pages transforms them into high-utility authority hubs.

---

## 5. Snippet CTR Optimization & Anti-Zero-Click Rules

### Rule 1: The "Clock-Time" Title Tag Formula for Chronotypes

- **Bad Title**: `Wolf Chronotype: Sleep Traits & Optimal Daily Routine | ARC` (CTR: 1.1% — Looks like every other generic blog post).
- **Winning Title**: `Wolf Chronotype Schedule: Sleep at 12:00 AM, Peak at 5:00 PM` (CTR: 5.5%–9.0%).
- **Why it works**: Searchers for chronotypes want actionable clock times, not theoretical definitions. Seeing specific times in the SERP snippet signals that the page has concrete answers.

### Rule 2: Protect Calculator Answers with `data-nosnippet`

- **The Problem**: When Google crawls an interactive calculator, it scrapes the default calculation text (e.g., _"100mg of caffeine clears in 10 hours"_) and displays it directly in the search snippet. The searcher gets their answer on Google and never clicks through to your website.
- **The Fix**: Wrap default calculator output and interactive result boxes with `<div data-nosnippet>`:
  ```html
  <div data-nosnippet class="calculator-result">
    <!-- Live calculated values: Google will not steal this for snippets -->
  </div>
  ```
- **What Google Sees Instead**: Google falls back to your crafted meta description and static HTML reference tables, forcing the user to click into the tool to calculate their specific drink and bedtime.

### Rule 3: The 155-Character Actionable Meta Description Formula

Every meta description on a calculator or schedule page must include:

1. **The exact user pain point**
2. **A concrete metric or calculation parameter**
3. **A clear CTA indicating interactivity**

- _Example for Caffeine Calculator_:
  > _"Had a coffee at 2 PM? Calculate exactly how much active caffeine remains in your system at bedtime. Enter your drink, time, and metabolism rate."_
- _Example for Sleep Debt Calculator_:
  > _"Calculate your exact sleep deficit over the last 5 nights. See how many hours you owe and how to recover without causing Sunday night insomnia."_

---

## 6. Technical Architecture for the 3 Winning Page Formats

### Format A: Interactive Calculator Template (`/tools/*`)

1. **Sticky Header**: `ContentNav` with Brand Logo + compact `[Apple] Get the app` CTA.
2. **Breadcrumb Trail**: Semantic `<nav aria-label="Breadcrumb">` with `Home > Tools > [Calculator Name]` + `BreadcrumbList` schema.
3. **Interactive Widget (Above the Fold)**: React client component with instant visual feedback, slider inputs, and local calculations.
4. **Static HTML Reference Table (Below the Fold)**:
   - Always provide a clean, static HTML table (e.g., _Hour-by-Hour Caffeine Decay for 100mg, 150mg, 200mg_) so Google's crawler indexes concrete numbers immediately without waiting for JS execution.
5. **Methodology & Scientific References**: 300–500 words explaining the biological math (e.g., _CYP1A2 liver enzyme kinetics_, _half-life variation of 3–7 hours_). Citing peer-reviewed studies (e.g., _Depner et al. 2019_) establishes E-E-A-T without making medical diagnosis claims.
6. **FAQ Accordion with Schema**: 3–5 high-intent questions marked up with `FAQPage` schema.
7. **Calculative App Callout Banner**: Demonstrates how ARC automates this calculation daily on iPhone.

### Format B: Chronotype & Schedule Page Template (`/chronotype/*`)

1. **Clock-Time Hero Header**: Highlighting the chronotype's biological peak window and target bedtime.
2. **12-Row Hour-by-Hour Schedule Table**:
   - Time intervals from `7:00 AM` to `11:30 PM`.
   - Columns: `Time`, `Biological Phase`, `Optimal Activity` (e.g., _Deep Work_, _Last Coffee_, _Workout_, _Melatonin Window_).
3. **Embedded Schedule Customizer**: Interactive tool allowing users to adjust the schedule to their real-life wake-up time.
4. **Constraint-Specific Links**: Linking directly to companion pages (e.g., _Wolf working a corporate 9-to-5_, _Couples compatibility_).
5. **App Store Conversion Bridge**: Explaining how ARC detects and recalculates these circadian windows in real time from local iPhone health data.

### Format C: Bottom-of-Funnel App Comparison Template (`/blog/*-vs-arc*`)

1. **Direct Head-to-Head Comparison Table**:
   - Compare ARC vs. Competitor (e.g., _Rise_, _Whoop_, _Oura_, _Timeshifter_) across: _Hardware Required_, _Price/Subscription Model_, _Privacy / Local-First_, _Caffeine Cutoff Engine_, _Dynamic Island Widget Support_.
2. **"Why Competitor X Falls Short"**: Honest, non-biased breakdown of the competitor's strengths and primary user complaints (e.g., high subscription costs, battery drain, generic sleep advice).
3. **"Where ARC Excels"**: Highlighting ARC's unique differentiators: 100% on-device SQLite, zero account required, real-time caffeine decay recalculation, and Living Light themes.
4. **Direct App Store Download CTA**: Above-the-fold and bottom sticky triggers.

---

## 7. Schema.org (JSON-LD) Deployment Standard

Every page must contain valid JSON-LD structured data matching Google's latest documentation:

| Page Type                   | Required Schemas                     | Purpose                                                                                                              |
| :-------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **All Deep Pages**          | `BreadcrumbList`                     | Generates rich hierarchical breadcrumbs in Google Search results (`arccircadian.com > Tools > Caffeine Calculator`). |
| **Tool / Calculator Pages** | `WebApplication` + `FAQPage`         | Informs Google that the URL is a free utility software, bypassing blog/article medical filters.                      |
| **Chronotype Pages**        | `WebPage` + `FAQPage` + `Table`      | Generates expandable FAQ rich snippets and structured schedule answers in search results.                            |
| **Comparison Articles**     | `Article` + `Product` / `Review`     | Provides author, date, and product review attributes for rich article snippets.                                      |
| **Entire Site**             | `SoftwareApplication` (Organization) | Establishes ARC as an iOS application product on the App Store.                                                      |

---

## 8. Internal Linking & PageRank Silo Architecture

Google ranks pages based on internal link authority (PageRank). To maximize search rankings:

```
                  [ Homepage: arccircadian.com ]
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
   [ /tools ]          [ /chronotype ]         [ /blog ]
        │                    │                    │
  ┌─────┴─────┐        ┌─────┴─────┐        ┌─────┴─────┐
  ▼           ▼        ▼           ▼        ▼           ▼
[Tool Hub] [Child]  [Lion/Wolf] [Pairings] [App Comparison]
```

1. **Hubs Link to Children**: `/tools` links to all calculators and drink child pages.
2. **Children Link Back to Hubs**: Every tool page includes a breadcrumb pointing back to `/tools` and related tool cards.
3. **Cross-Silo Bridges**:
   - Every chronotype schedule links to `/tools/caffeine-calculator` and `/tools/sunlight-calculator`.
   - Every caffeine drink page links back to `/tools/caffeine-calculator`.
   - Comparison blogs link directly to relevant tools to give readers immediate utility before downloading the app.
4. **Anchor Text Strictness**: Never use generic anchor text like _"click here"_ or _"learn more"_. Always use exact target keywords:
   - ✅ `caffeine cutoff calculator`
   - ✅ `Wolf chronotype 9-to-5 schedule`
   - ✅ `morning sunlight lux calculator`

---

## 9. Title Tag & Meta Description Swipe File

```markdown
<!-- /tools/caffeine-calculator -->

Title: Caffeine Half-Life Calculator: When Will Your Coffee Clear?
Meta: Calculate exactly how much active caffeine remains in your bloodstream at bedtime. Enter your coffee, energy drink, or tea to prevent sleep disruption.

<!-- /chronotype/wolf -->

Title: Wolf Chronotype Schedule: Sleep at 12:00 AM, Peak at 5:00 PM
Meta: Complete hour-by-hour daily routine for the Wolf chronotype. Science-backed timing for deep work, last coffee cutoff, exercise, and natural melatonin release.

<!-- /chronotype/bear -->

Title: Bear Chronotype Daily Schedule: Wake at 7:00 AM, Peak at 10:00 AM
Meta: The optimal hour-by-hour circadian routine for the Bear chronotype (55% of people). Sync your work, meals, caffeine cutoff, and bedtime with the solar cycle.

<!-- /tools/sleep-debt-calculator -->

Title: Sleep Debt Calculator: How Much Sleep Do You Owe?
Meta: Calculate your exact sleep deficit over the last five nights. See how many hours you owe and discover how to recover without triggering Sunday night insomnia.

<!-- /tools/sunlight-calculator -->

Title: Morning Sunlight Calculator: Optimal Lux Timing for Your Wake Time
Meta: Find your personalized morning light window based on your wake-up time and cloud cover. Anchor your circadian rhythm and trigger evening melatonin naturally.

<!-- /blog/best-circadian-rhythm-apps-2026 -->

Title: 5 Best Circadian Rhythm & Sleep Tracker Apps in 2026
Meta: Compare the top circadian rhythm and body clock apps for iPhone. See how ARC, Rise, and Timeshifter stack up on privacy, widgets, and biological accuracy.
```

---

## 10. Programmatic Child Page Safeguards (Anti-Thin-Content & Cannibalization)

1. **The 40% Unique Body Rule**:
   - Every programmatic page must contain at least 40% unique content that does not appear anywhere else on the site.
   - For drink pages: unique milligram doses, real ingredient profiles (e.g. green tea catechins vs synthetic anhydrous caffeine), serving sizes, brand-specific FAQs, and custom cutoff time callouts.
   - For bedtime pages: unique 4-cycle, 5-cycle, and 6-cycle calculation tables with tailored chronotype advice based on the time band (early vs typical vs late).
2. **Self-Referential Canonicalization**:
   - Each programmatic page that targets distinct search intent (e.g., `"how long does celsius stay in your system"`) must have a self-referential canonical tag:
     ```html
     <link
       rel="canonical"
       href="https://arccircadian.com/tools/caffeine-calculator/celsius-200mg"
     />
     ```
3. **Static Pre-Rendering (SSG)**:
   - Every programmatic route must export `generateStaticParams()` to ensure Google receives pre-rendered static HTML rather than client-rendered loading states.

---

## 11. Search Console Monitoring & "Strike Zone" Protocol

### Identifying "Strike Zone" Keywords (High Impressions, Low CTR, Position 4–10)

- **Filters**: Filter by _Position: Greater than 3.9_ and _Position: Smaller than 10.1_. Sort by _Impressions_.
- **Diagnosis**: Google already considers your page relevant enough for Page 1, but users are choosing results #1–#3 because their titles and snippets are more compelling.
- **Action**:
  1. Rewrite the Title tag to include numbers, clock times, or brackets (e.g., `[2026 Calculator]`).
  2. Add an internal link from the homepage or highest-authority tool page directly to this URL using the exact query as anchor text.
  3. Re-inspect and request indexing.

---

## 12. Conversion Tracking: From Search Impressions to App Store Installs

SEO traffic is only valuable if it drives iOS app downloads:

| Page Location           | Component                             | Primary Goal                                                                  | Target Conversion               |
| :---------------------- | :------------------------------------ | :---------------------------------------------------------------------------- | :------------------------------ |
| **Fixed Sticky Top**    | `ContentNav` (`[Apple] Get the app`)  | Persistent visual reminder across the entire reading experience.              | 0.8% – 1.2% CTR                 |
| **Interactive Results** | Tool Result Bridge (`AppStoreButton`) | "ARC automates this calculation in your Lock Screen & Dynamic Island."        | 2.5% – 5.0% CTR                 |
| **Mid-Page Callout**    | `CalculativeAppCallout`               | Feature callout highlighting local-first SQLite and automatic bedtime alerts. | 1.0% – 2.0% CTR                 |
| **Android Fallback**    | `useIsAndroid()`                      | Seamless redirect to free web tools instead of broken App Store links.        | Retains 100% of non-iOS traffic |
