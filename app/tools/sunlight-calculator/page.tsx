import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolBreadcrumbs,
  ToolFaqSection,
  toolAppJsonLd,
  toolMetadata,
  type RelatedLink,
  type ToolFaq,
} from "../_components/tool-extras";
import SunlightCalculatorClient from "./SunlightCalculatorClient";

export const metadata = toolMetadata({
  slug: "sunlight-calculator",
  title: "Morning Sunlight Calculator & Lux Protocol: How Long to Stay Outside | ARC",
  description:
    "Calculate your exact morning sunlight exposure time based on today's sunrise, cloud cover, and retinal lux requirements (10,000+ lux). No GPS permission needed.",
  keywords:
    "morning sunlight calculator, outdoor lux calculator, how long morning sunlight, morning light exposure protocol, when to get morning sunlight, huberman sunlight routine",
});

const FAQS: ToolFaq[] = [
  {
    q: "How long should I get morning sunlight based on cloud cover?",
    a: "On a clear, sunny morning, 10 to 15 minutes is plenty (10,000 to 50,000+ lux). On a partly cloudy morning, aim for 20 minutes. Under heavy overcast or rain (1,000 to 5,000 lux), stay outside for 30 to 45 minutes to deliver an equivalent photon dose to retinal melanopsin cells.",
  },
  {
    q: "What time is sunrise where I live?",
    a: "Pick your nearest city and a date in the calculator above. It calculates precise solar sunrise using the standard astronomical solar algorithm in your city's local time (including daylight saving changes), without requesting your GPS location.",
  },
  {
    q: "Can I get morning light through a window or windshield?",
    a: "No. Standard residential window glass and car windshields filter out substantial light intensity and critical blue-cyan wavelengths, reducing effective photon density by 50% to 80%. Even sitting directly next to a window typically provides only 500 to 1,500 lux compared to 10,000+ lux outdoors.",
  },
  {
    q: "Should I wear sunglasses or prescription glasses?",
    a: "Clear prescription glasses and contact lenses are fine—they focus light onto your retina without filtering out the lux intensity. Sunglasses, however, block the blue-cyan wavelengths needed by melanopsin cells, so take them off during your morning light window if comfortable. Never look directly at the sun.",
  },
  {
    q: "What if I wake up before sunrise or live in dark winter latitudes?",
    a: "Turn on the brightest overhead LED lights in your home immediately upon waking. For dark winter months or latitudes above 45°N, use a verified 10,000-lux seasonal affective disorder (SAD) light box positioned 16 to 24 inches from your eyes at a 45-degree angle for 20 to 30 minutes, then get outside once the sun rises.",
  },
  {
    q: "Why is morning sunlight within 30–60 minutes of waking so critical?",
    a: "Morning light hits intrinsically photosensitive retinal ganglion cells (ipRGCs) right after your core body temperature minimum (Tmin). This triggers a sharp cortisol awakening response (CAR), shuts down pineal melatonin synthesis, and starts a biological countdown that cues natural melatonin release 14 to 16 hours later.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/tools/caffeine-calculator",
    label: "Caffeine Half-Life & Cutoff Calculator",
    note: "calculate mg left at bedtime based on your metabolic rate",
  },
  {
    href: "/tools/social-jetlag-calculator",
    label: "Social Jetlag Calculator",
    note: "measure circadian drift between workdays and weekends",
  },
  {
    href: "/tools/chronotype-quiz",
    label: "Chronotype Quiz (Lion, Bear, Wolf, Dolphin)",
    note: "find your biological sleep-wake rhythm",
  },
  {
    href: "/blog/science-of-morning-sunlight-productivity-hack",
    label: "The Science of Morning Sunlight",
    note: "cortisol, dopamine, and sleep architecture",
  },
  {
    href: "/blog/huberman-morning-routine-app",
    label: "The Huberman Morning Routine & ARC Automation",
    note: "sunlight, hydration, and 90-min coffee delay",
  },
];

