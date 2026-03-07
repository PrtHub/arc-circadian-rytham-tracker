# ARC: Circadian Rhythm Tracker — Landing Page

Marketing landing page for [ARC](https://arcapp.sbs), an iOS app that syncs your schedule with your biology using chronobiology science.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **TypeScript**
- Deployed on **Vercel**

## Getting Started

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  layout.tsx          # Global metadata, fonts
  page.tsx            # Page composition
  opengraph-image.tsx # Dynamic OG image (1200×630)
  sitemap.ts          # /sitemap.xml
  robots.ts           # /robots.txt

components/
  arc-data.ts         # All content data + JSON-LD schemas
  Nav.tsx
  Hero.tsx
  SocialProof.tsx
  Screenshots.tsx
  PhoneFrame.tsx      # iPhone 16 mockup
  Features.tsx
  HowItWorks.tsx
  Chronotypes.tsx
  Highlights.tsx
  Science.tsx
  Audience.tsx
  Pricing.tsx
  Faq.tsx
  FinalCta.tsx
  Footer.tsx
  AppStoreButton.tsx

public/
  01.png – 08.png     # App Store screenshots
```

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL=https://arcapp.sbs
```

Defaults to `https://arcapp.sbs` if not set.

## App Store

[Download ARC on the App Store](https://apps.apple.com/us/app/arc-circadian-rhythm-tracker/id6758214892)
