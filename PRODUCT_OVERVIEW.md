# ARC 2.0 — Product Overview

What the app is, what a person actually experiences using it, and what changed in
the 2.0 rebuild.

Two neighbouring documents exist and this one does not repeat them:
[`app_features.md`](app_features.md) is the code-anchored engineering inventory —
every constant, every file, every edge case. [`docs/V2-SPEC.md`](docs/V2-SPEC.md)
is the plan written _before_ the rebuild, kept for the reasoning. This document is
the product: the shape of it, and why it has that shape.

**Status:** 1.8.0 is live on the App Store with paying weekly and annual
subscribers. 2.0.0 is the unreleased rebuild on `chore/expo-sdk-57`.

---

## 1. The one job

ARC answers one question:

> **Why do I feel like this right now, and what is the one thing worth doing
> about it?**

And then, over weeks, it proves the answer was right.

That second half is the product. Anyone can print a fact about circadian rhythm.
The reason to keep the app after week one is that it tells you your afternoon
crashes went from three and a half a week to one — measured, from your own
check-ins, not asserted.

Everything runs on device. No account, no login, no server holding anything.

---

## 2. Who it is for

Someone who is not ill, not an athlete, and not tracking anything — but who
crashes at 3pm most days, suspects their coffee is involved, and has never had a
reason to believe any particular explanation.

They are not looking for a sleep tracker. They already know roughly how they
slept. What they lack is a **model** of their own day, and a reason to trust it.

That framing rules a lot out. It is why there is no sleep score, no ring, no
streak, no badge, and no wearable integration.

---

## 3. What 2.0 changes

1.8 was an information product. It had an **Intel tab** — fifteen articles on
light, caffeine, sleep and protocols — plus a daily briefing. It told users true
things about circadian rhythm.

The problem is that reading true things is a week-one activity. Once you have read
the article on light anchoring, you have read it. There was no reason for day
thirty to be different from day two.

2.0 inverts that. The app no longer explains circadian rhythm in general; it
explains **today**, in one sentence, using this person's own numbers, and then
asks for one thing. The articles are gone. The claims are now measured rather than
stated.

|                 | 1.8                              | 2.0                                                                                      |
| --------------- | -------------------------------- | ---------------------------------------------------------------------------------------- |
| Core surface    | Daily briefing + article library | One sentence, one action                                                                 |
| Caffeine advice | `wake + 8h`, a fixed constant    | Computed from bedtime, sensitivity, and everything drunk today                           |
| Light advice    | "Get morning light"              | Real sunrise for the device's time zone, with an indoor fallback when the window is dark |
| Proof           | None                             | Crash rate, dip timing, adherence — from the user's own check-ins                        |
| Month two       | Same as month one                | Five event loops that fire on things you could not have worked out yourself              |
| Tabs            | Today, Intel, Trends, more       | Two. Everything else is a sheet                                                          |

The cost of that inversion is real and is recorded in §10.

---

## 4. A day in the app

**On waking.** The screen is a gradient keyed to the user's biological phase, so
it reads as the time of _their_ day before a word is read. One sentence at the
top: _"You're in your light window. Twenty minutes outside now sets up your whole
day."_ One action under it: **Get 20 min of light**. Tapping it starts a timer
that also runs as a Live Activity on the lock screen and in the Dynamic Island, so
the phone can go in a pocket.

**Mid-morning.** The phase has moved to **peak**. The sentence changes to say
these are the hours worth protecting, and the action becomes _start your hardest
task_ — or, if there is nothing to protect, it steps aside.

**First coffee.** Logged in one tap with a drink type. The **last safe coffee**
time — the most prominent number in the app after the sentence — moves
immediately, and the caffeine curve under it redraws with the real decay.

**2:40pm.** The dip. _"You're 40 minutes into your afternoon dip. This is
adenosine, not laziness."_ The action is **move for five minutes**, not another
coffee, and the reason is one tap away under **Why this works**.

**Evening.** The cutoff has passed. The sentence says melatonin is rising and, if
there is still caffeine on board, names the milligrams and says plainly that this
is what keeps people staring at the ceiling.

**Once a month.** A full-screen takeover with the payoff: the crash rate, then
versus now.

---

## 5. The look — "Living Light"

The visual identity is not decoration around the content; it _is_ one of the
answers. Before a word is read, the screen already says what time of the user's
day it is.

### 5.1 The ground

A full-bleed three-stop vertical gradient, one palette per phase — seven of them,
from `night`'s deep indigo through `rise`, `morning`, `peak`, `dip` and `evening`
to `windDown`. It is keyed to the **biological** phase rather than the clock, so a
wolf's 8am and a lion's 8am render as different skies.

Each palette is three gradient stops listed top to bottom, plus the three
foreground colours guaranteed to sit on it. Source of truth is
[`constants/tokens.js`](constants/tokens.js) — these are copied from it, not
approximated.

