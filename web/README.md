# arcapp.sbs home page

Built from the app, not written by hand.

```bash
node web/build.js            # web/dist/: index.html, og.png, icons
node web/build.js --check    # also full-page screenshots at 1440 px and 390 px
```

Upload everything in `web/dist/` to the site root, except `preview.html`, which is the same
page without the document shell (for previews that supply their own). `index.html` is
self-contained: styles, script, the app screens and the images are all inline. It loads
Instrument Serif from Google Fonts.

## What comes from where

| On the page | Source |
|---|---|
| Phones and pop-out cards | `appstore/generator/frames.js` screen functions, the same markup as the App Store screenshots |
| Phone styling | the generator's stylesheet, `appstore/generator/index.html` |
| Phase labels, cutoff label, chronotype names and blurbs, caffeine questions, drink names | `locales/en/*.json` |
| The coffee calculator | `lib/cutoff.ts` and `lib/caffeine.ts`, compiled into the page |
| Prices and "Save X%" | the paywall's fallback prices in `components/onboarding/Paywall.tsx` |
| Chronotype peak hours and shares | `CHRONO_PEAK` and `CHRONO_SHARE` in `components/onboarding/visuals.tsx` |
| Chronotype rules ("Usually up by 6:00 AM") | the wake-time table in `components/onboarding/steps.tsx` |
| Card colours | `constants/tokens.js` |

Marketing copy (headlines, the FAQ, the paragraphs under each moment) lives in
`web/src/page.html` and `BODY` in `build.js`.

## What the build refuses

- a string key that does not resolve, in the page or in any phone
- a phone whose status-bar clock differs from the time printed beside it
- a compiled cutoff engine that gives an implausible answer
- a page class that is also styled by the app screens, or one the page never styles
- any placeholder left unfilled

## Changing prices

Change the paywall fallbacks in `Paywall.tsx` and `SubscriptionGate.tsx` (`check-logic`
fails if they disagree), then rebuild. The page reads them from there.

## Seeing another hour

The hero's sky, sun and phone follow the visitor's local time. Add `?at=15:20` to the URL
to see any hour.
