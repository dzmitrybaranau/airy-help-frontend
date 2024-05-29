import type { Meta, StoryObj } from "@storybook/react";
import OnboardingQuestions from "./OnboardingQuestions";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/OnboardingQuestions",
  component: OnboardingQuestions,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof OnboardingQuestions>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    questions: {
      end_goal_clarity: [
        {
          question:
            "What does 'growing my bum' mean to you, and how will you know when you've achieved this goal?",
          importance: "80",
          userReply: "",
        },
      ],
      current_position_resources: [
        {
          question:
            "Do you have a gym membership or access to a place where you can work out regularly?",
          importance: "60",
          userReply: "",
        },
        {
          question:
            "Have you invested in any equipment or tools that will help you achieve your goal, such as resistance bands or a fitness tracker?",
          importance: "40",
          userReply: "",
        },
      ],
      key_capabilities_skills: [
        {
          question:
            "Do you have experience with weightlifting or bodyweight exercises that can help you build muscle in your glutes?",
          importance: "70",
          userReply: "",
        },
        {
          question:
            "Are you comfortable with the idea of increasing your physical activity levels and making lifestyle changes to support your goal?",
          importance: "90",
          userReply: "",
        },
      ],
      planning_strategy: [
        {
          question:
            "Will you be aiming to do a certain number of workouts per week, or setting specific goals for each session?",
          importance: "85",
          userReply: "",
        },
        {
          question:
            "Have you identified any specific exercises or routines that will help you target your glutes?",
          importance: "75",
          userReply: "",
        },
      ],
      potential_obstacles_mitigation: [
        {
          question:
            "What might be the biggest obstacle to achieving this goal, and how do you plan to overcome it?",
          importance: "95",
          userReply: "",
        },
        {
          question:
            "How will you stay motivated and engaged with your workouts when you're not seeing immediate results?",
          importance: "80",
          userReply: "",
        },
      ],
      support_assistance: [
        {
          question:
            "Do you have a workout buddy or accountability partner to help keep you on track?",
          importance: "20",
          userReply: "",
        },
        {
          question:
            "Have you considered hiring a personal trainer or fitness coach to provide guidance and support?",
          importance: "30",
          userReply: "",
        },
      ],
      adaptability_resilience: [
        {
          question:
            "On a scale of 1-10, how would you rate your current level of physical activity and commitment to achieving this goal?",
          importance: "60",
          userReply: "",
        },
        {
          question:
            "How will you adapt if you encounter setbacks or plateaus along the way?",
          importance: "70",
          userReply: "",
        },
      ],
    },
  },
};