| Phase        | Top       | Middle    | Bottom    | `fg`      | `fgMuted` | `accent`  |
| ------------ | --------- | --------- | --------- | --------- | --------- | --------- |
| **night**    | `#070A18` | `#0E1430` | `#131936` | `#C8CCE6` | `#7E86AE` | `#9FA6D8` |
| **rise**     | `#1A1C3A` | `#4A3352` | `#7C4722` | `#FDF6EC` | `#E2CBB4` | `#FFD9A0` |
| **morning**  | `#12203E` | `#22405F` | `#355E78` | `#F4F9FC` | `#C4DAE7` | `#FFD9A0` |
| **peak**     | `#0D1B2E` | `#173248` | `#2E5C76` | `#F6FAFD` | `#C2D7E4` | `#FFE0A8` |
| **dip**      | `#221D30` | `#432F43` | `#6B4536` | `#FBEFE6` | `#DCC0AE` | `#FFC48A` |
| **evening**  | `#1C2140` | `#3D3050` | `#7A4820` | `#FDF3E7` | `#E5CBB0` | `#FFD9A0` |
| **windDown** | `#0E1128` | `#221A3A` | `#3D263E` | `#E8DFEC` | `#A594AE` | `#E3B08C` |

It moves. Over the last **20%** of each phase the ground cross-fades into the next
phase's palette across **1,200 ms**, so the surface is never quite the same twice
and never permanently mid-transition either — holding each phase's own colour for
the first 80% is what keeps it identifiable. Reduce Motion is respected: the blend
still resolves, it just doesn't animate.

Two layers sit on top of the gradient, and both exist to fix something specific:

- **Grain.** A three-stop ramp is mathematically smooth, and a smooth ramp across
  850 points _bands_ visibly on an OLED panel — you can count the steps. That
  banding is most of the reason generated dark-gradient apps look generated.
  Tiled film grain breaks the ramp into noise and it disappears.
- **A vignette.** The gradient runs top to bottom only, which leaves the corners
  exactly as bright as the middle and the whole surface reading flat. Darkening
  the edges gives the ground a centre, and therefore a subject.

Built on `react-native-svg` rather than a native gradient module, deliberately:
adding a native dependency would force a new build and cut off over-the-air
delivery to users still on 1.8.

**How to rebuild it on the web.** The three stops are not evenly spaced — the
middle sits at 55%, which is what stops the darker top half being crushed — and
the two overlays go on in this order:

```css
/* 1. the ground: dip, exactly as the app renders it */
background: linear-gradient(180deg, #221d30 0%, #432f43 55%, #6b4536 100%);

/* 2. the grain, tiled over it at 0.5 opacity.
      128 x 128 px of seeded noise: ~42% of pixels marked, alpha capped at
      22/255, both white AND black specks — a single grey tile can only wash
      the ground out. See scripts/make-grain.js. */
background-image: url("grain.png");
background-repeat: repeat;
opacity: 0.5;

/* 3. the vignette, as its own layer on top */
background: radial-gradient(
  78% 78% at 50% 42%,
  rgba(0, 0, 0, 0) 55%,
  rgba(0, 0, 0, 0.28) 100%
);
```

One thing to carry over: keep the gradient fixed to the viewport rather than to
the document. On a long page a document-height gradient puts the lightest stop
somewhere in the middle of the scroll, and the identity stops reading as a sky.

### 5.2 The material

There is now one material, composed by a single `Surface` component. Before
there were sixteen — translucent white at .05, .06, .07, .08, .09, .10, .12, .13,
.14, .16, .17, .18, .20, .22 and .25, each one a separate guess, alongside
fourteen corner radii and, in the entire codebase, not one shadow. One flat wash
over a gradient, sixteen times, is what makes an app read as generated rather
than designed.

Four named surfaces replace them, chosen by role rather than by alpha:

| Surface    | For                                                                      |
| ---------- | ------------------------------------------------------------------------ |
| **raised** | Sits above the ground — the action, log rows, the moment badge           |
| **sunken** | Recedes into it — Trends panels, read-only blocks                        |
| **accent** | The one emphasised thing on a screen, tinted from the live phase palette |
| **chrome** | Floating OS-like furniture — the tab bar, over a blur                    |

With their exact values:

| Surface    | Fill                          | Border                        | Specular                 | Elevation |
| ---------- | ----------------------------- | ----------------------------- | ------------------------ | --------- |
| **raised** | `rgba(255,255,255,0.055)`     | `rgba(255,255,255,0.10)`      | `rgba(255,255,255,0.20)` | 2         |
| **sunken** | `rgba(0,0,0,0.14)`            | `rgba(255,255,255,0.055)`     | none                     | 0         |
| **accent** | the phase `accent`, low alpha | the phase `accent`, low alpha | `rgba(255,255,255,0.24)` | 2         |
| **chrome** | `rgba(255,255,255,0.06)`      | `rgba(255,255,255,0.12)`      | `rgba(255,255,255,0.18)` | 3         |

