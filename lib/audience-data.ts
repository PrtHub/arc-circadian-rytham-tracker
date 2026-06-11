export interface AudienceDetail {
  slug: string;
  name: string;
  icon: string;
  title: string;
  description: string;
  painPoints: string[];
  arcSolution: string;
  features: string[];
}

export const audienceDetails: Record<string, AudienceDetail> = {
  adhd: {
    slug: "adhd",
    name: "ADHD",
    icon: "🧠",
    title: "Circadian Routine for ADHD Professionals",
    description: "Traditional to-do lists fail because they don't account for dopamine dips. ARC maps your tasks to your biological energy peaks, providing structured visual missions instead of overwhelming lists.",
    painPoints: ["Afternoon crashes destroying focus", "Time blindness and unstructured days", "Difficulty winding down at night", "Revenge bedtime procrastination"],
    arcSolution: "By anchoring your day to physical light and temperature cues, ARC provides external biological structure for an internal executive function deficit.",
    features: ["Visual 24-hour daily trajectory", "Peak Focus Windows for deep work", "Live caffeine decay tracking", "Smart context-aware notifications"]
  },
  founders: {
    slug: "founders",
    name: "Founders",
    icon: "🚀",
    title: "Biological Optimization for High-Performers",
    description: "You treat your time like an asset, but what about your energy? ARC is the biological operating system for founders and engineers who need maximum focus hours without burning out.",
    painPoints: ["Guessing when to do deep work", "Caffeine-induced sleep disruption", "Brain fog during crucial afternoon meetings", "Weekend 'social jetlag' ruining Monday"],
    arcSolution: "ARC uses peer-reviewed chronobiology to tell you exactly when your brain is sharpest, allowing you to schedule highly demanding cognitive work at the precise right biological moment.",
    features: ["32-step precision chronotype diagnosis", "Caffeine half-life & cutoff prediction", "Daily recovery mode after poor sleep", "100% on-device privacy"]
  },
  "shift-workers": {
    slug: "shift-workers",
    name: "Shift Workers",
    icon: "🐺",
    title: "Circadian Alignment for Shift Workers & Night Owls",
    description: "The 9-to-5 world is actively hostile to your biology. ARC is one of the only apps that respects inverted schedules, helping you anchor your rhythm regardless of when you wake up.",
    painPoints: ["Constant fatigue from misaligned schedules", "Daytime sleep quality issues", "Relying on caffeine at the wrong times", "Society-induced guilt for waking late"],
    arcSolution: "ARC adapts its protocol to your actual wake time. It doesn't tell you to wake up at 5 AM; it tells you how to optimize your day based on your unique start time.",
    features: ["Adapts to any wake time", "Night-shift inversion protocols", "Digital sunset light management", "Melatonin preservation alerts"]
  },
  "coffee-drinkers": {
    slug: "coffee-drinkers",
    name: "Coffee Drinkers",
    icon: "☕",
    title: "Caffeine Tracking for Coffee Enthusiasts",
    description: "You drink coffee every day but have never understood how it actually interacts with your sleep. ARC gives you the exact biological cutoff minute so you never sacrifice deep sleep for focus.",
    painPoints: ["Afternoon energy crashes despite drinking coffee", "Difficulty falling asleep on days you have late coffee", "Not knowing how much caffeine is still active at bedtime", "Tolerance build-up over time"],
    arcSolution: "ARC treats caffeine like a pharmaceutical with a half-life. By visualizing your live caffeine decay curve, you know exactly when to stop drinking to protect your sleep architecture.",
    features: ["Live SVG caffeine decay curve", "Sleep-safe threshold prediction", "Adenosine clearance wait timer", "Custom drink mg logging"]
  },
  "sleep-seekers": {
    slug: "sleep-seekers",
    name: "Sleep Seekers",
    icon: "😴",
    title: "Root Cause Sleep Optimization",
    description: "Sleeping 7-8 hours but still waking up exhausted? It's a timing problem, not a duration problem. Stop tracking how poorly you slept and start structuring your day to fix it.",
    painPoints: ["Waking up groggy despite 8 hours of sleep", "Dependence on melatonin or sleep aids", "Inconsistent bedtimes that ruin the week", "Anxiety about not being able to fall asleep"],
    arcSolution: "ARC focuses on what you do while awake to guarantee good sleep. We use morning sunlight anchoring and precise wind-down sequences to program your body's natural melatonin release.",
    features: ["Morning sleep check-in & recovery mode", "Sunlight exposure timer", "Chronotype-aware wind-down alerts", "Actionable morning intel briefings"]
  },
  biohackers: {
    slug: "biohackers",
    name: "Biohackers",
    icon: "🧬",
    title: "Data-Driven Biological Optimization",
    description: "Real data and correlations—not just streaks and checkboxes. ARC is the ultimate tool for biohackers looking to understand and manipulate their cortisol-melatonin rhythm.",
    painPoints: ["Basic habit trackers lack scientific depth", "Hardware wearables measure but don't prescribe", "Generic health advice doesn't account for bio-individuality", "Missing the connection between light, caffeine, and deep work"],
    arcSolution: "ARC is a highly technical biological operating system. Every protocol is backed by peer-reviewed chronobiology, giving you precise levers to control your daily physiology.",
    features: ["100% on-device SQLite privacy", "Peer-reviewed science briefings", "Granular biological mapping", "Social jetlag mitigation protocols"]
  }
};
