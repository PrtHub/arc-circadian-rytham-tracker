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
import CircadianResetClient from "./CircadianResetClient";

export const metadata = toolMetadata({
  slug: "circadian-reset-planner",
  title: "Sleep Schedule Reset Calculator: Day-by-Day Circadian Planner",
  description:
    "Fix a broken sleep schedule in 15–45 min steps. Generates your day-by-day wake time, 20-min light anchor, delayed coffee, caffeine cutoff, and bedtime.",
  keywords:
    "sleep schedule reset calculator, circadian rhythm reset planner, how to fix sleep schedule day by day, phase advance sleep calculator, reset body clock",
});

const FAQS: ToolFaq[] = [
  {
    q: "How fast can you safely shift your circadian rhythm?",
    a: "Most adults can comfortably advance their central clock by 15 to 30 minutes per day (or delay by 30 to 60 minutes per day). Trying to pull bedtime 3 hours earlier in a single night usually results in lying awake staring at the ceiling.",
  },
  {
    q: "Why does the table shift wake time and morning light together?",
    a: "Your suprachiasmatic nucleus resets primarily from morning light reaching melanopsin retinal cells shortly after your core body temperature minimum. Shifting light and wake time in lockstep pulls melatonin onset earlier that evening.",
  },
  {
    q: "Should I skip coffee during a sleep schedule reset?",
    a: "You don't need to quit coffee—you just need to delay your first cup by 90 minutes and obey the cutoff column so residual caffeine falls below 50 mg before your earlier target bedtime.",
  },
  {
    q: "What if I slip up on one weekend morning?",
    a: "Keep weekend wake drift within 45–60 minutes of your current step day. If you stay up late, still wake near schedule, get 20 minutes of outdoor light, and recover with a 20-minute early-afternoon nap.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/guides/complete-circadian-rhythm-reset-guide",
    label: "14-Day Circadian Rhythm Reset Guide",
    note: "complete four-zeitgeber playbook",
  },
  {
    href: "/tools/sunlight-calculator",
    label: "Morning Sunlight Lux Calculator",
    note: "today's local sunrise & exposure minutes",
  },
  {
    href: "/tools/social-jetlag-calculator",
    label: "Social Jetlag Calculator",
    note: "measure weekend sleep-in drift",
  },
  {
    href: "/tools/sleep-debt-calculator",
    label: "Sleep Debt Calculator",
    note: "recover shortfall without breaking rhythm",
  },
];

export default function CircadianResetPlannerPage() {
  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Sleep Schedule Reset Planner",
          slug: "circadian-reset-planner",
          description:
            "Interactive day-by-day circadian phase shift calculator generating personalized wake times, light windows, caffeine cutoffs, and bedtimes.",
        })}
      />

      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/tools" backLabel="All Tools" />
      <ToolBreadcrumbs title="Circadian Reset Planner" />
      <CircadianResetClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">
          Why Incremental Phase Shifting Works Better Than All-Nighters
        </h2>
        <div className="space-y-5 text-(--fg-muted) text-base leading-relaxed">
          <p>
            Pulling an &ldquo;all-nighter&rdquo; to fix a late sleep schedule only builds extreme <strong className="text-white">Process S</strong> (adenosine sleep pressure) while leaving <strong className="text-white">Process C</strong> (your internal clock) completely unmoved. You crash for 11 hours and wake up right back on your old schedule.
          </p>
          <p>
            Incremental 15-to-30 minute shifts—paired with morning daylight at <Link href="/tools/sunlight-calculator" className="text-accent hover:underline">sunrise</Link> and strict bedtime caffeine cutoffs—let your clock enzymes (CLOCK/BMAL1/PER) stay synchronized across every day of the transition.
          </p>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />
      <Footer />
    </div>
  );
}