The border is always a hairline — a true one device pixel, not 1pt.

**The depth model is the edge, not the shadow.** On a near-black ground a drop
shadow is almost invisible, so what actually reads as depth is how light catches
an edge. Light falls from above, so every raised surface carries a _specular_ —
one bright hairline drawn inside its top edge — inset by the corner radius so it
stops before the curve begins, because run edge to edge it clips into the corners
and reads as a seam. The shadow is still there, at a wide radius and low opacity,
but its job is separation from the ground rather than being noticed.

Underneath: four elevation levels with real shadows tuned for a dark ground,
where the job is separation rather than drama — a wide radius at low opacity lifts
a card without leaving a visible grey halo. Level 0 exists so a surface can opt out
by name rather than by omission.

| Level | Colour    | Opacity | Radius | Offset | CSS equivalent                 |
| ----- | --------- | ------- | ------ | ------ | ------------------------------ |
| **0** | —         | 0       | 0      | 0, 0   | `none`                         |
| **1** | `#000000` | 0.20    | 8      | 0, 2   | `0 2px 8px rgba(0,0,0,0.20)`   |
| **2** | `#000000` | 0.30    | 20     | 0, 8   | `0 8px 20px rgba(0,0,0,0.30)`  |
| **3** | `#000000` | 0.38    | 30     | 0, 12  | `0 12px 30px rgba(0,0,0,0.38)` |

And a five-step radius scale, each tied to the size of the thing it wraps:

| Token  | Value | For                                  |
| ------ | ----- | ------------------------------------ |
| `xs`   | 8     | Dots, chips, the curve's own corners |
| `sm`   | 14    | Inline rows and buttons              |
| `md`   | 22    | Cards and panels                     |
| `lg`   | 34    | Sheets and takeovers                 |
| `pill` | 999   | Fully rounded                        |

The 2.0 components previously reached for 12, 13, 14, 15, 16, 18, 20, 22 and 29
inline: differences of a single point, invisible alone and collectively proof that
nothing had been decided. The older 1.x ramp — 24, 30, 32, 36, 40 — is still
referenced by the Tailwind classes and coexists with it.

### 5.3 The brand palette, and where it is _not_ used

Separate from the phase gradients, and worth understanding before putting it on a
website: **each brand colour maps to a protocol domain, not to a mood.** They are
identifiers, not decoration.

| Token        | Hex       | Means                                            |
| ------------ | --------- | ------------------------------------------------ |
| `aura.green` | `#CCFF00` | Bio-green — primary brand, "you are on protocol" |
| `aura.sun`   | `#FFAA00` | Solar amber — sunlight, light exposure           |
| `aura.crash` | `#FF4500` | Crash orange — caffeine and its decay            |
| `aura.sleep` | `#7B61FF` | Deep ether — sleep and wind-down                 |
| `aura.ice`   | `#00D1FF` | Ice blue — movement                              |

`#CCFF00` is the closest thing ARC has to a logo colour. Note that the app's own
screens use it sparingly — on a phase gradient the emphasis colour is the
palette's own `accent`, not the brand green — so a landing page leaning hard on it
will read as _more_ branded than the product itself. That may be the right call for
a website; it is a deliberate divergence either way.

**Neutrals** — a dark-to-light ramp, so it indexes like a normal scale:

|           |           |           |           |           |           |           |           |           |           |           |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| `900`     | `850`     | `800`     | `700`     | `600`     | `500`     | `400`     | `300`     | `200`     | `100`     | `50`      |
| `#050505` | `#0A0A0B` | `#121212` | `#18181B` | `#27272A` | `#3F3F46` | `#52525B` | `#71717A` | `#A1A1AA` | `#D4D4D8` | `#F2F2F2` |

Text roles resolve from that ramp: primary `#F2F2F2`, secondary `#A1A1AA`, muted
`#71717A`, and `onAccent` `#050505` for text sitting on a filled brand colour.

**Semantic signals**, kept deliberately distinct from the brand palette —
`danger` is "something is wrong", where `aura.crash` is just the caffeine domain:

| `danger`  | `warning` | `success` | `info`    |
| --------- | --------- | --------- | --------- |
| `#FF3B30` | `#FFAA00` | `#CCFF00` | `#7B61FF` |

**Translucent overlays**, for anything layered on the neutral ramp rather than on
a gradient: surface `rgba(255,255,255,0.05)`, surface-strong
`rgba(255,255,255,0.10)`, border `rgba(255,255,255,0.05)`, border-strong
`rgba(255,255,255,0.10)`, scrim `rgba(0,0,0,0.60)`.