export default function SunlightCalculatorPage() {
  return (
    <div className="text-white min-h-screen">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Morning Sunlight Calculator & Lux Protocol",
          slug: "sunlight-calculator",
          description:
            "A free clinical tool to estimate required outdoor exposure duration based on sunrise time, cloud cover, and retinal lux requirements.",
        })}
      />
      <ContentNav backHref="/tools" backLabel="All Tools" />
      <ToolBreadcrumbs title="Morning Sunlight Calculator" />
      <SunlightCalculatorClient />

      {/* Static Lux Intensity & Exposure Table for Featured Snippets */}
      <section className="max-w-3xl mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/10 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-white">
            Outdoor vs. Indoor Lux Intensity &amp; Exposure Requirements
          </h2>
          <span className="text-xs font-mono text-accent uppercase tracking-wider font-semibold">
            Clinical Melanopsin Protocol
          </span>
        </div>
        <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
          How bright is the sky compared to your living room, and how long do you need to stay outside to anchor your circadian rhythm? Use this benchmark table:
        </p>

        <div className="overflow-x-auto -mx-6 sm:mx-0">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[580px]">
            <thead>
              <tr className="border-b border-white/20 text-zinc-400 font-mono uppercase text-[11px] tracking-wider">
                <th scope="col" className="py-3 px-3 font-semibold">Lighting Condition</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">Typical Lux</th>
                <th scope="col" className="py-3 px-2.5 font-semibold text-center">Circadian Impact</th>
                <th scope="col" className="py-3 px-3 font-semibold text-right">Required Dose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Clear Morning Sky (Sun Above Horizon)</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">10,000 – 50,000+ lux</td>
                <td className="py-3.5 px-2.5 text-center text-emerald-400">Optimal Phase Advance</td>
                <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">10 – 15 mins</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Partly Cloudy / Hazy Morning</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">5,000 – 10,000 lux</td>
                <td className="py-3.5 px-2.5 text-center text-emerald-400">Strong Entrainment</td>
                <td className="py-3.5 px-3 text-right text-emerald-400 font-bold">20 mins</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Heavy Overcast / Rainy Morning</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">1,000 – 3,000 lux</td>
                <td className="py-3.5 px-2.5 text-center text-amber-300">Moderate Signal (Takes Longer)</td>
                <td className="py-3.5 px-3 text-right text-amber-400 font-bold">30 – 45 mins</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Behind Window / In Car</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">500 – 1,500 lux</td>
                <td className="py-3.5 px-2.5 text-center text-rose-400">Weak (Filtered by Glass)</td>
                <td className="py-3.5 px-3 text-right text-rose-400 font-bold">Ineffective</td>
              </tr>
              <tr className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-3 font-bold text-white">Well-Lit Indoor Office / Kitchen</td>
                <td className="py-3.5 px-2.5 text-center text-zinc-300">250 – 500 lux</td>
                <td className="py-3.5 px-2.5 text-center text-rose-400">Insufficient for Morning Reset</td>
                <td className="py-3.5 px-3 text-right text-rose-400 font-bold">N/A (Too Dim)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* High-Intent Strategic Internal Links */}
      <section className="max-w-3xl mx-auto px-6 py-8 border-t border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-4">
          Essential Circadian Tools &amp; Protocols
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <Link
            href="/tools/caffeine-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Adenosine Clearance
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Caffeine Half-Life &amp; Cutoff Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Find out exactly how many milligrams of caffeine remain in your bloodstream at bedtime.
            </div>
          </Link>

          <Link
            href="/tools/chronotype-quiz"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Circadian Identity
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              8-Question Chronotype Quiz &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Discover whether you are a Lion, Bear, Wolf, or Dolphin and unlock your ideal wake routine.
            </div>
          </Link>

          <Link
            href="/tools/social-jetlag-calculator"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Sleep Regularity
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Social Jetlag Calculator &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Measure the sleep-midpoint discrepancy between your workdays and weekends.
            </div>
          </Link>

          <Link
            href="/tools/sleep-cocktail"
            className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-(--accent)/40 transition-all group block"
          >
            <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold mb-1">
              Sleep Architecture
            </div>
            <div className="font-bold text-white group-hover:text-accent transition-colors text-base mb-1">
              Huberman Sleep Cocktail Dosage Builder &rarr;
            </div>
            <div className="text-xs text-zinc-400 leading-relaxed">
              Calculate clinical supplement doses: 144mg Magnesium L-Threonate, 50mg Apigenin, 100–200mg L-Theanine.
            </div>
          </Link>
        </div>
      </section>

      {/* Comprehensive In-Depth Scientific Protocol */}
      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          The Biology of Morning Sunlight &amp; Circadian Entrainment
        </h2>

        <div className="prose prose-invert prose-lg max-w-none text-(--fg-muted)">
          <p className="leading-relaxed mb-6">
            Light is the primary <strong className="text-white">zeitgeber</strong> (environmental time giver) for all mammalian life. While social schedules, meal times, and exercise can nudge peripheral clocks in your liver and muscles, light hitting your eyes is the only stimulus with a direct neural pathway to your master circadian pacemaker: the <strong className="text-white">suprachiasmatic nucleus (SCN)</strong> in the anterior hypothalamus.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            1. The Third Photoreceptor: ipRGCs and Melanopsin
          </h3>
          <p className="leading-relaxed mb-6">
            For more than a century, science believed human vision was handled exclusively by two photoreceptors: rods (for night vision) and cones (for color vision). In 2002, researchers identified a third class: <strong className="text-white">intrinsically photosensitive retinal ganglion cells (ipRGCs)</strong>.
          </p>
          <p className="leading-relaxed mb-6">
            These specialized cells do not form visual images. Instead, they express the photopigment <strong className="text-white">melanopsin</strong>, which is maximally sensitive to blue-cyan light around <strong className="text-white">480 nanometers</strong>. When stimulated by natural morning daylight, ipRGCs depolarize and fire signals directly along the retinohypothalamic tract into the SCN. This triggers three distinct neurochemical events:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li><strong className="text-white">Melatonin Cessation:</strong> Immediately halts pineal gland secretion of residual melatonin, clearing morning brain fog.</li>
            <li><strong className="text-white">Cortisol Awakening Response (CAR):</strong> Stimulates a healthy, sharp morning cortisol and dopamine surge, promoting wakefulness and mental clarity.</li>
            <li><strong className="text-white">Timer for Evening Melatonin:</strong> Starts an internal 14- to 16-hour countdown clock that cues natural melatonin synthesis tonight.</li>
          </ul>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            2. The Phase Response Curve (PRC) &amp; Timing Windows
          </h3>
          <p className="leading-relaxed mb-6">
            Light does not affect your circadian rhythm the same way at all hours. Your biological response follows a strict <strong className="text-white">Phase Response Curve (PRC)</strong> anchored around your core body temperature minimum (<strong className="text-white">Tmin</strong>)—the lowest temperature of your 24-hour cycle, which typically occurs 1.5 to 2 hours before your natural wake time:
          </p>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 space-y-3">
            <p className="text-sm">
              <strong className="text-emerald-400">Light AFTER Tmin (Morning / 6:00 AM – 9:00 AM):</strong> Advances your circadian clock. This pulls your sleep drive earlier in the evening, making it easy to fall asleep earlier and wake naturally without an alarm.
            </p>
            <p className="text-sm">
              <strong className="text-rose-400">Light BEFORE Tmin (Late Night / 10:00 PM – 4:00 AM):</strong> Delays your circadian clock. Blue light from screens or bright bulbs during this window tricks your brain into thinking it is daytime, pushing your sleep window later and causing morning sleep inertia.
            </p>
          </div>
          <p className="leading-relaxed mb-6">
            To achieve the strongest phase advance and overcome delayed sleep phase tendencies, step outside within <strong className="text-white">30 to 60 minutes of waking</strong>.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            3. Why Indoors and Windows Fall Short
          </h3>
          <p className="leading-relaxed mb-6">
            The human pupil dynamically expands and contracts, giving you the illusion that indoor rooms are bright. In reality, a modern indoor office lit by fluorescent or LED bulbs rarely exceeds <strong className="text-white">300 to 500 lux</strong>. In contrast, even a dark, rainy morning outside produces <strong className="text-white">1,500 to 3,000 lux</strong>, and a clear morning sky quickly generates <strong className="text-white">10,000 to 50,000+ lux</strong>.
          </p>
          <p className="leading-relaxed mb-6">
            Standard double-pane architectural glass reflects and absorbs up to 80% of the melanopsin-activating blue-cyan spectrum. Sitting next to a window is not an effective substitute for stepping onto a balcony, porch, or taking a brisk morning walk.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            4. Winter Mornings &amp; 10,000-Lux Light Therapy Box Protocols
          </h3>
          <p className="leading-relaxed mb-6">
            If you wake before sunrise or live at latitudes above 40°N/S where winter sunrise occurs late:
          </p>
          <ol className="list-decimal list-inside space-y-3 mb-6">
            <li>Turn on all bright overhead LED lights immediately when your alarm sounds.</li>
            <li>Use a clinically tested <strong className="text-white">10,000-lux white light box</strong> equipped with a certified UV filter.</li>
            <li>Position the light box at eye level, angled downward at roughly <strong className="text-white">45 degrees</strong>, approximately <strong className="text-white">16 to 24 inches</strong> from your face.</li>
            <li>Keep it on for <strong className="text-white">20 to 30 minutes</strong> while having breakfast or reviewing your morning schedule.</li>
            <li>Step outside for a brief 10-minute top-up later once the sun has risen above the horizon.</li>
          </ol>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">
            5. The Late-Afternoon Light Top-Up
          </h3>
          <p className="leading-relaxed mb-6">
            In addition to morning light, getting 10 to 15 minutes of outdoor sunlight in the late afternoon (near solar sunset) provides two key benefits:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-6">
            <li><strong className="text-white">Evening Blue Light Protection:</strong> High daytime photon exposure decreases retinal sensitivity to dim evening light, buffering your pineal gland against suppression from indoor screens.</li>
            <li><strong className="text-white">Circadian Bracket:</strong> Signals the end of the biological day, initiating the gradual decline in core body temperature necessary for restful sleep.</li>
          </ul>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}

