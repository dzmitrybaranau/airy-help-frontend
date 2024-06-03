import firstSteps from "./icons/firstSteps.webp";
import firstSteps2 from "./icons/firstSteps2.jpg";
import firstBreath from "./icons/firstBreath2.webp";
import { CSSProperties } from "react";

export const ACHIEVEMENTS: Record<
  string,
  {
    id: string;
    name: string;
    requirements: string;
    description: string;
    image?: string;
    cssStyles?: CSSProperties;
  }
> = {
  FIRST_STEPS: {
    id: "FIRST_STEPS",
    name: "First Steps",
    requirements: "Set your first goal",
    description:
      "Congratulations on setting your first goal! 🎉 You are on the right track!",
    image: firstSteps2,
    cssStyles: {
      transform: "scale(1.1)",
    },
  },
  FIRST_BREATH: {
    id: "MINDFUL",
    name: "First Breath",
    requirements: "Complete your first breathing exercise",
    description:
      "You have completed your first breathing exercise! You reached more peace and got in touch with your mind.",
    image: firstBreath,
    cssStyles: {
      transform: "scale(1.5)",
    },
  },
  "5_DAYS_STREAK": {
    id: "5_DAYS_STREAK",
    name: "5 Days Streak",
    requirements: "Do retrospective for 5 days in a row",
    description: "You have achieved a 5 days streak! 🎉 Keep up the good work!",
  },
  "10_DAYS_STREAK": {
    id: "10_DAYS_STREAK",
    name: "10 Days Streak",
    requirements: "Do retrospective for 10 days in a row",
    description:
      "You have achieved a 10 days streak! 🎉 Keep up the good work!",
  },
};
