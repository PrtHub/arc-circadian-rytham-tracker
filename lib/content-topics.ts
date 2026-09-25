// Maps an article to its topic, so each page can show the most relevant free tool,
// an ARC pitch that matches what the reader just read, and related reading.
// Pitches describe real ARC 2.0 features only (see the App Store listing).

import { blogPosts } from "@/lib/blog-data";
import { guidesData } from "@/lib/guides-data";
import { scienceArticles } from "@/lib/science-data";

export interface ToolLink {
  name: string;
  href: string;
  blurb: string;
}

export interface Topic {
  id: string;
  match: RegExp;
  tool: ToolLink;
  cta: { title: string; body: string; bullets: string[] };
}

const TOOLS = {
  caffeine: { name: "Caffeine Cutoff Calculator", href: "/tools/caffeine-calculator", blurb: "Your last safe coffee for tonight's bedtime." },
  quiz: { name: "Chronotype Quiz", href: "/tools/chronotype-quiz", blurb: "Lion, Bear, Wolf or Dolphin in 8 questions." },
  sunlight: { name: "Morning Light Calculator", href: "/tools/sunlight-calculator", blurb: "How long to stay outside this morning." },
  socialJetlag: { name: "Social Jetlag Calculator", href: "/tools/social-jetlag-calculator", blurb: "What your weekend lie-in costs on Monday." },
  jetlag: { name: "Jet Lag Planner", href: "/tools/jetlag-planner", blurb: "When to seek and avoid light after a flight." },
  sleepDebt: { name: "Sleep Debt Calculator", href: "/tools/sleep-debt-calculator", blurb: "Your shortfall over the last five nights." },
  sleepCycle: { name: "Sleep Cycle Calculator", href: "/tools/sleep-cycle-calculator", blurb: "Bedtimes that line up with 90-minute cycles." },
  compatibility: { name: "Chronotype Compatibility", href: "/tools/chronotype-compatibility", blurb: "Where your clock and your partner's overlap." },
  visualizer: { name: "Chronotype Visualizer", href: "/tools/chronotype-visualizer", blurb: "Your energy curve hour by hour." },
  cocktail: { name: "Sleep Supplement Explainer", href: "/tools/sleep-cocktail", blurb: "What's in the popular sleep stack, with safety notes." },
  nap: { name: "Nap Calculator", href: "/tools/nap-calculator", blurb: "The best time to nap today, and when to set the alarm." },
  dst: { name: "Daylight Saving Planner", href: "/tools/daylight-saving-time-planner", blurb: "Shift your sleep before the clocks change." },
} satisfies Record<string, ToolLink>;

const LIGHT_BULLET = "20-minute light timer from your real sunrise";
const CUTOFF_BULLET = "Last safe coffee, recalculated with every cup";
const DIP_BULLET = "Learns when your afternoon dip really lands";

