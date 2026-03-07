import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
