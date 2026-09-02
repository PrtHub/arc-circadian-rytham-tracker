import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { CircadianThemeProvider } from "@/components/CircadianThemeProvider";
import { FloatingSupport } from "@/components/FloatingSupport";
import { MixpanelTracker } from "@/components/MixpanelTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "ARC: Circadian Rhythm Tracker — Sync Your Biology, Peak Every Day",
    template: "%s | ARC Circadian Rhythm Tracker",
  },

  description:
    "Stop fighting your biology. ARC maps your Perfect Day using chronobiology. Discover your chronotype (Lion, Bear, Wolf, or Dolphin), find Peak Focus Windows, optimize caffeine cutoff, and anchor your sleep-wake cycle. Science-backed, privacy-first iOS app.",

  keywords:
    "circadian rhythm tracker, chronotype test, chronotype quiz, sleep optimization, peak focus windows, caffeine timing, biohacking app, iOS health app, chronobiology, circadian rhythm app, lion chronotype, bear chronotype, wolf chronotype, dolphin chronotype, sleep science, cortisol rhythm, melatonin optimization, adenosine, Huberman, sleep tracker, circadian clock",

  applicationName: "ARC: Circadian Rhythm Tracker",
  authors: [{ name: "Pritam", url: "mailto:pritamfinds@gmail.com" }],
  creator: "Pritam",
  publisher: "ARC",
  category: "Health & Fitness",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "ARC: Circadian Rhythm Tracker — Sync Your Biology, Peak Every Day",
    description:
      "Discover your chronotype and unlock peak performance. 201+ downloads. Built on Stanford & UC Berkeley sleep science. Privacy-first, local-only data.",
    siteName: "ARC: Circadian Rhythm Tracker",
    url: SITE_URL,
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ARC: Circadian Rhythm Tracker",
    description:
      "201+ downloads. Discover your chronotype. Find Peak Focus Windows. Optimize caffeine timing. Science-backed iOS app.",
    creator: "@pritamfinds",
  },

  appleWebApp: {
    title: "ARC",
    statusBarStyle: "black-translucent",
    capable: true,
  },

  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.png" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon-tinted.png" },
    ],
    shortcut: "/icon-dark.png",
    apple: [
      { url: "/icon.png" },
      { url: "/icon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  verification: {
    google: "449Ube5J9JufizV9AJmYfoLHV7TbE7aqryFLe9f_aF0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-phase="dip" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = new Date();
                  var m = d.getHours() * 60 + d.getMinutes();
                  var p = "night";
                  if (m >= 330 && m < 450) p = "rise";
                  else if (m >= 450 && m < 630) p = "morning";
                  else if (m >= 630 && m < 810) p = "peak";
                  else if (m >= 810 && m < 990) p = "dip";
                  else if (m >= 990 && m < 1260) p = "evening";
                  else if (m >= 1260 && m < 1380) p = "windDown";
                  document.documentElement.setAttribute("data-phase", p);
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-W4X6F2Z5HG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-W4X6F2Z5HG');
          `}
        </Script>
      </head>
      <body className="antialiased">
        {children}
        <CircadianThemeProvider />
        <FloatingSupport />
        <MixpanelTracker />
      </body>
    </html>
  );
}