### 5.4 Type

**Instrument Serif** is the display face, and it is used for exactly two things:
the daily sentence and the cutoff time — the two things the Today screen is built
around. High-contrast and quiet at large sizes, which is what a calm surface
needs, and unusual enough in this category to be recognisable. Everything
operational stays system sans.

Single weight by design. The family ships Regular and Italic only, so hierarchy
comes from size and colour rather than from weight.

On the web: `Instrument Serif` is on Google Fonts, so
`https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1` with a
`Georgia, serif` fallback. The operational face is deliberately the system UI
stack — the app declares `System, -apple-system, Roboto, sans-serif` and loads no
sans of its own.

The size ramp, given names so hierarchy is a decision rather than a per-file
guess:

| Token      | pt  | Token      | pt  |
| ---------- | --- | ---------- | --- |
| `micro`    | 10  | `callout`  | 16  |
| `caption`  | 11  | `title`    | 20  |
| `footnote` | 12  | `headline` | 24  |
| `body`     | 14  | `display`  | 32  |
|            |     | `hero`     | 44  |

Tracking is stored as **em fractions and resolved at render**, because React
Native's `letterSpacing` is in points and a value that suits a 10pt label ruins a
66pt number. On the web this is simply `em`, so the values transfer directly:

| Role                             | Tracking   |
| -------------------------------- | ---------- |
| `hero`                           | `-0.03em`  |
| `display`                        | `-0.022em` |
| `title`                          | `-0.015em` |
| `body`                           | `-0.005em` |
| `label`                          | `+0.06em`  |
| eyebrow (uppercase micro-labels) | `+0.25em`  |

Display sizes get negative tracking — at 33pt and up the default reads loose — and
labels get a little positive. Note the gap between `label` at 0.06 and the
uppercase `eyebrow` at 0.25: the latter is only ever used on 10pt all-caps
micro-labels, where it works, and applying it anywhere larger turns a word into a
texture.

### 5.5 The chronotype reveal

One screen breaks the rule. At the reveal in onboarding — the emotional peak of
the flow — the ground stops being the current time of day and becomes the time of
day the user _is_. A lion gets dawn, a wolf gets deep night. It is the only moment
the app hands the whole screen over to a single idea, which is why that colour
appears nowhere else.

Same shape as the phase palettes, and held to the same contrast floor:

| Chronotype               | Top       | Middle    | Bottom    | `fg`      | `fgMuted` | `accent`  |
| ------------------------ | --------- | --------- | --------- | --------- | --------- | --------- |
| **lion** — dawn          | `#191C3C` | `#4A3350` | `#7C4722` | `#FDF6EC` | `#E2CBB4` | `#FFC978` |
| **bear** — daylight      | `#101E30` | `#1E3C48` | `#3B6146` | `#F3FAF4` | `#C2DCC8` | `#B9E88A` |
| **wolf** — deep night    | `#0B0E22` | `#1E1940` | `#3B2A57` | `#EDE8F6` | `#B0A2C4` | `#B9A0F0` |
| **dolphin** — cold water | `#081A26` | `#123243` | `#1D5063` | `#EFFAFE` | `#B6D5E2` | `#7FD8F0` |

These are worth knowing for a landing page even though they appear on one screen:
they are the only place ARC assigns a colour to a _person_ rather than to a time,
which makes them the natural palette for anything segmented by chronotype — a
quiz, a comparison table, four testimonial cards.

### 5.6 Contrast is a gate, not a preference

The risk with a gradient this dark and this varied is text that cannot be read on
some phases at some times. So it is enforced at build time rather than reviewed by
eye: **33 checks** — eleven palettes (seven phases plus the four chronotype skies)
against three foreground roles each — held to WCAG AA, 4.5:1 for text and 3:1 for
the accent. Below that, the build fails and names the phase.

Every phase currently clears AA with no scrim, which is why content sits directly
on the ground with nothing between it and the colour. The measured ratios, each
against the lightest stop of its own gradient — the worst case:

| Palette          | Tested against | `fg`  | `fgMuted` | `accent` |
| ---------------- | -------------- | ----- | --------- | -------- |
| night            | `#131936`      | 10.85 | 4.84      | 7.31     |
| rise             | `#7C4722`      | 7.04  | 4.83      | 5.64     |
| morning          | `#355E78`      | 6.55  | 4.81      | 5.19     |
| peak             | `#2E5C76`      | 6.88  | 4.86      | 5.67     |
| dip              | `#6B4536`      | 7.35  | 4.82      | 5.34     |
| evening          | `#7A4820`      | 6.90  | 4.86      | 5.65     |
| windDown         | `#3D263E`      | 10.48 | 4.82      | 7.02     |
| reveal · lion    | `#7C4722`      | 7.04  | 4.83      | 4.99     |
| reveal · bear    | `#3B6146`      | 6.63  | 4.81      | 5.02     |
| reveal · wolf    | `#3B2A57`      | 10.56 | 5.32      | 5.65     |
| reveal · dolphin | `#1D5063`      | 8.31  | 5.72      | 5.46     |

