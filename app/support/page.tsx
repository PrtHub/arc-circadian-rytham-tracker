import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Support & Help Center | ARC Circadian Rhythm Tracker",
  description:
    "Get help with ARC 2.0. Troubleshoot widgets, Live Activities, subscription restore, chronotype calibration, and contact our engineering team.",
  alternates: {
    canonical: "/support",
  },
};

const supportCategories = [
  {
    icon: "💳",
    title: "Subscriptions & Purchases",
    desc: "Restore purchases, understand the 7-day annual trial, or cancel in Apple ID settings.",
    topics: [
      "How do I restore my purchase on a new phone?",
      "How to cancel before trial ends",
      "Refund requests via Apple App Store",
    ],
  },
  {
    icon: "📱",
    title: "Widgets & Live Activities",
    desc: "Set up the Dynamic Island 20-min light timer and Lock Screen cutoff widgets.",
    topics: [
      "Enabling Live Activities in iOS Settings",
      "Cutoff widget not updating immediately",
      "Home screen Living Light phase themes",
    ],
  },
  {
    icon: "☕",
    title: "Caffeine & Biological Math",
    desc: "How the cutoff engine solves for <50mg active caffeine at your bedtime.",
    topics: [
      "Setting fast, normal, or slow sensitivity",
      "Why the cutoff time moves after logging drinks",
      "Exhausted vs Ahead cutoff states",
    ],
  },
  {
    icon: "🔔",
    title: "Notifications & Timers",
    desc: "Local, private schedule notifications and iOS Focus Mode compatibility.",
    topics: [
      "Enabling critical alerts for light windows",
      "Night shift mode notification overrides",
      "Managing sound and haptic nudges",
    ],
  },
  {
    icon: "🔒",
    title: "Data & Privacy Controls",
    desc: "Local-first SQLite database management, log retractions, and data wipes.",
    topics: [
      "How to retract or edit an incorrect drink log",
      "Resetting all local data permanently",
      "Transferring data between devices",
    ],
  },
  {
    icon: "🧬",
    title: "Chronotype Recalibration",
    desc: "Retaking onboarding acts, adjusting wake targets, and dip corrections.",
    topics: [
      "How ARC corrects your dip window at Day 10",
      "Switching between Lion, Bear, Wolf, and Dolphin",
      "Travel & automatic time zone detection",
    ],
  },
];

const faqs = [
  {
    q: "How do I restore my existing subscription?",
    a: "Open ARC on your iOS device, navigate to the Settings tab (⚙️ in the top right), and tap 'Restore Purchases'. If you are signed into the same Apple ID used to make the purchase, your subscription entitlement will unlock immediately.",
  },
  {
    q: "Why is my morning light Live Activity not showing on the Lock Screen?",
    a: "Ensure Live Activities are enabled in iOS: Go to iPhone Settings > ARC > and verify 'Live Activities' is toggled ON. Also ensure that your phone is not in a restrictive Focus mode that blocks lock-screen activities.",
  },
  {
    q: "How do I edit or delete an incorrect coffee log?",
    a: "ARC uses an append-only event log where every entry can be retracted. Tap on the caffeine card or open the log list, select the entry you wish to remove, and tap 'Undo' or 'Retract Log'. Your cutoff and decay curve will immediately recalculate.",
  },
  {
    q: "Does ARC work when traveling across time zones?",
    a: "Yes! ARC detects your device's UTC offset change upon landing with zero GPS tracking required. It automatically launches the Travel / Jet Lag event loop, giving you clear seek-light and avoid-light windows to shift your internal clock safely.",
  },
  {
    q: "How do I contact a human for bug reports or feature requests?",
    a: "You can email our founder and engineering team directly at pritamfinds@gmail.com. We typically respond within 24 hours.",
  },
];

