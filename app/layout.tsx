import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://arcapp.sbs";

export const viewport: Viewport = {
  themeColor: "#070A18",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "ARC 2.0 Living Light — Circadian Rhythm Tracker & Chronotype App",
    // Short suffix: Google shows ~60 characters, so the page title should get them.
    template: "%s | ARC",
  },

  description:
    "Stop fighting your biology. ARC 2.0 Living Light maps your day around your chronotype. A caffeine cutoff from every drink you log, a morning light timer from your real sunrise, and Trends that show from your own check-ins whether it's working.",

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

  // Safari on iOS shows a native "Get" banner for the app.
  itunes: {
    appId: "6758214892",
  },
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
      "Stop fighting your body. Discover your chronotype, follow your dynamic daily plan, calculate your last safe coffee, and see from your own check-ins whether your afternoon crashes are falling.",
    siteName: "ARC: Circadian Rhythm Tracker",
    url: SITE_URL,
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "ARC 2.0 Living Light — Circadian Rhythm Tracker",
    description:
      "Stop fighting your body. Discover your chronotype, track caffeine decay, and see whether your afternoon crashes are falling with ARC 2.0.",
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
    <html
      lang="en"
      data-phase="night"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var d = new Date();
                  var h = (d.getHours() * 60 + d.getMinutes()) / 60;
                  var idx = (h >= 23 || h < 4) ? 5 : h < 9 ? 0 : h < 13 ? 1 : h < 17.5 ? 2 : h < 21 ? 3 : 4;
                  var phases = ["rise", "peak", "dip", "evening", "windDown", "night"];
                  var p = phases[idx];
                  var doc = document.documentElement;
                  doc.setAttribute("data-phase", p);

                  var skies = [
                    { zen: "#1E1C4A", hor: "#E3876A", acc: "#FFD9A0", stars: "0" },
                    { zen: "#0D2D62", hor: "#4A90D2", acc: "#FFE0A8", stars: "0" },
                    { zen: "#321F4C", hor: "#BE6E4E", acc: "#FFC48A", stars: "0" },
                    { zen: "#251B54", hor: "#DC9048", acc: "#FFD9A0", stars: "0" },
                    { zen: "#110F38", hor: "#5A3165", acc: "#E3B08C", stars: "0.85" },
                    { zen: "#04071A", hor: "#18215A", acc: "#9FA6D8", stars: "0.85" }
                  ];
                  var curSky = skies[idx];
                  var s = doc.style;
                  s.setProperty("--sky-zen", curSky.zen);
                  s.setProperty("--sky-hor", curSky.hor);
                  s.setProperty("--sky-acc", curSky.acc);
                  s.setProperty("--sky-stars", curSky.stars);

                  var f = h < 4 ? 1 : Math.min(1, Math.max(0, (h - 5) / 19));
                  var u = 1 - f;
                  var sx = (3 * u * u * f * 300 + 3 * u * f * f * 700 + f * f * f * 1000) / 10;
                  var sy = (u * u * u * 270 + 3 * u * u * f * -10 + 3 * u * f * f * -10 + f * f * f * 270) / 3;
                  s.setProperty("--sun-x", sx.toFixed(2) + "%");
                  s.setProperty("--sun-y", sy.toFixed(2) + "%");

                  var grounds = {
                    night:    { top: "#070a18", mid: "#0e1430", bot: "#131936" },
                    rise:     { top: "#1a1c3a", mid: "#4a3352", bot: "#7c4722" },
                    peak:     { top: "#0d1b2e", mid: "#173248", bot: "#2e5c76" },
                    dip:      { top: "#221d30", mid: "#432f43", bot: "#6b4536" },
                    evening:  { top: "#1c2140", mid: "#3d3050", bot: "#7a4820" },
                    windDown: { top: "#0e1128", mid: "#221a3a", bot: "#3d263e" }
                  };
                  var g = grounds[p] || grounds.night;
                  s.setProperty("--g-top", g.top);
                  s.setProperty("--g-mid", g.mid);
                  s.setProperty("--g-bot", g.bot);
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
        {/* <FloatingSupport /> */}
        <MixpanelTracker />
      </body>
    </html>
  );
}