// Order matters: the first match wins, so specific topics come before broad ones.
export const TOPICS: Topic[] = [
  {
    id: "dst",
    match: /daylight[- ]saving|clocks? (go|change)|spring forward|fall back/i,
    tool: TOOLS.dst,
    cta: {
      title: "ARC handles the clock change for you",
      body: "ARC works out clock changes from your time zone, warns you the evening before, and stays with you through the Sunday and Monday you actually feel.",
      bullets: ["Warns the evening before the clocks change", "Sunrise from your time zone, location never requested", "Last safe coffee from your own bedtime"],
    },
  },
  {
    id: "social-jetlag",
    match: /social[- ]jetlag|monday|weekend|sunday/i,
    tool: TOOLS.socialJetlag,
    cta: {
      title: "Keep weekends from resetting your clock",
      body: "ARC watches your wake times and tells you when your schedule starts drifting, so Monday isn't a surprise.",
      bullets: ["Flags schedule drift from your own wake times", "Plans each day around when you actually woke", LIGHT_BULLET],
    },
  },
  {
    id: "jetlag",
    match: /jet[- ]?lag|travel|time[- ]zone|avoid-light/i,
    tool: TOOLS.jetlag,
    cta: {
      title: "Crossing time zones? ARC plans the light",
      body: "After you travel, ARC shows when to seek light and when to avoid it, so your clock shifts in the right direction.",
      bullets: ["Seek-light and avoid-light windows after travel", "Sunrise from your time zone, location never requested", "Your day plan re-times as you adjust"],
    },
  },
  {
    id: "couples",
    match: /couple|partner|compatib/i,
    tool: TOOLS.compatibility,
    cta: {
      title: "Know your own clock first",
      body: "ARC works out your chronotype and plans your day around it, so you know which hours are yours to protect.",
      bullets: ["Chronotype from a 22-step setup", DIP_BULLET, "One thing to do at a time, not a dashboard"],
    },
  },
  {
    id: "shift",
    match: /shift[- ]?work|night[- ]shift/i,
    tool: TOOLS.caffeine,
    cta: {
      title: "A cutoff that follows your bedtime, not the clock",
      body: "ARC solves your last safe coffee from the bedtime you set, so the answer still makes sense when your night starts at 9 AM.",
      bullets: [CUTOFF_BULLET, "A day plan built from your own wake and sleep times", "One-tap check-ins show when your energy really drops"],
    },
  },
  {
    id: "adhd",
    match: /adhd/i,
    tool: TOOLS.quiz,
    cta: {
      title: "One thing at a time, timed to your day",
      body: "ARC shows one sentence and one action, with the rest of the day as a plan underneath. It's a wellness app, not a treatment.",
      bullets: ["One ask at a time, not a dashboard", "Wind-down reminder timed to your bedtime", "No streaks or scores to keep up"],
    },
  },
  {
    id: "caffeine",
    match: /caffeine|coffee|tolerance/i,
    tool: TOOLS.caffeine,
    cta: {
      title: "Your last safe coffee, recalculated with every cup",
      body: "ARC solves the latest moment a drink your size still clears before bed, from your bedtime, how fast you metabolise caffeine, and everything you've had today.",
      bullets: ["Live caffeine decay curve", "Fast, average or slow metaboliser", "Tells you plainly when no cup fits anymore"],
    },
  },
  {
    id: "evening",
    match: /blue[- ]light|evening|wind[- ]down|screen|digital|melatonin-digital|bedtime|procrastinat|dlmo|melatonin-onset/i,
    tool: TOOLS.sleepCycle,
    cta: {
      title: "A wind-down reminder at the right time for you",
      body: "ARC times your evening around your own bedtime, and names the caffeine still on board if there is any.",
      bullets: ["Wind-down reminder timed to your bedtime", CUTOFF_BULLET, LIGHT_BULLET],
    },
  },
  {
    id: "supplements",
    match: /supplement|magnesium|apigenin|melatonin|cocktail|chronobiotic/i,
    tool: TOOLS.cocktail,
    cta: {
      title: "Fix the timing before adding pills",
      body: "Light, caffeine and a steady wake time do most of the work. ARC plans all three, and its experiments show whether a change actually helps.",
      bullets: ["Five-day experiments with honest verdicts", "Wind-down reminder timed to your bedtime", LIGHT_BULLET],
    },
  },
  {
    id: "dip",
    match: /crash|dip|2pm|afternoon|adenosine|sleep-pressure|two-process|nsdr|nap|siesta/i,
    tool: TOOLS.nap,
    cta: {
      title: "It learns when your dip really lands",
      body: "Tell ARC when you crash. After about ten days of check-ins it uses the hour you actually crash, and everything timed around your dip moves with it.",
      bullets: ["A walk at the dip, not another coffee", "Crashes per week on Trends, from your check-ins", "Five-day experiments, including “no difference”"],
    },
  },
  {
    id: "light",
    match: /sun|light|lux|morning|huberman|cortisol|seasonal|winter|zeitgeber/i,
    tool: TOOLS.sunlight,
    cta: {
      title: "A 20-minute light timer from your real sunrise",
      body: "ARC works out sunrise from your time zone, no location needed, and runs the timer on your Lock Screen and Dynamic Island so your phone can stay in your pocket.",
      bullets: ["Real sunrise for your time zone", "Indoor fallback on dark winter mornings", "14-day strip of how often you held it"],
    },
  },
  {
    id: "sleep-debt",
    match: /debt|catch[- ]up/i,
    tool: TOOLS.sleepDebt,
    cta: {
      title: "After a short night, ARC adjusts the day",
      body: "Sleep debt changes how the day should go. ARC re-times the plan after a short night instead of pretending it didn't happen.",
      bullets: ["A day plan that accounts for short nights", "A caffeine cutoff that still protects tonight", "Trends shows whether your wake time is drifting"],
    },
  },
  {
    id: "chronotype",
    match: /chronotype|lion|bear|wolf|dolphin|night-owl|early-bird|not-lazy|power-of-when|internal-time/i,
    tool: TOOLS.quiz,
    cta: {
      title: "Find your chronotype, then live by it",
      body: "ARC's 22-step setup works out your chronotype and plans your day around it. It moves every phase of the day, from morning light to your last coffee.",
      bullets: ["Lion, Bear, Wolf or Dolphin, from your answers", "A day plan built around your peak hours", DIP_BULLET],
    },
  },
  {
    id: "focus",
    match: /focus|productiv|peak|ultradian|deep-work|founder|exercise|workout|training|hypertrophy|performance/i,
    tool: TOOLS.visualizer,
    cta: {
      title: "Protect the hours that are actually yours",
      body: "ARC plans your day around when your energy peaks, and learns from your check-ins when your dip really lands. Movement and focus can be logged whenever they happen.",
      bullets: ["A day plan built around your peak hours", DIP_BULLET, "One thing to do at a time"],
    },
  },
  {
    id: "sleep",
    match: /sleep|nap|siesta|inertia|wak|cycle|glymphatic|temperature|tmin|3am|cooling|breath|insomnia/i,
    tool: TOOLS.sleepCycle,
    cta: {
      title: "Better nights start with better-timed days",
      body: "ARC times light, caffeine and wind-down around your day, so the evening works with your sleep instead of against it.",
      bullets: ["Wind-down reminder timed to your bedtime", "Last safe coffee from your bedtime", LIGHT_BULLET],
    },
  },
  {
    id: "meals",
    match: /fast|meal|eat|feeding|liver|metabolic|circadian-code/i,
    tool: TOOLS.quiz,
    cta: {
      title: "Food timing works best on a steady clock",
      body: "ARC doesn't plan meals. It anchors the rest of your day, light, caffeine and wind-down, so your eating window has a steady clock to sit on.",
      bullets: [LIGHT_BULLET, CUTOFF_BULLET, "No account, no wearable"],
    },
  },
];

