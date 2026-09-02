import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | ARC 2.0 Living Light",
  description:
    "Terms of Service for ARC Circadian Rhythm Tracker. Learn about subscription terms, non-medical advice guidelines, and usage conditions.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "ARC Terms of Service",
    description: "Terms and conditions governing the use of the ARC app and website.",
    url: "https://arcapp.sbs/terms",
  };

  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Decorative Radial Background Blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-125 h-125 rounded-full bg-(--aura-crash)/5 blur-[120px] pointer-events-none -z-10" />

      <Nav />

      <main className="max-w-4xl mx-auto px-6 py-20 relative">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-mono text-(--fg-muted) mb-8">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-accent">Terms of Service</span>
        </nav>

        <header className="mb-14 border-b border-white/10 pb-10">
          <span className="px-3 py-1 rounded-full bg-(--accent)/10 text-accent text-xs font-black uppercase tracking-widest mb-4 inline-block font-mono border border-(--accent)/20">
            Legal & Licensing
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter mb-4 leading-none">
            Terms of <span className="font-display italic font-normal text-accent text-5xl sm:text-7xl">Service</span>.
          </h1>
          <p className="text-(--fg-muted) text-sm font-mono">
            Last Updated: September 2026 · Version 2.0.0 (Living Light)
          </p>
        </header>

        {/* Important Health & Non-Medical Advice Alert */}
        <div className="raised-card p-6 sm:p-8 mb-12 border-(--aura-crash)/40 bg-(--aura-crash)/5">
          <h2 className="text-lg font-bold text-white mb-2 font-mono flex items-center gap-2">
            <span>⚠️</span> Important Notice: Not Medical Advice
          </h2>
          <p className="text-sm text-(--fg-muted) leading-relaxed">
            ARC is a wellness and lifestyle software application designed to assist users in discovering their circadian rhythm and optimizing general daily habits (such as outdoor sunlight timing and caffeine moderation). <strong className="text-white">ARC does not provide medical advice, diagnosis, or clinical treatment.</strong> The services, calculators, and protocols are for informational purposes only and are not a substitute for professional medical care, sleep disorder evaluations (e.g., sleep apnea, severe insomnia), or physician consultation.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-12 text-sm sm:text-base leading-relaxed text-(--fg-muted)">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              1. Agreement to Terms
            </h2>
            <p>
              By downloading, installing, accessing, or using the ARC mobile application (&ldquo;App&rdquo;) or website (arcapp.sbs), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              2. Subscriptions, Billing & Cancellation
            </h2>
            <p>
              ARC offers premium features accessible via recurring auto-renewing subscriptions and in-app purchases:
            </p>
            <ul className="list-disc pl-6 space-y-2.5 text-sm">
              <li><strong className="text-zinc-200">Subscription Plans:</strong> Available as a weekly subscription ($4.99/week) or an annual subscription ($39.99/year, billed annually). Prices may vary by geographic territory and currency conversion rates established by Apple.</li>
              <li><strong className="text-zinc-200">Free Trials:</strong> Where offered on eligible plans (typically annual), free trial periods allow full access to premium features. To avoid being charged, you must cancel at least 24 hours before the trial ends.</li>
              <li><strong className="text-zinc-200">Auto-Renewal:</strong> Subscriptions automatically renew unless auto-renew is disabled at least 24 hours before the end of the current billing cycle.</li>
              <li><strong className="text-zinc-200">How to Cancel:</strong> You can manage or cancel your subscription at any time via your iOS device: <em>Settings &gt; [Your Name] &gt; Subscriptions &gt; ARC &gt; Cancel Subscription</em>.</li>
              <li><strong className="text-zinc-200">Refunds:</strong> All payments and refund requests are processed directly by Apple according to App Store customer policies.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              3. User Conduct & On-Device Storage
            </h2>
            <p>
              ARC is licensed to you for personal, non-commercial use. You agree not to reverse engineer, decompile, modify, or distribute the application bundle. Because ARC operates under an on-device local SQLite architecture, you are responsible for maintaining backups of your device if you wish to preserve historical check-ins across device upgrades.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              4. Intellectual Property
            </h2>
            <p>
              The ARC logo, Living Light visual system, proprietary algorithms (including the dynamic caffeine cutoff decay engine, astronomical solar calculator, and 5-day experiment loops), brand assets, and content are the exclusive intellectual property of ARC and its creators.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              5. Disclaimer of Warranties
            </h2>
            <p>
              The services are provided on an &ldquo;AS IS&rdquo; and &ldquo;AS AVAILABLE&rdquo; basis without warranties of any kind, whether express or implied. We do not warrant that the app will operate uninterrupted or error-free, or that biological recommendations will achieve specific physiological or productivity outcomes for any individual user.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              6. Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by law, ARC and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the application, calculators, or protocols.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Material updates will be indicated by revising the &ldquo;Last Updated&rdquo; date at the top of this page. Continued use of ARC constitutes your agreement to the revised terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white font-sans tracking-tight">
              8. Contact Support
            </h2>
            <p>
              For legal inquiries, billing assistance, or support questions, please contact our support desk:
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
          <Link href="/privacy" className="text-accent hover:underline">
            View Privacy Policy →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
