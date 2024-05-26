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
      adaptability_resilience: [],
      current_position_resources: [],
      end_goal_clarity: [],
      key_capabilities_skills: [],
      planning_strategy: [],
      potential_obstacles_mitigation: [],
      support_assistance: [],
    },
  },
};
