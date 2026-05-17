export interface ChronotypeDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  description: string;
  populationPercentage: string;
  idealSchedule: {
    wake: string;
    focus: string;
    caffeineCutoff: string;
    windDown: string;
    sleep: string;
  };
  strengths: string[];
  challenges: string[];
}

export const chronotypeDetails: Record<string, ChronotypeDetail> = {
  lion: {
    slug: "lion",
    name: "Lion",
    icon: "🦁",
    tagline: "The Early Riser",
    description: "Lions are naturally wired to wake up early and tackle their most demanding tasks before noon. They have high morning energy but experience a significant drop in the late afternoon.",
    populationPercentage: "15%",
    idealSchedule: {
      wake: "5:30 AM - 6:30 AM",
      focus: "8:00 AM - 12:00 PM",
      caffeineCutoff: "12:00 PM",
      windDown: "8:30 PM",
      sleep: "10:00 PM",
    },
    strengths: ["High morning productivity", "Consistent energy early in the day", "Natural goal-getters"],
    challenges: ["Late afternoon fatigue", "Difficulty staying awake for evening social events", "Rigid sleep needs"],
  },
  bear: {
    slug: "bear",
    name: "Bear",
    icon: "🐻",
    tagline: "The Solar Rhythm",
    description: "Bears follow the sun. They wake up when it's light and sleep when it's dark. They are the most common chronotype and their schedule matches the typical 9-to-5 workday perfectly.",
    populationPercentage: "50%",
    idealSchedule: {
      wake: "7:00 AM",
      focus: "10:00 AM - 2:00 PM",
      caffeineCutoff: "2:00 PM",
      windDown: "9:30 PM",
      sleep: "11:00 PM",
    },
    strengths: ["Steady, reliable energy", "Fits well with standard societal schedules", "Good team players"],
    challenges: ["Mid-afternoon slump around 2 PM", "Susceptible to 'social jetlag' on weekends", "Needs full 8 hours"],
  },
  wolf: {
    slug: "wolf",
    name: "Wolf",
    icon: "🐺",
    tagline: "The Night Owl",
    description: "Wolves struggle to wake up early and don't reach their peak mental acuity until the late afternoon or evening. They are highly creative when the rest of the world is asleep.",
    populationPercentage: "15-20%",
    idealSchedule: {
      wake: "8:30 AM - 9:00 AM",
      focus: "4:00 PM - 8:00 PM",
      caffeineCutoff: "4:00 PM",
      windDown: "11:00 PM",
      sleep: "12:00 AM - 1:00 AM",
    },
    strengths: ["High creativity in the evening", "Can push through late-night deadlines", "Adaptable to irregular schedules"],
    challenges: ["Waking up early", "Brain fog in the morning", "Out of sync with the 9-to-5 world"],
  },
  dolphin: {
    slug: "dolphin",
    name: "Dolphin",
    icon: "🐬",
    tagline: "The Light Sleeper",
    description: "Dolphins are sensitive sleepers who often struggle with insomnia or broken sleep. They have nervous energy and their peak focus is usually in the mid-to-late afternoon.",
    populationPercentage: "10%",
    idealSchedule: {
      wake: "6:30 AM",
      focus: "3:00 PM - 7:00 PM",
      caffeineCutoff: "1:00 PM",
      windDown: "10:00 PM",
      sleep: "11:30 PM",
    },
    strengths: ["High intelligence and attention to detail", "Can function on less sleep if necessary", "Perfectionistic drive"],
    challenges: ["Frequent insomnia", "Anxious energy", "Hard time winding down at night"],
  }
};