export default function SupportPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "ARC Support Center",
    description: "Support and troubleshooting center for ARC Circadian Rhythm Tracker.",
    url: "https://arcapp.sbs/support",
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--aura-ice)/5 blur-[120px] pointer-events-none -z-10" />

      <Nav />

      <main className="max-w-6xl mx-auto px-6 py-20 relative">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-mono text-(--fg-muted) mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent">Support Center</span>
        </nav>

        {/* Hero Header */}
        <header className="mb-16 max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block font-mono border border-(--accent)/20">
            ARC Help &amp; Support
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-6 leading-none">
            How can we <span className="font-display italic font-normal text-accent text-5xl sm:text-7xl">help?</span>
          </h1>
          <p className="text-(--fg-muted) text-lg sm:text-xl leading-relaxed">
            Troubleshoot common questions, learn how the Living Light engine works, or contact our core engineering team directly.
          </p>
        </header>

        {/* Direct Contact Card */}
        <div className="raised-card p-6 sm:p-8 mb-16 border-(--accent)/40 bg-(--accent)/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-mono text-accent font-bold uppercase tracking-wider">Direct Engineering Support</span>
            <h2 className="text-2xl font-black text-white">Need personal assistance?</h2>
            <p className="text-sm text-(--fg-muted) max-w-xl">
              We respond to every user message within 24 hours. Whether it&apos;s a bug report, subscription inquiry, or chronotype question, our team is here.
            </p>
          </div>
          <a
            href="mailto:pritamfinds@gmail.com?subject=ARC%20Support%20Request"
            className="shrink-0 bg-accent text-black font-black text-sm py-3.5 px-6 rounded-2xl hover:brightness-110 transition-all font-mono shadow-lg hover:scale-105 active:scale-95"
          >
            Email Support Desk →
          </a>
        </div>

        {/* Help Categories Grid */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8 font-sans tracking-tight">
            Browse by Topic
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((cat) => (
              <div
                key={cat.title}
                className="raised-card p-6 rounded-3xl flex flex-col justify-between hover:border-(--accent)/40 transition-all group"
              >
                <div>
                  <span className="text-3xl mb-4 block" aria-hidden="true">
                    {cat.icon}
                  </span>
                  <h3 className="font-black text-lg text-white mb-2 group-hover:text-accent transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-(--fg-muted) leading-relaxed mb-4">
                    {cat.desc}
                  </p>
                </div>
                <div className="border-t border-white/5 pt-4 space-y-2">
                  {cat.topics.map((topic, i) => (
                    <div
                      key={i}
                      className="text-xs text-zinc-300 font-medium flex items-center gap-2"
                    >
                      <span className="text-accent text-[10px]">›</span>
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="mb-20 max-w-4xl">
          <div className="mb-10">
            <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest">
              Quick Answers
            </span>
            <h2 className="text-3xl font-black text-white mt-1">
              Frequently Asked Troubleshooting
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group raised-card open:border-(--accent)/40 transition-all overflow-hidden rounded-2xl"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-bold text-white hover:text-accent transition-colors select-none">
                  <span>{faq.q}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-zinc-400 group-open:text-accent group-open:rotate-45 transition-all text-2xl leading-none font-mono"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-5 text-(--fg-muted) text-sm leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Useful Links Footer */}
        <section className="raised-card p-6 sm:p-8 rounded-3xl text-center flex flex-col items-center gap-4">
          <h3 className="text-xl font-bold text-white">Looking for scientific protocols or free calculators?</h3>
          <p className="text-sm text-(--fg-muted) max-w-md">
            Explore our peer-reviewed chronobiology guides or use our standalone calculators.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-2 text-xs font-mono">
            <Link href="/tools" className="px-4 py-2 rounded-xl sunken-card text-white hover:border-(--accent)/40 hover:text-accent transition-colors">
              Explore All Free Tools →
            </Link>
            <Link href="/science" className="px-4 py-2 rounded-xl sunken-card text-white hover:border-(--accent)/40 hover:text-accent transition-colors">
              Science &amp; Protocols →
            </Link>
            <Link href="/blog" className="px-4 py-2 rounded-xl sunken-card text-white hover:border-(--accent)/40 hover:text-accent transition-colors">
              Journal Blog →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
