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
    default: "ARC 2.0 Living Light — Circadian Rhythm Tracker & Chronotype App",
    template: "%s | ARC 2.0 Circadian Rhythm Tracker",
  },

  description:
    "Stop fighting your biology. ARC 2.0 Living Light maps your day around your chronotype. Dynamic caffeine cutoff, astronomical solar morning light Live Activity, and measured afternoon crash reduction on an on-device, local-first engine.",

  keywords: [
    "circadian rhythm tracker",
    "chronotype test",
    "chronotype quiz",
    "lion chronotype",
    "bear chronotype",
    "wolf chronotype",
    "dolphin chronotype",
    "caffeine cutoff calculator",
    "caffeine half life",
    "morning light timer",
    "adenosine sleep pressure",
    "afternoon crash cure",
    "sleep science app",
    "living light",
    "local first health app",
    "iOS circadian tracker",
    "Stanford sleep science",
    "Huberman morning light",
    "social jetlag calculator",
  ],

  applicationName: "ARC 2.0 Living Light",
  authors: [{ name: "Pritam", url: "mailto:pritamfinds@gmail.com" }],
  creator: "Pritam",
  publisher: "ARC",
  category: "Health & Fitness",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "ARC 2.0 Living Light — Circadian Rhythm Tracker & Chronotype App",
    description:
      "Stop fighting your body. Discover your chronotype, follow your dynamic daily plan, calculate your exact last safe coffee cutoff, and cut afternoon crashes in half.",
    siteName: "ARC: Circadian Rhythm Tracker",
    url: SITE_URL,
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ARC 2.0 Living Light — Circadian Rhythm Tracker",
    description:
      "Stop fighting your body. Discover your chronotype, track dynamic caffeine decay, and halve your afternoon crashes with ARC 2.0.",
    creator: "@iPritamX",
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
        {/* <FloatingSupport /> */}
        <MixpanelTracker />
      </body>
    </html>
  );
}