export const DEFAULT_TOPIC: Topic = {
  id: "general",
  match: /.^/,
  tool: TOOLS.quiz,
  cta: {
    title: "Stop guessing. ARC works out your day.",
    body: "One sentence explaining why you feel like this right now, one thing worth doing about it, and the rest of your day as a plan. Built from what you log, not a generic routine.",
    bullets: [CUTOFF_BULLET, LIGHT_BULLET, DIP_BULLET],
  },
};

export function topicFor(slug: string, title = ""): Topic {
  const haystack = `${slug} ${title}`;
  return TOPICS.find((t) => t.match.test(haystack)) ?? DEFAULT_TOPIC;
}

// The topic's own tool first, then sensible defaults, without repeats.
export function toolsFor(topic: Topic, count = 3): ToolLink[] {
  const picks = [topic.tool, TOOLS.caffeine, TOOLS.quiz, TOOLS.sunlight, TOOLS.sleepCycle];
  return picks.filter((t, i) => picks.findIndex((p) => p.href === t.href) === i).slice(0, count);
}

export interface RelatedItem {
  href: string;
  title: string;
  section: "Guide" | "Blog" | "Science";
}

function allArticles(): (RelatedItem & { topic: string })[] {
  return [
    ...guidesData.map((g) => ({ href: `/guides/${g.slug}`, title: g.title, section: "Guide" as const, topic: topicFor(g.slug, g.title).id })),
    ...blogPosts.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, section: "Blog" as const, topic: topicFor(p.slug, p.title).id })),
    ...scienceArticles.map((a) => ({ href: `/science/${a.slug}`, title: a.title, section: "Science" as const, topic: topicFor(a.slug, a.title).id })),
  ];
}

const EVERGREEN = [
  "/blog/what-is-circadian-rhythm-beginner-guide",
  "/guides/complete-circadian-rhythm-reset-guide",
  "/blog/what-is-a-chronotype-lion-bear-wolf-dolphin",
];

// Up to `count` articles on the same topic (guides first), topped up with evergreen basics.
export function relatedFor(currentHref: string, topic: Topic, count = 3): RelatedItem[] {
  const articles = allArticles();
  const sameTopic = articles.filter((a) => a.topic === topic.id && a.href !== currentHref);
  const evergreen = EVERGREEN.map((href) => articles.find((a) => a.href === href)).filter(
    (a): a is (typeof articles)[number] => Boolean(a) && a!.href !== currentHref
  );
  const picks = [...sameTopic, ...evergreen];
  return picks
    .filter((a, i) => picks.findIndex((p) => p.href === a.href) === i)
    .slice(0, count)
    .map(({ href, title, section }) => ({ href, title, section }));
}
