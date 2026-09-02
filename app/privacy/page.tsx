import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ARC 2.0 Living Light",
  description:
    "ARC is built local-first. All check-ins, sleep logs, and caffeine records stay on your device in SQLite. No account, no GPS tracking, and no ad trackers.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ARC Privacy Policy",
    description: "Privacy policy detailing ARC's local-first architecture and privacy guarantees.",
    url: "https://arcapp.sbs/privacy",
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Background Blobs */}
      <div className="absolute top-[-15%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--aura-sleep)/5 blur-[120px] pointer-events-none -z-10" />

      <Nav />

      <main className="max-w-4xl mx-auto px-6 py-20 relative">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-mono text-(--fg-muted) mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent">Privacy Policy</span>
        </nav>

        <header className="mb-14 border-b border-white/10 pb-10">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block font-mono border border-(--accent)/20">
            Local-First Architecture
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 leading-none">
            Privacy <span className="font-display italic font-normal text-accent text-5xl sm:text-7xl">Policy</span>.
          </h1>
          <p className="text-(--fg-muted) text-sm font-mono">
            Last Updated: September 2026 · Version 2.0.0 (Living Light)
          </p>
        </header>

        {/* Quick Highlights Summary Box */}
        <div className="raised-card p-6 sm:p-8 mb-12 border-(--accent)/30 bg-(--accent)/5">
          <h2 className="text-lg font-bold text-white mb-3 font-mono flex items-center gap-2">
            <span>🛡️</span> The ARC Privacy Promise in 30 Seconds
          </h2>
          <ul className="space-y-2.5 text-sm text-(--fg-muted) leading-relaxed">
            <li className="flex items-start gap-2.5">
              <span className="text-accent font-bold font-mono">✓</span>
              <span><strong className="text-white">100% Local-First:</strong> Your biological logs, check-ins, and drink history stay inside an on-device SQLite database.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-accent font-bold font-mono">✓</span>
              <span><strong className="text-white">No Accounts & No Logins:</strong> You never have to provide an email, create a password, or register a profile to use ARC.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-accent font-bold font-mono">✓</span>
              <span><strong className="text-white">Zero GPS Tracking:</strong> Astronomical sunrise and solar angles are calculated mathematically from your device&apos;s time zone.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-accent font-bold font-mono">✓</span>
              <span><strong className="text-white">Zero Data Brokers:</strong> We never sell, rent, monetize, or share your personal information with advertising networks.</span>
            </li>
          </ul>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-(--fg-muted)">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              1. Information We Store Locally on Your Device
            </h2>
            <p>
              ARC is engineered under a strict <strong className="text-white">local-first principle</strong>. When you log habits, check-ins, or chronotype details, this information is stored exclusively in your iPhone&apos;s local SQLite database:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong className="text-zinc-200">Chronotype Preferences:</strong> Your sleep target, typical bedtime, stated wake time, and focus windows.</li>
              <li><strong className="text-zinc-200">Drink & Caffeine Logs:</strong> Timestamp, drink category, and estimated milligrams consumed to compute real decay curves.</li>
              <li><strong className="text-zinc-200">Subjective Energy Check-ins:</strong> Low, medium, or high energy ratings logged across biological phases.</li>
              <li><strong className="text-zinc-200">Activity Timers:</strong> Completed outdoor light exposure minutes and deliberate rest intervals.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              2. Information We Do NOT Collect
            </h2>
            <p>
              ARC is deliberately built with the fewest permissions possible:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong className="text-zinc-200">No Location Permission:</strong> We never ask for GPS coordinates. Sunrise and seasonal light shifts are calculated solely from device time zone offsets.</li>
              <li><strong className="text-zinc-200">No HealthKit / Health Data Harvesting:</strong> ARC does not read or export HealthKit records without your explicit on-demand consent.</li>
              <li><strong className="text-zinc-200">No Social or Contact Access:</strong> ARC never accesses your address book, photos, or social accounts.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              3. The AI Daily Directive Sentence
            </h2>
            <p>
              ARC provides a dynamic daily sentence explaining your biological rhythm in your own numbers (e.g. <em>&ldquo;You&apos;re 40 minutes into your afternoon dip. This is adenosine, not laziness.&rdquo;</em>).
            </p>
            <p>
              To generate this line, an anonymized metadata summary (wake hour, bedtime, dip timing, and today&apos;s logged caffeine mg) is transmitted over encrypted TLS to our private AI inference proxy.
            </p>
            <div className="sunken-card p-4 rounded-xl text-xs space-y-1 font-mono text-zinc-300">
              <p className="text-accent font-bold uppercase tracking-wider">Privacy Guarantee on AI Generation:</p>
              <p>• No name, email, IP identifier, or device identifier is ever attached to the prompt.</p>
              <p>• Prompts are processed ephemerally and never used to train public language models.</p>
              <p>• If offline or if network fails, the app seamlessly falls back to pre-written on-device templates.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              4. Subscriptions, Payments & RevenueCat
            </h2>
            <p>
              In-app purchases and subscriptions are handled securely through Apple&apos;s StoreKit infrastructure and RevenueCat for receipt validation.
            </p>
            <p>
              ARC never receives or stores your credit card number, bank account details, or billing address. All transactions are governed by Apple&apos;s App Store Terms and Privacy Policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              5. Diagnostics & Analytics
            </h2>
            <p>
              To improve app stability and resolve crashes, we may collect aggregated, non-identifying telemetry (such as crash stack traces and app version numbers) through Apple App Store Analytics and privacy-compliant diagnostic monitors.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              6. Your Data Rights & Complete Erasure
            </h2>
            <p>
              Because your check-ins and logs reside on your physical device, you maintain full control over your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm">
              <li><strong className="text-zinc-200">Undo Any Log:</strong> Every logged drink, walk, or check-in can be withdrawn with a single tap.</li>
              <li><strong className="text-zinc-200">Permanent Reset:</strong> Tapping &ldquo;Reset All Data&rdquo; in settings instantly wipes your local SQLite database.</li>
              <li><strong className="text-zinc-200">App Deletion:</strong> Deleting the ARC app from your iOS device immediately and permanently deletes all stored data.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              7. Contact & Data Inquiries
            </h2>
            <p>
              If you have any questions or suggestions regarding our privacy practices, please contact our team directly:
            </p>
            <div className="raised-card p-4 rounded-xl inline-block text-sm font-mono">
              <span className="text-(--fg-muted)">Email: </span>
              <a href="mailto:pritamfinds@gmail.com" className="text-accent hover:underline font-bold">
                pritamfinds@gmail.com
              </a>
            </div>
          </section>
        </div>

        {/* Back Button */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center text-sm font-mono">
          <Link href="/" className="text-(--fg-muted) hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <Link href="/terms" className="text-accent hover:underline">
            View Terms of Service →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
