import Link from "next/link";
import { ContentNav } from "@/components/ContentNav";
import { Footer } from "@/components/Footer";
import {
  JsonLd,
  RelatedReading,
  ToolFaqSection,
  toolAppJsonLd,
  toolMetadata,
  type RelatedLink,
  type ToolFaq,
} from "../_components/tool-extras";
import ChronotypeQuizClient from "./ChronotypeQuizClient";

export const metadata = toolMetadata({
  slug: "chronotype-quiz",
  title: "Chronotype Quiz: Lion, Bear, Wolf or Dolphin? (Free)",
  description:
    "Are you a Lion, Bear, Wolf, or Dolphin? Take this free 2-minute chronotype test to estimate your natural sleep and energy timing and plan your day around it.",
  keywords:
    "chronotype quiz, chronotype test, am I a lion or bear, sleep animal quiz, find my chronotype, circadian rhythm test",
});

const FAQS: ToolFaq[] = [
  {
    q: "How accurate is a chronotype quiz?",
    a: "It's a reasonable first guess, not a measurement. Researchers use longer questionnaires such as the Morningness-Eveningness Questionnaire (MEQ) or the Munich ChronoType Questionnaire (MCTQ), and your real energy pattern over a couple of weeks tells you more than any quiz.",
  },
  {
    q: "Can your chronotype change?",
    a: "Yes, somewhat. Chronotype is partly genetic but shifts with age (teenagers and young adults tend to run later, older adults earlier) and with light exposure, such as how much daylight you get in the morning and how much bright light you see at night.",
  },
  {
    q: "What is the most common chronotype?",
    a: "In Dr. Michael Breus's model the Bear is the most common, which he estimates at around half of people. He puts Lions at about 15%, Wolves at 15 to 20%, and Dolphins at about 10%.",
  },
  {
    q: "What is a Dolphin chronotype?",
    a: "In Breus's model, Dolphins are light sleepers with less regular rhythms who often wake easily and feel wired and tired at the same time. If you have ongoing trouble sleeping, it's worth talking to a doctor rather than putting it down to your chronotype.",
  },
];

const RELATED: RelatedLink[] = [
  {
    href: "/blog/what-is-a-chronotype-lion-bear-wolf-dolphin",
    label: "What is a chronotype? Lion, Bear, Wolf and Dolphin explained",
  },
  {
    href: "/guides/chronotype-lifestyle-design-guide",
    label: "Daily schedules for each chronotype",
  },
  {
    href: "/books/the-power-of-when",
    label: "The Power of When by Dr. Michael Breus",
    note: "the book behind the four animals",
  },
  {
    href: "/tools/chronotype-compatibility",
    label: "Compare your chronotype with a partner's",
  },
];

export default function ChronotypeQuizPage() {
  return (
    <div className="text-white min-h-screen relative overflow-hidden">
      <JsonLd
        data={toolAppJsonLd({
          name: "ARC Chronotype Quiz",
          slug: "chronotype-quiz",
          description:
            "An 8-question quiz to estimate your chronotype (Lion, Bear, Wolf, or Dolphin) and plan your day around your natural rhythm.",
        })}
      />

      {/* Decorative Radial Glowing Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 rounded-full bg-(--accent)/10 blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[-10%] w-125 h-125 rounded-full bg-(--accent)/5 blur-[120px] pointer-events-none -z-10" />

      <ContentNav backHref="/tools" backLabel="All Tools" />
      <ChronotypeQuizClient />

      <section className="max-w-3xl mx-auto px-6 py-16 border-t border-white/10 mb-12">
        <h2 className="text-3xl font-black mb-6 tracking-tighter text-white">What Your Quiz Result Means</h2>

        <div className="space-y-6 text-(--fg-muted) text-base sm:text-lg leading-relaxed">
          <p>
            Your chronotype is your natural tendency to sleep and wake earlier or later, and it shapes your <strong className="text-white">circadian rhythm</strong>. Your chronotype is partly genetic (hundreds of gene variants play a part) and shifts with age and light exposure. It isn&apos;t laziness or a choice. For the full background, read{" "}
            <Link href="/blog/what-is-a-chronotype-lion-bear-wolf-dolphin" className="text-accent hover:underline">what a chronotype is</Link>.
          </p>

          <h3 className="text-2xl font-bold mb-4 text-white mt-10">The Four Chronotypes (Breus&apos;s Model)</h3>
          <p>
            Sleep specialist Dr. Michael Breus groups people into four chronotypes in <Link href="/books/the-power-of-when" className="text-accent hover:underline"><em>The Power of When</em></Link>. Researchers measure chronotype on a continuous scale from morning to evening types, so think of these animals as useful labels rather than fixed boxes.
          </p>

          <div className="space-y-6">
            <div className="raised-card p-6 border-(--accent)/20 rounded-2xl">
              <h4 className="text-xl font-bold text-accent mb-2 flex items-center gap-2">🦁 The Lion (Breus estimates ~15%)</h4>
              <p className="text-(--fg-muted) text-sm leading-relaxed">Naturally wakes up very early (5 AM - 6 AM) without an alarm. Lions have strong morning energy and focus best before noon, then fade noticeably in the late afternoon and evening.</p>
            </div>

            <div className="raised-card p-6 border-(--accent)/20 rounded-2xl">
              <h4 className="text-xl font-bold text-accent mb-2 flex items-center gap-2">🐻 The Bear (Breus estimates ~50%)</h4>
              <p className="text-(--fg-muted) text-sm leading-relaxed">Follows the sun. Bears wake up around 7 AM and have fairly steady energy through the day, with peak focus from mid-morning to early afternoon.</p>
            </div>

            <div className="raised-card p-6 border-(--accent)/20 rounded-2xl">
              <h4 className="text-xl font-bold text-accent mb-2 flex items-center gap-2">🐺 The Wolf (Breus estimates ~15-20%)</h4>
              <p className="text-(--fg-muted) text-sm leading-relaxed">The classic night owl. Wolves find it hard to wake before 9 AM and often feel groggy all morning. Their best focus usually comes in the late afternoon or evening.</p>
            </div>

            <div className="raised-card p-6 border-(--accent)/20 rounded-2xl">
              <h4 className="text-xl font-bold text-accent mb-2 flex items-center gap-2">🐬 The Dolphin (Breus estimates ~10%)</h4>
              <p className="text-(--fg-muted) text-sm leading-relaxed">Light sleepers with less regular rhythms. Dolphins wake easily and tend to have bursts of energy rather than a steady, predictable curve.</p>
            </div>
          </div>
        </div>
      </section>

      <ToolFaqSection faqs={FAQS} />
      <RelatedReading links={RELATED} />

      <Footer />
    </div>
  );
}