Two things to carry to the web. **`fgMuted` has almost no headroom** — every phase
lands between 4.81 and 5.72 against a 4.5 floor, so darkening it even slightly, or
putting it on a lighter ground than the app's, drops it below AA. And the ratios
above are the _worst case within each gradient_; text over the darker top half is
considerably safer, which is why the app's own copy sits high on the screen.

### 5.7 It carries off the app

Widgets receive the palette inside their data snapshot, so a home screen widget
shows the user's own phase gradient without a second copy of the phase engine
living in the widget runtime. The lock-screen accessory family drops colour
entirely, by design — a lock screen is monochrome.

### 5.8 The whole set, as CSS

Everything above in one block. Switch the ground by setting `data-phase` on the
root element; every phase-dependent colour follows from it.

```css
:root {
  /* neutrals — dark to light, indexes like a normal scale */
  --ink-900: #050505;
  --ink-850: #0a0a0b;
  --ink-800: #121212;
  --ink-700: #18181b;
  --ink-600: #27272a;
  --ink-500: #3f3f46;
  --ink-400: #52525b;
  --ink-300: #71717a;
  --ink-200: #a1a1aa;
  --ink-100: #d4d4d8;
  --ink-50: #f2f2f2;

  /* brand — each maps to a protocol domain, not a mood */
  --aura-green: #ccff00; /* primary brand, "on protocol" */
  --aura-sun: #ffaa00; /* sunlight */
  --aura-crash: #ff4500; /* caffeine and its decay */
  --aura-sleep: #7b61ff; /* sleep and wind-down */
  --aura-ice: #00d1ff; /* movement */

  /* semantic — deliberately distinct from the brand palette */
  --danger: #ff3b30;
  --warning: #ffaa00;
  --success: #ccff00;
  --info: #7b61ff;

  /* material */
  --raised-fill: rgba(255, 255, 255, 0.055);
  --raised-border: rgba(255, 255, 255, 0.1);
  --raised-specular: rgba(255, 255, 255, 0.2);
  --sunken-fill: rgba(0, 0, 0, 0.14);
  --sunken-border: rgba(255, 255, 255, 0.055);
  --chrome-fill: rgba(255, 255, 255, 0.06);
  --chrome-border: rgba(255, 255, 255, 0.12);
  --chrome-specular: rgba(255, 255, 255, 0.18);
  --scrim: rgba(0, 0, 0, 0.6);

  /* elevation */
  --e1: 0 2px 8px rgba(0, 0, 0, 0.2);
  --e2: 0 8px 20px rgba(0, 0, 0, 0.3);
  --e3: 0 12px 30px rgba(0, 0, 0, 0.38);

  /* radii */
  --r-xs: 8px;
  --r-sm: 14px;
  --r-md: 22px;
  --r-lg: 34px;
  --r-pill: 999px;

  /* type */
  --face-display: "Instrument Serif", Georgia, serif;
  --face-ui: System, -apple-system, Roboto, sans-serif;
  --tr-hero: -0.03em;
  --tr-display: -0.022em;
  --tr-title: -0.015em;
  --tr-body: -0.005em;
  --tr-label: 0.06em;
  --tr-eyebrow: 0.25em;
}

/* the seven phases */
[data-phase="night"] {
  --g-top: #070a18;
  --g-mid: #0e1430;
  --g-bot: #131936;
  --fg: #c8cce6;
  --fg-muted: #7e86ae;
  --accent: #9fa6d8;
}
[data-phase="rise"] {
  --g-top: #1a1c3a;
  --g-mid: #4a3352;
  --g-bot: #7c4722;
  --fg: #fdf6ec;
  --fg-muted: #e2cbb4;
  --accent: #ffd9a0;
}
[data-phase="morning"] {
  --g-top: #12203e;
  --g-mid: #22405f;
  --g-bot: #355e78;
  --fg: #f4f9fc;
  --fg-muted: #c4dae7;
  --accent: #ffd9a0;
}
[data-phase="peak"] {
  --g-top: #0d1b2e;
  --g-mid: #173248;
  --g-bot: #2e5c76;
  --fg: #f6fafd;
  --fg-muted: #c2d7e4;
  --accent: #ffe0a8;
}
[data-phase="dip"] {
  --g-top: #221d30;
  --g-mid: #432f43;
  --g-bot: #6b4536;
  --fg: #fbefe6;
  --fg-muted: #dcc0ae;
  --accent: #ffc48a;
}
[data-phase="evening"] {
  --g-top: #1c2140;
  --g-mid: #3d3050;
  --g-bot: #7a4820;
  --fg: #fdf3e7;
  --fg-muted: #e5cbb0;
  --accent: #ffd9a0;
}
[data-phase="windDown"] {
  --g-top: #0e1128;
  --g-mid: #221a3a;
  --g-bot: #3d263e;
  --fg: #e8dfec;
  --fg-muted: #a594ae;
  --accent: #e3b08c;
}

/* the four chronotype skies — reveal / segmentation only */
[data-sky="lion"] {
  --g-top: #191c3c;
  --g-mid: #4a3350;
  --g-bot: #7c4722;
  --fg: #fdf6ec;
  --fg-muted: #e2cbb4;
  --accent: #ffc978;
}
[data-sky="bear"] {
  --g-top: #101e30;
  --g-mid: #1e3c48;
  --g-bot: #3b6146;
  --fg: #f3faf4;
  --fg-muted: #c2dcc8;
  --accent: #b9e88a;
}
[data-sky="wolf"] {
  --g-top: #0b0e22;
  --g-mid: #1e1940;
  --g-bot: #3b2a57;
  --fg: #ede8f6;
  --fg-muted: #b0a2c4;
  --accent: #b9a0f0;
}
[data-sky="dolphin"] {
  --g-top: #081a26;
  --g-mid: #123243;
  --g-bot: #1d5063;
  --fg: #effafe;
  --fg-muted: #b6d5e2;
  --accent: #7fd8f0;
}

/* the ground */
body {
  background:
    radial-gradient(
      78% 78% at 50% 42%,
      rgba(0, 0, 0, 0) 55%,
      rgba(0, 0, 0, 0.28) 100%
    ),
    linear-gradient(
      180deg,
      var(--g-top) 0%,
      var(--g-mid) 55%,
      var(--g-bot) 100%
    );
  background-attachment: fixed;
  color: var(--fg);
}

/* one raised surface, with the specular edge that carries the depth */
.raised {
  position: relative;
  background: var(--raised-fill);
  border: 1px solid var(--raised-border);
  border-radius: var(--r-md);
  box-shadow: var(--e2);
}
.raised::before {
  /* inset by ~0.7 x radius so it stops before the curve */
  content: "";
  position: absolute;
  top: 0;
  left: 15px;
  right: 15px;
  height: 1px;
  background: var(--raised-specular);
}
```

Which phase the site should live in is a real decision, not a default. `dip` is
the product's thesis — the moment it exists for — and it is the warmest of the
seven. `night` and `windDown` are the two that read as premium and calm but say
almost nothing about energy. `rise` is the most optimistic.

The written marketing copy already exists too, if it's useful for the page: six
tested headlines in English and German live in
[`appstore/generator/frames.js`](appstore/generator/frames.js) — _"Predicts your
afternoon crash"_, _"Catches your wake time drifting later"_, _"Tracks your
crashes week by week"_, and so on.

---

## 6. What it does

### 6.1 The daily sentence

One line, the largest text on the screen. Every phase has a written fallback that
renders instantly and is always a complete, correct answer. A generated sentence —
written in the user's own numbers by a model — replaces it only once it arrives,
so the app is fully usable with no network.

The generated line has to _earn_ that slot. It is rejected, and the written line
kept, if it characterises the user ("your poor sleep quality", "your lack of light
anchoring"), cheers, runs long, or cites no number when the day had one to cite.
Those thresholds are taken from the written copy itself — and the written copy is
run through the same check to prove they are fair.

The voice is fixed by one line: **"This is adenosine, not laziness."** Mechanism,
never verdict. The app will name a rough night; it never implies fault.

### 6.2 The one action

Exactly one, resolved from phase and context. Eleven exist — get light, light
indoors, avoid light, start the hard task, protect the peak, move, dim the room,
stop caffeine, recover, rest, or simply _settled_ when nothing is owed.

Only ever one is shown, because a list is a decision and a decision at 7am is a
tax. It can be deferred with **Not now**, which snoozes it and lets the next-best
one surface; deferrals expire on their own.

### 6.3 The caffeine cutoff

The **last safe coffee** time, and the number most likely to be wrong if done
naively. It is computed from four inputs: bedtime, caffeine sensitivity, every
drink already logged today decayed to this minute, and the size of a realistic
next drink. The target is under 50 mg still circulating at bedtime.

So it is not an offset — it is _the latest time another coffee still clears_, and
it moves every time something is logged.

Three states, deliberately distinguished: **ahead**, with a countdown;
**passed**; and **exhausted** — no drink of any size fits before bed any more.
That third one is a different sentence, and printing an ordinary time there was a
real bug in an earlier version.

In 1.8 this was `wake + 8h`, which ignored bedtime, sensitivity and intake
entirely.

### 6.4 Morning light

The single biggest lever in the app, and the one most easily made absurd. ARC uses
the **real solar position** for the device's time zone rather than assuming
morning is bright.

- **No location permission, ever.** Coordinates are inferred from the time zone.
- The light window opens at **sunrise** when sunrise is later than waking —
  without which a Berlin user awake at 07:00 in December is sent out into an hour
  of darkness.
- When the window holds too little daylight to be worth it, the app says so and
  offers an indoor alternative instead of asking for something impossible.

The target is **20 minutes**, defined once and read by everything that states or
measures it — the action, the timer, the Live Activity, the adherence strip and
the Trends panel. It was previously four different numbers in four files, and a
user could tap a 10-minute ask, watch a timer open on `0/20`, and at ten minutes
be told the goal was met by one screen and not by another.

### 6.5 The five things it learns from

All logging is one tap.

| Input                            | What it moves                                                                        |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| **Coffee**                       | The cutoff and the curve, immediately                                                |
| **Light**                        | A live timer toward the day's target, mirrored to the lock screen                    |
| **Energy** — low / medium / high | The primary outcome metric; every Trends claim is built on it                        |
| **Wake time**                    | Guessed from first open, correctable in one tap; corrections beat guesses everywhere |
| **Sleep** — hours and quality    | What triggers recovery mode                                                          |

Everything writes to an append-only event log, and every log visibly moves
something on screen. Nothing is collected that the app does not then use.

### 6.6 Trends — the proof

The second and only other tab. Panels in priority order, each carrying its own
confidence flag so nothing claims more than it knows:

- **Today** — mg and light minutes so far, so day one is not an empty state
- **Current experiment** — the running one and its progress, or a proposal
- **Afternoon crashes** — per week, as a bar chart, with the trend
- **Your two levers** — 14-day dot strips for morning light and cutoff held
- **Your dip lands** — the median offset after waking, from real check-ins
- **Schedule drift** — whether the wake time is sliding

The point of this tab is not data. It is the sentence's receipt.

### 6.7 The event loops — why month two happens

A daily sentence goes stale. Being told something you could not plausibly have
worked out yourself does not. At most one of these is active at a time, each with
its own cooldown, in priority order:

1. **Recovery** — a real sleep debt against the user's own target, scaling to at
   most three days of triage. Changes the sentence, the action _and_ the cutoff,
   because caffeine here buys a few hours and puts them right back tomorrow.
2. **Travel / jet lag** — detected with no permission and no input, from the
   device's UTC offset changing on landing. Separates the wall clock, which jumps,
   from the body clock, which moves about an hour a day. Produces both a
   seek-light and an **avoid-light** window; the second is the half travellers
   never hear, and getting it backwards lengthens the trip.
3. **Daylight saving** — the only loop that fires _before_ the thing happens,
   because a clock change can be computed rather than detected. Warns the evening
   before and stays through the Sunday and Monday people actually feel. Silent in
   zones without DST with nothing to configure, and it reports the real shift, so
   the thirty-minute zones are not told "an hour".
4. **Schedule drift** — the median wake time over a fortnight against the
   fortnight before. Medians, so one early flight is not read as a lifestyle
   change.
5. **Seasonal light** — fires on where the sun actually is, not on how often the
   user logged. An earlier design watched for a drop in logged light days, which
   cannot tell "winter arrived" from "they stopped tapping the button", and would
   have handed a lapsing user their own disengagement back as a finding about the
   weather.

**Plus the monthly report.** At 28 observed days: the symptom, measured.

All six render as full-screen, dismissible takeovers — deliberately not a
notification and not a card, because this is the moment the subscription justifies
itself.

### 6.8 Off the app

**Widgets.** A Today widget (small, medium, and a lock-screen rectangular family)
and a caffeine cutoff widget (small, circular, inline). The Today widget leads with
the sentence on medium and the action on small; the cutoff is a narrow third
column, sized like it — an earlier version made the cutoff the whole widget, which
told everyone who saw the home screen that ARC was a caffeine timer.

They carry the user's own phase gradient, and they write a **timeline** rather than
a single frame, so the cutoff widget flips to its passed state at the right minute
even if the app has not been opened since morning.

**Live Activity.** The morning light timer runs on the lock screen and in the
Dynamic Island, so the phone can be put away while the user is actually outside.

**Notifications.** All locally scheduled, all localised, behind five user toggles —
morning, caffeine, energy, wind-down, extras — plus a dedicated set for night
shift work.

### 6.9 Onboarding

Twenty-two steps in six acts, ordered so the pain is named before the profile is
asked for, and the payoff lands before the paywall:

1. **Hook and pain** — hook, symptom, goal
2. **The profile** — wake, bedtime, work schedule, crash timing, peak
3. **First payoff** — an insight from what they just said, first coffee, sensitivity
4. **The caffeine reveal** — the number they were not expecting
5. **Diagnosis** — the mistake, identity, preview, notifications _(one-way from here)_
6. **Conversion** — testimonials, future self, risk reversal, paywall

Chronotype — **lion, bear, wolf, dolphin** — is set here, and it is not cosmetic:
it moves every phase boundary, so two users opening the app in the same minute can
be in different phases, with different actions and different gradients.

### 6.10 Subscription

RevenueCat behind a single entitlement, weekly and annual, with the annual price
shown per-week for comparison. Hard gate after onboarding, a separate gate for
lapsed users, and a win-back offer.

Every price, currency and trial claim is read from the live store product rather
than written into the app. An earlier build printed a hardcoded dollar amount above
a correctly localised rupee price, and advertised a seven-day trial as static text
in three places — an App Store review risk as well as a wrong promise.

---

## 7. The rules that produced all of this

Worth stating, because most of the decisions above follow from them.

- **One question, one answer, one action.** If a screen offers a choice, it has
  moved work onto the user.
- **Never ask for something impossible.** No "get morning light" in a dark
  December window; no cutoff time when no drink fits any more.
- **Measure the symptom, do not assert the mechanism.** The claim is "your crashes
  halved", not "light anchoring improves alertness".
- **Mechanism, never verdict.** The app will tell you that you slept badly. It will
  never tell you that you are doing badly.
- **Written copy is the floor.** Generated text is an upgrade that has to earn its
  slot; the app is complete without it.
- **The fewest permissions that work.** No location, no health data, no account.
  Location comes from the time zone; wake time comes from the app being opened.
- **On device by default.** Local SQLite, append-only, no sync, no server.
- **Corrections beat guesses**, everywhere. The app guesses the wake time, and a
  one-tap correction overrides it in every calculation that reads it.
- **The ground is the identity.** Every surface is translucent enough that the
  phase gradient still shows through it, because a card that hides the ground is
  a hole in the design.
- **Anything that could be a build-time check is one.** The light target, the
  contrast floor, the copy coverage, the sentence quality bar, the widget runtime
  boundary — each of those was a real bug first, and is now a gate that fails
  rather than a convention someone has to remember.

---

## 8. Deliberately not in the app

- **No sleep score, ring or grade.** A number out of 100 invites optimising the
  number.
- **No streaks or badges.** Breaking a streak is a reason to delete an app, and the
  product's voice refuses to congratulate in the first place.
- **No wearable or HealthKit integration.** It would raise the accuracy ceiling and
  cut the addressable market to people who own the hardware.
- **No social layer.**
- **No article library.** This is the 1.8 Intel tab, and its removal is the single
  biggest thing an existing user will notice — see below.

---

## 9. Platform and languages

- iOS, Expo SDK 57, New Architecture. Bundle `com.prhub.arc`, version 2.0.0.
- **English and German, complete** — 995 keys across five namespaces, including
  every widget string, every Live Activity string, and all 221 notification
  strings. Widget text is resolved in the app and handed to the widget, because the
  widget runtime has no access to the translation layer.
- 12/24-hour clock seeded from the **device** setting rather than hardcoded. It was
  previously fixed to 12-hour, so the German build read "1:47 PM" on its most
  prominent number until the user found the toggle.
- Neutral Latin American Spanish is under consideration.

**Correctness is checked rather than trusted:** 224 assertions over the pure
engines against synthetic histories — which is how travel, DST, drift and the
monthly report get verified without a month or a plane ticket — plus 1,186
localised key renders, and separate gates for widget-runtime safety, screen copy
coverage, and text contrast against every phase gradient.

---

## 10. Where it honestly stands

**Open product decisions**

- **The Intel tab.** Fifteen articles with German translations, plus a daily
  briefing, existed in 1.8 and have no replacement in 2.0. All of it was free, so
  nobody subscribed specifically for it — but it is a whole tab that vanishes for
  an existing paying user, and that is the kind of change that produces "where did
  my app go" reviews. Unresolved.
- **iPad.** `supportsTablet: true` shipped in 1.8 and cannot be withdrawn from a
  released bundle, so the 13-inch App Store screenshot slot is owed. The frames
  render, but there is no tablet layout behind them.

**Known technical gaps**

- The OpenRouter key used for the generated sentence is a public Expo env var,
  which means it is embedded in the bundle and extractable from a shipped build. It
  wants a proxy before release. The app degrades cleanly to written copy without
  it, so this is a cost exposure rather than a functional dependency.
- 16 outstanding React Compiler lint errors, six of them in the caffeine curve
  reading refs during render.
- Widget code compiles to Swift at build time and does not hot-reload, so widget
  changes need a full build to verify.
